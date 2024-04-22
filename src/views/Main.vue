<!--
 * @Author: zsdddz
 * @Date: 2024-04-21 00:31:05
 * @LastEditTime: 2024-04-22 09:58:29
-->
<template>
  <div>
    主页
    <div>
    <button @click="testWs">测试连接</button>
  </div>
  </div>
</template>

<script setup lang="ts">
import AQSender from '../msg/AQSender';
import * as AQChatMSg from '../msg/protocol/AQChatMsgProtocol_pb';
const testWs = () => {
    console.log("123")
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");

      //内部不处理消息  自己定义如何处理消息
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        console.log(`收到服务器响应：指令：${msgCommand} ,消息体： ${msgBody}`);
      }

      //发送消息

      //使用一：
      AQSender.getInstance().sendMsg(
        AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
        new AQChatMSg.default.UserLoginCmd(["test1","Tx1"])
      );
      //使用二：
      let m = new AQChatMSg.default.UserLoginCmd();
      m.setUsername("test2");
      m.setUseravatar("Tx2")
      AQSender.getInstance().sendMsg(AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,m);

      //心跳
      AQSender.getInstance().heartbeatLoop();
    })
    
  }

</script>

<style lang="less" scoped>

</style>