import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import { logsFileRoutes } from '@routes/logs-file-route'
import { logsRoutes } from '@routes/logs-route'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/home.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@views/dashboard.vue')
  },
  ...logsFileRoutes,
  ...logsRoutes
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
