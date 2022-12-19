import { MenuItemType } from '@interface/menu'
import { defineStore } from 'pinia'

type State = {
  collapsed: boolean
  menuList: MenuItemType[]
}
export const useMenuStore = defineStore('MenuStore', {
  state: (): State => ({
    collapsed: false,
    menuList: []
  }),
  getters: {},
  actions: {
    changeCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuList() {
      // menu item
      const menuList: Array<MenuItemType> = [
        {
          key: '1',
          icon: 'dot-chart-outlined',
          title: '仪表盘',
          path: '/dashboard'
        },
        {
          key: '2',
          icon: 'folder-outlined',
          title: '日志文件',
          path: '/files'
        },
        {
          key: '3',
          icon: 'file-text-outlined',
          title: '日志',
          path: '/logs'
        }
      ]
      this.menuList = menuList
    }
  }
})
