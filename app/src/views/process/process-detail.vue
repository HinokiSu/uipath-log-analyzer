<template>
  <div class="ula-process-detail__wrapper">
    <div class="detail-overview__container">
      <a-page-header class="page-header" title="进程名称列表" :sub-title="pn" @back="onBack()" />
      <log-error-msg :log="logDataOfRecErr"></log-error-msg>
    </div>
    <div class="run-timeline__content">
      <ula-pick-date
        class="pick-date"
        v-model:range-date="rangeDate"
        @click="queryDate"
      ></ula-pick-date>
      <run-timeline :pn="pn" @load-more="loadMoreTimeline"> </run-timeline>
    </div>
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
export default defineComponent({
  name: 'ProcessDetail',
  components: {
    LogErrorMsg,
    RunTimeLine,
    UlaPickDate
  },
  setup() {
    const route = useRoute()
    const logsStore = useLogsStore()
    const processStore = useProcessStore()
    const pn = computed(() => (route.params.pn as string) || '')
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => processStore.total)
    })
    const isUsePickDate = ref(false)
    const rangeDate = ref<TRangeDateVal>()

    const logDataOfRecErr = computed(() => logsStore.logData)
    /*
    // get table
    const getDataAndWait = async () => {
      loading.value = true
      await logsStore
        .getLogsByProcessName(pn.value, pagination.curPage, pagination.pageSize)
        .then(() => {
          loading.value = false
        })
    } */

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
        msg.warn('未选择指定日期')
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
      // reinit
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

    onMounted(async () => {
      if (!pn.value.length) {
        console.log('pn is null')
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
      onBack,
      pagination,
      logDataOfRecErr,
      rangeDate,
      queryDate,
      loadMoreTimeline
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
  }
}
</style>
