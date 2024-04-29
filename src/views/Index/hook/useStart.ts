/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-22 20:26:00
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-22 22:44:47
 * @Description: 
 */

import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import multiavatar from '@multiavatar/multiavatar/esm'
import type { FormInstance, FormRules } from 'element-plus'
import AQSender from '@/msg/AQSender'
import AQMsgHandlerFactory from '@/msg/msghandler/AQMsgHandlerFactory'
import AQChatMsgProtocol_pb, * as AQChatMSg from '@/msg/protocol/AQChatMsgProtocol_pb'
import useAppStore from "@/store/modules/app";
import { ElMessage } from 'element-plus'

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
  const userRules = reactive<FormRules<UserForm>>({
    userName: [
      { required: true, message: '请输入用户昵称', trigger: 'blur' },
      { min: 3, max: 8, message: '用户昵称长度3—8直接', trigger: 'blur' },
    ],
    userAvatar: [
      {
        required: true,
        message: '请生成用户头像',
        trigger: 'change',
      },
    ],
  })
  const reloadLoading = ref(true)

  onMounted(()=>{
    userForm.userName =  generateUsernameFun(4)
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
  }

  // 点击开启
  const toStartFun = ()=>{
    dialogStartVisible.value = true;
    step.value = 1;
    userForm.userName =  generateUsernameFun(4);
    initUserAvatar();
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
  const enterRoomFun = ()=>{
    if(!appStore.websocketStatus) return
    if(!userForm.userName.trim()){
      ElMessage.warning("请输入用户名")
      return
    }
    if(step.value == 3 && !userForm.roomId.trim()){
      ElMessage.warning("请输入房间名")
      return
    }
    AQSender.getInstance().sendMsg(
      AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
      new AQChatMSg.default.UserLoginCmd([userForm.userName,userForm.userAvatar])
    );
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
    userRules,
    reloadLoading,
    toStartFun,
    reloadFun,
    enterRoomFun,
    createRoomFun,
    joinRoomFun
  }
}