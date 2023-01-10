export type TLogInfo = {
  id: string
  log_time: string
  log_state: string
  message: string
  level: string
  log_type: string
  time_stamp: string
  fingerprint: string
  windows_identity: string
  machine_name: string
  file_name: string
  total_execution_time_in_seconds: string
  total_execution_time: string
  initiated_by: string
  process_name: string
  process_version: string
  job_id: string
  robot_name: string
  machine_id: string
  organization_unit_id: string
}


export type TPNOfLogState = {
  pn: string
  totalCount: number
  infoCount: number
  errorCount: number
  traceCount: number
  warnCount: number
}