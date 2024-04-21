/*
 * @Author: zsdddz
 * @Date: 2024-04-21 00:53:16
 * @LastEditTime: 2024-04-21 20:14:44
 */
import * as AQChatMSg from '../utils/AQChatMsgProtocol_pb.js';

/**
 * 消息解码器
 */
export default class AQMsgDecoder {

    /**
     * 构建消息体
     * 
     * @param nMsgCode 消息编码
     * @param oUint8Array 字节数组
     * @return 消息体
     */
    decode(msgCommand: number, oUint8Array: Uint8Array): any {
        if (msgCommand < 0 || 
            null == oUint8Array || 
            oUint8Array.byteLength <= 0) {
            return null;
        }

        // 获取消息名称
        let strMsgName = this.getMessageName(msgCommand);
        if (null == strMsgName) {
            console.error(`消息名称为空, msgCommand = ${msgCommand}`);
            return null;
        }
        let oTempArray = strMsgName.split("_");
        strMsgName = "";

        for (let strTemp of oTempArray) {
            strMsgName += strTemp.charAt(0) + strTemp.substr(1).toLowerCase();
        }

        // 获取消息类
        let oMsgClazz = AQChatMSg.default[strMsgName];

        if (null == oMsgClazz || 
            "function" != typeof(oMsgClazz["deserializeBinary"])) {
                console.error(`未找到相关的消息类, msgCode = ${msgCommand}, msgName = ${strMsgName}`);
            return null;
        }

        return oMsgClazz.deserializeBinary(oUint8Array);
    }

    getMessageName(value) {
        for (const key in AQChatMSg.default.MsgCommand) {
          if (AQChatMSg.default.MsgCommand[key] === value) {
            return key;
          }
        }
        return null; 
      }
}
