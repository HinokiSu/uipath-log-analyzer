/* dashboard */
// count number by log_state
export const countNumberByLogStateSql = `SELECT log_state, COUNT(*) as total from logs GROUP BY log_state`

// select recently log_state is Error Data
// need limit number
export const selectLogsOfRecentlyErrorSql = `SELECT * FROM logs WHERE log_state='Error' ORDER BY log_time DESC LIMIT ?`

/**
 * count each log state by log time, limit 30
 */
export const countByLogTimeSql = `SELECT
substr( log_time, 1, pos - 1 ) AS logtime,
COUNT( * ) AS totalCount,
SUM( CASE WHEN log_state = 'Info' THEN 1 ELSE 0 END ) AS infoCount,
SUM( CASE WHEN log_state = 'Error' THEN 1 ELSE 0 END ) AS errorCount,
SUM( CASE WHEN log_state = 'Trace' THEN 1 ELSE 0 END ) AS traceCount,
SUM( CASE WHEN log_state = 'Warn' THEN 1 ELSE 0 END ) AS warnCount 
FROM
( SELECT *, instr ( log_time, ' ' ) AS pos FROM logs ) 
GROUP BY
logtime 
ORDER BY
logtime DESC LIMIT 30`
