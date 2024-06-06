/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-30 10:46:05
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-06 10:01:41
 * @Description: 离开房间消息处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class LeaveRoomAckHandler {

    handle(msgAck: AQChatMSg.default.LeaveRoomAck) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid()
        }
    }
}