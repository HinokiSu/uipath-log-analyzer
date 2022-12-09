import { doParseLogsBySpecifyFile } from '../service/logs-service'
import express from 'express'
const logsRouter = express.Router()

logsRouter.get('/', (req: any, res, next) => {
  try {
    const fileName = req.query?.filename
    if (fileName) {
      res.json(doParseLogsBySpecifyFile(fileName))
    } else {
      res.json({
        messgae: 'log文件名称参数为空',
        status: 0,
      })
    }
  } catch (err: any) {
    console.error(`Error while getting logs `, err.message)
    next(err)
  }
})

export default logsRouter
