import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/testovoeThreeJs/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 