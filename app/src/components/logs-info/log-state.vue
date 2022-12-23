<template>
  <div class="log-state_wrapper" :class="stateType.classes">
    <state-icon :icon="stateType.icon" />
    {{ state }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import StateIcon from './state-icon.vue'
type TState = {
  icon: string
  classes: string
}
export default defineComponent({
  name: 'LogState',
  component: {
    StateIcon
  },
  props: {
    state: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const stateType = computed((): TState => {
      if (props.state === 'Info') {
        return {
          icon: 'info-circle-outlined',
          classes: '---info'
        }
      } else if (props.state === 'Trace') {
        return {
          icon: 'clock-circle-outlined',
          classes: '---trace'
        }
      } else if (props.state === 'Warn') {
        return {
          icon: 'warning-outlined',
          classes: '---warn'
        }
      } else if (props.state === 'Error') {
        return {
          icon: 'close-circle-outlined',
          classes: '---error'
        }
      }
      return {
        icon: 'question-circle-outlined',
        classes: '--default'
      }
    })
    return { stateType }
  }
})
</script>

<style lang="less" scoped>
.log-state_wrapper {
  box-sizing: border-box;
  margin: 0 8px 0 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  display: inline-block;
  height: auto;
  padding: 3px 7px;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;

  &.---default {
    color: #000000d9;
  }

  &.---info {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }

  &.---trace {
    color: #08979c;
    background: #e6fffb;
    border-color: #87e8de;
  }

  &.---error {
    color: #cf1322;
    background: #fff1f0;
    border-color: #ffa39e;
  }
}
</style>
