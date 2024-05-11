<template>
  <div class="im-content">
    <header class="head">
      <span class="name">房间名：{{ appStore.roomInfo.roomName }}</span>
      <span class="room-no">房间号：
      <span id="roomNo" @click="copyRoomNo" title="复制">{{ appStore.roomInfo.roomNo }}</span>
      </span>
    </header>
    <!--聊天内容-->
    <div class="content-win">
      <el-scrollbar style="max-height: 100%" ref="contentScrollbar">
        <template v-for="item in msgList" :key="item.msgId">
          <div v-if="item.msgType == MsgTypeEnum.TIP" class="msg-tip">
            {{ item.msg }}
          </div>
          <div v-else-if="item.user.userId == userInfo.userId" class="mine-box">
            <div class="mine-block">
              <loading
                v-if="item.msgStatus === MsgStatusEnum.PENDING"
                class="mine-load"
              />
              <div v-else-if="item.msgStatus === MsgStatusEnum.REJECTED" class="msg-failed">!</div>
              <div class="info-box">
                <div class="user-name">{{ item.user.userName }}</div>
                <div
                  v-if="item.msgType === MsgTypeEnum.TEXT"
                  class="text-block"
                  v-html="item.msg"
                ></div>
                <img
                  v-else-if="item.msgType === MsgTypeEnum.IMAGE"
                  class="send-image"
                  v-bind:src="item.msg"
                  preview="1"
                />
                <video
                  v-else-if="item.msgType === MsgTypeEnum.VIDEO"
                  class="send-video"
                  width="320"
                  height="240"
                  controls
                >
                  <source :src="item.msg" type="video/mp4" />
                  您的浏览器不支持 HTML5 video 标签。
                </video>
                <audio class="send-video" v-else-if="item.msgType === MsgTypeEnum.VOICE" controls>
                  <source :src="item.msg" type="audio/mpeg" />
                  您的浏览器不支持该音频格式。
                </audio>
                <!-- <div v-else-if="item.msgType">
                  <span class="item.Type == 1 ? 'sendImageError':'sendError'"
                    >!</span
                  >
                </div> -->
              </div>
              <div class="mine-avatar" v-html="item.user.userAvatar"></div>
            </div>
          </div>
          <div v-else class="reciver-box">
            <div class="reciver-block">
              <div class="reciver-avatar" v-html="item.user.userAvatar">
              </div>
              <div class="info-box">
                <div class="user-name">{{ item.user.userName }}</div>
                <div
                  v-if="item.msgType === MsgTypeEnum.TEXT"
                  class="text-block"
                  v-html="item.msg"
                ></div>
                <img
                  v-else-if="item.msgType === MsgTypeEnum.IMAGE"
                  class="send-image"
                  v-bind:src="item.msg"
                  preview="1"
                />
                <video
                  class="send-video"
                  v-else-if="item.msgType === MsgTypeEnum.VIDEO"
                  width="320"
                  height="240"
                  controls
                >
                  <source :src="item.msg" type="video/mp4" />
                  您的浏览器不支持 HTML5 video 标签。
                </video>
                <audio class="send-video" v-else-if="item.msgType === MsgTypeEnum.VOICE" controls>
                  <source :src="item.msg" type="audio/mpeg" />
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
            </div>
          </div>
        </template>
      </el-scrollbar>
    </div>
    <!--聊天框底部-->
    <im-chat></im-chat>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app';
import ImChat from "./im-chat.vue"
import MsgTypeEnum from '../../../enums/MsgTypeEnum'
import MsgStatusEnum from '../../../enums/MsgStatusEnum'
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import { watch } from 'vue'
import Loading from "@/components/Loading.vue"
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const userInfo = appStore.userInfo
let msgList = appStore.msgList

// 监听websocket状态
watch(() => appStore.websocketStatus,(newV)=>{
  if(newV){
    syncChatRecordFun();
  }
})

watch(() => appStore.msgList,(newV)=>{
  msgList = newV;
},{deep:true})

const copyRoomNo = ()=>{
  navigator.clipboard.writeText(appStore.roomInfo.roomNo);
  ElMessage.success("复制成功")
}

// 发送消息同步指令
const syncChatRecordFun = ()=>{
  let syncChatRecord = new AQChatMSg.default.SyncChatRecordCmd();
  syncChatRecord.setRoomid(appStore.roomInfo.roomId);
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.SYNC_CHAT_RECORD_CMD,syncChatRecord
  )
}

</script>

<style lang="less" scoped>
/deep/.emo-image {
  height: 30px;
  width: 30px;
  vertical-align: middle;
  display: inline-block;
}
.im-content {
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  .content-win {
    width: 100%;
    height: 62%;
    background: @im-list-bg;
    box-shadow: inset 5px 5px 4px @im-content-shadow1,
              inset -5px 0px 4px @im-content-shadow2;
    .text-block{
      *{
        white-space: wrap;
      }
    }
    .send-video {
      margin: 0 10px;
    }
    .msg-tip{
      padding: 5px 10px;
      border-radius: 20px;
      margin: 0 auto;
      width: 150px;
      margin: 20px auto;
      font-size: 14px;
      color: #ccc;
    }
    .mine-box{
      display: flex;
      justify-content: end;
      .mine-block {
        margin: 20px 0;
        display: flex;
        position: relative;
        font-size: 16px;
        .info-box{
          margin-right: 10px;
          text-align: right;
          .user-name{
            font-size: 12px;
            color: @txt-color;
            margin-bottom: 6px;
          }
        }
        .mine-load {
          position: absolute;
          left: -30px;
          top: calc(50% + 13px);
          transform: translateY(-50%);
        }
        .msg-failed{
          height: 20px;
          width: 20px;
          background-color: red;
          color: #fff;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
          position: absolute;
          left: -30px;
          top: calc(50% + 13px);
          transform: translateY(-50%);
          cursor: pointer;
        }
        .send-image {
          border-radius: 11px;
          max-width: 200px;
          overflow: hidden;
          max-height: 200px;
          width: 200px;
          height: auto;
          cursor: pointer;
          background-color: #fff;
        }

        .text-block {
          background: @im-txt-bg;
          color: #2d2e2f;
          border-top-left-radius: 0;
          border-bottom-right-radius: 0;
          word-wrap: break-word;
          padding: 15px 15px;
          line-height: 20px;
          font-size: 16px;
          border-radius: 10px;
          position: relative;
          max-width: 500px;
          text-align: left;
        }

        .mine-avatar {
          width: 45px;
          height: 45px;
          float: right;
          margin-right: 15px;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }

    .reciver-box{
      display: flex;
      .reciver-block {
        margin: 20px 0;
        display: flex;
        position: relative;
        .send-image {
          border-radius: 11px;
          max-width: 200px;
          overflow: hidden;
          max-height: 200px;
          width: 200px;
          height: auto;
          cursor: pointer;
          background-color: #fff;
        }
        .reciver-avatar {
          width: 45px;
          height: 45px;
          margin-left: 15px;
        }
        .info-box{
          margin-left: 10px;
          text-align: left;
          .user-name{
            font-size: 12px;
            color: @txt-color;
            margin-bottom: 6px;
          }
          .text-block {
            background: @im-txt-bg;
            color: #2d2e2f;
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            word-wrap: break-word;
            padding: 15px 15px;
            line-height: 20px;
            font-size: 16px;
            border-radius: 10px;
            position: relative;
            max-width: 500px;
            text-align: left;
          }
        }
      }
    }
    
    
  }
  .head {
    height: 8%;
    padding: 0 20px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    .name {
      color: @txt-color;
      font-size: 16px;
    }
    .room-no{
      font-size: 16px;
      margin-left: 20px;
      color: @txt-color;
      span{
        color: @im-primary;
        cursor: pointer;
      }
    }
  }
}
</style>