import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app"
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
        console.log(result);
        
        switch(msgCommand){
          case AQChatMSg.default.MsgCommand.USER_LOGIN_ACK:
            loginFun(result)
            break;
        }
      }
    })
  }

  // 登录
  const loginFun = (result:any)=>{
    appStore.setUserInfo(result)
    router.push({
      name:"IM"
    })
  }

  return {
    initSocketFun
  }
}