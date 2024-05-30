/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 12:55:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-11 09:06:08
 * @Description: 用户退出登录处理器
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class UserLogoutAckHandler {

    handle(msgAck: AQChatMSg.default.UserLogoutAck) {
        if(msgAck == null){
            return;
        }
        return {
            userId:msgAck.getUserid()
        }
    }
}