import fs from 'fs'

export const getConfigFilePath = (platform: string) => {
  let configPath = ''

  if (platform === 'linux') {
    configPath = process.cwd() + '/server.config.json'
  } else {
    // win32 or others
    configPath = process.cwd() + '\\server.config.json'
  }
  console.log('Server Config File Path: ' + configPath)
  return configPath
}

// format config string, convert json type
export const formatConfig = (configStr: string) => {
  type TServerConfig = {
    UIPATH_LOGS_FOLDER_PATH: string
    DB_PATH: string
    CLIENT_PORT: string
    SERVER_PORT: string
  }
  if (configStr === '') {
    console.error('Error:  Server config file content is null!')
    process.exit(-1)
  }
  const serverConfigObj: TServerConfig = JSON.parse(configStr)
  return serverConfigObj
}

const getAppConfig = () => {
  const configFilePath = getConfigFilePath(process.platform)
  const serverConfig = fs.readFileSync(configFilePath, 'utf8')
  return formatConfig(serverConfig)
}
export const serverConfig = getAppConfig()
