/**
 * 过渡数据
 * Created by JayLen on 2020-11-17 21:55:01.
 */
declare class TransData {
    /**
     * 过渡方式：0-均匀过渡 1-缓动过渡 2-曲线过渡
     */
    transType: number;
    /**
     * 循环方式：0-无(一次) 1-循环 2-一次往返-返回时从头过渡 3-一次往返-返回时从尾过渡 4-循环往返-返回时从头过渡 5-循环往返-返回时从尾过渡
     */
    loopType: number;
    /**
     * 时间类别：0-无() 1-帧数 2-秒数 3-可选择单位
     */
    timeType: number;
    /**
     * 时间单位：0-帧数 1-秒数
     */
    timeUnit: number;
    /**
     * 总时间数(帧数或者秒数)
     */
    totalTime: number;
    /**
     * 缓动方式
     */
    tweenType: number;
    /**
     * 缓动方式名称(如backOut)
     */
    tweenTypeName: string;
    /**
     * 曲线数据
     */
    curveData: any[];
    /**
     * 刷新时间(默认16，表示16毫秒，逐帧刷新)
     */
    refreshInterval: number;
    /**
     * 是否循环
     */
    static isLoop(transData: TransData): boolean;
    /**
     * 是否使用帧
     */
    static isUseFrame(transData: TransData): boolean;
    /**
     * 是否使用时间
     */
    static isUseTime(transData: TransData): boolean;
}
