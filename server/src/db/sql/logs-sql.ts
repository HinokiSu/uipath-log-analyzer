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

// select all logs
export const selectAllLogsSql = `SELECT * from logs ORDER BY log_time DESC LIMIT ? OFFSET ?`
export const countAllLogsSql = `SELECT COUNT(*) as total from logs`

// select logs info by process_name
export const selectSpecifyProcessNameSql = `SELECT * FROM logs WHERE process_name = ? ORDER BY log_time DESC limit ? offset ? `
export const countSpecifyProcessNameSql = `SELECT count(*) as total FROM logs WHERE process_name = ?`

export const selectRecentlyErrorSpecifyPNSql = `SELECT * from logs WHERE process_name = ? AND log_state = 'Error' ORDER BY log_time DESC LIMIT 1`

// select specify date logs, ex: '2022-12-05 %'
/* 
refer: https://stackoverflow.com/questions/14091183/sqlite-order-by-date1530019888000
note that if you want to order by date and time you need to use datetime() intead of date()
*/
export const selectSpecifyLogTimeSql = `SELECT * from logs WHERE log_time LIKE ? ORDER BY log_time DESC limit ? offset ?`
export const countSpecifyLogTimeSql = `SELECT count(*) as total FROM logs WHERE log_time LIKE ?`

// find latest log in specify date
export const findLatestLogInSpecifyDate = `SELECT log_time from logs WHERE log_time LIKE ? ORDER BY log_time DESC LIMIT 1`

