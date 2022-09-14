/**
 * 该文件为GameCreator编辑器自动生成的代码
 */
/**
* 自定义命令 1-预加载资源
*/
class CustomCommandParams_1 {
    preloadAssets: DataStructure_preloadAsset[]; // = [];
    isShowLoadingUI: boolean; // = false; 显示加载界面
    compName: string; // = ""; 组件的名字
    compAttributeName: string; // = ""; 组件的属性变量名
    bindingUI: number; // = 0; 绑定的界面
}
/**
* 自定义命令 2-等待玩家输入文本
*/
class CustomCommandParams_2 {
    inputUI: number; // = 8; 弹出的界面
    defText: string; // = ""; 默认文本
    useVar: number; // = 0;
    defTextVarID: number; // = 1; 默认文本
}
/**
* 自定义命令 3-按键事件
*/
class CustomCommandParams_3 {
    type: number; // = 0; 生命周期
    isMulKey: number; // = 0;
    recordListen: boolean; // = false; 记录监听
    key: number; // = 0; 按键
    systemKey: number; // = 0; 系统按键
    evType: number; // = 0; 类别
    evType2: number; // = 0; 类别
    keys: number[]; // = [];
    systemKeys: number[]; // = [];
    CTRL: boolean; // = false;
    SHIFT: boolean; // = false;
    ALT: boolean; // = false;
    eventPage: string; // = ""; 执行
    recordListenVar: number; // = 1; 记录至
}
/**
* 自定义命令 4-鼠标事件
*/
class CustomCommandParams_4 {
    type: number; // = 0; 生命周期
    mouseType: number; // = 0; 鼠标
    eventPage: string; // = ""; 执行
    recordListen: boolean; // = false; 记录监听
    recordListenVar: number; // = 1; 记录至
}
/**
* 自定义命令 5-取消按键事件
*/
class CustomCommandParams_5 {
    recordListenVar: number; // = 1; 指定监听按键的标识
}
/**
* 自定义命令 6-取消鼠标事件
*/
class CustomCommandParams_6 {
    recordListenVar: number; // = 1; 指定监听鼠标的标识
}
/**
* 自定义命令 7-获得CG鉴赏图片
*/
class CustomCommandParams_7 {
    cg: number; // = 1; CG鉴赏图
}
/**
* 自定义命令 1001-跳过当前对话
*/
class CustomCommandParams_1001 {
}
/**
* 自定义命令 1002-显示全部对话文本
*/
class CustomCommandParams_1002 {
}
/**
* 自定义命令 2001-
*/
class CustomCommandParams_2001 {
}
/**
* 自定义命令 3001-显示图片
*/
class CustomCommandParams_3001 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    image: string; // = ""; 图片
    imageVar: number; // = 1; 图片
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpWidth: number; // = 100; 宽度
    dpWidthVar: number; // = 1; 宽度
    dpHeight: number; // = 100; 高度
    dpHeightVar: number; // = 1; 高度
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    flip: boolean; // = false; 水平翻转
    pivotType: number; // = 0; 轴心点
    blendMode: number; // = 0; 混合模式
    refImageEnabled: boolean; // = false; 模拟参考图
    higher: boolean; // = false; 高级设定
    refImage: string; // = ""; 参考图
    imageUseVar: boolean; // = false; 图片地址使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义命令 3002-移动图片
*/
class CustomCommandParams_3002 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpWidth: number; // = 100; 宽度
    dpWidthVar: number; // = 1; 宽度
    dpHeight: number; // = 100; 高度
    dpHeightVar: number; // = 1; 高度
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    flip: boolean; // = false; 水平翻转
    pivotType: number; // = 0; 轴心点
    blendMode: number; // = 0; 混合模式
    refImageEnabled: boolean; // = false; 模拟参考图
    higher: boolean; // = false; 高级设定
    refImage: string; // = ""; 参考图
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义命令 3003-设置图像层镜头
*/
class CustomCommandParams_3003 {
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    cameraX: number; // = 0; x
    cameraXVar: number; // = 1; x
    cameraY: number; // = 0; y
    cameraYVar: number; // = 1; y
    cameraZ: number; // = 0; z
    cameraZVar: number; // = 1; z
    cameraRotation: number; // = 0; 旋转度
    cameraRotationVar: number; // = 1; 旋转度
    higher: boolean; // = false; 高级设定
    xUseVar: boolean; // = false; 相机水平坐标使用变量
    yUseVar: boolean; // = false; 相机垂直坐标使用变量
    zUseVar: boolean; // = false; 相机深度坐标使用变量
    roUseVar: boolean; // = false; 相机旋转度使用变量
}
/**
* 自定义命令 3004-显示动画
*/
class CustomCommandParams_3004 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    animation: number; // = 1; 动画
    animationVar: number; // = 1; 动画
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    playType: number; // = 2; 播放模式
    silentMode: boolean; // = false; 静音模式
    showHitEffect: boolean; // = true; 命中模式
    playFps: number; // = 20; 帧率
    aniFrame: number; // = 1; 起始帧
    aniFrameVar: number; // = 1; 起始帧
    refObjectEnabled: boolean; // = false; 模拟参考动画
    higher: boolean; // = false; 高级设定
    refObject: number; // = 1; 参考动画
    objectUseVar: boolean; // = false; 动画使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 缩放使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    aniFrameUseVar: boolean; // = false; 起始帧使用变量
}
/**
* 自定义命令 3005-移动动画
*/
class CustomCommandParams_3005 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    timeType: number; // = 1; 变更方式
    trans: string; // = ""; 过渡
    time: number; // = 30; 持续帧数
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    changeFrame: boolean; // = false; 设置帧
    aniFrame: number; // = 1; 帧
    aniFrameVar: number; // = 1; 帧
    refObjectEnabled: boolean; // = false; 模拟参考动画
    higher: boolean; // = false; 高级设定
    refObject: number; // = 0; 参考动画
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    frameUseVar: boolean; // = false; 设置帧使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义命令 3006-显示立绘
*/
class CustomCommandParams_3006 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    standAvatar: number; // = 1; 立绘
    standAvatarVar: number; // = 1; 立绘
    expression: number; // = 1; 表情
    expressionVar: number; // = 1; 表情
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    playType: number; // = 1; 播放模式
    avatarFPS: number; // = 20; 帧率
    avatarFrame: number; // = 1; 起始帧
    avatarFrameVar: number; // = 1; 起始帧
    refObjectEnabled: boolean; // = false; 模拟参考立绘
    higher: boolean; // = false; 高级设定
    refObject: number; // = 1; 参考立绘
    objectUseVar: boolean; // = false; 立绘使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 缩放使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    frameUseVar: boolean; // = false; 起始帧使用变量
    expressionUseVar: boolean; // = false; 表情使用变量
}
/**
* 自定义命令 3007-移动立绘
*/
class CustomCommandParams_3007 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    changeExpression: boolean; // = false; 设置表情
    expression: number; // = 1; 表情
    expressionVar: number; // = 1; 表情
    changeFrame: boolean; // = false; 设置帧
    avatarFrame: number; // = 1; 帧
    avatarFrameVar: number; // = 1; 帧
    refObjectEnabled: boolean; // = false; 模拟参考立绘
    higher: boolean; // = false; 高级设定
    refObject: number; // = 0; 参考立绘
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    expressionUseVar: boolean; // = false; 表情使用变量
    frameUseVar: boolean; // = false; 起始帧使用变量
}
/**
* 自定义命令 3008-消除图像
*/
class CustomCommandParams_3008 {
    passageIDUseVar: boolean; // = false; 使用变量指定编号
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
}
/**
* 自定义命令 3009-自动旋转
*/
class CustomCommandParams_3009 {
    passageIDUseVar: boolean; // = false; 使用变量指定编号
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    rotation: number; // = 5; 每帧旋转度
}
/**
* 自定义命令 3010-显示界面
*/
class CustomCommandParams_3010 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    setAttr: boolean; // = true; 设置属性
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    refObjectEnabled: boolean; // = false; 模拟参考界面
    higher: boolean; // = false; 高级设定
    refObject: number; // = 1; 参考界面
    objectUseVar: boolean; // = false; 界面使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 缩放使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义命令 3011-移动界面
*/
class CustomCommandParams_3011 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    refObjectEnabled: boolean; // = false; 模拟参考界面
    higher: boolean; // = false; 高级设定
    refObject: number; // = 0; 参考界面
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    objectUseVar: boolean; // = false; 界面使用变量
}
/**
* 自定义命令 3012-关闭界面
*/
class CustomCommandParams_3012 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    passageIDUseVar: boolean; // = false; 编号使用变量
    objectUseVar: boolean; // = false; 界面使用变量
}
/**
* 自定义命令 3013-移动界面内的元件
*/
class CustomCommandParams_3013 {
    changeUIAttr: any; // 修改界面元件
}
/**
* 自定义命令 3014-添加材质
*/
class CustomCommandParams_3014 {
    targetType: number; // = 0; 目标类型
    passageIDUseVar: boolean; // = false; 使用变量指定编号
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    objectUseVar: boolean; // = false; 界面使用变量
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    materialData: { materials: MaterialData[] }[]; // 材质
}
/**
* 自定义命令 3015-更改材质
*/
class CustomCommandParams_3015 {
    targetType: number; // = 0; 目标类型
    passageIDUseVar: boolean; // = false; 使用变量指定编号
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    objectUseVar: boolean; // = false; 界面使用变量
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    materialData: { materials: MaterialData[] }[]; // 材质
}
/**
* 自定义命令 3016-删除材质
*/
class CustomCommandParams_3016 {
    targetType: number; // = 0; 目标类型
    passageIDUseVar: boolean; // = false; 使用变量指定编号
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    objectUseVar: boolean; // = false; 界面使用变量
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    clearType: number; // = 0; 删除方式
    materialID: number; // = 1; 材质
    materialPassage: number; // = 0; 材质通道
}
/**
* 自定义命令 3017-更换场景
*/
class CustomCommandParams_3017 {
    scene: number; // = 0; 场景
}
/**
* 自定义命令 3018-显示视频
*/
class CustomCommandParams_3018 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    video: string; // = ""; 视频
    videoVar: number; // = 1; 视频
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpWidth: number; // = 100; 宽度
    dpWidthVar: number; // = 1; 宽度
    dpHeight: number; // = 100; 高度
    dpHeightVar: number; // = 1; 高度
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    playType: number; // = 0; 播放模式
    flip: boolean; // = false; 水平翻转
    muted: boolean; // = false; 静音模式
    loop: boolean; // = true; 循环播放
    volume: number; // = 1; 音量
    currentTime: number; // = 0; 起始时间
    currentTimeVar: number; // = 1; 起始时间
    playbackRate: number; // = 1; 播放速率
    higher: boolean; // = false; 高级设定
    objectUseVar: boolean; // = false; 视频使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    currentTimeUseVar: boolean; // = false; 起始时间使用变量
}
/**
* 自定义命令 3019-移动视频
*/
class CustomCommandParams_3019 {
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpWidth: number; // = 100; 宽度
    dpWidthVar: number; // = 1; 宽度
    dpHeight: number; // = 100; 高度
    dpHeightVar: number; // = 1; 高度
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    flip: boolean; // = false; 水平翻转
    higher: boolean; // = false; 高级设定
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义命令 4001-全屏设置
*/
class CustomCommandParams_4001 {
    fullScreen: boolean; // = false; 全屏化
}
/**
* 自定义命令 4002-
*/
class CustomCommandParams_4002 {
}
/**
* 自定义命令 4003-
*/
class CustomCommandParams_4003 {
}
/**
* 自定义命令 4004-
*/
class CustomCommandParams_4004 {
}
/**
* 自定义命令 4005-开始游戏
*/
class CustomCommandParams_4005 {
}
/**
* 自定义命令 4006-存档
*/
class CustomCommandParams_4006 {
    saveType: number; // = 0; 档案类别
    saveID: number; // = 1; 编号
    silenceMode: boolean; // = false; 静默执行
}
/**
* 自定义命令 4007-
*/
class CustomCommandParams_4007 {
}
/**
* 自定义命令 4008-返回标题界面
*/
class CustomCommandParams_4008 {
}
/**
* 自定义命令 4009-
*/
class CustomCommandParams_4009 {
}
/**
* 自定义命令 4010-
*/
class CustomCommandParams_4010 {
}
/**
* 自定义命令 4011-关闭游戏窗口
*/
class CustomCommandParams_4011 {
}
/**
* 自定义命令 4012-
*/
class CustomCommandParams_4012 {
}
/**
* 自定义命令 15001-手机端双指缩放
*/
class CustomCommandParams_15001 {
    scaleType: number; // = 0; 选择缩放对象
    uiID: number; // = 0; 界面ID
}
/**
* 自定义命令 15002-图像震动
*/
class CustomCommandParams_15002 {
    type: number; // = 0; 震动对象
    passageIDUseVar: boolean; // = false; 变量
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    shakeTimeType: number; // = 0; 震动方式
    duringFrame: number; // = 30; 持续帧数
    dx: number; // = 5; 强度（x）
    dy: number; // = 5; 强度（y）
}
