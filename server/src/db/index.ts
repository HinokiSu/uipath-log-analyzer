import Database from 'better-sqlite3'
import { serverConfig } from '../app-config'

const db = new Database(serverConfig.DB_PATH)
db.pragma('journal_mode = WAL')

function query(sql: string, params: any[] = []) {
  return db.prepare(sql).all(params)
}

function get(sql: string, params: any[] = []): object | undefined {
  return db.prepare(sql).get(params)
}

function run(sql: string, params: any[]) {
  return db.prepare(sql).run(params)
}

export default { run, query, get }
