<template>
  <component :is="name" :style="style" :class="className" />
</template>

<script lang="ts">
import { DotChartOutlined, FolderOutlined, FileTextOutlined,CodeOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
// refer: https://github.com/ant-design/ant-design/issues/20668
export default defineComponent({
  name: 'MenuIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => ({
        fontSize: '20px'
      })
    }
  },
  components: {
    DotChartOutlined,
    FolderOutlined,
    FileTextOutlined,
    CodeOutlined
  }
})
</script>
