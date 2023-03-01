<template>
  <div class="logs-file-info_wrapper">
    <div class="header-features">
      <a-button type="primary" @click="updateLogsFiles"> ⛏ 获取最新日志文件信息 </a-button>
      <!-- TODO:解析全部按钮 && 首次进入该页面，存在无数据情况 -->
      <a-popconfirm
        title="是否全部解析"
        @confirm="confirmOfParseAll"
        @cancel="cancelOfParseAll"
        overlayClassName="logs-file_custom-popover"
      >
        <a-button type="primary" :loading="loadingOfParseAll"> 解析全部 </a-button>
      </a-popconfirm>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'is_parsed'">
          <div :style="getStyles(record.is_parsed)">
            {{ record.is_parsed }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <div class="tb-operation__container" style="display: flex;align-items: center;">
            <a @click="onViewDetail(record)">View</a>
            <a-popconfirm
              title="是否解析"
              @confirm="confirmOfPop(record.id)"
              @cancel="cancelOfPop"
              overlayClassName="logs-file_custom-popover"
            >
              <a-button style="margin-left: 20px" type="primary" :disabled="btnDisabled">
                解析
              </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <a-pagination
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
import { TableColumnsType } from '@/interface/common-type'
import {
  fetchParseAllLogFileInfo,
  fetchParseLogsByAllLogFile,
  fetchParseSpecifyFile
} from '@/api/parse-api'
import msg from '@/utils/message'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu-store'
import { TLogsFileInfo } from '@/interface/logs-file'
import inlineStyles from '@/hooks/inline-styles'

export default defineComponent({
  name: 'LogsFile',
  setup() {
    const logsFileStore = useLogsFileStore()
    const pagination = computed(() => logsFileStore.pagination)
    const router = useRouter()
    const dataSource = computed(() => logsFileStore.infoList)
    const loading = ref(false)
    const btnDisabled = ref(false)
    const columns: TableColumnsType[] = [
      {
        title: '文件名称',
        dataIndex: 'file_name',
        width: '30%'
      },
      {
        title: '是否解析',
        dataIndex: 'is_parsed',
        width: '10%'
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        width: '20%'
      },
      {
        title: '最近解析时间',
        dataIndex: 'updated_at',
        width: '20%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%'
      }
    ]
    const menuStore = useMenuStore()

    const getDataAndWait = () => {
      loading.value = true
      logsFileStore.getLogsFileInfo().then(() => {
        loading.value = false
      })
    }

    const getStyles = (val: string) => {
      if (val === '是') {
        return inlineStyles({
          'text-align': 'center',
          'padding': '4px 16px',
          'border-radius': '12px',
          'color': 'var(--success-status-color)',
          'background-color': 'var(--success-status-background)',
          'display': 'inline-flex',
          'justify-item': 'center'
        })
      } else if(val === '否') {
        return inlineStyles({
          'text-align': 'center',
          'padding': '4px 16px',
          'border-radius': '12px',
          'color': 'var(--warn-status-color)',
          'background-color': 'var(--warn-status-background)',
          'display': 'inline-flex',
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
    const updateLogsFiles = async () => {
      msg.info('🕛 开始获取...')
      await fetchParseAllLogFileInfo().then(() => {
        msg.ok('获取最新日志文件信息，完成 🎉')
        getDataAndWait()
      })
    }

    const confirmOfPop = (id: string) => {
      btnDisabled.value = true
      msg.info('正在解析...')
      return new Promise((resolve) => {
        setTimeout(() => {
          fetchParseSpecifyFile(id).then(() => {
            btnDisabled.value = false
            msg.ok('解析成功')
            getDataAndWait()
            resolve(true)
          })
        }, 3000)
      })
    }

    const cancelOfPop = () => {
      msg.warn('已取消解析')
    }
    const onViewDetail = (val: TLogsFileInfo) => {
      if (val.is_parsed === '是') {
        // redirect logs time table page
        router.push({
          name: 'logsTime',
          query: {
            time: val.time
          }
        })
        menuStore.updateSelectedKeys(['3.2'])
      } else {
        msg.info('该日志文件未被解析⚒，请先解析再进行查看')
      }
    }

    // top features
    // parse all logs file
    const loadingOfParseAll = ref(false)
    const parseAllLogsFiles = () => {}

    const confirmOfParseAll = () => {
      loadingOfParseAll.value = true
      btnDisabled.value = true
      msg.info('正在解析...')
      fetchParseLogsByAllLogFile().then(() => {
        btnDisabled.value = false
        loadingOfParseAll.value = false
        msg.ok('已全部解析完成🎉')
        getDataAndWait()
      })
    }
    const cancelOfParseAll = () => {
      msg.warn('已取消全部日志解析')
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
      updateLogsFiles,
      parseAllLogsFiles,
      confirmOfParseAll,
      cancelOfParseAll,
      loadingOfParseAll,
      getStyles
    }
  }
})
</script>

<style lang="less" scoped>
.logs-file-info_wrapper {
  .header-features {
    margin: 0 0 8px 8px;
    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }
  .paging-container {
    margin-top: 30px;
    padding-bottom: 24px;
    display: flex;
    place-content: center;
  }
}
</style>
