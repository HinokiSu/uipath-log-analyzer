export type MenuItemType = {
  key: string
  icon: string
  title: string
  path?: string
  children?: Array<SubMenuItemType>
}

export type SubMenuItemType = {
  key: string
  title: string
  path: string
  icon?: string
}
