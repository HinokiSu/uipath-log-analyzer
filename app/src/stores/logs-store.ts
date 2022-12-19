import { APIResLogsFileType } from '@interface/logs-file'
import { defineStore } from 'pinia'

type State = {
  fileInfo: APIResLogsFileType[]
}
// logs store
export const useLogsStore = defineStore('logsStore', {
  state: (): State => ({
    fileInfo: []
  }),
  getters: {},

  actions: {}
})
