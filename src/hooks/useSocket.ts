import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default ()=>{
  const router = useRouter();
  const appStore = useAppStore()
  
  // 初始化websocket
  const initSocketFun = ()=>{
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");
      appStore.setWebsocketStatus(true);
      let handlerFactory = AQMsgHandlerFactory.getInstance();
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        const result = handlerFactory.handle(msgCommand,msgBody);
        console.log("result：",result);
        
        switch(msgCommand){
          case AQChatMSg.default.MsgCommand.USER_LOGIN_ACK:
            appStore.setUserInfo(result)
            router.push({
              name:"IM"
            })
            break;
          case AQChatMSg.default.MsgCommand.CREATE_ROOM_ACK:
            console.log("创建成功");
            appStore.setRoomInfo(result)
            break;
          case AQChatMSg.default.MsgCommand.EXCEPTION_MSG:
            ElMessage.warning(result.msg)
            break;
        }
      }
    })
  }

  return {
    initSocketFun
  }
}