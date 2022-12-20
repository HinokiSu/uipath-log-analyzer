<template>
  <div class="logs-file-info_wrapper">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a @click="onViewDetail(record.id)">View</a>
        </template>
      </template>
    </a-table>

    <a-pagination
      v-model:current="pagination.curPage"
      :total="pagination.total"
      @change="changeCurrentPage"
      class="paging-container"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useLogsFileStore } from '@stores/logs-file-store'
import { TableColumnsType } from '@interface/logs-file'

export default defineComponent({
  name: 'LogsFile',
  setup() {
    const logsFileStore = useLogsFileStore()
    const pagination = computed(() => logsFileStore.pagination)

    const dataSource = computed(() => logsFileStore.infoList)
    const loading = ref(false)
    const columns: TableColumnsType[] = [
      {
        title: '文件名称',
        dataIndex: 'file_name',
        width: '25%'
      },
      {
        title: '是否解析',
        dataIndex: 'is_parsed',
        width: '15%'
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        width: '25%'
      },
      {
        title: '最近更新时间',
        dataIndex: 'updated_at',
        width: '25%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%'
      }
    ]

    onMounted(() => {
      logsFileStore.getTotal()
      logsFileStore.getLogsFileInfo()
    })

    watch(
      () => pagination.value.curPage,
      (newVal) => {}
    )

    const changeCurrentPage = (page: number, pageSize: number) => {
      loading.value = true
      logsFileStore.pagination.curPage = page
      logsFileStore.getLogsFileInfo().then(() => {
        loading.value = false
      })
    }

    const onViewDetail = (val: string) => {
      // redirect logs table page
      console.log(val)
    }

    return { columns, dataSource, pagination, loading, changeCurrentPage, onViewDetail }
  }
})
</script>

<style lang="less" scoped>
.paging-container {
  margin-top: 16px;
  padding-bottom: 24px;
  display: flex;
  place-content: center;
}
</style>
