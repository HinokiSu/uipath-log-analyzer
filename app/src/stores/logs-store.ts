import {
  fetchAllLogsToList,
  fetchListByLogTime,
  fetchLogsByProcessName,
  fetchRecentlyErrorByProcessName
} from '@/api/logs-api'
import { TTableColumnsType } from '@/interface/common-type'
import { TLogInfo } from '@/interface/log-info'
import { defineStore } from 'pinia'

type State = {
  total: number
  logsList: TLogInfo[]
  logData: TLogInfo
  columns: TTableColumnsType[]
}
const initLogData = {
  id: '',
  log_time: '',
  log_state: '',
  message: '',
  level: '',
  log_type: '',
  time_stamp: '',
  fingerprint: '',
  windows_identity: '',
  machine_name: '',
  file_name: '',
  total_execution_time_in_seconds: '',
  total_execution_time: '',
  initiated_by: '',
  process_name: '',
  process_version: '',
  job_id: '',
  robot_name: '',
  machine_id: '',
  organization_unit_id: ''
}

// logs store
export const useLogsStore = defineStore('logsStore', {
  state: (): State => ({
    total: 0,
    logsList: [],
    logData: initLogData,
    columns: [
      {
        title: '状态',
        nameI18n: 'msg.logColumn.state',
        dataIndex: 'log_state',
        key: 'log_state'
      },
      {
        title: '时间',
        nameI18n: 'msg.logColumn.time',
        dataIndex: 'log_time',
        key: 'log_time'
      },
      {
        title: '信息',
        nameI18n: 'msg.logColumn.info',
        dataIndex: 'message',
        key: 'message'
      },
      {
        title: '进程名称',
        nameI18n: 'msg.logColumn.processName',
        dataIndex: 'process_name',
        key: 'process_name'
      },
      {
        title: '类型',
        nameI18n: 'msg.logColumn.type',
        dataIndex: 'log_type',
        key: 'log_type'
      },
      {
        title: '发起人',
        nameI18n: 'msg.logColumn.initiatedBy',
        dataIndex: 'initiated_by',
        key: 'initiated_by'
      },
      {
        title: '文件名称',
        nameI18n: 'msg.logColumn.fileName',
        dataIndex: 'file_name',
        key: 'file_name'
      }
    ]
  }),
  getters: {},

  actions: {
    clearState() {
      this.total = 0
      this.logsList.length = 0
      this.logData = initLogData
    },
    /* all logs */
    async getAllLogsOfList(curPage: number, pageSize: number) {
      const res = await fetchAllLogsToList(curPage, pageSize)
      this.total = res.data.total
      this.logsList = res.data.list
    },
    /* log time */
    async getLogsListByLogTime(logTime: string, curPage: number, pageSize: number) {
      const res = await fetchListByLogTime(logTime, curPage, pageSize)
      this.total = res.data.total
      this.logsList = res.data.list
    },
    /* process name */
    async getLogsByProcessName(pn: string, curPage: number, pageSize: number) {
      const res = await fetchLogsByProcessName(pn, curPage, pageSize)
      this.logsList = res.data.list
      this.total = res.data.total
    },
    /* recently error log by process name */
    async getRecentlyErrorByProcessName(pn: string) {
      const res = await fetchRecentlyErrorByProcessName(pn)
      this.logData = res.data.log_data
    }
  }
})
