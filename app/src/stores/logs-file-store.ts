import { fetchList } from '@/api/logsfile-api'
import { TLogsFileInfo } from '@/interface/logs-file'

import { defineStore } from 'pinia'

type State = {
  pagination: {
    curPage: number
    pageSize: number
    total: number
  }
  infoList: TLogsFileInfo[]
}
// logs file store
export const useLogsFileStore = defineStore('logsFileStore', {
  state: (): State => ({
    pagination: {
      curPage: 1,
      pageSize: 10,
      total: 0
    },
    infoList: []
  }),

  getters: {},
  actions: {
    async getLogsFileInfo() {
      const res = await fetchList(this.pagination.curPage, this.pagination.pageSize)
      this.pagination.total = res.data.total
      this.infoList = res.data.list.map((item: TLogsFileInfo) => {
        item.is_parsed = item.is_parsed ? '是' : '否'
        return item
      })
    }
  }
})
