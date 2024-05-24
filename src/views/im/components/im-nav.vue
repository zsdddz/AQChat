<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-26 11:50:04
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-24 10:33:32
 * @Description: 
-->
<template>
  <div class="nav">
    <div v-if="userInfo.userAvatar" class="nav-my">
      <div class="nav-my-img" >
        <div v-html="userInfo.userAvatar"></div>
      </div>
      <div class="user-name text-ellipsis" :title="userInfo.userName">{{ userInfo.userName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from "@/store/modules/app";

const appStore = useAppStore()
const userInfo = appStore.userInfo

</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  width: 10%;
  position: relative;
  .user-name{
    margin: 20px auto;
    color: @txt-color;
    font-size: 14px;
    width: 90%;
    text-align: center;
  }
  .nav-my {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .nav-my-img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin: auto;
      // box-shadow:  0px 0px 10px @im-list-avatar-shadow1;
    }
  }
}
</style>