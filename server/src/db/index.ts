import Database from 'better-sqlite3'
import path from 'path'
const db = new Database(path.join(__dirname, '../../../logs_db.db'))
db.pragma('journal_mode = WAL')

function query(sql: string, params: any[] = []) {
  return db.prepare(sql).all(params)
}

function run(sql: string, params: any[]) {
  return db.prepare(sql).run(params)
}

export default { run, query }
