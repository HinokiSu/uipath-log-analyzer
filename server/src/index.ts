// The order imports is important
// refer to: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
// router
import logsFileRouter from './routes/logs-file-route'
import logsRouter from './routes/logs-route'
import statsRouter from './routes/stats-route'

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})
app.use('/logs', logsRouter)
app.use('/file', logsFileRouter)
app.use('/stats', statsRouter)

// log file path
app.listen(port, () => {
  console.log(`You are listening : http://localhost:${port}`)
})
