/*
 * @Author: zsdddz
 * @Date: 2024-04-22 22:36:37
 * @LastEditTime: 2024-06-03 11:30:19
 */

import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';
import GetStsAckHandler from './GetStsAckHandler';
import UserLoginAckHandler from './UserLoginAckHandler';
import CreateRoomAckHandler from './CreateRoomAckHandler';
import JoinRoomAckHandler from './JoinRoomAckHandler';
import RecoverUserAckHandler from './RecoverUserAckHandler';
import JoInRoomNotifyHandler from './JoInRoomNotifyHandler';
import BroadcastMsgAckHandler from './BroadcastMsgAckHandler';
import UserLogoutAckHandler from './UserLogoutAckHandler';
import SyncChatRecordAckHandler from './SyncChatRecordAckHandler';
import SyncRoomMembersAckHandler from './SyncRoomMembersAckHandler';
import SendMsgAckHandler from './SendMsgAckHandler';
import OfflineNotifyHandler from './OfflineNotifyHandler';
import OfflineMsgHandler from './OfflineMsgHandler';
import LeaveRoomNotifyHandler from './LeaveRoomNotifyHandler';
import RecallMsgAckHandler from './RecallMsgAckHandler';
import RecallMsgNotifyHandler from './RecallMsgNotifyHandler';
import ExceptionMsgHandler from './ExceptionMsgHandler';

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
        this.handlerMap[msgCommand.CREATE_ROOM_ACK] = new CreateRoomAckHandler();
        this.handlerMap[msgCommand.JOIN_ROOM_ACK] = new JoinRoomAckHandler();
        this.handlerMap[msgCommand.EXCEPTION_MSG] = new ExceptionMsgHandler();
        this.handlerMap[msgCommand.RECOVER_USER_ACK] = new RecoverUserAckHandler();
        this.handlerMap[msgCommand.JOIN_ROOM_NOTIFY] = new JoInRoomNotifyHandler();
        this.handlerMap[msgCommand.BROADCAST_MSG_ACK] = new BroadcastMsgAckHandler();
        this.handlerMap[msgCommand.USER_LOGOUT_ACK] = new UserLogoutAckHandler();
        this.handlerMap[msgCommand.SYNC_CHAT_RECORD_ACK] = new SyncChatRecordAckHandler();
        this.handlerMap[msgCommand.SYNC_ROOM_MEMBERS_ACK] = new SyncRoomMembersAckHandler();
        this.handlerMap[msgCommand.SEND_MSG_ACK] = new SendMsgAckHandler();
        this.handlerMap[msgCommand.OFFLINE_NOTIFY] = new OfflineNotifyHandler();
        this.handlerMap[msgCommand.OFFLINE_MSG] = new OfflineMsgHandler();
        this.handlerMap[msgCommand.LEAVE_ROOM_NOTIFY] = new LeaveRoomNotifyHandler();
        this.handlerMap[msgCommand.RECALL_MSG_ACK] = new RecallMsgAckHandler();
        this.handlerMap[msgCommand.RECALL_MSG_NOTIFY] = new RecallMsgNotifyHandler();
        this.handlerMap[msgCommand.HEART_BEAT_ACK] = "心跳保活";
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
        if(handler == '心跳保活'){
            return handler;
        }
        return handler.handle(msgBody);
    }
}