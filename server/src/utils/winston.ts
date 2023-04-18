import { existsSync } from 'fs'
import { unlink } from 'fs/promises'
import path from 'path'
import winston from 'winston'

const winstonLogFilePath = () => {
  if (process.platform === 'win32') {
    const logPath = path.join(
      process.cwd(),
      path.sep,
      'resources',
      path.sep,
      'ula',
      path.sep,
      'logger',
      path.sep,
      'ula_execution.log'
    )
    if (existsSync(logPath)) {
      // delete exist log file
      unlink(logPath)
        .then(() => {
          console.log('[Logger]: Existing log files have been deleted')
        })
        .catch((err) => {
          console.log('Delete ula log file: ', err)
        })
    }
    return logPath
  } else {
    return 'ula_execution.log'
  }
}

const { combine, timestamp, printf } = winston.format

const initLogger = () => {
  
  const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'ula-server' },
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
      }),
      winston.format.json()
      // prettyPrint()
    )
  })

  if (process.env.NODE_ENV !== 'test') {
    logger.add(new winston.transports.File({ filename: winstonLogFilePath() }))
  }

  if (process.env.NODE_ENV === 'development') {
    const myFormat = printf(({ level, message }) => {
      return `${level}: ${message}`
    })

    logger.add(
      new winston.transports.Console({
        format: myFormat
      })
    )
  } else {
    const customFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] : ${message}`
    })
    logger.add(
      new winston.transports.Console({
        format: customFormat
      })
    )
  }

  return logger
}

export default initLogger()
