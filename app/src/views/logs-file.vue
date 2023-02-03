<template>
  <div class="logs-file-info_wrapper">
    <div class="header-features">
      <a-button type="primary" @click="updateLogsFiles"> 获取最新日志文件信息 </a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="tb-operation__container" style="display: flex">
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
import { fetchParseAllLogFileInfo, fetchParseSpecifyFile } from '@/api/parse-api'
import msg from '@/utils/message'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu-store'
import { TLogsFileInfo } from '@/interface/logs-file'

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

    const updateLogsFiles = async () => {
      await fetchParseAllLogFileInfo().then(() => {
        getDataAndWait()
      })
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

    const cancelOfPop = () => {}

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
      updateLogsFiles
    }
  }
})
</script>

<style lang="less" scoped>
.logs-file-info_wrapper {
  .header-features {
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
