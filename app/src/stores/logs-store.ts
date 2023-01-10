import {
  fetchAllLogsToList,
  fetchListByLogTime,
  fetchListByProcessName,
  fetchPNCountLogState,
  fetchRecentlyErrorByPN
} from '@/api/logs-api'
import { TLogInfo, TPNOfLogState } from '@/interface/log-info'
import { defineStore } from 'pinia'

type State = {
  total: number
  logsList: TLogInfo[]
  pnList: TPNOfLogState[]
  logData: TLogInfo
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
    pnList: [],
    logData: initLogData
  }),
  getters: {},

  actions: {
    clearState() {
      this.total = 0
      this.logsList.length = 0
      this.logData = initLogData
    },
    async getAllLogsOfList(curPage: number, pageSize: number) {
      const res = await fetchAllLogsToList(curPage, pageSize)
      this.total = res.data.total
      this.logsList = res.data.list
    },
    async getLogsListByLogTime(logTime: string, curPage: number, pageSize: number) {
      const res = await fetchListByLogTime(logTime, curPage, pageSize)
      this.total = res.data.total
      this.logsList = res.data.list
    },
    async getLogsListByProcessName(pn: string, pageSize: number, curPage: number) {
      const res = await fetchListByProcessName(pn, pageSize, curPage)
      this.logsList = res.data.list
      this.total = res.data.total
    },
    async getAllPNStats(pageSize: number, curPage: number) {
      const res = await fetchPNCountLogState(curPage, pageSize)
      this.pnList = res.data.list
      this.total = res.data.total
    },
    async getLogOfRecentlyErrByPN(pn: string) {
      const res = await fetchRecentlyErrorByPN(pn)
      this.logData = res.data.log_data
    }
  }
})
