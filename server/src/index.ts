import * as dotenv from 'dotenv'
dotenv.config()

import { BootstrapWeb } from './bootstrap-web'
import { BootstrapServer } from './bootstrap-server'
import { serverConfig } from './app-config'
import logger from './utils/winston'

try {
  const clientPort = serverConfig.CLIENT_PORT
  const serverPort = serverConfig.SERVER_PORT

  const Bootstrap = async () => {
    const web = await BootstrapWeb(clientPort)
    if (web) {
      await BootstrapServer(serverPort)
    }
  }

  Bootstrap()

  // bootstrap web and server services

  // refer: https://github.com/http-party/http-server/blob/master/bin/http-server#L261
  if (process.platform === 'win32') {
    require('readline')
      .createInterface({
        input: process.stdin,
        output: process.stdout
      })
      .on('SIGINT', function () {
        process.emit('SIGINT')
      })
  }

  process.on('SIGINT', function () {
    logger.info('[uipath-log-analyzer] stopped.')
    process.exit()
  })

  process.on('SIGTERM', function () {
    logger.info('[uipath-log-analyzer] stopped.')
    process.exit()
  })
} catch (error) {
  logger.error(error)
  process.exit(-1)
}
