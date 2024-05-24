/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-18 16:37:59
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-18 17:58:27
 * @Description: 朋友离线消息处理器
 */
import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class OfflineNotifyHandler {

    handle(msgAck: AQChatMSg.default.OfflineNotify) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid(),
            user:{
                userId:msgAck.getUser()?.getUserid(),
                userName:msgAck.getUser()?.getUsername(),
            }
        }
    }
}