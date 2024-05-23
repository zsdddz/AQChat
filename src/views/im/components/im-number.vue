<template>
  <div class="chat-number ">
    <div class="room-txt">房间成员({{ appStore.memberList.length }})</div>
    <div class="number-list scroll_container">
      <div class="number-item" v-for="item in appStore.memberList" :key="item.userId">
        <div class="user-avatar" v-html="item.userAvatar"></div>
        <div class="user-name text-ellipsis" :title="item.userName">{{ item.userName }}</div>
      </div>
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
  .number-list{
    height: calc(100% - 20px);
  }
  .number-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .user-name{
      width: calc(100% - 30px - 10px);
      text-align: left;
    }
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>