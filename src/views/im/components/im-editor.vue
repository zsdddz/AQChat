<template>
  <div :height="135" class="edit-box">
    <div class="editor">
      <div ref="chatElm" class="input-editor"></div>
    </div>
    <el-tooltip :visible="showPopover" placement="bottom">
      <template #content>
        <span> 不能发送空白消息 </span>
      </template>
      <el-button type="primary" class="send-btn" title="按enter键发送，按ctrl+enter键换行"
          @click="sendVerify">发送(S)</el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,watch } from 'vue'
import ChatArea from 'chatarea'
import 'chatarea/lib/ChatArea.css'
import MsgTypeEnum from "@/enums/MsgTypeEnum"
import useAppStore from "@/store/modules/app"
import User from '@/class/User'

const chat = ref();
const appStore = useAppStore()
const showPopover = ref(false)
const chatElm = ref()
let memberList:Array<User> = [];
const initChat = () => {
  // 实例chat对象
  chat.value = new ChatArea({
    elm: chatElm.value,
    placeholder: '',
    needCallEvery:false,
    userProps: {
        id: 'userId',
        name: 'userName'
    },
    userList: []
  })
  chat.value.revisePCPointDialogLabel({
      title: '房间成员',
      checkLabel: ''
  })
  // 绑定键盘发送事件（默认配置为回车发送）
  chat.value.enterSend = sendVerify
}

// 更新消息列表
watch(() => appStore.memberList, (newV:any) => {
  memberList = newV.filter((x:User)=>x.userId != appStore.userInfo.userId);
  if(memberList.length > 0){
    initUserList();
  }
}, { immediate:true,deep: true })

const initUserList = ()=>{
  if (!chat.value) return
  chat.value.updateUserList(memberList)
}

// 发送校验
const sendVerify = ()=> {

  if (!chat.value) return
  const htmlMsg_1 = chat.value.getHtml({needUserId: true})
  if(!htmlMsg_1) return
  const sendContent = htmlMsg_1;
  if (sendContent.length == 0) {
    showPopover.value = true;
    setTimeout(() => {
      showPopover.value = false;
    }, 1000);
    return;
  } else {
    // 获取聊天框中@人员
    const callUserList = chat.value.getCallUserList()
    let extArray = callUserList.map((x:any)=>x.userId);
    extArray = extArray.map((element:string) => "@"+element);
    let ext = extArray.join(',');
    appStore.sendInfo(sendContent,MsgTypeEnum.TEXT,ext);
  }
  // 清空聊天框
  chat.value.clear()
}

// 发送消息
const sendMsg = () => {
  if (!chat.value) return
  // 获取html
  const htmlMsg = chat.value.getHtml()
  console.log(htmlMsg, 'html')
  // 获取纯文本
  const textMsg = chat.value.getText()
  console.log(textMsg, 'text')
  // 获取聊天框中@人员
  const callUserList = chat.value.getCallUserList()
  console.log(callUserList, 'callUserList')
}

onMounted(() => {
  initChat()
})

onBeforeUnmount(() => {
  // 释放实例
  chat && chat.value.dispose()
})


defineExpose({
  chat
})
</script>

<style scoped lang="less">
.edit-box {
  position: relative;
  width: 100%;
  height: 70%;
  border: 1px solid rgba(204,204,204,.5);
  border-radius: 10px;
  overflow: hidden;
  .editor {
    text-align: left;
    height: 66%;
    .input-editor{
      height: 100%;
      overflow-y: auto;
    }
  }

  /deep/ .w-e-text p{
    margin:0;
    line-height: 22px;
  }
  /deep/ .w-e-text-container .placeholder{
    line-height: 0;
  }

  /deep/ .w-e-toolbar{
    border-bottom:none!important;
    border:none!important;
  }

  /deep/ .w-e-text-container {
    border: none !important;
    height: 100% !important;
    z-index: 10 !important;
    >div {
      // min-height: 120px;
    }
  }

  .send-btn {
    position: absolute;
    bottom: 5px;
    right: 10px;
    background-color: @im-primary;
  }
}
</style>