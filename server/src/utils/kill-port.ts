// reference: https://github.com/tiaanduplessis/kill-port/blob/master/index.js
import sh from './shell-exec'
const method = 'tcp'

// check whether current platform is win32
const checkWin32Platform = () => {
  if (process.platform !== 'win32') {
    throw new Error('Currently does not support platforms other than win32')
  }
}

export const findPidByPort = async (port: number) => {
  checkWin32Platform()
  return await sh(`netstat -aon|findstr ${port}`)
    .then((res) => {
      const { stdout } = res
      if (!stdout) return ''
      const lines = stdout.split('\n')
      const lineWithLocalPortRegEx = new RegExp(`^ *${method.toUpperCase()} *[^ ]*:${port}`, 'gm')
      // reserve TCP
      const linesWithLocalPort = lines.filter((line) => line.match(lineWithLocalPortRegEx))
      const pids = linesWithLocalPort.reduce((acc, line) => {
        const match = line.match(/(\d*)\w*(\n|$)/gm) as never
        return match && match[0] && !acc.includes(match[0]) ? acc.concat(match[0]) : acc
      }, [])
      if (pids.length === 0) return ''
      return pids[0]
    })
    .catch((err) => {
      console.log('Error: findPidByPort, --> ' + err)
      return ''
    })
}

export const killProcessByPid = async (pid: any) => {
  pid = Number.parseInt(pid)
  if (!pid) return
  return await sh(`TaskKill /F /PID ${pid}`)
}

type TInfoObj = {
  IMAGENAME: string
  PID: string
  SESSIONNAME: string
  SESSION: string
  MEMUSAGE: string
}

// according to the pid, check process information
export const checkProcessInfoByPid = async (pid: any) => {
  checkWin32Platform()
  pid = Number.parseInt(pid)
  if (!pid) {
    return Promise.reject(new Error('Invalid pid number provided'))
  }

  /* 
    映像名称,   PID, 会话名,       会话,     内存使用(KB)
    IMAGENAME, PID, SESSIONNAME,  SESSION, MEMUSAGE
  */

  //  shell-exec not support '/fo csv' or '/fo list' param
  return await sh(`tasklist|findstr ${pid}`)
    .then((res) => {
      const { stdout } = res
      if (!stdout) return
      const lines = stdout.split('\n')
      lines.filter((_t) => {
        return _t === '' ? false : true
      })
      if (lines.length === 0) return ''
      const pInfo = lines[0].split(' ').filter((_t) => {
        return _t === '' || _t === 'K\r' ? false : true
      })
      const infoObj: TInfoObj = Object.create(null)
      infoObj['IMAGENAME'] = pInfo[0]
      infoObj['PID'] = pInfo[1]
      infoObj['SESSIONNAME'] = pInfo[2]
      infoObj['SESSION'] = pInfo[3]
      infoObj['MEMUSAGE'] = pInfo[4]
      return infoObj
    })
    .catch((err) => {
      console.log('Error: show process Info By Pid -->' + err)
    })
}

export const checkPortIsOccupied = async (port: any) => {
  port = Number.parseInt(port)
  if (!port) {
    return Promise.reject(new Error('Invalid port number provided'))
  }
  checkWin32Platform()
  const pid = await findPidByPort(port)
  // port not exist
  if (!pid) return
  const processInfo = await checkProcessInfoByPid(pid)

  if (processInfo && Object.keys(processInfo).length !== 0) {
    console.log(
      `Current Port: [${port}] is used, process information: \n ${JSON.stringify(processInfo)}`
    )
    return pid
  }
  return
}
