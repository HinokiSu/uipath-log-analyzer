import { filterLogsFile, getFileObj } from '../file-name-analyzer'

describe('parse and get file name all right', () => {
  it('parse and filter file name', () => {
    const testLogsFileArr = [
      '2023-02-02_WorkflowAnalyzer_Execution.log',
      '2023-02-02_Execution.log',
      '2023-02-10_WorkflowAnalyzer_Execution.log',
      '2023-02-10_Execution.log'
    ]
    const expectedRes = ['2023-02-02_Execution.log', '2023-02-10_Execution.log']
    const filteredArr = testLogsFileArr.filter((item) => filterLogsFile(item))
    expect(filteredArr.length).toBe(2)
    expect(expect.arrayContaining(filteredArr)).toEqual(expectedRes)
    expect(expect.arrayContaining(filteredArr)).not.toEqual([
      '2023-02-02_WorkflowAnalyzer_Execution.log',
      '2023-02-10_WorkflowAnalyzer_Execution.log'
    ])
    //
  })
  it('get file name obj', () => {
    const fileName = '2023-02-09_Execution.log'
    const rootPath = `C:\\Uipath\\Logs`
    const res = getFileObj(fileName, rootPath)
    const expectedRes = {
      name: '2023-02-09_Execution.log',
      path: 'C:\\Uipath\\Logs\\2023-02-09_Execution.log',
      time: '2023-02-09'
    }
    expect(res).toMatchObject(expectedRes)
  })
})
