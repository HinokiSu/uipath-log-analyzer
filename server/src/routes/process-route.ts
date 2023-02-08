import express from 'express'
import {
  getAllExcutionInfoByPN,
  getErrorOrWarnDuringExcutionByProcessName,
  getExcutionInfoBySpecifyTimeAndProcessName,
  getTotalExcutionTimesByProcessName
} from '../service/process-service'
import { TPaginQuery } from './types'

const processRouter = express.Router()

// root route path: '/process'

processRouter.get('/excution/info/all', (req: any, res, next) => {
  try {
    type TQuery = TPaginQuery & { pn: string }
    const query: TQuery = req.query
    res.json(getAllExcutionInfoByPN(query.pn, query.curpage, query.pagesize))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/excution/info/error', (req: any, res, next) => {
  type TExcutionQery = {
    pn: string
    start: string
    end: string
  }
  try {
    const query: TExcutionQery = req.query
    res.json(getErrorOrWarnDuringExcutionByProcessName(query.pn, query.start, query.end))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/excution/total', (req: any, res, next) => {
  try {
    const pn = req.query?.pn
    res.json(getTotalExcutionTimesByProcessName(pn))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

processRouter.get('/excution/date', (req: any, res, next) => {
  type TExcutionDate = {
    pn: string
    date: string
  }
  try {
    const query: TExcutionDate = req.query
    res.json(getExcutionInfoBySpecifyTimeAndProcessName(query.pn, query.date))
  } catch (err: any) {
    console.error(`Error: Process Service `, err.message)
    next(err)
  }
})

export default processRouter
