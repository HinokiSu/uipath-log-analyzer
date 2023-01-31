// The order imports is important
// refer to: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
// router
import logsFileRouter from './routes/logs-file-route'
import logsRouter from './routes/logs-route'
import parseRoute from './routes/parse-route'
import statsRouter from './routes/stats-route'
import cors from 'cors'
import { serverConfig } from './app-config'

declare const process: any

try {
  const app = express()
  const clientApp = express()

  // Port
  const clientPort = serverConfig.CLIENT_PORT
  const serverPort = serverConfig.SERVER_PORT

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

  app.use(cors())
  // back-end api routes
  app.use('/logs', logsRouter)
  app.use('/file', logsFileRouter)
  app.use('/stats', statsRouter)
  app.use('/parse', parseRoute)

  clientApp.listen(clientPort, () => {
    console.log(`Web Client listening : http://localhost:${clientPort}`)
  })

  app.listen(serverPort, () => {
    console.log(`Server listening : http://localhost:${serverPort}`)
  })
} catch (error) {
  console.error(error)
  process.exit(-1)
}
