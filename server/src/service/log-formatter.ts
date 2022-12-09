/**
 * handle log data
 */
import fs from 'fs'
import { ILogDataObjItem, ILogObj } from '../types/log-types'
import { v4 as uuidv4 } from 'uuid'

// read logs file
const readLogsFile = (fPath: string) => {
  const res = fs.readFileSync(fPath, 'utf8')
  return res
}

const createSeparatorArr = () => {
  const logSepFlagArr: ILogDataObjItem[] = []
  const sepFlagArr = [
    'message',
    'level',
    'logType',
    'timeStamp',
    'fingerprint',
    'windowsIdentity',
    'machineName',
    'fileName',
    'totalExecutionTimeInSeconds',
    'totalExecutionTime',
    'initiatedBy',
    'processName',
    'processVersion',
    'jobId',
    'robotName',
    'machineId',
    'organizationUnitId',
  ]

  sepFlagArr.forEach((item: string) => {
    logSepFlagArr.push({
      name: item,
      flag: `,"${item}":`,
    })
  })

  return logSepFlagArr
}

/**
 * handle single log data
 * @param fileTime file name of prefix time
 * @param logData log content
 * @param sepArr for split log string
 * @returns
 */
const singleLogHandler = (fileTime: string, logData: string, sepArr: ILogDataObjItem[]): ILogObj => {
  const logObj = Object.create(null)
  const logInfo = logData.split(' ', 2)
  // use uuid v4 as uniq id
  logObj['id'] = uuidv4()
  // log info
  logObj['logTime'] = fileTime.concat(' ', logInfo[0])
  logObj['logState'] = logInfo[1]

  // log main data
  let logMainData = logData.split(`{"message":`)[1]

  let _temp: string[] = []
  // temporay storage logObj key
  let _key: string = ''
  // loop handle
  for (let i = 0, len = sepArr.length; i < len - 1; i++) {
    // whether has sep flag
    if (logMainData.includes(sepArr[i + 1].flag)) {
      _temp = logMainData.split(sepArr[i + 1].flag)
      if (_temp[0].charAt(0) === '"' && _temp[0].charAt(_temp[0].length - 1) === '"') {
        _temp[0] = _temp[0].slice(1, -1)
      }
      if (_key === '') {
        // write in logObj
        logObj[sepArr[i].name] = _temp[0]
      } else {
        logObj[_key] = _temp[0]
        _key = ''
      }
      logMainData = _temp[1]
    } else {
      // when there is no initiatedBy or others,it will is setted empty string
      logObj[sepArr[i + 1].name] = ''
      if (_key === '') {
        _key = sepArr[i].name
      }
    }
    // organizationUnitId
    logObj['organizationUnitId'] = _temp[1].split('}', 2)[0]
  }
  return logObj
}

export default { readLogsFile, createSeparatorArr, singleLogHandler }
