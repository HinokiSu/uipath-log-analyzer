import { RouteRecordRaw } from 'vue-router'

export const logsRoutes: RouteRecordRaw[] = [
  {
    path: '/logs',
    name: 'Logs',
    children: [
      {
        path: 'all',
        name: 'logsAll',
        component: () => import('@views/logs-info/logs.vue')
      },
      {
        path: 'time',
        name: 'logsTime',
        component: () => import('@views/logs-info/logs-time.vue')
      },
      {
        path: 'pn',
        name: 'logsPN',
        component: () => import('@views/logs-info/logs-pn.vue')
      },
      {
        path: 'pn/detail/:pn',
        name: 'logsPNDetail',
        component: () => import('@views/logs-info/logs-pn-detail.vue')
      }
    ]
  }
]
