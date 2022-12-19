<template>
  <router-view :key="key"> </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainContent',
  computed: {
    key() {
      const router = useRouter()
      return router.currentRoute.value.path
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
