<template>
  <!-- menu item -->
  <a-menu-item :key="menuItem.key" v-if="!menuItem.children">
    <template #icon>
      <menu-icon :name="menuItem.icon"></menu-icon>
    </template>
    <span>{{ menuItem.title }}</span>
  </a-menu-item>
  <!-- Menu has sub menu item -->
  <template v-else>
    <a-sub-menu :key="menuItem.key">
      <template #icon>
        <menu-icon :name="menuItem.icon" />
      </template>
      <template #title>{{ menuItem.title }}</template>
      <!-- sub menus -->
      <div v-for="item in menuItem.children" :key="item.key">
        <a-menu-item :key="item.key">
          <template #icon v-if="item.icon">
            <menu-icon :name="item.icon" />
          </template>
          {{ item.title }}
        </a-menu-item>
      </div>
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent, h, PropType, Ref, ref } from 'vue'
import { MenuItemType } from '@interface/menu'
import MenuIcon from './menu-icon.vue'
export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: Object as PropType<MenuItemType>
  },
  components: {
    MenuIcon
  },

  setup(props) {
    const menuItem = ref(props.menuItem) as Ref<MenuItemType>

    return {
      menuItem
    }
  }
})
</script>

<style scoped></style>
