/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 09:30:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-23 16:09:04
 * @Description: 房间用户同步处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class SyncRoomMembersAckHandler {

    handle(msgAck: AQChatMSg.default.SyncRoomMembersAck) {
        if(msgAck == null){
            return;
        }
        const result:AQChatMSg.default.User[] = msgAck.getMembersList();
        let list:Array<any> = [];
        result.forEach(x=>{
           let item = {
            userId:x.getUserid(),
            userName:x.getUsername(),
            userAvatar:x.getUseravatar(),
           }
           list.push(item)
        })
        return list;
    }
}