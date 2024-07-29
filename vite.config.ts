import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
// @ts-ignore

export default defineConfig({
  plugins: [
    solid(),
  ],

  resolve: {
    alias: {
      '@': '/src'
    }
  },

  server: { port: 8888 }
})
