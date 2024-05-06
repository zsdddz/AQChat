<template>
  <footer class="footer">
    <!--工具栏-->
    <div class="foot-top">
      <ul>
        <li @click="changeExpression()">
          <img class="icon icon-expression" src="@/assets/images/icon-expression.png" alt="">
        </li>
        <li @click="expressionShow = false">
          <img class="icon icon-image" src="@/assets/images/icon-image.png" alt="">
          <input
            ref="referenceUpload"
            class="file-image"
            name="customerService"
            type="file"
            value=""
            accept="image/*"
            v-on:change="sendImage"
          />
        </li>
        <li  @click="expressionShow = false">
          <img class="icon icon-video" src="@/assets/images/icon-video.png" alt="">
          <input
            ref="referenceUploadVideo"
            class="file-image"
            name="customerService"
            type="file"
            value=""
            accept="video/*"
            v-on:change="sendVideo"
          />
        </li>
      </ul>
    </div>
    <!--表情包-->
    <div v-show="expressionShow" class="emjon">
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

const expressionShow = ref(false)
const imContent = ref('')
const imEditorRef = ref()
const editor = inject("editor",null)
const expressions = [
  {
    "title": "[闭嘴]",
    "icon": "/emo/闭嘴.png"
  },
  {
    "title": "[尬笑]",
    "icon": "/emo/尬笑.png"
  },
  {
    "title": "[害怕]",
    "icon": "/emo/害怕.png"
  },
  {
    "title": "[奸笑]",
    "icon": "/emo/奸笑.png"
  },
  {
    "title": "[静音]",
    "icon": "/emo/静音.png"
  },
  {
    "title": "[开心]",
    "icon": "/emo/开心.png"
  },
  {
    "title": "[口罩]",
    "icon": "/emo/口罩.png"
  },
  {
    "title": "[哭]",
    "icon": "/emo/哭.png"
  },
  {
    "title": "[酷]",
    "icon": "/emo/酷.png"
  },
  {
    "title": "[流汗]",
    "icon": "/emo/流汗.png"
  },
  {
    "title": "[懵B]",
    "icon": "/emo/懵B.png"
  },
  {
    "title": "[迷茫]",
    "icon": "/emo/迷茫.png"
  },
  {
    "title": "[面无表情]",
    "icon": "/emo/面无表情.png"
  },
  {
    "title": "[魔鬼]",
    "icon": "/emo/魔鬼.png"
  },
  {
    "title": "[难过]",
    "icon": "/emo/难过.png"
  },
  {
    "title": "[呕吐]",
    "icon": "/emo/呕吐.png"
  },
  {
    "title": "[疲惫]",
    "icon": "/emo/疲惫.png"
  },
  {
    "title": "[亲吻]",
    "icon": "/emo/亲吻.png"
  },
  {
    "title": "[热恋]",
    "icon": "/emo/热恋.png"
  },
  {
    "title": "[生病]",
    "icon": "/emo/生病.png"
  },
  {
    "title": "[生气]",
    "icon": "/emo/生气.png"
  },
  {
    "title": "[受伤]",
    "icon": "/emo/受伤.png"
  },
  {
    "title": "[睡觉]",
    "icon": "/emo/睡觉.png"
  },
  {
    "title": "[思考]",
    "icon": "/emo/思考.png"
  },
  {
    "title": "[天使]",
    "icon": "/emo/天使.png"
  },
  {
    "title": "[头晕]",
    "icon": "/emo/头晕.png"
  },
  {
    "title": "[吐舌]",
    "icon": "/emo/吐舌.png"
  },
  {
    "title": "[笑哭]",
    "icon": "/emo/笑哭.png"
  },
  {
    "title": "[斜眼]",
    "icon": "/emo/斜眼.png"
  },
  {
    "title": "[眼红]",
    "icon": "/emo/眼红.png"
  },
  {
    "title": "[眨眼]",
    "icon": "/emo/眨眼.png"
  },
  {
    "title": "[震惊]",
    "icon": "/emo/震惊.png"
  },
  {
    "title": "[中毒]",
    "icon": "/emo/中毒.png"
  }
]

defineExpose({changeExpression})
// 切换表情包
function changeExpression(flag?:undefined) {
  expressionShow.value = flag !==undefined ? flag :!expressionShow.value;
}

// 选择表情
function selectIcon(icon: string) {
  changeExpression();
  let iconContent = `<img src='${icon}' class='emo-image' />`;
  // console.log(imEditorRef.value.editor.cmd.do());
  
  imEditorRef.value.editor.cmd.do("insertHTML", iconContent);
}


//发送图片
async function sendImage(e: any) {
  
}

//发送视频
async function sendVideo(e: any) {
  
}

// 发送校验
function sendVerify(content: string, type: number) {
  // let noCode = +new Date() + "";
  // let reciverId = store.reciver?.FormId || store.reciver.Id;
  // let conversition = new Conversition(
  //   store.sender.Id,
  //   reciverId,
  //   content,
  //   type,
  //   0,
  //   noCode,
  //   "",
  //   false,
  //   store.sender.Avatar
  // );
  // if (store.socket == null) {
  //   // messageBox.warning("socket实例为空");
  //   return;
  // }
  // store.sendLocal(conversition);
  // store.sendInfo(conversition);
}
</script>

<style scoped lang="less">
.footer {
  height: 30%;
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  position: relative;
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
      .icon{
        height: 24px;
        width: 24px;
        cursor: pointer;
      }
    }
    .file-image {
      margin-top: 5px;
      z-index: 1;
      position: absolute;
      opacity: 0;
      bottom: 0px;
      left: 0px;
      height: 40px;
      width: 25px;
    }
  }
  .emjon {
    width: 350px;
    height: 245px;
    position: absolute;
    left: 30px;
    top: -262px;
    background: #fff;
    // box-shadow: 2px 2px 4px #888888;
    overflow: auto;
    border-top-left-radius: 14px;
    border-bottom-right-radius: 14px;
    ul {
      padding: 10px;
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
