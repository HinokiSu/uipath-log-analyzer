import { MenuItemType } from '@interface/menu'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

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
      if (keys[0].includes('.')) {
        this.openKeys = Array.from(keys[0].slice(0, keys[0].indexOf('.')))
      }
      sessionStorage.setItem('menu_select_keys', JSON.stringify(this.selectedKeys))
    },
    getMenuList() {
      // menu item

      const menuList: Array<MenuItemType> = [
        {
          key: '1',
          icon: 'dot-chart-outlined',
          title: 'msg.menu.dashboardMenuItem',
          path: '/dashboard'
        },
        {
          key: '2',
          icon: 'folder-outlined',
          title: 'msg.menu.logFileMenuItem',
          path: '/files'
        },
        {
          key: '3',
          icon: 'file-text-outlined',
          title: 'msg.menu.logMenuItem',
          children: [
            {
              title: 'msg.menu.allMenuSubItem',
              key: '3.1',
              path: '/logs/all'
            },
            {
              title: 'msg.menu.timeMenuSubItem',
              key: '3.2',
              path: '/logs/time'
            }
          ]
        },
        {
          key: '4',
          icon: 'code-outlined',
          title: 'msg.menu.processMenuItem',
          path: '/process'
        }
      ]
      this.menuList = menuList
    },
    changeMenuWidth(width: string) {
      this.menuWidth = width
    }
  }
})
