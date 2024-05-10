/*
 * @Author: zsdddz
 * @Date: 2024-04-21 00:40:59
 * @LastEditTime: 2024-05-02 13:55:20
 */


import { w3cwebsocket} from 'websocket';
import AQMsgDecoder from './AQMsgDecoder';
import AQMsgEncoder from './AQMsgEncoder';
import ByteBuffer from './codec/ByteBuffer'
import * as AQChatMSg from '../msg/protocol/AQChatMsgProtocol_pb';

const SERVER_HOST = import.meta.env.VITE_SOCKET_API;
var loopTimer:any = null;

export default class AQSender {
    /**
    * 单例对象
    */
    private static _oInstance: AQSender = new AQSender();

    /**
     * WebSocket
     */
    private _oWebSocket: w3cwebsocket | null = null;

    /**
     * 消息编码器
     */
    private readonly _oMsgEncoder: AQMsgEncoder = new AQMsgEncoder();

    /**
     * 消息解码器
     */
    private readonly _oMsgDecoder: AQMsgDecoder = new AQMsgDecoder();

    /**
     * 私有化类默认构造器
     */
    private constructor() {
    }

    /**
     * 获取单例对象
     */
    static getInstance(): AQSender {
        return AQSender._oInstance;
    }

    /**
     * 连接服务器
     * 
     * @param funCallback 回调函数
     */
    connect(funCallback: () => void): void {
        let strURL = `ws://${SERVER_HOST}`;
        console.log(`准备连接服务器, URL = ${strURL}`);

        let oWebSocket = new w3cwebsocket(strURL);
        oWebSocket.binaryType = "arraybuffer";

        // 连接服务器
        oWebSocket.onopen = (): void => {
            console.log(`已连接服务器, URL = ${strURL}`);
            this._oWebSocket = oWebSocket;
            
            if (null != funCallback) {
                funCallback();
            }
        }

        // 异常
        oWebSocket.onerror = (): void => {
            console.error(`连接异常, URL = ${strURL}`);
            this._oWebSocket = null;
        }

        // 断开服务器
        oWebSocket.onclose = (): void => {
            console.warn("服务器连接已关闭");
            this._oWebSocket = null;
        }

        // 收到消息
        oWebSocket.onmessage = (oEvent)=> {
            if (null == oEvent ||
                null == oEvent.data) {
                return;
            }

            //收到的消息是一个字节数组
            let bytebuf = new ByteBuffer(oEvent.data);

            //解包
            let byteBuffer = bytebuf.short().short().unpack();
            //解析bodylen
            let bodyLen = byteBuffer[0];
            //解析command
            let msgCommand = byteBuffer[1];
            if (msgCommand < 0) {
                console.error("从服务端收到无效的消息");
                return;
            }

            let unpack = bytebuf.byteArray(null, bodyLen).unpack();
            let msgBody = unpack[2];

            // 构建消息体
            let oMsgBody = this._oMsgDecoder.decode(msgCommand, msgBody);

            if (null == oMsgBody) {
                console.error(`构建消息体为空, msgCommand = ${msgCommand}`);
                return;
            }

            // console.log(`从服务端收到消息, msgCommand = ${msgCommand}`);

            // 处理消息
            this.onMsgReceived(msgCommand, oMsgBody);
        }
    }

    /**
     * 心跳
     * @param userId
     */
    heartbeatLoop() {
        let loop = () =>{
            if(this._oWebSocket == null){
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

        if (null == this._oWebSocket) {
            console.error("WebSocket 尚未初始化");
            return;
        }

        let msgPack = this._oMsgEncoder.encode(msgCommand, msgBody);
        if (null == msgPack || msgPack.byteLength <= 0) {
            console.error(`字节数组为空, msgCommand = ${msgCommand}`);
            return;
        }

        // console.log(`发送消息, msgCommand = ${msgCommand}`);
        this._oWebSocket.send(msgPack);
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
}