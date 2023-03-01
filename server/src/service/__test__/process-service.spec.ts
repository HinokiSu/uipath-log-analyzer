describe('process service', () => {
  it('is ok', () => {
    const tArr = [
      {
        id: '6115712b-6deb-42dd-b231-359b41fddc41',
        log_time: '2023-02-13 14:21:34.795',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution started',
        time_stamp: '2023-02-13T14:21:34.7921856+08:00',
        total_execution_time: '',
        run_state: 0
      },

      {
        id: '7a2bbae3-cd62-49b9-8a69-2f46efc3a0f2',
        log_time: '2023-02-13 14:23:34.795',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution ended',
        time_stamp: '2023-02-13T14:21:35.1318516+08:00',
        total_execution_time: '00:00:00',
        run_state: 1
      },
      {
        id: '18e91ba0-2026-431f-bcc2-9bd76cfadd06',
        log_time: '2023-02-13 15:01:34.795',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution started',
        time_stamp: '2023-02-13T14:22:00.9269512+08:00',
        total_execution_time: '',
        run_state: 0
      },
      {
        id: 'e583d75a-2a89-449e-9212-03b6cf3b1842',
        log_time: '2023-02-13 15:03:34.795',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution ended',
        time_stamp: '2023-02-13T14:22:01.2665929+08:00',
        total_execution_time: '00:00:00',
        run_state: 1
      },
      {
        id: '526fb834-91d8-4cba-b6c2-4e6ba97f0cbe',
        log_time: '2023-02-13 16:10:02.043',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution started',
        time_stamp: '2023-02-13T14:22:02.0397873+08:00',
        total_execution_time: '',
        run_state: 0
      },
      {
        id: 'dbf693ae-ed55-47db-9fa8-96567e75b3c6',
        log_time: '2023-02-13 16:16:02.366',
        log_state: 'Info',
        message: 'TestCase_1_Demo execution ended',
        time_stamp: '2023-02-13T14:22:02.36489+08:00',
        total_execution_time: '00:00:00',
        run_state: 1
      },
      {
        id: '19e36448-9ff8-4e99-b620-4810d6719712',
        log_time: '2023-02-13 14:23:34.795',
        log_state: 'Error',
        message: 'TestCase_1_Demo Error 1',
        time_stamp: '2023-02-13T14:22:03.4630375+08:00',
        total_execution_time: '00:00:00',
        run_state: -1
      }
    ]
    tArr.sort((a, b) => {
      const compare = Date.parse(a.log_time) - Date.parse(b.log_time)
      if (compare === 0) {
        return a.run_state - b.run_state
      }
      return compare
    })
  })
})
