/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 09:30:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-11 09:43:42
 * @Description: 消息同步处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class SyncChatRecordAckHandler {

    handle(msgAck: AQChatMSg.default.SyncChatRecordAck) {
        if(msgAck == null){
            return;
        }
        return {
            chatRecordsList:msgAck.getChatrecordsList()
        }
    }
}