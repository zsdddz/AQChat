<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:16:54
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-21 18:43:24
 * @Description: 首页
-->
<template>
  <div class="main">
    <div class="chat-lottie">
      <lottie-ani :src="dataJson" />
    </div>
    <div class="title bounce_fall">Anonymous Quick Chat</div>
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

setTimeout(()=>{
  startTyping('一个极速、便捷的在线匿名聊天室',appDesc)
},1000)


</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
.bounce_fall {
   -webkit-animation: bounce_fall 1s linear;
}
@-webkit-keyframes bounce_fall {
  0% {transform:translateY(-400px);}
  4% {transform:translateY(-395.16px);}
  8% {transform:translateY(-380.64px);}
  12% {transform:translateY(-356.44px);}
  16% {transform:translateY(-322.56px);}
  20% {transform:translateY(-279px);}
  24% {transform:translateY(-225.76px);}
  28% {transform:translateY(-162.84px);}
  32% {transform:translateY(-90.24px);}
  36% {transform:translateY(-7.96px);}
  40% {transform:translateY(-36px);}
  44% {transform:translateY(-66.36px);}
  48% {transform:translateY(-87.04px);}
  52% {transform:translateY(-98.04px);}
  56% {transform:translateY(-99.36px);}
  60% {transform:translateY(-91px);}
  64% {transform:translateY(-72.96px);}
  68% {transform:translateY(-45.24px);}
  72% {transform:translateY(-7.84px);}
  76% {transform:translateY(-14.76px);}
  80% {transform:translateY(-24px);}
  84% {transform:translateY(-23.56px);}
  88% {transform:translateY(-13.44px);}
  92% {transform:translateY(-2.64px);}
  96% {transform:translateY(-6.16px);}
  100% {transform:translateY(0);}
}

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
    &:hover {
      transform: translateY(3px);
      box-shadow: none;
    }
    &:active {
      opacity: 0.5;
    }
  }
}
</style>