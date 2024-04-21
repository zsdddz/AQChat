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
        var MSG_LEN = 2;
        var MSG_COMMAND = 2;

        let msgBodySerialize = msgBody.serializeBinary();
        var msgLen = MSG_LEN + MSG_COMMAND + msgBodySerialize.length;

        let pack = new ByteBuffer(null, 0);
        pack.short(msgLen).short(msgCommand).byteArray(msgBodySerialize,msgBodySerialize.length)

        return pack.pack(false);
    }
}