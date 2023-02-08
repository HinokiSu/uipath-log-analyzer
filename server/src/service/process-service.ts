import db from '../db'
import {
  countExcuteInfoTotalByProcessName,
  countTotalExcutionTimeByProcessName,
  selectErrorOrWarnDuringExcutionByProcessName,
  selectExcuteInfoByProcessName,
  selectExcutionInfoBySpecifyDateAndProcessName
} from '../db/sql/process-sql'
import { calcOffset } from './common/pagin-handler'
import { handleSuccess } from './common/result-handler'

export type TExcuteInfo = {
  id: string
  log_time: string
  log_state: string
  message: string
  time_stamp: string
  total_execution_time: string
}

/**
 * handle excution info of process
 * @param processName string
 * @param type boolean, default: true, excution started info
 * @returns handled excution info
 */
const handleExcutionInfo = (processName: string, type = true): string => {
  if (type) {
    return processName + ' execution started'
  } else {
    return processName + ' execution ended'
  }
}

export const getAllExcutionInfoByPN = (processName: string, curPage: string, pageSize: string) => {
  const offsetPage = calcOffset(curPage, pageSize)
  // id, log_time, log_state, message, time_stamp,total_execution_time
  const res = db.query(selectExcuteInfoByProcessName, [
    processName,
    handleExcutionInfo(processName),
    handleExcutionInfo(processName, false),
    pageSize,
    offsetPage
  ])
  const totalRes = db.query(countExcuteInfoTotalByProcessName, [
    processName,
    handleExcutionInfo(processName),
    handleExcutionInfo(processName, false)
  ])[0] as { total: number }
  handleSuccess({
    message: '根据ProcessName, 获取执行信息成功',
    data: {
      ...totalRes,
      list: res.reverse
    }
  })
}

export const getErrorOrWarnDuringExcutionByProcessName = (
  processName: string,
  startTime: string,
  endTime: string
) => {
  const res = db.query(selectErrorOrWarnDuringExcutionByProcessName, [
    processName,
    startTime,
    endTime
  ])

  handleSuccess({
    message: '根据ProcessName及执行的起始日期, 获取Error 或 Warn信息成功',
    data: {
      list: res
    }
  })
}

export const getTotalExcutionTimesByProcessName = (processName: string) => {
  const totalRes = db.query(countTotalExcutionTimeByProcessName, [
    processName,
    handleExcutionInfo(processName)
  ])[0] as { total: number }
  handleSuccess({
    message: '根据ProcessName, 获取总执行次数成功',
    data: {
      ...totalRes
    }
  })
}

export const getExcutionInfoBySpecifyTimeAndProcessName = (processName: string, date: string) => {
  const specifyDate = date.concat('%')
  const res = db.query(selectExcutionInfoBySpecifyDateAndProcessName, [
    processName,
    specifyDate,
    handleExcutionInfo(processName),
    handleExcutionInfo(processName, false)
  ])
  handleSuccess({
    message: '根据指定日期和ProcessName,获取执行信息成功',
    data: {
      list: res
    }
  })
}
