EventUtils.addEventListener(UIBase, UIBase.EVENT_COMPONENT_CONSTRUCTOR_INIT, Callback.New(uiComponentInit, this, [false]));
function uiComponentInit(isRoot, uiComp) {
    var hasMouseEvent = false;
    var hasCommandName = isRoot ? "hasRootCommand" : "hasCommand";
    var allEvents = [
        EventObject.CLICK,
        EventObject.MOUSE_OVER,
        EventObject.MOUSE_OUT,
        EventObject.DISPLAY,
        EventObject.UNDISPLAY,
        EventObject.MOUSE_DOWN,
        EventObject.MOUSE_UP,
        EventObject.DOUBLE_CLICK,
        EventObject.MOUSE_MOVE,
        EventObject.RIGHT_MOUSE_DOWN,
        EventObject.RIGHT_MOUSE_UP,
        EventObject.RIGHT_CLICK
    ];
    for (var i = 0; i < 12; i++) {
        var hasCommand = uiComp[hasCommandName][i];
        if (hasCommand) {
            if (i != 3 && i != 4) {
                hasMouseEvent = true;
            }
            if (i == 1)
                continue;
            var evType = allEvents[i];
            uiComp.on(evType, uiComp, function (uiComp, i) {
                if (i == 3 && !uiComp.visible)
                    return;
                else if (i == 4 && !uiComp.visible)
                    return;
                var commandInputMessage;
                if (uiComp.commandInputMessage instanceof Callback) {
                    commandInputMessage = uiComp.commandInputMessage.run();
                }
                else {
                    commandInputMessage = uiComp.commandInputMessage;
                }
                GameCommand.startUICommand(uiComp, i, commandInputMessage);
            }, [uiComp, i]);
        }
    }
    if (hasMouseEvent) {
        var p = uiComp;
        while (p) {
            p.mouseEnabled = true;
            if (p == uiComp.guiRoot) {
                break;
            }
            p = p.parent;
        }
    }
    if (uiComp instanceof UIButton || uiComp[hasCommandName][1]) {
        uiComp.on(EventObject.MOUSE_OVER, uiComp, function (uiComp) {
            if (uiComp[hasCommandName][1]) {
                var commandInputMessage;
                if (uiComp.commandInputMessage instanceof Callback) {
                    commandInputMessage = uiComp.commandInputMessage.run();
                }
                else {
                    commandInputMessage = uiComp.commandInputMessage;
                }
                GameCommand.startUICommand(uiComp, 1, commandInputMessage);
            }
        }, [uiComp]);
    }
    if (uiComp[hasCommandName][3] || uiComp[hasCommandName][4]) {
        uiComp.on(UIBase.ON_VISIBLE_CHANGE, uiComp, function () {
            var commandInputMessage;
            if (uiComp.commandInputMessage instanceof Callback) {
                commandInputMessage = uiComp.commandInputMessage.run();
            }
            else {
                commandInputMessage = uiComp.commandInputMessage;
            }
            if (uiComp[hasCommandName][3] && uiComp.visible) {
                GameCommand.startUICommand(uiComp, 3, commandInputMessage);
            }
            else if (uiComp[hasCommandName][4] && !uiComp.visible) {
                GameCommand.startUICommand(uiComp, 4, commandInputMessage);
            }
        });
    }
}
EventUtils.addEventListener(GameUI, GameUI.EVENT_CREATE_UI, Callback.New(function (ui) {
    uiComponentInit.apply(ui, [true, ui]);
}, this));
var isPlayTS = false;
var ___dialogFromSaveFileData = false;
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_BEFORE_RECOVERY_DIALOG, Callback.New(function (isOption, content, options, name, head, expression, audioURL, speed) {
    ___dialogFromSaveFileData = true;
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_START, Callback.New(function (isOption, content, options, name, head, expression, audioURL, speed) {
    isPlayTS = audioURL ? true : false;
    if (!isOption && !___dialogFromSaveFileData) {
        var d = new DataStructure_dialogRecordInfo();
        d.tsURL = audioURL;
        d.dialogName = name;
        d.dialogContent = StringUtils.clearHtmlTag(content).replace(/\[p\d+\]|\[\.=\]|\[\.s\]/g, "");
        WorldData.dialogRecords.push(d);
    }
    ___dialogFromSaveFileData = false;
    CommandPage.startTriggerFragmentEvent(WorldData.dialogStart, Game.player.sceneObject, Game.player.sceneObject);
}, this));
var ___dialogRecordSaveT;
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_END, Callback.New(function (gameDialog) {
    ___dialogRecord[GameDialog.fromCommandID] = true;
    if (___dialogRecordSaveT)
        clearTimeout(___dialogRecordSaveT);
    ___dialogRecordSaveT = setTimeout(function () { SinglePlayerGame.saveGlobalData(null); }, 5000);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_CLOSE, Callback.New(function (gameDialog) {
    CommandPage.startTriggerFragmentEvent(WorldData.dialogEnd, Game.player.sceneObject, Game.player.sceneObject);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_WORD_PLAY, Callback.New(function () {
    CommandPage.startTriggerFragmentEvent(WorldData.dialogWordPlay, Game.player.sceneObject, Game.player.sceneObject);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_WORD_PLAY_COMPLETE, Callback.New(function () {
    CommandPage.startTriggerFragmentEvent(WorldData.dialogWordPlayComplete, Game.player.sceneObject, Game.player.sceneObject);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_TS_PLAY_COMPLETE, Callback.New(function () {
    CommandPage.startTriggerFragmentEvent(WorldData.dialogTsComplete, Game.player.sceneObject, Game.player.sceneObject);
}, this));
var ___dialogRecord = {};
SinglePlayerGame.regSaveCustomGlobalData("___dialogRecord", Callback.New(function () {
    return ___dialogRecord;
}, this));
EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(function () {
    var saveDialogRecord = SinglePlayerGame.getSaveCustomGlobalData("___dialogRecord");
    if (saveDialogRecord)
        ___dialogRecord = saveDialogRecord;
}, this), true);
var ___lastSetOption = GameDialog.prototype["setOption"];
GameDialog.prototype["setOption"] = function (options, defaultIndex, cancelIndex) {
    if (defaultIndex === void 0) { defaultIndex = -1; }
    if (cancelIndex === void 0) { cancelIndex = -1; }
    ___lastSetOption.apply(this, arguments);
    var optionList = this.optionList;
    if (optionList) {
        optionList.overSelectMode = true;
    }
};
function ___listSEPlay(state) {
    if (state == 0 && WorldData.listSelectSE) {
        GameAudio.playSE(WorldData.listSelectSE);
    }
}
//# sourceMappingURL=UIExtend.js.map