import { defineConfig } from 'electron-vite'
import * as path from 'path'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/utils', 'puppeteer'],
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/preload/index.js'),
        },
      },
    },
  },
})
