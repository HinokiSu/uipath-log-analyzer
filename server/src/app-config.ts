import fs from 'fs'

const getServerConfig = () => {
  type TServerConfig = {
    UIPATH_LOGS_FOLDER_PATH: string
    DB_PATH: string
    CLIENT_PORT: string
    SERVER_PORT: string
  }
  let configPath = ''

  if (process.platform === 'linux') {
    configPath = process.cwd() + '/server.config.json'
  } else {
    // win32 or others
    configPath = process.cwd() + '\\server.config.json'
  }
  console.log('Server Config File Path: ' + configPath)
  const serverConfig = fs.readFileSync(configPath, 'utf8')
  if (serverConfig === '') {
    console.error('Error:  Server config file content is null!')
    process.exit(-1)
  }
  const serverConfigObj: TServerConfig = JSON.parse(serverConfig)
  return serverConfigObj
}

export const serverConfig = getServerConfig()
