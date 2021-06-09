/**
 * 该文件为GameCreator编辑器自动生成的代码
 */
/**
 * 材质数据基类
 */
class MaterialData {
    id: number; // 材质编号
    ____timeInfo: {[varName:string]: number} = {}; // 储存过渡的当前时间/帧信息，若同一个材质数据需要重置时间复用，可修改该属性后再重新添加材质
}
/**
 * 材质1-色调变更
 */
class MaterialData1 extends MaterialData {
    id: number = 1;
    r: number = 0; // 红 
    g: number = 0; // 绿 
    b: number = 0; // 蓝 
    gray: number = 0; // 灰度 
    mr: number = 1; // 红曝光 
    mg: number = 1; // 绿曝光 
    mb: number = 1; // 蓝曝光 
    useTime: boolean; // 时间过渡 
    time: string = ""; // 时间设定 
}
/**
 * 材质2-色相
 */
class MaterialData2 extends MaterialData {
    id: number = 2;
    hue: number = 0; // 色相 
}
/**
 * 材质3-模糊
 */
class MaterialData3 extends MaterialData {
    id: number = 3;
    strength: number = 0; // 强度 
}
/**
 * 材质4-外发光
 */
class MaterialData4 extends MaterialData {
    id: number = 4;
    color: string = "#00FF00"; // 颜色 
    blur: number = 2; // 模糊度 
    offsetX: number = 0; // 水平偏移 
    offsetY: number = 0; // 垂直偏移 
}
/**
 * 材质5-滚筒
 */
class MaterialData5 extends MaterialData {
    id: number = 5;
    useTrans: boolean; // 曲率过渡 
    sigma: number = 0.2; // 曲率 
    trans: string = ""; // 曲率过渡 
    aspect: number = 1.7; // 纵横比 
}
/**
 * 材质6-色彩滚筒
 */
class MaterialData6 extends MaterialData {
    id: number = 6;
    useTrans: boolean = false; // 时间过渡 
    time: number = 0; // 时间 
    trans: string = ""; // 时间过渡 
    useTrans1: boolean = false; // 曲率过渡 
    sigma: number = 0.2; // 曲率 
    trans1: string = ""; // 曲率过渡 
    useTrans2: boolean = false; // 强度过渡 
    strength: number = 0.02; // 强度 
    trans2: string = ""; // 强度过渡 
    aspect: number = 1.7; // 纵横比 
}
/**
 * 材质7-正片叠底
 */
class MaterialData7 extends MaterialData {
    id: number = 7;
    tex2: string = ""; // 纹理贴图 
    useTrans: boolean = false; // 时间过渡 
    time: number = 1; // 时间 
    trans: string = ""; // 时间过渡 
}
/**
 * 材质8-辉光
 */
class MaterialData8 extends MaterialData {
    id: number = 8;
    useTrans: boolean = false; // 时间过渡 
    time: number = 0; // 时间 
    trans: string = ""; // 时间过渡 
    zoom: number = 0.5; // 缩放 
    multiplier: number = 0.5; // 倍数 
    centerX: number = 0.5; // 中心点X 
    centerY: number = 0.5; // 中心点Y 
}
/**
 * 材质9-滤色
 */
class MaterialData9 extends MaterialData {
    id: number = 9;
    tex2: string = ""; // 纹理贴图 
    useTrans: boolean = false; // 时间过渡 
    time: number = 0; // 时间 
    trans: string = ""; // 时间过渡 
}
/**
 * 材质10-淡入淡出
 */
class MaterialData10 extends MaterialData {
    id: number = 10;
    mask: string = ""; // 遮罩贴图 
    useTrans: boolean = false; // 时间过渡 
    time: number = 0; // 时间 
    trans: string = ""; // 时间过渡 
    vagueness: number = 0.25; // 模糊 
    invertMask: number = 0; // 反转遮罩 
}
/**
 * 材质11-混合添加
 */
class MaterialData11 extends MaterialData {
    id: number = 11;
    tex2: string = ""; // 纹理贴图 
    useTrans: boolean = false; // 时间过渡 
    time: number = 0; // 时间 
    trans: string = ""; // 时间过渡 
    colorMulR: number = 1; // 色彩倍增r 
    colorMulG: number = 1; // 色彩倍增g 
    colorMulB: number = 1; // 色彩倍增b 
    colorMulA: number = 1; // 色彩倍增a 
    colorAddR: number = 0; // 色彩偏移r 
    colorAddG: number = 0; // 色彩偏移g 
    colorAddB: number = 0; // 色彩偏移b 
    colorAddA: number = 0; // 色彩偏移a 
    invertMask: number = 0; // 反转遮罩 
    alphaFactor: number = 0; // a系数 
}
/**
 * 材质12-马赛克
 */
class MaterialData12 extends MaterialData {
    id: number = 12;
    useTrans: boolean; // 时间过渡 
    trans: string = ""; // 时间过渡 
    pixelSize: number = 64; // 像素尺寸 
}
/**
 * 材质13-波浪
 */
class MaterialData13 extends MaterialData {
    id: number = 13;
    t: string = ""; // 时间过渡 
    amplitude: number = 0.3; // 振幅 
    angularVelocity: number = 10; // 角速度 
    speed: number = 10; // 速度 
}
/**
 * 材质14-花屏闪烁
 */
class MaterialData14 extends MaterialData {
    id: number = 14;
    t: string = ""; // 时间过渡 
    timeScale: number = 1; // 花屏速度 
}
