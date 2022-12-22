import {
  doParseLogsBySpecifyFile,
  getDataByProcessVersion,
  getLogsSpecifyLogTime,
  getLogsOfRecentlyError,
  getStatsByLogState,
  getStatsByLogTime
} from '../service/logs-service'
import express from 'express'
const logsRouter = express.Router()

type TPaginQuery = {
  pagesize: string
  curpage: string
}

logsRouter.get('/', (req: any, res, next) => {
  try {
    const fileName = req.query?.filename
    if (fileName.length) {
      res.json(doParseLogsBySpecifyFile(fileName))
    } else {
      res.json({
        messgae: 'log文件名称参数为空',
        status: 0
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/pn', (req: any, res, next) => {
  try {
    type TQuery = TPaginQuery & { pn: string }
    const query: TQuery = req.query
    if (query.pn.length) {
      res.json(getDataByProcessVersion(query.pn, query.pagesize, query.curpage))
    } else {
      res.json({
        message: 'process version参数不能为空',
        status: 0
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/logtime', (req: any, res, next) => {
  try {
    const query: TQuery = req.query
    type TQuery = TPaginQuery & { logtime: string }
    if (!query.logtime) {
      res.json({
        message: 'log time参数不能为空',
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

logsRouter.get('/stats/logstate', (req: any, res, next) => {
  try {
    res.json(getStatsByLogState())
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/stats/recent/error', (req: any, res, next) => {
  try {
    const limt = req.query?.limt
    if (limt.length) {
      res.json(getLogsOfRecentlyError(limt))
    } else {
      res.json({
        message: 'limt参数不能为空',
        status: 0
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/stats/logtime', (req: any, res, next) => {
  try {
    res.json(getStatsByLogTime())
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default logsRouter
