import { createSqlField, createSqlValuesMark } from '.'

// logsfile info table
const fieldOfLogsFileInfoTBArr = ['id', 'file_name', 'time', 'is_parsed', 'updated_at']

export const insertLogsFileInfoSql = `INSERT INTO logsfile_info (${createSqlField(
  fieldOfLogsFileInfoTBArr
)}) VALUES (${createSqlValuesMark(fieldOfLogsFileInfoTBArr)})`

export const selectLogsFileInfoSql: string = `SELECT * FROM "logsfile_info" WHERE file_name = ? `
