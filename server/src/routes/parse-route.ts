import { doParseAllLogsByAllLogsFile, doParseAllLogsFileInfo } from '../service/logsfile-service'
import express from 'express'
import { doParseLogsBySpecifyFile } from '../service/logs-service'

const parseRouter = express.Router()

// root route path: '/parse'

parseRouter.get('/fileinfo/all', (req, res, next) => {
  try {
    res.json(doParseAllLogsFileInfo())
  } catch (err: any) {
    console.error(`Error while getting logs file info`, err.message)
    next(err)
  }
})

parseRouter.get('/file/log', (req: any, res, next) => {
  try {
    const id = req.query.id as string
    res.json(doParseLogsBySpecifyFile(id))
  } catch (err: any) {
    console.error(`Error while getting logs file info`, err.message)
    next(err)
  }
})

parseRouter.get('/file/all', (req: any, res, next) => {
  try {
    res.json(doParseAllLogsByAllLogsFile())
  } catch (err: any) {
    console.error(`Error while getting logs file info`, err.message)
    next(err)
  }
})

export default parseRouter
