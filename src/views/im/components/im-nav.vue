<template>
  <div class="nav">
    <div v-if="userInfo.userAvatar" class="nav-my row-center">
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

console.log(userInfo);

</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  width: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nav-my {
    width: 100%;
    .nav-my-img {
      height: 100%;
      width: 70%;
      border-radius: 50%;
      padding: 10px;
      border-radius: 50%;
      background: linear-gradient(315deg, @im-list-avatar-bg1, @im-list-avatar-bg2);
      box-shadow:  -5px -5px 10px @im-list-avatar-shadow1,
                  5px 5px 10px @im-list-avatar-shadow2;
    }
  }
}
</style>