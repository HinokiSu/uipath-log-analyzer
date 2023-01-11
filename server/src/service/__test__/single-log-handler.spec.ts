import dayjs from 'dayjs'
import logFormatter from '../../core/log-formatter'
const logData = `14:20:18.4827 Info {"message":"19340767","level":"Information","logType":"User","timeStamp":"2022-12-05T14:20:18.4823694+08:00","fingerprint":"c8244bbd-5a1d-4a1e-a3f7-6657ac766cc1","windowsIdentity":"DESKTOP-OMS4RCP\\Hinoki","machineName":"DESKTOP-OMS4RCP","fileName":"invoke_list","processName":"Downloads","processVersion":"1.0.0","jobId":"96c97e81-137d-4cba-b1b5-ee3e6a85a1bf","robotName":"yukihinoki@qq.com-attended","machineId":2152810,"organizationUnitId":3103367}`

describe('parsed all right', () => {
  it('ok', () => {
    const fileTime = '2022-12-05'
    const res = logFormatter.singleLogHandler(fileTime, logData)
    const exceptRes = {
      id: '37324c86-b3a2-47f2-a2de-723ead109904',
      logTime: '2022-12-05 14:20:18.4827',
      logState: 'Info',
      message: '19340767',
      organizationUnitId: '3103367',
      level: 'Information',
      logType: 'User',
      timeStamp: '2022-12-05T14:20:18.4823694+08:00',
      fingerprint: 'c8244bbd-5a1d-4a1e-a3f7-6657ac766cc1',
      windowsIdentity: 'DESKTOP-OMS4RCP\\Hinoki',
      machineName: 'DESKTOP-OMS4RCP',
      totalExecutionTimeInSeconds: '',
      totalExecutionTime: '',
      initiatedBy: '',
      fileName: 'invoke_list',
      processName: 'Downloads',
      processVersion: '1.0.0',
      jobId: '96c97e81-137d-4cba-b1b5-ee3e6a85a1bf',
      robotName: 'yukihinoki@qq.com-attended',
      machineId: '2152810'
    }

    expect(res).toBe(exceptRes)
  })
})

describe('time ok', () => {
  it('ok', () => {
    const _t = `2022-12-05 14:20:18.4827`
    const res = dayjs(_t).format('YYYY-MM-DDTHH:mm:ss.SSS')
    console.log(res)
  })
})

describe('time > undfined ', () => {
  it('yes', () => {
    const _t = undefined || ''
    console.log('2022-12-05 14:20:18.490' > _t)
  })
})
