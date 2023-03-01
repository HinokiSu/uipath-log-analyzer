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
      message: `Get logs information failed in statistics`
    })
  }
  return handleSuccess({
    message: `Get logs information successfully in statistics`,
    data: {
      list: res
    }
  })
}

/**
 * obtain recently error logs
 * @param limit number of error logs
 * @returns error logs array
 */
export const getLogsOfRecentlyError = (qty: number) => {
  if (qty === 0) {
    return handleFailed({
      message: `Get recently log state Of error failed in statistics`
    })
  }
  const res = db.query(selectLogsOfRecentlyErrorSql, [qty])
  return handleSuccess({
    message: `Get recently log state Of error successfully in statistics!`,
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
  return handleSuccess({
    message: `count log number by log time successfully`,
    data: {
      total: res.length,
      list: res
    }
  })
}
