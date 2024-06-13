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
          <el-scrollbar style="max-height: 100%" ref="contentScrollbarRef">
            <template v-for="(item,index) in msgList" :key="item.msgId">
              <div v-if="item.msgType == MsgTypeEnum.TIP" class="msg-tip msg-box">
                {{ item.msg }}<span v-if="item.msg.indexOf('撤回')!=-1 && item.ext" class='rewrite-box' @click='rewriteFun(item.ext)'>重新编辑</span>
              </div>
              <div v-else-if="item.user.userId == userInfo.userId" class="mine-box msg-box">
                <div class="mine-block">
                  <loading v-if="item.msgStatus === MsgStatusEnum.PENDING" class="mine-load" />
                  <div v-else-if="item.msgStatus === MsgStatusEnum.REJECTED" class="msg-failed" @click="reSendMsgFun(item,index)">!</div>
                  <div class="info-box">
                    <div class="user-name text-ellipsis">{{ item.user.userName }}</div>
                    <div @contextmenu="onContextMenu($event,item)" v-if="item.msgType === MsgTypeEnum.TEXT" class="text-block" v-html="item.msg"></div>
                    <img @contextmenu="onContextMenu($event,item)" v-else-if="item.msgType === MsgTypeEnum.IMAGE" class="send-image" v-bind:src="item.msg"
                      @click="privewImage(item.msg)" preview="1" />
                    <video @contextmenu="onContextMenu($event,item)" v-else-if="item.msgType === MsgTypeEnum.VIDEO" class="send-video" width="320" height="240"
                      controls>
                      <source :src="item.msg" type="video/mp4" />
                      您的浏览器不支持 HTML5 video 标签。
                    </video>
                    <audio @contextmenu="onContextMenu($event,item)" class="send-video" v-else-if="item.msgType === MsgTypeEnum.VOICE" controls>
                      <source :src="item.msg" type="audio/mpeg" />
                      您的浏览器不支持该音频格式。
                    </audio>
                    <div @contextmenu="onContextMenu($event,item)" v-else-if="item.msgType === MsgTypeEnum.FILE" class="file-card">
                      <div class="file-top">
                        <div class="info nowrap-2">
                          {{ item.ext }}
                        </div>
                        <img class="icon-file" src="@/assets/images/icon-file.png" alt="">
                      </div>
                      <div class="file-bottom">文件</div>
                    </div>
                    <!-- <el-dropdown v-else-if="item.msgType === MsgTypeEnum.FILE" trigger="click">
                      
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="downloadFileFun(item.msg, item.ext)">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown> -->
                  </div>
                  <div class="mine-avatar" v-html="item.user.userAvatar"></div>
                </div>
              </div>
              <div v-else class="reciver-box msg-box">
                <div class="reciver-block">
                  <img v-if="item.user.userAvatar.indexOf('png') != -1" class="ai-avatar" :src="item.user.userAvatar" />
                  <div v-else class="reciver-avatar" v-html="item.user.userAvatar">
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
          <div @click="toBottom" v-show="!isIntersecting && newMsgCount > 0" class="new-msg-tip">
            <i class="iconfont icon-down"></i>
            {{ newMsgCount }}条新消息
          </div>
        </div>
        <!--聊天框底部-->
        <im-chat ref="imCharRef"></im-chat>
      </div>
      <im-number/>
      <context-menu
        v-model:show="showMenu"
        :options="optionsComponent"
      >
        <context-menu-item v-if="currentMsg.msgType === MsgTypeEnum.FILE" label="下载" @click="downloadFileFun(currentMsg.msg, currentMsg.ext)" />
        <context-menu-item label="撤回" @click="recallMsgFun" />
      </context-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app';
import ImChat from "./im-chat.vue"
import MsgTypeEnum from '../../../enums/MsgTypeEnum'
import MsgStatusEnum from '../../../enums/MsgStatusEnum'
import AQSender from '@/message/AQSender'
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb'
import { watch, ref, getCurrentInstance } from 'vue'
import Loading from "@/components/Loading.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import ImNumber from "./im-number.vue"
import Msg from '@/class/Msg'

const appStore = useAppStore()
const { proxy }: any = getCurrentInstance();
const userInfo = appStore.userInfo
let msgList = appStore.msgList
// 滚动条Ref
const contentScrollbarRef = ref(null)
// 新消息条数
const newMsgCount = ref(0);
// 观察元素
const watchDom = ref();
// 是否进入相交
const isIntersecting = ref(true)
// 初始化交叉观察器
const watchObject = new IntersectionObserver((entries)=>{
  const entry = entries[0]
  isIntersecting.value = entry.isIntersecting
  if(isIntersecting.value){
    newMsgCount.value = 0;
  }
},{root:null,threshold:0})
const showMenu = ref(false);
// 菜单配置
const optionsComponent =  ref({
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200
})
const currentMsg = ref()
const imCharRef = ref()

// 监听websocket状态
watch(() => appStore.websocketStatus, (newV) => {
  if (newV) {
    syncChatRecordFun();
  }
})

// 更新消息列表
watch(() => appStore.msgList, (newV) => {
  msgList = newV;
}, { deep: true })

// 监听msgId变化，判断是否需要触底
watch(() => appStore.msgId, (newV) => {
  newMsgCount.value +=1 ;
  initIntersectionObserver();
  if(isIntersecting.value){
    toBottom()
  }
})

// 重新编辑
const rewriteFun =(ext:any)=>{
  imCharRef.value && imCharRef.value.rewriteFun(ext)
}

// 右键菜单
const onContextMenu = (e : MouseEvent,msg:any) =>{
  e.preventDefault();
  //显示组件菜单
  showMenu.value = true;
  optionsComponent.value.x = e.x;
  optionsComponent.value.y = e.y;
  currentMsg.value = msg;
}

// 撤回消息
const recallMsgFun = ()=>{
  let model = new AQChatMSg.default.RecallMsgCmd();
  model.setRoomid(appStore.roomInfo.roomId);
  model.setMsgid(currentMsg.value.msgId);
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.RECALL_MSG_CMD, model
  )
}
            
// 绑定/解绑观察对象
const initIntersectionObserver = ()=>{
  const dom = document.querySelectorAll(".msg-box");
  if(dom.length > 0 ){
    if(watchDom.value){
      watchObject.unobserve(watchDom.value)
    }
    watchDom.value = dom[dom.length-1];
    watchObject.observe(watchDom.value)
  }
}

// 消息重发
const reSendMsgFun = (msg:Msg,index:number) =>{
  ElMessageBox.confirm("消息发送失败，是否重发", "系统提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: "warning",
  }).then(res=>{
    appStore.setMsgStatus(index,MsgStatusEnum.PENDING)
    appStore.sendInfoNetWorkFun(msg)
  })
}

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
    contentScrollbarRef.value && contentScrollbarRef.value.setScrollTop(99999)
    newMsgCount.value = 0
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
        position: relative;
        .new-msg-tip{
          height: 30px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #333;
          position: absolute;
          bottom: 20px;
          right: 20px;
          box-shadow: 0px 0px 5px #ccc;
          background-color: #fff;
          z-index: 2;
          border-radius: 20px;
          color:@im-primary;
          cursor: pointer;
          .icon-down{
            margin-right: 2px;
          }
        }
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
          margin: 20px auto;
          font-size: 14px;
          color: #ccc;
        }

        .rewrite-box{
          margin-left: 10px;
          color: @im-primary;
          position: relative;
          cursor: pointer;
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

            .ai-avatar{
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