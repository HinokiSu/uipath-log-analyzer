<template>
  <div class="ula-parse-tabs">
    <a-tabs v-model:activeKey="activeKey">
      <!-- parse all -->
      <a-tab-pane class="tab-all-parse__container" key="1" :tab="$t('msg.logFile.allTab')">
        <a-button class="get-latest-btn" type="primary" @click="getLatestLogFileInfo">
          ⛏ {{ $t('msg.logFile.getLatestLogFileInfoButton') }}
        </a-button>
        <a-popconfirm
          :title="$t('msg.logFile.isAllParseTitle')"
          @confirm="confirmOfParseAll"
          @cancel="cancelOfParseAll"
          overlayClassName="logs-file_custom-popover"
        >
          <a-button type="primary" :loading="isRunBtn"
            >{{ $t('msg.logFile.parseAllButton') }}
          </a-button>
        </a-popconfirm>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('msg.logFile.partTab')" force-render>
        <!-- range date to parse -->
        <ula-pick-date
          v-model:range-date="rangeDate"
          @click="clickRangeDate"
          :name="$t('msg.logFile.parseButton')"
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
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'UlaParseTabs',
  components: {
    UlaPickDate
  },
  setup() {
    const i18n = useI18n()
    const logsFileStore = useLogsFileStore()
    const isParsing = computed(() => logsFileStore.isParsing)
    // tab
    const activeKey = ref('1')
    const isRunBtn = ref(false)

    const getLatestLogFileInfo = async () => {
      msg.info('🕛 ' + i18n.t('msg.logFile.startGetInfo') + '...')
      await logsFileStore.parseAllLogFileInfo().then(async () => {
        await logsFileStore.getLogsFileInfo().then(() => {
          msg.ok(i18n.t('msg.logFile.getOkInfo') + ' 🎉')
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
      msg.warn(i18n.t('msg.logFile.cancelParseWarn'))
    }

    /*  range Date */
    const rangeDate = ref<TRangeDateVal>()
    const clickRangeDate = async () => {
      if (!rangeDate.value?.length) {
        msg.warn(i18n.t('msg.logFile.noSelectDateWarn'))
      } else {
        logsFileStore.isParsing = true
        msg.info(i18n.t('msg.logFile.startParseInfo') + '...')
        await logsFileStore
          .parseLogOfLogFileByRangeDate(
            rangeDate.value[0].format('YYYY-MM-DD'),
            rangeDate.value[1].format('YYYY-MM-DD')
          )
          .then(() => {
            logsFileStore.isParsing = false
            msg.ok(i18n.t('msg.logFile.partParseDoneInfo') + ' 🎉')
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
