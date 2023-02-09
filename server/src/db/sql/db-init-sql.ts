/*
 * Create Table Sql: logs, logsfile_info
 */

// check table
export const checkLogsTableExist = `SELECT name FROM sqlite_master WHERE type='table' AND name='logs';`
export const checkLogsFileInfoExist = `SELECT name FROM sqlite_master WHERE type='table' AND name='logsfile_info';`


export const createLogsTable = `CREATE TABLE
IF
	NOT EXISTS "logs" (
		"id" text NOT NULL,
		"log_time" text,
		"log_state" text,
		"message" TEXT,
		"level" TEXT,
		"log_type" TEXT,
		"time_stamp" text,
		"fingerprint" TEXT,
		"windows_identity" TEXT,
		"machine_name" TEXT,
		"file_name" TEXT,
		"total_execution_time_in_seconds" TEXT,
		"total_execution_time" text,
		"initiated_by" TEXT,
		"process_name" TEXT,
		"process_version" TEXT,
		"job_id" text,
		"robot_name" TEXT,
		"machine_id" text,
	"organization_unit_id" text 
	);`

export const createLogsFileInfoTable = `CREATE TABLE
IF
	NOT EXISTS "logsfile_info" (
		"id" text NOT NULL,
		"file_name" TEXT,
		"time" text,
		"full_path" TEXT,
		"is_parsed" integer,
		"created_at" text,
		"updated_at" text,
	PRIMARY KEY ( "id" ) 
	);`
