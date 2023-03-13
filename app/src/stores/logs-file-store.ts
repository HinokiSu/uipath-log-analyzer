import { fetchList } from '@/api/logsfile-api'
import {
  fetchParseAllLogFileInfo,
  fetchParseLogsByAllLogFile,
  fetchParseLogsByRangeDateAndLogFile
} from '@/api/parse-api'
import { TLogsFileInfo } from '@/interface/logs-file'
import msg from '@/utils/message'

import { defineStore } from 'pinia'

type State = {
  pagination: {
    curPage: number
    pageSize: number
    total: number
  }
  infoList: TLogsFileInfo[]
  isParsing: boolean
}
// logs file store
export const useLogsFileStore = defineStore('logsFileStore', {
  state: (): State => ({
    pagination: {
      curPage: 1,
      pageSize: 10,
      total: 0
    },
    infoList: [],
    isParsing: false
  }),

  getters: {},
  actions: {
    clearState() {
      this.pagination = {
        curPage: 1,
        pageSize: 10,
        total: 0
      }
      this.infoList = []
      this.isParsing = false
    },
    async parseAllLogFileInfo() {
      await fetchParseAllLogFileInfo()
    },
    async getLogsFileInfo() {
      const res = await fetchList(this.pagination.curPage, this.pagination.pageSize)
      this.pagination.total = res.data.total
      this.infoList = res.data.list.map((item: TLogsFileInfo) => {
        item.is_parsed = item.is_parsed ? '是' : '否'
        return item
      })
    },
    async parseLogOfAllLogFile() {
      this.isParsing = true
      msg.info('正在解析...')

      const res = await fetchParseLogsByAllLogFile().then(() => {
        this.isParsing = false
        msg.ok('已全部解析完成🎉')
        this.getLogsFileInfo()
      })
    },
    async parseLogOfLogFileByRangeDate(start: string, end: string) {
      this.isParsing = true
      const res = await fetchParseLogsByRangeDateAndLogFile(start, end).then(() => {
        this.isParsing = false
        this.getLogsFileInfo()
      })
    }
  }
})
