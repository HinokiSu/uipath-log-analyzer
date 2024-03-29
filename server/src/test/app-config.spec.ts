import { formatConfig, getConfigFilePath } from '../app-config'

describe('App config', () => {
  it('parse server config', () => {
    const configStr = {
      UIPATH_LOGS_FOLDER_PATH: 'C:\\Users\\Hinoki\\AppData\\Local\\UiPath\\Logs',
      DB_PATH: 'E:\\GitHub_PR\\uipath-log-analyzer\\server\\build\\logs_db.db',
      CLIENT_PORT: '4301',
      SERVER_PORT: '4302'
    }
    const exceptedRes = {
      UIPATH_LOGS_FOLDER_PATH: 'C:\\Users\\Hinoki\\AppData\\Local\\UiPath\\Logs',
      DB_PATH: 'E:\\GitHub_PR\\uipath-log-analyzer\\server\\build\\logs_db.db',
      CLIENT_PORT: '4301',
      SERVER_PORT: '4302'
    }
    const res = formatConfig(JSON.stringify(configStr))
    expect(res).toMatchObject(exceptedRes)
  })

  it('config is empty', () => {
    expect(() => {
      formatConfig('')
    }).toThrowError('Error:  Server config file content is null!')
  })

  it('get config path', () => {
    expect(getConfigFilePath()).toContain('server.config.json')
  })
})
