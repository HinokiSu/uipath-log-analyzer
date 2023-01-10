<template>
  <div class="dashboard__wrapper">
    <recently-error-card></recently-error-card>
    <a-card class="custom-card log-state_card__wrapper" title="日志状态" :bordered="false">
      <log-state-chart></log-state-chart>
    </a-card>

    <a-card class="custom-card log-time_card__warpper" title="时间&日志状态" :bordered="false">
      <log-time-chart></log-time-chart>
    </a-card>
  </div>
</template>

<script lang="ts">
import { useStatsStore } from '@/stores/stats-store'
import { defineComponent } from 'vue'
import LogTimeChart from '@components/charts/log-time-stats/log-time-chart.vue'
import LogStateChart from '@components/charts/log-state-stats/log-state-chart.vue'
import RecentlyErrorCard from '@components/recently-err-card/index.vue'
export default defineComponent({
  name: 'Dashboard',
  components: {
    LogTimeChart,
    LogStateChart,
    RecentlyErrorCard
  },
  setup() {
    const statsStore = useStatsStore()

    return {}
  }
})
</script>

<style lang="less" scoped>
.dashboard__wrapper {
  width: 100%;
  background: #fafbfb;
  padding: 20px;
  // display: flex;
  // flex-wrap: wrap;

  display: grid;
  grid-template-columns: 3fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .custom-card {
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
    border-radius: 20px;
    padding: 14px;
    margin: 15px;
    box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;
  }

  .log-time_card__warpper {
    width: 100%;
    min-width: 400px;
    overflow: auto;
  }

  .log-state_card__wrapper {
    max-width: 500px;
    max-height: 400px;
    min-width: 400px;
    min-height: 300px;
  }
}
</style>
