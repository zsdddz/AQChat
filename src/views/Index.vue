<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:16:54
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 19:52:28
 * @Description: 
-->
<template>
  <div class="main">
    <main class="sign-main">
      <div class="image-box">
        <div class="ani-box">
          <lottie-ani :src="dataJson" />
        </div>
      </div>
      
    </main>
  </div>
</template>

<script setup lang="ts">
import dataJson from "@/assets/json/lottie-index.json";
import LottieAni from "@/components/Lottie.vue";
</script>

<style scoped lang="less">
.main {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  background-color: @primary-bgcolor;
  display: flex;
  align-items: center;
  justify-content: center;
  .sign-main {
    width: 700px;
    height: 600px;
    display: flex;
    background: @primary-bg2color;
    box-shadow: inset 9px 9px 18px @boxshow-color,
      inset -9px -9px 18px @boxshow-color2;
    border-radius: 20px;
    .image-box {
      width: 100%;
      height: 100%;
      background: #fff;
      // background-image: url("@/assets/img/cover2.png");
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      border-radius: 20px;
      overflow: hidden;
      .ani-box {
        width: 100%;
        height: 122%;
        transition: all 0.5s;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>