import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pluginExposeRenderer } from './vite.base.config'
import path from 'path'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          worker: path.resolve(__dirname, 'public/pdf.worker.min.mjs'),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },
    },
    plugins: [react(), pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      alias: {
        src: '/src',
      },
    },
    clearScreen: false,
  } as UserConfig
})
