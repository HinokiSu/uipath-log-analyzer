// according process name

// get excute info by specify process name, tips: descending sort, need reverse array
//  process_name ,   message Of 'ProcessName execution started' , 'ProcessName execution ended', limit, offset
export const selectExcuteInfoByProcessName = `SELECT id, log_time, log_state, message, time_stamp,total_execution_time from logs WHERE process_name = ? and (message = ? or message = ?) ORDER BY log_time DESC LIMIT 10 OFFSET 0`
// count
export const countExcuteInfoTotalByProcessName = `SELECT COUNT(*) as total from logs WHERE process_name = ? and (message = ? or message = ?)`

// During specify excution time and process, get error or warn info
//process_name , log_time start time , log_time end time
export const selectErrorOrWarnDuringExcutionByProcessName = `SELECT * from logs WHERE process_name = ? and (log_time > ? and log_time < ? ) AND (log_state = 'Error' OR log_state = 'Warn')`

// count all excute times by specify process
export const countTotalExcutionTimeByProcessName = `SELECT COUNT(*) as total FROM logs WHERE process_name = ? AND message = ? `

// get excution info by specify date and process
// process_name, log_time ('2022-12-22%'), messsage Of Started & Ended
export const selectExcutionInfoBySpecifyDateAndProcessName = `SELECT *  from (SELECT * FROM logs WHERE process_name = ? AND log_time LIKE ?) WHERE  message = ? or message = ? ORDER BY log_time`
