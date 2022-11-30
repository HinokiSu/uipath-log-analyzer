import express from 'express'
import logsService from '../service/logs-service'
const router = express.Router()

/* GET quotes listing. */
router.get('/', function (req, res, next) {
  try {
    res.json(logsService.addLog())
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default router
