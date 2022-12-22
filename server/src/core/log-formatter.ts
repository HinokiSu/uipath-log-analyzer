/**
 * handle log data
 */
import fs from 'fs'
import { ILogDataObjItem, ILogObj } from '../types/log-types'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

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
    'organizationUnitId'
  ]

  sepFlagArr.forEach((item: string) => {
    logSepFlagArr.push({
      name: item,
      flag: `,"${item}":`
    })
  })

  return logSepFlagArr
}

/**
 * handle single log data
 * @param fileTime file name of prefix time
 * @param logData log content
 * @returns
 */
const singleLogHandler = (fileTime: string, logData: string): ILogObj => {
  const sepArr: ILogDataObjItem[] = createSeparatorArr()
  const logObj = Object.create(null)
  const logInfo = logData.split(' ', 2)
  // use uuid v4 as uniq id
  logObj['id'] = uuidv4()
  /* log info */
  // fix bug: use dayjs parse timestamp.
  // bug repr: maybe first log in logs file cause bug. when use strftime( '%Y-%m-%d %H:%M:%f', '2022-12-05T10:59:41.6338' ) in sqlite, it will return null
  logObj['logTime'] = dayjs(fileTime.concat(' ', logInfo[0])).format('YYYY-MM-DD HH:mm:ss.SSS')
  logObj['logState'] = logInfo[1]

  // log main data
  let logMainData = logData.split(`{"message":`)[1]

  let _temp: string[] = []
  // temporay storage logObj key
  let _key = ''
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
  }
  // organizationUnitId
  logObj['organizationUnitId'] = _temp[1].split('}', 2)[0]
  return logObj
}

export default { readLogsFile, createSeparatorArr, singleLogHandler }
