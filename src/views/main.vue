<!--
 * @Author: zsdddz
 * @Date: 2024-04-21 00:31:05
 * @LastEditTime: 2024-04-25 20:55:16
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
    <button @click="testAliOss">测试阿里临时凭证</button>

    <el-upload
    ref="upload"
    class="upload-demo"
    action="#"
    :http-request="uploadMethod"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
  </div>
  </div>
</template>

<script setup lang="ts">
import AQSender from '../msg/AQSender';
import AQMsgHandlerFactory from '../msg/msghandler/AQMsgHandlerFactory';
import AQChatMsgProtocol_pb, * as AQChatMSg from '../msg/protocol/AQChatMsgProtocol_pb';
import { ref } from 'vue';

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import OSS from "ali-oss";
import { OssHelper } from '../utils/OssHelper';

const roomId = ref<string>('');
const roomNo = ref<string>('');

const upload = ref<UploadInstance>()

const aliOss = {
  accessKeyId: '',
  accessKeySecret: '',
  securityToken: '',
  bucket: '',
  region: '',
  uploadPath: '',
  endpoint: ''
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  console.log(file)
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
   upload.value!.submit()
}

const uploadMethod = (file)=>{
  OssHelper.getInstance().init(AQChatMSg.default.MsgType.IMAGE,()=>{
    OssHelper.getInstance().uploadFile(file.file)
    .then((res)=>{
      console.log("上传成功,地址为:"+res.url)
    }).catch((err)=>{
      console.log("上传失败,错误为:"+err)
    });
  });
}



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

const testAliOss = () =>{
  let handlerFactory = AQMsgHandlerFactory.getInstance();
  AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
    if(msgCommand != AQChatMSg.default.MsgCommand.GET_STS_ACK){
      handlerFactory.handle(msgCommand,msgBody)
      return
    }
    handlerOss(msgBody)
  }
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.GET_STS_CMD,
    new AQChatMSg.default.GetStsCmd([AQChatMSg.default.MsgType.IMAGE])
  )
}

const handlerOss = (msgBody:AQChatMSg.default.GetStsAck) =>{
  //打印数据
  console.log(`AccessKeyId:${msgBody.getAccesskeyid()}`)
  console.log(`AccessKeySecret:${msgBody.getAccesskeysecret()}`)
  console.log(`SecurityToken:${msgBody.getSecuritytoken()}`)
  console.log(`bucket:${msgBody.getBucket()}`)
  console.log(`Region:${msgBody.getRegion()}`)
  console.log(`Uploadpath:${msgBody.getUploadpath()}`)
  console.log(`Endpoint:${msgBody.getEndpoint()}`)
  //赋值
  aliOss.accessKeyId = msgBody.getAccesskeyid()
  aliOss.accessKeySecret = msgBody.getAccesskeysecret()
  aliOss.securityToken = msgBody.getSecuritytoken()
  aliOss.bucket = msgBody.getBucket()
  aliOss.region = msgBody.getRegion()
  aliOss.uploadPath = msgBody.getUploadpath()
  aliOss.endpoint = msgBody.getEndpoint()
}

</script>

<style lang="less" scoped>

</style>