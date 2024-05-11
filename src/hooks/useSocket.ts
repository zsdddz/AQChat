/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:00:36
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-11 14:58:42
 * @Description: websocket消息处理
 */
import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import ExceptionEnum from "../enums/ExceptionEnum"
import Msg from "../class/Msg"
import MsgTypeEnum from "../enums/MsgTypeEnum"
export default ()=>{
  const router = useRouter();
  const appStore = useAppStore()
  
  // 初始化websocket
  const initSocketFun = ()=>{
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");
      appStore.setWebsocketStatus(true);

      if(appStore.userInfo?.userId){
        const { userId,userName,userAvatar } = appStore.userInfo
        const msgArray = [userId,userName,userAvatar]
        if(appStore.roomInfo?.roomId){
          msgArray.push(appStore.roomInfo.roomId)
        }
        AQSender.getInstance().sendMsg(
          AQChatMSg.default.MsgCommand.RECOVER_USER_CMD,
          new AQChatMSg.default.RecoverUserCmd(msgArray)
        )
      }

      let handlerFactory = AQMsgHandlerFactory.getInstance();
      // 消息回调
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        const result = handlerFactory.handle(msgCommand,msgBody);
        // console.log("result：",result);
        
        switch(msgCommand){
          // 登录回调
          case AQChatMSg.default.MsgCommand.USER_LOGIN_ACK:
            loginFun(result);
            break;
          // 创建房间回调
          case AQChatMSg.default.MsgCommand.CREATE_ROOM_ACK:
            appStore.setRoomInfo(result);
            break;
          // 加入房间回调
          case AQChatMSg.default.MsgCommand.JOIN_ROOM_ACK:
            appStore.setRoomInfo(result);
            break;
          // 恢复用户连接
          case AQChatMSg.default.MsgCommand.RECOVER_USER_ACK:
            recoverUserFun(result);
            break;
          // 加入房间通知
          case AQChatMSg.default.MsgCommand.JOIN_ROOM_NOTIFY:
            joinRoomNotifyFun(result);
            break;
          // 接收广播消息
          case AQChatMSg.default.MsgCommand.BROADCAST_MSG_ACK:
            broadcastMsgFun(result);
            break;
          // 用户退出登录
          case AQChatMSg.default.MsgCommand.USER_LOGOUT_ACK:
            userLogoutFun(result);
            break;
          // 消息同步
          case AQChatMSg.default.MsgCommand.SYNC_CHAT_RECORD_ACK:
            syncChatRecordFun(result);
            break;
          // 消息发送状态
          case AQChatMSg.default.MsgCommand.SEND_MSG_ACK:
            sendMsgStatusFun(result);
            break;
          // 异常消息回调
          case AQChatMSg.default.MsgCommand.EXCEPTION_MSG:
            exceptionFun(result);
            break;
        }
      }
    })
  }

  // 消息发送状态
  const sendMsgStatusFun = (result) =>{
    console.log("消息发送状态:",result);
    console.log(appStore.msgList);
    
    for(let i = appStore.msgList.length-1;i>=0;i--){
      if(appStore.msgList[i].msgId == result.msgId){
        appStore.msgList[i].msgStatus = true;
        console.log("修改消息状态");
        
      }
    }
    console.log(appStore.msgList);
  }
  
  // 消息同步
  const syncChatRecordFun = (result) =>{
    for(let i = 0;i<result.length;i++){
      const msg:Msg = result[i]
      appStore.setMsgRecord(msg)
    }
  }

  // 用户退出登录
  const userLogoutFun = (result) =>{
    if(result?.userId === appStore.userInfo.userId){
      appStore.resetAllInfo();
      router.replace({
        name:'Index'
      })
    }
  }

  // 接收广播消息
  const broadcastMsgFun = (result) =>{
    // console.log("接收广播消息",result);
    
    if(result.userId === appStore.userInfo.userId) return;
    const msg:Msg = {
      user:{
        userId:result.userId,
        userAvatar:result.userAvatar,
        userName:result.userName,
      },
      roomId:result.roomId,
      msgType:result.msgType,
      msg:result.msg,
      msgId:result.msgId
    }
    appStore.sendInfoLocalFun(msg)
  }

  // 其他人加入房间通知
  const joinRoomNotifyFun = (result) =>{
    console.log('其他人加入房间通知',result);
    
    if(appStore.roomInfo.roomId === result.roomId){
      if(!(result?.user?.array?.length > 0)) return;
      const msgContent = result.user.array[0] === appStore.userInfo.userId ? '您' : result.user.array[1];
      const msg:Msg = {
        roomId:result.roomId,
        msgType:MsgTypeEnum.TIP,
        msg:`${msgContent} 加入了房间`
      }
      appStore.sendInfoLocalFun(msg)
    }
  }
  // 恢复用户登录
  const recoverUserFun = (result)=>{
    console.log("恢复用户登录",result);
    
    if(!result?.roomId){
      appStore.setRoomInfo({
        roomId:'',
        roomNo:'',
        roomName:''
      })
    }
  }
  // 用户登录
  const loginFun = (result)=>{
    appStore.setUserInfo(result)
    router.push({
      name:"IM"
    })
  }
  // 消息异常
  const exceptionFun = (result)=>{
    ElMessage.warning(result.msg)
    if(result.code === ExceptionEnum.NO_LOGIN || result.code === ExceptionEnum.USER_QUIT || result.code === ExceptionEnum.USER_MISMATCH){
      appStore.resetAllInfo();
      AQSender.getInstance().heartbeatStop();
      router.push({
        name:'Index'
      })
    }
  }

  return {
    initSocketFun
  }
}