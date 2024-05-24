<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-26 11:00:18
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-24 16:39:17
 * @Description: 
-->
<template>
  <div class="im-container">
    <el-tooltip class="item" :effect="appStore.theme === 'dark' ? 'light':'dark'" content="有空再聊，再见" placement="bottom-start">
      <i @click="quitFun" class="iconfont icon-enter"></i>
    </el-tooltip>
    <el-switch
      class="sound-btn"
      size="large"
      style="--el-switch-on-color: #0FB560;--el-switch-off-color: #EC3214"
      v-model="soundActive"
      @change="changeSoundFun"
      inline-prompt
      active-text="不会错过重要提醒啦"
      inactive-text="开启声音提醒"
    >
      <template #active-action>
        <i class="iconfont icon-sound"></i>
      </template>
      <template #inactive-action>
        <i class="iconfont icon-mute"></i>
      </template>
    </el-switch>
    <!--接收信息提示音-->
    <audio id="tipMusic">
      <source src="/mp3/msgTip.mp3" type="audio/mp3" />
    </audio>
    <div class="content">
      <im-nav />
      <div class="content-info">
        <im-domain v-if="!appStore.roomInfo.roomId" />
        <im-content v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import ImNav from "./components/im-nav.vue"
import ImContent from "./components/im-content.vue"
import ImDomain from "./components/im-domain.vue"
import useAppStore from "@/store/modules/app"
import { useRoute, useRouter } from "vue-router";
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import { ref } from 'vue'
import { sendMessage, listenMessage,removeListenMsg } from '@/utils/CrossTagMsg'

const appStore = useAppStore()
const router = useRouter();
const route = useRoute();
const soundActive = ref(false)

// 切换声音开启状态
const changeSoundFun = () =>{
  appStore.setSoundActive(soundActive.value)
  appStore.soundDom = document.getElementById("tipMusic")
}
// 判断当前是否存在用户登录
const hasUserFun = () =>{
  if(!appStore?.userInfo?.userId){
    appStore.resetAllInfo();
    AQSender.getInstance().heartbeatStop();
    router.replace({
      name:'Index'
    })
  }
}
// 退出
const quitFun = () =>{
  ElMessageBox.confirm("确认退出登录？", "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  }).then(res=>{
    logoutFun();
  })
}

const logoutFun = ()=>{
  let userLogout = new AQChatMSg.default.UserLogoutCmd();
  userLogout.setUserid(appStore.userInfo.userId);
  
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.USER_LOGOUT_CMD,userLogout
  )
  setTimeout(()=>{
    appStore.resetAllInfo();
    AQSender.getInstance().heartbeatStop();
    router.replace({
      name:'Index'
    })
  },100)
}

hasUserFun();

sendMessage("repeact-im");

listenMessage((info:MessageEvent)=>{
  if(route.name == 'IM'){
    switch(info.data){
      case "repeact-im":
        ElMessageBox.confirm("已在新标签页打开，强制关闭当前页", "系统提示", {
          confirmButtonText: '我已知晓',
          showClose:false,
          showCancelButton:false,
          type: "warning",
        }).finally(()=>{
          
        })
        router.replace({
          name:'Index'
        })
        AQSender.getInstance().close();
        break;
    }
  }
})

</script>

<style lang="less" scoped>
.im-container {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  background-color: @bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .sound-btn{
    position: absolute;
    top: 10px;
    left: 30px;
    z-index: 10;
  }
  .icon-enter{
    position: absolute;
    top: 10px;
    font-size: 30px;
    right: 30px;
    color: #EC3214;
    cursor: pointer;
    height: 40px;
    width: 40px
  }
  .content {
    width: 1200px;
    height: 620px;
    border-radius: 30px;
    background: @im-bg1;
    box-shadow:  -17px -17px 19px @im-shadow1,
                17px 17px 19px @im-shadow2;
    overflow: hidden;
    display: flex;
    .content-info{
      height: 100%;
      width: 98%;
      // background-color: @im-content-bg1;
      position: relative;
      padding: 20px;
      padding-left: 0;
    }
  }
}
</style>