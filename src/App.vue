<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-22 20:42:21
 * @Description: 
-->
<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useAppStore from "./store/modules/app"

const themeActive = ref(false);
const theme = ref('default');

const appStore = useAppStore()

const isMobile = () => {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || false
}

const initDevice = () => {
  appStore.initIsMobile(isMobile())
}

const changeTheme = () => {
  if (themeActive.value) {
    document.documentElement.className = "theme-dark";
    theme.value = "dark";
  } else {
    document.documentElement.className = "theme-default";
    theme.value = "default";
  }
  window.localStorage.setItem("theme", theme.value);
};

onMounted(() => {
  theme.value = window.localStorage.getItem("theme") || "default";
  themeActive.value = theme.value === "default" ? false : true;
  changeTheme();
  // 初始化设备类型
  initDevice()
});
</script>

<style scoped>
.app-container{
  height: 100%;
  width: 100%;
}
.change-theme {
  display: flex;
  position: absolute;
  top: 10px;
  left: 30px;
}
</style>
