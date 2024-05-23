import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class LeaveRoomNotifyHandler {

    handle(msgAck: AQChatMSg.default.LeaveRoomNotify) {
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