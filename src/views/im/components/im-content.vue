<template>
  <div class="im-content">
    <header class="head">
      <span class="name">房间名：{{ appStore.roomInfo.roomName }}</span>
      <span class="room-no">房间号：
        <span id="roomNo" @click="copyRoomNo" title="复制">{{ appStore.roomInfo.roomNo }}</span>
      </span>
      <span @click="leaveRoomFun" title="离开当前房间" class="offline">离开</span>
    </header>
    <div class="chat-main">
      <div class="main">
        <!--聊天内容-->
        <div class="content-win">
          <el-scrollbar style="max-height: 100%" ref="contentScrollbar">
            <template v-for="item in msgList" :key="item.msgId">
              <div v-if="item.msgType == MsgTypeEnum.TIP" class="msg-tip">
                {{ item.msg }}
              </div>
              <div v-else-if="item.user.userId == userInfo.userId" class="mine-box">
                <div class="mine-block">
                  <loading v-if="item.msgStatus === MsgStatusEnum.PENDING" class="mine-load" />
                  <div v-else-if="item.msgStatus === MsgStatusEnum.REJECTED" class="msg-failed">!</div>
                  <div class="info-box">
                    <div class="user-name text-ellipsis">{{ item.user.userName }}</div>
                    <div v-if="item.msgType === MsgTypeEnum.TEXT" class="text-block" v-html="item.msg"></div>
                    <img v-else-if="item.msgType === MsgTypeEnum.IMAGE" class="send-image" v-bind:src="item.msg"
                      @click="privewImage(item.msg)" preview="1" />
                    <video v-else-if="item.msgType === MsgTypeEnum.VIDEO" class="send-video" width="320" height="240"
                      controls>
                      <source :src="item.msg" type="video/mp4" />
                      您的浏览器不支持 HTML5 video 标签。
                    </video>
                    <audio class="send-video" v-else-if="item.msgType === MsgTypeEnum.VOICE" controls>
                      <source :src="item.msg" type="audio/mpeg" />
                      您的浏览器不支持该音频格式。
                    </audio>
                    <el-dropdown v-else-if="item.msgType === MsgTypeEnum.FILE" trigger="click">
                      <div class="file-card">
                        <div class="file-top">
                          <div class="info nowrap-2">
                            {{ item.ext }}
                          </div>
                          <img class="icon-file" src="@/assets/images/icon-file.png" alt="">
                        </div>
                        <div class="file-bottom">文件</div>
                      </div>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="downloadFileFun(item.msg, item.ext)">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                  <div class="mine-avatar" v-html="item.user.userAvatar"></div>
                </div>
              </div>
              <div v-else class="reciver-box">
                <div class="reciver-block">
                  <div class="reciver-avatar" v-html="item.user.userAvatar">
                  </div>
                  <div class="info-box">
                    <div class="user-name text-ellipsis">{{ item.user.userName }}</div>
                    <div v-if="item.msgType === MsgTypeEnum.TEXT" class="text-block" v-html="item.msg"></div>
                    <img v-else-if="item.msgType === MsgTypeEnum.IMAGE" class="send-image" v-bind:src="item.msg"
                      @click="privewImage(item.msg)" preview="1" />
                    <video class="send-video" v-else-if="item.msgType === MsgTypeEnum.VIDEO" width="320" height="240"
                      controls>
                      <source :src="item.msg" type="video/mp4" />
                      您的浏览器不支持 HTML5 video 标签。
                    </video>
                    <audio class="send-video" v-else-if="item.msgType === MsgTypeEnum.VOICE" controls>
                      <source :src="item.msg" type="audio/mpeg" />
                      您的浏览器不支持该音频格式。
                    </audio>
                    <el-dropdown v-else-if="item.msgType === MsgTypeEnum.FILE" trigger="click">
                      <div class="file-card">
                        <div class="file-top">
                          <div class="info nowrap-2">
                            {{ item.ext }}
                          </div>
                          <img class="icon-file" src="@/assets/images/icon-file.png" alt="">
                        </div>
                        <div class="file-bottom">文件</div>
                      </div>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="downloadFileFun(item.msg, item.ext)">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </template>
          </el-scrollbar>
        </div>
        <!--聊天框底部-->
        <im-chat></im-chat>
      </div>
      <im-number/>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app';
import ImChat from "./im-chat.vue"
import MsgTypeEnum from '../../../enums/MsgTypeEnum'
import MsgStatusEnum from '../../../enums/MsgStatusEnum'
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import { watch, ref, getCurrentInstance } from 'vue'
import Loading from "@/components/Loading.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import ImNumber from "./im-number.vue"

const appStore = useAppStore()
const { proxy }: any = getCurrentInstance();
const userInfo = appStore.userInfo
let msgList = appStore.msgList
const contentScrollbar = ref(null)

// 监听websocket状态
watch(() => appStore.websocketStatus, (newV) => {
  if (newV) {
    syncChatRecordFun();
  }
})

watch(() => appStore.msgList, (newV) => {
  msgList = newV;
  toBottom()
}, { deep: true })

// 下载文件
const downloadFileFun = (url: string, fileName: string) => {
  const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = () => {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}

// 离开房间
const leaveRoomFun = () => {
  ElMessageBox.confirm("确认离开房间？", "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  }).then(res => {
    let model = new AQChatMSg.default.LeaveRoomCmd();
    model.setRoomid(appStore.roomInfo.roomId);
    AQSender.getInstance().sendMsg(
      AQChatMSg.default.MsgCommand.LEAVE_ROOM_CMD, model
    )
    setTimeout(() => {
      appStore.resetRoomInfo();
    }, 100)
  })
}

//查看大图
const privewImage = (img: string) => {
  let images = [img];
  proxy.$viewerApi({
    images: images,
  });
}

// 复制房间号
const copyRoomNo = () => {
  navigator.clipboard.writeText(appStore.roomInfo.roomNo);
  ElMessage.success("复制成功")
}

// 发送消息同步指令
const syncChatRecordFun = () => {
  let syncChatRecord = new AQChatMSg.default.SyncChatRecordCmd();
  syncChatRecord.setRoomid(appStore.roomInfo.roomId);
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.SYNC_CHAT_RECORD_CMD, syncChatRecord
  )
}

// 滚动底部
const toBottom = () => {
  setTimeout(() => {
    contentScrollbar.value && contentScrollbar.value.setScrollTop(99999)
  }, 100)
}

</script>

<style lang="less" scoped>
.im-content {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background: @im-content-bg2;
  overflow: hidden;
  .head {
    height: 7%;
    display: flex;
    width: 100%;
    justify-content: center;
    background: @im-bg1;
    color: @im-head-txt;
    position: relative;

    .offline {
      cursor: pointer;
      position: absolute;
      right: 20px;
      color: #f40909;
    }

    .name {
      font-size: 16px;
    }

    .room-no {
      font-size: 16px;
      margin-left: 20px;

      span {
        color: @im-primary;
        cursor: pointer;
      }
    }
  }
  .chat-main {
    width: 100%;
    height: calc(100% - 7%);
    display: flex;
    .main {
      width: 80%;
      height: 100%;
      .content-win {
        width: 100%;
        height: 70%;

        .text-block {
          * {
            white-space: wrap;
          }
        }

        .send-video {
          margin: 0 10px;
        }

        .msg-tip {
          padding: 5px 10px;
          border-radius: 20px;
          margin: 0 auto;
          width: 150px;
          margin: 20px auto;
          font-size: 14px;
          color: #ccc;
        }

        .file-card {
          width: 190px;
          height: 80px;
          border-radius: 4px;
          background-color: @file-card-bg;
          cursor: pointer;

          &:focus-visible {
            outline: none;
          }

          .file-top {
            padding: 5px;
            height: calc(100% - 25px);
            display: flex;
            align-items: center;
            justify-content: space-around;

            .info {
              width: calc(100% - 50px);
              font-size: 14px;
              color: @file-card-txt;
              text-align: left;
              line-height: 20px;
            }

            .icon-file {
              width: 40px;
              height: auto;
            }
          }

          .file-bottom {
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            color: @file-card-desc;
            text-align: left;
            padding-left: 5px;
            border-top: 1px solid rgba(231, 231, 231, .5);
          }
        }

        .mine-box {
          display: flex;
          justify-content: end;

          .mine-block {
            margin: 20px 0;
            display: flex;
            position: relative;
            font-size: 16px;

            .info-box {
              margin-right: 10px;
              text-align: right;
              position: relative;
              padding-top: 20px;
              .user-name {
                font-size: 12px;
                color: @txt-color;
                position: absolute;
                right: 0;
                top: 0;
                width: 200px;
              }
            }

            .mine-load {
              position: absolute;
              left: -30px;
              top: calc(50% + 13px);
              transform: translateY(-50%);
            }

            .msg-failed {
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

            .mine-file {}

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

        .reciver-box {
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

            .info-box {
              margin-left: 10px;
              text-align: left;
              position: relative;
              padding-top: 20px;
              .user-name {
                font-size: 12px;
                color: @txt-color;
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
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
    }
  }

}
/deep/.emo-image {
  height: 30px;
  width: 30px;
  vertical-align: middle;
  display: inline-block;
}
</style>