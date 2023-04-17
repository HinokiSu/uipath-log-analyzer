<template>
  <div class="ula-process-detail__wrapper">
    <div class="detail-overview__container">
      <a-page-header
        class="page-header"
        :title="$t('msg.process.processNameListTitle')"
        :sub-title="pn"
        @back="onBack()"
      />
      <log-error-msg :log="logDataOfRecErr"></log-error-msg>
    </div>
    <a-tabs
      v-model:activeKey="activeTabsKey"
      centered
      :tabBarGutter="40"
      @tabClick="clickTabOfLogTB"
    >
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <branches-outlined />
            {{ $t('msg.process.timelineTab') }}
          </span>
        </template>
        <div class="run-timeline__content">
          <ula-pick-date
            class="pick-date"
            v-model:range-date="rangeDate"
            :name="$t('msg.common.queryButton')"
            @click="queryDate"
          ></ula-pick-date>
          <run-timeline :pn="pn" @load-more="loadMoreTimeline"> </run-timeline>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <table-outlined />
            {{ $t('msg.process.logTableTab') }}
          </span>
        </template>
        <a-table
          :dataSource="logDataSource"
          :columns="columns"
          :pagination="false"
          :loading="loadingOfLogTB"
        >
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
          v-if="logTBPagination.total !== 0"
          v-model:current="logTBPagination.curPage"
          :total="logTBPagination.total"
          @change="changePaginOfLogTB"
          class="pagin-container"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/routes'
import { useLogsStore } from '@/stores/logs-store'
import LogErrorMsg from '@/components/log-message/log-error-msg.vue'
import RunTimeLine from '@components/run-timeline/index.vue'
import UlaPickDate from '@components/pick-date/index.vue'
import { TRangeDateVal } from '@/interface/pick-date-type'
import { useProcessStore } from '@/stores/process-store'
import msg from '@/utils/message'
import { BranchesOutlined, TableOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ProcessDetail',
  components: {
    LogErrorMsg,
    RunTimeLine,
    UlaPickDate,
    // icons
    BranchesOutlined,
    TableOutlined
  },
  setup() {
    const i18n = useI18n()
    const route = useRoute()
    const logsStore = useLogsStore()
    const processStore = useProcessStore()
    const pn = computed(() => (route.params.pn as string) || '')
    /* tabs:  Timeline */
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => processStore.total)
    })

    const isUsePickDate = ref(false)
    const rangeDate = ref<TRangeDateVal>()

    const logDataOfRecErr = computed(() => logsStore.logData)
    // tabs
    const activeTabsKey = ref('1')

    // main timeline data
    const getTimelineDataAndWait = async () => {
      processStore.loading = true
      await processStore
        .getExecutionTimeline(pn.value, pagination.curPage, pagination.pageSize)
        .then(() => {
          processStore.loading = false
        })
    }

    const getTimelineDataByRangeDate = async () => {
      if (!rangeDate.value?.length) {
        msg.warn(i18n.t('msg.warn.noSelectDateWarn'))
      } else {
        return await processStore.getExecTimelineByRangeDate(
          pn.value,
          rangeDate.value[0].format('YYYY-MM-DD'),
          rangeDate.value[1].format('YYYY-MM-DD'),
          pagination.curPage,
          pagination.pageSize
        )
      }
    }

    // use pick date, timeline
    const queryDate = async () => {
      // re init
      isUsePickDate.value = true
      pagination.curPage = 1
      processStore.clearState()
      processStore.loading = true

      await getTimelineDataByRangeDate().then(() => {
        processStore.loading = false
      })
    }

    const loadMoreTimeline = async () => {
      if (isUsePickDate.value) {
        await getTimelineDataByRangeDate()
      } else {
        pagination.curPage = pagination.curPage + 1
        await processStore.getExecutionTimeline(pn.value, pagination.curPage, pagination.pageSize)
      }
    }

    /*
     *  Tabs 2: Log table
     */
    const logTBPagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => logsStore.total)
    })
    const logDataSource = computed(() => logsStore.logsList)
    const loadingOfLogTB = ref(false)
    const isFirstClickTabOfLogTB = ref(true)
    const columns = computed(() => logsStore.columns)
    const getLogDataAndWait = () => {
      loadingOfLogTB.value = true
      logsStore
        .getLogsByProcessName(pn.value, logTBPagination.curPage, logTBPagination.pageSize)
        .then(() => {
          loadingOfLogTB.value = false
        })
    }
    const clickTabOfLogTB = () => {
      watch(
        () => activeTabsKey.value,
        (newVal, oldVal) => {
          /* when enter process-detail page, not load tab 2, but instead first switch it's tab to do */
          if (newVal === '2' && isFirstClickTabOfLogTB.value) {
            // first fetch log table data
            getLogDataAndWait()
            isFirstClickTabOfLogTB.value = false
          }
        }
      )
    }

    const changePaginOfLogTB = (page: number) => {
      logTBPagination.curPage = page
      getLogDataAndWait()
    }

    onMounted(async () => {
      if (!pn.value.length) {
        msg.warn(i18n.t('msg.process.pnIsEmptyWarn'))
      } else {
        await logsStore.getRecentlyErrorByProcessName(pn.value)
        getTimelineDataAndWait()
      }
    })

    const onBack = () => {
      router.push({
        name: 'Processes'
      })
    }

    onUnmounted(() => {
      logsStore.clearState()
      processStore.clearState()
    })
    return {
      pn,
      activeTabsKey,
      pagination,
      logDataOfRecErr,
      rangeDate,
      onBack,
      queryDate,
      loadMoreTimeline,
      /* tabs 2: log table */
      columns,
      loadingOfLogTB,
      logTBPagination,
      logDataSource,
      changePaginOfLogTB,
      clickTabOfLogTB
    }
  }
})
</script>

<style lang="less" scoped>
.ula-process-detail {
  &__wrapper {
    .run-timeline__content {
      .pick-date {
        padding-left: 18px;
      }
    }

    .pagin-container {
      margin-top: 32px;
      padding-bottom: 35px;
      display: flex;
      place-content: center;
    }
  }
}
</style>
