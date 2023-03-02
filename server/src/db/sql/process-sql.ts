/* According process name */

/**
 * group and count by process_name
 */
export const countByProcessNameSql = `SELECT COUNT(*) as total from (SELECT process_name from logs GROUP BY process_name)`

/**
 * group by process_name and count diff log_state
 * @param limit
 * @param offset
 */
export const countLogStateGroupByPN = `SELECT
process_name AS pn,
COUNT( * ) AS totalCount,
SUM( CASE WHEN log_state = 'Info' THEN 1 ELSE 0 END ) AS infoCount,
SUM( CASE WHEN log_state = 'Error' THEN 1 ELSE 0 END ) AS errorCount,
SUM( CASE WHEN log_state = 'Trace' THEN 1 ELSE 0 END ) AS traceCount,
SUM( CASE WHEN log_state = 'Warn' THEN 1 ELSE 0 END ) AS warnCount 
FROM
logs 
GROUP BY
process_name ORDER BY log_time DESC LIMIT ? OFFSET ?;`

/**
 * get execute info by specify process name, tips: descending sort, need reverse array
 * @param process_name
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 * @param limit
 * @param offset
 */
export const selectAllExecInfoByProcessName = `SELECT id, log_time, log_state, message, time_stamp,total_execution_time from logs WHERE process_name = ? and (message = ? or message = ?) ORDER BY log_time DESC LIMIT ? OFFSET ?`

/**
 * count stated or ended execution info total by process name
 * @param process_name
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 */
export const countAllExecInfoTotalByProcessName = `SELECT COUNT(*) as total from logs WHERE process_name = ? and (message = ? or message = ?)`

/**
 * get all execution info by process name and range date
 * @param process_name
 * @param log_timeOfStartTime  ex: '2022-11-14 00:00:00.000'
 * @param log_timeOfEndTime  ex: '2022-11-15 23:59:59.999'
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 * @param limit
 * @param offset
 */
export const selectExecInfoByProcessNameAndRangeDate = `SELECT id, log_time, log_state, message, time_stamp, total_execution_time 
FROM logs WHERE
process_name = ?
AND ( log_time >= ? AND log_time <= ?) 
AND ( message = ? OR message = ? ) 
ORDER BY log_time LIMIT ? OFFSET ?;`


/**
 * count all execution info by process name and range date
 * @param process_name
 * @param log_timeOfStartTime  ex: '2022-11-14 00:00:00.000'
 * @param log_timeOfEndTime  ex: '2022-11-15 23:59:59.999'
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 * @param limit
 * @param offset
 */
export const countExecInfoTotalByProcessNameAndRangeDate = `SELECT COUNT(*) as total 
FROM logs WHERE
process_name = ?
AND ( log_time >= ? AND log_time <= ?) 
AND ( message = ? OR message = ? );`

/**
 * During specify execution time and process, get error or warn info
 * @param process_name
 * @param log_timeOfStartTime
 * @param log_timeOfEndTime
 */
export const selectErrorOrWarnDuringExecutionByProcessName = `SELECT id, log_time, log_state, message, time_stamp, total_execution_time from logs WHERE process_name = ? and (log_time > ? and log_time < ? ) AND (log_state = 'Error' OR log_state = 'Warn') ORDER BY log_time DESC LIMIT 3`

/**
 * count all execute times by specify process
 * @param process_name
 * @param startedExecutionInfo
 */
export const countTotalExecutionTimesByProcessName = `SELECT COUNT(*) as total FROM logs WHERE process_name = ? AND message = ? `

/**
 * get execution info by specify date and process
 * @param process_name
 * @param log_time
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 */
export const selectExecutionInfoBySpecifyDateAndProcessName = `SELECT *  from (SELECT * FROM logs WHERE process_name = ? AND log_time LIKE ?) WHERE  message = ? or message = ? ORDER BY log_time`

/**
 * get last execution info by process name and start time
 * @param process_name @param log_time
 * @param startedExecutionInfo
 * @param endedExecutionInfo
 */
export const selectLastExecutionInfoByProcessNameAndStartTime = `SELECT id, log_time, log_state, message, time_stamp,total_execution_time FROM logs WHERE process_name = ? and (log_time < ?) AND (message = ? or message = ?) ORDER BY log_time DESC LIMIT 1`


