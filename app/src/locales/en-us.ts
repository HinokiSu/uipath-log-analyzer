const enLocale = {
  common: {
    yes: 'Yes',
    no: 'No',
    empty: 'Empty',
    queryButton: 'Search'
  },
  warn: {
    noSelectDate: 'The date currently selected is empty, please select'
  },
  menu: {
    dashboardMenuItem: 'Dashboard',
    logFileMenuItem: 'Log File',
    logMenuItem: 'Log',
    allMenuSubItem: 'All',
    timeMenuSubItem: 'Time',
    processMenuItem: 'Process'
  },
  dashboard: {
    latestErrorLogTitle: 'Latest Error Logs',
    logStateAndTimeTitle: 'Log State & Time',
    logStateTitle: 'Log State'
  },
  logFile: {
    allTab: 'All',
    partTab: 'Part',
    getLatestLogFileInfoButton: 'Get latest log file info',
    parseAllButton: 'Parse All',
    parseButton: 'Parse',
    // popover
    isParseTitle: 'Whether to parse?',
    isAllParseTitle: 'Whether to all parse?',
    // msg
    startGetInfo: 'Starting to fetch',
    getOkInfo: 'Get the latest log file information, done',
    startParseInfo: 'Start parsing',
    parsingInfo: 'Parsing',
    cancelParseWarn: 'Parsing log canceled',
    noSelectDateWarn: 'No date selected',
    partParseDoneInfo: 'Part parsing log, done',
    parseDoneInfo: 'Parsing log, done',
    viewButNoParseWarn: 'The log file has not been parsed⚒, please parse it before viewing'
  },
  log: {
    queryButton: 'Search'
  },
  process: {
    pnIsEmptyWarn: 'Process name is empty currently',
    latestErrorLogTitle: 'Latest error log',
    timeTitle: 'Time',
    fileNameTitle: 'Log Name',
    errorInfoTitle: 'Error Info',
    timelineTab: 'TimeLine',
    logTableTab: 'Log Table',
    totalExecutionTimeText: 'Total execution time',
    processNameListTitle: 'Process Name List'
  },
  logColumn: {
    state: 'State',
    time: 'Time',
    info: 'Message',
    processName: 'Process Name',
    type: 'Type',
    initiatedBy: 'Initiated By',
    fileName: 'File Name'
  },
  logFileColumn: {
    fileName: 'File Name',
    isParsed: 'Wether Parsed',
    createdAt: 'Creation Time',
    updatedAt: 'Last parse time',
    operation: 'Operation'
  }
}

export default enLocale
