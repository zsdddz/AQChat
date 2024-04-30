/*
 * @Author: zsdddz
 * @Date: 2024-04-22 22:46:30
 * @LastEditTime: 2024-04-24 16:54:23
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import AQSender from '../AQSender';

export default class CreateRoomAckHandler {

    handle(msgAck: AQChatMSg.default.CreateRoomAck) {
        if(msgAck == null){
            return;
        }
        AQSender.getInstance().heartbeatLoop();
        return {
            roomId:msgAck.getRoomid(),
            roomNo:msgAck.getRoomno(),
            roomName:msgAck.getRoomname(),
        }
    }
}