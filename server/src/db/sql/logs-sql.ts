import { createSqlField, createSqlValuesMark } from './index'

// logs table name
const tbName = 'logs'
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

export const insertLogSql = `INSERT INTO ${tbName} (${createSqlField(
  fieldOfLogsTBArr
)}) VALUES (${createSqlValuesMark(fieldOfLogsTBArr)})`

export const deleteLogSql = `DELETE FROM ${tbName} WHERE log_time = strftime('%Y-%m-%d', log_time)`

// select logs info by process_version
export const selectByProcessVersion = `SELECT * FROM logs WHERE process_version = ?`

// select specify date logs, ex: '2022-12-05 %'
export const selectByLogTime = `SELECT * from logs WHERE log_time LIKE '?' ORDER BY datetime(log_time) DESC `


/* dashboard */
// count number by log_state
export const countNumberByLogState = `SELECT COUNT(*), log_state from logs GROUP BY log_state`

// select recently log_state is Error Data
// need limit number
export const selectRecentlyError = `SELECT * FROM logs WHERE log_state='Error' ORDER BY datetime(log_time) DESC LIMIT ?`


// count all logs by log time
export const countByLogTime = `SELECT count(*), substr( log_time, 1, pos - 1 ) AS ltime 
FROM
	( SELECT *, instr( log_time, ' ' ) AS pos FROM logs ) 
GROUP BY ltime`
