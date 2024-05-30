/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:00:36
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-24 16:42:53
 * @Description: websocket消息处理
 */
import AQSender from '@/message/AQSender'
import AQMsgHandlerFactory from '@/message/msghandler/AQMsgHandlerFactory'
import CallbackMethodManager from '@/message/CallbackMethodManager';
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app"
import { ElMessage,ElMessageBox,ElLoading } from 'element-plus'
import { useRouter,useRoute } from 'vue-router'
import ExceptionEnum from "../enums/ExceptionEnum"
import MsgStatusEnum from "../enums/MsgStatusEnum"
import Msg from "../class/Msg"
import MsgTypeEnum from "../enums/MsgTypeEnum"
import { ref } from 'vue'

export default ()=>{

  const appStore = useAppStore()
  const router = useRouter();
  const route = useRoute();
  const showTip = ref(false)
  let loading:any = null
  
  // 初始化websocket
  const initSocketFun = ()=>{
    if(route.name === 'IM' && appStore.userInfo.userId){
      loading = ElLoading.service({
        lock: true,
        text: '恢复用户登录...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }else{
      loading && loading.close();
    }
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");
      appStore.setWebsocketStatus(true);

      if(appStore.userInfo?.userId){
        if(route.name === 'IM'){
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
      }

      let handlerFactory = AQMsgHandlerFactory.getInstance();
      // 消息回调
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        const result = handlerFactory.handle(msgCommand,msgBody);
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
          // 同步房间成员
          case AQChatMSg.default.MsgCommand.SYNC_ROOM_MEMBERS_ACK:
            syncRoomMembersFun(result);
            break;
          // 消息发送状态
          case AQChatMSg.default.MsgCommand.SEND_MSG_ACK:
            sendMsgStatusFun(result);
            break;
          case AQChatMSg.default.MsgCommand.GET_STS_ACK:
            uploadFileFun(msgCommand,result)
            break;
          // 房间成员离线
          case AQChatMSg.default.MsgCommand.OFFLINE_NOTIFY:
            offlineNotyfyFun(result)
            break;
          // 当前用户离线
          case AQChatMSg.default.MsgCommand.OFFLINE_MSG:
            userOfflineFun(result)
            break;
          // 离线通知
          case AQChatMSg.default.MsgCommand.LEAVE_ROOM_NOTIFY:
            leaveRoomNotufyFun(result)
            break;
          // 异常消息回调
          case AQChatMSg.default.MsgCommand.EXCEPTION_MSG:
            exceptionFun(result);
            break;
        }
      }
      
    })
    AQSender.getInstance().closeService = ()=>{
      if(route.name === 'IM'){
        ElMessageBox.confirm("服务已关闭，是否重新登录", "系统提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning",
        }).then(res=>{
          router.replace({
            name:'Index'
          })
          appStore.resetAllInfo();
        })
      }else{
        // ElMessage.error("websocket初始化失败，请稍后再试")
        // appStore.resetAllInfo();
      }
      appStore.setWebsocketStatus(false);
      AQSender.getInstance().heartbeatStop();
      loading && loading.close();
    }
  }

  // 房间成员离线
  const offlineNotyfyFun = (result:any) =>{
    console.log("房间成员离线",result);
    if(appStore.roomInfo.roomId === result.roomId){
      const msg:Msg = {
        roomId:result.roomId,
        msgType:MsgTypeEnum.TIP,
        msg:`${result.user.userName} 已离线`
      }
      appStore.sendInfoLocalFun(msg)
      appStore.deleteNumberList(result.user)
    }
  }
  // 房间成员同步
  const syncRoomMembersFun = (result:any) =>{
    appStore.memberList = result;
  }
  // 当前用户离线
  const userOfflineFun = (result:any) =>{
    console.log("当前用户离线",result);
    if(result.userId === appStore.userInfo.userId){
      if(showTip.value) return;
      showTip.value = true;
      ElMessageBox.confirm("检测到您长时间置于后台，可能会影响消息实时性", "系统提示", {
        confirmButtonText: '刷新试试',
        cancelButtonText: '不管',
        type: "warning",
      }).then(res=>{
        showTip.value = false;
        window.location.reload();
      }).finally(()=>{
      })
    }
  }
  // 离开房间
  const leaveRoomNotufyFun = (result:any) =>{
    console.log("离开房间",result);
    if(appStore.roomInfo.roomId === result.roomId){
      const msg:Msg = {
        roomId:result.roomId,
        msgType:MsgTypeEnum.TIP,
        msg:`${result.user.userName} 离开了房间`
      }
      appStore.sendInfoLocalFun(msg)
      appStore.deleteNumberList(result.user)
    }
  }
  // 上传文件
  const uploadFileFun = (msgCommand,file) =>{
    let callbackMethod = CallbackMethodManager.getCallback(msgCommand);
    //执行回调函数
    if (callbackMethod) {
      callbackMethod(file);
      CallbackMethodManager.getCallback(10100)();
    }
  }
  // 消息发送状态修改
  const sendMsgStatusFun = (result:any) =>{
    console.log("消息发送状态修改",result);
    for(let i = appStore.msgList.length-1;i>=0;i--){
      if(appStore.msgList[i].msgId == result.msgId){
        appStore.msgList[i].msgStatus = MsgStatusEnum.FULFILLED;
        appStore.clearMsgStatusTimer(result.msgId)
      }
    }
  }
  // 消息同步
  const syncChatRecordFun = (result:any) =>{
    console.log("消息同步",result);
    for(let i = 0;i<result.length;i++){
      const msg:Msg = result[i]
      appStore.setMsgRecord(msg)
    }
  }
  // 用户退出登录
  const userLogoutFun = (result:any) =>{
    if(result?.userId === appStore.userInfo.userId){
      appStore.resetAllInfo();
      router.replace({
        name:'Index'
      })
    }
  }
  // 接收广播消息
  const broadcastMsgFun = (result:any) =>{
    console.log("接收广播消息",result);
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
      msgId:result.msgId,
      ext:result.ext
    }
    appStore.sendInfoLocalFun(msg)
    if(appStore.soundActive){
      appStore.soundDom && appStore.soundDom.play();
    }
  }
  // 其他人加入房间通知
  const joinRoomNotifyFun = (result:any) =>{
    // console.log('其他人加入房间通知',result);
    if(appStore.roomInfo.roomId === result.roomId){
      if(!(result?.user?.userId)) return;
      const msgContent = result.user.userId === appStore.userInfo.userId ? '您' : result.user.userName;
      const msg:Msg = {
        roomId:result.roomId,
        msgType:MsgTypeEnum.TIP,
        msg:`${msgContent} 加入了房间`
      }
      appStore.sendInfoLocalFun(msg)
      // 同步房间用户
      let model = new AQChatMSg.default.SyncRoomMembersCmd();
      model.setRoomid(result.roomId)
      AQSender.getInstance().sendMsg(
        AQChatMSg.default.MsgCommand.SYNC_ROOM_MEMBERS_CMD,model
      )
    }
  }
  // 恢复用户登录
  const recoverUserFun = (result:any)=>{
    console.log('恢复用户登录');
    loading && loading.close();
    appStore.setRoomInfo({
      roomId:result.roomId || '',
      roomNo:result.roomNo || '',
      roomName:result.roomName || ''
    })
  }
  // 用户登录
  const loginFun = (result:any)=>{
    appStore.setUserInfo(result)
    router.push({
      name:"IM"
    })
  }
  // 消息异常
  const exceptionFun = (result:any)=>{
    console.log("消息异常",result);
    ElMessage.warning(result.msg)
    loading && loading.close();
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