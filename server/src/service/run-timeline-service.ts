import {
  countExecuteInfoTotalByProcessName,
  selectErrorOrWarnDuringExecutionByProcessName,
  selectExecuteInfoByProcessName,
  selectLastExecutionInfoByProcessNameAndStartTime
} from '../db/sql/process-sql'
import db from '../db'
import { calcOffset } from './common/pagin-handler'
import { TExecuteInfo } from './process-service'
import { handleExecutionInfo } from './common/execution-info-handler'

const getRunState = (origin: any[]) =>
  origin.map((_t: TExecuteInfo) => {
    if (_t.message.includes('execution started')) {
      /* 0: execute started */
      _t.run_state = 0
    } else if (_t.message.includes('execution ended')) {
      /* 1: execute ended */
      _t.run_state = 1
    } else {
      _t.run_state = -1
    }
    return _t
  })

export const getAllExecutionInfoByPN = (processName: string, curPage: string, pageSize: string) => {
  // : TExecuteInfo[] | any[]
  const offsetPage = calcOffset(curPage, pageSize)
  // id, log_time, log_state, message, time_stamp,total_execution_time
  const res = db.query(selectExecuteInfoByProcessName, [
    processName,
    handleExecutionInfo(processName),
    handleExecutionInfo(processName, false),
    pageSize,
    offsetPage
  ])
  const totalRes = db.query(countExecuteInfoTotalByProcessName, [
    processName,
    handleExecutionInfo(processName),
    handleExecutionInfo(processName, false)
  ])[0] as { total: number }

  let formattedRes: TExecuteInfo[]
  if (res.length === 0) {
    formattedRes = []
  } else {
    formattedRes = getRunState(res)
  }
  return { total: totalRes, data: formattedRes }
}

export const sortArrByLogTime = (arr: TExecuteInfo[]) => {
  return arr.sort((a, b) => {
    // compare log_time, to sort
    const compare: number = Date.parse(b.log_time) - Date.parse(a.log_time)
    if (compare === 0) {
      return a.run_state - b.run_state
    }
    return compare
  })
}

export const getLastExecutionInfoByProcessNameAndStartTime = (
  pn: string,
  time: string
): TExecuteInfo[] => {
  const res = db.query(selectLastExecutionInfoByProcessNameAndStartTime, [
    pn,
    time,
    handleExecutionInfo(pn),
    handleExecutionInfo(pn, false)
  ])
  return res
}

export const getErrorOrWarnDuringExecutionByProcessName = (
  processName: string,
  startTime: string,
  endTime: string
) => {
  const res = db.query(selectErrorOrWarnDuringExecutionByProcessName, [
    processName,
    startTime,
    endTime
  ])
  return res
}
