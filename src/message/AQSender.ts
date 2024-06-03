/*
 * @Author: zsdddz
 * @Date: 2024-04-21 00:40:59
 * @LastEditTime: 2024-05-30 10:05:21
 */


import { w3cwebsocket} from 'websocket';
import AQMsgDecoder from './AQMsgDecoder';
import AQMsgEncoder from './AQMsgEncoder';
import ByteBuffer from './codec/ByteBuffer'
import * as AQChatMSg from './protocol/AQChatMsgProtocol_pb';

const SERVER_HOST = import.meta.env.VITE_SOCKET_API;
var loopTimer:any = null;

export default class AQSender {
    /**
    * 单例对象
    */
    private static instance: AQSender = new AQSender();

    /**
     * WebSocket
     */
    private webSocket: w3cwebsocket | null = null;

    /**
     * 消息编码器
     */
    private readonly msgEncoder: AQMsgEncoder = new AQMsgEncoder();

    /**
     * 消息解码器
     */
    private readonly msgDecoder: AQMsgDecoder = new AQMsgDecoder();

    /**
     * 私有化类默认构造器
     */
    private constructor() {
    }

    /**
     * 获取单例对象
     */
    static getInstance(): AQSender {
        return AQSender.instance;
    }

    /**
     * 连接服务器
     * 
     * @param funCallback 回调函数
     */
    connect(funCallback: () => void): void {
        let strURL = `${SERVER_HOST}`;
        console.log(`准备连接服务器, URL = ${strURL}`);

        let oWebSocket = new w3cwebsocket(strURL);
        oWebSocket.binaryType = "arraybuffer";

        // 连接服务器
        oWebSocket.onopen = (): void => {
            console.log(`已连接服务器, URL = ${strURL}`);
            this.webSocket = oWebSocket;
            
            if (null != funCallback) {
                funCallback();
            }
        }

        // 异常
        oWebSocket.onerror = (): void => {
            console.error(`连接异常, URL = ${strURL}`);
            this.webSocket = null;
        }

        // 断开服务器
        oWebSocket.onclose = (): void => {
            console.warn("服务器连接已关闭");
            this.webSocket = null;
            this.closeService()
        }

        // 收到消息
        oWebSocket.onmessage = (event)=> {
            if (null == event ||
                null == event.data) {
                return;
            }

            //收到的消息是一个字节数组
            let bytebuf = new ByteBuffer(event.data);

            //解包
            let byteBuffer = bytebuf.int32().short().unpack();
            //解析bodylen
            let bodyLen = byteBuffer[0];
            //解析command
            let msgCommand = byteBuffer[1];
            if (msgCommand < 0 || bodyLen <= 0) {
                console.error("从服务端收到无效的消息");
                return;
            }

            let unpack = bytebuf.byteArray(null, bodyLen).unpack();
            let msgBody = unpack[2];

            // 构建消息体
            let aqMsgBody = this.msgDecoder.decode(msgCommand, msgBody);

            if (null == aqMsgBody) {
                console.error(`构建消息体为空, msgCommand = ${msgCommand}`);
                return;
            }

            // console.log(`从服务端收到消息, msgCommand = ${msgCommand}`);

            // 处理消息
            this.onMsgReceived(msgCommand, aqMsgBody);
        }
    }

    /**
     * 心跳
     * @param userId
     */
    heartbeatLoop() {
        let loop = () =>{
            if(this.webSocket == null){
                console.error("[心跳失败]未连接")
                return;
            }
            console.log("send ping...")
            let pack = new AQChatMSg.default.HeartBeatCmd();
            pack.setPing("AQChat-PING");
            this.sendMsg(AQChatMSg.default.MsgCommand.HEART_BEAT_CMD,pack);
        }
        loopTimer = setInterval(loop, 3000);
    }

    /**
     * 心跳停止
     */
    heartbeatStop(){
        if(loopTimer) clearInterval(loopTimer);
    }

    /**
     * 发送消息
     * 
     * @param msgCommand 消息编号
     * @param msgBody 消息体
     */
    sendMsg(msgCommand: number, msgBody: any): void {
        if (msgCommand < 0 ||
            null == msgBody) {
            return;
        }

        if (null == this.webSocket) {
            console.error("WebSocket 尚未初始化");
            this.closeService();
            return;
        }

        let msgPack = this.msgEncoder.encode(msgCommand, msgBody);
        if (null == msgPack || msgPack.byteLength <= 0) {
            console.error(`字节数组为空, msgCommand = ${msgCommand}`);
            return;
        }

        // console.log(`发送消息, msgCommand = ${msgCommand}`);
        this.webSocket.send(msgPack);
    }

    /**
     * 当收到消息
     * 
     * @param msgCommand 消息编号
     * @param msgBody 消息体
     */
    onMsgReceived(msgCommand: number, msgBody: any): void {
        if (msgCommand < 0 ||
            null == msgBody) {
            return;
        }
    }

    closeService(){}

    close(){
        this.webSocket && this.webSocket.close();
    }
}