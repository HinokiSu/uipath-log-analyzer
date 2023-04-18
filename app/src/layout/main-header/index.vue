<template>
  <div class="layout-header__wrapper">
    <a-button class="menu-collapse_btn" type="text" @click="toggleCollapsed">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </a-button>
    <div class="right-tools">
      <real-time-clock class="clock"></real-time-clock>

      <lang-select></lang-select>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent } from 'vue'
import { useMenuStore } from '@stores/menu-store'
import RealTimeClock from '@components/clock/index.vue'
import LangSelect from '@/components/lang-select/lang-select.vue'
export default defineComponent({
  name: 'MainHeader',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RealTimeClock,
    LangSelect
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .clock {
      padding-right: 24px;
    }
  }
}
.menu-collapse_btn {
  height: 100%;
  background-color: #fff;
}
</style>
