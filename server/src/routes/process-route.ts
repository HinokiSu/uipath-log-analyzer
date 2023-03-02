import express from 'express'
import {
  getTimelineByProcessName,
  getExecutionInfoBySpecifyTimeAndProcessName,
  getProcessesLogStats,
  getTotalStartedExecutionTimesByProcessName,
  getTimelineBySpecifyProcessNameAndRangeDate
} from '../service/process-service'
import { TPaginationQuery } from './types'

const processRouter = express.Router()

// root route path: '/process'

processRouter.get('/execution/total', (req: any, res, next) => {
  try {
    const pn = req.query?.pn
    res.json(getTotalStartedExecutionTimesByProcessName(pn))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/execution/date', (req: any, res, next) => {
  type TExecutionDate = {
    pn: string
    date: string
  }
  try {
    const query: TExecutionDate = req.query
    res.json(getExecutionInfoBySpecifyTimeAndProcessName(query.pn, query.date))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/execution/timeline', (req: any, res, next) => {
  try {
    type TQuery = TPaginationQuery & { pn: string }
    const query: TQuery = req.query
    res.json(getTimelineByProcessName(query.pn, query.curpage, query.pagesize))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/execution/timeline/date', (req: any, res, next) => {
  try {
    type TQuery = TPaginationQuery & { pn: string; start: string; end: string }
    const query: TQuery = req.query
    res.json(
      getTimelineBySpecifyProcessNameAndRangeDate(
        query.pn,
        query.start,
        query.end,
        query.curpage,
        query.pagesize
      )
    )
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/all', (req: any, res, next) => {
  try {
    const query: TPaginationQuery = req.query
    res.json(getProcessesLogStats(query.curpage, query.pagesize))
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default processRouter
