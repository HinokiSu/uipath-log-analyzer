<template>
  <component :is="dotName" :class="dotClassName" />
</template>

<script lang="ts">
import classNames from '@/hooks/class-names'
import { computed, defineComponent, ref } from 'vue'
import {
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'RunTimelineItemIcon',
  props: {
    state: {
      type: Number,
      default: 2
    }
  },
  components: {
    PlayCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    QuestionCircleOutlined
  },
  setup(props) {
    const dotName = ref('')
    const propsVal = computed(() => props)

    const getRunState = (state: Number) => {
      if (state === 0) {
        dotName.value = 'PlayCircleOutlined'
        return 'started'
      }
      if (state === 1) {
        dotName.value = 'CheckCircleOutlined'
        return 'ended'
      }
      if (state == 2) {
        dotName.value = 'QuestionCircleOutlined'
        return 'default'
      }
      if (state === -1) {
        dotName.value = 'CloseCircleOutlined'
        return 'error'
      }
    }

    const dotClassName = classNames({
      [`run-timeline-item-dot-icon`]: true,
      [`${getRunState(propsVal.value.state)}`]: true
    })
    return {
      dotName,
      dotClassName
    }
  }
})
</script>

<style lang="less" scoped>
.run-timeline-item-dot-icon {
    font-size: 24px;
  &.default {
    color: #00000040;
    border-color: #00000040;
  }

  &.started {
    color: var(--info-status-color);
    border-color: var(--info-status-border-color);
  }

  &.ended {
    color: #1890ff;
    border-color: #1890ff;
  }

  &.error {
    color: var(--error-status-color);
    border-color: var(--error-status-border-color);
  }
}
</style>
