<template>
  <div :height="135" class="edit-box">
    <el-scrollbar style="height: 70%">
      <div class="editor">
        <div id="imEditor" @keydown.enter="keyDown($event)" @click="onFous" />
        <input ref="upload" @change="handleChange" type="file" style="opacity: 0; display: none" />
      </div>
    </el-scrollbar>

    <el-tooltip :visible="showPopover" placement="bottom">
      <template #content>
        <span> 不能发送空白消息 </span>
      </template>
      <el-button type="primary" class="send-btn" title="按enter键发送，按ctrl+enter键换行"
          @click="sendVerify">发送(S)</el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, watch, reactive, onMounted, ref,inject,defineExpose } from "vue";
import E from "wangeditor";
import Msg from "../../../class/Msg"
import MsgTypeEnum from "../../../enums/MsgTypeEnum"
import useAppStore from "@/store/modules/app"
import AQSender from '@/msg/AQSender'
import * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import CustomSnowflake from "@/utils/CustomSnowflake"

defineProps<{
  value: string;
  id: string;
  height: number;
  placeholder: string;
}>();

const appStore = useAppStore()
const userInfo = appStore.userInfo
const roomInfo = appStore.roomInfo
const { proxy }: any = getCurrentInstance();
const editorData = ref('')
const editor = ref<E>()
const showPopover = ref(false)
const { changeExpression } = inject('changeExpression', { changeExpression: (flag)=>{} })
const epoch = +new Date();
const customSnowflake = new CustomSnowflake(1,epoch);

watch(
  () => proxy.value,
  (newVal, oldVal) => {
    if (proxy.value !== editorData.value) {
      editorData.value = proxy.value;
      if (editor.value && editor.value.txt) {
        editor.value.txt.html(editorData.value);
      }
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
watch(
  () => editorData,
  (newVal, oldVal) => {
    proxy.$emit("input", editorData.value);
  }
);

onMounted(() => {
  initEditor();
});

function initEditor() {
  if (editor.value != null) {
    editor.value.destroy();
  }
  editor.value = new E("#imEditor");
  editor.value.config.showFullScreen = false;
  editor.value.config.focus = true;

  // 自定义菜单栏
  editor.value.config.menus = [];

  // change
  editor.value.config.onchange = (html) => {
    editorData.value = html;
  };

  // 上传最多1张
  editor.value.config.uploadImgMaxLength = 1;
  // 添加上传本地图片接口
  editor.value.config.customUploadImg = function (
    files,
    insert
  ) {
    insert(files);
  };
  // 聚焦操作
  setTimeout(() => {
    if(editor.value){
      editor.value.create();
      editor.value.txt.html(editorData.value);
    }
  }, 200)
}
function handleChange() {
  // let file = proxy.$refs.upload.files[0];
}
function browserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = false;
  if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  }
  if (userAgent.indexOf(".NET") > -1) {
    return "IE";
  }
  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    isOpera = true;
    return "Opera";
  } //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera
  ) {
    return "IE";
  } //判断是否IE浏览器
}
// 按下回车键
function keyDown(event: any) {
  if (event.ctrlKey && event.keyCode === 13) {
    if(!editor.value) return
    let len = editor.value?.txt.html()?.trim().length || 0;
    if (browserType() == "IE" || browserType() == "Edge") {
      if (len == 0) {
        editor.value.cmd.do("insertHTML", "<div></div><div></div>");
      } else {
        editor.value.cmd.do("insertHTML", "<div></div>");
      }
    } else if (browserType() == "FF") {
      if (len == 0) {
        editor.value.cmd.do("insertHTML", "<br/><br/><br/><br/>");
      } else {
        editor.value.cmd.do("insertHTML", "<br/><br/>");
      }
    } else {
      if (len == 0) {
        editor.value.cmd.do("insertHTML", "<div><br/></div><div><br/></div>");
      } else {
        editor.value.cmd.do("insertHTML", "<div><br/></div>");
      }
    }
  } else if (event.keyCode === 13) {
    event.preventDefault(); // 阻止浏览器默认换行操作
    sendVerify();
    return false;
  }
}
// 发送校验
function sendVerify() {
  if(!editor.value) return
  const sendContent = editor.value?.txt.html()?.trim() || '';
  if (sendContent.length == 0) {
    showPopover.value = true;
    setTimeout(() => {
      showPopover.value = false;
    }, 1000);
    return;
  } else {
    const msgId = customSnowflake.nextId();
    const msg:Msg = {
      user:{
        userId:userInfo.userId,
        userAvatar:userInfo.userAvatar,
        userName:userInfo.userName,
      },
      roomId:roomInfo.roomId,
      msgId:msgId,
      msgType:MsgTypeEnum.TEXT,
      msg:sendContent,
      msgStatus:false
    }
    appStore.sendInfoLocalFun(msg)
    sendInfoNetWorkFun(msg)
  }
  clear();
}
function sendInfoNetWorkFun(msg:Msg){
  let sendMsg = new AQChatMSg.default.SendMsgCmd();
  sendMsg.setMsgid(msg.msgId);
  sendMsg.setMsgtype(msg.msgType);
  sendMsg.setMsg(msg.msg)
  sendMsg.setRoomid(roomInfo.roomId);
  AQSender.getInstance().sendMsg(
    AQChatMSg.default.MsgCommand.SEND_MSG_CMD,sendMsg
  )
}
// 聚焦取消表情包显示
function onFous() {
  changeExpression(false);
}
// 清空
function clear() {
  editor.value?.txt.clear(); 
}

defineExpose({
  editor
})
</script>

<style scoped lang="less">
.edit-box {
  position: relative;
  width: 100%;
  height: 70%;
  border: 1px solid #ccc;

  .editor {
    text-align: left;
  }

  /deep/ .w-e-text-container {
    border: none !important;
    height: 100% !important;

    >div {
      min-height: 135px;
    }
  }

  .send-btn {
    position: absolute;
    bottom: 5px;
    right: 10px;
    background-color: @im-primary;
  }
}
</style>
