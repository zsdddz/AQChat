/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-02 12:35:02
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-05-02 13:52:45
 * @Description: 错误消息枚举
 */
enum ExceptionEnum {
  UN_KNOWN = 10000,
  NO_LOGIN = 10001,
  ROOM_EXIST = 10002,
  ROOM_NON_EXIST = 10003,
  ALIBABA_CLOUD_FAIL = 10004,
  MSG_TYPE_ERROR = 10005,
  USER_QUIT = 10006,
  USER_MISMATCH = 10007
}

export default ExceptionEnum