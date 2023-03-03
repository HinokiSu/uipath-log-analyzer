import { RouteRecordRaw } from 'vue-router'

export const logsFileRoutes: RouteRecordRaw[] = [
  {
    path: '/files',
    name: 'files',
    component: () => import('@views/logs-file/logs-file.vue')
  }
]
