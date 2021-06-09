var CommandExecute;
(function (CommandExecute) {
    function customCommand_1(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var _this = this;
        if (p.preloadAssets.length == 0)
            return;
        trigger.pause = true;
        trigger.offset(1);
        var g = getAssetValues;
        var imageArr = g(0);
        var fontArr = g(7);
        if (fontArr.length > 0) {
            var hasFont = true;
        }
        var cgArr = g(8);
        if (cgArr.length > 0) {
            for (var i = 0; i < WorldData.myCG.length; i++) {
                var cgID = WorldData.myCG[i];
                var cgData = GameData.getModuleData(1, cgID);
                if (cgData && cgData.CGs.length > 0) {
                    imageArr = imageArr.concat(cgData.CGs);
                }
            }
        }
        if (p.isShowLoadingUI && p.bindingUI) {
            AssetManager.preLoadUIAsset(p.bindingUI, Callback.New(function () {
                var loadingUI = GameUI.show(p.bindingUI);
                doLoadAsset.apply(_this, [loadingUI]);
            }, this), true, true, true);
        }
        else {
            doLoadAsset.apply(this);
        }
        function onLoadComplete(displayProgressComp) {
            setProgressUI.apply(this, [displayProgressComp, 100]);
            Callback.New(function () {
                if (p.isShowLoadingUI && p.bindingUI)
                    GameUI.dispose(p.bindingUI);
                CommandPage.executeEvent(trigger);
            }, this).delayRun(100);
        }
        function doLoadAsset(loadingUI) {
            var _this = this;
            var displayProgressComp = null;
            if (loadingUI && p.compName && p.compAttributeName) {
                displayProgressComp = loadingUI[p.compName];
                if (!displayProgressComp) {
                    trace("\u9884\u8F7D\u5165\u4E8B\u4EF6\u53C2\u6570\u9519\u8BEF\uFF0C\u627E\u4E0D\u5230\u7EC4\u4EF6\uFF1A" + p.compName);
                }
            }
            AssetManager.batchPreLoadAsset(Callback.New(function () {
                if (hasFont) {
                    AssetManager.preloadFonts(Callback.New(onLoadComplete, _this, [displayProgressComp]));
                }
                else {
                    onLoadComplete.apply(_this, [displayProgressComp]);
                }
            }, this, [1, true]), Callback.New(function (current, count) {
                if (hasFont)
                    count += 1;
                var progressStr = Math.floor(current * 100 / count).toString();
                setProgressUI.apply(_this, [displayProgressComp, progressStr]);
            }, this), imageArr, [], g(2), g(3), g(4), g(5), [], g(1), g(6));
        }
        function getAssetValues(assetType) {
            var dsArr = ArrayUtils.matchAttributes(p.preloadAssets, { assetType: assetType }, false);
            return ArrayUtils.getChildAttributeToCreateArray(dsArr, "asset" + assetType);
        }
        function setProgressUI(displayProgressComp, v) {
            if (!displayProgressComp)
                return;
            v = MathUtils.int(v);
            Tween.clearAll(displayProgressComp);
            var attrObj = {};
            attrObj[p.compAttributeName] = v;
            Tween.to(displayProgressComp, attrObj, 100);
        }
    }
    CommandExecute.customCommand_1 = customCommand_1;
    function customCommand_2(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var _this = this;
        if (p.inputUI == 0)
            return;
        var inputUI = GameUI.show(p.inputUI);
        var inputText = inputUI["input"];
        if (inputText) {
            inputText.setTextForce(p.useVar == 1 ? Game.player.variable.getString(p.defTextVarID) : p.defText);
            inputText.focus = true;
            inputText.off(EventObject.ENTER, inputText, ____onInputEnter);
            inputText.on(EventObject.ENTER, inputText, ____onInputEnter, [p.inputUI]);
        }
        trigger.pause = true;
        inputUI.once(EventObject.REMOVED, this, function () {
            trigger.offset(1);
            Callback.CallLaterBeforeRender(function () {
                CommandPage.executeEvent.apply(_this, arguments);
            }, CommandPage, [trigger, [inputText ? inputText.text : ""]]);
        }, []);
    }
    CommandExecute.customCommand_2 = customCommand_2;
    function ____onInputEnter(uiID) {
        GameUI.hide(uiID);
    }
    var keyEventSigns = {};
    function customCommand_3(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var evType = p.isMulKey == 1 ? p.evType2 : p.evType;
        var typeEvent = evType != 1 ? EventObject.KEY_DOWN : EventObject.KEY_UP;
        var f = function (p, trigger, sign, e) {
            var bool = false;
            if (p.isMulKey) {
                bool = p.keys.indexOf(e.keyCode) != -1;
            }
            else {
                bool = e.keyCode == p.key;
            }
            if (((p.CTRL && !e.ctrlKey) || (!p.CTRL && e.ctrlKey)) && e.keyCode != Keyboard.CONTROL)
                bool = false;
            if (((p.SHIFT && !e.shiftKey) || (!p.SHIFT && e.shiftKey)) && e.keyCode != Keyboard.SHIFT)
                bool = false;
            if (((p.ALT && !e.altKey) || (!p.ALT && e.altKey)) && e.keyCode != Keyboard.ALTERNATE)
                bool = false;
            var isNotKeyDown = (!p.isMulKey && p.evType == 2);
            if ((isNotKeyDown && !bool) || (!isNotKeyDown && bool)) {
                if (p.type == 1) {
                    stage.off(typeEvent, trigger, arguments.callee);
                    if (sign)
                        delete keyEventSigns[sign];
                }
                CommandPage.startTriggerFragmentEvent(p.eventPage, Game.player.sceneObject, Game.player.sceneObject);
            }
        };
        if (p.recordListen && p.recordListenVar > 0) {
            var sign = ObjectUtils.getRandID();
            keyEventSigns[sign] = { typeEvent: typeEvent, thisPtr: trigger, func: f };
            Game.player.variable.setString(p.recordListenVar, sign);
        }
        stage.on(typeEvent, trigger, f, [p, trigger, sign]);
        if (p.type == 2) {
            EventUtils.addEventListener(trigger, CommandTrigger.EVENT_OVER, Callback.New(function (typeEvent, trigger, f, sign) {
                stage.off(typeEvent, trigger, f);
                if (sign)
                    delete keyEventSigns[sign];
            }, this, [typeEvent, trigger, f, sign]), true);
        }
    }
    CommandExecute.customCommand_3 = customCommand_3;
    var eventDispatcher = new EventDispatcher;
    var mouseEvents = [EventObject.MOUSE_DOWN, EventObject.MOUSE_UP, EventObject.CLICK, EventObject.DOUBLE_CLICK, EventObject.RIGHT_MOUSE_DOWN, EventObject.RIGHT_MOUSE_UP, EventObject.RIGHT_CLICK, EventObject.MOUSE_WHEEL, EventObject.MOUSE_MOVE];
    var mouseEventSigns = {};
    function customCommand_4(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var typeEvent = mouseEvents[p.mouseType];
        var f = function (typeEvent, p, trigger, sign, e) {
            if (e.type == typeEvent) {
                if (p.type == 1) {
                    stage.off(typeEvent, trigger, arguments.callee);
                    if (sign)
                        delete mouseEventSigns[sign];
                }
                CommandPage.startTriggerFragmentEvent(p.eventPage, Game.player.sceneObject, Game.player.sceneObject);
            }
        };
        if (p.recordListen && p.recordListenVar > 0) {
            var sign = ObjectUtils.getRandID();
            mouseEventSigns[sign] = { typeEvent: typeEvent, thisPtr: trigger, func: f };
            Game.player.variable.setString(p.recordListenVar, sign);
        }
        stage.on(typeEvent, trigger, f, [typeEvent, p, trigger, sign]);
        if (p.type == 2) {
            EventUtils.addEventListener(trigger, CommandTrigger.EVENT_OVER, Callback.New(function (typeEvent, trigger, f, sign) {
                stage.off(typeEvent, trigger, f);
                if (sign)
                    delete mouseEventSigns[sign];
            }, this, [typeEvent, trigger, f, sign]), true);
        }
    }
    CommandExecute.customCommand_4 = customCommand_4;
    function customCommand_5(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var sign = Game.player.variable.getString(p.recordListenVar);
        if (sign) {
            var keyInfo = keyEventSigns[sign];
            if (keyInfo) {
                stage.off(keyInfo.typeEvent, keyInfo.thisPtr, keyInfo.func);
            }
        }
    }
    CommandExecute.customCommand_5 = customCommand_5;
    function customCommand_6(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var sign = Game.player.variable.getString(p.recordListenVar);
        if (sign) {
            var mouseInfo = mouseEventSigns[sign];
            if (mouseInfo) {
                stage.off(mouseInfo.typeEvent, mouseInfo.thisPtr, mouseInfo.func);
            }
        }
    }
    CommandExecute.customCommand_6 = customCommand_6;
    function customCommand_7(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        if (GameData.getModuleData(1, p.cg)) {
            if (WorldData.myCG.indexOf(p.cg) == -1)
                WorldData.myCG.push(p.cg);
            SinglePlayerGame.saveGlobalData(null);
        }
    }
    CommandExecute.customCommand_7 = customCommand_7;
    SinglePlayerGame.regSaveCustomGlobalData("___myCG", Callback.New(function () {
        return WorldData.myCG;
    }, null));
    EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(function () {
        var myCG = SinglePlayerGame.getSaveCustomGlobalData("___myCG");
        if (myCG)
            WorldData.myCG = myCG;
    }, null), true);
    function customCommand_1001(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        if (GameDialog.isInDialog && !GameDialog.isPlaying) {
            GameDialog.skip();
        }
    }
    CommandExecute.customCommand_1001 = customCommand_1001;
    function customCommand_1002(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        if (GameDialog.isInDialog && GameDialog.isPlaying) {
            GameDialog.showall();
        }
    }
    CommandExecute.customCommand_1002 = customCommand_1002;
    function customCommand_4001(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        os.fullscreen = p.fullScreen;
    }
    CommandExecute.customCommand_4001 = customCommand_4001;
    var callNewGame = false;
    function customCommand_4005(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        if (callNewGame)
            return;
        callNewGame = true;
        SinglePlayerGame.newGame();
    }
    CommandExecute.customCommand_4005 = customCommand_4005;
    function customCommand_4006(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        if (p.saveType == 0) {
            trigger.pause = true;
            trigger.offset(1);
            SinglePlayerGame.saveGlobalData(Callback.New(function () {
                CommandPage.executeEvent(trigger);
            }, this));
        }
        else if (p.saveType == 1) {
            if (GUI_SaveFileManager.currentSveFileIndexInfo) {
                trigger.offset(1);
                GUI_SaveFileManager.saveFile(GUI_SaveFileManager.currentSveFileIndexInfo.id, p.silenceMode ? false : true, Callback.New(function () {
                    CommandPage.executeEvent(trigger);
                }, this), true);
                trigger.pause = true;
            }
        }
        else {
            var saveID = p.saveID;
            trigger.offset(1);
            GUI_SaveFileManager.saveFile(saveID, p.silenceMode ? false : true, Callback.New(function () {
                CommandPage.executeEvent(trigger);
            }, this), true);
            trigger.pause = true;
        }
    }
    CommandExecute.customCommand_4006 = customCommand_4006;
    function customCommand_4008(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        window.location.reload();
    }
    CommandExecute.customCommand_4008 = customCommand_4008;
    function customCommand_4011(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        os.closeWindow();
    }
    CommandExecute.customCommand_4011 = customCommand_4011;
})(CommandExecute || (CommandExecute = {}));
//# sourceMappingURL=CustomCommand1.js.map