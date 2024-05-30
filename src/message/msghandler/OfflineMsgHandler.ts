/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:55:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-22 16:00:54
 * @Description: 离线消息处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class OfflineMsgHandler {

    handle(msgAck: AQChatMSg.default.OfflineMsg) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid,
            userId:msgAck.getUser()?.getUserid(),
            userName:msgAck.getUser()?.getUsername(),
        }
    }
}