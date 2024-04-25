/*
 * @Author: zsdddz
 * @Date: 2024-04-22 22:36:37
 * @LastEditTime: 2024-04-22 22:59:53
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import GetStsAckHandler from './GetStsAckHandler';
import UserLoginAckHandler from './UserLoginAckHandler';

export default class AQMsgHandlerFactory {
    private static instance: AQMsgHandlerFactory = new AQMsgHandlerFactory()
    private readonly handlerMap: { [command: number]: any } = {};

    static getInstance(){
        return AQMsgHandlerFactory.instance;
    }

    private constructor() {
        let msgCommand = AQChatMSg.default.MsgCommand;
        this.handlerMap[msgCommand.USER_LOGIN_ACK] = new UserLoginAckHandler();
        this.handlerMap[msgCommand.GET_STS_ACK] = new GetStsAckHandler();
    }

    handle(msgCommand:number, msgBody) {
        if(msgCommand<0||null==msgBody){
            return;
        }

        let handler = this.handlerMap[msgCommand];
        if(null == handler){
            console.error(`未找到消息处理器,msgCommand=${msgCommand}`);
            return;
        }
        return handler.handle(msgBody);
    }
}