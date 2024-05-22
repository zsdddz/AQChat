<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-26 11:00:18
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-22 15:24:07
 * @Description: 
-->
<template>
  <div class="im-container">
    <el-tooltip class="item" :effect="appStore.theme === 'dark' ? 'light':'dark'" content="有空再聊，再见" placement="bottom-start">
      <i @click="quitFun" class="iconfont icon-enter"></i>
    </el-tooltip>
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
import { useRouter } from "vue-router";
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'

const appStore = useAppStore()
const router = useRouter();

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
  })
}

hasUserFun();

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