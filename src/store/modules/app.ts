/*
 * @Author: hhf 2251448458@qq.com
 * @Date: 2024-04-21 16:43:20
 * @Description: app相关持久化数据
 */

import { defineStore } from 'pinia'
import User from '../../class/User'
import Msg from '../../class/Msg'


interface RoomInfo {
    roomId:String,
    roomNo:String,
    roomName:String
}

interface AppState {
    isMobile:boolean,
    websocketStatus:boolean,
    userInfo:User,
    roomInfo:RoomInfo,
    msgList:Msg[]
}


const useAppStore = defineStore('app', {
    state: ():AppState => ({
        isMobile:false,
        websocketStatus:false,
        userInfo:{
            userId:'',
            userName:'',
            userAvatar:''
        },
        roomInfo:{
            roomId:'',
            roomNo:'',
            roomName:''
        },
        msgList:[]
    }),
    getters: {
        mobile: (state) => state.isMobile,
    },
    actions: {
        setIsMobile(mobile:boolean) {
            this.isMobile = mobile
        },
        setUserInfo(userInfo:User) {
            this.userInfo = userInfo
        },
        setRoomInfo(roomInfo:RoomInfo) {
            this.roomInfo = roomInfo
        },
        setWebsocketStatus(status:boolean) {
            this.websocketStatus = status
        },
        sendInfoLocalFun(msg:Msg){
            this.msgList.push(msg)
        },
        resetAllInfo(){
            this.roomInfo = {
                roomId:'',
                roomNo:'',
                roomName:''
            }
            this.userInfo = {
                userId:'',
                userName:'',
                userAvatar:''
            }
            this.msgList = []
        }
    },
    persist: {
        paths:['userInfo','roomInfo']
    },
})

export default useAppStore
