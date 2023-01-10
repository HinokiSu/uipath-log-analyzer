<template>
  <a-card class="recently-err-wrapper" :loading="loading">
    <template #title>
      <div style="color: rgb(228 106 118 / 95%); font-weight: 600">❌ 最新错误日志</div>
    </template>
    <div class="card-body__wrapper">
      <div class="error-group">
        <div class="error-item" v-for="item in sourceData" :key="item.id">
          <div class="item-header">
            <span class="item-dot"> </span>
            <div class="item-pn">
              {{ item.process_name }}
            </div>
          </div>

          <div class="item-body">
            <div class="item-time">
              {{ item.log_time }}
            </div>
            <div class="item-message">
              {{ item.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { useStatsStore } from '@stores/stats-store'
import { defineComponent, ref, computed, onMounted } from 'vue'
export default defineComponent({
  name: 'RecentlyErrorCard',
  setup() {
    const statsStore = useStatsStore()

    const limit = ref(5)
    const loading = ref(true)
    const sourceData = computed(() => statsStore.recentlyError)

    const getDataAndWait = () => {
      loading.value = true
      statsStore.getStatsOfRecentlyError(limit.value).then(() => {
        loading.value = false
      })
    }

    onMounted(() => {
      getDataAndWait()
    })
    return {
      loading,
      sourceData
    }
  }
})
</script>

<style lang="less" scoped>
.recently-err-wrapper {
  max-width: 100%;
  min-width: 500px;
  overflow: hidden;
  border-radius: 20px;
  padding: 14px;
  margin: 15px;
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  .card-body__wrapper {
    .error-group {
      display: flex;
      flex-direction: column;

      .error-item {
        padding: 8px;

        .item-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;

          .item-dot {
            position: absolute;
            left: -8px;
            top: 50%;
            width: 8px;
            height: 8px;
            display: flex;
            align-items: center;
            place-content: center;
            -webkit-box-pack: center;
            -webkit-box-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 0.75rem;
            line-height: 1;
            padding: 0px;
            border-radius: 4px;
            transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            background-color: rgb(228, 106, 118);
            transform: scale(1) translate(50%, -50%);
            transform-origin: 100% 0%;
          }

          .item-pn {
            padding-left: 10px;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.5;
            font-family: 'DM Sans', sans-serif;
          }
        }

        .item-body {
          padding-left: 12px;

          font-family: 'DM Sans', sans-serif;

          .item-time {
            margin: 0px 0px 0px auto;
            font-size: 0.75rem;
            line-height: 1.66;
            color: rgb(119, 126, 137);
            font-weight: 400;
          }

          .item-message {
            color: rgb(119, 126, 137);
            margin: 0px;
            font-size: 0.875rem;
            line-height: 1.5;
            font-weight: 400;

            text-overflow: ellipsis;
            white-space: wrap;
          }
        }
      }
    }
  }
}
</style>
