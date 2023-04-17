import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// pinia
import { createPinia } from 'pinia'
// router
import router from '@routes/index'
// ant-design-vue manual import
import { installI18n } from './locales/index'

// echart
import * as echarts from 'echarts/core'
import { Charts } from './plugins/echarts'

// antd-vue
import 'ant-design-vue/es/message/style/css'
import { useLangStore } from './stores/lang-store'

// vue app
const app = createApp(App)

// ant-design-vue
// AntdUIRegister(app)

echarts.use(Charts)
app.use(router)
app.use(createPinia())
const i18n = installI18n(app)
app.mount('#app')
// const langStore = useLangStore()
/* langStore.$subscribe((_, state) => {
  console.info(state)
  i18n.global.locale = state.locale
}) */
