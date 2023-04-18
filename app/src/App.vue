<script setup lang="ts">
import { computed, provide, ref, watch, watchEffect } from 'vue'
import * as echarts from 'echarts/core'
import layout from './layout/layout.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useLangStore } from './stores/lang-store'

const langStore = useLangStore()

// global inject echarts
provide('echarts', echarts)
const locale = ref(enUS)
watch(
  () => langStore.language,
  (newVal, oldVal) => {
    if (newVal === 'zh') {
      locale.value = zhCN
      dayjs.locale('zh-cn')
    } else {
      locale.value = enUS
      dayjs.locale('en-us')
    }
  },
  {
    immediate: true
  }
)
</script>
<template>
  <a-config-provider :locale="locale">
    <layout></layout>
  </a-config-provider>
</template>

<style scoped></style>
