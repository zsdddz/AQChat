/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 10:05:46
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-11 14:30:35
 * @Description: 发送消息回调处理器
 */
import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class SendMsgAckHandler {

    handle(msgAck: AQChatMSg.default.SendMsgAck) {
        if(msgAck == null){
            return;
        }
        return {
            msgId:msgAck.getMsgid(),
            roomId:msgAck.getRoomid(),
            status:msgAck.getStatus(),
            userId:msgAck.getUserid()
        }
    }
}