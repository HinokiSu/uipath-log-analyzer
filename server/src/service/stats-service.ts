/* dashboard */

import { handleFailed, handleSuccess } from './common/result-handler'
import db from '../db/index'
import {
  countByLogTimeSql,
  countNumberByLogStateSql,
  selectLogsOfRecentlyErrorSql
} from '../db/sql/stats-sql'

/**
 * obtain stats based on log state
 * @returns statistics array
 */
export const getStatsByLogState = () => {
  const res = db.query(countNumberByLogStateSql)
  if (!res.length) {
    handleFailed({
      message: `根据log 获取Logs信息失败!`
    })
  }
  return handleSuccess({
    message: `根据log time获取Logs信息成功`,
    data: {
      list: res
    }
  })
}

/**
 * obtain recently error logs
 * @param limt number of error logs
 * @returns error logs array
 */
export const getLogsOfRecentlyError = (limt: number) => {
  const res = db.query(selectLogsOfRecentlyErrorSql, [limt])
  if (!res.length) {
    return handleFailed({ message: `获取最近日志状态为Error的数据失败!` })
  }
  return handleSuccess({
    message: `获取最近日志状态为Error的数据成功!`,
    data: {
      list: res
    }
  })
}

/**
 * stats based on logtime
 * @returns [{logtime, total}]
 */
export const getStatsByLogTime = () => {
  const res = db.query(countByLogTimeSql)
  if (!res.length) {
    return handleFailed({
      message: `根据log time统计log数量失败!`
    })
  }
  return handleSuccess({
    message: `根据log time统计log数量成功`,
    data: {
      list: res
    }
  })
}
