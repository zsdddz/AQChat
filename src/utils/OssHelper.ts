/*
 * @Author: zsdddz hitd@foxmail.com
 * @Date: 2024-04-25 18:41:38
 * @LastEditors: zsdddz hitd@foxmail.com
 * @LastEditTime: 2024-05-16 18:02:36
 */
import OSS from 'ali-oss';
import AQSender from '../message/AQSender';
import * as AQChatMSg from '../message/protocol/AQChatMsgProtocol_pb';
import CallbackMethodManager from '../message/CallbackMethodManager';

export class OssHelper {
    private static instance: OssHelper = new OssHelper();
    private ossClient: OSS;
    private ossInfo: any;
    private msgType: AQChatMSg.default.MsgType;

    private constructor() {
    }

    //初始化
    init(msgType: AQChatMSg.default.MsgType,callback:Function) {
        //注册获取sts回调函数
        CallbackMethodManager.registerCallback(AQChatMSg.default.MsgCommand.GET_STS_ACK, (res) => { this.setOssInfo(res) });
        CallbackMethodManager.registerCallback(10100, callback);
        AQSender.getInstance().sendMsg(
            AQChatMSg.default.MsgCommand.GET_STS_CMD,
            new AQChatMSg.default.GetStsCmd([msgType])
        )
    }

    //设置oss信息
    setOssInfo(ossInfo: any) {
        if (null == ossInfo) {
            console.error(`aliOss is null,oss初始化失败`);
            return;
        }
        this.ossInfo = ossInfo;
        this.ossClient = new OSS({
            region: ossInfo.region,
            accessKeyId: ossInfo.accessKeyId,
            accessKeySecret: ossInfo.accessKeySecret,
            stsToken: ossInfo.securityToken,
            bucket: ossInfo.bucket,
            endpoint: ossInfo.endpoint,
            secure: true
        });
    }

    //生成上传路径 文件名称（时间戳+随机字符+后缀）
    generateUploadPath(fileName: string): string {
        var len = len || 16;
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        var maxPos = $chars.length;
        var pwd = "";
        // 生成16位随机字符
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        let name = fileName;
        var pos = name.indexOf(".");
        let type = name.substr(pos);
        // 文件名 文件名称（时间戳+随机字符+后缀）
        var fileName = this.ossInfo.uploadPath + "/" + `${new Date().getTime()}` + pwd + type;
        return fileName;
    }

    static getInstance(): OssHelper {
        return this.instance;
    }


    //上传文件
    uploadFile(file: File):Promise<OSS.PutObjectResult> {
        if (null == this.ossClient) {
            console.error('ossClient is null,上传文件错误');
        }
        let uploadPath = this.generateUploadPath(file.name);
        return this.ossClient.put(uploadPath, file);
    }

}