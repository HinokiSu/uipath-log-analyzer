
export type TProcessExecutionInfo = {
  id: string
  log_time: string
  log_state: string
  message: string
  time_stamp: string
  total_execution_time: string
  run_state: number
}

export type TProcessLogStats = {
  pn: string
  totalCount: number
  infoCount: number
  errorCount: number
  traceCount: number
  warnCount: number
  runTimes: number
}


