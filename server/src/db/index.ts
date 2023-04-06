import Database from 'better-sqlite3'
import logger from '../utils/winston'
import { serverConfig } from '../app-config'
import {
  checkLogsFileInfoExist,
  checkLogsTableExist,
  createLogsFileInfoTable,
  createLogsTable
} from './sql/db-init-sql'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'

declare const process: any
const dbPath = () => {
  let rootDir = ''
  // pkg environment
  rootDir = path.join(process.cwd(), path.sep, 'ula', path.sep, 'database')
  if (!existsSync(rootDir)) {
    mkdirSync(rootDir)
  }
  const dbPath = path.join(rootDir, path.sep, 'logs_db.db')
  logger.info(`Database file Path: ${dbPath}`)
  return dbPath
}
const db = new Database(dbPath())
db.pragma('journal_mode = WAL')

const initDB = () => {
  // check to see if we already initialized this database

  // check logs table
  const logsTBStmt = db.prepare(checkLogsTableExist)
  const logsTBRow = logsTBStmt.get()
  if (logsTBRow === undefined) {
    logger.warn('The logs table does not exist, it will be created.')
    // create logs table
    db.exec(createLogsTable)
  }

  // check logsfile_info table
  const logsFileInfoTBStmt = db.prepare(checkLogsFileInfoExist)
  const logsFileInfoTBRow = logsFileInfoTBStmt.get()
  if (logsFileInfoTBRow === undefined) {
    logger.warn('The logsfile_info table does not exist, it will be created.')
    // create table
    db.exec(createLogsFileInfoTable)
  }
}
initDB()

function query(sql: string, params: any[] = []) {
  return db.prepare(sql).all(params)
}

function get(sql: string, params: any[] = []): object | undefined {
  return db.prepare(sql).get(params)
}

function run(sql: string, params: any[]) {
  return db.prepare(sql).run(params)
}

function exec(sql: string) {
  return db.exec(sql)
}

export default { run, query, get, exec }
