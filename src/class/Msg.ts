/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-07 15:11:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-22 11:41:14
 * @Description: 消息类
 */
import User from "./User"
import MsgTypeEnum from "../enums/MsgTypeEnum"
import MsgStatusEnum from "../enums/MsgStatusEnum"

export default interface Msg {
  user?:User;
  roomId:string;
  msgId?:string;
  msgType:MsgTypeEnum;
  msg:string;
  msgStatus?:MsgStatusEnum;
  ext?:string;
}