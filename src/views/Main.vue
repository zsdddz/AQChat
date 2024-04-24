<!--
 * @Author: zsdddz
 * @Date: 2024-04-21 00:31:05
 * @LastEditTime: 2024-04-24 18:17:12
-->
<template>
  <div>
    主页
    <div>
    <button @click="testWs">测试连接</button>
    <button @click="testLogin">测试登录</button>
    <button @click="testCreatRoom">测试创建房间</button><br/>
    <input v-model="roomNo" placeholder="输入房间号" />
    <button @click="testJoinRoom">测试加入房间</button><br/>
    <input v-model="roomId" placeholder="输入房间ID" />
    <button @click="testSendMsg">测试发送消息</button>
  </div>
  </div>
</template>

<script setup lang="ts">
import AQSender from '../msg/AQSender';
import AQMsgHandlerFactory from '../msg/msghandler/AQMsgHandlerFactory';
import AQChatMsgProtocol_pb, * as AQChatMSg from '../msg/protocol/AQChatMsgProtocol_pb';
import { ref } from 'vue';

const roomId = ref<string>('');
const roomNo = ref<string>('');

const testWs = () => {
    console.log("123")
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");

      //内部不处理消息  自己定义如何处理消息
      let handlerFactory = AQMsgHandlerFactory.getInstance();
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        handlerFactory.handle(msgCommand,msgBody);
      }

      //发送消息

      //使用一：
      // AQSender.getInstance().sendMsg(
      //   AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
      //   new AQChatMSg.default.UserLoginCmd(["test1","Tx1"])
      // );
      //使用二：
      // let m = new AQChatMSg.default.UserLoginCmd();
      // m.setUsername("test2");
      // m.setUseravatar("Tx2")
      // AQSender.getInstance().sendMsg(AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,m);

      //心跳
      // AQSender.getInstance().heartbeatLoop();
    })
    
  }

const testLogin = ()=>{
  AQSender.getInstance().sendMsg(
        AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
        new AQChatMSg.default.UserLoginCmd(["test1","Tx1"])
      );
}

const testCreatRoom = () =>{
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.CREATE_ROOM_CMD,
    new AQChatMSg.default.CreateRoomCmd(['10001','测试房间'])
  )
}

const testJoinRoom = ()=>{
  let rNo = roomNo.value
  console.log(`房间No为${rNo}`)
  
  let msg = new AQChatMSg.default.JoinRoomCmd();
  msg.setRoomno(parseInt(rNo));
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.JOIN_ROOM_CMD,msg
  )
}

const testSendMsg = ()=>{
  let rId = roomId.value
  console.log(`房间Id为${rId}`)
  let msg = new AQChatMSg.default.SendMsgCmd();
  msg.setMsgtype(AQChatMSg.default.MsgType.TEXT);
  msg.setMsg('test')
  msg.setRoomid(rId);
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.SEND_MSG_CMD,msg
  )
}

</script>

<style lang="less" scoped>

</style>