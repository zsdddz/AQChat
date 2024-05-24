/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-24 15:35:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-24 16:24:11
 * @Description: 跨标签通信
 */

const channel = new BroadcastChannel('sync-msg');

/**
 * @param {any} msg
 */
export function sendMessage(msg:string) {
  channel.postMessage(msg);
}

export function listenMessage(callback:any) {
  channel.addEventListener('message',(e)=>{
    callback && callback(e);
  })
}

export function removeListenMsg(){
  channel && channel.close();
}