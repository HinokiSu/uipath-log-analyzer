<template>
  <div id="log-time__chart" class="stats-line-chart__wrapper"></div>
</template>

<script lang="ts">
import { useStatsStore } from '@/stores/stats-store'
import { computed, defineComponent, inject, onMounted } from 'vue'
import { CustomLineChart } from '.'

export default defineComponent({
  name: 'LogTimeChart',
  setup() {
    const statsStore = useStatsStore()
    const chartData = computed(() => statsStore.logTimeStats)
    const echarts = inject('echarts') as any

    onMounted(async () => {
      statsStore.getStatsOfLogTime().then(() => {
        const myChart = echarts.init(document.getElementById('log-time__chart'))
        const lineChart = new CustomLineChart(myChart, chartData.value)
        lineChart.applyChartConfig()
      })
    })

    return {}
  }
})
</script>

<style lang="less" scoped>
.stats-line-chart__wrapper {
  width: 100%;
  min-height: 400px;
}
</style>
