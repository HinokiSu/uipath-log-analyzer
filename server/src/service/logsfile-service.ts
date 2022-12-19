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
import { fileNameAnalyzer } from './file-name-analyzer'

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
  const resObj = {
    message: 'Info: 日志文件信息解析&写入DB成功',
    status: 200
  }
  // uipath logs file info Array
  const filesObjArr = fileNameAnalyzer()

  // log file info insert to DB
  for (let i = 0, len = filesObjArr.length; i < len; i++) {
    const _res = insertSingleFileInfoToDB(filesObjArr[i])
    if (!_res) {
      resObj.message = 'Error: 日志文件信息解析&写入DB失败!'
      resObj.status = 0
      break
    }
  }
  return resObj
}

/**
 * get logs file info by pagination
 * @param curPage current page
 * @param pageSize pagination size
 * @returns log file info by pagination
 */
export const getLogsFileDataByPagination = (curPage: string, pageSize: string) => {
  const offsetPage = (parseInt(curPage) - 1) * parseInt(pageSize)
  const res = db.query(selectLogsFileInfoByPaginationSql, [pageSize, offsetPage])
  const resObj = {
    message: 'Info: 分页获取日志文件信息成功',
    status: 200,
    data: res
  }
  if (!res.length) {
    resObj.message = 'Error: 分页获取日志文件信失败!'
    resObj.status = 0
  }
  return resObj
}

/**
 * get total of logs file
 * @returns total
 */
export const getTotalOfLogsFile = () => {
  const res = db.query(selectCountLogsFileInfoSql)
  const resObj = {
    message: 'Info: 获取日志文件总数成功',
    status: 200,
    data: res
  }
  if (!res.length) {
    resObj.message = 'Error: 获取日志文件总数失败!'
    resObj.status = 0
  }
  return resObj
}

/**
 * get log file info by uuid
 * @param id log file id
 * @returns log file info
 */
export const getLogsFileDataById = (id: string) => {
  const res = db.query(selectLogsFileInfoById, [id])
  const resObj = {
    message: 'Info: 根据Id获取日志文件信息成功',
    status: 200,
    data: res
  }
  if (!res.length) {
    resObj.message = 'Error: 根据Id获取日志文件信息失败!'
    resObj.status = 0
  }
  return resObj
}
