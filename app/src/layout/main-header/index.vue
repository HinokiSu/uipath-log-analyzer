<template>
  <div>
    <a-button class="menu-collapse_btn" type="text" @click="toggleCollapsed">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </a-button>
  </div>
</template>

<script lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { useMenuStore } from '@stores/menu-store'
export default defineComponent({
  name: 'MainHeader',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup() {
    const menuStore = useMenuStore()
    const collapsed = menuStore.collapsed

    const toggleCollapsed = () => {
      menuStore.changeCollapsed()
    }

    return { collapsed, toggleCollapsed }
  }
})
</script>

<style lang="less" scoped>
.menu-collapse_btn {
    height: 100%;
    background-color: #fff;
}
</style>
