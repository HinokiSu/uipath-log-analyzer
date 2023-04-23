import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// modular import plugin
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
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
      }),
      compression(),
      visualizer({
        filename: 'stats.html'
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
    build: {
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            echarts: ['echarts']
          }
        },
       
      }
    },

    // config proxy
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4302',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
