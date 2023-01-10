import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// pinia
import { createPinia } from 'pinia'
// router
import router from '@routes/index'
// ant-design-vue manual import
// import { AntdUIRegister } from '@utils/antd-vue'

// pinia
const pinia = createPinia()

// echart
import * as echarts from 'echarts/core'
import { Charts } from './plugins/echarts'

// antd-vue
import 'ant-design-vue/es/message/style/css';

// vue app
const app = createApp(App)

// ant-design-vue
// AntdUIRegister(app)

app.use(router)
app.use(pinia)
echarts.use(Charts)
app.mount('#app')
