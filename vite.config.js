import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin({})
  ],
  server: {
    open: true
  },
  optimizeDeps: {
    include: ['vue']
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'button' 
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})



