import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import Components from 'unplugin-vue-components/vite'
import ViteComponents, { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://api.cpengx.cn/metashop/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
})
