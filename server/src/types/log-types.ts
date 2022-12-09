export interface IFileInfoObj {
  name: string
  path: string
  time: string
}

export type ILogDataObjItem = {
  name: string
  flag: string
}

export interface ILogObj {
  id: string
  logTime: string
  logState: string
  message: string
  level: string
  logType: string
  timeStamp: string
  fingerprint: string
  windowsIdentity: string
  machineName: string
  fileName: string
  totalExecutionTimeInSeconds: string
  totalExecutionTime: string
  initiatedBy: string
  processName: string
  processVersion: string
  jobId: string
  robotName: string
  machineId: string
  organizationUnitId: string
}
