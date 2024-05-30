/*
 * @Author: zsdddz
 * @Date: 2024-04-22 22:46:30
 * @LastEditTime: 2024-04-24 16:54:23
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import AQSender from '../AQSender';

export default class UserLoginAckHandler {

    handle(msgAck: AQChatMSg.default.UserLoginAck) {
        if(msgAck == null){
            return;
        }

        //处理登录后的逻辑
        //...
        // console.log(`服务端返回登录ack,userId: ${msgAck.getUserid()},userName:${msgAck.getUsername()},头像地址:${msgAck.getUseravatar()}`)
        AQSender.getInstance().heartbeatLoop();
        return {
            userId:msgAck.getUserid(),
            userName:msgAck.getUsername(),
            userAvatar:msgAck.getUseravatar(),
        }
    }
}