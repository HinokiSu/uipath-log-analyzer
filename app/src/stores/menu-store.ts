import { MenuItemType } from '@interface/menu'
import { defineStore } from 'pinia'

type State = {
  collapsed: boolean
  menuList: MenuItemType[]
  selectedKeys: string[]
  menuWidth: string
  openKeys: string[]
}
export const useMenuStore = defineStore('MenuStore', {
  state: (): State => ({
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['1'],
    menuList: [],
    menuWidth: '256px'
  }),
  getters: {
    getSelectedKeys: (state) => {
      const key = sessionStorage.getItem('menu_select_keys')
      state.selectedKeys = key ? JSON.parse(key) : ['1']
      return state.selectedKeys
    }
  },
  actions: {
    changeCollapsed() {
      this.collapsed = !this.collapsed
    },
    updateSelectedKeys(keys: string[]) {
      this.selectedKeys = keys
      if(keys[0].includes(".")) {
        this.openKeys = Array.from(keys[0].slice(0, keys[0].indexOf(".")))
      }
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
          children: [
            {
              title: '全部',
              key: '3.1',
              path: '/logs/all'
            },
            {
              title: '时间',
              key: '3.2',
              path: '/logs/time'
            },
            {
              title: '进程名称',
              key: '3.3',
              path: '/logs/pn'
            }
          ]
        }
      ]
      this.menuList = menuList
    },
    changeMenuWidth(width: string) {
      this.menuWidth = width
    }
  }
})
