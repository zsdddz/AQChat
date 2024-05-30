/*
 * @Author: zsdddz hitd@foxmail.com
 * @Date: 2024-04-25 18:49:47
 * @LastEditors: zsdddz hitd@foxmail.com
 * @LastEditTime: 2024-04-25 19:14:15
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class GetStsAckHandler {
    handle(msgAck: AQChatMSg.default.GetStsAck) {
        if (msgAck == null) {
            return;
        }

        return {
            accessKeyId : msgAck.getAccesskeyid(),
            accessKeySecret : msgAck.getAccesskeysecret(),
            securityToken : msgAck.getSecuritytoken(),
            bucket : msgAck.getBucket(),
            region : msgAck.getRegion(),
            uploadPath : msgAck.getUploadpath(),
            endpoint : msgAck.getEndpoint()
        }
    }
}