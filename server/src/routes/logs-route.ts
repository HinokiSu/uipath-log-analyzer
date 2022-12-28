import {
  doParseLogsBySpecifyFile,
  getDataByProcessName,
  getLogsSpecifyLogTime,
  getLogsOfRecentlyError,
  getStatsByLogState,
  getStatsByLogTime,
  getAllLogs,
  getPNCountLogState,
  getLogOfRecentlyErrorByPN
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

logsRouter.get('/all', (req: any, res, next) => {
  try {
    const query: TPaginQuery = req.query
    if (!query.curpage) {
      res.json({
        message: '分页查询参数不能为空',
        status: 0
      })
    }
    res.json(getAllLogs(query.curpage, query.pagesize))
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
      res.json(getDataByProcessName(query.pn, query.pagesize, query.curpage))
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

logsRouter.get('/pn/stats', (req: any, res, next) => {
  try {
    const query: TPaginQuery = req.query
    res.json(getPNCountLogState(query.curpage, query.pagesize))
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

logsRouter.get('/pn/recent/error', (req: any, res, next) => {
  try {
    const pn = req.query.pn as string || ''
    return res.json(getLogOfRecentlyErrorByPN(pn))
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
