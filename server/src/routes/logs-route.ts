import {
  doParseLogsBySpecifyFile,
  getDataByProcessName,
  getLogsSpecifyLogTime,
  getAllLogs,
  getLogOfRecentlyErrorByProcessName
} from '../service/logs-service'
import express from 'express'
import { TPaginationQuery } from './types'

// root route path: '/logs'
const logsRouter = express.Router()

logsRouter.get('/', (req: any, res, next) => {
  try {
    const fileName = req.query?.filename
    if (fileName.length) {
      res.json(doParseLogsBySpecifyFile(fileName))
    } else {
      res.json({
        message: 'The log file name parameter cannot be empty',
        status: 0
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/all', (req: any, res, next) => {
  try {
    const query: TPaginationQuery = req.query
    if (!query.curpage) {
      res.json({
        message: 'Pagination query parameter cannot be empty',
        status: 0
      })
    }
    res.json(getAllLogs(query.curpage, query.pagesize))
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

// get logs by process name
logsRouter.get('/pn/all', (req: any, res, next) => {
  try {
    type TQuery = TPaginationQuery & { pn: string }
    const query: TQuery = req.query
    if (query.pn.length) {
      res.json(getDataByProcessName(query.pn, query.curpage, query.pagesize))
    } else {
      res.json({
        message: 'The process version parameter cannot be empty',
        status: 0
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/pn/recent/error', (req: any, res, next) => {
  try {
    const pn = (req.query.pn as string) || ''
    return res.json(getLogOfRecentlyErrorByProcessName(pn))
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/logtime', (req: any, res, next) => {
  try {
    const query: TQuery = req.query
    type TQuery = TPaginationQuery & { logtime: string }
    if (!query.logtime) {
      res.json({
        message: 'The log time parameter cannot be empty',
        status: 0
      })
    } else {
      res.json(getLogsSpecifyLogTime(query.logtime, query.pagesize, query.curpage))
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default logsRouter
