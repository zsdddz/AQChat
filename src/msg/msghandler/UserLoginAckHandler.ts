/*
 * @Author: zsdddz
 * @Date: 2024-04-22 22:46:30
 * @LastEditTime: 2024-04-22 23:04:14
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class UserLoginAckHandler {

    handle(msgAck: AQChatMSg.default.UserLoginAck): void {
        if(msgAck == null){
            return;
        }

        //处理登录后的逻辑
        //...
        console.log(`服务端返回登录ack,userId: ${msgAck.getUserid()},userName:${msgAck.getUsername()},头像地址:${msgAck.getUseravatar()}`)
    }
}