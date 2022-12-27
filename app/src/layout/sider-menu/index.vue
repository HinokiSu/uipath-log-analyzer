<template>
  <div class="sider-menu_wrapper" :style="'width:' + menuWidth">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="handleClick"
    >
      <template v-for="item in menuListRef" :key="item.key">
        <menu-item :menu-item="item"></menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, toRefs, watch } from 'vue'
import MenuItem from '@components/menu/menu-item.vue'
import { useMenuStore } from '@stores/menu-store'
import type { MenuProps } from 'ant-design-vue'
import router from '@routes/index'
export default defineComponent({
  name: 'SiderMenu',
  components: {
    MenuItem
  },

  setup() {
    const menuStore = useMenuStore()

    const state = computed(() => menuStore.$state)

    onMounted(() => {
      state.value.selectedKeys = menuStore.getSelectedKeys
    })

    onBeforeUnmount(() => {})

    watch(
      () => state.value.selectedKeys,
      (newVal) => {
        menuStore.updateSelectedKeys(newVal)
      }
    )

    watch(
      () => state.value.collapsed,
      (_val) => {
        if (_val) {
          menuStore.changeMenuWidth('80px')
        } else {
          menuStore.changeMenuWidth('240px')
        }
      }
    )

    onMounted(() => {
      menuStore.getMenuList()
    })

    const menuListRef = computed(() => menuStore.menuList)
    // go path(use route name)
    const handleClick: MenuProps['onClick'] = (menuInfo) => {
      const curKey = menuInfo.key as string
      console.log(curKey)
      menuListRef.value.forEach((item) => {
        // has children
        if (item.children) {
          item.children.forEach((child) => {
            if (child.key === curKey) {
              router.push({ path: child.path as string })
            }
          })
        } else {
          if (item.key === curKey) {
            router.push({ path: item.path as string })
          }
        }
      })
    }

    return {
      ...toRefs(state.value),
      menuListRef,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.sider-menu_wrapper {
  background-color: var(--menu-background-color);

  .menu-collapse_btn {
    margin: 0 auto;
    width: 100px;

    font-size: 16px;
  }
}
</style>
