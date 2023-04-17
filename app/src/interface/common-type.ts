// table columns
export type TTableColumnsType = {
  title: string
  dataIndex: string
  key?: string
  nameI18n: string
  sorter?: boolean
  width?: string
  filters?: Array<{
    text: string
    value: string
  }>
}
