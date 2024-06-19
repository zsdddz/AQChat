/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-22 20:26:00
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-19 23:07:35
 * @Description: 
 */

import { ref,reactive,onMounted } from 'vue'
import multiavatar from '@multiavatar/multiavatar/esm'
import type { FormInstance, FormRules } from 'element-plus'
import AQSender from '@/message/AQSender'
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app";
import { ElMessage } from 'element-plus'
import useSocket from "@/hooks/useSocket"
import { useRouter } from 'vue-router'
import AQSender from '@/message/AQSender'
import ChineseName from "@/utils/ChineseName"

export default ()=>{
  interface UserForm {
    userName:string,
    roomId:string,
    userAvatar:string
  }
  const appStore = useAppStore()
  const dialogStartVisible = ref(false)
  const step = ref(1)
  const userFormRef = ref<FormInstance>()
  const userForm = reactive<UserForm>({
    userName:'',
    roomId:'',
    userAvatar:''
  })
  const { initSocketFun } = useSocket()
  const reloadLoading = ref(true)
  const chineseName = new ChineseName();
  const userRules = reactive<FormRules<UserForm>>({
    userName: [
      { required: true, message: '请输入用户昵称', trigger: 'change' },
      { min: 2, max: 4, message: '用户昵称长度2-4', trigger: 'change' },
    ],
  })

  onMounted(()=>{
    // userForm.userName =  generateUsernameFun(4)
    initUserAvatar();
  })

  // 生成随机名
  const generateUsernameFun = (length:number)=>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
  }

  // 初始化用户头像
  const initUserAvatar = ()=>{
    const avatarString = generateUsernameFun(2);
    userForm.userAvatar = multiavatar(avatarString)
    userForm.userName =  chineseName.random();
  }

  // 点击开启
  const toStartFun = ()=>{
    dialogStartVisible.value = true;
    step.value = 1;
    initUserAvatar();
    if(!appStore.websocketStatus){
      initSocketFun();
    }
  }

  // 重新生成用户头像、姓名
  const reloadFun = ()=>{
    reloadLoading.value = false;
    setTimeout(()=>{
      reloadLoading.value = true;
      initUserAvatar();
    },100)
    
  }

  // 进入聊天室
  const enterRoomFun = async ()=>{
    if(!appStore.websocketStatus){
      ElMessage.error("websocket初始化失败，请稍后再试")
      return
    }
    if (!userFormRef.value) return
    await userFormRef.value.validate((valid:any, fields:any) => {
      if (valid) {
        AQSender.getInstance().sendMsg(
          AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
          new AQChatMSg.default.UserLoginCmd([userForm.userName.trim(),userForm.userAvatar])
        );
        setTimeout(()=>{
          appStore.resetRoomInfo();
        })
      } else {
        ElMessage.warning("用户昵称请遵守表单规则")
        console.log('error submit!', fields)
      }
    })
  }

  const createRoomFun = ()=>{
    step.value = 2;
  }

  const joinRoomFun = ()=>{
    step.value = 3;
  }

  return{
    dialogStartVisible,
    step,
    userFormRef,
    userForm,
    reloadLoading,
    userRules,
    toStartFun,
    reloadFun,
    enterRoomFun,
    createRoomFun,
    joinRoomFun
  }
}