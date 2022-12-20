import { APIResLogsFileType } from '@/interface/logs-file'
import { fetchList, fetchTotal } from '@api/logsfile-info'
import { defineStore } from 'pinia'

type State = {
  pagination: {
    curPage: number
    pageSize: number
    total: number
  }
  infoList: any[]
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
      this.infoList = res.data.map((item: APIResLogsFileType) => {
        item.is_parsed = item.is_parsed ? '是' : '否'
        return item
      })
    },

    async getTotal() {
      const res = await fetchTotal()
      this.pagination.total = res.data.total || 0
    }
  }
})
