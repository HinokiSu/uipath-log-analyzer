/* Stats Of Logs or Logs file */
import {
  getLogsOfRecentlyError,
  getStatsByLogState,
  getStatsByLogTime
} from '../service/stats-service'
import express from 'express'

// root route path: '/stats'
const statsRouter = express.Router()

statsRouter.get('/logstate', (req: any, res, next) => {
  try {
    res.json(getStatsByLogState())
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

statsRouter.get('/recent/error', (req: any, res, next) => {
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

statsRouter.get('/logtime', (req: any, res, next) => {
  try {
    res.json(getStatsByLogTime())
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default statsRouter
