import {
  fetchAllLogsToList,
  fetchListByLogTime,
  fetchLogsByProcessName,
  fetchRecentlyErrorByProcessName
} from '@/api/logs-api'
import { TLogInfo } from '@/interface/log-info'
import { defineStore } from 'pinia'

type State = {
  total: number
  logsList: TLogInfo[]
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
    async getLogsByProcessName(pn: string, curPage: number, pageSize: number) {
      const res = await fetchLogsByProcessName(pn, curPage, pageSize)
      this.logsList = res.data.list
      this.total = res.data.total
    },
    async getRecentlyErrorByProcessName(pn: string) {
      const res = await fetchRecentlyErrorByProcessName(pn)
      this.logData = res.data.log_data
    }
  }
})
