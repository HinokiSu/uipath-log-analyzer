<template>
  <div class="dashboard__wrapper">
    <recently-error-card></recently-error-card>
    <ula-card
      class="log-state_card__wrapper"
      :title="$t('msg.dashboard.logStateTitle')"
      :bordered="false"
    >
      <log-state-chart></log-state-chart>
    </ula-card>

    <ula-card
      class="log-time_card__wrapper"
      :title="$t('msg.dashboard.logStateAndTimeTitle')"
      :bordered="false"
    >
      <log-time-chart></log-time-chart>
    </ula-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogTimeChart from '@components/charts/log-time-stats/log-time-chart.vue'
import LogStateChart from '@components/charts/log-state-stats/log-state-chart.vue'
import RecentlyErrorCard from '@components/recently-err-card/index.vue'
import UlaCard from '@components/card/card.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    LogTimeChart,
    LogStateChart,
    RecentlyErrorCard,
    UlaCard
  },
  setup() {
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

  .log-time_card__wrapper {
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
