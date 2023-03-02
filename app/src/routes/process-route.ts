import { RouteRecordRaw } from 'vue-router'

export const processRoutes: RouteRecordRaw[] = [
  {
    path: '/process',
    name: 'Processes',
    component: () => import('@views/process/processes.vue')
  },
  {
    path: '/process/detail/:pn',
    name: 'ProcessDetail',
    component: () => import('@views/process/process-detail.vue')
  }
]
