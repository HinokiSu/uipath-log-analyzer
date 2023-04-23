<template>
  <div class="logs-file-info_wrapper">
    <div class="head-features">
      <ula-parse-tabs></ula-parse-tabs>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
      <template #headerCell="{ column }">
          <span>
            {{ $t(column.nameI18n) }}
          </span>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'is_parsed'">
          <div :style="getStyles(record.is_parsed)">
            {{ record.is_parsed === 'true' ? $t('msg.common.yes') : $t('msg.common.no') }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <div class="tb-operation__container" style="display: flex; align-items: center">
            <a @click="onViewDetail(record)">View</a>
            <a-popconfirm
              :title="$t('msg.logFile.isParseTitle')"
              @confirm="confirmOfPop(record.id)"
              @cancel="cancelOfPop"
              overlayClassName="logs-file_custom-popover"
            >
              <a-button style="margin-left: 20px" type="primary" :disabled="btnDisabled">
                {{ $t('msg.logFile.parseButton') }}
              </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <a-pagination
      v-if="dataSource.length !== 0"
      v-model:current="pagination.curPage"
      :total="pagination.total"
      @change="changeCurrentPage"
      class="paging-container"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useLogsFileStore } from '@stores/logs-file-store'
import { useMenuStore } from '@/stores/menu-store'
import { TLogsFileInfo } from '@/interface/logs-file'
import { useRouter } from 'vue-router'
import { TTableColumnsType } from '@/interface/common-type'
import { fetchParseSpecifyFile } from '@/api/parse-api'
import msg from '@/utils/message'
import inlineStyles from '@/hooks/inline-styles'
import UlaParseTabs from '@components/parse-tabs/index.vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'LogsFile',
  components: { UlaParseTabs },
  setup() {
    const i18n = useI18n()
    const logsFileStore = useLogsFileStore()
    const menuStore = useMenuStore()
    const pagination = computed(() => logsFileStore.pagination)
    const router = useRouter()
    const dataSource = computed(() => logsFileStore.infoList)
    const loading = ref(false)
    const btnDisabled = computed(() => logsFileStore.isParsing)
    const columns: TTableColumnsType[] = [
      {
        title: '文件名称',
        nameI18n: 'msg.logFileColumn.fileName',
        dataIndex: 'file_name',
        width: '30%'
      },
      {
        title: '是否解析',
        nameI18n: 'msg.logFileColumn.isParsed',
        dataIndex: 'is_parsed',
        width: '10%'
      },
      {
        title: '创建时间',
        nameI18n: 'msg.logFileColumn.createdAt',
        dataIndex: 'created_at',
        width: '20%'
      },
      {
        title: '最近解析时间',
        nameI18n: 'msg.logFileColumn.updatedAt',
        dataIndex: 'updated_at',
        width: '20%'
      },
      {
        title: '操作',
        nameI18n: 'msg.logFileColumn.operation',
        dataIndex: 'operation',
        width: '20%'
      }
    ]

    const getDataAndWait = () => {
      loading.value = true
      logsFileStore.getLogsFileInfo().then(() => {
        loading.value = false
      })
    }

    const getStyles = (val: string) => {
      if (val === 'true') {
        return inlineStyles({
          'text-align': 'center',
          padding: '4px 16px',
          'border-radius': '12px',
          color: 'var(--success-status-color)',
          'background-color': 'var(--success-status-background)',
          display: 'inline-flex',
          'justify-item': 'center'
        })
      } else if (val === 'false') {
        return inlineStyles({
          'text-align': 'center',
          padding: '4px 16px',
          'border-radius': '12px',
          color: 'var(--warn-status-color)',
          'background-color': 'var(--warn-status-background)',
          display: 'inline-flex',
          'justify-item': 'center'
        })
      }
    }

    onMounted(() => {
      getDataAndWait()
    })

    const changeCurrentPage = (page: number, pageSize: number) => {
      loading.value = true
      logsFileStore.pagination.curPage = page
      logsFileStore.getLogsFileInfo().then(() => {
        loading.value = false
      })
    }

    // table operations
    const confirmOfPop = (id: string) => {
      logsFileStore.isParsing = true
      msg.info(i18n.t('msg.logFile.parsingInfo') + '...')
      return new Promise((resolve) => {
        setTimeout(() => {
          fetchParseSpecifyFile(id).then(() => {
            logsFileStore.isParsing = false
            msg.ok(i18n.t('msg.logFile.parseDoneInfo'))
            getDataAndWait()
            resolve(true)
          })
        }, 3000)
      })
    }

    const cancelOfPop = () => {
      msg.warn(i18n.t('msg.logFile.cancelParseWarn'))
    }

    const onViewDetail = (val: TLogsFileInfo) => {
      if (val.is_parsed === 'true') {
        // redirect logs time table page
        router.push({
          name: 'logsTime',
          query: {
            time: val.time
          }
        })
        menuStore.updateSelectedKeys(['3.2'])
      } else {
        msg.info(i18n.t('msg.logFile.viewButNoParseWarn'))
      }
    }

    return {
      columns,
      dataSource,
      pagination,
      loading,
      changeCurrentPage,
      onViewDetail,
      confirmOfPop,
      cancelOfPop,
      btnDisabled,
      getStyles
    }
  }
})
</script>

<style lang="less" scoped>
.logs-file-info_wrapper {
  .head-features {
    margin: 0 0 8px 8px;
  }
  .paging-container {
    margin-top: 30px;
    padding-bottom: 24px;
    display: flex;
    place-content: center;
  }
}
</style>
