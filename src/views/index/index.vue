<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:16:54
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-20 10:04:14
 * @Description: 首页
-->
<template>
  <div class="main">
    <div class="chat-lottie">
      <lottie-ani :src="LottieChat" />
    </div>
    <div class="title bounce_fall">AQChat</div>
    <div class="desc">{{ appDesc }}</div>
    <div class="advantage-list">
      <div v-for="item in advantageList" :key="item.title" class="ad-item">
        <div class="label">{{ item.title }}</div>
        <div class="ad-desc" v-html="item.desc"></div>
      </div>
      <div class="ad-item">
        <div class="label">🚝仓库</div>
        <div class="ad-desc flex-c" >
          <div class="info">
            <div class="git-name"><el-link href="https://gitee.com/howcode/aq-chat" target="_blank">AQChat</el-link></div>
            <a href='https://gitee.com/howcode/aq-chat/stargazers'><img src='https://gitee.com/howcode/aq-chat/badge/star.svg?theme=dark' alt='star'></img></a>
            <a href='https://gitee.com/howcode/aq-chat/members'><img src='https://gitee.com/howcode/aq-chat/badge/fork.svg?theme=dark' alt='fork'></img></a>
          </div>
        </div>
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
      <div class="user-info">
        <div class="top-box">
          <div class="user-avatar" v-html="userForm.userAvatar"></div>
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
        <el-form :model="userForm" label-width="160px" ref="userFormRef" :rules="userRules">
          
          <!-- <div class="user-name">
            用户名
            <input placeholder="请输入用户名" v-model="userForm.userName" />
          </div> -->
          <el-form-item :inline-message="true" class="form-item" prop="userName" label="用户名">
            <el-input placeholder="请输入用户名" v-model="userForm.userName" />
          </el-form-item>
        </el-form>
      </div>
      
      <button :class="['next-btn',,!appStore.websocketStatus && 'init-fail']" @click="enterRoomFun">
        进入
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
import LottieReload from "@/assets/json/lottie-reload.json";
import LottieAni from "@/components/Lottie.vue";
import useTyping from "./hook/useTyping";
import useStart from "./hook/useStart";
import useAppStore from "@/store/modules/app";

const appStore = useAppStore()
const appDesc = ref("");
const { startTyping } = useTyping();
const {
  dialogStartVisible,
  step,
  userForm,
  userFormRef,
  reloadLoading,
  userRules,
  toStartFun,
  reloadFun,
  enterRoomFun
} = useStart();
const advantageList = [
  {
    title: "🚀即时通讯",
    desc: "protobuf协议轻便快捷</br>采用Netty实现高效处理",
  },
  {
    title: "🎯便捷",
    desc: "即开即用</br>无需一切繁琐操作",
  },
  {
    title: "✨简单",
    desc: "0引导</br>所见即所得",
  },
];

function toGitee(){
  window.open('https://gitee.com/howcode/aq-chat')
}

setTimeout(() => {
  startTyping("一个极速、便捷的在线匿名聊天室", appDesc);
}, 1000);

</script>
<style>
.pop-start {
  background: var(--bg-color);
  border-radius: 10px;
}
</style>
<style scoped lang="less">
.pop-start {
  box-shadow:  16px 16px 32px #d9d9d9,
              -16px -16px 32px #ffffff;
  .tip-content {
    box-shadow: none;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
    .select-option{
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      .option{
        height: 100px;
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: @im-primary;
        border-radius: 16px;
        color: #fff;
        cursor: pointer;
        .icon-create{
          font-size: 34px;
          margin-bottom: 6px;
        }
        .icon-enter{
          font-size: 28px;
          margin-bottom: 10px;
        }
      }
    }
    
   
    .next-btn {
      float: right;
      position: relative;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
      padding-block: 0.5rem;
      padding-inline: 1.25rem;
      background-color: @im-primary;
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
      margin-top: 40px;
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
    .init-fail{
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
      .el-form{
        width: 100%;
      }
      .top-box{
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        .user-avatar {
          height: 90px;
          width: 90px;
          margin: 0 auto;
        }
        .btn-reload {
          position: absolute;
          right: 110px;
          top: 40px;
          height: 30px;
          width: 30px;
        }
      }
      
      .form-item{
        position: relative;
        display: flex;
        align-items: center;
        color: @txt-color;
        margin-top: 10px;
        margin-bottom:0;
        width: 100%;
        .el-input{
          outline: none;
          border: none;
          height: 40px;
          width: 150px;
          border-radius: 17px;
          background: #ffffff;
          box-shadow: inset 6px 6px 8px #cfcfcf,
                      inset -6px -6px 8px #ffffff;
          padding: 0 10px;
          text-align: center;
          
        }
        /deep/ .el-input__wrapper{
          background-color: transparent;
          box-shadow:none;
          outline: none;
          border: none;
        }
      }
      .room-no,.user-name{
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
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
          margin-left: 10px;
          text-align: center;
        }
      }
      .room-no{
        margin-top: 30px;
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
.pointer{
  cursor: pointer;
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
    display: flex;
    width: 80%;
    // gap: 20px;
    // grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    .ad-item {
      transition: all 0.5s;
      padding: 40px 10px;
      color: @txt-color;
      width: 24%;
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
        .info{
          margin-left: 10px;
          text-align: center;
          .git-name{
            margin-bottom: 5px;
            font-size: 14px;
          }
        }
        .icon{
          height: 30px;
          width: 30px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .flex-c{
        display: flex;
        align-items: center;
        justify-content: center;
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
    background: @im-primary;
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