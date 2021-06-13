var CommandExecute;
(function (CommandExecute) {
    var imageLayerModePassageID = 2005631;
    var uiLayerModePassageID = 2005632;
    var stageLayerModePassageID = 2005633;
    var gcImageShakeSign = "gcImageShake_kds1";
    function customCommand_15002(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID;
        var thisPtr = {};
        var imageShakeParams = { duringFrame: cp.shakeTimeType == 0 ? cp.duringFrame : null };
        var a = null;
        if (cp.type == 0) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
            passageID = MathUtils.int(passageID);
            a = GameImageLayer.getImageSprite(passageID);
            if (!a || !(a instanceof GameSprite))
                return;
        }
        else if (cp.type == 1) {
            passageID = imageLayerModePassageID;
        }
        else if (cp.type == 2) {
            passageID = uiLayerModePassageID;
        }
        else if (cp.type == 3) {
            passageID = stageLayerModePassageID;
        }
        GameImageLayer.clearPassageFrameUpdate(passageID, gcImageShakeSign);
        gcImageShakeReset_kds1.apply(this, [a, cp.type]);
        if (cp.shakeTimeType == 2) {
            return;
        }
        if (cp.type == 0) {
            imageShakeInfoArr.push({ passageID: passageID, imageShakeParams: imageShakeParams, dx: cp.dx, dy: cp.dy, objDx: 0, objDy: 0, objCurX: null, objCurY: null });
        }
        else if (cp.type == 1) {
            imageLayerShakeInfo = { imageShakeParams: imageShakeParams, dx: cp.dx, dy: cp.dy, objDx: 0, objDy: 0, objCurX: null, objCurY: null };
        }
        else if (cp.type == 2) {
            uiLayerShakeInfo = { imageShakeParams: imageShakeParams, dx: cp.dx, dy: cp.dy, objDx: 0, objDy: 0, objCurX: null, objCurY: null };
        }
        else if (cp.type == 3) {
            stageLayerShakeInfo = { imageShakeParams: imageShakeParams, dx: cp.dx, dy: cp.dy, objDx: 0, objDy: 0, objCurX: null, objCurY: null };
        }
        GameImageLayer.regPassageFrameUpdate(passageID, gcImageShakeFrameUpdate_kds1, thisPtr, [a, imageShakeParams, cp.type, cp.dx, cp.dy, passageID, gcImageShakeSign], gcImageShakeSign);
        gcImageShakeFrameUpdate_kds1.apply(thisPtr, [a, imageShakeParams, cp.type, cp.dx, cp.dy, passageID, gcImageShakeSign]);
    }
    CommandExecute.customCommand_15002 = customCommand_15002;
    function gcImageShakeReset_kds1(a, type) {
        if (type == 1) {
            var dx = MathUtils.int(Game.layer.imageLayer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer.imageLayer["__imageShake_kds1_dy"]);
            Game.layer.imageLayer["__imageShake_kds1_dx"] = Game.layer.imageLayer["__imageShake_kds1_dy"] = 0;
            if (Game.layer.imageLayer["__imageShake_kds1_curX"] == Game.layer.imageLayer.camera.offsetX && Game.layer.imageLayer["__imageShake_kds1_curY"] == Game.layer.imageLayer.camera.offsetY) {
                Game.layer.imageLayer.camera.offsetX -= dx;
                Game.layer.imageLayer.camera.offsetY -= dy;
            }
        }
        else if (type == 2) {
            var dx = MathUtils.int(Game.layer.uiLayer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer.uiLayer["__imageShake_kds1_dy"]);
            Game.layer.uiLayer["__imageShake_kds1_dx"] = Game.layer.uiLayer["__imageShake_kds1_dy"] = 0;
            if (Game.layer.uiLayer["__imageShake_kds1_curX"] == Game.layer.uiLayer.x && Game.layer.uiLayer["__imageShake_kds1_curY"] == Game.layer.uiLayer.y) {
                Game.layer.uiLayer.x -= dx;
                Game.layer.uiLayer.y -= dy;
            }
        }
        else if (type == 3) {
            var dx = MathUtils.int(Game.layer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer["__imageShake_kds1_dy"]);
            Game.layer["__imageShake_kds1_dx"] = Game.layer["__imageShake_kds1_dy"] = 0;
            if (Game.layer["__imageShake_kds1_curX"] == Game.layer.x && Game.layer["__imageShake_kds1_curY"] == Game.layer.y) {
                Game.layer.x -= dx;
                Game.layer.y -= dy;
            }
        }
        else if (a) {
            var dx = MathUtils.int(a["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(a["__imageShake_kds1_dy"]);
            a["__imageShake_kds1_dx"] = a["__imageShake_kds1_dy"] = 0;
            if (a["__imageShake_kds1_curX"] == a.dpX && a["__imageShake_kds1_curY"] == a.dpY) {
                a.dpX -= dx;
                a.dpY -= dy;
            }
        }
    }
    function gcImageShakeFrameUpdate_kds1(a, imageShakeParams, type, dx, dy, passageID, sign) {
        var newDx = Math.floor(dx * 2 * Math.random() - dx);
        var newDy = Math.floor(dy * 2 * Math.random() - dy);
        gcImageShakeReset_kds1.apply(this, [a, type]);
        if (type == 1) {
            Game.layer.imageLayer["__imageShake_kds1_dx"] = newDx;
            Game.layer.imageLayer["__imageShake_kds1_dy"] = newDy;
            Game.layer.imageLayer.camera.offsetX += newDx;
            Game.layer.imageLayer.camera.offsetY += newDy;
            Game.layer.imageLayer.updateFrame(true);
            Game.layer.imageLayer["__imageShake_kds1_curX"] = Game.layer.imageLayer.camera.offsetX;
            Game.layer.imageLayer["__imageShake_kds1_curY"] = Game.layer.imageLayer.camera.offsetY;
        }
        else if (type == 2) {
            Game.layer.uiLayer["__imageShake_kds1_dx"] = newDx;
            Game.layer.uiLayer["__imageShake_kds1_dy"] = newDy;
            Game.layer.uiLayer.x += newDx;
            Game.layer.uiLayer.y += newDy;
            Game.layer.uiLayer["__imageShake_kds1_curX"] = Game.layer.uiLayer.x;
            Game.layer.uiLayer["__imageShake_kds1_curY"] = Game.layer.uiLayer.y;
        }
        else if (type == 3) {
            Game.layer["__imageShake_kds1_dx"] = newDx;
            Game.layer["__imageShake_kds1_dy"] = newDy;
            Game.layer.x += newDx;
            Game.layer.y += newDy;
            Game.layer["__imageShake_kds1_curX"] = Game.layer.x;
            Game.layer["__imageShake_kds1_curY"] = Game.layer.y;
        }
        else {
            if (a && !a.isDisposed) {
                a["__imageShake_kds1_dx"] = newDx;
                a["__imageShake_kds1_dy"] = newDy;
                a.dpX += newDx;
                a.dpY += newDy;
                a["__imageShake_kds1_curX"] = a.dpX;
                a["__imageShake_kds1_curY"] = a.dpY;
            }
            else {
                gcImageShakeReset_kds1.apply(this, [a, type]);
                GameImageLayer.clearPassageFrameUpdate(passageID, sign);
                return;
            }
        }
        if (imageShakeParams.duringFrame != null) {
            imageShakeParams.duringFrame--;
            if (imageShakeParams.duringFrame == 0) {
                gcImageShakeReset_kds1.apply(this, [a, type]);
                GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            }
        }
    }
    CommandExecute.gcImageShakeFrameUpdate_kds1 = gcImageShakeFrameUpdate_kds1;
    var imageShakeInfoArr = [];
    var imageLayerShakeInfo;
    var uiLayerShakeInfo;
    var stageLayerShakeInfo;
    function clearNeedSaveInfo_ImagePassage(passageID) {
        var lastSaveIdx = ArrayUtils.matchAttributes(imageShakeInfoArr, { passageID: passageID }, true, "==", true)[0];
        if (lastSaveIdx != null)
            imageShakeInfoArr.splice(lastSaveIdx, 1);
    }
    function clearNeedSaveInfo_ImageLayer() {
        imageLayerShakeInfo = null;
    }
    function clearNeedSaveInfo_UILayer() {
        uiLayerShakeInfo = null;
    }
    function clearNeedSaveInfo_StageLayer() {
        stageLayerShakeInfo = null;
    }
    if (!Config.BEHAVIOR_EDIT_MODE) {
        var oldClearPassageFrameUpdate = GameImageLayer.clearPassageFrameUpdate;
        GameImageLayer.clearPassageFrameUpdate = function (passageID, sign) {
            if (sign === void 0) { sign = null; }
            if (sign == gcImageShakeSign) {
                if (passageID == imageLayerModePassageID) {
                    clearNeedSaveInfo_ImageLayer();
                }
                else if (passageID == uiLayerModePassageID) {
                    clearNeedSaveInfo_UILayer();
                }
                else if (passageID == stageLayerModePassageID) {
                    clearNeedSaveInfo_StageLayer();
                }
                else {
                    clearNeedSaveInfo_ImagePassage(passageID);
                }
            }
            oldClearPassageFrameUpdate.apply(this, arguments);
        };
        SinglePlayerGame.regSaveCustomData("cmdImageShake_kds1", Callback.New(function () {
            for (var i = 0; i < imageShakeInfoArr.length; i++) {
                var thisPtr = {};
                var imageShakeInfo = imageShakeInfoArr[i];
                var a = GameImageLayer.getImageSprite(imageShakeInfo.passageID);
                if (a) {
                    imageShakeInfo.objDx = a["__imageShake_kds1_dx"];
                    imageShakeInfo.objDy = a["__imageShake_kds1_dy"];
                    imageShakeInfo.objCurX = a["__imageShake_kds1_curX"];
                    imageShakeInfo.objCurY = a["__imageShake_kds1_curY"];
                }
            }
            if (imageLayerShakeInfo) {
                imageLayerShakeInfo.objDx = Game.layer.imageLayer["__imageShake_kds1_dx"];
                imageLayerShakeInfo.objDy = Game.layer.imageLayer["__imageShake_kds1_dy"];
                imageLayerShakeInfo.objCurX = Game.layer.imageLayer["__imageShake_kds1_curX"];
                imageLayerShakeInfo.objCurY = Game.layer.imageLayer["__imageShake_kds1_curY"];
            }
            if (uiLayerShakeInfo) {
                uiLayerShakeInfo.objDx = Game.layer.uiLayer["__imageShake_kds1_dx"];
                uiLayerShakeInfo.objDy = Game.layer.uiLayer["__imageShake_kds1_dy"];
                uiLayerShakeInfo.objCurX = Game.layer.uiLayer["__imageShake_kds1_curX"];
                uiLayerShakeInfo.objCurY = Game.layer.uiLayer["__imageShake_kds1_curY"];
            }
            if (stageLayerShakeInfo) {
                stageLayerShakeInfo.objDx = Game.layer["__imageShake_kds1_dx"];
                stageLayerShakeInfo.objDy = Game.layer["__imageShake_kds1_dy"];
                stageLayerShakeInfo.objCurX = Game.layer["__imageShake_kds1_curX"];
                stageLayerShakeInfo.objCurY = Game.layer["__imageShake_kds1_curY"];
            }
            return [imageShakeInfoArr, imageLayerShakeInfo, uiLayerShakeInfo, stageLayerShakeInfo, Game.layer.imageLayer.camera.offsetX, Game.layer.imageLayer.camera.offsetY, Game.layer.uiLayer.x, Game.layer.uiLayer.y];
        }, {}));
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(function () {
            for (var i = 0; i < imageShakeInfoArr.length; i++) {
                var imageShakeInfo = imageShakeInfoArr[i];
                var args = [a, imageShakeInfo.imageShakeParams, 0, imageShakeInfo.dx, imageShakeInfo.dy, imageShakeInfo.passageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(imageShakeInfo.passageID, gcImageShakeSign);
            }
            if (imageLayerShakeInfo) {
                var args = [null, imageLayerShakeInfo.imageShakeParams, 1, imageLayerShakeInfo.dx, imageLayerShakeInfo.dy, imageLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(imageLayerModePassageID, gcImageShakeSign);
            }
            if (uiLayerShakeInfo) {
                var args = [null, uiLayerShakeInfo.imageShakeParams, 2, uiLayerShakeInfo.dx, uiLayerShakeInfo.dy, uiLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(uiLayerModePassageID, gcImageShakeSign);
            }
            if (stageLayerShakeInfo) {
                var args = [null, stageLayerShakeInfo.imageShakeParams, 3, stageLayerShakeInfo.dx, stageLayerShakeInfo.dy, stageLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(stageLayerModePassageID, gcImageShakeSign);
            }
            var saveData = SinglePlayerGame.getSaveCustomData("cmdImageShake_kds1");
            if (saveData) {
                imageShakeInfoArr = saveData[0];
                imageLayerShakeInfo = saveData[1];
                uiLayerShakeInfo = saveData[2];
                stageLayerShakeInfo = saveData[3];
                Game.layer.imageLayer.camera.offsetX = saveData[4];
                Game.layer.imageLayer.camera.offsetY = saveData[5];
                Game.layer.uiLayer.x = saveData[6];
                Game.layer.uiLayer.y = saveData[7];
                for (var i = 0; i < imageShakeInfoArr.length; i++) {
                    var thisPtr = {};
                    var imageShakeInfo = imageShakeInfoArr[i];
                    var a = GameImageLayer.getImageSprite(imageShakeInfo.passageID);
                    if (a) {
                        a["__imageShake_kds1_dx"] = imageShakeInfo.objDx;
                        a["__imageShake_kds1_dy"] = imageShakeInfo.objDy;
                        a["__imageShake_kds1_curX"] = imageShakeInfo.objCurX;
                        a["__imageShake_kds1_curY"] = imageShakeInfo.objCurY;
                        var args = [a, imageShakeInfo.imageShakeParams, 0, imageShakeInfo.dx, imageShakeInfo.dy, imageShakeInfo.passageID, gcImageShakeSign];
                        GameImageLayer.regPassageFrameUpdate(imageShakeInfo.passageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                        gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                    }
                    else {
                        imageShakeInfoArr.splice(i, 1);
                        i--;
                    }
                }
                if (imageLayerShakeInfo) {
                    Game.layer.imageLayer["__imageShake_kds1_dx"] = imageLayerShakeInfo.objDx;
                    Game.layer.imageLayer["__imageShake_kds1_dy"] = imageLayerShakeInfo.objDy;
                    Game.layer.imageLayer["__imageShake_kds1_curX"] = imageLayerShakeInfo.objCurX;
                    Game.layer.imageLayer["__imageShake_kds1_curY"] = imageLayerShakeInfo.objCurY;
                    var args = [null, imageLayerShakeInfo.imageShakeParams, 1, imageLayerShakeInfo.dx, imageLayerShakeInfo.dy, imageLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(imageLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
                if (uiLayerShakeInfo) {
                    Game.layer.uiLayer["__imageShake_kds1_dx"] = uiLayerShakeInfo.objDx;
                    Game.layer.uiLayer["__imageShake_kds1_dy"] = uiLayerShakeInfo.objDy;
                    Game.layer.uiLayer["__imageShake_kds1_curX"] = uiLayerShakeInfo.objCurX;
                    Game.layer.uiLayer["__imageShake_kds1_curY"] = uiLayerShakeInfo.objCurY;
                    var args = [null, uiLayerShakeInfo.imageShakeParams, 2, uiLayerShakeInfo.dx, uiLayerShakeInfo.dy, uiLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(uiLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
                if (stageLayerShakeInfo) {
                    Game.layer["__imageShake_kds1_dx"] = stageLayerShakeInfo.objDx;
                    Game.layer["__imageShake_kds1_dy"] = stageLayerShakeInfo.objDy;
                    Game.layer["__imageShake_kds1_curX"] = stageLayerShakeInfo.objCurX;
                    Game.layer["__imageShake_kds1_curY"] = stageLayerShakeInfo.objCurY;
                    var args = [null, stageLayerShakeInfo.imageShakeParams, 3, stageLayerShakeInfo.dx, stageLayerShakeInfo.dy, stageLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(stageLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
            }
        }, {}, null));
    }
})(CommandExecute || (CommandExecute = {}));
//# sourceMappingURL=ImageShake_kds1.js.map