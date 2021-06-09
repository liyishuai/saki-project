/**
 * 加载合并Json
 * -- 在编辑器环境内运行则会合并成一个文件
 * -- 运行时则加载该文件
 * -- 未来新的版本该功能将会在引擎层制作，从而弃用掉该项目层的文件（由Config.ENGINE_MERGE_STARTUP_FILE控制）
 * Created by 黑暗之神KDS on 2020-08-27 22:54:24.
 */
//------------------------------------------------------------------------------------------------------
// 合并JSON文件：编辑器内运行时会合并
//------------------------------------------------------------------------------------------------------
declare var ClientMain: any;
if (!Config["ENGINE_MERGE_STARTUP_FILE"]) {
    var startupJsonURL = "asset/json/startup.json";
    if (os.inGC() && os.platform != 0 && !Config.BEHAVIOR_EDIT_MODE) {
        var startupJsonLen = 0;
        var startupJsons: { [url: string]: any } = {};
        var oldLoadJson1 = FileUtils.loadJsonFile;
        var needMergeJson = true;
        FileUtils.loadJsonFile = function (localURL: string, onFin: Callback, onErrorTips: boolean = true) {
            oldLoadJson1.apply(FileUtils, [localURL, recordJsonObj(localURL, onFin), onErrorTips])
        }
        function recordJsonObj(url: string, onFin: Callback): Callback {
            if (!needMergeJson) { return onFin; }
            var c = Callback.New((url: string, jsonObj: any) => {
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
            // trace("需要合并" + startupJsonLen + "个文件");
            FileUtils.save(startupJsons, startupJsonURL, Callback.New(() => {
                // trace("合并完成：" + startupJsonURL);
            }, this));
        }, this), true);
    }
    //------------------------------------------------------------------------------------------------------
    // 加载合并的JSON文件，非编辑器内运行时会使用合并的JSON文件
    //------------------------------------------------------------------------------------------------------
    else {
        var oldLoadJson1 = FileUtils.loadJsonFile;
        var oldClientInit = ClientMain.prototype["init"];
        ClientMain.prototype["init"] = function () {
            // 加载合并的大文件，如果不存在则报错
            var onFin = Callback.New((startupJsons: { [url: string]: any }) => {
                if (!startupJsons) {
                    alert("找不到合并版的Json!");
                    return;
                }
                FileUtils.loadJsonFile = function (localURL: string, onFin: Callback, onErrorTips: boolean = true) {
                    var bigJsonCacheObj = startupJsons[localURL];
                    if (bigJsonCacheObj) {
                        onFin.delayRun(0, null, [bigJsonCacheObj]);
                        return;
                    }
                    oldLoadJson1.apply(FileUtils, [localURL, onFin, onErrorTips])
                }
                oldClientInit.apply(this);
            }, this)
            oldLoadJson1.apply(FileUtils, [startupJsonURL, onFin, true]);
        }
    }
}