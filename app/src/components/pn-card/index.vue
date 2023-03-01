<template>
  <div class="pn-card_container">
    <a-statistic class="card-stats" title="总 计" :value="pn.totalCount" />
    <div class="progress-group__wrapper">
      <a-progress
        class="progress-item"
        type="circle"
        strokeColor="var(--info-status-color)"
        :percent="progPer.info"
        :width="progWidth"
      >
        <template #format="percent">
          <span style="color: var(--info-status-color)">{{ pn.infoCount }}</span>
        </template>
      </a-progress>

      <a-progress
        type="circle"
        strokeColor="var(--trace-status-color)"
        :percent="progPer.trace"
        :width="progWidth"
      >
        <template #format="percent">
          <span style="color: var(--trace-status-color)">{{ pn.traceCount }}</span>
        </template>
      </a-progress>

      <a-progress
        type="circle"
        strokeColor="var(--warn-status-color)"
        :percent="progPer.warn"
        :width="progWidth"
      >
        <template #format="percent">
          <span style="color: var(--warn-status-color)">{{ pn.warnCount }}</span>
        </template>
      </a-progress>

      <a-progress
        type="circle"
        strokeColor="var(--error-status-color)"
        :percent="progPer.err"
        :width="progWidth"
      >
        <template #format="percent">
          <span style="color: var(--error-status-color)">{{ pn.errorCount }}</span>
        </template>
      </a-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { TProcessLogStats } from '@/interface/process'
import { computed, defineComponent, PropType, reactive, ref } from 'vue'

export default defineComponent({
  name: 'ProcessNameCard',
  props: {
    pn: {
      type: Object as PropType<TProcessLogStats>,
      default: {
        pn: '',
        totalCount: 0,
        infoCount: 0,
        errorCount: 0,
        traceCount: 0,
        warnCount: 0
      }
    }
  },
  setup(props) {
    const pnVal = computed(() => props.pn)
    const progWidth = ref(70)
    const calcPer = (num: number, total: number = pnVal.value.totalCount) => {
      return (num / total) * 100
    }
    const progPer = reactive({
      info: calcPer(pnVal.value.infoCount),
      trace: calcPer(pnVal.value.traceCount),
      warn: calcPer(pnVal.value.warnCount),
      err: calcPer(pnVal.value.errorCount)
    })

    return { progWidth, progPer }
  }
})
</script>

<style lang="less" scoped>
.pn-card_container {
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 4fr;

  .card-stats {
    // min-width: 90px;
    margin-right: 20px;
  }

  .progress-group__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 12px;

    @media (max-width: 500px) {
      grid: repeat(2, 90px) / auto-flow 80px;
    }
  }
}
</style>
