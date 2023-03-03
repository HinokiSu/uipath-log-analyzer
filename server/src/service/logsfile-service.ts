import { v4 as uuidv4 } from 'uuid'
import db from '../db/index'

import {
  insertLogsFileInfoSql,
  selectAllIdLogsFile,
  selectCountLogsFileInfoSql,
  selectLogsFileIdByRangeDate,
  selectLogsFileInfoById,
  selectLogsFileInfoByPaginationSql,
  selectLogsFileInfoSql
} from '../db/sql/logsfile-info-sql'
import { IFileInfoObj } from '../types/log-types'
import { nowTime } from '../utils/time'
import { calcOffset } from './common/pagin-handler'
import { handleFailed, handleSuccess } from './common/result-handler'
import { fileNameAnalyzer } from '../core/file-name-analyzer'
import { doParseLogsBySpecifyFile } from './logs-service'

/**
 *
 * @param fileObj log file info object
 * @returns boolean
 */
const insertSingleFileInfoToDB = (fileObj: IFileInfoObj): boolean => {
  const selectRes = db.query(selectLogsFileInfoSql, [fileObj.name])
  // judge whether the log file exists
  if (selectRes.length === 0) {
    try {
      // insert
      const addRes = db.run(insertLogsFileInfoSql, [
        uuidv4(),
        fileObj.name,
        fileObj.time,
        fileObj.path,
        0,
        nowTime(),
        nowTime()
      ])
      if (!addRes.changes) {
        return false
      }
    } catch (err) {
      throw 'Error: add log file info failed, errInfo: ' + err
    }
    return true
  }
  return true
}

/**
 * parse all logs file info & insert into db
 * @returns execution result
 */
export const doParseAllLogsFileInfo = () => {
  // uipath logs file info Array
  const filesObjArr = fileNameAnalyzer()

  // log file info insert to DB
  for (let i = 0, len = filesObjArr.length; i < len; i++) {
    const _res = insertSingleFileInfoToDB(filesObjArr[i])
    if (!_res) {
      return handleFailed({
        message: 'Parsed log file information and write database failed!!!'
      })
    }
  }
  return handleSuccess({
    message: 'Parsed log file information and write database successfully'
  })
}

/**
 * get logs file info by pagination
 * @param curPage current page
 * @param pageSize pagination size
 * @returns log file info by pagination
 */
export const getLogsFileDataByPagination = (curPage: string, pageSize: string) => {
  const offsetPage = calcOffset(curPage, pageSize)
  const res = db.query(selectLogsFileInfoByPaginationSql, [pageSize, offsetPage])
  const total = db.query(selectCountLogsFileInfoSql)[0]

  return handleSuccess({
    message: 'Get log file information by pagination successfully',
    data: {
      ...total,
      list: res
    }
  })
}

/**
 * get total of logs file
 * @returns total
 */
export const getTotalOfLogsFile = () => {
  const res = db.query(selectCountLogsFileInfoSql)

  if (!res.length) {
    return handleFailed({
      message: 'Get log file total failed!!!'
    })
  }
  const total = res[0] as { total: string }
  return handleSuccess({
    message: 'Get log file total successfully',
    data: {
      ...total
    }
  })
}

/**
 * get log file info by uuid
 * @param id log file id
 * @returns log file info
 */
export const getLogsFileDataById = (id: string) => {
  const res = db.query(selectLogsFileInfoById, [id])
  if (!res.length) {
    return handleFailed({
      message: 'Get log file information failed by id'
    })
  }
  return handleSuccess({
    message: 'Get log ile information by id successfully',
    data: {
      list: res
    }
  })
}

/*
 * According to range date, do parse log file log
 */
export const doParseLogsFileByRangeDate = (startDate: string, endDate: string) => {
  const idRes = db.query(selectLogsFileIdByRangeDate, [startDate, endDate])

  // loop parse logs
  for (const _t of idRes) {
    const res = doParseLogsBySpecifyFile(_t.id)
    if (res.status !== 200) {
      return handleFailed({
        message: `Parsed log files by range date failed, current log file UUId: ${_t.id}`
      })
    }
  }
  return handleSuccess({
    message: `Parsed log files by range date successfully`
  })
}

/*
 * do parse all log file log
 */
export const doParseAllLogsByAllLogsFile = () => {
  // get all log file info id
  const allIdRes = db.query(selectAllIdLogsFile)

  for (const item of allIdRes) {
    const res = doParseLogsBySpecifyFile(item.id)
    if (res.status !== 200) {
      return handleFailed({
        message: `Parsed all log files failed, current log file UUId: ${item.id}`
      })
    }
  }
  return handleSuccess({
    message: `Parsed all log files is done, successfully.`
  })
}
