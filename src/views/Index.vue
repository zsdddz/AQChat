<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:16:54
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-21 18:35:52
 * @Description: 
-->
<template>
  <div class="main">
    <div class="chat-lottie">
      <lottie-ani :src="dataJson" />
    </div>
    <div class="title">Anonymous Quick Chat</div>
    <div class="desc">{{ appDesc }}</div>
    <div class="advantage-list">
      <div v-for="item in advantageList" :key="item.title" class="ad-item">
        <div class="label">{{ item.title }}</div>
        <div class="ad-desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="start">开启</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import dataJson from "@/assets/json/lottie-chat.json";
import LottieAni from "@/components/Lottie.vue";
import useTyping from "./hook/useTyping"

const appDesc = ref('')
const { startTyping } = useTyping()
const advantageList = [
  {
    title:'🚀即使通讯',
    desc:'采用Netty实现高效处理，protobuf协议轻便快捷'
  },
  {
    title:'🎯便捷',
    desc:'即开即用，无需一切繁琐操作'
  },
  {
    title:'✨简单',
    desc:'所见即所得，0引导'
  },
]

startTyping('一个极速、便捷的在线匿名聊天室',appDesc)


</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .advantage-list{
    display: grid;
    width: 80%;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    .ad-item{
      transition: all .5s;
      padding: 40px 10px;
      &:hover{
        border-radius: 11px;
        background: #ffffff;
        box-shadow:  8px 8px 18px #ededed,
                    -8px -8px 18px #ffffff;
      }
      .label{
        font-size: 24px;
      }
      .ad-desc{
        margin-top: 10px;
      }
    }
  }
  .chat-lottie{
    height: 300px;
    transition: all 0.5s;
    transform: scale(1.5);
    &:hover {
      transform: scale(1.6);
    }
  }
  .title{
    font-size: 40px;
    font-style: italic;
    font-weight: 600;
    letter-spacing: 5px;
  }
  .desc{
    font-family: "YYZY";
    font-size: 18px;
    min-height: 30px;
    margin-top: 20px;
  }
  .start{
    margin-top: 20px;
    font-size: 24px;
    font-family: "YYZY";
    background-color: #466AFB;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 50px;
    width: 150px;
    height: 60px;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(135deg, #92a4fe 0%, #466AFB 100%);
    box-shadow: 0 20px 30px -6px rgba(70,106,251, 0.5);
  }
  .start:hover {
    transform: translateY(3px);
    box-shadow: none;
  }

  .start:active {
    opacity: 0.5;
  }
}
</style>