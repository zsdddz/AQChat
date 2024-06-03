/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-03 11:05:36
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-03 11:16:13
 * @Description: 消息撤回消息处理器
 */
import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class RecallMsgAckHandler {

    handle(msgAck: AQChatMSg.default.RecallMsgAck) {
        if(msgAck == null){
            return;
        }
        return {
            userId:msgAck.getUserid(),
            roomId:msgAck.getRoomid(),
            msgId:msgAck.getMsgid(),
            status:msgAck.getStatus(),
        }
    }
}