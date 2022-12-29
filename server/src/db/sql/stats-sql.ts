/* dashboard */
// count number by log_state
export const countNumberByLogStateSql = `SELECT log_state, COUNT(*) as total from logs GROUP BY log_state`

// select recently log_state is Error Data
// need limit number
export const selectLogsOfRecentlyErrorSql = `SELECT * FROM logs WHERE log_state='Error' ORDER BY log_time DESC LIMIT ?`

// count all logs number by log time
export const countByLogTimeSql = `SELECT
substr( log_time, 1, pos - 1 ) AS logtime,
count( * ) AS total 
FROM
( SELECT *, instr ( log_time, ' ' ) AS pos FROM logs ) 
GROUP BY
logtime ORDER BY logtime DESC`
