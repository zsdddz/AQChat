<template>
  <div class="im-container">
    <div class="content">
      <im-nav />
      <div class="content-info">
        <im-domain v-if="!appStore.roomInfo.roomId" />
        <im-content v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImNav from "./components/im-nav.vue"
import ImContent from "./components/im-content.vue"
import ImDomain from "./components/im-domain.vue"
import useAppStore from "@/store/modules/app"

const appStore = useAppStore()

</script>

<style lang="less" scoped>
.im-container {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  background-color: @bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 1200px;
    height: 620px;
    border-radius: 30px;
    background: linear-gradient(315deg, @im-content-bg1, @im-content-bg2);
    box-shadow:  -17px -17px 19px @im-content-shadow1,
                17px 17px 19px @im-content-shadow2;
    overflow: hidden;
    display: flex;
    .content-info{
      height: 100%;
      width: 98%;
      background: @im-list-bg;
      position: relative;
      padding: 0 20px 20px 20px;
    }
  }
}
</style>