import User from "./User"
import MsgTypeEnum from "../enums/MsgTypeEnum"

export default interface Msg {
  user?:User;
  roomId:number;
  msgId?:number;
  msgType:MsgTypeEnum;
  msg:string;
}