// The order imports is important
// refer to: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { serverConfig } from './app-config'
import { checkPortIsOccupied, killProcessByPid } from './utils/kill-port'
import path from 'path'
import * as readline from 'readline'


declare const process: any
export function BootstrapWeb() {
  // express
  const clientApp = express()
  // Port
  const clientPort = serverConfig.CLIENT_PORT

  const getDir = () => {
    if (process.pkg) {
      return path.join(__dirname, '../dist')
    } else {
      return path.join(require.main ? require.main.path : process.cwd())
    }
  }

  clientApp.use(express.static(getDir() + '/public'))

  clientApp.use('/', (_req, res) => {
    res.sendFile(getDir() + '/public/index.html')
  })

  const startWeb = async () => {
    const res = await checkPortIsOccupied(clientPort)
    const start = () =>
      clientApp.listen(clientPort, () => {
        console.log(`Web: http://localhost:${clientPort}`)
      })
    if (!res) {
      start()
      return true
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question(`[Web]: Whether kill process? reply: [y/n] `, async (reply: string) => {
        if (reply.includes('y') || reply.includes('Y')) {
          console.log(`You choice ${reply}, Kill process...`)
          await killProcessByPid(res)
          console.log('Restarting...')
          start()
        } else {
          console.log(`You choice ${reply}, Quit kill process, Closing services...`)
          process.exit()
        }
        rl.close()
      })
      return false
    }
  }

  return startWeb()
}
