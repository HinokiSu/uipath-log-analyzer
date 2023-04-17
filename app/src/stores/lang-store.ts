import { LANG } from '@/constant'
import { defineStore } from 'pinia'

type TState = {
  language: string
}
export const useLangStore = defineStore('LangStore', {
  state: (): TState => ({
    language: localStorage.getItem(LANG) || 'zh'
  }),
  getters: {
    getLanguage: (state) => state.language
  },
  actions: {
    setLanguage(lang: string) {
      localStorage.setItem(LANG, lang)
      // update language
      this.language = lang
    },
    getCurrentLanguage() {
      return this.language 
    }
  }
})
