import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// modular import plugin
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: '/',
    plugins: [
      vue(),
      Components({
        // ant-design-vue
        resolvers: [AntDesignVueResolver()]
      })
    ],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src/') },
        { find: '@views', replacement: resolve(__dirname, 'src/views') },
        { find: '@components', replacement: resolve(__dirname, 'src/components') },
        { find: '@routes', replacement: resolve(__dirname, 'src/routes') },
        { find: '@stores', replacement: resolve(__dirname, 'src/stores') },
        { find: '@interface', replacement: resolve(__dirname, 'src/interface') },
        { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
        { find: '@api', replacement: resolve(__dirname, 'src/api') }
      ]
    },
    // config proxy
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4201',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
