<template>
  <div class="logs__wrapper">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
      <template #headerCell="{ column }">
        <span>
          {{ $t(column.nameI18n) }}
        </span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'log_state'">
          <log-state :state="record.log_state"></log-state>
        </template>
      </template>
    </a-table>
    <a-pagination
    v-if="dataSource.length !== 0"
      v-model:current="pagination.curPage"
      v-model:pageSize="pagination.pageSize"
      :total="pagination.total"
      @change="changeCurrentPage"
      @showSizeChange="onShowSizeChange"
      class="paging-container"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, reactive, onUnmounted } from 'vue'
import { useLogsStore } from '@/stores/logs-store'
import LogState from '@components/logs-info/log-state.vue'
export default defineComponent({
  name: 'Logs',
  components: {
    LogState
  },
  setup() {
    const logsStore = useLogsStore()
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => logsStore.total)
    })
    const loading = ref(false)
    const isDisabled = ref(false)

    // get data for table
    const getAndWaitData = () => {
      loading.value = true
      logsStore.getAllLogsOfList(pagination.curPage, pagination.pageSize).then(() => {
        loading.value = false
      })
    }

    const dataSource = computed(() => logsStore.logsList)
    const changeCurrentPage = (page: number, pageSize: number) => {
      pagination.curPage = page
      pagination.pageSize = pageSize
      getAndWaitData()
    }

    watch(
      () => pagination.pageSize,
      (_new) => {
        pagination.pageSize = _new
      }
    )
    onMounted(() => {
      getAndWaitData()
    })

    onUnmounted(() => {
      logsStore.clearState()
    })

    const onShowSizeChange = (current: number, pageSize: number) => {
      pagination.curPage = 1
      pagination.pageSize = pageSize
    }
    const columns = computed(() => logsStore.columns)
    return {
      loading,
      columns,
      dataSource,
      pagination,
      changeCurrentPage,
      onShowSizeChange,
      isDisabled
    }
  }
})
</script>

<style lang="less" scoped>
.logs__wrapper {
  .paging-container {
    margin-top: 32px;
    padding-bottom: 35px;
    display: flex;
    place-content: center;
  }
}
</style>
