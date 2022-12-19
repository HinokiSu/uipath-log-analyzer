import { MenuItemType } from '@interface/menu'
import { defineStore } from 'pinia'

type State = {
  collapsed: boolean
  menuList: MenuItemType[]
  selectedKeys: string[]
}
export const useMenuStore = defineStore('MenuStore', {
  state: (): State => ({
    collapsed: false,
    selectedKeys: ['1'],
    menuList: []
  }),
  getters: {
    getSelectedKeys: (state) =>
      (state.selectedKeys = JSON.parse(sessionStorage.getItem('menu_select_keys') || '') || ['1'])
  },
  actions: {
    changeCollapsed() {
      this.collapsed = !this.collapsed
    },
    updateSelectedKeys(keys: string[]) {
      this.selectedKeys = keys
      sessionStorage.setItem('menu_select_keys', JSON.stringify(this.selectedKeys))
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
