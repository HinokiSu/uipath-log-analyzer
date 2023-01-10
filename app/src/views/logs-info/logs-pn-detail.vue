<template>
  <div class="logs-pn-detail__warpper">
    <div class="detail-overview__container">
      <a-page-header class="page-header" title="进程名称列表" :sub-title="pn" @back="onBack()" />
      <log-error-msg :log="logDataOfRecErr"></log-error-msg>
    </div>
    <div class="detail-table__container">
      <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'log_state'">
            <log-state :state="record.log_state"></log-state>
          </template>
        </template>
      </a-table>
      <a-pagination
        v-model:current="pagination.curPage"
        v-model:pageSize="pagination.pageSize"
        :total="pagination.total"
        @change="changeCurrentPage"
        @showSizeChange="onShowSizeChange"
        class="paging-container"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { TableColumnsType } from '@/interface/common-type'
import { useLogsStore } from '@/stores/logs-store'
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogErrorMsg from '@/components/log-message/log-error-msg.vue'
import router from '@/routes'
export default defineComponent({
  name: 'LogsProcessNameDetail',
  components: {
    LogErrorMsg
  },
  setup() {
    const route = useRoute()
    const logsStore = useLogsStore()
    const pn = computed(() => (route.params.pn as string) || '')
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => logsStore.total)
    })
    const loading = ref(false)
    const logDataOfRecErr = computed(() => logsStore.logData)
    const getDataAndWait = () => {
      loading.value = true
      logsStore
        .getLogsListByProcessName(pn.value, pagination.pageSize, pagination.curPage)
        .then(() => {
          loading.value = false
        })
    }
    onMounted(() => {
      if (!pn.value.length) {
        console.log('pn is null')
      } else {
        getDataAndWait()
        logsStore.getLogOfRecentlyErrByPN(pn.value)
      }
    })

    const dataSource = computed(() => logsStore.logsList)
    const changeCurrentPage = (page: number, pageSize: number) => {
      pagination.curPage = page
      pagination.pageSize = pageSize
      getDataAndWait()
    }

    const onShowSizeChange = (current: number, pageSize: number) => {
      pagination.curPage = 1
      pagination.pageSize = pageSize
    }

    watch(
      () => pagination.pageSize,
      (_new) => {
        pagination.pageSize = _new
      }
    )

    const columns: TableColumnsType[] = [
      {
        title: '状态',
        dataIndex: 'log_state',
        key: 'log_state'
      },
      {
        title: '时间',
        dataIndex: 'log_time',
        key: 'log_time'
      },
      {
        title: '信息',
        dataIndex: 'message',
        key: 'message'
      },
      {
        title: '进程名称',
        dataIndex: 'process_name',
        key: 'process_name'
      },
      {
        title: '类型',
        dataIndex: 'log_type',
        key: 'log_type'
      },
      {
        title: '发起人',
        dataIndex: 'initiated_by',
        key: 'initiated_by'
      },
      {
        title: '文件名称',
        dataIndex: 'file_name',
        key: 'file_name'
      }
    ]

    const onBack = () => {
      router.push({
        name: 'logsPN'
      })
    }

    onUnmounted(() => {
      logsStore.clearState()
    })
    return {
      pn,
      onBack,
      pagination,
      loading,
      dataSource,
      columns,
      changeCurrentPage,
      onShowSizeChange,
      logDataOfRecErr
    }
  }
})
</script>

<style lang="less" scoped>
.logs-pn-detail__warpper {
  .detail-overview__container {
    width: 100%;
    .page-header {
      margin-left: 8px;
      border: 1px solid rgb(235, 237, 240);
    }
  }

  .paging-container {
    margin-top: 32px;
    padding-bottom: 35px;
    display: flex;
    place-content: center;
  }
}
</style>
