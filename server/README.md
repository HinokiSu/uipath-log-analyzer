# Uipath Logs Analyzer · Back-end

## Server configuration

> Modify server configuration files `server.config.json`  
> Tips: Windows path requires escape characters
> Windows Path(C:\\Users) --> json file(C:\\\Users)

```json
{
  "UIPATH_LOGS_FOLDER_PATH": "C:\\Users\\example\\AppData\\Localogs",
  "DB_PATH": "D:\\GitHub\\uipath-logs-analyzer\\logs_db.db",
  "CLIENT_PORT": "4301",
  "SERVER_PORT": "4302"
}
```

- Configuration parameter description

> `UIPATH_LOGS_FOLDER_PATH` : Uipath log file root path
> `DB_PATH` : Database(Sqlite3) used by the back-end
> `CLIENT_PORT` : The port that provides the web service
> `SERVER_PORT` : The port that provides the backend service

## TODO

- 优化后端项目包规模及.exe 文件空间
