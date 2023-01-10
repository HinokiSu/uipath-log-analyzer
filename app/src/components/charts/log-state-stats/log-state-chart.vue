<template>
  <div id="log-state-stats__chart" class="stats-radar__wrapper"></div>
</template>

<script lang="ts">
import { useStatsStore } from '@/stores/stats-store'
import { computed, defineComponent, inject, onMounted } from 'vue'
import { CustomRadar } from '.'

export default defineComponent({
  name: 'LogStateStatsPie',
  setup() {
    const echarts = inject('echarts') as any
    // fettle store by pinia
    const statsStore = useStatsStore()
    const chartData = computed(() => statsStore.logStateStats)

    onMounted(async () => {
      await statsStore.getStatsOfLogState().then(() => {
        const myChart = echarts.init(document.getElementById('log-state-stats__chart'))
        const radarChart = new CustomRadar(myChart, chartData.value)
        radarChart.applyChartConfig()
      })
    })
    return {}
  }
})
</script>

<style lang="less" scoped>
.stats-radar__wrapper {
  max-width: 400px;
  max-height: 400px;
  min-width: 300px;
  min-height: 300px;
}
</style>
