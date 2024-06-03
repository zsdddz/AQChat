/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-03 11:26:59
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-03 11:29:04
 * @Description: 撤回消息通知消息处理器
 */
import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class RecallMsgNotifyHandler {

    handle(msgAck: AQChatMSg.default.RecallMsgNotify) {
        if(msgAck == null){
            return;
        }
        return {
            userId:msgAck.getUserid(),
            roomId:msgAck.getRoomid(),
            msgId:msgAck.getMsgid(),
        }
    }
}