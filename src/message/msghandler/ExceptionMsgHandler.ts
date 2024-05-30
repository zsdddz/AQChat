/*
 * @Author: howcode
 * @Date: 2024-04-30 15:54:30
 * @LastEditTime: 2024-04-30 15:54:45
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import AQSender from '../AQSender';

export default class ExceptionMsgHandler {

    handle(msgAck: AQChatMSg.default.ExceptionMsg) {
        if(msgAck == null){
            return;
        }
        return {
            code:msgAck.getCode(),
            msg:msgAck.getMsg()
        }
    }
}