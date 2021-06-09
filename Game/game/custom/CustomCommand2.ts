/**
 * 自定义事件命令
 * -- 图像/动画/立绘/界面/视频显示相关的指令
 * -- 对于图像显示以及移动过程追加了存档读档支持
 * Created by 黑暗之神KDS on 2018-12-18 17:17:50.
 */
module CommandExecute {
    //------------------------------------------------------------------------------------------------------
    // 图像系统基础指令运行时
    //------------------------------------------------------------------------------------------------------
    /**
     * 显示图片
     */
    export function customCommand_3001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3001): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 清理通道
        GameImageLayer.deletePassage(passageID);
        // 获取属性值
        var image = cp.imageUseVar ? Game.player.variable.getString(cp.imageVar) : cp.image;
        if (cp.posUseVar) {
            var dpX = Game.player.variable.getVariable(cp.dpXVar);
            var dpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var dpX = cp.dpX;
            var dpY = cp.dpY;
        }
        var dpz = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var dpWidth = Game.player.variable.getVariable(cp.dpWidthVar);
            var dpHeight = Game.player.variable.getVariable(cp.dpHeightVar);
        }
        else {
            var dpWidth = cp.dpWidth;
            var dpHeight = cp.dpHeight;
        }
        var rotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var opacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 创建显示对象
        var a = new UIBitmap();
        // 设置通道由该显示对象占用
        GameImageLayer.setImageSprite(passageID, a);
        Game.layer.imageLayer.addChild(a);
        a.dpDisplayPriority = passageID;
        a.image = image;
        a.useDPCoord = true;
        a.dpX = dpX;
        a.dpY = dpY;
        a.dpZ = dpz;
        a.dpWidth = dpWidth;
        a.dpHeight = dpHeight;
        a.rotation1 = rotation;
        a.opacity = opacity;
        a.pivotType = cp.pivotType;
        a.flip = cp.flip;
        a.blendMode = cp.blendMode == 0 ? null : "lighter";
        a.dpCoordToRealCoord();

    }
    /**
     * 移动图像
     */
    export function customCommand_3002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3002): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 获取通道显示对象
        var a = GameImageLayer.getImageSprite(passageID) as UIBitmap;
        if (!a || !(a instanceof UIBitmap)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcImageMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpWidth = Game.player.variable.getVariable(cp.dpWidthVar);
            var toDpHeight = Game.player.variable.getVariable(cp.dpHeightVar);
        }
        else {
            var toDpWidth = cp.dpWidth;
            var toDpHeight = cp.dpHeight;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 立即模式：无需清理此行为
        if (cp.timeType == 0) {
            a.dpX = toDpX;
            a.dpY = toDpY;
            a.dpZ = toDpZ;
            a.dpWidth = toDpWidth;
            a.dpHeight = toDpHeight;
            a.rotation = toRotation;
            a.opacity = toOpacity;
            a.pivotType = cp.pivotType;
            a.blendMode = cp.blendMode == 0 ? null : "lighter";
            a.flip = cp.flip;
        }
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            var m: ImageMoveParams = {
                time: cp.time,
                curTime: 1,
                x: a.dpX,
                y: a.dpY,
                z: a.dpZ,
                width: a.dpWidth,
                height: a.dpHeight,
                rotation: a.rotation1,
                opacity: a.opacity,
                x2: toDpX - a.dpX,
                y2: toDpY - a.dpY,
                z2: toDpZ - a.dpZ,
                width2: toDpWidth - a.dpWidth,
                height2: toDpHeight - a.dpHeight,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                pivotType2: cp.pivotType,
                blendMode2: cp.blendMode,
                flip2: cp.flip,
                transData: GameUtils.getTransData(cp.trans)
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcImageMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcImageMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    /**
     * 移动图像层相机
     */
    export function customCommand_3003(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3003): void {
        var passageID = 10001;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcCameraMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        var tocameraX = cp.xUseVar ? Game.player.variable.getVariable(cp.cameraXVar) : cp.cameraX;
        var tocameraY = cp.yUseVar ? Game.player.variable.getVariable(cp.cameraYVar) : cp.cameraY;
        var tocameraZ = cp.zUseVar ? Game.player.variable.getVariable(cp.cameraZVar) : cp.cameraZ;
        var tocameraRotation = cp.roUseVar ? Game.player.variable.getVariable(cp.cameraRotationVar) : cp.cameraRotation;
        var imageLayer = Game.layer.imageLayer;
        var m: ImageLayerCameraMoveParams = {
            time: cp.time,
            curTime: 1,
            x: imageLayer.camera.viewPort.x,
            y: imageLayer.camera.viewPort.y,
            z: imageLayer.camera.z,
            rotation: imageLayer.camera.rotation,
            x2: tocameraX - imageLayer.camera.viewPort.x,
            y2: tocameraY - imageLayer.camera.viewPort.y,
            z2: tocameraZ - imageLayer.camera.z,
            rotation2: tocameraRotation - imageLayer.camera.rotation,
            transData: GameUtils.getTransData(cp.trans)
        }
        // 立即模式
        if (cp.timeType == 0) {
            imageLayer.camera.viewPort.x = tocameraX;
            imageLayer.camera.viewPort.y = tocameraY;
            imageLayer.camera.z = tocameraZ;
            imageLayer.camera.rotation = tocameraRotation;
        }
        else {
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcCameraMoveFrameUpdate, thisPtr, [null, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcCameraMoveFrameUpdate.apply(thisPtr, [null, m, passageID, sign]);
        }
    }
    /**
     * 显示动画
     */
    export function customCommand_3004(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3004): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 清理通道
        GameImageLayer.deletePassage(passageID);
        // 获取属性
        var animationID = cp.objectUseVar ? Game.player.variable.getVariable(cp.animationVar) : cp.animation;
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        var aniFrame = cp.aniFrameUseVar ? Game.player.variable.getVariable(cp.aniFrameVar) : cp.aniFrame;
        // 创建图片显示对象
        var a = new UIAnimation();
        a.animation.syncLoadWhenAssetExist = true;
        a.useDPCoordScaleMode = true;
        a.dpDisplayPriority = passageID;
        a.animationID = animationID;
        // 设置通道由该显示对象占用
        GameImageLayer.setImageSprite(passageID, a);
        Game.layer.imageLayer.addChild(a);
        a.useDPCoord = true;
        a.dpX = toDpX;
        a.dpY = toDpY;
        a.dpZ = toDpZ;
        a.dpScaleX = toDpScaleX;
        a.dpScaleY = toDpScaleY;
        a.rotation1 = toRotation;
        a.opacity = toOpacity;
        a.playType = cp.playType;
        a.silentMode = cp.silentMode;
        a.showHitEffect = cp.showHitEffect;
        a.playFps = cp.playFps;
        a.aniFrame = aniFrame;
        // 刷新坐标
        a.dpCoordToRealCoord();

    }
    /**
     * 移动动画
     */
    export function customCommand_3005(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3005): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 获取通道显示对象
        var a: UIAnimation = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof UIAnimation)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcAnimationMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        var toFrame = cp.frameUseVar ? Game.player.variable.getVariable(cp.aniFrameVar) : cp.aniFrame;
        // 立即模式：无需清理此行为
        if (cp.timeType == 0) {
            a.dpX = toDpX;
            a.dpY = toDpY;
            a.dpZ = toDpZ;
            a.dpScaleX = toDpScaleX;
            a.dpScaleY = toDpScaleY;
            a.rotation1 = toRotation;
            a.opacity = toOpacity;
            if (cp.changeFrame) a.aniFrame = toFrame;
            a.dpCoordToRealCoord();
        }
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            var m: AnimationMoveParams = {
                time: cp.time,
                curTime: 1,
                x: a.dpX,
                y: a.dpY,
                z: a.dpZ,
                scaleX: a.dpScaleX,
                scaleY: a.dpScaleY,
                rotation: a.rotation1,
                opacity: a.opacity,
                aniFrame: a.aniFrame,
                x2: toDpX - a.dpX,
                y2: toDpY - a.dpY,
                z2: toDpZ - a.dpZ,
                scaleX2: toDpScaleX - a.dpScaleX,
                scaleY2: toDpScaleY - a.dpScaleY,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                aniFrame2: toFrame - a.aniFrame,
                transData: GameUtils.getTransData(cp.trans)
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcAnimationMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cp.changeFrame], sign);
            // 立刻开始执行一帧
            gcAnimationMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cp.changeFrame]);
        }
    }
    /**
     * 显示立绘
     */
    export function customCommand_3006(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3006): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 清理通道
        GameImageLayer.deletePassage(passageID);
        // 获取属性
        var standAvatarID = cp.objectUseVar ? Game.player.variable.getVariable(cp.standAvatarVar) : cp.standAvatar;
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        var avatarFrame = cp.frameUseVar ? Game.player.variable.getVariable(cp.avatarFrameVar) : cp.avatarFrame;
        var expression = cp.expressionUseVar ? Game.player.variable.getVariable(cp.expressionVar) : cp.expression;
        //
        // 创建图片显示对象
        var a = new UIStandAvatar();
        a.avatar.syncLoadWhenAssetExist = true;
        // 设定显示优先度，以便在同Z轴时，编号越大，显示在越前方
        a.useDPCoordScaleMode = true;
        a.dpDisplayPriority = passageID;
        a.avatarID = standAvatarID;
        // 设置通道由该显示对象占用
        GameImageLayer.setImageSprite(passageID, a);
        Game.layer.imageLayer.addChild(a);
        a.useDPCoord = true;
        a.dpX = toDpX;
        a.dpY = toDpY;
        a.dpZ = toDpZ;
        a.dpScaleX = toDpScaleX;
        a.dpScaleY = toDpScaleY;
        a.rotation1 = toRotation;
        a.opacity = toOpacity;
        a.playOnce = cp.playType == 1;


        a.avatarFPS = cp.avatarFPS;
        a.avatarFrame = avatarFrame;
        a.actionID = expression
        a.isPlay = cp.playType != 0;
        // 刷新坐标
        a.dpCoordToRealCoord();

    }
    /**
     * 移动立绘
     */
    export function customCommand_3007(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3007): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 获取通道显示对象
        var a: UIStandAvatar = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof UIStandAvatar)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcStandAvatarMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        var avatarFrame = cp.frameUseVar ? Game.player.variable.getVariable(cp.avatarFrameVar) : cp.avatarFrame;
        var expression = cp.expressionUseVar ? Game.player.variable.getVariable(cp.expressionVar) : cp.expression;
        // 立即模式：无需清理此行为
        if (cp.timeType == 0) {
            a.dpX = toDpX;
            a.dpY = toDpY;
            a.dpZ = toDpZ;
            a.dpScaleX = toDpScaleX;
            a.dpScaleY = toDpScaleY;
            a.rotation1 = toRotation;
            a.opacity = toOpacity;
            if (cp.changeExpression) {
                a.avatar.actionID = expression;
            }
            if (cp.changeFrame) {
                a.avatarFrame = avatarFrame;
            }
            a.dpCoordToRealCoord();
        }
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            // GameUtils.getValueByTransData(null, );
            var m: StandAvatarMoveParams = {
                time: cp.time,
                curTime: 1,
                x: a.dpX,
                y: a.dpY,
                z: a.dpZ,
                scaleX: a.dpScaleX,
                scaleY: a.dpScaleY,
                rotation: a.rotation1,
                opacity: a.opacity,
                avatarFrame: a.avatarFrame,
                x2: toDpX - a.dpX,
                y2: toDpY - a.dpY,
                z2: toDpZ - a.dpZ,
                scaleX2: toDpScaleX - a.dpScaleX,
                scaleY2: toDpScaleY - a.dpScaleY,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                transData: GameUtils.getTransData(cp.trans),
                actionID: expression,
                avatarFrame2: avatarFrame - a.avatarFrame,
                changeExpression: cp.changeExpression,
                changeFrame: cp.changeFrame
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcStandAvatarMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcStandAvatarMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    /**
     * 清理图像
     */
    export function customCommand_3008(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3008): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 清理通道
        GameImageLayer.deletePassage(passageID);
    }
    /**
     * 自动旋转
     */
    export function customCommand_3009(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3009): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 获取通道显示对象
        var a: GameSprite = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof GameSprite)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcImageSpriteRotationMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 如果不存在的话
        if (cp.rotation != 0) {
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcGameSpriteRotationMoveFrameUpdate, thisPtr, [a, cp.rotation, passageID, sign], sign);
            // 立刻开始执行一帧
            gcGameSpriteRotationMoveFrameUpdate.apply(thisPtr, [a, cp.rotation, passageID, sign]);
        }
    }
    /**
     * 显示界面
     */
    export function customCommand_3010(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3010): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
        }
        // 清理通道
        GameImageLayer.deletePassage(passageID);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 创建图片显示对象
        var a = GameUI.load(uiID, cp.showType == 1);
        // a.syncLoadWhenAssetExist = true;
        // 设定显示优先度，以便在同Z轴时，编号越大，显示在越前方
        a.useDPCoordScaleMode = true;
        // 设置通道由该显示对象占用
        GameImageLayer.setImageSprite(passageID, a);
        if (cp.showType == 1) {
            Game.layer.imageLayer.addChild(a);
            a.dpDisplayPriority = passageID;
            a.useDPCoord = true;
            if (cp.setAttr) {
                a.dpX = toDpX;
                a.dpY = toDpY;
                a.dpZ = toDpZ;
                a.dpScaleX = toDpScaleX;
                a.dpScaleY = toDpScaleY;
                a.rotation1 = toRotation;
                a.opacity = toOpacity;
            }
            // 刷新坐标
            a.dpCoordToRealCoord();
        }
        else {
            GameUI.show(uiID);
            if (cp.setAttr) {
                a.x = toDpX;
                a.y = toDpY;
                a.scaleX = toDpScaleX;
                a.scaleY = toDpScaleY;
                a.rotation1 = toRotation;
                a.opacity = toOpacity;
            }
        }

    }
    /**
     * 移动界面
     */
    export function customCommand_3011(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3011): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
        }
        // 获取通道显示对象
        var a: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof GUI_BASE)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcUIMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            var toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            var toDpScaleX = cp.dpScaleX;
            var toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        //
        // 立即模式：无需清理此行为
        if (cp.timeType == 0) {
            if (cp.showType == 1) {
                a.dpX = toDpX;
                a.dpY = toDpY;
                a.dpZ = toDpZ;
                a.dpScaleX = toDpScaleX;
                a.dpScaleY = toDpScaleY;
                a.dpCoordToRealCoord();
            }
            else {
                a.x = toDpX;
                a.y = toDpY;
                a.scaleX = toDpScaleX;
                a.scaleY = toDpScaleY;
            }
            a.rotation1 = toRotation;
            a.opacity = toOpacity;
        }
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            // GameUtils.getValueByTransData(null, );
            if (cp.showType == 1) {
                var cX = a.dpX;
                var cY = a.dpY;
                var cScaleX = a.dpScaleX;
                var cScaleY = a.dpScaleY;
            }
            else {
                var cX = a.x;
                var cY = a.y;
                var cScaleX = a.scaleX;
                var cScaleY = a.scaleY;
            }
            var m: ScaleSpriteMoveParams = {
                time: cp.time,
                curTime: 1,
                x: cX,
                y: cY,
                z: a.dpZ,
                scaleX: cScaleX,
                scaleY: cScaleY,
                rotation: a.rotation1,
                opacity: a.opacity,
                x2: toDpX - cX,
                y2: toDpY - cY,
                z2: toDpZ - a.dpZ,
                scaleX2: toDpScaleX - cScaleX,
                scaleY2: toDpScaleY - cScaleY,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                transData: GameUtils.getTransData(cp.trans)
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUIMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcUIMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    /**
     * 关闭界面
     */
    export function customCommand_3012(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3012): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
            GameUI.hide(uiID);
        }
        // 清理通道
        GameImageLayer.deletePassage(passageID);
    }
    /**
     * 移动界面元件
     */
    export function customCommand_3013(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3013): void {
        // 解析移动数据
        if (!cp.changeUIAttr || !Array.isArray(cp.changeUIAttr)) return;
        var cmdParam = cp.changeUIAttr[1];
        if (!cmdParam) return;
        var atts: { uiID: number, atts: { [compID: string]: [number, { [attrName: string]: any }] } } = cmdParam[2];
        if (!atts || !atts.uiID) return;
        // 获取通道
        var uiID = atts.uiID;
        // -- 图像层的场合
        var passageID = 1000000 + uiID;
        // 获取通道显示对象
        var a: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof GUI_BASE)) return;
        // 标识：由于移动界面元件支持对同一个界面多次叠加，此处sign则是唯一
        var sign = "gcUICompMove" + ObjectUtils.getRandID();
        // 立即模式：无需清理此行为
        if (cmdParam[5] == 0) {
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var attValue = attsValues[attName];
                        //变量
                        if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                            if (useVarAndTransitionAttrs[attName].type == 0) {
                                attValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 1) {
                                attValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 2) {
                                attValue = Game.player.variable.getSwitch(useVarAndTransitionAttrs[attName].index) ? true : false;
                            }
                        }
                        uiComp[attName] = attValue;
                    }
                }
            }
        }
        else {
            var m = {
                time: cmdParam[0],
                curTime: 1,
                transData: GameUtils.getTransData(cmdParam[1]),
                attrInfos: []
            }
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var oldValue = uiComp[attName];
                        var needTween = typeof oldValue == "number";
                        var useVarAndTransition: { index: number, change: boolean, type: number } = useVarAndTransitionAttrs[attName];
                        if (useVarAndTransition) {
                            // 如果并非过渡渐变的话则表示立即变更，效果会受到「无法渐变的属性处理」影响
                            if (!useVarAndTransition.change) {
                                needTween = false;
                            }
                        }
                        var newValue = attsValues[attName];
                        //变量
                        if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                            if (useVarAndTransitionAttrs[attName].type == 0) {
                                newValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 1) {
                                newValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 2) {
                                newValue = Game.player.variable.getSwitch(useVarAndTransitionAttrs[attName].index) ? true : false;
                            }
                        }
                        var attrInfo = { uiComp: uiComp, uiCompID: uiComp.id, attName: attName, oldValue: oldValue, needTween: needTween, newValue: newValue };
                        m.attrInfos.push(attrInfo);
                    }
                }
            }
            //
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUICompMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cmdParam[3]], sign);
            // 立刻开始执行一帧
            gcUICompMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cmdParam[3]]);
        }
    }
    /**
     * 添加材质
     */
    export function customCommand_3014(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3014): void {
        // 材质数据设置，格式：[{ materials: [] },{ materials: [] }]  渲染用的materialData不更改，其他数组等容器复制
        var materialData = [];
        for (var i = 0; i < cp.materialData.length; i++) {
            var md = { materials: cp.materialData[i].materials.concat() };
            materialData.push(md);
        }
        // -- 画面（图像层）
        if (cp.targetType == 0) {
            var imageLayer = Game.layer.imageLayer;
            var stageInfos = materialData;
            // 遍历所有的通道
            for (var p = 0; p < stageInfos.length; p++) {
                var stageInfo = stageInfos[p];
                // 遍历所有的材质
                for (var s = 0; s < stageInfo.materials.length; s++) {
                    var mData: MaterialData = stageInfo.materials[s];
                    mData.____timeInfo = {};
                    var m = imageLayer.getMaterialByID(mData.id, p);
                    // 如果已存在的话需要移除掉，替换新的同ID材质
                    if (m) imageLayer.removeMaterial(mData, p);
                    imageLayer.addMaterial(mData, p);
                }
            }
        }
        // -- 指定的图像编号
        else if (cp.targetType == 1) {
            var imagePassageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
            var imagePassageInfos = { passageID: imagePassageID, materialSetting: materialData };
            // 获取通道显示对象
            var a: GameSprite = GameImageLayer.getImageSprite(imagePassageID) as any;
            if (!a || !(a instanceof GameSprite)) return;
            // 遍历所有的通道
            for (var p = 0; p < imagePassageInfos.materialSetting.length; p++) {
                var materialSetting = imagePassageInfos.materialSetting[p];
                // 遍历所有的材质
                for (var s = 0; s < materialSetting.materials.length; s++) {
                    var mData: MaterialData = materialSetting.materials[s];
                    mData.____timeInfo = {};
                    var m = a.getMaterialByID(mData.id, p);
                    // 如果已存在的话需要移除掉，替换新的同ID材质
                    if (m) a.removeMaterial(mData, p);
                    a.addMaterial(mData, p);
                    a.setMaterialDirty();
                }
            }
        }
        // -- 指定的界面
        else if (cp.targetType == 2) {
            var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
            var uiPassageInfos = { uiID: uiID, materialSetting: materialData };
            var targetPassageID = 1000000 + uiPassageInfos.uiID;
            // 获取界面
            var b: GUI_BASE = GameImageLayer.getImageSprite(targetPassageID) as any;
            if (!b || !(b instanceof GUI_BASE)) return;
            // 遍历所有的通道
            for (var p = 0; p < uiPassageInfos.materialSetting.length; p++) {
                var materialSetting = uiPassageInfos.materialSetting[p];
                // 遍历所有的材质
                for (var s = 0; s < materialSetting.materials.length; s++) {
                    var mData: MaterialData = materialSetting.materials[s];
                    mData.____timeInfo = {};
                    var m = b.getMaterialByID(mData.id, p);
                    // 如果已存在的话需要移除掉，替换新的同ID材质
                    if (m) b.removeMaterial(mData, p);
                    b.addMaterial(mData, p);
                    b.setMaterialDirty();
                }
            }
        }
    }
    /**
     * 更改材质：同添加材质
     */
    export function customCommand_3015(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3015): void {
        customCommand_3014.apply(this, arguments);
    }
    /**
     * 删除材质
     */
    export function customCommand_3016(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3016): void {
        var cmdParams = cp;
        if (cmdParams.targetType == 0) {
            var imageLayer = Game.layer.imageLayer;
            if (cmdParams.clearType == 1) {
                // 遍历所有来自指令的添加
                imageLayer.removeMaterialByID(cp.materialID, cp.materialPassage);
            }
            else {
                imageLayer.clearMaterials();
            }
        }
        // // -- 指定的图像编号
        else if (cmdParams.targetType == 1) {
            var imagePassageID = cmdParams.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cmdParams.passageID;
            // 获取通道显示对象
            var a: GameSprite = GameImageLayer.getImageSprite(imagePassageID) as any;
            if (!a || !(a instanceof GameSprite)) return;
            if (cmdParams.clearType == 1) {
                a.removeMaterialByID(cp.materialID, cp.materialPassage);
            }
            else {
                a.clearMaterials();
            }
        }
        // -- 指定的界面
        else if (cmdParams.targetType == 2) {
            var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
            var targetPassageID = 1000000 + uiID;
            // 获取界面
            var b: GUI_BASE = GameImageLayer.getImageSprite(targetPassageID) as any;
            if (!b || !(b instanceof GUI_BASE)) return;
            var uiID = cmdParams.uiID;
            var uiPassageID = cmdParams.uiID + 1000000;
            if (cmdParams.clearType == 1) {
                b.removeMaterialByID(cp.materialID, cp.materialPassage);
            }
            else {
                b.clearMaterials();
            }
        }
    }
    /**
     * 切换场景
     */
    export function customCommand_3017(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3017): void {
        Game.player.toScene(cp.scene);
    }
    /**
     * 显示视频
     */
    export function customCommand_3018(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3018): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 清理通道
        GameImageLayer.deletePassage(passageID);
        // 获取属性值
        var video = cp.objectUseVar ? Game.player.variable.getString(cp.videoVar) : cp.video;
        if (cp.posUseVar) {
            var dpX = Game.player.variable.getVariable(cp.dpXVar);
            var dpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var dpX = cp.dpX;
            var dpY = cp.dpY;
        }
        var dpz = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var dpWidth = Game.player.variable.getVariable(cp.dpWidthVar);
            var dpHeight = Game.player.variable.getVariable(cp.dpHeightVar);
        }
        else {
            var dpWidth = cp.dpWidth;
            var dpHeight = cp.dpHeight;
        }
        var rotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var opacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 创建显示对象
        var a = new UIVideo();
        a.useDPCoord = true;
        a.dpDisplayPriority = passageID;
        a.videoURL = video;
        // 设置通道由该显示对象占用
        GameImageLayer.setImageSprite(passageID, a);
        Game.layer.imageLayer.addChild(a);

        a.dpX = dpX;
        a.dpY = dpY;
        a.dpZ = dpz;
        a.dpWidth = dpWidth;
        a.dpHeight = dpHeight;
        a.rotation1 = rotation;
        a.opacity = opacity;
        a.flip = cp.flip;

        var currentTime = cp.currentTimeUseVar ? Game.player.variable.getVariable(cp.currentTimeVar) : cp.currentTime;
        a.muted = cp.muted;
        a.loop = cp.loop;
        a.volume = cp.volume;
        a.currentTime = currentTime;
        a.playbackRate = cp.playbackRate;
        a.playType = cp.playType;
        a.dpCoordToRealCoord();
    }
    /**
     * 移动视频
     */
    export function customCommand_3019(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3019): void {
        // 获取通道
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 获取通道显示对象
        var a = GameImageLayer.getImageSprite(passageID) as UIBitmap;
        if (!a || !(a instanceof UIBitmap)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        var sign = "gcVideoMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        if (cp.posUseVar) {
            var toDpX = Game.player.variable.getVariable(cp.dpXVar);
            var toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            var toDpX = cp.dpX;
            var toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            var toDpWidth = Game.player.variable.getVariable(cp.dpWidthVar);
            var toDpHeight = Game.player.variable.getVariable(cp.dpHeightVar);
        }
        else {
            var toDpWidth = cp.dpWidth;
            var toDpHeight = cp.dpHeight;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 立即模式：无需清理此行为
        if (cp.timeType == 0) {
            a.dpX = toDpX;
            a.dpY = toDpY;
            a.dpZ = toDpZ;
            a.dpWidth = toDpWidth;
            a.dpHeight = toDpHeight;
            a.rotation = toRotation;
            a.opacity = toOpacity;
            a.flip = cp.flip;
        }
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            var m: ImageMoveParams = {
                time: cp.time,
                curTime: 1,
                x: a.dpX,
                y: a.dpY,
                z: a.dpZ,
                width: a.dpWidth,
                height: a.dpHeight,
                rotation: a.rotation1,
                opacity: a.opacity,
                x2: toDpX - a.dpX,
                y2: toDpY - a.dpY,
                z2: toDpZ - a.dpZ,
                width2: toDpWidth - a.dpWidth,
                height2: toDpHeight - a.dpHeight,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                pivotType2: a.pivotType,
                blendMode2: 0,
                flip2: cp.flip,
                transData: GameUtils.getTransData(cp.trans)
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcImageMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcImageMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    /**
     * 移动图片时的逐帧执行的函数
     */
    export function gcImageMoveFrameUpdate(a: UIBitmap, m: ImageMoveParams, passageID: number, sign: string) {
        // 首帧变化的属性
        if (m.curTime == 1) {
            a.pivotType = m.pivotType2;
            a.blendMode = m.blendMode2 == 0 ? null : "lighter";
            a.flip = m.flip2;
        }
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        a.dpX = m.x2 * value + m.x;
        a.dpY = m.y2 * value + m.y;
        a.dpZ = m.z2 * value + m.z;
        a.dpWidth = m.width2 * value + m.width;
        a.dpHeight = m.height2 * value + m.height;
        a.rotation1 = m.rotation2 * value + m.rotation;
        a.opacity = m.opacity2 * value + m.opacity;
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
        a.dpCoordToRealCoord();
    }
    /**
     * 移动相机时的逐帧执行的函数
     */
    export function gcCameraMoveFrameUpdate(a: any, m: ImageLayerCameraMoveParams, passageID: number, sign: string) {
        var imageLayer = Game.layer.imageLayer
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        imageLayer.camera.viewPort.x = m.x2 * value + m.x;
        imageLayer.camera.viewPort.y = m.y2 * value + m.y;
        imageLayer.camera.z = m.z2 * value + m.z;
        imageLayer.camera.rotation = m.rotation2 * value + m.rotation;
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
        imageLayer.updateFrame(true);
    }
    /**
     * 移动动画时的逐帧执行的函数
     */
    export function gcAnimationMoveFrameUpdate(a: UIAnimation, m: AnimationMoveParams, passageID: number, sign: string, changeFrame: boolean) {
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        a.dpX = m.x2 * value + m.x;
        a.dpY = m.y2 * value + m.y;
        a.dpZ = m.z2 * value + m.z;
        a.dpScaleX = m.scaleX2 * value + m.scaleX;
        a.dpScaleY = m.scaleY2 * value + m.scaleY;
        a.rotation1 = m.rotation2 * value + m.rotation;
        a.opacity = m.opacity2 * value + m.opacity;
        if (changeFrame) {
            a.aniFrame = m.aniFrame2 * value + m.aniFrame;
        }
        a.dpCoordToRealCoord();
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    /**
     * 移动立绘时的逐帧执行的函数
     */
    export function gcStandAvatarMoveFrameUpdate(a: UIStandAvatar, m: StandAvatarMoveParams, passageID: number, sign: string) {
        // 立即变更
        if (m.curTime == 1) {
            if (m.changeExpression) {
                a.actionID = m.actionID;
            }
        }
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        a.dpX = m.x2 * value + m.x;
        a.dpY = m.y2 * value + m.y;
        a.dpZ = m.z2 * value + m.z;
        a.dpScaleX = m.scaleX2 * value + m.scaleX;
        a.dpScaleY = m.scaleY2 * value + m.scaleY;
        a.rotation1 = m.rotation2 * value + m.rotation;
        a.opacity = m.opacity2 * value + m.opacity;
        a.dpCoordToRealCoord();
        if (m.changeFrame) {
            a.avatarFrame = m.avatarFrame2 * value + m.avatarFrame;
        }
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    /**
     * 自动旋转的逐帧执行的函数
     */
    export function gcGameSpriteRotationMoveFrameUpdate(a: GameSprite, rotation: number, passageID: number, sign: string) {
        // 该通道的显示对象开始旋转
        if (a) {
            a.rotation2 += rotation;
        }
        // 如果已没有显示对象的话就直接清理掉该函数
        else {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    /**
     * 移动界面的逐帧执行的函数
     */
    export function gcUIMoveFrameUpdate(a: GUI_BASE, m: ScaleSpriteMoveParams, passageID: number, sign: string) {
        // 没有显示对象或已被释放的情况
        if (!a || a.isDisposed) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            return;
        }
        // 计算过渡值
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        if (a.useDPCoord) {
            a.dpX = m.x2 * value + m.x;
            a.dpY = m.y2 * value + m.y;
            a.dpZ = m.z2 * value + m.z;
            a.dpScaleX = m.scaleX2 * value + m.scaleX;
            a.dpScaleY = m.scaleY2 * value + m.scaleY;
            a.dpCoordToRealCoord();
        }
        else {
            a.x = m.x2 * value + m.x;
            a.y = m.y2 * value + m.y;
            a.scaleX = m.scaleX2 * value + m.scaleX;
            a.scaleY = m.scaleY2 * value + m.scaleY;
        }
        a.rotation1 = m.rotation2 * value + m.rotation;
        a.opacity = m.opacity2 * value + m.opacity;
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    /**
     * 移动界面元件的逐帧执行的函数
     */
    export function gcUICompMoveFrameUpdate(a: GUI_BASE, m: UICompMoveParams, passageID: number, sign: string, nonTweenType: number) {
        var per = m.curTime / m.time;
        for (var i = 0; i < m.attrInfos.length; i++) {
            var attrInfo = m.attrInfos[i];
            if (!attrInfo.needTween) {
                // 无法渐变过渡的属性处理方式：在第一帧时变动/在最后一帧变动
                if ((nonTweenType == 0 && m.curTime == 1) || (nonTweenType == 1 && per == 1)) {
                    attrInfo.uiComp[attrInfo.attName] = attrInfo.newValue;
                }
            }
            else {
                var valuePer = GameUtils.getValueByTransData(m.transData, per);
                attrInfo.uiComp[attrInfo.attName] = (attrInfo.newValue - attrInfo.oldValue) * valuePer + attrInfo.oldValue;
            }
        }
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    // 移动图片的参数伪类
    declare class ImageMoveParams {
        time: number;
        curTime: number;
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        rotation: number;
        opacity: number;
        x2: number;
        y2: number;
        z2: number;
        width2: number;
        height2: number;
        rotation2: number;
        opacity2: number;
        pivotType2: number;
        blendMode2: number;
        flip2: boolean;
        transData: TransData;
    }
    // 移动图像层镜头的参数伪类
    declare class ImageLayerCameraMoveParams {
        time: number;
        curTime: number;
        x: number;
        y: number;
        z: number;
        rotation: number;
        x2: number;
        y2: number;
        z2: number;
        rotation2: number;
        transData: TransData;
    }
    // 移动缩放类对象的参数伪类
    declare class ScaleSpriteMoveParams {
        time: number;
        curTime: number;
        x: number;
        y: number;
        z: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        opacity: number;
        x2: number;
        y2: number;
        z2: number;
        scaleX2: number;
        scaleY2: number;
        rotation2: number;
        opacity2: number;
        transData: TransData;
    }
    // 移动动画的参数伪类
    declare class AnimationMoveParams extends ScaleSpriteMoveParams {
        aniFrame: number;
        aniFrame2: number;
    }
    // 移动立绘的参数伪类
    declare class StandAvatarMoveParams extends ScaleSpriteMoveParams {
        actionID: number;
        avatarFrame: number;
        avatarFrame2: number;
        changeExpression: boolean;
        changeFrame: boolean
    }
    // 移动界面元件的参数伪类
    declare class UICompMoveParams {
        time: any;
        curTime: number;
        transData: TransData;
        attrInfos: { uiComp: UIBase; uiCompID: number; attName: string; oldValue: any; needTween: boolean; newValue: any; }[];
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    /**
     * 储存界面层的界面状态和界面内元件的状态，以便读档后打开界面时使用一次恢复
     */
    var useOnceUIInfos: {
        [uiID: number]: {
            // 界面基础属性
            x: number, y: number, scaleX: number, scaleY: number, rotation1: number, rotation2: number, opacity: number,
            // 界面内元件的属性
            uiCompInfo: { [uiCompID: string]: { [varName: string]: any }[] }
        }
    } = {} as any;
    /**
     * 监听界面打开：通过使用GameUI.show()打开的界面（位于界面层）
     */
    EventUtils.addEventListener(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, Callback.New((uiID: number) => {
        // -- 获取通道
        var passageID = 1000000 + uiID;
        var ui = GameUI.get(uiID);
        if (!ui) return;
        // -- 装载属性
        var useOnceUIInfo = useOnceUIInfos[uiID];
        if (useOnceUIInfo) {
            for (var i in useOnceUIInfo) {
                if (i == "uiCompInfo") continue;
                ui[i] = useOnceUIInfo[i];
            }
            var childs = GameUI.getAllCompChildren(ui, true, (uiComp: Sprite) => {
                // 列表的属性忽略，一般由创建时刷新
                if (uiComp instanceof UIList) {
                    return false;
                }
            }).keyValue;
            for (var uiCompID in useOnceUIInfo.uiCompInfo) {
                var uiComp = childs[uiCompID];
                if (!uiComp) continue;
                var uiCompInfo = useOnceUIInfo.uiCompInfo[uiCompID];
                for (var varName in uiCompInfo) {
                    uiComp[varName] = uiCompInfo[varName];
                }
            }
            delete useOnceUIInfos[uiID];
        }
        // -- 储存
        GameImageLayer.setImageSprite(passageID, ui);
    }, null));
    /**
     * 监听界面关闭
     */
    EventUtils.addEventListener(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, Callback.New((uiID: number) => {
        // -- 获取通道
        var passageID = 1000000 + uiID;
        // -- 删除该通道
        GameImageLayer.deletePassage(passageID);
    }, null));
    //------------------------------------------------------------------------------------------------------
    // 存档和读档-追加这些事件的修改的状态
    //------------------------------------------------------------------------------------------------------
    /**
     * 注册储存额外的自定义数据：
     * -- 当前显示的图像
     * -- 当前正在移动中的效果
     */
    if (!Config.BEHAVIOR_EDIT_MODE) {
        SinglePlayerGame.regSaveCustomData("cmdImagerLayer", Callback.New(() => {
            // 储存显示对象
            var imageSpriteInfos: { [id: string]: { type: string, displayObjectAttrs: any } } = {};
            for (var passageIDStr in GameImageLayer.imageSprites) {
                var disobjectInfo = GameImageLayer.imageSprites[passageIDStr];
                var sp: GameSprite = disobjectInfo.displayObject;
                var displayObjectAttrs = {};
                // 记录身上的材质
                var materialData = sp.getAllMaterialDatas();
                displayObjectAttrs["___materialData"] = materialData;
                // 视频
                if (sp instanceof UIVideo) {
                    var saveAttrs = ["videoURL", "dpX", "dpY", "dpZ", "dpWidth", "dpHeight", "rotation1", "rotation2", "opacity", "flip",
                        "playType", "muted", "volume", "loop", "currentTime", "playbackRate"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIVideo",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 图片
                else if (sp instanceof UIBitmap) {
                    var saveAttrs = ["image", "dpX", "dpY", "dpZ", "dpWidth", "dpHeight", "rotation1", "rotation2", "opacity", "pivotType", "blendMode", "flip"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIBitmap",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 动画
                else if (sp instanceof UIAnimation) {
                    var saveAttrs = ["animationID", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "playType", "silentMode", "showHitEffect", "playFps"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    // 记录当前帧
                    displayObjectAttrs["aniFrame"] = (sp as UIAnimation).animation.currentFrame;
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIAnimation",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 立绘
                else if (sp instanceof UIStandAvatar) {
                    var saveAttrs = ["avatarID", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "isPlay", "playOnce", "actionID", "avatarFPS"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["avatarFrame"] = (sp as UIStandAvatar).avatar.currentFrame;
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIStandAvatar",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 界面
                else if (sp instanceof GUI_BASE) {
                    if (sp.useDPCoord) {
                        saveAttrs = ["useDPCoord", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity"];
                    }
                    else {
                        saveAttrs = ["useDPCoord", "x", "y", "scaleX", "scaleY", "rotation1", "rotation2", "opacity"];
                        displayObjectAttrs["___childIndex"] = Game.layer.uiLayer.getChildIndex(sp);
                    }
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["guiID"] = (sp as GUI_BASE).guiID;
                    imageSpriteInfos[passageIDStr] = {
                        type: "GUI_BASE",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 其他的情况
                else {
                    continue;
                }
            }
            // 储存移动效果
            var passageFrameUpdateDatas = {};
            var passageFrameUpdates = GameImageLayer.getPassageFrameUpdates();
            for (var passageIDStr in passageFrameUpdates) {
                var pArr = passageFrameUpdates[passageIDStr];
                if (pArr) {
                    var pDataArr = passageFrameUpdateDatas[passageIDStr] = [];
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var args = p.args.concat();
                        args.shift(); // 去除头-显示对象
                        // 移动界面元件时需要记录下
                        if (p.sign.indexOf("gcUICompMove") != -1) {
                            var m: UICompMoveParams = args[0];
                            var newM: UICompMoveParams = {
                                time: m.time,
                                curTime: m.curTime,
                                transData: m.transData,
                                attrInfos: []
                            };
                            for (var k = 0; k < m.attrInfos.length; k++) {
                                var oldAttrInfo = m.attrInfos[k];
                                var oldComp = oldAttrInfo.uiComp;
                                oldAttrInfo.uiComp = null;
                                newM.attrInfos[k] = ObjectUtils.depthClone(oldAttrInfo);
                                oldAttrInfo.uiComp = oldComp;
                            }
                            args[0] = newM;
                        }
                        pDataArr.push({ sign: p.sign, args: args });
                    }
                }
            }
            // 储存界面层的系统组界面以及其元件状态
            var allSystemGroupUIs = GameUI.getAllSystemGroupUIs();
            var saveDataUseOnceUIInfo = {};
            var BASE_ATTRS_OBJ = { x: true, y: true, width: true, height: true, rotation: true, show: true, opacity: true, mouseEventEnabledData: true };
            for (var o in allSystemGroupUIs) {
                var uiID = parseInt(o);
                var ui: GUI_BASE = allSystemGroupUIs[o];
                if (!ui) continue;
                var uiPosData = {
                    // 界面基础属性
                    x: ui.x, y: ui.y, scaleX: ui.scaleX, scaleY: ui.scaleX, rotation1: ui.rotation1, rotation2: ui.rotation2, opacity: ui.opacity,
                    // 界面内元件的属性
                    uiCompInfo: {}
                }
                saveDataUseOnceUIInfo[uiID] = uiPosData;
                var allComps = GameUI.getAllCompChildren(ui, false).arr;
                allComps.forEach((comp: UIBase) => {
                    if (comp instanceof UIBase) {
                        var uiCompAtts = uiPosData.uiCompInfo[comp.id] = {};
                        // 基础属性记录
                        for (var b in BASE_ATTRS_OBJ) {
                            uiCompAtts[b] = comp[b];
                        }
                        // 自定义属性记录
                        var __compCustomAttributes = GameUI["__compCustomAttributes"];
                        if (__compCustomAttributes) {
                            var customAttrs: string[] = __compCustomAttributes[comp.className];
                            for (var c in customAttrs) {
                                var b = customAttrs[c];
                                uiCompAtts[b] = comp[b];
                            }
                        }
                    }
                });
            }
            // 储存当前镜头
            var imageLayer = Game.layer.imageLayer;
            var cameraInfo = {
                x: imageLayer.camera.viewPort.x,
                y: imageLayer.camera.viewPort.y,
                z: imageLayer.camera.z,
                rotation: imageLayer.camera.rotation
            };
            // 储存图像层的材质
            var imageLayerMaterialData = Game.layer.imageLayer.getAllMaterialDatas();
            return { cameraInfo: cameraInfo, imageSpriteInfos: imageSpriteInfos, passageFrameUpdateDatas: passageFrameUpdateDatas, saveDataUseOnceUIInfo: saveDataUseOnceUIInfo, imageLayerMaterialData: imageLayerMaterialData };
        }, {}));
        /**
         * 监听读档恢复数据，恢复储存的自定义数据-图像相关事件
         */
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(() => {
            // 停止当前对话
            GameDialog.stop();
            // 清理所有图像
            for (var pi in GameImageLayer.imageSprites) {
                var passageID: number = parseInt(pi);
                var sp: GameSprite = GameImageLayer.getImageSprite(passageID);
                // 标题界面和读档界面以及对话菜单不释放
                if (sp instanceof GUI_BASE && ((sp as GUI_BASE).guiID == 1 || (sp as GUI_BASE).guiID == 2 || (sp as GUI_BASE).guiID == 2003)) {
                }
                else {
                    GameImageLayer.deletePassage(passageID);
                    if (sp instanceof GUI_BASE) {
                        if (sp == GameUI.get((sp as GUI_BASE).guiID)) {
                            GameUI.dispose((sp as GUI_BASE).guiID);
                        }
                    }
                }
            }
            // 清理图像层材质
            Game.layer.imageLayer.clearMaterials();
            // 安装材质的方法
            function installMaterialData(sp: GameSprite, materialData: any[]) {
                if (!materialData || materialData.length == 0) return;
                sp.installMaterialData(materialData, false);
            }
            var o = SinglePlayerGame.getSaveCustomData("cmdImagerLayer");
            if (!o) return;
            // 恢复 saveDataUseOnceUIInfo
            useOnceUIInfos = o.saveDataUseOnceUIInfo;
            // 显示对象
            var imageSpriteInfos: { [id: string]: { type: string, displayObjectAttrs: any } } = o.imageSpriteInfos;
            for (var passageIDStr in imageSpriteInfos) {
                var passageID = MathUtils.int(passageIDStr)
                var imageSpriteInfo = imageSpriteInfos[passageIDStr];
                // -- 视频
                if (imageSpriteInfo.type == "UIVideo") {
                    var e = new UIVideo();
                    e.dpDisplayPriority = passageID;
                    GameImageLayer.setImageSprite(passageID, e);
                    e.useDPCoord = true;
                    Game.layer.imageLayer.addChild(e);
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        e[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(e, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
                // -- 图片
                else if (imageSpriteInfo.type == "UIBitmap") {
                    var a = new UIBitmap();
                    a.dpDisplayPriority = passageID;
                    GameImageLayer.setImageSprite(passageID, a);
                    a.useDPCoord = true;
                    Game.layer.imageLayer.addChild(a);
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        a[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(a, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
                // -- 动画
                else if (imageSpriteInfo.type == "UIAnimation") {
                    var b = new UIAnimation();
                    b.animation.syncLoadWhenAssetExist = true;
                    b.dpDisplayPriority = passageID;
                    GameImageLayer.setImageSprite(passageID, b);
                    b.useDPCoord = true;
                    b.useDPCoordScaleMode = true;
                    Game.layer.imageLayer.addChild(b);
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        b[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(b, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
                // -- 立绘
                else if (imageSpriteInfo.type == "UIStandAvatar") {
                    var c = new UIStandAvatar();
                    c.avatar.syncLoadWhenAssetExist = true;
                    c.dpDisplayPriority = passageID;
                    GameImageLayer.setImageSprite(passageID, c);
                    c.useDPCoord = true;
                    c.useDPCoordScaleMode = true;
                    Game.layer.imageLayer.addChild(c);
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        c[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(c, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
                // -- 界面
                else if (imageSpriteInfo.type == "GUI_BASE") {
                    var uiID = imageSpriteInfo.displayObjectAttrs["guiID"];
                    var useDPCoord = imageSpriteInfo.displayObjectAttrs["useDPCoord"];
                    var d = GameUI.load(uiID, useDPCoord);
                    GameImageLayer.setImageSprite(passageID, d);
                    d.useDPCoordScaleMode = true;
                    if (useDPCoord) {
                        Game.layer.imageLayer.addChild(d);
                        d.dpDisplayPriority = passageID;
                    }
                    else {
                        // 记录显示层次，以便读档后
                        d.dpDisplayPriority = imageSpriteInfo.displayObjectAttrs["___childIndex"];
                        GameUI.show(uiID);
                    }
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        d[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(d, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
            }
            // 界面层刷新层次 childIndex
            var uiChilds = [];
            var uiChildLength = Game.layer.uiLayer.numChildren;
            for (var s = 0; s < uiChildLength; s++) {
                uiChilds.push(Game.layer.uiLayer.getChildAt(s));
            }
            uiChilds.sort(function (a: GameSprite, b: GameSprite): number {
                return a.dpDisplayPriority < b.dpDisplayPriority ? -1 : 1;
            });
            for (var j: number = 0; j < uiChildLength; j++) {
                Game.layer.uiLayer.setChildIndex(uiChilds[j], j);
            }
            // 当前的镜头
            var imageLayer = Game.layer.imageLayer;
            imageLayer.camera.viewPort.x = o.cameraInfo.x;
            imageLayer.camera.viewPort.y = o.cameraInfo.y;
            imageLayer.camera.z = o.cameraInfo.z;
            imageLayer.camera.rotation = o.cameraInfo.rotation;
            // 图像层刷新
            Game.layer.imageLayer.updateFrame(true);
            // 移动中效果
            var passageFrameUpdateDatas: { [passageIDStr: string]: { sign: string, args: any }[] } = o.passageFrameUpdateDatas;
            for (var passageIDStr in passageFrameUpdateDatas) {
                var passageID = MathUtils.int(passageIDStr)
                var pArr = passageFrameUpdateDatas[passageIDStr];
                if (pArr) {
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var thisPtr = {};
                        if (p.sign == "gcImageMove") {
                            var bmp: UIBitmap = GameImageLayer.getImageSprite(passageID) as any;
                            if (!bmp || !(bmp instanceof UIBitmap)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcImageMoveFrameUpdate, thisPtr, [bmp].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcVideoMove") {
                            var video: UIVideo = GameImageLayer.getImageSprite(passageID) as any;
                            if (!video || !(video instanceof UIVideo)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcImageMoveFrameUpdate, thisPtr, [video].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcCameraMove") {
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcCameraMoveFrameUpdate, thisPtr, [null].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcAnimationMove") {
                            var ani: UIAnimation = GameImageLayer.getImageSprite(passageID) as any;
                            if (!ani || !(ani instanceof UIAnimation)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcAnimationMoveFrameUpdate, thisPtr, [ani].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcStandAvatarMove") {
                            var standAvatar: UIStandAvatar = GameImageLayer.getImageSprite(passageID) as any;
                            if (!standAvatar || !(standAvatar instanceof UIStandAvatar)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcStandAvatarMoveFrameUpdate, thisPtr, [standAvatar].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcImageSpriteRotationMove") {
                            var sp: GameSprite = GameImageLayer.getImageSprite(passageID) as any;
                            if (!sp || !(sp instanceof GameSprite)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcGameSpriteRotationMoveFrameUpdate, thisPtr, [sp].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcUIMove") {
                            var ui: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
                            if (!ui || !(ui instanceof GUI_BASE)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUIMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                        // 移动界面元件时需要记录下
                        else if (p.sign.indexOf("gcUICompMove") != -1) {
                            var ui: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
                            if (!ui || !(ui instanceof GUI_BASE)) continue;
                            var m: UICompMoveParams = p.args[0];
                            var uiComps = GameUI.getAllCompChildren(ui, true);
                            for (var k = 0; k < m.attrInfos.length; k++) {
                                var attrInfo = m.attrInfos[k];
                                attrInfo.uiComp = uiComps.keyValue[attrInfo.uiCompID];
                                // 如果不存在组件的情况则无视该移动（可能新版本已无该组件）
                                if (!attrInfo.uiComp) {
                                    m.attrInfos.splice(k, 1);
                                    k--;
                                }
                            }
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUICompMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                    }
                }
            }
            // 图像层材质
            installMaterialData(Game.layer.imageLayer, o.imageLayerMaterialData);
        }, {}, null));
    }
    //------------------------------------------------------------------------------------------------------
    // 预加载和卸载
    //------------------------------------------------------------------------------------------------------
    // 使用资源的自定义指令编号
    var PLUGIN_COMMAND_SHOWPICTURE: number = 3001;
    var PLUGIN_COMMAND_SHOWANIMATION: number = 3004;
    var PLUGIN_COMMAND_SHOWSTANDAVATAR: number = 3006;
    var PLUGIN_COMMAND_SHOWUI: number = 3010;
    // 缓存
    var preloadCommandPageInfo: { [cmdPageID: number]: { imageArr: string[], aniArr: number[], standAvatarArr: number[], uiArr: number[] } } = {};
    // 重写预加载事件页
    var oldPreLoadCommandPage = AssetManager.preLoadCommandPage;
    AssetManager.preLoadCommandPage = function (commandPage: CommandPage, complete: Callback = null, syncCallbackWhenAssetExist: boolean = false, autoDispose: boolean = false) {
        // 资源获取
        var imageArr = [];
        var aniArr = [];
        var standAvatarArr = [];
        var uiArr = [];
        // 记录
        preloadCommandPageInfo[commandPage.id] = {
            imageArr: imageArr,
            aniArr: aniArr,
            standAvatarArr: standAvatarArr,
            uiArr: uiArr
        };
        for (var i = 0; i < commandPage.commands.length; i++) {
            var cmd = commandPage.commands[i];
            if (cmd.customID == PLUGIN_COMMAND_SHOWPICTURE) {
                var cp: CustomCommandParams_3001 = cmd.params[0];
                if (!cp.imageUseVar) {
                    imageArr.push(cp.image);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWANIMATION) {
                var cp2: CustomCommandParams_3004 = cmd.params[0];
                if (!cp2.objectUseVar) {
                    aniArr.push(cp2.animation);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWSTANDAVATAR) {
                var cp3: CustomCommandParams_3006 = cmd.params[0];
                if (!cp3.objectUseVar) {
                    standAvatarArr.push(cp3.standAvatar);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWUI) {
                var cp4: CustomCommandParams_3010 = cmd.params[0];
                if (!cp4.objectUseVar) {
                    uiArr.push(cp4.uiID);
                }
            }
        }
        // 记录旧的参数
        var oldArgs = arguments;
        // 需要加载的
        var totalCount = 1 + aniArr.length + standAvatarArr.length + uiArr.length;
        var currentLoad = 0;
        function onLoadOver() {
            currentLoad++;
            if (totalCount == currentLoad) {
                oldPreLoadCommandPage.apply(this, oldArgs);
            }
        }
        var onLoadOverCB = Callback.New(onLoadOver, this);
        AssetManager.loadImages(imageArr, onLoadOverCB, true, true, true);
        for (var i = 0; i < aniArr.length; i++) {
            AssetManager.preLoadAnimationAsset(aniArr[i], onLoadOverCB, true, false, true);
        }
        for (var i = 0; i < standAvatarArr.length; i++) {
            AssetManager.preLoadStandAvatarAsset(standAvatarArr[i], onLoadOverCB, true, false, true);
        }
        for (var i = 0; i < uiArr.length; i++) {
            AssetManager.preLoadUIAsset(uiArr[i], onLoadOverCB, true, false, true);
        }
    }
    // 重写卸载事件页
    var oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage: CommandPage) {
        var cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            var imageCache = cache.imageArr, uiCache = cache.uiArr, animationCache = cache.aniArr, standAvatarCache = cache.standAvatarArr;
            AssetManager.disposeImages(imageCache);
            for (var s = 0; s < uiCache.length; s++)AssetManager.disposeUIAsset(uiCache[s]);
            for (var s = 0; s < animationCache.length; s++)AssetManager.disposeAnimationAsset(animationCache[s]);
            for (var s = 0; s < standAvatarCache.length; s++)AssetManager.disposeStandAvatarAsset(standAvatarCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    }
}