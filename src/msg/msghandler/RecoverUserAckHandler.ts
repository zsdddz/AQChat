/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:55:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-18 17:35:45
 * @Description: 恢复用户连接消息处理器
 */


import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import AQSender from '../AQSender';

export default class RecoverUserAckHandler {

    handle(msgAck: AQChatMSg.default.RecoverUserAck) {
        if(msgAck == null){
            return;
        }
        AQSender.getInstance().heartbeatLoop();
        return {
            roomId:msgAck.getRoom()?.getRoomid(),
            roomName:msgAck.getRoom()?.getRoomname(),
            roomNo:msgAck.getRoom()?.getRoomno(),
            userId:msgAck.getUserid(),
            userName:msgAck.getUsername(),
            userAvatar:msgAck.getUseravatar(),
        }
    }
}