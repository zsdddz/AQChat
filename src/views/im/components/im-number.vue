<template>
  <div class="chat-number scroll_container">
    <div class="room-txt">房间成员</div>
    <div class="number-item" v-for="item in appStore.numberList" :key="item.userId">
      <div class="user-avatar" v-html="item.userAvatar"></div>
      <span>{{ item.userName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()


</script>

<style lang="less" scoped>
.chat-number {
  width: 20%;
  height: 100%;
  border-left: 1px solid rgba(204,204,204,.3);
  padding: 20px;
  .room-txt{
    width: 100%;
    text-align: center;
    color: @txt-color;
    font-size: 14px;
  }
  .number-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
</style>