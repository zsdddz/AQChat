/*
 * @Author: zsdddz
 * @Date: 2024-04-21 00:48:45
 * @LastEditTime: 2024-05-23 21:56:29
 */


import ByteBuffer from './codec/ByteBuffer'

/**
 * 消息编码器
 */
export default class AQMsgEncoder {
    /**
     * 构建字节数组
     * 
     * @param nMsgCode 消息编号
     * @param oMsgBody 消息体
     */
    encode(msgCommand: number, msgBody: any) {
        if (msgCommand < 0 ||
            null == msgBody) {
            return null;
        }
        let msgBodySerialize = msgBody.serializeBinary();
        var msgLen =msgBodySerialize.length;

        let pack = new ByteBuffer(null, 0);
        pack.int32(msgLen).short(msgCommand).byteArray(msgBodySerialize,msgBodySerialize.length)

        return pack.pack(false);
    }
}