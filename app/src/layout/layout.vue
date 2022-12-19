<template>
  <div class="layout_wrapper">
    <!-- main menu (in right) -->
    <sider-menu class="sider-menu_body"></sider-menu>
    <div class="main-container">
      <!-- main header -->
      <main-header class="main-header_body"></main-header>
      <!-- main content (in left, this is route view) -->
      <main-content class="main-content_body" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import siderMenu from './sider-menu/index.vue'
import mainHeader from './main-header/index.vue'
import mainContent from './main-content/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    siderMenu,
    mainHeader,
    mainContent
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.layout_wrapper {
  width: inherit;
  height: inherit;
  display: flex;
  position: relative;
}

.sider-menu_body {
  height: 100%;
  max-width: 256px;
}

.main-container {
  width: 100%;
  height: 100%;
  .main-header_body {
    height: 60px;
    background-color: #eaeaea;
  }

  .main-content_body {
    height: calc(100vh - 70px);
    margin: 10px 20px 0;
  }
}
</style>
