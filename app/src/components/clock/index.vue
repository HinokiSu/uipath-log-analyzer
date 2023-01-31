<template>
  <div class="realtime-clock__container">
    <div class="realtime-date">
      {{ realTime.format('YYYY/MM/DD') }}
    </div>
    <div class="realtime-time">
      {{ realTime.format('HH:mm:ss') }}
    </div>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { defineComponent, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'RealTimeClock',
  setup() {
    const realTime = ref<Dayjs>(dayjs())

    const updateRealTime = () => {
      realTime.value = dayjs()
    }
    const updateTimeInterval = setInterval(updateRealTime, 1000)

    onBeforeUnmount(() => {
      clearInterval(updateTimeInterval)
    })

    return {
      realTime
    }
  }
})
</script>

<style lang="less" scoped>
.realtime-clock__container {
  color: #b1afaf;
  display: flex;
  flex-direction: column;
  align-items: center;
  .realtime-date {
    font-size: 0.8rem;
  }
  .realtime-time {
    font-size: 1.2rem;
  }
}
</style>
