import fs from 'fs'
import path from 'path'

// read logs file
export const readLogsFile = (fPath: string) => {
  const res = fs.readFile(path.join(__dirname, fPath), 'utf-8', (err: any, data: any) => {
    if (err) return console.log(err)
    console.log(data)
    return data
  })
  console.log(res)
}

const createSepatatorArr = () => {
  const sepFlgArr = [
    "message",
    "level",
    "logType",
    "timeStamp",
    "fingerprint",
    "windowsIdentity",
    "machineName",
    "fileName",
    "initiatedBy",
    "processName",
    "processVersion",
    "jobId",
    "robotName",
    "machineId",
    "organizationUnitId",
  ]
}
