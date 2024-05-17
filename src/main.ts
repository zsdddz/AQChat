/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-17 14:20:22
 * @Description: 
 */

import { createApp } from 'vue'
import App from "./App.vue"
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// css
import 'element-plus/dist/index.css'
import './assets/style/variables.less'
import "./assets/style/common.less"
import "./assets/icon/iconfont.css"
// import "viewerjs/dist/viewer.css";

const options = {
  defaultOptions: {
    zIndex: 99999,
    'title': false, 'toolbar': false,
  }
}

createApp(App)
.use(router)
.use(ElementPlus)
.use(store)
.use(VueViewer,options)
.mount('#app')
