/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 19:11:43
 * @Description: 
 */

import { createApp } from 'vue'
import App from "./App.vue"
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'


// css
import 'element-plus/dist/index.css'
import './assets/style/variables.less'
import "./assets/style/common.less"
import "viewerjs/dist/viewer.css";

createApp(App)
.use(router)
.use(ElementPlus)
.use(store)
.mount('#app')
