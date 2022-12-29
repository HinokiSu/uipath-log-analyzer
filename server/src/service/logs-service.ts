import logFormatter from '../core/log-formatter'
import { getFileObj } from '../core/file-name-analyzer'
import { IFileInfoObj, ILogObj } from '../types/log-types'
import db from '../db/index'
import {
  insertLogSql,
  selectSpecifyLogTimeSql,
  selectSpecifyProcessNameSql,
  countSpecifyProcessNameSql,
  countSpecifyLogTimeSql,
  findLatestLogInSpecifyDate,
  selectAllLogsSql,
  countAllLogsSql,
  countLogStateGroupByPN,
  countByProcessNameSql,
  selectRecentlyErrorSpecifyPNSql
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
 * get all logs by pagin
 * @param curPage current page
 * @param pageSize current page size
 * @returns pagin Data List
 */
export const getAllLogs = (curPage: string, pageSize: string) => {
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(selectAllLogsSql, [pageSize, offset])
  const total = db.query(countAllLogsSql)[0] as { total: number }

  if (!res.length) {
    return handleFailed({
      message: '获取全部日志信息失败！'
    })
  }
  return handleSuccess({
    message: '获取全部日志信息成功',
    data: {
      ...total,
      list: res
    }
  })
}

/**
 * obtain logs based on process version
 * @param pn process_version
 * @returns select array data
 */
export const getDataByProcessName = (pn: string, curPage: string, pageSize: string) => {
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(selectSpecifyProcessNameSql, [pn, pageSize, offset])
  const total = db.query(countSpecifyProcessNameSql, [pn])[0] as { total: number }
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

export const getPNCountLogState = (curPage: string, pageSize: string) => {
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(countLogStateGroupByPN, [pageSize, offset])
  const total = db.query(countByProcessNameSql, [])[0] as { total: number }
  if (!res.length) {
    return handleFailed({
      message: `根据Process name统计不同状态的Logs数量失败!`
    })
  }

  return handleSuccess({
    message: `根据Process name统计不同状态的Logs数量成功`,
    data: {
      ...total,
      list: res
    }
  })
}

export const getLogOfRecentlyErrorByPN = (pn: string) => {
  if (!pn.length) {
    return handleFailed({
      message: `根据Process name获取最近的Error日志失败, Process name为空`
    })
  }
  const res = db.query(selectRecentlyErrorSpecifyPNSql, [pn])
  if (!res.length) {
    return handleFailed({
      message: `根据Process name获取最近的Error日志成功, 目前不存在相关数据`,
      data: {
        log_data: {}
      }
    })
  }
  return handleSuccess({
    message: `根据Process name获取最近的Error日志成功`,
    data: {
      log_data: res[0]
    }
  })
}
