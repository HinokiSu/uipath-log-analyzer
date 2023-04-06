import fs from 'fs'
import path from 'path'
import logger from './utils/winston'

declare const process: any
export const getConfigFilePath = () => {
  let configPath = ''
  // win32 or others
  configPath = path.join(process.cwd(), path.sep, 'ula', path.sep, 'server.config.json')
  logger.info('Server Config File Path: ' + configPath)
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
    throw new Error('Error:  Server config file content is null!')
  }
  const serverConfigObj: TServerConfig = JSON.parse(configStr)
  return serverConfigObj
}

const getAppConfig = () => {
  const configFilePath = getConfigFilePath()
  const serverConfig = fs.readFileSync(configFilePath, 'utf8')
  return formatConfig(serverConfig)
}
export const serverConfig = getAppConfig()
