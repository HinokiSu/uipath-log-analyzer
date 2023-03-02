<template>
  <div class="ula-pick-date__wrapper">
    <a-range-picker
      class="pick-date__container"
      showToday
      :style="{ 'margin-right': gap }"
      v-model:value="rangeDate"
      :disabled-date="disabledDate"
    />
    <a-button class="query-btn" :disabled="isDisabled" @click="clickQuery">查询</a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

import dayjs, { Dayjs } from 'dayjs'
import { TRangeDateVal } from '@/interface/pick-date-type'
export default defineComponent({
  name: 'UlaPickDate',
  props: {
    rangeDate: {
      type: Object as PropType<TRangeDateVal>
    },
    gap: {
      type: String,
      default: '16px'
    }
  },
  emits: ['update:range-date', 'click'],
  setup(props, { emit }) {
    const rangeDate = ref<TRangeDateVal>()
    const disabledDate = (current: Dayjs) => {
      // Can not select days before today and today
      return current && current > dayjs().endOf('day')
    }
    const isDisabled = computed(() => (rangeDate && rangeDate.value?.length === 2 ? false : true))
    watch(
      () => rangeDate.value,
      (newVal, oldVal) => {
        emit('update:range-date', newVal)
      }
    )

    const clickQuery = () => {
      emit('click')
    }
    return { rangeDate, disabledDate, clickQuery, isDisabled }
  }
})
</script>

<style lang="less" scoped>
.ula-pick-date {
  &__wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
