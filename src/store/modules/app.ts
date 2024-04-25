/*
 * @Author: hhf 2251448458@qq.com
 * @Date: 2024-04-21 16:43:20
 * @Description: app相关持久化数据
 */

import { defineStore } from 'pinia'
interface UserInfo {
    userId:String,
    userName:String,
    userAvatar:String
}

interface AppState {
    isMobile:boolean,
    userInfo:UserInfo
}


const useAppStore = defineStore('app', {
    state: ():AppState => ({
        isMobile:false,
        userInfo:{
            userId:'',
            userName:'',
            userAvatar:''
        }
    }),
    getters: {
        mobile: (state) => state.isMobile,
    },
    actions: {
        setIsMobile(mobile:boolean) {
            this.isMobile = mobile
        },
        setUserInfo(userInfo:UserInfo) {
            this.userInfo = userInfo
        },
    },
    persist: true,
})

export default useAppStore
