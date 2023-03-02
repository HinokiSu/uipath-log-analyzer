<template>
  <div class="run-timeline">
    <a-skeleton :loading="loading" active>
      <ula-card>
        <run-timeline-item
          v-for="item in executionInfoList"
          :key="item.id"
          :id="item.id"
          :state="item.run_state"
          :time="item.log_time"
          :content="item.message"
        />
        <a-skeleton :loading="showMoreLoading" active v-if="!isAllLoaded">
          <div class="show-more" >
            <div class="show-more-button" @click="changePage()">More</div>
          </div>
        </a-skeleton>
      </ula-card>
    </a-skeleton>
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
  props: {
    pn: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const processStore = useProcessStore()
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => processStore.total)
    })
    const loading = ref(true)
    const isAllLoaded = computed(() => processStore.isAllLoaded)
    const showMoreLoading = ref(false)
    const propsVal = computed(() => props)
    const executionInfoList = computed(() => processStore.executionInfoList)
    const getDataAndWait = () => {
      loading.value = true
      processStore
        .getExecutionTimeline(propsVal.value.pn, pagination.curPage, pagination.pageSize)
        .then(() => {
          loading.value = false
        })
    }

    // need debounce ,but not work
    const changePage = useDebounce(() => {
      pagination.curPage += 1
      showMoreLoading.value = true
      // const timer = setTimeout(() => {
      processStore
        .getExecutionTimeline(propsVal.value.pn, pagination.curPage, pagination.pageSize)
        .then(() => {
          showMoreLoading.value = false
        })
    }, 600)

    onMounted(() => {
      getDataAndWait()
    })

    onUnmounted(() => {
      processStore.clearState()
    })

    return {
      pagination,
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
      }
    }
  }
}
</style>
