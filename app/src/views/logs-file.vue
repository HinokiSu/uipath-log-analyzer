<template>
  <div>
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useLogsStore } from '@stores/logs-store'
import { TableColumnsType } from '@interface/logs-file'

export default defineComponent({
  name: 'LogsFile',
  setup() {
    const logsFileStore = useLogsStore()

    const dataSource = computed(() => logsFileStore)
    const columns: TableColumnsType[] = [
      {
        title: '文件名称',
        dataIndex: 'file_name'
      },
      {
        title: '是否解析',
        dataIndex: 'is_parsed'
      },
      {
        title: '创建时间',
        dataIndex: 'created_at'
      },
      {
        title: '最近更新时间',
        dataIndex: 'updated_at'
      }
    ]

    return { columns, dataSource }
  }
})
</script>

<style lang="less" scoped></style>
