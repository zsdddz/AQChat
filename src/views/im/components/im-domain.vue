<template>
  <div class="im-domain">
    <div class="option-list">
      <div class="option" @click="createRoomFun">
        <i class="iconfont icon-create"></i>
        创建
      </div>
      <div class="option" @click="joinRoomFun">
        <i class="iconfont icon-enter"></i>
        加入
      </div>
    </div>
    <div class="lottie-box">
      <lottie-ani :src="lottieContent" />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    width="500px"
    class="pop-start"
  >
    <div class="tip-content">
      <div class="form-info">
        <div class="form-item">
          用户名
          <el-input placeholder="请输入用户名" disabled v-model="appStore.userInfo.userName" />
        </div>
        <div class="form-item">
          房间号
          <el-input placeholder="请输入房间号" v-model.number="roomForm.roomNo" />
        </div>
        <div v-if="step == 1" class="form-item">
          房间名
          <el-input placeholder="请输入房间名" v-model="roomForm.roomName" />
        </div>
      </div>
      
      <button :class="['next-btn',,!appStore.websocketStatus && 'init-fail']" @click="enterRoomFun">
        {{ step == 1 ? '创建' : '进入' }}
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
import { reactive, ref } from "vue"
import useAppStore from "@/store/modules/app"
import LottieAni from "@/components/Lottie.vue";
import lottieContent from "@/assets/json/lottie-content.json";
import { ElMessage } from 'element-plus'
import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'

const appStore = useAppStore()
const step = ref(0);
const dialogVisible = ref(false)
const roomForm = reactive({
  roomNo:'',
  roomName:''
})

const createRoomFun = ()=>{
  dialogVisible.value = true
  step.value = 1;
}

const joinRoomFun = ()=>{
  dialogVisible.value = true
  step.value = 2;
}

// 进入聊天室
const enterRoomFun = ()=>{
    if(!appStore.websocketStatus){
      ElMessage.error("websocket初始化失败，请稍后再试")
      return
    }
    if(step.value == 1){
      console.log(roomForm);
      
      if(!roomForm.roomNo){
        ElMessage.warning("请输入房间号")
        return
      }
      if(!roomForm.roomName.trim()){
        ElMessage.warning("请输入房间名")
        return
      }
      AQSender.getInstance().sendMsg(
        AQChatMSg.default.MsgCommand.CREATE_ROOM_CMD,
        new AQChatMSg.default.CreateRoomCmd([roomForm.roomNo.toString(),roomForm.roomName.trim()])
      )
    }else if(step.value == 2){
      if(!roomForm.roomNo.trim()){
        ElMessage.warning("请输入房间号")
        return
      }
      
      let msg = new AQChatMSg.default.JoinRoomCmd();
      msg.setRoomno(roomForm.roomNo);
      AQSender.getInstance().sendMsg(
        AQChatMSg.default.MsgCommand.JOIN_ROOM_CMD,msg
      )
    }
  }
</script>
<style>
.pop-start {
  background: #fff;
}
</style>
<style lang="less" scoped>
.pop-start{
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

    .form-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .form-item{
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 30px;
        .el-input{
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
        /deep/ .el-input__wrapper{
          background-color: transparent;
          box-shadow:none;
          outline: none;
          border: none;
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
.im-domain {
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  background: @im-list-bg;
  box-shadow: inset 5px 5px 4px @im-content-shadow1,
              inset -5px -5px 4px @im-content-shadow2;
  display:flex;
  flex-direction: column-reverse;
  align-items: end;
  position: relative;
  .lottie-box{
    width: 70%;
    height: 80%;
    transition: all 0.5s;
    margin-left: 80px;
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    &:hover {
      transform: scale(1.1);
    }
  }
  .option-list{
    display:flex;
    align-items: center;
    justify-content: space-around;
    width: 300px;
    position: absolute;
    top: 100px;
    left: 20px;
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
      &:hover {
        animation: jello-horizontal 0.9s both;
      }
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
  @keyframes jello-horizontal {
    0% {
      transform: scale3d(1, 1, 1);
    }

    30% {
      transform: scale3d(1.25, 0.75, 1);
    }

    40% {
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      transform: scale3d(0.95, 1.05, 1);
    }

    75% {
      transform: scale3d(1.05, 0.95, 1);
    }

    100% {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>