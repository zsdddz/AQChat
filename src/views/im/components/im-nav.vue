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
  background-color: @im-nav-bg;
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