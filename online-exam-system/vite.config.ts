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
      enable: true, // ✅ 确保本地开发环境启用 Mock
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
}))
