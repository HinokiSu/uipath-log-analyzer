import path from 'path'
import { getFilesName } from '../file-name-analyzer'

describe('parse and get file name all right', () => {
  it('parse file name', () => {
    const expected = ['2023-02-02_Execution.log', '2023-02-10_Execution.log']
    const testFolderPath = path.join(__dirname, './test-logs')
    const fileNameArr = getFilesName(testFolderPath)
    expect(2).toBe(fileNameArr.length)
    expect(expected).toEqual(expect.arrayContaining(fileNameArr))
    expect([
      '2023-02-02_WorkflowAnalyzer_Execution.log',
      '2023-02-10_WorkflowAnalyzer_Execution.log'
    ]).not.toEqual(expect.arrayContaining(fileNameArr))
    //
  })
})
