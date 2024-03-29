import db from '../db'
import {
  countByProcessNameSql,
  countLogStateGroupByPN,
  countTotalExecutionTimesByProcessName,
  selectExecutionInfoBySpecifyDateAndProcessName
} from '../db/sql/process-sql'
import { handleExecutionInfo } from './common/execution-info-handler'
import { calcOffset } from './common/pagin-handler'
import { handleFailed, handleSuccess } from './common/result-handler'
import {
  getAllExecutionInfoByProcessName,
  getErrorOrWarnDuringExecutionByProcessName,
  getExecInfoByProcessNameAndRangeDate,
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
  return totalRes
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

const timelineHandler = (pn: string, execInfoArr: Array<TExecuteInfo>) => {
  let tidyArr = execInfoArr
  for (let i = 0, len = execInfoArr.length; i < len; i++) {
    const endedTime = execInfoArr[i].log_time
    let startedTime: string
    if (i !== len - 1) {
      startedTime = execInfoArr[i + 1].log_time
    } else {
      const time = execInfoArr[len - 1].log_time
      const lastExecutionInfo = getLastExecutionInfoByProcessNameAndStartTime(pn, time)
      if (lastExecutionInfo.length === 0) {
        break
      }
      startedTime = lastExecutionInfo[0].log_time
    }
    const errorInfoArr = getErrorOrWarnDuringExecutionByProcessName(pn, startedTime, endedTime)
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
  return tidyArr
}

export const getTimelineByProcessName = (
  processName: string,
  curPage: string,
  pageSize: string
) => {
  const { total, data: allExecutionInfoArr } = getAllExecutionInfoByProcessName(
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
  const tl = timelineHandler(processName, allExecutionInfoArr)
  return handleSuccess({
    message: 'Get execution info and error during execution, successfully',
    data: {
      ...total,
      list: tl
    }
  })
}

export const getTimelineBySpecifyProcessNameAndRangeDate = (
  pn: string,
  startDate: string,
  endDate: string,
  curPage: string,
  pageSize: string
) => {
  const { total, data: execInfoArr } = getExecInfoByProcessNameAndRangeDate(
    pn,
    startDate,
    endDate,
    curPage,
    pageSize
  )

  const tl = timelineHandler(pn, execInfoArr)
  return handleSuccess({
    message: 'Get execution info and error during execution, successfully',
    data: {
      ...total,
      list: tl
    }
  })
}
export const getProcessesLogStats = (curPage: string, pageSize: string) => {
  type TCountLogStateByProcess = {
    pn: string
    runTimes: number
    totalCount: number
    infoCount: number
    errorCount: number
    warnCount: number
    traceCount: number
  }
  const offset = calcOffset(curPage, pageSize)
  const res = db.query(countLogStateGroupByPN, [pageSize, offset]) as TCountLogStateByProcess[]
  for (const item of res) {
    if (item.pn !== '') {
      const { total } = getTotalStartedExecutionTimesByProcessName(item.pn)
      const idxRes = res.findIndex((_t) => _t.pn === item.pn)
      if (idxRes !== -1) {
        res[idxRes].runTimes = total
      }
    } else {
      return handleFailed({
        message: `According to process name, get stats of diff state logs number, failed, due to pn is empty`
      })
    }
  }

  const total = db.query(countByProcessNameSql, [])[0] as { total: number }
  return handleSuccess({
    message: `According to Process name, get stats of diff state logs number, successfully`,
    data: {
      ...total,
      list: res
    }
  })
}
