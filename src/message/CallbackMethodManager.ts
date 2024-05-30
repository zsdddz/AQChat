/*
 * @Author: zsdddz hitd@foxmail.com
 * @Date: 2024-04-25 19:33:50
 * @LastEditors: zsdddz hitd@foxmail.com
 * @LastEditTime: 2024-04-25 19:35:26
 */
export default class CallbackMethodManager {

    //回调函数集合  command:回调函数
    private static callbackMap: { [command: number]: Function } = {};

    //注册回调函数
    static registerCallback(command: number, callback: Function) {
        this.callbackMap[command] = callback;
    }

    //获取回调函数
    static getCallback(command: number) {
        return this.callbackMap[command];
    }

}