<template>
  <div class="layout_wrapper">
    <!-- main menu (in right) -->
    <sider-menu class="sider-menu_body"></sider-menu>
    <div class="main-container" :class="{ collapsed: isCollapsed }">
      <!-- main header -->
      <main-header class="main-header_body"></main-header>
      <!-- main content (in left, this is route view) -->
      <main-content class="main-content_body" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import siderMenu from './sider-menu/index.vue'
import mainHeader from './main-header/index.vue'
import mainContent from './main-content/index.vue'
import { useMenuStore } from '@/stores/menu-store'
export default defineComponent({
  name: 'Layout',
  components: {
    siderMenu,
    mainHeader,
    mainContent
  },
  setup() {
    const menuStore = useMenuStore()
    const isCollapsed = computed(() => menuStore.collapsed)

    return { isCollapsed }
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
  max-width: 200px;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.main-container {
  width: 100%;
  height: 100%;
  margin-left: 200px;
  overflow: auto;
  &.collapsed {
    margin-left: 80px;

    .main-header_body {
      width: calc(100vw - 80px);
    }
  }
  .main-header_body {
    width: calc(100vw - 200px);
    height: 60px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;

    position: fixed;
    z-index: 800;
    top: 0px;
    color: rgb(255, 255, 255);
  }

  .main-content_body {
    // height: calc(100vh - 70px);
    margin-top: 60px;
    padding-top: 30px;
    padding-left: 8px;
  }
}
</style>
