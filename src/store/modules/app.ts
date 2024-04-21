/*
 * @Author: hhf 2251448458@qq.com
 * @Date: 2024-04-21 16:43:20
 * @Description: app相关持久化数据
 */

import { defineStore } from 'pinia'


const appStore = defineStore('app', {
    state: () => {
        return {
            isMobile: false
        }
    },
    getters: {
        mobile: (state) => state.isMobile,
    },
    actions: {
        initIsMobile(mobile) {
            this.isMobile = mobile
        },
    },
    // 
    persist: true,
})

export default appStore
