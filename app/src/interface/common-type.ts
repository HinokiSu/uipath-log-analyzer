// table columns
export type TableColumnsType = {
  title: string
  dataIndex: string
  key?: string
  sorter?: boolean
  width?: string
  filters?: Array<{
    text: string
    value: string
  }>
}
