import fs from 'fs'
import path from 'path'

import logFormatter from './log-formatter'
import { fileNameAnalyer, getFileObj } from './file-name-analyer'
import { IFileInfoObj, ILogObj } from '../types/log-types'
import db from '../db/index'
import { deleteLogSql, insertLogSql } from '../db/sql/logs-sql'

// uipath logs file info Array
const filesObjArr = fileNameAnalyer()

/**
 * 日志格式化 主入口
 * @param fileObj log file path
 * @returns parsed logs array
 */
const logFormatterMain = (fileObj: IFileInfoObj) => {
  const logs = logFormatter.readLogsFile(fileObj.path)
  const sepFlagArr = logFormatter.createSeparatorArr()
  const logsArr = logs === '' ? [] : logs.split('\n')
  // store parsed logs
  const parsedLogArr = []
  // loop handle multi logs
  for (let i = 0, len = logsArr.length; i < len; i++) {
    if (logsArr[i].length === 0) {
      continue
    }
    let log = logFormatter.singleLogHandler(fileObj.time, logsArr[i], sepFlagArr)
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
const writeToJson = (time: string, jsonData: string) => {
  const fileWholeName = time + '.json'
  fs.writeFile(path.join(__dirname, '../../output/' + fileWholeName), jsonData, 'utf8', (err) => {
    if (err) {
    }
  })
}

/**
 * @returns handle multi file log
 */
const multiFileHandler = () => {
  let res: ILogObj[] = []
  for (let i = 0, len = filesObjArr.length; i < 1; i++) {
    res = logFormatterMain(filesObjArr[i])
    const resToJson = JSON.stringify(res)
    writeToJson(filesObjArr[i].time, resToJson)
  }
  return res
}

/**
 * parse logs & insert into db
 * @param fileName specify file name
 * @returns execution result
 */
export const doParseLogsBySpecifyFile = (fileName: string) => {
  const resObj = {
    message: 'Info: 日志数据解析&插入DB成功',
    status: 200,
  }

  const uipathLogsFolderPath: string = process.env.UIPATH_LOGS_FOLDER_PATH || ''
  if (!uipathLogsFolderPath) {
    resObj.message = 'Error: uipath log根文件为空'
    resObj.status = 0
    return resObj
  }
  let fileObj: IFileInfoObj = getFileObj(fileName, uipathLogsFolderPath)

  const logsArr = logFormatterMain(fileObj)

  // loop insert log data into db
  for (let i = 0, len = logsArr.length; i < len; i++) {
    let _res = insertLogDataIntoDB(logsArr[i])
    if (!_res) {
      resObj.message = `Error: 当前日志日期: ${fileObj.time}, 日志数据解析&插入DB失败!`
      resObj.status = 0
      // delete inserted log data
      db.run(deleteLogSql, [fileObj.time])
      break
    }
  }
  return resObj
}
