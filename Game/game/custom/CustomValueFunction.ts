/**
 * 自定义常用函数
 * Created by 黑暗之神KDS on 2020-09-09 19:47:24.
 */
module CustomValueFunction {
    /**
     * 当前累计毫秒数
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f1(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return Date.now() - ProjectGame.gameStartTime.getTime();
    }
    /**
     * 当前累计秒数
     */
    export function f2(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 1000);
    }
    /**
     * 当前累计分钟数
     */
    export function f3(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 60000);
    }
    /**
     * 当前累计时数
     */
    export function f4(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 3600000);
    }
    /**
     * 当前累计天数
     */
    export function f5(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 86400000);
    }
    /**
     * 当前的秒(0~59)
     */
    export function f6(trigger: CommandTrigger, triggerPlayer: ProjectPlayer): number {
        return new Date().getSeconds();
    }
    /**
     * 当前的分(0~59)
     */
    export function f7(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getMinutes();
    }
    /**
     * 当前的时(0~23)
     */
    export function f8(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getHours();
    }
    /**
     * 当前星期的天数(1~7)
     */
    export function f9(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getDay();
    }
    /**
     * 当前月的天数(1~N)
     */
    export function f10(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getDate();
    }
    /**
     * 当前的月份(1~12)
     */
    export function f11(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getMonth() + 1;
    }
    /**
     * 当前的年份
     */
    export function f12(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return new Date().getFullYear();
    }
    /**
     * 当前存档编号
     */
    export function f13(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return GUI_SaveFileManager.currentSveFileIndexInfo ? GUI_SaveFileManager.currentSveFileIndexInfo.id : 0;
    }
    /**
     * 玩家提交信息来的输入值-0 数组中第一个元素的值
     */
    export function f14(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return trigger.inputMessage[0];
    }
    /**
     * 玩家提交信息来的输入值-1 数组中第二个元素的值
     */
    export function f15(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return trigger.inputMessage[1];
    }
    /**
     * 玩家提交信息来的输入值-2 数组中第三个元素的值
     */
    export function f16(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return trigger.inputMessage[2];
    }
    /**
     * 玩家提交信息来的输入值-3 数组中第四个元素的值
     */
    export function f17(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return trigger.inputMessage[3];
    }
    /**
     * 玩家提交信息来的输入值-4 数组中第五个元素的值
     */
    export function f18(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return trigger.inputMessage[4];
    }
    /**
     * 当前游戏帧
     */
    export function f19(trigger: CommandTrigger, triggerPlayer: ProjectPlayer) {
        return __fCount;
    }
}