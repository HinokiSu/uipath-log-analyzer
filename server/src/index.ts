import * as dotenv from 'dotenv'
dotenv.config()

import { BootstrapWeb } from './bootstrap-web'
import { BootstrapServer } from './bootstrap-server'

try {
  const Bootstrap = async () => {
    const web = await BootstrapWeb()
    if (web) {
      await BootstrapServer()
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
    console.log('[uipath-log-analyzer] stopped.')
    process.exit()
  })

  process.on('SIGTERM', function () {
    console.log('[uipath-log-analyzer] stopped.')
    process.exit()
  })
} catch (error) {
  console.error(error)
  process.exit(-1)
}
