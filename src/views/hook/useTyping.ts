/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-21 17:45:00
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-21 18:00:10
 * @Description: 打字机
 */

import { ref,Ref,onBeforeUnmount } from "vue"
export default ()=>{

  const index:Ref<number> = ref(0)
  const interval:any = ref(null)
  
  const startTyping = (txt:string,appDesc:Ref<string>) => {
    interval.value = setInterval(() => {
      if (index.value <= txt.length) {
        appDesc.value = txt.substring(0, index.value++);
      } else {
        stopTyping();
      }
    }, 100)
  }

  const stopTyping = ()=>{
    clearInterval(interval.value);
  }

  onBeforeUnmount(()=>{
    clearInterval(interval.value);
  })

  return {
    startTyping
  }
}