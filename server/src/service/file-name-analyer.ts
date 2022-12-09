import fs from 'fs'
import { IFileInfoObj } from '../types/log-types'
const getFilesName = (uipathFolderPath: string): string[] => {
  // get all files name
  const filesNameArr = fs
    .readdirSync(uipathFolderPath, 'utf8')
    .filter((_t: string) => _t.includes('Execution'))
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
 * @returns parsered file name
 */
export const fileNameAnalyer = () => {
  // TODO: get uipath logs folder path .env config
  const uipathLogsFolderPath: string = process.env.UIPATH_LOGS_FOLDER_PATH || ''
  const fileNameArr = getFilesName(uipathLogsFolderPath)
  const resultArr: IFileInfoObj[] = []
  // loop to build file obj
  for (const fName of fileNameArr) {
    const fileObj = getFileObj(fName, uipathLogsFolderPath)
    resultArr.push(fileObj)
  }
  return resultArr
}
