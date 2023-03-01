<template>
  <div class="run-timeline-item_wrapper">
    <div class="run-timeline-item_tail" v-if="!isLast"></div>

    <div class="run-timeline-item_dot">
      <run-tl-item-icon :state="state" />
    </div>
    <div class="run-timeline-item_content">
      <div class="content-time">
        {{ time }}
      </div>
      <div class="content-msg">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useProcessStore } from '@/stores/process-store'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import RunTlItemIcon from './run-tl-item-icon.vue'
export default defineComponent({
  name: 'RunTimeLineItem',
  props: {
    id: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 2
    },
    time: {
      type: String,
      default: ''
    },
    totaltime: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    RunTlItemIcon
  },
  setup(props) {
    const propsVal = computed(() => props)
    const processStore = useProcessStore()
    // const lastId = computed(() => )
    const isLast = computed(() => {
      if (propsVal.value.id === processStore.getLastId) {
        return true
      }
      return false
    })

    return { isLast }
  }
})
</script>

<style lang="less" scoped>
.run-timeline-item {
  &_wrapper {
    position: relative;
    margin: 0;
    padding-right: 20px;
    font-size: 14px;
    list-style: none;
  }

  &_tail {
    position: absolute;
    top: 24px;
    left: 10px;

    height: calc(100% - 23px);
    border-left: 2px solid #d9d9d9;
  }

  &_head {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 2px solid transparent;
    border-radius: 100px;
  }

  &_content {
    position: relative;
    top: -7.001px;
    margin: 0 0 0 30px;
    word-break: break-word;
    width: 100%;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
    border-radius: 20px;
    padding: 16px 16px 16px 20px;
    box-shadow: rgba(116, 125, 128, 0.11) 0px 7px 30px 0px;

    .content-time {
      font-size: 16px;
      padding-bottom: 4px;
    }
    .content-msg {
    }
  }
}
</style>
