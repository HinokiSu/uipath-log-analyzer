import fs from 'fs'
import { serverConfig } from '../app-config'

import { IFileInfoObj } from '../types/log-types'

// judge logs file and filter it
export const filterLogsFile = (fileName: string) => {
  const splittedArr = fileName.split('_')
  if (splittedArr.length === 2 && fileName.includes('Execution')) {
    return true
  } else {
    return false
  }
}

/**
 * get all log files name
 * @param uipathFolderPath uipath log storage path
 * @returns all log files name
 */
const getFilesName = (uipathFolderPath: string): string[] => {
  // fixed: At Uipath 2019.10.* old version has `2023-02-10_WorkflowAnalyzer_Execution.log`
  // get all files name
  const filesNameArr = fs
    .readdirSync(uipathFolderPath, 'utf8')
    .filter((_t: string) => filterLogsFile(_t))
  return filesNameArr
}

/**
 * @param fileName file name(include the extension)
 * @param rootPath the root path of the uipath logs
 * @returns Obj is the parsed file name
 */
export const getFileObj = (fileName: string, rootPath: string): IFileInfoObj => {
  // init file obj
  // {name: is file name, path: whole file path, time: file prefix name}
  const _obj: IFileInfoObj = {
    name: '',
    path: '',
    time: ''
  }
  _obj.name = fileName
  _obj.path = rootPath.concat('\\', fileName)
  _obj.time = fileName.split('_Execution')[0]
  return _obj
}

/**
 * @returns parsed file name
 */
export const fileNameAnalyzer = () => {
  // const uipathLogsFolderPath: string = process.env.UIPATH_LOGS_FOLDER_PATH || ''
  const uipathLogsFolderPath: string = serverConfig.UIPATH_LOGS_FOLDER_PATH

  const fileNameArr = getFilesName(uipathLogsFolderPath)
  const resultArr: IFileInfoObj[] = []
  // loop to build file obj
  for (const fName of fileNameArr) {
    const fileObj = getFileObj(fName, uipathLogsFolderPath)
    resultArr.push(fileObj)
  }
  return resultArr
}
