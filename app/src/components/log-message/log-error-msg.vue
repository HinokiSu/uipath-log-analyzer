<template>
  <div class="error-msg__wrapper">
    <div class="msg_title">❌最新的错误日志</div>
    <a-skeleton :loading="loading" :paragraph="{ rows: 4 }" active>
      <div class="error-msg__container">
        <div class="left-box">
          <div class="msg-time__container">
            <span class="msg-time_title">时 间</span>
            <div class="msg-time">
              {{ logData.log_time }}
            </div>
          </div>
          <div class="file-name__container">
            <div class="file-name_title">文件 名称</div>
            <div class="file-name">
              {{ logData.file_name || '无' }}
            </div>
          </div>
        </div>

        <div class="right-box">
          <div class="msg-desc_title">错误 信息</div>
          <div class="msg-description">
            {{ logData.message }}
          </div>
        </div>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { TLogInfo } from '@/interface/log-info'
import { clear } from 'console'
import { computed, defineComponent, onMounted, PropType, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'LogErrorMessage',
  props: {
    log: {
      type: Object as PropType<TLogInfo>
    }
  },
  setup(props) {
    const logData = computed(() => props.log as TLogInfo)
    const loading = ref(true)
    let timer:NodeJS.Timeout

    watchEffect(() => {
      if (logData.value.log_time || Object.keys(logData.value).length === 0) {
        timer = setTimeout(() => {
          loading.value = false
        }, 500)
      }
    })

    onMounted(() => {
      clearTimeout(timer)
    })

    return { logData, loading }
  }
})
</script>

<style lang="less" scoped>
.error-msg__wrapper {
  padding: 8px;
  margin: 16px 15px;
  border-radius: 8px;
  border: 1px solid var(--error-status-border-color);
  background-color: var(--error-status-background);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .msg_title {
    color: #000000cb;
    font-size: 16px;
    font-weight: 600;
    padding: 2px;
  }

  .error-msg__container {
    margin-top: 8px;
    display: flex;
  }

  .msg-time_title,
  .file-name_title,
  .msg-desc_title {
    margin-bottom: 4px;
    color: #00000073;
    font-size: 14px;
  }

  .left-box {
    min-width: 220px;
    padding: 8px;
    margin-right: 8px;
    border-right: 2px dotted #c0bbbb;

    .msg-time__container {
      display: flex;
      flex-direction: column;

      .msg-time {
        font-size: 18px;
        padding-bottom: 4px;
        border-bottom: 2px dotted #c0bbbb;
      }
    }

    .file-name__container {
      margin-top: 6px;
      .file-name {
        font-size: 18px;
      }
    }
  }
  .right-box {
    margin-left: 4px;
    min-width: 60px;
    .msg-description {
      font-size: 1rem;
      white-space: pre-wrap;
      text-overflow: ellipsis;
      color: var(--error-status-color);
    }
  }
}
</style>
