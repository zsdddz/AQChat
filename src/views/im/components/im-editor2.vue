<template>
  <div :height="135" class="edit-box">
    <div class="editor">
      <div class="input-editor" id="imEditor" @keydown.enter="keyDown($event)" @click="onFous" />
    </div>
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
import MsgTypeEnum from "@/enums/MsgTypeEnum"
import useAppStore from "@/store/modules/app"

defineProps<{
  value: string;
  id: string;
  height: number;
  placeholder: string;
}>();

const appStore = useAppStore()
const { proxy }: any = getCurrentInstance();
const editorData = ref('')
const editor = ref<E>()
const showPopover = ref(false)
const { changeExpression } = inject('changeExpression', { changeExpression: (flag)=>{} })

watch(
  () => proxy.value,
  (newVal, oldVal) => {
    if (proxy.value !== editorData.value) {
      editorData.value = proxy.value;
      if (editor.value && editor.value.txt) {
        editor.value.txt.html(editorData.value);
      }
    }
  },{immediate: true,deep: true,}
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
  editor.value.config.onchange = (html:string) => {
    if(html.indexOf('@</p>') != -1){
      console.log("艾特");
    }
    
    editorData.value = html;
  };

  // 上传最多1张
  editor.value.config.uploadImgMaxLength = 1;
  // 添加上传本地图片接口
  editor.value.config.customUploadImg = function (
    files:File,
    insert:Function
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
    appStore.sendInfo(sendContent,MsgTypeEnum.TEXT)
  }
  clear();
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
  border: 1px solid rgba(204,204,204,.5);
  border-radius: 10px;
  overflow: hidden;
  .editor {
    text-align: left;
    height: 66%;
    .input-editor{
      height: 100%;
    }
  }

  /deep/ .w-e-text p{
    margin:0;
    line-height: 22px;
  }
  /deep/ .w-e-text-container .placeholder{
    line-height: 0;
  }

  /deep/ .w-e-toolbar{
    border-bottom:none!important;
    border:none!important;
  }

  /deep/ .w-e-text-container {
    border: none !important;
    height: 100% !important;
    z-index: 10 !important;
    >div {
      // min-height: 120px;
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
