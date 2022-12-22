import { createSqlField, createSqlValuesMark } from './index'

// logs table
const fieldOfLogsTBArr = [
  'id',
  'log_time',
  'log_state',
  'message',
  'level',
  'log_type',
  'time_stamp',
  'fingerprint',
  'windows_identity',
  'machine_name',
  'file_name',
  'total_execution_time_in_seconds',
  'total_execution_time',
  'initiated_by',
  'process_name',
  'process_version',
  'job_id',
  'robot_name',
  'machine_id',
  'organization_unit_id'
]

export const insertLogSql = `INSERT INTO logs (${createSqlField(
  fieldOfLogsTBArr
)}) VALUES (${createSqlValuesMark(fieldOfLogsTBArr)})`

export const deleteLogSql = `DELETE FROM logs WHERE log_time = strftime('%Y-%m-%d', log_time)`

// select logs info by process_version
export const selectSpecifyProcessVersionSql = `SELECT * FROM logs WHERE process_name = ? ORDER BY log_time DESC limit ? offset ? `
export const countSpecifyProcessVersionSql = `SELECT count(*) as total FROM logs WHERE process_name = ?`
// select specify date logs, ex: '2022-12-05 %'
/* 
refer: https://stackoverflow.com/questions/14091183/sqlite-order-by-date1530019888000
note that if you want to order by date and time you need to use datetime() intead of date()
*/
export const selectSpecifyLogTimeSql = `SELECT * from logs WHERE log_time LIKE ? ORDER BY log_time DESC limit ? offset ?`
export const countSpecifyLogTimeSql = `SELECT count(*) as total FROM logs WHERE log_time LIKE ?`


// find latest log in specify date
export const findLatestLogInSpecifyDate = `SELECT log_time from logs WHERE log_time LIKE ? ORDER BY log_time DESC LIMIT 1`

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

// group and count by process_name
export const countByProcessNameSql = `SELECT process_name,COUNT(*) as total from logs GROUP BY process_name`
