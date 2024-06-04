<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-25 09:15:08
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-03 16:44:04
 * @Description: 
-->
# 项目说明

AQChat 一个极速、便捷的匿名在线即时聊天室。

对标游戏后端开发，采用Netty作为通讯框架，支持高并发，高性能的即时通讯。全程无需HTTP协议，支持文本、图片、文件、音频、视频的发送和接收。

## 其他仓库
- 移动端：<a href="https://gitee.com/ghosthhf/aqchat-mobile">AQChat-Mobile</a>
- 后端服务：<a href="https://gitee.com/howcode/aq-chat-server">AQChat-Server</a>

## 项目预览
[AQChat在线预览](https://aqchat.run) 
> 注意：pc端访问默认访问WEB端地址,移动端访问跳转移动端地址

## 项目截图
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433579465.png" width="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433594150.png" width="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433609771.png" width="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433659944.png" width="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433812218.png">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212736.jpg" height="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212748.jpg" height="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212754.jpg" height="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212801.jpg" height="500">


# 部署文档

![戴戴的Linux](https://gitee.com/StephenJose_Dai/dockerhaschat/raw/master/daidailinux.jpg)

- 微信扫一扫二维码关注公众号
- 发送aqchat可获取部署教程

## 更新日志

### 2024.06.03

- ✅ 消息撤回
- ✨ 撤回消息重新编辑

### 2024.05.24

- ✅ 消息提示音
- ✅ 失败消息重发功能
- ✅ 浏览消息时，接收新消息禁止触底，提示新消息按钮
- ✨ 房间成员离线通知
- ✨ 优化发送消息失败的计时逻辑
- ✨ 解决同个浏览器登录多个账号的问题 

### 2024.05.23

- ✅ 房间成员列表
- ✨ 刷新页面仅同步加入房间后的消息
- 🌈 修复房间号输入偶尔失效的问题

### 2024.05.22

- ✅ 发送/下载文件功能
- ✨ 优化发送文件功能
- ✨ 表单自动聚焦输入

### 2024.05.21

- ✨ 取消grid布局
- ✨ 服务器关闭逻辑优化

### 2024.05.18

- ✨ 成员退出房间通知

### 2024.05.17

- ✨ 点击图片消息查看大图
- ✨ 点击表情包以外的地方隐藏表情包

### 2024.05.16

- ✅ 发送图片消息功能
- ✨ 接收新消息时，消息触底

### 2024.05.11

- ✅ 刷新页面恢复用户登录
- ✅ 刷新页面同步聊天信息
- ✅ 消息发送中、发送成功、发送失败的状态修改
- ✨ 退出登录

### 2024.05.10

- ✅ 接收/展示消息
- ✨ 成员加入房间通知

### 2024.05.07

- ✅ 发送消息
- ✅ 高亮/黑暗主题

### 更前

- ✅ 生成用户头像/姓名
- ✅ 表情包+文本的富文本功能
