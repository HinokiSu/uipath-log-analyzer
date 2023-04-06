import {
  doParseAllLogsFileInfo,
  getLogsFileDataByPagination,
  getTotalOfLogsFile
} from '../service/logsfile-service'
import express from 'express'
import logger from '../utils/winston'

const logsFileRouter = express.Router()

// root route path: '/file'

logsFileRouter.get('/parse', (req, res, next) => {
  try {
    res.json(doParseAllLogsFileInfo())
  } catch (err: any) {
    console.error(`Error while getting logs file info`, err.message)
    next(err)
  }
})

logsFileRouter.get('/pagin', (req: any, res, next) => {
  try {
    const curPage = req.query?.curpage || '1'
    const pageSize = req.query?.pagesize || '8'
    res.json(getLogsFileDataByPagination(curPage, pageSize))
  } catch (err: any) {
    logger.error(`Error while getting all logs file info`, err.message)
    next(err)
  }
})

logsFileRouter.get('/total', (req: any, res, next) => {
  try {
    res.json(getTotalOfLogsFile())
  } catch (err: any) {
    logger.error(`Error while getting all logs file info`, err.message)
    next(err)
  }
})

export default logsFileRouter
