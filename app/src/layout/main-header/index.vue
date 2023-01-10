<template>
  <div class="layout-header__wrapper">
    <a-button class="menu-collapse_btn" type="text" @click="toggleCollapsed">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </a-button>
  </div>
</template>

<script lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent } from 'vue'
import { useMenuStore } from '@stores/menu-store'
export default defineComponent({
  name: 'MainHeader',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup() {
    const menuStore = useMenuStore()
    const collapsed = computed(() => menuStore.collapsed)

    const toggleCollapsed = () => {
      menuStore.changeCollapsed()
    }

    return { collapsed, toggleCollapsed }
  }
})
</script>

<style lang="less" scoped>
.layout-header__wrapper {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 100%;
  

}
.menu-collapse_btn {
  height: 100%;
  background-color: #fff;
}
</style>
