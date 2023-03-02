import { fetchExecutionTimeline, fetchProcessesLogStats } from '@/api/process-api'
import { TProcessLogStats, TProcessExecutionInfo } from '@/interface/process'
import { defineStore } from 'pinia'

type TState = {
  processes: TProcessLogStats[] | []
  executionInfoList: TProcessExecutionInfo[]
  total: number
  isAllLoaded: boolean
}
export const useProcessStore = defineStore('ProcessStore', {
  state: (): TState => ({
    processes: [],
    executionInfoList: [],
    total: 0,
    isAllLoaded: false,
  }),
  getters: {
    getLastId: (state) => {
      if (state.executionInfoList.length === 0) {
        return ''
      }
      const lastId = state.executionInfoList[state.executionInfoList.length - 1].id
      return lastId
    }
  },
  actions: {
    clearState() {
      this.executionInfoList = []
      this.processes = []
      this.total = 0
      this.isAllLoaded = false
    },
    async getAllProcessLogStats(pageSize: number, curPage: number) {
      const res = await fetchProcessesLogStats(curPage, pageSize)
      this.processes = res.data.list
      this.total = res.data.total
    },

    async getExecutionTimeline(pn: string, curPage: number, pageSize: number) {
      const res = await fetchExecutionTimeline(pn, curPage, pageSize)

      if (res.data.list.length !== 0) {
        this.total = res.data.total
        const newTimeLineList = res.data.list as TProcessExecutionInfo[]
        // append
        this.executionInfoList = this.executionInfoList.concat(newTimeLineList)
      } else {
        this.isAllLoaded = true
      }
    }
  }
})
