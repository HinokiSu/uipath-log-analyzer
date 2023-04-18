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
    const qty = req.query?.qty
    if (qty.length) {
      res.json(getLogsOfRecentlyError(qty))
    } else {
      res.json({
        message: 'The parameter cannot be empty',
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
