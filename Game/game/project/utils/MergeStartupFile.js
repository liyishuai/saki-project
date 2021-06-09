if (!Config["ENGINE_MERGE_STARTUP_FILE"]) {
    var startupJsonURL = "asset/json/startup.json";
    if (os.inGC() && os.platform != 0 && !Config.BEHAVIOR_EDIT_MODE) {
        var startupJsonLen = 0;
        var startupJsons = {};
        var oldLoadJson1 = FileUtils.loadJsonFile;
        var needMergeJson = true;
        FileUtils.loadJsonFile = function (localURL, onFin, onErrorTips) {
            if (onErrorTips === void 0) { onErrorTips = true; }
            oldLoadJson1.apply(FileUtils, [localURL, recordJsonObj(localURL, onFin), onErrorTips]);
        };
        function recordJsonObj(url, onFin) {
            if (!needMergeJson) {
                return onFin;
            }
            var c = Callback.New(function (url, jsonObj) {
                if (url.indexOf("savedata/") != 0) {
                    startupJsons[url] = jsonObj;
                    startupJsonLen++;
                }
                onFin && onFin.runWith([jsonObj]);
            }, this, [url]);
            return c;
        }
        EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(function () {
            needMergeJson = false;
            FileUtils.save(startupJsons, startupJsonURL, Callback.New(function () {
            }, this));
        }, this), true);
    }
    else {
        var oldLoadJson1 = FileUtils.loadJsonFile;
        var oldClientInit = ClientMain.prototype["init"];
        ClientMain.prototype["init"] = function () {
            var _this = this;
            var onFin = Callback.New(function (startupJsons) {
                if (!startupJsons) {
                    alert("找不到合并版的Json!");
                    return;
                }
                FileUtils.loadJsonFile = function (localURL, onFin, onErrorTips) {
                    if (onErrorTips === void 0) { onErrorTips = true; }
                    var bigJsonCacheObj = startupJsons[localURL];
                    if (bigJsonCacheObj) {
                        onFin.delayRun(0, null, [bigJsonCacheObj]);
                        return;
                    }
                    oldLoadJson1.apply(FileUtils, [localURL, onFin, onErrorTips]);
                };
                oldClientInit.apply(_this);
            }, this);
            oldLoadJson1.apply(FileUtils, [startupJsonURL, onFin, true]);
        };
    }
}
//# sourceMappingURL=MergeStartupFile.js.map