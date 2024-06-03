<template>
  <footer class="footer">
    <!--工具栏-->
    <div class="foot-top">
      <ul>
        <li @click="changeExpression()">
          <img class="icon icon-expression" src="@/assets/images/icon-expression.png" alt="">
        </li>
        <li @click="expressionShow = false">
          <img class="icon icon-image" src="@/assets/images/icon-files.png" alt="">
          <input
            ref="uploadRef"
            class="file-image"
            type="file"
            value=""
            v-on:change="sendFile()"
          />
        </li>
      </ul>
    </div>
    <!--表情包-->
    <div v-click-outside="cancleExpression" v-show="expressionShow" class="emjon">
      <el-scrollbar style="max-height: 100%">
        <ul>
          <li
            v-for="item in expressions"
            :key="item.title"
            :title="item.title"
          >
            <img :src="item.icon" @click="selectIcon(item.icon)" />
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <im-editor
      v-model="imContent"
      ref="imEditorRef"
    ></im-editor>
  </footer>
</template>

<script setup lang="ts">
import ImEditor from "./im-editor.vue";
import { ref,defineExpose,inject } from "vue";
import { OssHelper } from '@/utils/OssHelper';
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb';
import useAppStore from "@/store/modules/app"
import MsgTypeEnum from "@/enums/MsgTypeEnum"
import { ClickOutside as vClickOutside, ElMessage } from "element-plus";
import CustomSnowflake from "@/utils/CustomSnowflake"
import Msg from '@/class/Msg'
import MsgStatusEnum from '@/enums/MsgStatusEnum'

const epoch = +new Date();
const customSnowflake = new CustomSnowflake(1,epoch);
const appStore = useAppStore()
const expressionShow = ref(false)
const imContent = ref('')
const imEditorRef = ref()
const expressions = [
  {
    "title": "[闭嘴]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/闭嘴.png"
  },
  {
    "title": "[尬笑]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/尬笑.png"
  },
  {
    "title": "[害怕]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/害怕.png"
  },
  {
    "title": "[奸笑]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/奸笑.png"
  },
  {
    "title": "[静音]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/静音.png"
  },
  {
    "title": "[开心]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/开心.png"
  },
  {
    "title": "[口罩]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/口罩.png"
  },
  {
    "title": "[哭]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/哭.png"
  },
  {
    "title": "[酷]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/酷.png"
  },
  {
    "title": "[流汗]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/流汗.png"
  },
  {
    "title": "[懵B]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/懵B.png"
  },
  {
    "title": "[迷茫]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/迷茫.png"
  },
  {
    "title": "[面无表情]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/面无表情.png"
  },
  {
    "title": "[魔鬼]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/魔鬼.png"
  },
  {
    "title": "[难过]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/难过.png"
  },
  {
    "title": "[呕吐]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/呕吐.png"
  },
  {
    "title": "[疲惫]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/疲惫.png"
  },
  {
    "title": "[亲吻]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/亲吻.png"
  },
  {
    "title": "[热恋]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/热恋.png"
  },
  {
    "title": "[生病]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/生病.png"
  },
  {
    "title": "[生气]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/生气.png"
  },
  {
    "title": "[受伤]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/受伤.png"
  },
  {
    "title": "[睡觉]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/睡觉.png"
  },
  {
    "title": "[思考]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/思考.png"
  },
  {
    "title": "[天使]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/天使.png"
  },
  {
    "title": "[头晕]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/头晕.png"
  },
  {
    "title": "[吐舌]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/吐舌.png"
  },
  {
    "title": "[笑哭]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/笑哭.png"
  },
  {
    "title": "[斜眼]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/斜眼.png"
  },
  {
    "title": "[眼红]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/眼红.png"
  },
  {
    "title": "[眨眼]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/眨眼.png"
  },
  {
    "title": "[震惊]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/震惊.png"
  },
  {
    "title": "[中毒]",
    "icon": "https://aqchat.oss-cn-shenzhen.aliyuncs.com/emo/中毒.png"
  }
]
const uploadRef = ref(null)
const videoUploadRef = ref(null)
const fileUploadRef = ref(null)

// 检测是否为视频文件
const isVideoType = (str:string) =>{
    return /^video\/\w+/.test(str);
}
// 检测是否为图片文件
const isImgType = (str:string) =>{
    return /^image\/\w+/.test(str);
}
// 切换表情包
const changeExpression = (flag?:undefined)=>{
  expressionShow.value = flag !==undefined ? flag :!expressionShow.value;
}
// 关闭表情包
const cancleExpression = ()=>{
  expressionShow.value = false;
}
// 选择表情
const selectIcon = (icon:string) =>{
  changeExpression();
  let iconContent = `<img src='${icon}' class='emo-image' />`;
  imEditorRef.value.editor.cmd.do("insertHTML", iconContent);
}
// 重新编辑
const rewriteFun = (content:string)=>{
  imEditorRef.value.editor.cmd.do("insertHTML", content);
}
// 发送文件
const sendFile = async ()=>{
  const file =  uploadRef.value && uploadRef.value.files[0]
  console.log(file);
  
  if(!file) {
    ElMessage.error("解析文件异常")
    return;
  }
  let fileType = null;
  if(isImgType(file.type)){
    fileType = MsgTypeEnum.IMAGE
  } else if(isVideoType(file.type)){
    fileType = MsgTypeEnum.VIDEO
  } else {
    fileType = MsgTypeEnum.FILE
  }
  const msgId = customSnowflake.nextId();
  let msgInfo:Msg = {
    user:{
        userId:appStore.userInfo.userId,
        userAvatar:appStore.userInfo.userAvatar,
        userName:appStore.userInfo.userName,
    },
    roomId:appStore.roomInfo.roomId,
    msgId:msgId,
    msgType:fileType,
    msg:null,
    msgStatus:MsgStatusEnum.PENDING,
    ext:file.name
  }
  // 临时转成DataURL虚拟发送
  let reader = new FileReader();
  reader.onload = (e)=> {
    if(!e.target?.result) return;
    msgInfo.msg = e.target.result;
    appStore.sendInfoLocalFun(msgInfo)
    uploadToOss(msgInfo,file)
  };
  reader.readAsDataURL(file);
}
// 上传文件到服务器
const uploadToOss = (msgInfo,file:File)=>{
  AQChatMSg.default.MsgType.VIDEO
  OssHelper.getInstance().init(msgInfo.msgType,()=>{
    OssHelper.getInstance().uploadFile(file)
    .then((res)=>{
      msgInfo.msg = res.url;
      // 上传到Oss成功后再将文件发送到真实网络中
      appStore.sendInfoNetWorkFun(msgInfo)
    }).catch((err)=>{
      ElMessage.error("上传失败,错误为:"+err)
    });
  });
}

defineExpose({changeExpression,rewriteFun})
</script>

<style scoped lang="less">
.footer {
  height: 30%;
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  position: relative;
  border-top: 1px solid rgba(204,204,204,.3);
  .foot-top {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
    }
    
    li {
      margin: 5px 10px;
      position: relative;
      display: flex;
      align-items: center;
      .icon{
        height: 24px;
        width: 24px;
        cursor: pointer;
      }
      .icon-image{
        height: 36px;
        width: 36px;
      }
    }
    .file-image {
      margin-top: 5px;
      z-index: 1;
      position: absolute;
      opacity: 0;
      bottom: 0px;
      left: 0px;
      height: 36px;
      width: 36px;
    }
  }
  .emjon {
    width: 350px;
    height: 245px;
    position: absolute;
    left: 30px;
    top: -262px;
    background: #fff;
    box-shadow: 2px 2px 4px #888888;
    overflow: auto;
    border-radius: 6px;
    padding: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 55px;
        font-size: 28px !important;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease 0s;
      }
      li:hover {
        // box-shadow: 0px 0px 5px #ccc;
        transform: scale(1.2);
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
