<template>
  <div class="run-timeline">
    <ula-card>
      <a-skeleton :loading="loading" active>
        <run-timeline-item
          v-for="item in executionInfoList"
          :key="item.id"
          :id="item.id"
          :state="item.run_state"
          :time="item.log_time"
          :content="item.message"
          :totaltime="item.total_execution_time"
        />
        <a-skeleton
          :loading="showMoreLoading"
          active
          v-if="!isAllLoaded && executionInfoList.length"
        >
          <div class="show-more">
            <div class="show-more-button" @click="changePage()">More</div>
          </div>
        </a-skeleton>
        <a-empty v-if="!executionInfoList.length" :description="null" />
      </a-skeleton>
    </ula-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import RunTimeLineItem from './run-timeline-item.vue'
import UlaCard from '@components/card/card.vue'
import { useProcessStore } from '@/stores/process-store'
import { useDebounce } from '@/hooks/use-debounce'
export default defineComponent({
  name: 'RunTimeLine',
  components: {
    RunTimeLineItem,
    UlaCard
  },
  emits: ['load-more'],
  setup(props, { emit }) {
    const processStore = useProcessStore()

    const loading = computed(() => processStore.loading)
    const isAllLoaded = computed(() => processStore.isAllLoaded)
    const showMoreLoading = ref(false)
    const executionInfoList = computed(() => processStore.executionInfoList)

    // need debounce ,but not work
    const changePage = useDebounce(() => {
      showMoreLoading.value = true
      emit('load-more')
      showMoreLoading.value = false
    }, 600)

    onUnmounted(() => {
      processStore.clearState()
    })

    return {
      loading,
      executionInfoList,
      changePage,
      isAllLoaded,
      showMoreLoading
    }
  }
})
</script>

<style lang="less" scoped>
.run-timeline {
  .show-more {
    width: 100%;
    display: flex;
    justify-content: center;
    &-button {
      width: 50%;
      margin-top: 30px;
      font-size: 16px;
      text-align: center;
      border: 1px solid #eaeaea;
      padding: 8px 0;
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        border: 1px solid #888;
      }
    }
  }
}
</style>
