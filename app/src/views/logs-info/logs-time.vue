<template>
  <div class="logs-time_wrapper">
    <div class="card-header_container">
      <a-date-picker v-model:value="pickDate" :disabled-date="disabledDate" />
      <a-button class="query-btn" @click="onClickQuery" type="primary" :disabled="isDisabled">{{
        $t('msg.log.queryButton')
      }}</a-button>
    </div>
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
import { defineComponent, ref, computed, watch, watchEffect, reactive, onUnmounted } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { useLogsStore } from '@/stores/logs-store'
import LogState from '@components/logs-info/log-state.vue'
import { useRoute } from 'vue-router'
import msg from '@/utils/message'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'LogsTime',
  components: {
    LogState
  },
  setup() {
    const i18n = useI18n()
    const logsStore = useLogsStore()
    const pickDate = ref<Dayjs>(dayjs())
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => logsStore.total)
    })
    const loading = ref(false)
    const isDisabled = ref(false)
    const route = useRoute()

    const disabledDate = (current: Dayjs) => {
      // Can not select days after today
      return current && current > dayjs().endOf('day')
    }
    // get data for table
    const getAndWaitData = (time: string) => {
      loading.value = true
      logsStore.getLogsListByLogTime(time, pagination.curPage, pagination.pageSize).then(() => {
        loading.value = false
      })
    }
    // format pick date value, convert string
    const formatPickDate = () => pickDate.value.format('YYYY-MM-DD')

    watchEffect(() => {
      const time = route.query.time as string
      if (time) {
        pickDate.value = dayjs(time)
        getAndWaitData(formatPickDate())
      }
    })

    const dataSource = computed(() => logsStore.logsList)
    const changeCurrentPage = (page: number, pageSize: number) => {
      pagination.curPage = page
      getAndWaitData(formatPickDate())
    }

    watch(
      () => pagination.pageSize,
      (_new) => {
        pagination.pageSize = _new
      }
    )

    // query button
    const onClickQuery = () => {
      if (pickDate.value) {
        getAndWaitData(formatPickDate())
      } else {
        msg.warn(i18n.t('msg.warn.noSelectDateWarn'))
      }
    }

    watchEffect(() => {
      if (!pickDate.value) {
        isDisabled.value = true
      } else {
        isDisabled.value = false
      }
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
      pickDate,
      disabledDate,
      loading,
      columns,
      dataSource,
      pagination,
      changeCurrentPage,
      onShowSizeChange,
      isDisabled,
      onClickQuery
    }
  }
})
</script>

<style lang="less" scoped>
.logs-time_wrapper {
  .card-header_container {
    margin: 16px 0;
    display: flex;
    padding-left: 10px;
    align-items: center;

    .query-btn {
      margin-left: 16px;
    }
  }
  .paging-container {
    margin-top: 30px;
    padding-bottom: 24px;
    display: flex;
    place-content: center;
  }
}
</style>
