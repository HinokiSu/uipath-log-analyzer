import { filterLogsFile } from '../file-name-analyzer'

describe('parse and get file name all right', () => {
  it('parse and filter file name', () => {
    const testLogsFileArr = [
      '2023-02-02_WorkflowAnalyzer_Execution.log',
      '2023-02-02_Execution.log',
      '2023-02-10_WorkflowAnalyzer_Execution.log',
      '2023-02-10_Execution.log'
    ]
    const expected = ['2023-02-02_Execution.log', '2023-02-10_Execution.log']
    const filteredArr = testLogsFileArr.filter((item) => filterLogsFile(item))
    expect(2).toBe(filteredArr.length)
    expect(expected).toEqual(expect.arrayContaining(filteredArr))
    expect([
      '2023-02-02_WorkflowAnalyzer_Execution.log',
      '2023-02-10_WorkflowAnalyzer_Execution.log'
    ]).not.toEqual(expect.arrayContaining(filteredArr))
    //
  })
})
