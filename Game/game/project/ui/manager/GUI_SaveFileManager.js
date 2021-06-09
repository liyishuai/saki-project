var GUI_SaveFileManager = (function () {
    function GUI_SaveFileManager() {
    }
    GUI_SaveFileManager.initSaveFileList = function (list, saveMode) {
        if (saveMode === void 0) { saveMode = false; }
        list.on(EventObject.DISPLAY, this, GUI_SaveFileManager.onSaveFileListDisplay, [list]);
        list.onCreateItem = Callback.New(GUI_SaveFileManager.onCreateSaveFileItem, GUI_SaveFileManager, [saveMode]);
        list.on(UIList.ITEM_CLICK, this, GUI_SaveFileManager.onListItemClick, [list, saveMode]);
        list.on(EventObject.CHANGE, this, ___listSEPlay);
    };
    GUI_SaveFileManager.saveFile = function (id, executeEvent, onFin, waitEventCompleteCallback) {
        var _this = this;
        if (executeEvent === void 0) { executeEvent = true; }
        if (onFin === void 0) { onFin = null; }
        if (waitEventCompleteCallback === void 0) { waitEventCompleteCallback = true; }
        SinglePlayerGame.saveGame(id, Callback.New(function (success) {
            if (executeEvent) {
                if (onFin && !waitEventCompleteCallback)
                    onFin.run();
                if (success) {
                    var saveUI = GameUI.get(5);
                    if (saveUI)
                        GUI_SaveFileManager.refreshSaveFileItem(saveUI.list);
                    CommandPage.startTriggerFragmentEvent(WorldData.saveSuccessEvent, Game.player.sceneObject, Game.player.sceneObject, Callback.New(function (onFin) {
                        onFin && onFin.run();
                    }, _this, [waitEventCompleteCallback ? onFin : null]));
                }
                else {
                    CommandPage.startTriggerFragmentEvent(WorldData.saveFailEvent, Game.player.sceneObject, Game.player.sceneObject, Callback.New(function (onFin) {
                        onFin && onFin.run();
                    }, _this, [waitEventCompleteCallback ? onFin : null]));
                }
            }
            else {
                if (onFin)
                    onFin.run();
            }
        }, this), this.getCustomSaveIndexInfo());
    };
    GUI_SaveFileManager.loadFile = function (id, onFin) {
        var _this = this;
        if (onFin === void 0) { onFin = null; }
        if (GUI_SaveFileManager.isLoading)
            return;
        GUI_SaveFileManager.isLoading = true;
        SinglePlayerGame.loadGame(id, Callback.New(function (success, customData) {
            if (success) {
                EventUtils.addEventListener(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, Callback.New(function () {
                    if (GameGate.gateState == GameGate.STATE_3_IN_SCENE_COMPLETE) {
                        GUI_SaveFileManager.isLoading = false;
                    }
                }, _this));
            }
            else {
                CommandPage.startTriggerFragmentEvent(WorldData.loadGameFailEvent, Game.player.sceneObject, Game.player.sceneObject);
                GUI_SaveFileManager.isLoading = false;
            }
            GUI_SaveFileManager.currentSaveFileCustomData = customData;
            if (onFin)
                onFin.runWith([success]);
        }, this));
    };
    GUI_SaveFileManager.onSaveFileListDisplay = function (list) {
        UIList.focus = list;
        this.refreshSaveFileItem(list);
    };
    GUI_SaveFileManager.onListItemClick = function (list, saveMode) {
        var selectedIndex = list.selectedIndex;
        if (selectedIndex < 0)
            return;
        if (saveMode) {
            GUI_SaveFileManager.saveFile(selectedIndex + 1);
        }
        else {
            var saveFileData = list.selectedItem.data;
            if (!saveFileData)
                return;
            GUI_SaveFileManager.currentSveFileIndexInfo = saveFileData;
            GUI_SaveFileManager.loadFile(selectedIndex + 1);
        }
    };
    GUI_SaveFileManager.onCreateSaveFileItem = function (saveMode, ui, data, index) {
        var saveFileData = data.data;
        if (ui.screenshotImg)
            ui.screenshotImg.visible = (saveFileData ? true : false);
        if (ui.delBtn) {
            ui.delBtn.on(EventObject.MOUSE_DOWN, this, function (e) { e.stopPropagation(); });
            if (saveFileData) {
                ui.delBtn.visible = true;
                ui.delBtn.commandInputMessage = [saveFileData.id];
            }
            else {
                ui.delBtn.visible = false;
            }
        }
    };
    GUI_SaveFileManager.refreshSaveFileItem = function (list) {
        if (!list)
            return;
        var saveInfo = SinglePlayerGame.getSaveInfo();
        var items = [];
        for (var i = 1; i <= WorldData.saveFileMax; i++) {
            var saveFile = ArrayUtils.matchAttributes(saveInfo, { id: i }, true)[0];
            var itemData = new ListItem_1001();
            itemData.no = i.toString();
            if (saveFile) {
                itemData.data = saveFile;
                itemData.screenshotImg = saveFile.indexInfo.screenshotImg;
                itemData.sceneName = saveFile.indexInfo.sceneName;
                itemData.gameTimeStr = "游戏时长" + ProjectUtils.timerFormat(saveFile.indexInfo.gameTime);
                itemData.dateStr = ProjectUtils.dateFormat("YYYY-mm-dd HH:MM", new Date(saveFile.now));
            }
            else {
                itemData.screenshotImg = "";
                itemData.sceneName = "";
                itemData.gameTimeStr = "";
                itemData.dateStr = "";
            }
            items.push(itemData);
        }
        list.items = items;
    };
    GUI_SaveFileManager.getCustomSaveIndexInfo = function () {
        var per = 0.25;
        var oldUILayerVisible = Game.layer.uiLayer.visible;
        Game.layer.uiLayer.visible = false;
        var fullScreenTex = AssetManager.drawToTexture(Game.layer, stage.width, stage.height);
        Game.layer.uiLayer.visible = oldUILayerVisible;
        var screenRoot = new GameSprite();
        var screenBitmap = new UIBitmap;
        screenBitmap.texture = fullScreenTex;
        screenRoot.addChild(screenBitmap);
        screenBitmap.scaleX = screenBitmap.scaleY = per;
        var smallScreenTex = AssetManager.drawToTexture(screenRoot, MathUtils.int(stage.width * per), MathUtils.int(stage.height * per));
        fullScreenTex.dispose();
        var smallScreenTexBase64 = AssetManager.textureToBase64(smallScreenTex);
        smallScreenTex.dispose();
        var customSaveIndexInfo = new SaveFileListCustomData;
        customSaveIndexInfo.screenshotImg = smallScreenTexBase64;
        customSaveIndexInfo.gameTime = new Date().getTime() - ProjectGame.gameStartTime.getTime();
        customSaveIndexInfo.sceneName = Game.currentScene.name;
        return customSaveIndexInfo;
    };
    GUI_SaveFileManager.onceInSceneLoadGameSign = "gc_rpg_greenFeather_" + window.location.href;
    GUI_SaveFileManager.isLoading = false;
    return GUI_SaveFileManager;
}());
var SaveFileListCustomData = (function () {
    function SaveFileListCustomData() {
    }
    return SaveFileListCustomData;
}());
//# sourceMappingURL=GUI_SaveFileManager.js.map