import express from 'express'
const dotenv = require('dotenv')

import { readLogsFile } from './log-formatter'
dotenv.config()

const app = express()

// 获取post参数middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const port = process.env.PORT
// const port = 4000

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

// log file path
const logFilePath = './test/static/test-logs.log'
readLogsFile(logFilePath)

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`You are listening : http://localhost:${port}`)
})
