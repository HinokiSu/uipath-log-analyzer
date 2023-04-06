// The order imports is important
// refer to: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { checkPortIsOccupied, killProcessByPid } from './utils/kill-port'
import path from 'path'
import * as readline from 'readline'
import logger from './utils/winston'


declare const process: any
export function BootstrapWeb(port: string) {
  // express
  const clientApp = express()
  // Port

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
    const res = await checkPortIsOccupied(port)
    const start = () =>
      clientApp.listen(port, () => {
        logger.info(`Web: http://localhost:${port}`)
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
          logger.info(`You choice ${reply}, Kill process...`)
          await killProcessByPid(res)
          logger.info('Restarting...')
          start()
        } else {
          logger.warn(`You choice ${reply}, Quit kill process, Closing services...`)
          process.exit()
        }
        rl.close()
      })
      return false
    }
  }

  return startWeb()
}
