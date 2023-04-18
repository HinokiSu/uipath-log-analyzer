<template>
  <div class="lang-select">
    <div class="lang-button" @click="changeLang">
      {{ language === 'zh' ? '中文' : 'EN' }}
    </div>
  </div>
</template>

<script lang="ts">
import { useLangStore } from '@/stores/lang-store'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LangSelect',
  setup() {
    const lanStore = useLangStore()
    const language = computed(() => lanStore.getLanguage)

    const i18n = useI18n()
    const changeLang = () => {
      if (language.value === 'zh') {
        i18n.locale.value = 'en'
        lanStore.setLanguage('en')
      } else {
        i18n.locale.value = 'zh'
        lanStore.setLanguage('zh')
      }
    }
    return { language, changeLang }
  }
})
</script>

<style lang="less" scoped>
.lang-select {
  width: 50px;
  text-align: center;

  .lang-button {
    margin-right: 8px;
    padding: 2px 0px;
    color: #777;
    cursor: pointer;
    border: 1px solid #eaeaea;
    border-radius: 6px;

    &:hover {
      color: #222;
      border-color: #666;
    }
  }
}
</style>
