import logFormatter from '../core/log-formatter'
import { getFileObj } from '../core/file-name-analyzer'
import { IFileInfoObj, ILogObj } from '../types/log-types'
import db from '../db/index'
import {
  countByLogTimeSql,
  countNumberByLogStateSql,
  deleteLogSql,
  insertLogSql,
  selectSpecifyLogTimeSql,
  selectSpecifyProcessVersionSql,
  selectLogsOfRecentlyErrorSql,
  countSpecifyLogTimeSql,
  countSpecifyProcessVersionSql,
  findLatestLogInSpecifyDate
} from '../db/sql/logs-sql'
import { handleFailed, handleSuccess } from './common/result-handler'
import { calcOffset } from './common/pagin-handler'

/**
 * log formatter main entry
 * @param fileObj log file path
 * @returns parsed logs array
 */
const logFormatterMain = (fileObj: IFileInfoObj) => {
  const logs = logFormatter.readLogsFile(fileObj.path)
  const logsArr = logs === '' ? [] : logs.split('\n')
  // store parsed logs
  const parsedLogArr = []
  // loop handle multi logs
  for (let i = 0, len = logsArr.length; i < len; i++) {
    if (logsArr[i].length === 0) {
      continue
    }
    const log = logFormatter.singleLogHandler(fileObj.time, logsArr[i])
    parsedLogArr.push(log)
  }
  return parsedLogArr
}

/**
 *
 * @param logData log data,this is object type
 * @returns boolean
 */
const insertLogDataIntoDB = (logData: ILogObj): boolean => {
  const exRes = db.run(insertLogSql, Array.from(Object.values(logData)))
  if (!exRes.changes) {
    return false
  }
  return true
}

/* write json to file. if it is not exist, will created */
/* const writeToJson = (time: string, jsonData: string) => {
  const fileWholeName = time + '.json'
  fs.writeFile(path.join(__dirname, '../../output/' + fileWholeName), jsonData, 'utf8', (err) => {
    if (err) {
      console.log('write file error')
    }
  })
} */

/**
 * @returns handle multi file log
 */
/* const multiFileHandler = () => {
  let res: ILogObj[] = []
  for (let i = 0, len = filesObjArr.length; i < 1; i++) {
    res = logFormatterMain(filesObjArr[i])
    const resToJson = JSON.stringify(res)
    writeToJson(filesObjArr[i].time, resToJson)
  }
  return res
} */

/**
 * parse logs & insert into db
 * @param fileName specify file name
 * @returns execution result
 */
export const doParseLogsBySpecifyFile = (fileName: string) => {
  const uipathLogsFolderPath: string = process.env.UIPATH_LOGS_FOLDER_PATH || ''
  if (!uipathLogsFolderPath) {
    return handleFailed({
      message: 'Error: uipath log根文件为空'
    })
  }
  const fileObj: IFileInfoObj = getFileObj(fileName, uipathLogsFolderPath)

  const formattedLogsArr = logFormatterMain(fileObj)
  type TLatestLog = undefined | { log_time: string }
  // find latest log_time of log from db
  const latestLog: { log_time: string } = (db.get(findLatestLogInSpecifyDate, [
    fileObj.time.concat('%')
  ]) as TLatestLog) || { log_time: '' }
  // filter old log
  const latestLogsArr = formattedLogsArr.filter((item) => {
    if (item.logTime > latestLog.log_time) {
      return item
    }
  })
  console.log(latestLogsArr.length)
  // loop insert log data into db
  for (let i = 0, len = latestLogsArr.length; i < len; i++) {
    const res = insertLogDataIntoDB(latestLogsArr[i])
    if (!res) {
      return handleFailed({ message: `当前日志日期: ${fileObj.time}, 日志数据解析&插入DB失败!` })
    }
  }
  return handleSuccess({ message: '日志数据解析&插入DB成功' })
}

/**
 * obtain logs based on process version
 * @param pn process_version
 * @returns select array data
 */
export const getDataByProcessVersion = (pn: string, limit: string, offset: string) => {
  const res = db.query(selectSpecifyProcessVersionSql, [pn, limit, offset])
  const total = db.query(countSpecifyProcessVersionSql, [pn])
  if (!res.length) {
    return handleFailed({
      message: `根据process name获取Logs信息失败!`
    })
  }
  return handleSuccess({
    message: '根据process name获取Logs信息成功',
    data: {
      ...total,
      list: res
    }
  })
}

/**
 *
 * @param timeStr log time, forEx: '2022-12-05'
 * @returns
 */
export const getLogsSpecifyLogTime = (timeStr: string, pageSize: string, curPage: string) => {
  const logTime = timeStr.concat('%')
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(selectSpecifyLogTimeSql, [logTime, pageSize, offset])
  const total = db.query(countSpecifyLogTimeSql, [logTime])[0] as { total: number }
  if (!res.length) {
    handleFailed({
      message: `根据log time获取Logs信息失败!`
    })
  }
  return handleSuccess({
    message: `根据log time获取Logs信息成功`,
    data: {
      ...total,
      list: res
    }
  })
}

/* dashboard */
/**
 * obtain stats based on log state
 * @returns statistics array
 */
export const getStatsByLogState = () => {
  const res = db.query(countNumberByLogStateSql)
  if (!res.length) {
    handleFailed({
      message: `根据log 获取Logs信息失败!`
    })
  }
  return handleSuccess({
    message: `根据log time获取Logs信息成功`,
    data: {
      list: res
    }
  })
}

/**
 * obtain recently error logs
 * @param limt number of error logs
 * @returns error logs array
 */
export const getLogsOfRecentlyError = (limt: number) => {
  const res = db.query(selectLogsOfRecentlyErrorSql, [limt])
  if (!res.length) {
    return handleFailed({ message: `获取最近日志状态为Error的数据失败!` })
  }
  return handleSuccess({
    message: `获取最近日志状态为Error的数据成功!`,
    data: {
      list: res
    }
  })
}

/**
 * stats based on logtime
 * @returns [{logtime, total}]
 */
export const getStatsByLogTime = () => {
  const res = db.query(countByLogTimeSql)
  if (!res.length) {
    return handleFailed({
      message: `根据log time统计log数量失败!`
    })
  }
  return handleSuccess({
    message: `根据log time统计log数量成功`,
    data: {
      list: res
    }
  })
}
