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
  padding: 4px 8px 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
  cursor: pointer;

  font-family: 'DM Sans', sans-serif;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 24px;
  white-space: nowrap;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  outline: 0px;
  text-decoration: none;
  border: 0px;
  vertical-align: middle;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 0.75rem;
  border-radius: 15px;

  &.---default {
    color: #000000d9;
  }

  &.---info {
    color: var(--info-status-color);
    // color: rgb(0, 194, 146);
    background: var(--info-status-background);
    border-color: var(--info-status-border-color);
  }

  &.---trace {
    color: var(--trace-status-color);
    background: var(--trace-status-background);
    border-color: var(--trace-status-border-color);
  }

  &.---warn {
    color: var(--warn-status-color);
    background: var(--warn-status-background);
    border-color: var(--warn-status-border-color);
  }

  &.---error {
    color: var(--error-status-color);
    background: var(--error-status-background);
    border-color: var(--error-status-border-color);
  }
}
</style>
