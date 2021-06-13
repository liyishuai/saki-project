/**
 * 插件-图像震动
 * 
 * == 功能支持 ==
 * 让指定的显示对象开始震动，根据x轴和y轴的震动幅度随机抖动
 * 1.指定某个图像通道震动
 * 2.指定图像层震动
 * 3.指定界面层震动（界面层包含了对话框）
 * 4.指定整个画面震动
 * 5.可设定一段时间帧数内震动或者持续震动
 * 6.可控制何时停止震动
 * 7.支持存档，如果震动中存档，则读档后会恢复原来的状态
 * 8.支持编辑器实时预览效果（预览模式下点击播放时）
 * 9.RPG模板和AVG模板均适用
 * 
 * --------------------------------------------------------------------------------------
 * 来源：www.gamecreator.com.cn 如果对您有帮助，请支持我们，购买正版永久版软件
 *       GameCreator 是一款由兴趣而生的国产可视化游戏制作软件，
 *       致力于可视化、低门槛、游戏模板化、用户创作分享式以及社区化制作游戏
 * --------------------------------------------------------------------------------------
 * 
 * Created by 黑暗之神KDS on 2021-02-18 16:57:21.
 */
module CommandExecute {
    // 图像层震动的场合 避免与其他冲突，如果有冲突，需要修改此处
    var imageLayerModePassageID = 2005631;
    // 画面震动的场合 避免与其他冲突，如果有冲突，需要修改此处
    var uiLayerModePassageID = 2005632;
    // 画面震动的场合 避免与其他冲突，如果有冲突，需要修改此处
    var stageLayerModePassageID = 2005633;
    // 标识
    var gcImageShakeSign = "gcImageShake_kds1";
    /**
     * 自定义指令-图像震动函数
     */
    export function customCommand_15002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_15002): void {
        // 获取通道
        var passageID: number;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷

        var thisPtr = {};
        var imageShakeParams: ImageShakeParams = { duringFrame: cp.shakeTimeType == 0 ? cp.duringFrame : null }
        // -- 指定的图像通道
        var a: GameSprite = null;
        if (cp.type == 0) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
            passageID = MathUtils.int(passageID);
            a = GameImageLayer.getImageSprite(passageID) as any;
            if (!a || !(a instanceof GameSprite)) return;
        }
        // -- 图像层
        else if (cp.type == 1) {
            passageID = imageLayerModePassageID;
        }
        // -- 界面
        else if (cp.type == 2) {
            passageID = uiLayerModePassageID;
        }
        // -- 画面
        else if (cp.type == 3) {
            passageID = stageLayerModePassageID;
        }
        // 清理震动
        GameImageLayer.clearPassageFrameUpdate(passageID, gcImageShakeSign);
        gcImageShakeReset_kds1.apply(this, [a, cp.type]);
        // 停止震动的情况
        if (cp.shakeTimeType == 2) {
            return;
        }
        // 记录存档需要的信息清理掉
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
        // 注册帧刷开始震动
        GameImageLayer.regPassageFrameUpdate(passageID, gcImageShakeFrameUpdate_kds1, thisPtr, [a, imageShakeParams, cp.type, cp.dx, cp.dy, passageID, gcImageShakeSign], gcImageShakeSign);
        gcImageShakeFrameUpdate_kds1.apply(thisPtr, [a, imageShakeParams, cp.type, cp.dx, cp.dy, passageID, gcImageShakeSign]);
    }
    function gcImageShakeReset_kds1(a: GameSprite, type: number) {
        if (type == 1) {
            var dx = MathUtils.int(Game.layer.imageLayer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer.imageLayer["__imageShake_kds1_dy"]);
            Game.layer.imageLayer["__imageShake_kds1_dx"] = Game.layer.imageLayer["__imageShake_kds1_dy"] = 0;
            // 如果与震动位置相同的话才还原，否则不还原
            if (Game.layer.imageLayer["__imageShake_kds1_curX"] == Game.layer.imageLayer.camera.offsetX && Game.layer.imageLayer["__imageShake_kds1_curY"] == Game.layer.imageLayer.camera.offsetY) {
                Game.layer.imageLayer.camera.offsetX -= dx;
                Game.layer.imageLayer.camera.offsetY -= dy;
            }
        }
        else if (type == 2) {
            var dx = MathUtils.int(Game.layer.uiLayer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer.uiLayer["__imageShake_kds1_dy"]);
            Game.layer.uiLayer["__imageShake_kds1_dx"] = Game.layer.uiLayer["__imageShake_kds1_dy"] = 0;
            // 如果与震动位置相同的话才还原，否则不还原
            if (Game.layer.uiLayer["__imageShake_kds1_curX"] == Game.layer.uiLayer.x && Game.layer.uiLayer["__imageShake_kds1_curY"] == Game.layer.uiLayer.y) {
                Game.layer.uiLayer.x -= dx;
                Game.layer.uiLayer.y -= dy;
            }
        }
        else if (type == 3) {
            var dx = MathUtils.int(Game.layer["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(Game.layer["__imageShake_kds1_dy"]);
            Game.layer["__imageShake_kds1_dx"] = Game.layer["__imageShake_kds1_dy"] = 0;
            // 如果与震动位置相同的话才还原，否则不还原
            if (Game.layer["__imageShake_kds1_curX"] == Game.layer.x && Game.layer["__imageShake_kds1_curY"] == Game.layer.y) {
                Game.layer.x -= dx;
                Game.layer.y -= dy;
            }
        }
        else if (a) {
            var dx = MathUtils.int(a["__imageShake_kds1_dx"]);
            var dy = MathUtils.int(a["__imageShake_kds1_dy"]);
            a["__imageShake_kds1_dx"] = a["__imageShake_kds1_dy"] = 0;
            // 如果与震动位置相同的话才还原，否则不还原
            if (a["__imageShake_kds1_curX"] == a.dpX && a["__imageShake_kds1_curY"] == a.dpY) {
                a.dpX -= dx;
                a.dpY -= dy;
            }
        }
    }
    /**
     * 图像震动的逐帧执行的函数
     */
    export function gcImageShakeFrameUpdate_kds1(a: GameSprite, imageShakeParams: ImageShakeParams, type: number, dx: number, dy: number, passageID: number, sign: string) {
        // 该通道的显示对象开始旋转
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
            // 如果已没有显示对象的话就直接清理掉该函数
            else {
                gcImageShakeReset_kds1.apply(this, [a, type]);
                GameImageLayer.clearPassageFrameUpdate(passageID, sign);
                return;
            }
        }
        // 
        if (imageShakeParams.duringFrame != null) {
            imageShakeParams.duringFrame--;
            if (imageShakeParams.duringFrame == 0) {
                gcImageShakeReset_kds1.apply(this, [a, type]);
                GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            }
        }
    }
    // 图像震动参数伪类
    declare class ImageShakeParams {
        duringFrame: number;
    }
    //------------------------------------------------------------------------------------------------------
    // 存档读档支持
    //------------------------------------------------------------------------------------------------------
    var imageShakeInfoArr: { passageID: number, imageShakeParams: ImageShakeParams, dx: number, dy: number, objDx: number, objDy: number, objCurX: number, objCurY: number }[] = [];
    var imageLayerShakeInfo: { imageShakeParams: ImageShakeParams, dx: number, dy: number, objDx: number, objDy: number, objCurX: number, objCurY: number };
    var uiLayerShakeInfo: { imageShakeParams: ImageShakeParams, dx: number, dy: number, objDx: number, objDy: number, objCurX: number, objCurY: number };
    var stageLayerShakeInfo: { imageShakeParams: ImageShakeParams, dx: number, dy: number, objDx: number, objDy: number, objCurX: number, objCurY: number };
    // 查找存档需要的信息清理掉：图像通道
    function clearNeedSaveInfo_ImagePassage(passageID: number): void {
        var lastSaveIdx = ArrayUtils.matchAttributes(imageShakeInfoArr, { passageID: passageID }, true, "==", true)[0];
        if (lastSaveIdx != null) imageShakeInfoArr.splice(lastSaveIdx, 1);
    }
    // 查找存档需要的信息清理掉：图像层
    function clearNeedSaveInfo_ImageLayer(): void {
        imageLayerShakeInfo = null;
    }
    // 查找存档需要的信息清理掉：图像层
    function clearNeedSaveInfo_UILayer(): void {
        uiLayerShakeInfo = null;
    }
    // 查找存档需要的信息清理掉：画面
    function clearNeedSaveInfo_StageLayer(): void {
        stageLayerShakeInfo = null;
    }

    if (!Config.BEHAVIOR_EDIT_MODE) {
        // 重写清理通道的帧刷函数效果，以便在别处调用清理时能够清理掉此处的震动相关信息
        var oldClearPassageFrameUpdate = GameImageLayer.clearPassageFrameUpdate;
        GameImageLayer.clearPassageFrameUpdate = function (passageID: number, sign: string = null): void {
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
        }
        // 注册存档时额外追加的信息
        SinglePlayerGame.regSaveCustomData("cmdImageShake_kds1", Callback.New(() => {
            // -- 记录震动偏移量，以便恢复时能够正确还原
            for (var i = 0; i < imageShakeInfoArr.length; i++) {
                var thisPtr = {};
                var imageShakeInfo = imageShakeInfoArr[i];
                var a: GameSprite = GameImageLayer.getImageSprite(imageShakeInfo.passageID) as any;
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
            // 记录图像层相机偏移
            return [imageShakeInfoArr, imageLayerShakeInfo, uiLayerShakeInfo, stageLayerShakeInfo, Game.layer.imageLayer.camera.offsetX, Game.layer.imageLayer.camera.offsetY, Game.layer.uiLayer.x, Game.layer.uiLayer.y];
        }, {}));
        // 读档时读取该额外信息并加以处理
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(() => {
            // 清场（游戏内读档先关闭当前的效果）
            for (var i = 0; i < imageShakeInfoArr.length; i++) {
                var imageShakeInfo = imageShakeInfoArr[i];
                var args: any = [a, imageShakeInfo.imageShakeParams, 0, imageShakeInfo.dx, imageShakeInfo.dy, imageShakeInfo.passageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(imageShakeInfo.passageID, gcImageShakeSign);
            }
            if (imageLayerShakeInfo) {
                var args: any = [null, imageLayerShakeInfo.imageShakeParams, 1, imageLayerShakeInfo.dx, imageLayerShakeInfo.dy, imageLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(imageLayerModePassageID, gcImageShakeSign);
            }
            if (uiLayerShakeInfo) {
                var args: any = [null, uiLayerShakeInfo.imageShakeParams, 2, uiLayerShakeInfo.dx, uiLayerShakeInfo.dy, uiLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(uiLayerModePassageID, gcImageShakeSign);
            }
            if (stageLayerShakeInfo) {
                var args: any = [null, stageLayerShakeInfo.imageShakeParams, 3, stageLayerShakeInfo.dx, stageLayerShakeInfo.dy, stageLayerModePassageID, gcImageShakeSign];
                gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                GameImageLayer.clearPassageFrameUpdate(stageLayerModePassageID, gcImageShakeSign);
            }
            // 读取
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
                // -- 恢复指定的图像震动效果
                for (var i = 0; i < imageShakeInfoArr.length; i++) {
                    var thisPtr = {};
                    var imageShakeInfo = imageShakeInfoArr[i];
                    var a: GameSprite = GameImageLayer.getImageSprite(imageShakeInfo.passageID) as any;
                    if (a) {
                        a["__imageShake_kds1_dx"] = imageShakeInfo.objDx;
                        a["__imageShake_kds1_dy"] = imageShakeInfo.objDy;
                        a["__imageShake_kds1_curX"] = imageShakeInfo.objCurX;
                        a["__imageShake_kds1_curY"] = imageShakeInfo.objCurY;
                        var args: any = [a, imageShakeInfo.imageShakeParams, 0, imageShakeInfo.dx, imageShakeInfo.dy, imageShakeInfo.passageID, gcImageShakeSign];
                        GameImageLayer.regPassageFrameUpdate(imageShakeInfo.passageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                        gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                    }
                    else {
                        imageShakeInfoArr.splice(i, 1);
                        i--;
                    }
                }
                // 图像层震动恢复
                if (imageLayerShakeInfo) {
                    Game.layer.imageLayer["__imageShake_kds1_dx"] = imageLayerShakeInfo.objDx;
                    Game.layer.imageLayer["__imageShake_kds1_dy"] = imageLayerShakeInfo.objDy;
                    Game.layer.imageLayer["__imageShake_kds1_curX"] = imageLayerShakeInfo.objCurX;
                    Game.layer.imageLayer["__imageShake_kds1_curY"] = imageLayerShakeInfo.objCurY;
                    var args: any = [null, imageLayerShakeInfo.imageShakeParams, 1, imageLayerShakeInfo.dx, imageLayerShakeInfo.dy, imageLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(imageLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
                // 界面层震动恢复
                if (uiLayerShakeInfo) {
                    Game.layer.uiLayer["__imageShake_kds1_dx"] = uiLayerShakeInfo.objDx;
                    Game.layer.uiLayer["__imageShake_kds1_dy"] = uiLayerShakeInfo.objDy;
                    Game.layer.uiLayer["__imageShake_kds1_curX"] = uiLayerShakeInfo.objCurX;
                    Game.layer.uiLayer["__imageShake_kds1_curY"] = uiLayerShakeInfo.objCurY;
                    var args: any = [null, uiLayerShakeInfo.imageShakeParams, 2, uiLayerShakeInfo.dx, uiLayerShakeInfo.dy, uiLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(uiLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
                // 画面震动恢复
                if (stageLayerShakeInfo) {
                    Game.layer["__imageShake_kds1_dx"] = stageLayerShakeInfo.objDx;
                    Game.layer["__imageShake_kds1_dy"] = stageLayerShakeInfo.objDy;
                    Game.layer["__imageShake_kds1_curX"] = stageLayerShakeInfo.objCurX;
                    Game.layer["__imageShake_kds1_curY"] = stageLayerShakeInfo.objCurY;
                    var args: any = [null, stageLayerShakeInfo.imageShakeParams, 3, stageLayerShakeInfo.dx, stageLayerShakeInfo.dy, stageLayerModePassageID, gcImageShakeSign];
                    GameImageLayer.regPassageFrameUpdate(stageLayerModePassageID, gcImageShakeFrameUpdate_kds1, thisPtr, args, gcImageShakeSign);
                    gcImageShakeFrameUpdate_kds1.apply(thisPtr, args);
                }
            }
        }, {}, null));
    }
}