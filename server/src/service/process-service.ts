import db from '../db'
import {
  countByProcessNameSql,
  countLogStateGroupByPN,
  countTotalExecutionTimesByProcessName,
  selectExecutionInfoBySpecifyDateAndProcessName
} from '../db/sql/process-sql'
import { handleExecutionInfo } from './common/execution-info-handler'
import { calcOffset } from './common/pagin-handler'
import { handleSuccess } from './common/result-handler'
import {
  getAllExecutionInfoByPN,
  getErrorOrWarnDuringExecutionByProcessName,
  getLastExecutionInfoByProcessNameAndStartTime,
  sortArrByLogTime
} from './run-timeline-service'

export type TExecuteInfo = {
  id: string
  log_time: string
  log_state: string
  message: string
  time_stamp: string
  total_execution_time: string
  /* 0: execute started, 1: execute ended, -1: others */
  run_state: number
}

export const getTotalStartedExecutionTimesByProcessName = (processName: string) => {
  const totalRes = db.query(countTotalExecutionTimesByProcessName, [
    processName,
    handleExecutionInfo(processName)
  ])[0] as { total: number }
  return handleSuccess({
    message: 'Get the total number of executions successfully by ProcessName, ',
    data: {
      ...totalRes
    }
  })
}

export const getExecutionInfoBySpecifyTimeAndProcessName = (processName: string, date: string) => {
  // Features: Maybe it will be executed many times a day
  const specifyDate = date.concat('%')
  const res = db.query(selectExecutionInfoBySpecifyDateAndProcessName, [
    processName,
    specifyDate,
    handleExecutionInfo(processName),
    handleExecutionInfo(processName, false)
  ])
  return handleSuccess({
    message:
      'Get execution information is obtained successfully by the specified date and ProcessName, ',
    data: {
      list: res
    }
  })
}

export const getExecutionInfoAndErrorByProcessName = (
  processName: string,
  curPage: string,
  pageSize: string
) => {
  const { total, data: allExecutionInfoArr } = getAllExecutionInfoByPN(
    processName,
    curPage,
    pageSize
  )
  if (allExecutionInfoArr.length === 0)
    return handleSuccess({
      message: 'Get execution info and error during execution, successfully',
      data: {
        total: 0,
        list: []
      }
    })

  let tidyArr = allExecutionInfoArr
  for (let i = 0, len = allExecutionInfoArr.length; i < len; i++) {
    const endedTime = allExecutionInfoArr[i].log_time
    let startedTime: string
    if (i !== len - 1) {
      startedTime = allExecutionInfoArr[i + 1].log_time
    } else {
      const time = allExecutionInfoArr[len - 1].log_time
      const lastExecutionInfo = getLastExecutionInfoByProcessNameAndStartTime(processName, time)
      if (lastExecutionInfo.length === 0) {
        break
      }
      startedTime = lastExecutionInfo[0].log_time
    }
    const errorInfoArr = getErrorOrWarnDuringExecutionByProcessName(
      processName,
      startedTime,
      endedTime
    )
    if (errorInfoArr.length !== 0) {
      errorInfoArr.map((_t: TExecuteInfo) => {
        _t.run_state = -1
        return _t
      })
      // push all error info during execution to tidyArr
      errorInfoArr.forEach((item) => {
        tidyArr.push(item)
      })
    }
  }
  // sort tidy arr by log_time, ascending order(old -> now)
  tidyArr = sortArrByLogTime(tidyArr)
  return handleSuccess({
    message: 'Get execution info and error during execution, successfully',
    data: {
      ...total,
      list: tidyArr
    }
  })
}

export const getProcessesLogStats = (curPage: string, pageSize: string) => {
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(countLogStateGroupByPN, [pageSize, offset])
  const total = db.query(countByProcessNameSql, [])[0] as { total: number }

  return handleSuccess({
    message: `According Process name, get stats of diff state logs number, successfully`,
    data: {
      ...total,
      list: res
    }
  })
}
