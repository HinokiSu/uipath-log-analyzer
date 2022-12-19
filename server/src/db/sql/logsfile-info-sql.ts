import { createSqlField, createSqlValuesMark } from '.'

// logsfile info table
const fieldOfLogsFileInfoTBArr = ['id', 'file_name', 'time', 'is_parsed', 'updated_at']

export const insertLogsFileInfoSql = `INSERT INTO logsfile_info (${createSqlField(
  fieldOfLogsFileInfoTBArr
)}) VALUES (${createSqlValuesMark(fieldOfLogsFileInfoTBArr)})`

// select single data by file_name
export const selectLogsFileInfoSql = `SELECT * FROM "logsfile_info" WHERE file_name = ? `

// select data by pagination
export const selectLogsFileInfoByPaginationSql = `SELECT * from logsfile_info ORDER BY time DESC LIMIT ? OFFSET ? `

// count log file data total
export const selectCountLogsFileInfoSql = `SELECT count(*) as total FROM logsfile_info`

// select single data by uuid
export const selectLogsFileInfoById = `SELECT * FROM "logsfile_info" WHERE id = ? `