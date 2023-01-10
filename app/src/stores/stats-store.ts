import {
  fetchStatsByLogState,
  fetchStatsByLogTime,
  fetchStatsByRecentlyError
} from '@/api/stats-api'
import { TLogStateObj, TLogTimeObj } from '@/interface/dashboard'
import { TLogInfo } from '@/interface/log-info'
import { defineStore } from 'pinia'

type TState = {
  logTimeStats: TLogTimeObj[]
  logStateStats: TLogStateObj[]
  recentlyError: TLogInfo[]
  total: number
}
export const useStatsStore = defineStore('Stats store', {
  state: (): TState => ({
    logTimeStats: [],
    logStateStats: [],
    recentlyError: [],
    total: 0
  }),
  getters: {},
  actions: {
    clearState() {
      this.logStateStats = []
      this.logTimeStats = []
      this.recentlyError = []
      this.total = 0
    },
    async getStatsOfLogState() {
      const res = await fetchStatsByLogState()
      this.logStateStats = res.data.list
      const stateList = ['Error', 'Warn', 'Trace', 'Info']

      // replenish state
      this.logStateStats.forEach((item) => {
        if (stateList.includes(item['log_state'])) {
          stateList.splice(stateList.indexOf(item['log_state']), 1)
        }
      })

      stateList.forEach((item) => {
        this.logStateStats.push({
          log_state: item,
          total: 0
        })
      })
    },
    async getStatsOfLogTime() {
      const res = await fetchStatsByLogTime()
      this.logTimeStats = res.data.list
      this.total = res.data.total
    },
    async getStatsOfRecentlyError(qty: number) {
      const res = await fetchStatsByRecentlyError(qty)
      this.recentlyError = res.data.list
      this.total = res.data.total
    }
  }
})
