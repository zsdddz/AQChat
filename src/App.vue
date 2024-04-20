<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 19:12:54
 * @Description: 
-->
<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const themeActive = ref(false);
const theme = ref('default');

const changeTheme = () => {
  if (themeActive.value) {
    document.documentElement.className = "theme-light";
    theme.value = "light";
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
