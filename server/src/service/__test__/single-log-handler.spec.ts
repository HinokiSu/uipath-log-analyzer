import logFormatter from '../../core/log-formatter'

const fileTime = '2023-01-01'

describe('Parse logs related', () => {
  test('latest uipath ver > 2019.10, no ending log', () => {
    const logData = `11:52:22.2997 Info {"message":"Downloads run...","level":"Information","logType":"Default","timeStamp":"2022-12-05T11:52:22.2985528+08:00","fingerprint":"85ab69c0-73a0-4b5e-bb7c-c07f88619f6a","windowsIdentity":"DESKTOP-example\\Hinoki","machineName":"DESKTOP-example","fileName":"invoke_list","initiatedBy":"Studio","processName":"Downloads","processVersion":"1.0.0","jobId":"06698f21-e8b0-41f9-9b8c-3c80edf5d503","robotName":"hinoki@example.com-attended","machineId":2152810,"organizationUnitId":3103367}`
    const res = logFormatter.mainLogHandler(fileTime, logData)
    const expectRes = {
      id: res.id,
      logTime: '2023-01-01 11:52:22.299',
      logState: 'Info',
      message: 'Downloads run...',
      level: 'Information',
      logType: 'Default',
      timeStamp: '2022-12-05T11:52:22.2985528+08:00',
      fingerprint: '85ab69c0-73a0-4b5e-bb7c-c07f88619f6a',
      windowsIdentity: 'DESKTOP-example\\Hinoki',
      machineName: 'DESKTOP-example',
      fileName: 'invoke_list',
      totalExecutionTimeInSeconds: '',
      totalExecutionTime: '',
      initiatedBy: 'Studio',
      processName: 'Downloads',
      processVersion: '1.0.0',
      jobId: '06698f21-e8b0-41f9-9b8c-3c80edf5d503',
      robotName: 'hinoki@example.com-attended',
      machineId: '2152810',
      organizationUnitId: '3103367'
    }

    expect(res).toMatchObject(expectRes)
  })

  test('latest uipath ver > 2019.10, ending log', () => {
    const sourceData = `09:46:36.8541 Info {"message":"GoogleAuth-Demo execution ended","level":"Information","logType":"Default","timeStamp":"2022-12-28T09:46:36.853246+08:00","fingerprint":"15c51dbd-1caa-42e3-bc97-318103674f29","windowsIdentity":"DESKTOP-example\\Hinoki","machineName":"DESKTOP-example","fileName":"Main","totalExecutionTimeInSeconds":5,"totalExecutionTime":"00:00:05","processName":"GoogleAuth-Demo","processVersion":"1.0.0","jobId":"4d06014e-e14a-4406-a015-3e2eac6fca86","robotName":"hinoki@example.com-attended","machineId":2152810,"organizationUnitId":3103367}`
    const parsedRes = logFormatter.mainLogHandler(fileTime, sourceData)
    const expectRes = {
      id: parsedRes.id,
      logTime: '2023-01-01 09:46:36.854',
      logState: 'Info',
      message: 'GoogleAuth-Demo execution ended',
      level: 'Information',
      logType: 'Default',
      timeStamp: '2022-12-28T09:46:36.853246+08:00',
      fingerprint: '15c51dbd-1caa-42e3-bc97-318103674f29',
      windowsIdentity: 'DESKTOP-example\\Hinoki',
      machineName: 'DESKTOP-example',
      fileName: 'Main',
      totalExecutionTimeInSeconds: '5',
      totalExecutionTime: '00:00:05',
      initiatedBy: '',
      processName: 'GoogleAuth-Demo',
      processVersion: '1.0.0',
      jobId: '4d06014e-e14a-4406-a015-3e2eac6fca86',
      robotName: 'hinoki@example.com-attended',
      machineId: '2152810',
      organizationUnitId: '3103367'
    }
    expect(parsedRes).toMatchObject(expectRes)
  })

  it('older uipath ver <= 2019.10, no ended log', () => {
    const logData = `09:47:08.3303 Info {"message":"InvoiceNumberReturn execution started","level":"Information","logType":"Default","timeStamp":"2023-02-07T09:47:08.326369+08:00","fingerprint":"38d6a1af-c77d-4d82-875c-89dc2ba5a5dc","windowsIdentity":"CN\\example","machineName":"HAH17-3301L","processName":"InvoiceNumberReturn","processVersion":"1.0.0","jobId":"e3804333-367b-4760-8601-f00d1584014c","robotName":"CN\\EXAMPLE","machineId":0,"fileName":"登录OMS"}`

    const res = logFormatter.mainLogHandler(fileTime, logData)
    const expectRes = {
      id: res.id,
      logTime: '2023-01-01 09:47:08.330',
      logState: 'Info',
      message: 'InvoiceNumberReturn execution started',
      level: 'Information',
      logType: 'Default',
      timeStamp: '2023-02-07T09:47:08.326369+08:00',
      fingerprint: '38d6a1af-c77d-4d82-875c-89dc2ba5a5dc',
      windowsIdentity: 'CN\\example',
      machineName: 'HAH17-3301L',
      processName: 'InvoiceNumberReturn',
      processVersion: '1.0.0',
      jobId: 'e3804333-367b-4760-8601-f00d1584014c',
      robotName: 'CN\\EXAMPLE',
      totalExecutionTimeInSeconds: '',
      totalExecutionTime: '',
      machineId: '0',
      initiatedBy: '',
      organizationUnitId: ''
    }
    expect(res).toMatchObject(expectRes)
  })
  it('older uipath ver <= 2019.10, ended log', () => {
    const logData = `13:44:23.5342 Info {"message":"retailInvoicAutomation execution ended","level":"Information","logType":"Default","timeStamp":"2023-02-07T13:44:23.5332693+08:00","fingerprint":"944c140f-ae4d-484c-9db3-6da7304d3f30","windowsIdentity":"CN\\example","machineName":"HAH17-3301L","processName":"retailInvoicAutomation","processVersion":"1.0.0","jobId":"4d0e64b9-069e-4671-8d48-af0d8991a258","robotName":"CN\\EXAMPLE","machineId":0,"totalExecutionTimeInSeconds":25,"totalExecutionTime":"00:00:25","fileName":"TIS-修改客户名称"}`
    const res = logFormatter.mainLogHandler(fileTime, logData)
    const expectRes = {
      id: res.id,
      logTime: '2023-01-01 13:44:23.534',
      logState: 'Info',
      message: 'retailInvoicAutomation execution ended',
      level: 'Information',
      logType: 'Default',
      timeStamp: '2023-02-07T13:44:23.5332693+08:00',
      fingerprint: '944c140f-ae4d-484c-9db3-6da7304d3f30',
      windowsIdentity: 'CN\\example',
      machineName: 'HAH17-3301L',
      processName: 'retailInvoicAutomation',
      processVersion: '1.0.0',
      jobId: '4d0e64b9-069e-4671-8d48-af0d8991a258',
      robotName: 'CN\\EXAMPLE',
      machineId: '0',
      totalExecutionTimeInSeconds: '25',
      totalExecutionTime: '00:00:25',
      initiatedBy: '',
      organizationUnitId: ''
    }
    expect(res).toMatchObject(expectRes)
  })
})
