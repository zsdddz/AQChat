/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:55:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-10 13:04:01
 * @Description: 加入房间通知处理器
 */


import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class JoInRoomNotifyHandler {

    handle(msgAck: AQChatMSg.default.JoinRoomNotify) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid(),
            user:{
                userId:msgAck.getUser()?.getUserid(),
                userName:msgAck.getUser()?.getUsername(),
                userAvatar:msgAck.getUser()?.getUseravatar(),
            }
        }
    }
}