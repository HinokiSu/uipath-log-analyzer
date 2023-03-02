// The order imports is important
// refer to: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
// router
import logsFileRouter from './routes/logs-file-route'
import logsRouter from './routes/logs-route'
import parseRoute from './routes/parse-route'
import statsRouter from './routes/stats-route'
import processRouter from './routes/process-route'
// config
import { checkPortIsOccupied, killProcessByPid } from './utils/kill-port'
import * as readline from 'readline'

export function BootstrapServer(port: string) {
  const app = express()

  app.use(cors())
  // back-end api routes
  app.use('/logs', logsRouter)
  app.use('/file', logsFileRouter)
  app.use('/stats', statsRouter)
  app.use('/parse', parseRoute)
  app.use('/process', processRouter)

  const startServer = async () => {
    const res = await checkPortIsOccupied(port)
    const start = () =>
      app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`)
        console.log('Hit CTRL-C to stop the server')
      })
    if (!res) {
      start()
      return true
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question(`[Server]: Whether kill process? reply: [y/n] `, async (reply: string) => {
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
  return startServer()
}
