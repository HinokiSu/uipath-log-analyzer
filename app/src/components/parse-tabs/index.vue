<template>
  <div class="ula-parse-tabs">
    <a-tabs v-model:activeKey="activeKey">
      <!-- parse all -->
      <a-tab-pane class="tab-all-parse__container" key="1" tab="全部">
        <a-button class="get-latest-btn" type="primary" @click="getLatestLogFileInfo">
          ⛏ 获取最新日志文件信息
        </a-button>
        <a-popconfirm
          title="是否全部解析"
          @confirm="confirmOfParseAll"
          @cancel="cancelOfParseAll"
          overlayClassName="logs-file_custom-popover"
        >
          <a-button type="primary" :loading="isRunBtn"> 解析全部 </a-button>
        </a-popconfirm>
      </a-tab-pane>
      <a-tab-pane key="2" tab="部分" force-render>
        <!-- range date to parse -->
        <ula-pick-date
          v-model:range-date="rangeDate"
          @click="clickRangeDate"
          :name="'解析'"
        ></ula-pick-date>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import msg from '@/utils/message'
import { computed, defineComponent, ref } from 'vue'
import UlaPickDate from '@components/pick-date/index.vue'
import { TRangeDateVal } from '@/interface/pick-date-type'
import { useLogsFileStore } from '@/stores/logs-file-store'
export default defineComponent({
  name: 'UlaParseTabs',
  components: {
    UlaPickDate
  },
  setup() {
    const logsFileStore = useLogsFileStore()
    const isParsing = computed(() => logsFileStore.isParsing)
    // tab
    const activeKey = ref('1')
    const isRunBtn = ref(false)

    const getLatestLogFileInfo = async () => {
      msg.info('🕛 开始获取...')
      await logsFileStore.parseAllLogFileInfo().then(async () => {
        await logsFileStore.getLogsFileInfo().then(() => {
          msg.ok('获取最新日志文件信息，完成 🎉')
        })
      })
    }

    const confirmOfParseAll = async () => {
      isRunBtn.value = true
      await logsFileStore.parseLogOfAllLogFile().then(() => {
        isRunBtn.value = false
      })
    }
    const cancelOfParseAll = () => {
      msg.warn('已取消全部日志解析')
    }

    /*  range Date */
    const rangeDate = ref<TRangeDateVal>()
    const clickRangeDate = async () => {
      if (!rangeDate.value?.length) {
        msg.warn('未选择指定日期')
      } else {
        logsFileStore.isParsing = true
        msg.info('开始解析...')
        await logsFileStore
          .parseLogOfLogFileByRangeDate(
            rangeDate.value[0].format('YYYY-MM-DD'),
            rangeDate.value[1].format('YYYY-MM-DD')
          )
          .then(() => {
            logsFileStore.isParsing = false
            msg.ok('已部分解析完成 🎉')
          })
      }
    }

    return {
      activeKey,
      isParsing,
      isRunBtn,
      rangeDate,
      confirmOfParseAll,
      cancelOfParseAll,
      clickRangeDate,
      getLatestLogFileInfo
    }
  }
})
</script>

<style lang="less" scoped>
.tab-all-parse__container {
  padding: 10px 0;
  display: flex;
  align-items: center;
  .get-latest-btn {
    margin-right: 16px;
  }
}
</style>
