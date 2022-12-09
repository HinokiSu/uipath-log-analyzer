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
