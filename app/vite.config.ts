import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// modular import plugin
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // ant-design-vue 
      resolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: [
      { find: '@views', replacement: resolve(__dirname, 'src/views') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@routes', replacement: resolve(__dirname, 'src/routes') },
      { find: '@stores', replacement: resolve(__dirname, 'src/stores') },
      { find: '@interface', replacement: resolve(__dirname, 'src/interface') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@plugin', replacement: resolve(__dirname, 'src/plugin') },
      { find: '@api', replacement: resolve(__dirname, 'src/api') }
    ]
  }
})
