var CommandExecute;
(function (CommandExecute) {
    function customCommand_3001(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        GameImageLayer.deletePassage(passageID);
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
        var a = new UIBitmap();
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
    CommandExecute.customCommand_3001 = customCommand_3001;
    function customCommand_3002(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof UIBitmap))
            return;
        var sign = "gcImageMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
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
        else {
            var m = {
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
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcImageMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            gcImageMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3002 = customCommand_3002;
    function customCommand_3003(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = 10001;
        var sign = "gcCameraMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        var tocameraX = cp.xUseVar ? Game.player.variable.getVariable(cp.cameraXVar) : cp.cameraX;
        var tocameraY = cp.yUseVar ? Game.player.variable.getVariable(cp.cameraYVar) : cp.cameraY;
        var tocameraZ = cp.zUseVar ? Game.player.variable.getVariable(cp.cameraZVar) : cp.cameraZ;
        var tocameraRotation = cp.roUseVar ? Game.player.variable.getVariable(cp.cameraRotationVar) : cp.cameraRotation;
        var imageLayer = Game.layer.imageLayer;
        var m = {
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
        };
        if (cp.timeType == 0) {
            imageLayer.camera.viewPort.x = tocameraX;
            imageLayer.camera.viewPort.y = tocameraY;
            imageLayer.camera.z = tocameraZ;
            imageLayer.camera.rotation = tocameraRotation;
        }
        else {
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcCameraMoveFrameUpdate, thisPtr, [null, m, passageID, sign], sign);
            gcCameraMoveFrameUpdate.apply(thisPtr, [null, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3003 = customCommand_3003;
    function customCommand_3004(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        GameImageLayer.deletePassage(passageID);
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
        var a = new UIAnimation();
        a.animation.syncLoadWhenAssetExist = true;
        a.useDPCoordScaleMode = true;
        a.dpDisplayPriority = passageID;
        a.animationID = animationID;
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
        a.dpCoordToRealCoord();
    }
    CommandExecute.customCommand_3004 = customCommand_3004;
    function customCommand_3005(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof UIAnimation))
            return;
        var sign = "gcAnimationMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
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
        if (cp.timeType == 0) {
            a.dpX = toDpX;
            a.dpY = toDpY;
            a.dpZ = toDpZ;
            a.dpScaleX = toDpScaleX;
            a.dpScaleY = toDpScaleY;
            a.rotation1 = toRotation;
            a.opacity = toOpacity;
            if (cp.changeFrame)
                a.aniFrame = toFrame;
            a.dpCoordToRealCoord();
        }
        else {
            var m = {
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
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcAnimationMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cp.changeFrame], sign);
            gcAnimationMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cp.changeFrame]);
        }
    }
    CommandExecute.customCommand_3005 = customCommand_3005;
    function customCommand_3006(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        GameImageLayer.deletePassage(passageID);
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
        var a = new UIStandAvatar();
        a.avatar.syncLoadWhenAssetExist = true;
        a.useDPCoordScaleMode = true;
        a.dpDisplayPriority = passageID;
        a.avatarID = standAvatarID;
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
        a.actionID = expression;
        a.isPlay = cp.playType != 0;
        a.dpCoordToRealCoord();
    }
    CommandExecute.customCommand_3006 = customCommand_3006;
    function customCommand_3007(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof UIStandAvatar))
            return;
        var sign = "gcStandAvatarMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
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
        else {
            var m = {
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
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcStandAvatarMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            gcStandAvatarMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3007 = customCommand_3007;
    function customCommand_3008(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        GameImageLayer.deletePassage(passageID);
    }
    CommandExecute.customCommand_3008 = customCommand_3008;
    function customCommand_3009(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof GameSprite))
            return;
        var sign = "gcImageSpriteRotationMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        if (cp.rotation != 0) {
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcGameSpriteRotationMoveFrameUpdate, thisPtr, [a, cp.rotation, passageID, sign], sign);
            gcGameSpriteRotationMoveFrameUpdate.apply(thisPtr, [a, cp.rotation, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3009 = customCommand_3009;
    function customCommand_3010(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
        }
        GameImageLayer.deletePassage(passageID);
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
        var a = GameUI.load(uiID, cp.showType == 1);
        a.useDPCoordScaleMode = true;
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
    CommandExecute.customCommand_3010 = customCommand_3010;
    function customCommand_3011(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
        }
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof GUI_BASE))
            return;
        var sign = "gcUIMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
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
        else {
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
            var m = {
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
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUIMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            gcUIMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3011 = customCommand_3011;
    function customCommand_3012(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
            GameUI.hide(uiID);
        }
        GameImageLayer.deletePassage(passageID);
    }
    CommandExecute.customCommand_3012 = customCommand_3012;
    function customCommand_3013(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        if (!cp.changeUIAttr || !Array.isArray(cp.changeUIAttr))
            return;
        var cmdParam = cp.changeUIAttr[1];
        if (!cmdParam)
            return;
        var atts = cmdParam[2];
        if (!atts || !atts.uiID)
            return;
        var uiID = atts.uiID;
        var passageID = 1000000 + uiID;
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof GUI_BASE))
            return;
        var sign = "gcUICompMove" + ObjectUtils.getRandID();
        if (cmdParam[5] == 0) {
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var attValue = attsValues[attName];
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
            };
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var oldValue = uiComp[attName];
                        var needTween = typeof oldValue == "number";
                        var useVarAndTransition = useVarAndTransitionAttrs[attName];
                        if (useVarAndTransition) {
                            if (!useVarAndTransition.change) {
                                needTween = false;
                            }
                        }
                        var newValue = attsValues[attName];
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
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUICompMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cmdParam[3]], sign);
            gcUICompMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cmdParam[3]]);
        }
    }
    CommandExecute.customCommand_3013 = customCommand_3013;
    function customCommand_3014(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var materialData = [];
        for (var i = 0; i < cp.materialData.length; i++) {
            var md = { materials: cp.materialData[i].materials.concat() };
            materialData.push(md);
        }
        if (cp.targetType == 0) {
            var imageLayer = Game.layer.imageLayer;
            var stageInfos = materialData;
            for (var p = 0; p < stageInfos.length; p++) {
                var stageInfo = stageInfos[p];
                for (var s = 0; s < stageInfo.materials.length; s++) {
                    var mData = stageInfo.materials[s];
                    mData.____timeInfo = {};
                    var m = imageLayer.getMaterialByID(mData.id, p);
                    if (m)
                        imageLayer.removeMaterial(mData, p);
                    imageLayer.addMaterial(mData, p);
                }
            }
        }
        else if (cp.targetType == 1) {
            var imagePassageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
            var imagePassageInfos = { passageID: imagePassageID, materialSetting: materialData };
            var a = GameImageLayer.getImageSprite(imagePassageID);
            if (!a || !(a instanceof GameSprite))
                return;
            for (var p = 0; p < imagePassageInfos.materialSetting.length; p++) {
                var materialSetting = imagePassageInfos.materialSetting[p];
                for (var s = 0; s < materialSetting.materials.length; s++) {
                    var mData = materialSetting.materials[s];
                    mData.____timeInfo = {};
                    var m = a.getMaterialByID(mData.id, p);
                    if (m)
                        a.removeMaterial(mData, p);
                    a.addMaterial(mData, p);
                    a.setMaterialDirty();
                }
            }
        }
        else if (cp.targetType == 2) {
            var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
            var uiPassageInfos = { uiID: uiID, materialSetting: materialData };
            var targetPassageID = 1000000 + uiPassageInfos.uiID;
            var b = GameImageLayer.getImageSprite(targetPassageID);
            if (!b || !(b instanceof GUI_BASE))
                return;
            for (var p = 0; p < uiPassageInfos.materialSetting.length; p++) {
                var materialSetting = uiPassageInfos.materialSetting[p];
                for (var s = 0; s < materialSetting.materials.length; s++) {
                    var mData = materialSetting.materials[s];
                    mData.____timeInfo = {};
                    var m = b.getMaterialByID(mData.id, p);
                    if (m)
                        b.removeMaterial(mData, p);
                    b.addMaterial(mData, p);
                    b.setMaterialDirty();
                }
            }
        }
    }
    CommandExecute.customCommand_3014 = customCommand_3014;
    function customCommand_3015(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        customCommand_3014.apply(this, arguments);
    }
    CommandExecute.customCommand_3015 = customCommand_3015;
    function customCommand_3016(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var cmdParams = cp;
        if (cmdParams.targetType == 0) {
            var imageLayer = Game.layer.imageLayer;
            if (cmdParams.clearType == 1) {
                imageLayer.removeMaterialByID(cp.materialID, cp.materialPassage);
            }
            else {
                imageLayer.clearMaterials();
            }
        }
        else if (cmdParams.targetType == 1) {
            var imagePassageID = cmdParams.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cmdParams.passageID;
            var a = GameImageLayer.getImageSprite(imagePassageID);
            if (!a || !(a instanceof GameSprite))
                return;
            if (cmdParams.clearType == 1) {
                a.removeMaterialByID(cp.materialID, cp.materialPassage);
            }
            else {
                a.clearMaterials();
            }
        }
        else if (cmdParams.targetType == 2) {
            var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
            var targetPassageID = 1000000 + uiID;
            var b = GameImageLayer.getImageSprite(targetPassageID);
            if (!b || !(b instanceof GUI_BASE))
                return;
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
    CommandExecute.customCommand_3016 = customCommand_3016;
    function customCommand_3017(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        Game.player.toScene(cp.scene);
    }
    CommandExecute.customCommand_3017 = customCommand_3017;
    function customCommand_3018(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        GameImageLayer.deletePassage(passageID);
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
        var a = new UIVideo();
        a.useDPCoord = true;
        a.dpDisplayPriority = passageID;
        a.videoURL = video;
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
    CommandExecute.customCommand_3018 = customCommand_3018;
    function customCommand_3019(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof UIBitmap))
            return;
        var sign = "gcVideoMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
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
        else {
            var m = {
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
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcImageMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            gcImageMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3019 = customCommand_3019;
    function gcImageMoveFrameUpdate(a, m, passageID, sign) {
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
    CommandExecute.gcImageMoveFrameUpdate = gcImageMoveFrameUpdate;
    function gcCameraMoveFrameUpdate(a, m, passageID, sign) {
        var imageLayer = Game.layer.imageLayer;
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
    CommandExecute.gcCameraMoveFrameUpdate = gcCameraMoveFrameUpdate;
    function gcAnimationMoveFrameUpdate(a, m, passageID, sign, changeFrame) {
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
    CommandExecute.gcAnimationMoveFrameUpdate = gcAnimationMoveFrameUpdate;
    function gcStandAvatarMoveFrameUpdate(a, m, passageID, sign) {
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
    CommandExecute.gcStandAvatarMoveFrameUpdate = gcStandAvatarMoveFrameUpdate;
    function gcGameSpriteRotationMoveFrameUpdate(a, rotation, passageID, sign) {
        if (a) {
            a.rotation2 += rotation;
        }
        else {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    CommandExecute.gcGameSpriteRotationMoveFrameUpdate = gcGameSpriteRotationMoveFrameUpdate;
    function gcUIMoveFrameUpdate(a, m, passageID, sign) {
        if (!a || a.isDisposed) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            return;
        }
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
    CommandExecute.gcUIMoveFrameUpdate = gcUIMoveFrameUpdate;
    function gcUICompMoveFrameUpdate(a, m, passageID, sign, nonTweenType) {
        var per = m.curTime / m.time;
        for (var i = 0; i < m.attrInfos.length; i++) {
            var attrInfo = m.attrInfos[i];
            if (!attrInfo.needTween) {
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
    CommandExecute.gcUICompMoveFrameUpdate = gcUICompMoveFrameUpdate;
    var useOnceUIInfos = {};
    EventUtils.addEventListener(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, Callback.New(function (uiID) {
        var passageID = 1000000 + uiID;
        var ui = GameUI.get(uiID);
        if (!ui)
            return;
        var useOnceUIInfo = useOnceUIInfos[uiID];
        if (useOnceUIInfo) {
            for (var i in useOnceUIInfo) {
                if (i == "uiCompInfo")
                    continue;
                ui[i] = useOnceUIInfo[i];
            }
            var childs = GameUI.getAllCompChildren(ui, true, function (uiComp) {
                if (uiComp instanceof UIList) {
                    return false;
                }
            }).keyValue;
            for (var uiCompID in useOnceUIInfo.uiCompInfo) {
                var uiComp = childs[uiCompID];
                if (!uiComp)
                    continue;
                var uiCompInfo = useOnceUIInfo.uiCompInfo[uiCompID];
                for (var varName in uiCompInfo) {
                    uiComp[varName] = uiCompInfo[varName];
                }
            }
            delete useOnceUIInfos[uiID];
        }
        GameImageLayer.setImageSprite(passageID, ui);
    }, null));
    EventUtils.addEventListener(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, Callback.New(function (uiID) {
        var passageID = 1000000 + uiID;
        GameImageLayer.deletePassage(passageID);
    }, null));
    if (!Config.BEHAVIOR_EDIT_MODE) {
        SinglePlayerGame.regSaveCustomData("cmdImagerLayer", Callback.New(function () {
            var imageSpriteInfos = {};
            for (var passageIDStr in GameImageLayer.imageSprites) {
                var disobjectInfo = GameImageLayer.imageSprites[passageIDStr];
                var sp = disobjectInfo.displayObject;
                var displayObjectAttrs = {};
                var materialData = sp.getAllMaterialDatas();
                displayObjectAttrs["___materialData"] = materialData;
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
                else if (sp instanceof UIAnimation) {
                    var saveAttrs = ["animationID", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "playType", "silentMode", "showHitEffect", "playFps"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["aniFrame"] = sp.animation.currentFrame;
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIAnimation",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                else if (sp instanceof UIStandAvatar) {
                    var saveAttrs = ["avatarID", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "isPlay", "playOnce", "actionID", "avatarFPS"];
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["avatarFrame"] = sp.avatar.currentFrame;
                    imageSpriteInfos[passageIDStr] = {
                        type: "UIStandAvatar",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
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
                    displayObjectAttrs["guiID"] = sp.guiID;
                    imageSpriteInfos[passageIDStr] = {
                        type: "GUI_BASE",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                else {
                    continue;
                }
            }
            var passageFrameUpdateDatas = {};
            var passageFrameUpdates = GameImageLayer.getPassageFrameUpdates();
            for (var passageIDStr in passageFrameUpdates) {
                var pArr = passageFrameUpdates[passageIDStr];
                if (pArr) {
                    var pDataArr = passageFrameUpdateDatas[passageIDStr] = [];
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var args = p.args.concat();
                        args.shift();
                        if (p.sign.indexOf("gcUICompMove") != -1) {
                            var m = args[0];
                            var newM = {
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
            var allSystemGroupUIs = GameUI.getAllSystemGroupUIs();
            var saveDataUseOnceUIInfo = {};
            var BASE_ATTRS_OBJ = { x: true, y: true, width: true, height: true, rotation: true, show: true, opacity: true, mouseEventEnabledData: true };
            for (var o in allSystemGroupUIs) {
                var uiID = parseInt(o);
                var ui = allSystemGroupUIs[o];
                if (!ui)
                    continue;
                var uiPosData = {
                    x: ui.x, y: ui.y, scaleX: ui.scaleX, scaleY: ui.scaleX, rotation1: ui.rotation1, rotation2: ui.rotation2, opacity: ui.opacity,
                    uiCompInfo: {}
                };
                saveDataUseOnceUIInfo[uiID] = uiPosData;
                var allComps = GameUI.getAllCompChildren(ui, false).arr;
                allComps.forEach(function (comp) {
                    if (comp instanceof UIBase) {
                        var uiCompAtts = uiPosData.uiCompInfo[comp.id] = {};
                        for (var b in BASE_ATTRS_OBJ) {
                            uiCompAtts[b] = comp[b];
                        }
                        var __compCustomAttributes = GameUI["__compCustomAttributes"];
                        if (__compCustomAttributes) {
                            var customAttrs = __compCustomAttributes[comp.className];
                            for (var c in customAttrs) {
                                var b = customAttrs[c];
                                uiCompAtts[b] = comp[b];
                            }
                        }
                    }
                });
            }
            var imageLayer = Game.layer.imageLayer;
            var cameraInfo = {
                x: imageLayer.camera.viewPort.x,
                y: imageLayer.camera.viewPort.y,
                z: imageLayer.camera.z,
                rotation: imageLayer.camera.rotation
            };
            var imageLayerMaterialData = Game.layer.imageLayer.getAllMaterialDatas();
            return { cameraInfo: cameraInfo, imageSpriteInfos: imageSpriteInfos, passageFrameUpdateDatas: passageFrameUpdateDatas, saveDataUseOnceUIInfo: saveDataUseOnceUIInfo, imageLayerMaterialData: imageLayerMaterialData };
        }, {}));
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(function () {
            GameDialog.stop();
            for (var pi in GameImageLayer.imageSprites) {
                var passageID = parseInt(pi);
                var sp = GameImageLayer.getImageSprite(passageID);
                if (sp instanceof GUI_BASE && (sp.guiID == 1 || sp.guiID == 2 || sp.guiID == 2003)) {
                }
                else {
                    GameImageLayer.deletePassage(passageID);
                    if (sp instanceof GUI_BASE) {
                        if (sp == GameUI.get(sp.guiID)) {
                            GameUI.dispose(sp.guiID);
                        }
                    }
                }
            }
            Game.layer.imageLayer.clearMaterials();
            function installMaterialData(sp, materialData) {
                if (!materialData || materialData.length == 0)
                    return;
                sp.installMaterialData(materialData, false);
            }
            var o = SinglePlayerGame.getSaveCustomData("cmdImagerLayer");
            if (!o)
                return;
            useOnceUIInfos = o.saveDataUseOnceUIInfo;
            var imageSpriteInfos = o.imageSpriteInfos;
            for (var passageIDStr in imageSpriteInfos) {
                var passageID = MathUtils.int(passageIDStr);
                var imageSpriteInfo = imageSpriteInfos[passageIDStr];
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
                        d.dpDisplayPriority = imageSpriteInfo.displayObjectAttrs["___childIndex"];
                        GameUI.show(uiID);
                    }
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        d[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(d, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
            }
            var uiChilds = [];
            var uiChildLength = Game.layer.uiLayer.numChildren;
            for (var s = 0; s < uiChildLength; s++) {
                uiChilds.push(Game.layer.uiLayer.getChildAt(s));
            }
            uiChilds.sort(function (a, b) {
                return a.dpDisplayPriority < b.dpDisplayPriority ? -1 : 1;
            });
            for (var j = 0; j < uiChildLength; j++) {
                Game.layer.uiLayer.setChildIndex(uiChilds[j], j);
            }
            var imageLayer = Game.layer.imageLayer;
            imageLayer.camera.viewPort.x = o.cameraInfo.x;
            imageLayer.camera.viewPort.y = o.cameraInfo.y;
            imageLayer.camera.z = o.cameraInfo.z;
            imageLayer.camera.rotation = o.cameraInfo.rotation;
            Game.layer.imageLayer.updateFrame(true);
            var passageFrameUpdateDatas = o.passageFrameUpdateDatas;
            for (var passageIDStr in passageFrameUpdateDatas) {
                var passageID = MathUtils.int(passageIDStr);
                var pArr = passageFrameUpdateDatas[passageIDStr];
                if (pArr) {
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var thisPtr = {};
                        if (p.sign == "gcImageMove") {
                            var bmp = GameImageLayer.getImageSprite(passageID);
                            if (!bmp || !(bmp instanceof UIBitmap))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcImageMoveFrameUpdate, thisPtr, [bmp].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcVideoMove") {
                            var video = GameImageLayer.getImageSprite(passageID);
                            if (!video || !(video instanceof UIVideo))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcImageMoveFrameUpdate, thisPtr, [video].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcCameraMove") {
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcCameraMoveFrameUpdate, thisPtr, [null].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcAnimationMove") {
                            var ani = GameImageLayer.getImageSprite(passageID);
                            if (!ani || !(ani instanceof UIAnimation))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcAnimationMoveFrameUpdate, thisPtr, [ani].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcStandAvatarMove") {
                            var standAvatar = GameImageLayer.getImageSprite(passageID);
                            if (!standAvatar || !(standAvatar instanceof UIStandAvatar))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcStandAvatarMoveFrameUpdate, thisPtr, [standAvatar].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcImageSpriteRotationMove") {
                            var sp = GameImageLayer.getImageSprite(passageID);
                            if (!sp || !(sp instanceof GameSprite))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcGameSpriteRotationMoveFrameUpdate, thisPtr, [sp].concat(p.args), p.sign);
                        }
                        else if (p.sign == "gcUIMove") {
                            var ui = GameImageLayer.getImageSprite(passageID);
                            if (!ui || !(ui instanceof GUI_BASE))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUIMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                        else if (p.sign.indexOf("gcUICompMove") != -1) {
                            var ui = GameImageLayer.getImageSprite(passageID);
                            if (!ui || !(ui instanceof GUI_BASE))
                                continue;
                            var m = p.args[0];
                            var uiComps = GameUI.getAllCompChildren(ui, true);
                            for (var k = 0; k < m.attrInfos.length; k++) {
                                var attrInfo = m.attrInfos[k];
                                attrInfo.uiComp = uiComps.keyValue[attrInfo.uiCompID];
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
            installMaterialData(Game.layer.imageLayer, o.imageLayerMaterialData);
        }, {}, null));
    }
    var PLUGIN_COMMAND_SHOWPICTURE = 3001;
    var PLUGIN_COMMAND_SHOWANIMATION = 3004;
    var PLUGIN_COMMAND_SHOWSTANDAVATAR = 3006;
    var PLUGIN_COMMAND_SHOWUI = 3010;
    var preloadCommandPageInfo = {};
    var oldPreLoadCommandPage = AssetManager.preLoadCommandPage;
    AssetManager.preLoadCommandPage = function (commandPage, complete, syncCallbackWhenAssetExist, autoDispose) {
        if (complete === void 0) { complete = null; }
        if (syncCallbackWhenAssetExist === void 0) { syncCallbackWhenAssetExist = false; }
        if (autoDispose === void 0) { autoDispose = false; }
        var imageArr = [];
        var aniArr = [];
        var standAvatarArr = [];
        var uiArr = [];
        preloadCommandPageInfo[commandPage.id] = {
            imageArr: imageArr,
            aniArr: aniArr,
            standAvatarArr: standAvatarArr,
            uiArr: uiArr
        };
        for (var i = 0; i < commandPage.commands.length; i++) {
            var cmd = commandPage.commands[i];
            if (cmd.customID == PLUGIN_COMMAND_SHOWPICTURE) {
                var cp = cmd.params[0];
                if (!cp.imageUseVar) {
                    imageArr.push(cp.image);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWANIMATION) {
                var cp2 = cmd.params[0];
                if (!cp2.objectUseVar) {
                    aniArr.push(cp2.animation);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWSTANDAVATAR) {
                var cp3 = cmd.params[0];
                if (!cp3.objectUseVar) {
                    standAvatarArr.push(cp3.standAvatar);
                }
            }
            else if (cmd.customID == PLUGIN_COMMAND_SHOWUI) {
                var cp4 = cmd.params[0];
                if (!cp4.objectUseVar) {
                    uiArr.push(cp4.uiID);
                }
            }
        }
        var oldArgs = arguments;
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
    };
    var oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage) {
        var cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            var imageCache = cache.imageArr, uiCache = cache.uiArr, animationCache = cache.aniArr, standAvatarCache = cache.standAvatarArr;
            AssetManager.disposeImages(imageCache);
            for (var s = 0; s < uiCache.length; s++)
                AssetManager.disposeUIAsset(uiCache[s]);
            for (var s = 0; s < animationCache.length; s++)
                AssetManager.disposeAnimationAsset(animationCache[s]);
            for (var s = 0; s < standAvatarCache.length; s++)
                AssetManager.disposeStandAvatarAsset(standAvatarCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    };
})(CommandExecute || (CommandExecute = {}));
//# sourceMappingURL=CustomCommand2.js.map