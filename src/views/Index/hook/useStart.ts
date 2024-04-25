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

export default ()=>{

  interface UserForm {
    userName:string,
    userAvatar:string
  }

  const dialogStartVisible = ref(false)
  const step = ref(1)
  const userFormRef = ref<FormInstance>()
  const userForm = reactive<UserForm>({
    userName:'',
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
  let isInitSocket = ref(false)
  const router = useRouter();

  onMounted(()=>{
    userForm.userName =  generateUsernameFun(4)
    initUserAvatar();
  })

  // 初始化websocket
  const initSocketFun = ()=>{
    AQSender.getInstance().connect(()=>{
      console.log("连接成功...");
      isInitSocket.value = true
      let handlerFactory = AQMsgHandlerFactory.getInstance();
      AQSender.getInstance().onMsgReceived = (msgCommand,msgBody) =>{
        const result = handlerFactory.handle(msgCommand,msgBody);
        switch(msgCommand){
          case AQChatMSg.default.MsgCommand.USER_LOGIN_ACK:
            console.log("==登录==");
            console.log(result);
            router.push({
              name:"Main"
            })
            break;
        }
      }
    })
  }

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
    userForm.userAvatar = multiavatar(userForm.userName)
  }

  // 点击开启
  const toStartFun = ()=>{
    dialogStartVisible.value = true;
    userForm.userName =  generateUsernameFun(4);
    initUserAvatar();
    if(!isInitSocket.value){
      initSocketFun();
    }
    
  }

  // 重新生成用户头像、姓名
  const reloadFun = ()=>{
    reloadLoading.value = false;
    setTimeout(()=>{
      reloadLoading.value = true;
      userForm.userName =  generateUsernameFun(4)
      initUserAvatar();
    },100)
    
  }

  // 进入聊天室
  const enterChatFun = ()=>{
    if(!isInitSocket.value) return
    AQSender.getInstance().sendMsg(
      AQChatMSg.default.MsgCommand.USER_LOGIN_CMD,
      new AQChatMSg.default.UserLoginCmd([userForm.userName,userForm.userAvatar])
    );
  }

  return{
    dialogStartVisible,
    step,
    userFormRef,
    userForm,
    userRules,
    reloadLoading,
    isInitSocket,
    toStartFun,
    reloadFun,
    enterChatFun
  }
}