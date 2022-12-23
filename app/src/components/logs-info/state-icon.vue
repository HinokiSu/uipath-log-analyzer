<template>
  <component :is="icon" class="state-icon" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  InfoCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  components: {
    InfoCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    WarningOutlined,
    QuestionCircleOutlined
  }
})
</script>

<style lang="less" scoped>
.state-icon {
    font-size: 15px;
    padding-right: 2px;
    text-align: center;
}
</style>
