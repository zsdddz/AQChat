<template>
  <div class="domain scroll_container">
    <div
      :class="[
        'session-item',
        item.Id == currentRoomId ? 'session-active' : '',
      ]"
      v-for="item in roomList"
      :key="item.Id"
    >
      <div class="session-img">
      </div>
      <div class="session-content">
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
.domain {
  height: 100%;
  width: 20%;
  background: @im-list-bg;
  padding: 6px 8px;
  position: relative;
  .empty-session {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .empty-img {
      width: 200px;
      height: auto;
    }
    .empty-text {
      color: #fff;
      margin-top: 20px;
    }
  }

  .session-item {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      border-radius: 50px;
    }
    .session-img {
      width: 30%;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
    }
    .session-content {
      width: 60%;
      margin-left: 10%;
      text-align: left;
      .session-name {
        font-size: 16px;
      }
      .session-desc {
        font-size: 12px;
        margin-top: 6px;
        display: flex;

        /deep/ * {
          padding: 0;
          margin: 0;
        }
        /deep/ img {
          height: 20px !important;
          width: 20px !important;
        }
      }
    }
  }
  .session-active {
    border-radius: 50px;
  }
}
</style>