/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-22 20:26:00
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-22 22:44:47
 * @Description: 
 */

import { ref,reactive,onMounted } from "vue"
import multiavatar from '@multiavatar/multiavatar/esm'
import type { FormInstance, FormRules } from 'element-plus'

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
  const reloadRef = ref(null)
  const reloadLoading = ref(true)


  onMounted(()=>{
    userForm.userName =  generateUsername(4)
    initUserAvatar()
  })

  function generateUsername(length:number) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var username = '';
    for (var i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

  // 初始化用户头像
  const initUserAvatar = ()=>{
    userForm.userAvatar = multiavatar(userForm.userName)
  }

  const toStart = ()=>{
    dialogStartVisible.value = true;
    reloadRef.value && reloadRef.value.stop();
    userForm.userName =  generateUsername(4)
    initUserAvatar();
  }

  function reloadFun(){
    // reloadRef.value && reloadRef.value.play();
    reloadLoading.value = false;
    setTimeout(()=>{
      reloadLoading.value = true;
      userForm.userName =  generateUsername(4)
      initUserAvatar();
    },100)
    
  }

  return{
    dialogStartVisible,
    step,
    userFormRef,
    userForm,
    userRules,
    reloadRef,
    reloadLoading,
    toStart,
    reloadFun
  }
}