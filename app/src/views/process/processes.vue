<template>
  <div class="processes_wrapper">
    <a-list
      :grid="{ gutter: 12, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3, xxxl: 4 }"
      :data-source="dataSource"
      :loading="loading"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-skeleton :loading="!!item.loading" active>
            <pn-card :process="item"></pn-card>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      v-if="dataSource.length !== 0"
      class="pagination-container"
      v-model:current="pagination.curPage"
      :total="pagination.total"
      @change="changeCurrentPage"
      simple
    >
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">Previous</a>
        <a v-else-if="type === 'next'">Next</a>
        <component :is="originalElement" v-else></component>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import PnCard from '@components/pn-card/index.vue'
import { useProcessStore } from '@/stores/process-store'
export default defineComponent({
  name: 'Processes',
  components: {
    PnCard
  },
  setup() {
    const processStore = useProcessStore()
    const pagination = reactive({
      curPage: 1,
      pageSize: 12,
      total: computed(() => processStore.total)
    })
    const loading = ref(false)
    const dataSource = computed(() => processStore.processes)

    const getDataAndWait = () => {
      loading.value = true
      processStore.getAllProcessLogStats(pagination.pageSize, pagination.curPage).then(() => {
        loading.value = false
      })
    }
    onMounted(() => {
      getDataAndWait()
    })

    const changeCurrentPage = () => {
      getDataAndWait()
    }

    return {
      dataSource,
      loading,
      pagination,
      changeCurrentPage
    }
  }
})
</script>

<style lang="less" scoped>
.processes_wrapper {
  .pagination-container {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
