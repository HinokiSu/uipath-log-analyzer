<template>
  <div class="process-detail__wrapper">
    <div class="detail-overview__container">
      <a-page-header class="page-header" title="进程名称列表" :sub-title="pn" @back="onBack()" />
      <log-error-msg :log="logDataOfRecErr"></log-error-msg>
    </div>
    <div>
      <run-timeline :pn="pn"> </run-timeline>
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
export default defineComponent({
  name: 'ProcessDetail',
  components: {
    LogErrorMsg,
    RunTimeLine
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
      logsStore.getLogsByProcessName(pn.value, pagination.curPage, pagination.pageSize).then(() => {
        loading.value = false
      })
    }
    onMounted(() => {
      if (!pn.value.length) {
        console.log('pn is null')
      } else {
        getDataAndWait()
        logsStore.getRecentlyErrorByProcessName(pn.value)
      }
    })

    watch(
      () => pagination.pageSize,
      (_new) => {
        pagination.pageSize = _new
      }
    )

    const onBack = () => {
      router.push({
        name: 'Processes'
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
      logDataOfRecErr
    }
  }
})
</script>

<style lang="less" scoped></style>
