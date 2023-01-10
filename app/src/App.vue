<script setup lang="ts">
import { provide } from 'vue'
import * as echarts from 'echarts/core'
import layout from './layout/layout.vue'
provide('echarts', echarts)
</script>
<template>
  <layout></layout>
</template>

<style scoped></style>
