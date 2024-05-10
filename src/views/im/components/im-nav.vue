<template>
  <div class="nav">
    <div v-if="userInfo.userAvatar" class="nav-my">
      <div class="nav-my-img" >
        <div v-html="userInfo.userAvatar"></div>
      </div>
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
  width: 8%;
  position: relative;
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
      // background: linear-gradient(315deg, @im-list-avatar-bg1, @im-list-avatar-bg2);
      // box-shadow:  -5px -5px 10px @im-list-avatar-shadow1,
      //             5px 5px 10px @im-list-avatar-shadow2;
    }
  }
}
</style>