<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-24 09:33:52
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-switch
      class="theme-btn"
      size="large"
      style="--el-switch-on-color: #4D5FFF;"
      v-model="themeActive"
      @change="changeThemeFun"
    >
      <template #active-action>
        <i class="iconfont icon-light"></i>
      </template>
      <template #inactive-action>
        <i class="iconfont icon-dark"></i>
      </template>
    </el-switch>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useAppStore from "./store/modules/app"
import useSocket from "./hooks/useSocket"

const themeActive = ref(false);
const appStore = useAppStore()
const {
  initSocketFun
} = useSocket()

const isMobile = ()=> {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || false
}
// 初始化设备类型
const initDeviceFun = ()=> {
  appStore.setIsMobile(isMobile())
}
// 切换主题
const changeThemeFun = ()=> {
  if (themeActive.value) {
    document.documentElement.className = "theme-light";
    appStore.setTheme("light");
  } else {
    document.documentElement.className = "theme-dark";
    appStore.setTheme("dark");
  }
};

onMounted(() => {
  themeActive.value = appStore.theme === "light" ? true : false
  changeThemeFun()
  initDeviceFun()
  initSocketFun();
});
</script>

<style lang="less" scoped>
.app-container{
  height: 100%;
  width: 100%;
  min-width: 1000px;
  position: relative;
  .theme-btn{
    display: flex;
    position: absolute;
    top: 50px;
    left: 30px;
    z-index: 10;
    .iconfont{
      font-size: 14px;
    }
  }
}
</style>
