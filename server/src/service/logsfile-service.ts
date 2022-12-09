import { v4 as uuidv4 } from 'uuid'
import db from '../db/index'

import { insertLogsFileInfoSql, selectLogsFileInfoSql } from '../db/sql/logsfile-info-sql'
import { IFileInfoObj } from '../types/log-types'
import { nowTime } from '../utils/time'
import { fileNameAnalyer } from './file-name-analyer'

/* 单个文件的插入 */
const insertSingleFileInfoToDB = (fileObj: IFileInfoObj): boolean => {
  const selectRes = db.query(selectLogsFileInfoSql, [fileObj.name])
  // 判断该log文件信息是否不存在
  if (selectRes.length === 0) {
    try {
      // 插入
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

// log文件 主服务
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
  const filesObjArr = fileNameAnalyer()

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
