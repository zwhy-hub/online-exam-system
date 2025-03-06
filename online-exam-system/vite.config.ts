import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    viteMockServe({
      enable: true,
      mockPath: 'mock',
      logger: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/bem.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        //代理所有以 `/api` 开头的请求
        target: 'http://localhost:8080', // 后端地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}))
