import { v4 as uuidv4 } from 'uuid'
import db from '../db/index'

import {
  insertLogsFileInfoSql,
  selectCountLogsFileInfoSql,
  selectLogsFileInfoById,
  selectLogsFileInfoByPaginationSql,
  selectLogsFileInfoSql
} from '../db/sql/logsfile-info-sql'
import { IFileInfoObj } from '../types/log-types'
import { nowTime } from '../utils/time'
import { calcOffset } from './common/pagin-handler'
import { handleFailed, handleSuccess } from './common/result-handler'
import { fileNameAnalyzer } from '../core/file-name-analyzer'

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
        0,
        nowTime()
      ])
      if (!addRes.changes) {
        return false
      }
    } catch (err) {
      throw 'Error: add log file info faild, errInfo: ' + err
    }
    return true
  }
  return true
}

// log file main service
/* const addLogsFileInfo = () => {
  let message = 'Error: in adding log'
  for (let i = 0, len = filesObjArr.length; i < len; i++) {
    let _res = singleFileInfoHandler(filesObjArr[i])
    if(_res) message = ''
    // TODO: judge and how to return message
  }

  return { message }
} */

/**
 * parse all logs file info & insert into db
 * @returns execution result
 */
export const doParseAllLogsFile = () => {
  // uipath logs file info Array
  const filesObjArr = fileNameAnalyzer()

  // log file info insert to DB
  for (let i = 0, len = filesObjArr.length; i < len; i++) {
    const _res = insertSingleFileInfoToDB(filesObjArr[i])
    if (!_res) {
      return handleFailed({
        message: '日志文件信息解析&写入DB失败!'
      })
    }
  }
  return handleSuccess({
    message: '日志文件信息解析&写入DB成功'
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

  if (!res.length) {
    return handleFailed({
      message: '分页获取日志文件信失败!'
    })
  }
  return handleSuccess({
    message: '分页获取日志文件信息成功',
    data: {
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
      message: '获取日志文件总数失败!'
    })
  }
  const total = res[0] as { total: string }
  return handleSuccess({
    message: '获取日志文件总数成功',
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
      message: '根据Id获取日志文件信息失败!'
    })
  }
  return handleSuccess({
    message: '根据Id获取日志文件信息成功',
    data: {
      list: res
    }
  })
}
