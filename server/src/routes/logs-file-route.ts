import {
  doParseAllLogsFileInfo,
  doParseLogsFileByRangeDate,
  getLogsFileDataByPagination,
  getTotalOfLogsFile
} from '../service/logsfile-service'
import express from 'express'

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

logsFileRouter.get('/parse/date', (req: any, res, next) => {
  try {
    const query: {
      start: string
      end: string
    } = req.query
    res.json(doParseLogsFileByRangeDate(query.start, query.end))
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
    console.log(`Error while getting all logs file info`, err.message)
    next(err)
  }
})

logsFileRouter.get('/total', (req: any, res, next) => {
  try {
    res.json(getTotalOfLogsFile())
  } catch (err: any) {
    console.log(`Error while getting all logs file info`, err.message)
    next(err)
  }
})

export default logsFileRouter
