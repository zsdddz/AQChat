/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 09:30:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-11 14:49:16
 * @Description: 消息同步处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class SyncChatRecordAckHandler {

    handle(msgAck: AQChatMSg.default.SyncChatRecordAck) {
        if(msgAck == null){
            return;
        }
        const result:AQChatMSg.default.ChatRecord[] = msgAck.getChatrecordsList()
        let list:Array<any> = [];
        result.forEach(x=>{
           let item = {
            user:{
                userId:x.getUser()?.getUserid(),
                userName:x.getUser()?.getUsername(),
                userAvatar:x.getUser()?.getUseravatar(),
            },
            msgId:x.getMsgid(),
            msgType:x.getMsgtype(),
            msg:x.getMessage(),
            // time:x.getCreatetime()
           }
           list.push(item)
        })
        return list;
    }
}