<template>
  <div class="logs-pn_wrapper">
    <a-list
      :grid="{ gutter: 12, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3, xxxl: 4 }"
      :data-source="dataSource"
      :loading="loading"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card :title="item.pn">
            <a-skeleton :loading="!!item.loading" active>
              <pn-card :pn="item"></pn-card>
            </a-skeleton>
            <template #extra>
              <router-link
                :to="{
                  name: 'ProcessDetail',
                  params: {
                    pn: item.pn
                  }
                }"
              >
                more
              </router-link>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      class="pagin-container"
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
import { useLogsStore } from '@/stores/logs-store'
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import PnCard from '@components/pn-card/index.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LogsProcessName',
  components: {
    PnCard
  },
  setup() {
    const logsStore = useLogsStore()
    const router = useRouter()
    const pagination = reactive({
      curPage: 1,
      pageSize: 10,
      total: computed(() => logsStore.total)
    })
    const loading = ref(false)
    const dataSource = computed(() => logsStore.pnList)

    const getDataAndWait = () => {
      loading.value = true
      logsStore.getAllPNStats(pagination.pageSize, pagination.curPage).then(() => {
        loading.value = false
      })
    }
    onMounted(() => {
      getDataAndWait()
    })

    onUnmounted(() => {
      logsStore.clearState()
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
.logs-pn_wrapper {
  .pagin-container {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
