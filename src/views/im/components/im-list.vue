<template>
  <div class="im-list">
    <div class="tool-box">
      <div class="serach-box">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜索" />
      </div>
      <div class="add-box">
        <i class="iconfont icon-add"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const currentRoomId = ref(0);
const roomList = ref([])

</script>

<style lang="less" scoped>
.im-list {
  height: 100%;
  width: 20%;
  background: @im-list-bg;
  position: relative;
  .tool-box{
    height: 50px;
    background: @bg-color;
    box-shadow: inset 0px 5px 5px @im-search-shadow1,
                inset 0px -5px 5px @im-search-shadow2;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .add-box{
      height: 24px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0px;
      background: @im-add;
      border-radius: 4px;
      .icon-add{
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }
    }
    .serach-box{
      display: flex;
      align-items: center;
      width: calc(100% - 20px - 10px);
      padding: 4px 3px;
      color: @txt-color;
      input{
        background-color: transparent;
        outline: none;
        border: none;
        color: @txt-color;
        margin-left: 5px;
      }
    }

  }
}
</style>