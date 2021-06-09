/**
 * 自定义事件命令
 * Created by 黑暗之神KDS on 2020-09-09 19:47:24.
 */
module CommandExecute {
    //------------------------------------------------------------------------------------------------------
    // 交互
    //------------------------------------------------------------------------------------------------------
    /**
     * 预加载
     * @param commandPage 事件页
     * @param cmd 当前的事件命令
     * @param trigger 触发器
     * @param triggerPlayer 触发器对应的玩家
     * @param playerInput 玩家输入值（如有）
     * @param p 自定义命令参数
     */
    export function customCommand_1(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_1): void {
        // 如果不存在预加载则忽略掉
        if (p.preloadAssets.length == 0) return;
        // 暂停当前触发线的事件推进，当加载资源完毕时再继续执行
        trigger.pause = true;
        // 推进一行，以便下次执行时执行下一行事件
        trigger.offset(1);
        var g = getAssetValues;
        // 图集
        var imageArr = g(0);
        // 判断是否存在字体加载
        var fontArr = g(7);
        if (fontArr.length > 0) {
            var hasFont = true;
        }
        // CG鉴赏
        var cgArr = g(8);
        if (cgArr.length > 0) {
            for (var i = 0; i < WorldData.myCG.length; i++) {
                var cgID = WorldData.myCG[i];
                var cgData: Module_CG鉴赏 = GameData.getModuleData(1, cgID);
                if (cgData && cgData.CGs.length > 0) {
                    imageArr = imageArr.concat(cgData.CGs);
                }
            }
        }
        // 如果需要显示加载界面的话则打开界面
        if (p.isShowLoadingUI && p.bindingUI) {
            // 该界面本身要加载（使用了自动释放模式的预载入，所以会自动清空此次预加载的引用）
            AssetManager.preLoadUIAsset(p.bindingUI, Callback.New(() => {
                var loadingUI = GameUI.show(p.bindingUI)
                doLoadAsset.apply(this, [loadingUI]);
            }, this), true, true, true);
        }
        else {
            doLoadAsset.apply(this);
        }
        // 加载完毕时处理
        function onLoadComplete(displayProgressComp: UIBase) {
            setProgressUI.apply(this, [displayProgressComp, 100]);
            Callback.New(() => {
                if (p.isShowLoadingUI && p.bindingUI) GameUI.dispose(p.bindingUI);
                CommandPage.executeEvent(trigger);
            }, this).delayRun(100);
        }
        // 加载资源
        function doLoadAsset(loadingUI: UIRoot) {
            // 如果存在需要显示加载进度效果的话则准备显示
            var displayProgressComp: UIBase = null;
            if (loadingUI && p.compName && p.compAttributeName) {
                displayProgressComp = loadingUI[p.compName];
                if (!displayProgressComp) {
                    trace(`预载入事件参数错误，找不到组件：${p.compName}`);
                }
            }
            // 加载资源
            AssetManager.batchPreLoadAsset(Callback.New(() => {
                if (hasFont) {
                    AssetManager.preloadFonts(Callback.New(onLoadComplete, this, [displayProgressComp]));
                }
                else {
                    onLoadComplete.apply(this, [displayProgressComp]);
                }
            }, this, [1, true]),
                Callback.New((current: number, count: number) => {
                    // 若存在字体文件
                    if (hasFont) count += 1;
                    // 显示加载进度效果
                    var progressStr = Math.floor(current * 100 / count).toString();
                    setProgressUI.apply(this, [displayProgressComp, progressStr]);
                }, this), imageArr, [], g(2), g(3), g(4), g(5), [], g(1), g(6));
        }
        // 根据资源类别筛选数组
        function getAssetValues(assetType: number): any[] {
            // -- 筛选对应assetType的资源组，如获取所有需要预加载的图像组DataStructure格式数据
            var dsArr: DataStructure_preloadAsset[] = ArrayUtils.matchAttributes(p.preloadAssets, { assetType: assetType }, false);
            // -- 获取DataStructure格式数组内对象的资源属性值重新组成一个新的数组
            return ArrayUtils.getChildAttributeToCreateArray(dsArr, "asset" + assetType);
        }
        // 进度条
        function setProgressUI(displayProgressComp: UIBase, v: number) {
            if (!displayProgressComp) return;
            v = MathUtils.int(v);
            Tween.clearAll(displayProgressComp);
            var attrObj = {};
            attrObj[p.compAttributeName] = v;
            Tween.to(displayProgressComp, attrObj, 100);
        }
    }
    /**
     * 等待玩家输入文本
     */
    export function customCommand_2(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_2): void {
        if (p.inputUI == 0) return;
        var inputUI: GUI_BASE = GameUI.show(p.inputUI);
        var inputText: UIInput = inputUI["input"];
        if (inputText) {
            inputText.setTextForce(p.useVar == 1 ? Game.player.variable.getString(p.defTextVarID) : p.defText);
            inputText.focus = true;
            inputText.off(EventObject.ENTER, inputText, ____onInputEnter);
            inputText.on(EventObject.ENTER, inputText, ____onInputEnter, [p.inputUI]);
        }
        trigger.pause = true;
        inputUI.once(EventObject.REMOVED, this, () => {
            trigger.offset(1);
            Callback.CallLaterBeforeRender(() => {
                CommandPage.executeEvent.apply(this, arguments);
            }, CommandPage, [trigger, [inputText ? inputText.text : ""]]);
        }, []);
    }
    function ____onInputEnter(uiID: number) {
        GameUI.hide(uiID);
    }
    /**
     * 按键事件
     */
    var keyEventSigns: { [key: string]: { typeEvent: string, thisPtr: any, func: Function } } = {}
    export function customCommand_3(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_3): void {
        // 永久,执行一次,调用该命令时执行的事件完毕为止
        var evType = p.isMulKey == 1 ? p.evType2 : p.evType;
        var typeEvent = evType != 1 ? EventObject.KEY_DOWN : EventObject.KEY_UP;
        // 根据执行一次与否决定使用on或once
        var f = (p: CustomCommandParams_3, trigger: CommandTrigger, sign: string, e: EventObject) => {
            // 按键
            var bool = false;
            if (p.isMulKey) {
                bool = p.keys.indexOf(e.keyCode) != -1;
            }
            else {
                bool = e.keyCode == p.key;
            }
            // 组合键判定
            if (((p.CTRL && !e.ctrlKey) || (!p.CTRL && e.ctrlKey)) && e.keyCode != Keyboard.CONTROL) bool = false;
            if (((p.SHIFT && !e.shiftKey) || (!p.SHIFT && e.shiftKey)) && e.keyCode != Keyboard.SHIFT) bool = false;
            if (((p.ALT && !e.altKey) || (!p.ALT && e.altKey)) && e.keyCode != Keyboard.ALTERNATE) bool = false;
            // 是否未按下的模式
            var isNotKeyDown = (!p.isMulKey && p.evType == 2);
            // 未按下模式下未按下或满足按下条件
            if ((isNotKeyDown && !bool) || (!isNotKeyDown && bool)) {
                if (p.type == 1) {
                    stage.off(typeEvent, trigger, arguments.callee);
                    if (sign) delete keyEventSigns[sign];
                }
                CommandPage.startTriggerFragmentEvent(p.eventPage, Game.player.sceneObject, Game.player.sceneObject);
            }
        };
        // 记录按键标识
        if (p.recordListen && p.recordListenVar > 0) {
            var sign = ObjectUtils.getRandID();
            keyEventSigns[sign] = { typeEvent: typeEvent, thisPtr: trigger, func: f };
            Game.player.variable.setString(p.recordListenVar, sign);
        }
        // 注册按键事件
        stage.on(typeEvent, trigger, f, [p, trigger, sign]);
        // 调用该命令时执行的事件完毕为止：监听当前事件完毕，完毕则清除掉该次按键事件
        if (p.type == 2) {
            EventUtils.addEventListener(trigger, CommandTrigger.EVENT_OVER, Callback.New((typeEvent: string, trigger: CommandTrigger, f: Function, sign: string) => {
                stage.off(typeEvent, trigger, f);
                if (sign) delete keyEventSigns[sign];
            }, this, [typeEvent, trigger, f, sign]), true);
        }
    }
    /**
     * 鼠标事件
     */
    var eventDispatcher: EventDispatcher = new EventDispatcher;
    var mouseEvents = [EventObject.MOUSE_DOWN, EventObject.MOUSE_UP, EventObject.CLICK, EventObject.DOUBLE_CLICK, EventObject.RIGHT_MOUSE_DOWN, EventObject.RIGHT_MOUSE_UP, EventObject.RIGHT_CLICK, EventObject.MOUSE_WHEEL, EventObject.MOUSE_MOVE];
    var mouseEventSigns: { [key: string]: { typeEvent: string, thisPtr: any, func: Function } } = {}
    export function customCommand_4(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4): void {
        // 永久,执行一次,调用该命令时执行的事件完毕为止
        var typeEvent = mouseEvents[p.mouseType];
        // 根据执行一次与否决定使用on或once
        var f = (typeEvent: string, p: CustomCommandParams_4, trigger: CommandTrigger, sign: string, e: EventObject) => {
            if (e.type == typeEvent) {
                if (p.type == 1) {
                    stage.off(typeEvent, trigger, arguments.callee);
                    if (sign) delete mouseEventSigns[sign];
                }
                CommandPage.startTriggerFragmentEvent(p.eventPage, Game.player.sceneObject, Game.player.sceneObject);
            }
        };
        // 记录鼠标标识
        if (p.recordListen && p.recordListenVar > 0) {
            var sign = ObjectUtils.getRandID();
            mouseEventSigns[sign] = { typeEvent: typeEvent, thisPtr: trigger, func: f };
            Game.player.variable.setString(p.recordListenVar, sign);
        }
        // 根据执行一次与否决定使用on或once
        stage.on(typeEvent, trigger, f, [typeEvent, p, trigger, sign]);
        // 调用该命令时执行的事件完毕为止：监听当前事件完毕，完毕则清除掉该次按键事件
        if (p.type == 2) {
            EventUtils.addEventListener(trigger, CommandTrigger.EVENT_OVER, Callback.New((typeEvent: string, trigger: CommandTrigger, f: Function, sign: string) => {
                stage.off(typeEvent, trigger, f);
                if (sign) delete mouseEventSigns[sign];
            }, this, [typeEvent, trigger, f, sign]), true);
        }
    }
    /**
     * 取消按键事件
     */
    export function customCommand_5(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_5): void {
        var sign = Game.player.variable.getString(p.recordListenVar);
        if (sign) {
            var keyInfo = keyEventSigns[sign];
            if (keyInfo) {
                stage.off(keyInfo.typeEvent, keyInfo.thisPtr, keyInfo.func);
            }
        }
    }
    /**
     * 取消鼠标事件
     */
    export function customCommand_6(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_6): void {
        var sign = Game.player.variable.getString(p.recordListenVar);
        if (sign) {
            var mouseInfo = mouseEventSigns[sign];
            if (mouseInfo) {
                stage.off(mouseInfo.typeEvent, mouseInfo.thisPtr, mouseInfo.func);
            }
        }
    }
    /**
     * CG图集
     */
    export function customCommand_7(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_7): void {
        // 存在该CG设定的话，加入至库存
        if (GameData.getModuleData(1, p.cg)) {
            if (WorldData.myCG.indexOf(p.cg) == -1) WorldData.myCG.push(p.cg);
            // 立刻储存全局数据（与存档无关）
            SinglePlayerGame.saveGlobalData(null);
        }
    }
    // -- 注册CG图鉴的全局数据
    SinglePlayerGame.regSaveCustomGlobalData("___myCG", Callback.New(() => {
        return WorldData.myCG;
    }, null));
    // -- 监听游戏初始化
    EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(() => {
        var myCG = SinglePlayerGame.getSaveCustomGlobalData("___myCG");
        if (myCG) WorldData.myCG = myCG;
    }, null), true);
    //------------------------------------------------------------------------------------------------------
    //
    //------------------------------------------------------------------------------------------------------
    export function customCommand_1001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_1001): void {
        if (GameDialog.isInDialog && !GameDialog.isPlaying) {
            GameDialog.skip();
        }
    }
    export function customCommand_1002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_1002): void {
        if (GameDialog.isInDialog && GameDialog.isPlaying) {
            GameDialog.showall();
        }
    }
    //------------------------------------------------------------------------------------------------------
    // 系统
    //------------------------------------------------------------------------------------------------------
    export function customCommand_4001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4001): void {
        os.fullscreen = p.fullScreen;
    }
    /**
     * 开始游戏
     */
    var callNewGame = false;
    export function customCommand_4005(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4005): void {
        if (callNewGame) return;
        callNewGame = true;
        SinglePlayerGame.newGame();
    }
    /**
     * 存档
     */
    export function customCommand_4006(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4006): void {
        if (p.saveType == 0) {
            trigger.pause = true;
            trigger.offset(1);
            SinglePlayerGame.saveGlobalData(Callback.New(() => {
                CommandPage.executeEvent(trigger);
            }, this));
        }
        else if (p.saveType == 1) {
            if (GUI_SaveFileManager.currentSveFileIndexInfo) {
                // 命令偏移一行，以便下次恢复执行时执行下一行而不是本行
                trigger.offset(1);
                GUI_SaveFileManager.saveFile(GUI_SaveFileManager.currentSveFileIndexInfo.id, p.silenceMode ? false : true, Callback.New(() => {
                    CommandPage.executeEvent(trigger);
                }, this), true);
                // 暂停必须放在存档后面，否则存档将正在执行的该事件暂停状态也一起保存了
                trigger.pause = true;
            }
        }
        else {
            var saveID = p.saveID;
            // 命令偏移一行，以便下次恢复执行时执行下一行而不是本行
            trigger.offset(1);
            GUI_SaveFileManager.saveFile(saveID, p.silenceMode ? false : true, Callback.New(() => {
                CommandPage.executeEvent(trigger);
            }, this), true);
            // 暂停必须放在存档后面，否则存档将正在执行的该事件暂停状态也一起保存了
            trigger.pause = true;
        }
    }
    /**
     *  返回标题
     */
    export function customCommand_4008(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4008): void {
        window.location.reload();
    }
    /**
     *  关闭窗口
     */
    export function customCommand_4011(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_4011): void {
        os.closeWindow();
    }
    export function getSolutionStatus(url: string): string {
        return 'Hello '+url;
    }
}
