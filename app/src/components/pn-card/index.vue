<template>
  <div class="pn-card_container">
    <a-card class="process-card" :title="process.pn">
      <template #extra>
        <router-link
          :to="{
            name: 'ProcessDetail',
            params: {
              pn: process.pn
            }
          }"
        >
          more
        </router-link>
      </template>
      <div class="run-times">
        <div class="run-times-title">Total Runs:</div>

        <div class="run-times-content">
          {{ process.runTimes }}
        </div>
      </div>
      <div class="state-count-group">
        <div class="state-count-item total">
          <div class="state-count-item-title">Total</div>
          <div class="state-count-item-content">
            {{ process.totalCount }}
          </div>
        </div>
        <div class="state-count-item info">
          <div class="state-count-item-title">Info</div>
          <div class="state-count-item-content">
            {{ process.infoCount }}
          </div>
        </div>
        <div class="state-count-item error">
          <div class="state-count-item-title">Error</div>
          <div class="state-count-item-content">
            {{ process.errorCount }}
          </div>
        </div>
        <div class="state-count-item warn">
          <div class="state-count-item-title">Warn</div>
          <div class="state-count-item-content">
            {{ process.warnCount }}
          </div>
        </div>

        <div class="state-count-item trace">
          <div class="state-count-item-title">Trace</div>
          <div class="state-count-item-content">
            {{ process.traceCount }}
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { TProcessLogStats } from '@/interface/process'
import { defineComponent, PropType } from 'vue'
import UlaCard from '@components/card/card.vue'
export default defineComponent({
  name: 'ProcessNameCard',
  props: {
    process: {
      type: Object as PropType<TProcessLogStats>,
      default: {
        pn: '',
        totalCount: 0,
        infoCount: 0,
        errorCount: 0,
        traceCount: 0,
        warnCount: 0,
        runTime: 0
      }
    }
  },
  components: {
    UlaCard
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.pn-card_container {
  .process-card {
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
    border-radius: 20px;
    padding: 14px;
    margin: 15px;
    box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;
  }

  .run-times {
    display: flex;
    padding-left: 16px;
    padding-bottom: 4px;
    align-items: center;
    margin-top: -6px;
    &-title {
      padding-right: 8px;
      color: #00000073;
      font-size: 14px;
    }

    &-content {
      color: #000000d9;
      font-size: 18px;
    }
  }
  .state-count {
    &-group {
      // display: flex;
      // align-items: center;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }

    &-item {
      padding: 2px 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      box-sizing: border-box;
      color: #000000d9;
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      list-style: none;
      font-feature-settings: 'tnum';

      &-title {
        margin-bottom: 4px;
        color: #00000073;
        font-size: 14px;
      }
      &-content {
        font-size: 24px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
          Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol,
          'Noto Color Emoji';
      }

      &.total {
        color: #000000b9;
      }

      &.info {
        color: var(--info-status-color);
      }

      &.error {
        color: var(--error-status-color);
      }
      &.warn {
        color: var(--warn-status-color);
      }

      &.trace {
        color: var(--trace-status-color);
      }
    }
  }
}
</style>
