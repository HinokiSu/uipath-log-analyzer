import { RouteRecordRaw } from 'vue-router'

export const processRoutes: RouteRecordRaw[] = [
  {
    path: '/process',
    name: 'process',
    component: () => import('@views/logs-info/logs-pn.vue')
  },
  {
    path: '/process/detail/:pn',
    name: 'ProcessDetail',
    component: () => import('@views/logs-info/logs-pn-detail.vue')
  }
]
