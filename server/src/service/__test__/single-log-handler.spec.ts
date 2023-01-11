import logFormatter from '../../core/log-formatter'

describe('parsed all right', () => {
  test('no ending log', () => {
    const logData = `11:52:22.2997 Info {"message":"Downloads run...","level":"Information","logType":"Default","timeStamp":"2022-12-05T11:52:22.2985528+08:00","fingerprint":"85ab69c0-73a0-4b5e-bb7c-c07f88619f6a","windowsIdentity":"DESKTOP-example\\Hinoki","machineName":"DESKTOP-example","fileName":"invoke_list","initiatedBy":"Studio","processName":"Downloads","processVersion":"1.0.0","jobId":"06698f21-e8b0-41f9-9b8c-3c80edf5d503","robotName":"hinoki@example.com-attended","machineId":2152810,"organizationUnitId":3103367}`
    const fileTime = '2022-12-05'
    const res = logFormatter.singleLogHandler(fileTime, logData)
    const exceptRes = {
      id: res.id,
      logTime: '2022-12-05 11:52:22.299',
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

    expect(res).toMatchObject(exceptRes)
  })

  test('ending log', () => {
    const fileTime = '2022-12-28'
    const sourceData = `09:46:36.8541 Info {"message":"GoogleAuth-Demo execution ended","level":"Information","logType":"Default","timeStamp":"2022-12-28T09:46:36.853246+08:00","fingerprint":"15c51dbd-1caa-42e3-bc97-318103674f29","windowsIdentity":"DESKTOP-example\\Hinoki","machineName":"DESKTOP-example","fileName":"Main","totalExecutionTimeInSeconds":5,"totalExecutionTime":"00:00:05","processName":"GoogleAuth-Demo","processVersion":"1.0.0","jobId":"4d06014e-e14a-4406-a015-3e2eac6fca86","robotName":"hinoki@example.com-attended","machineId":2152810,"organizationUnitId":3103367}`
    const parsedRes = logFormatter.singleLogHandler(fileTime, sourceData)
    const exceptRes = {
      id: parsedRes.id,
      logTime: '2022-12-28 09:46:36.854',
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
    expect(parsedRes).toMatchObject(exceptRes)
  })
})
