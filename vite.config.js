/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 18:32:45
 * @Description: 
 */
import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  root: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  assetsInclude: ["./src/assets"],
  plugins: [vue()],
})
