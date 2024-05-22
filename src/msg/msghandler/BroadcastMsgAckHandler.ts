/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:55:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-22 14:53:09
 * @Description: 加入房间通知处理器
 */


import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class BroadcastMsgAckHandler {

    handle(msgAck: AQChatMSg.default.BroadcastMsgAck) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid(),
            userAvatar:msgAck.getUser()?.getUseravatar(),
            userId:msgAck.getUser()?.getUserid(),
            userName:msgAck.getUser()?.getUsername(),
            msg:msgAck.getMsg(),
            msgType:msgAck.getMsgtype(),
            msgId:msgAck.getMsgid(),
            ext:msgAck.getExt()
        }
    }
}