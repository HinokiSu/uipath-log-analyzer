<template>
  <a-card class="ula-card" :class="classes" :style="styles">
    <slot></slot>
  </a-card>
</template>

<script lang="ts">
import inlineStyles from '@/hooks/inline-styles'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UlaCard',
  props: {
    classes: {
      type: String
    },
    radius: {
      type: String,
      default: '20px'
    }
  },
  setup(props) {
    const styles = ref('')
    const propsVal = computed(() => props)

    styles.value = inlineStyles({
      'border-radius': propsVal.value.radius
    })
    return {
      styles
    }
  }
})
</script>

<style lang="less" scoped>
.ula-card {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;

  padding: 14px;
  margin: 15px;
  box-shadow: rgba(90, 114, 123, 0.11) 0px 7px 30px 0px;
}
</style>
