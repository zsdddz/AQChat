/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:00:36
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-02 13:50:55
 * @Description: 
 */
import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import ExceptionEnum from "../enums/exception"
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
        console.log("===含有用户信息===",appStore.userInfo);
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
        console.log("result：",result);
        
        switch(msgCommand){
          // 登录回调
          case AQChatMSg.default.MsgCommand.USER_LOGIN_ACK:
            loginFun(result);
            break;
          // 创建房间回调
          case AQChatMSg.default.MsgCommand.CREATE_ROOM_ACK:
            appStore.setRoomInfo(result)
            break;
          // 恢复用户连接
          case AQChatMSg.default.MsgCommand.RECOVER_USER_ACK:
            recoverUser(result)
            break;
          // 异常消息回调
          case AQChatMSg.default.MsgCommand.EXCEPTION_MSG:
            exceptionFun(result)
            break;
        }
      }
    })
  }

  // 恢复用户登录
  const recoverUser = (result)=>{
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