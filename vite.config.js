/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-14 22:17:19
 * @Description: 
 */
import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// 时间戳
const timestamp = new Date().getTime();
export default defineConfig({
  base: "./",
  root: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  assetsInclude: ["./src/assets"],
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: ({ name }) => {
          if (name === 'vendor') {
            return `assets/js/[name]-[hash].js`; // 第三方库不添加时间戳
          } else {
            return `assets/js/[name]-[hash]-${timestamp}.js`; // 自定义文件名，使用时间戳保证唯一性
          }
        },
        entryFileNames: ({ name }) => {
          if (name === 'vendor') {
            return `assets/js/[name]-[hash].js`; // 第三方库不添加时间戳
          } else {
            return `assets/js/[name]-[hash]-${timestamp}.js`; // 自定义文件名，使用时间戳保证唯一性
          }
        },
        assetFileNames: `assets/[ext]/[name]-[hash]-${timestamp}.[ext]` // 资源文件添加时间戳
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/common.less";`,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/assets/style/variables.less"
          )}";`,
        },
      },
    },
  },
})
