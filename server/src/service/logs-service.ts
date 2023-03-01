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
    const log = logFormatter.mainLogHandler(fileObj.time, logsArr[i])
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

const updateFileTime = (id: string) => {
  db.run(updateFileLastParseTime, [nowTime(), id])
}

/**
 * parse logs & insert into db in specify log file
 * @param id specify file id
 * @returns execution result
 */
export const doParseLogsBySpecifyFile = (id: string) => {
  const fileRes = db.get(selectLogsFileInfoById, [id]) as TLogFile
  if (!fileRes) {
    return handleFailed({
      message: `Get file information failed by UUId`
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
  // loop insert log data into db
  for (let i = 0, len = latestLogsArr.length; i < len; i++) {
    const res = insertLogDataIntoDB(latestLogsArr[i])
    if (!res) {
      updateFileTime(id)
      return handleFailed({
        message: `Parsed and insert DB logs data failed!!! current date: ${fileRes.time},`
      })
    }
  }
  updateFileTime(id)
  return handleSuccess({ message: 'Parsed and insert DB logs data successfully' })
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

  return handleSuccess({
    message: 'Get all log information successfully',
    data: {
      ...total,
      list: res
    }
  })
}

/**
 * obtain logs based on process name
 * @param pn process name
 * @returns select array data
 */
export const getDataByProcessName = (pn: string, curPage: string, pageSize: string) => {
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(selectSpecifyProcessNameSql, [pn, pageSize, offset])
  const total = db.query(countSpecifyProcessNameSql, [pn])[0] as { total: number }
  return handleSuccess({
    message: 'GEt log info by process name successfully',
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

  return handleSuccess({
    message: `Get log information by log time successfully`,
    data: {
      ...total,
      list: res
    }
  })
}

export const getLogOfRecentlyErrorByProcessName = (pn: string) => {
  if (!pn.length) {
    return handleFailed({
      message: `Get recently logs by process name failed, Process name is empty!!!`
    })
  }
  const res = db.query(selectRecentlyErrorSpecifyPNSql, [pn])
  return handleSuccess({
    message: `Get recently logs by process name successfully`,
    data: {
      log_data: res[0] || {}
    }
  })
}
