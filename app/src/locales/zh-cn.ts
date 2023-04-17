const zhLocale = {
  common: {
    yes: '是',
    no: '否',
    empty: '无',
    queryButton: '查询'
  },
  warn: {
    noSelectDateWarn: '当前选择的日期为空, 请选择'
  },
  menu: {
    dashboardMenuItem: '仪表盘',
    logFileMenuItem: '日志文件',
    logMenuItem: '日志',
    allMenuSubItem: '全部',
    timeMenuSubItem: '时间',
    processMenuItem: '进程'
  },
  dashboard: {
    latestErrorLogTitle: '最新错误日志',
    logStateAndTimeTitle: '日志状态 & 时间',
    logStateTitle: '日志状态'
  },
  logFile: {
    allTab: '全部',
    partTab: '部分',
    getLatestLogFileInfoButton: '获取最新日志文件信息',
    parseAllButton: '解析全部',
    parseButton: '解析',
    // popover
    isParseTitle: '是否解析 ?',
    isAllParseTitle: '是否全部解析 ?',
    // msg
    startGetInfo: '开始获取',
    getOkInfo: '获取最新日志文件信息，完成',
    startParseInfo: '开始解析',
    parsingInfo: '正在解析',
    cancelParseWarn: '已取消解析',
    noSelectDateWarn: '未选择日期',
    partParseDoneInfo: '部分解析已完成',
    parseDoneInfo: '解析完成',
    viewButNoParseWarn: '该日志文件未被解析⚒，请先解析再进行查看'
  },
  log: {
    queryButton: '查询'
  },
  process: {
    pnIsEmptyWarn: '当前Process name为空',
    latestErrorLogTitle: '最新的错误日志',
    timeTitle: '时间',
    fileNameTitle: '日志 名称',
    errorInfoTitle: '错误 信息',
    timelineTab: '时间线',
    logTableTab: '日志表格',
    totalExecutionTimeText: '总执行时间',
    processNameListTitle: '进程名称列表'
  },
  logColumn: {
    state: '状态',
    time: '时间',
    info: '信息',
    processName: '进程名称',
    type: '类型',
    initiatedBy: '发起人',
    fileName: '文件名称'
  },
  logFileColumn: {
    fileName: '文件名称',
    isParsed: '是否解析',
    createdAt: '创建时间',
    updatedAt: '最近解析时间',
    operation: '操作'
  }
}

export default zhLocale
