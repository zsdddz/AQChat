<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:16:54
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-22 23:18:00
 * @Description: 首页
-->
<template>
  <div class="main">
    <div class="chat-lottie">
      <lottie-ani :src="LottieChat" />
    </div>
    <div class="title bounce_fall">Anonymous Quick Chat</div>
    <div class="desc">{{ appDesc }}</div>
    <div class="advantage-list">
      <div v-for="item in advantageList" :key="item.title" class="ad-item">
        <div class="label">{{ item.title }}</div>
        <div class="ad-desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="start-btn" @click="toStartFun">
      <div class="svg-wrapper-1">
        <div class="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </div>
      </div>
      <span>开启</span>
    </div>
  </div>
  <el-dialog
    v-if="dialogStartVisible"
    v-model="dialogStartVisible"
    width="500px"
    class="pop-start"
  >
    <div v-if="step == 1" class="tip-content">
      <!-- <div class="popup-header">
        <lottie-ani style="cursor: pointer" :loop="false" :src="LottieStart" />
      </div> -->
      <div class="user-info">
        <div class="user-avatar" v-html="userForm.userAvatar"></div>
        <div class="user-name">
          <input v-model="userForm.userName" />
          <div class="btn-reload">
            <lottie-ani
              v-if="reloadLoading"
              :loop="false"
              :autoplay="true"
              :src="LottieReload"
              @click.native="reloadFun"
            />
          </div>
        </div>
      </div>
      
      <button :class="['login',!isInitSocket && 'login-fail']" @click="enterChatFun">
        进入聊天室
        <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
          <path
            clip-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LottieChat from "@/assets/json/lottie-chat.json";
import LottieStart from "@/assets/json/lottie-start.json";
import LottieReload from "@/assets/json/lottie-reload.json";
import LottieAni from "@/components/Lottie.vue";
import useTyping from "./hook/useTyping";
import useStart from "./hook/useStart";

const appDesc = ref("");
const { startTyping } = useTyping();
const {
  dialogStartVisible,
  step,
  userForm,
  reloadLoading,
  isInitSocket,
  toStartFun,
  reloadFun,
  enterChatFun
} = useStart();
const advantageList = [
  {
    title: "🚀即使通讯",
    desc: "采用Netty实现高效处理，protobuf协议轻便快捷",
  },
  {
    title: "🎯便捷",
    desc: "即开即用，无需一切繁琐操作",
  },
  {
    title: "✨简单",
    desc: "所见即所得，0引导",
  },
];

setTimeout(() => {
  startTyping("一个极速、便捷的在线匿名聊天室", appDesc);
}, 1000);

</script>
<style>
.pop-start {
background: #fff;
}
</style>
<style scoped lang="less">
.pop-start {
  border-radius: 17px;
  background: #ffffff;
  box-shadow:  16px 16px 32px #d9d9d9,
              -16px -16px 32px #ffffff;
  .tip-content {
    box-shadow: none;
    width: 100%;
    height: 280px;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    .btn-reload {
      margin: 0 auto;
      height: 30px;
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
    }
   
    .login {
      position: absolute;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
      padding-block: 0.5rem;
      padding-inline: 1.25rem;
      background-color: rgb(0 107 179);
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ffff;
      gap: 10px;
      font-weight: bold;
      border: 3px solid #ffffff4d;
      outline: none;
      overflow: hidden;
      font-size: 15px;
      bottom: 0;
      right: 0;
      &:hover {
        transform: scale(1.05);
        border-color: #fff9;
      }
      &:hover .icon {
        transform: translate(4px);
      }
      &:hover::before {
        animation: shine 1.5s ease-out infinite;
      }
      &::before {
        content: "";
        position: absolute;
        width: 100px;
        height: 100%;
        background-image: linear-gradient(
          120deg,
          rgba(255, 255, 255, 0) 30%,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0) 70%
        );
        top: 0;
        left: -100px;
        opacity: 0.6;
      }
      .icon {
        width: 24px;
        height: 24px;
        transition: all 0.3s ease-in-out;
      }
    }
    .login-fail{
      cursor: not-allowed;
      background-color:#ccc;
    }

    @keyframes shine {
      0% {
        left: -100px;
      }

      60% {
        left: 100%;
      }

      to {
        left: 100%;
      }
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .user-avatar {
        height: 90px;
        width: 90px;
        margin-bottom: 20px;
      }
      .user-name{
        height: 40px;
        width: 200px;
        position: relative;
        input{
          outline: none;
          border: none;
          height: 100%;
          width: 150px;
          border-radius: 17px;
          background: #ffffff;
          box-shadow: inset 6px 6px 8px #cfcfcf,
                      inset -6px -6px 8px #ffffff;
          padding: 0 10px;
          margin-right: 20px;
          text-align: center;
        }
      }
    }
    .popup-header {
      height: 100px;
      width: 60%;
      transform: scale(2);
      position: absolute;
      top: -80px;
      left: 0%;
      transform: translateX(-50%);
    }
  }
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: @bg-color;
  .bounce_fall {
    -webkit-animation: bounce_fall 1s linear;
  }
  @-webkit-keyframes bounce_fall {
    0% {
      transform: translateY(-400px);
    }
    4% {
      transform: translateY(-395.16px);
    }
    8% {
      transform: translateY(-380.64px);
    }
    12% {
      transform: translateY(-356.44px);
    }
    16% {
      transform: translateY(-322.56px);
    }
    20% {
      transform: translateY(-279px);
    }
    24% {
      transform: translateY(-225.76px);
    }
    28% {
      transform: translateY(-162.84px);
    }
    32% {
      transform: translateY(-90.24px);
    }
    36% {
      transform: translateY(-7.96px);
    }
    40% {
      transform: translateY(-36px);
    }
    44% {
      transform: translateY(-66.36px);
    }
    48% {
      transform: translateY(-87.04px);
    }
    52% {
      transform: translateY(-98.04px);
    }
    56% {
      transform: translateY(-99.36px);
    }
    60% {
      transform: translateY(-91px);
    }
    64% {
      transform: translateY(-72.96px);
    }
    68% {
      transform: translateY(-45.24px);
    }
    72% {
      transform: translateY(-7.84px);
    }
    76% {
      transform: translateY(-14.76px);
    }
    80% {
      transform: translateY(-24px);
    }
    84% {
      transform: translateY(-23.56px);
    }
    88% {
      transform: translateY(-13.44px);
    }
    92% {
      transform: translateY(-2.64px);
    }
    96% {
      transform: translateY(-6.16px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .advantage-list {
    display: grid;
    width: 80%;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    .ad-item {
      transition: all 0.5s;
      padding: 40px 10px;
      color: @txt-color;
      &:hover {
        border-radius: 11px;
        background: @bg-color;
        box-shadow: inset 22px 22px 45px @ad-shadow, inset -22px -22px 45px @bg-color;
      }
      .label {
        font-size: 24px;
      }
      .ad-desc {
        margin-top: 10px;
      }
    }
  }
  .chat-lottie {
    height: 300px;
    transition: all 0.5s;
    transform: scale(1.5);
    &:hover {
      transform: scale(1.6);
    }
  }
  .title {
    font-size: 40px;
    font-style: italic;
    font-weight: 600;
    letter-spacing: 5px;
    color: @txt-color;
  }
  .desc {
    font-family: "YYZY";
    font-size: 18px;
    min-height: 30px;
    margin-top: 20px;
    color: @txt-color;
  }
  .start-btn {
    font-family: inherit;
    font-size: 20px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    width: 120px;
    margin-top: 20px;
    span {
      display: block;
      margin-left: 0.3em;
      transition: all 0.3s ease-in-out;
    }
    svg {
      display: block;
      transform-origin: center center;
      transition: transform 0.3s ease-in-out;
    }
    &:hover .svg-wrapper {
      animation: fly-1 0.6s ease-in-out infinite alternate;
    }
    &:hover svg {
      transform: translateX(1.2em) rotate(45deg) scale(1.1);
    }
    &:hover span {
      transform: translateX(5em);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
}
</style>