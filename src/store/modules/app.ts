/*
 * @Author: hhf 2251448458@qq.com
 * @Date: 2024-04-21 16:43:20
 * @Description: app相关持久化数据
 */

import { defineStore } from 'pinia'
import User from '../../class/User'
import Msg from '../../class/Msg'
import MsgStatusEnum from '../../enums/MsgStatusEnum'
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import CustomSnowflake from "@/utils/CustomSnowflake"
import MsgTypeEnum from "@/enums/MsgTypeEnum"

interface RoomInfo {
    roomId:String,
    roomNo:String,
    roomName:String
}

interface AppState {
    isMobile:boolean,
    // 主题
    theme:string,
    // websocket状态
    websocketStatus:boolean,
    // 用户信息
    userInfo:User,
    // 房间信息
    roomInfo:RoomInfo,
    // 消息列表
    msgList:Msg[],
    // 消息状态定时器
    msgStatusTimer:Object
}

const epoch = +new Date();
const customSnowflake = new CustomSnowflake(1,epoch);


const useAppStore = defineStore('app', {
    state: ():AppState => ({
        isMobile:false,
        theme:"light",
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
        msgList:[],
        msgStatusTimer:{}
    }),
    getters: {
        mobile: (state) => state.isMobile,
    },
    actions: {
        setIsMobile(mobile:boolean) {
            this.isMobile = mobile
        },
        setTheme(theme:string) {
            this.theme = theme
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
        sendInfo(msg:string,msgType:MsgTypeEnum){
            const msgId = customSnowflake.nextId();
            const msgInfo:Msg = {
                user:{
                    userId:this.userInfo.userId,
                    userAvatar:this.userInfo.userAvatar,
                    userName:this.userInfo.userName,
                },
                roomId:this.roomInfo.roomId,
                msgId:msgId,
                msgType:msgType,
                msg:msg,
                msgStatus:MsgStatusEnum.PENDING
            }
            this.sendInfoLocalFun(msgInfo)
            this.sendInfoNetWorkFun(msgInfo)
        },
        sendInfoLocalFun(msg:Msg){
            this.msgList.push(msg)
            // 10s消息未发送成功，则设置消息为发送失败状态
            this.msgStatusTimer[msg.msgId] = setTimeout(()=>{
                msg.msgStatus = MsgStatusEnum.REJECTED
                for(let i = this.msgList.length - 1;i>=0;i++){
                    if(this.msgList[i].msgId === msg.msgId){
                        const newMsg = {...msg};
                        newMsg.msgStatus = MsgStatusEnum.REJECTED;
                        this.msgList.splice(i,1,newMsg)
                        break; 
                    }
                }
            },10000)
        },
        sendInfoNetWorkFun(msg:Msg){
            let sendMsg = new AQChatMSg.default.SendMsgCmd();
            sendMsg.setMsgid(msg.msgId);
            sendMsg.setMsgtype(msg.msgType);
            sendMsg.setMsg(msg.msg)
            sendMsg.setRoomid(this.roomInfo.roomId);
            AQSender.getInstance().sendMsg(
                AQChatMSg.default.MsgCommand.SEND_MSG_CMD,sendMsg
            )
        },
        clearMsgStatusTimer(id:string){
            if(this.msgStatusTimer[id]){
                clearTimeout(this.msgStatusTimer[id]);
                delete this.msgStatusTimer[id]
            }
        },
        setMsgRecord(msg:Msg){
            this.msgList.unshift(msg)
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
        paths:['theme','userInfo','roomInfo']
    },
})

export default useAppStore
