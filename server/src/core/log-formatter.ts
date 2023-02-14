/**
 * handle log data
 */
import fs from 'fs'
import { ILogDataObjItem } from '../types/log-types'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

// read logs file
const readLogsFile = (fPath: string) => {
  const res = fs.readFileSync(fPath, 'utf8')
  return res
}

const formatDelimiterArr = (sepFlagArr: Array<string>) => {
  const logDelimiterArray: ILogDataObjItem[] = []
  sepFlagArr.forEach((item: string) => {
    logDelimiterArray.push({
      name: item,
      flag: `,"${item}":`
    })
  })
  return logDelimiterArray
}

/* create delimiter array of latest Uipath version */
const createLatestVerDelimterArr = () => {
  const separatedFlagArr = [
    'message',
    'level',
    'logType',
    'timeStamp',
    'fingerprint',
    'windowsIdentity',
    'machineName',
    'fileName',
    'initiatedBy',
    'totalExecutionTimeInSeconds',
    'totalExecutionTime',
    'processName',
    'processVersion',
    'jobId',
    'robotName',
    'machineId',
    'organizationUnitId'
  ]
  return formatDelimiterArr(separatedFlagArr)
}

/* create delimiter array of older Uipath version */
const createOlderVerDelimeiterArr = () => {
  const oldseparatedFlagArr = [
    'message',
    'level',
    'logType',
    'timeStamp',
    'fingerprint',
    'windowsIdentity',
    'machineName',
    'processName',
    'processVersion',
    'jobId',
    'robotName',
    'machineId',
    'totalExecutionTimeInSeconds',
    'totalExecutionTime',
    'fileName'
  ]
  return formatDelimiterArr(oldseparatedFlagArr)
}


/**
 * 
 * @param fileTime time in this log file name
 * @param logData log string
 * @param delimiterArr delimiter
 * @returns 
 */
const generalLogHandler = (fileTime: string, logData: string, delimiterArr: ILogDataObjItem[]) => {
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
  for (let i = 0, len = delimiterArr.length; i < len - 1; i++) {
    // whether has sep flag
    if (logMainData.includes(delimiterArr[i + 1].flag)) {
      _temp = logMainData.split(delimiterArr[i + 1].flag)
      if (_temp[0].charAt(0) === '"' && _temp[0].charAt(_temp[0].length - 1) === '"') {
        // remove double quotes around
        _temp[0] = _temp[0].slice(1, -1)
      }
      if (_key === '') {
        // write in logObj
        logObj[delimiterArr[i].name] = _temp[0]
      } else {
        logObj[_key] = _temp[0]
        _key = ''
      }
      logMainData = _temp[1]
    } else {
      // when there is no initiatedBy or others,it will is setted empty string
      logObj[delimiterArr[i + 1].name] = ''
      if (_key === '') {
        _key = delimiterArr[i].name
      }
    }
  }

  return {
    handledLogObj: logObj,
    restData: _temp[1]
  }
}

const mainLogHandler = (fileTime: string, logData: string) => {
  const isLatestVer = logData.includes(`,"organizationUnitId":`)
  if (isLatestVer) {
    // uipath version >= 2019.10
    const DelimeiterArr = createLatestVerDelimterArr()
    // Need reBuild: get organizationUnitId value
    const { handledLogObj: processedLogObj, restData } = generalLogHandler(
      fileTime,
      logData,
      DelimeiterArr
    )
    if (restData === '') {
      throw 'Error: Latest Uipath version, restData is null'
    } else {
      processedLogObj['organizationUnitId'] = restData.split('}', 2)[0]
    }
    return processedLogObj
  } else {
    const DelimeiterArr: ILogDataObjItem[] = createOlderVerDelimeiterArr()
    const { handledLogObj: processedLogObj, restData } = generalLogHandler(
      fileTime,
      logData,
      DelimeiterArr
    )
    if (restData === '') {
      throw 'Error: Older Version Uipath, restData is null'
    }
    // fixed: uipath 2019.10 version log data struct

    processedLogObj['initiatedBy'] = ''
    processedLogObj['organizationUnitId'] = ''
    return processedLogObj
  }
}

export default {
  readLogsFile,
  createLatestVerDelimterArr,
  mainLogHandler
}
