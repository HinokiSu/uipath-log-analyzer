import logFormatter from '../core/log-formatter'
import { ILogObj } from '../types/log-types'
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
import { selectLogsFileInfoById, updateFileLastParseTime } from '../db/sql/logsfile-info-sql'
import { handleFailed, handleSuccess } from './common/result-handler'
import { calcOffset } from './common/pagin-handler'
import { TLogFile } from '../types/logfile-type'
import { nowTime } from '../utils/time'

/**
 * log formatter main entry
 * @param fileObj log file path
 * @returns parsed logs array
 */
const logFormatterMain = (fileObj: TLogFile) => {
  // read file
  const logs = logFormatter.readLogsFile(fileObj.full_path)
  const logsArr = logs === '' ? [] : logs.split('\n')
  // store parsed logs
  const parsedLogArr = []
  // loop handle multi logs
  for (let i = 0, len = logsArr.length; i < len; i++) {
    if (logsArr[i].length === 0) {
      continue
    }
    // time form is 'yyyy-MM-dd'
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
  // fix: object is unordered, inserting into db may go wrong
  const exRes = db.run(insertLogSql, [
    logData.id,
    logData.logTime,
    logData.logState,
    logData.message,
    logData.level,
    logData.logType,
    logData.timeStamp,
    logData.fingerprint,
    logData.windowsIdentity,
    logData.machineName,
    logData.fileName,
    logData.totalExecutionTimeInSeconds,
    logData.totalExecutionTime,
    logData.initiatedBy,
    logData.processName,
    logData.processVersion,
    logData.jobId,
    logData.robotName,
    logData.machineId,
    logData.organizationUnitId
  ])
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

const updateFileTime = (id: string) => {
  db.run(updateFileLastParseTime, [nowTime(), id])
}

/**
 * parse logs & insert into db in specify log file
 * @param fileName specify file name
 * @returns execution result
 */
export const doParseLogsBySpecifyFile = (id: string) => {
  const fileRes = db.get(selectLogsFileInfoById, [id]) as TLogFile
  if (!fileRes) {
    return handleFailed({
      message: `??????UUId????????????????????????!`
    })
  }
  const formattedLogsArr = logFormatterMain(fileRes)
  type TLatestLog = undefined | { log_time: string }
  // find latest log_time of log from db
  const latestLog: { log_time: string } = (db.get(findLatestLogInSpecifyDate, [
    fileRes.time.concat('%')
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
      updateFileTime(id)
      return handleFailed({ message: `??????????????????: ${fileRes.time}, ??????????????????&??????DB??????!` })
    }
  }
  updateFileTime(id)
  return handleSuccess({ message: '??????????????????&??????DB??????' })
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
      message: '?????????????????????????????????'
    })
  }
  return handleSuccess({
    message: '??????????????????????????????',
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
      message: `??????process name??????Logs????????????!`
    })
  }
  return handleSuccess({
    message: '??????process name??????Logs????????????',
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
      message: `??????log time??????Logs????????????!`
    })
  }
  return handleSuccess({
    message: `??????log time??????Logs????????????`,
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
      message: `??????Process name?????????????????????Logs????????????!`
    })
  }

  return handleSuccess({
    message: `??????Process name?????????????????????Logs????????????`,
    data: {
      ...total,
      list: res
    }
  })
}

export const getLogOfRecentlyErrorByPN = (pn: string) => {
  if (!pn.length) {
    return handleFailed({
      message: `??????Process name???????????????Error????????????, Process name??????`
    })
  }
  const res = db.query(selectRecentlyErrorSpecifyPNSql, [pn])
  if (!res.length) {
    return handleFailed({
      message: `??????Process name???????????????Error????????????, ???????????????????????????`,
      data: {
        log_data: {}
      }
    })
  }
  return handleSuccess({
    message: `??????Process name???????????????Error????????????`,
    data: {
      log_data: res[0]
    }
  })
}
