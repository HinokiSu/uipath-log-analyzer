import { doParseAllLogsFile } from '../service/logsfile-service'
import express from 'express'

const logsFileRouter = express.Router()

logsFileRouter.get('/', (req, res, next) => {
  try {
    res.json(doParseAllLogsFile())
  } catch (err: any) {
    console.error(`Error while getting logs file info`, err.message)
    next(err)
  }
})

export default logsFileRouter
