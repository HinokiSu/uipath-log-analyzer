# Uipath Log Analyzer · Back-end

## Server configuration

> Modify server configuration files `server.config.json`  
> Tips: Windows path requires escape characters
> Windows Path(`C:\\Users`) --> json file(`C:\\\Users`)

```json
{
  "UIPATH_LOGS_FOLDER_PATH": "C:\\Users\\example\\AppData\\Localogs",
  "CLIENT_PORT": "4301",
  "SERVER_PORT": "4302"
}
```

- Configuration parameter description

> `UIPATH_LOGS_FOLDER_PATH` : Uipath log file root path
> `CLIENT_PORT` : The port that provides the web service
> `SERVER_PORT` : The port that provides the backend service

