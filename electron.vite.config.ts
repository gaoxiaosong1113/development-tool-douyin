import { defineConfig } from 'electron-vite'
import * as path from 'path'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main',
      rollupOptions: {
        external: ['@electron-toolkit/utils', 'puppeteer'],
      },
    },
    publicDir: 'electron-public',
  },
  preload: {
    build: {
      outDir: 'dist/preload',
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/preload/index.js'),
        },
      },
    },
    publicDir: 'electron-public',
  },
})
