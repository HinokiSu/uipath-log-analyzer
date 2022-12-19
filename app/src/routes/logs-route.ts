import { RouteRecordRaw } from 'vue-router'

export const logsRoutes: RouteRecordRaw[] = [
  {
    path: '/logs',
    name: 'logs',
    component: () => import('@views/logs.vue')
  }
]
