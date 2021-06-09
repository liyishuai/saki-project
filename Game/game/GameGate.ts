/**
 * 游戏大门：用于处理进入游戏、读取存档、更换场景
 * Created by 黑暗之神KDS on 2020-09-11 19:18:46.
 */
class GameGate {
    /**
     * 事件：进入场景的状态改变时派发事件，对应 GameGate.STATE_XXX
     * onInSceneStateChange(inNewSceneState:number);
     */
    static EVENT_IN_SCENE_STATE_CHANGE: string = "GameGateEVENT_SCENE_STATE_CHANGE";
    /**
     * 状态：离开场景，开始执行相关准备事件（离开场景时事件、新游戏开始事件、读档开始事件）
     */
    static STATE_0_START_EXECUTE_LEAVE_SCENE_EVENT: number = 0;
    /**
     * 状态：相关准备事件执行完毕，开始加载场景
     */
    static STATE_1_START_LOAD_SCENE: number = 1;
    /**
     * 状态：加载场景完毕，开始执行对应的完成事件（进入场景时事件、新游戏完成事件、读档完成事件）
     */
    static STATE_2_START_EXECUTE_IN_SCENE_EVENT: number = 2;
    /**
     * 状态：场景已进入完毕
     */
    static STATE_3_IN_SCENE_COMPLETE: number = 3;
    /**
     * 状态值，对应GameGate.STATE_XXXX
     */
    static gateState: number;
    /**
     * 游戏首次进入场景时表示
     */
    static inSceneInited: boolean;
    /**
     * 开始
     */
    static start(): void {
        // 监听进入场景的事件：新游戏、读档、切换场景
        EventUtils.addEventListener(ClientScene, ClientScene.EVENT_IN_NEW_SCENE, Callback.New(GameGate.onInNewScene, GameGate));
        // 初始化GameCreator内核：完成后显示标题界面
        EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(GameGate.onWorldInit, this), true);
    }
    /**
     * 世界初始化
     */
    private static onWorldInit() {
        // 初始化设置
        GUI_Setting.init();
        // 初始化项目工具类
        ProjectUtils.init();
        // 移动端屏幕显示
        if (Browser.onMobile) {
            stage.screenMode = ClientWorld.data.screenMode == 0 ? "horizontal" : "vertical";
            stage.setScreenSize(Browser.width, Browser.height);
        }
        // 启动的场景设定
        Config["BORN"].sceneID = WorldData.bornScene;
        // 直接读档的场合
        var onceLoadGame = LocalStorage.getJSON(GUI_SaveFileManager.onceInSceneLoadGameSign);
        if (onceLoadGame && onceLoadGame.id != null && SinglePlayerGame.getSaveInfoByID(onceLoadGame.id)) {
            // 移除一次读档的操作
            LocalStorage.removeItem(GUI_SaveFileManager.onceInSceneLoadGameSign);
            // 读取存档，失败的话调用失败时事件处理
            GUI_SaveFileManager.currentSveFileIndexInfo = SinglePlayerGame.getSaveInfoByID(onceLoadGame.id);
            GUI_SaveFileManager.loadFile(onceLoadGame.id, Callback.New((success: boolean) => {
                if (!success) CommandPage.startTriggerFragmentEvent(WorldData.loadGameFailEvent, Game.player.sceneObject, Game.player.sceneObject);
            }, this));
            return;
        }
        // 启动事件
        CommandPage.startTriggerFragmentEvent(ClientWorld.data.startupEvent, Game.player.sceneObject, Game.player.sceneObject)
    }
    /**
     * 当接收到进入新的场景时事件
     * @param sceneID 场景模型ID
     * @param inNewSceneState 进入场景的方式 0-切换游戏场景 1-新游戏 2-读取存档
     */
    private static onInNewScene(sceneID: number, inNewSceneState: number): void {
        // 清理对话记录
        if (inNewSceneState == 0) {
            WorldData.dialogRecords.length = 0;
        }
        // 如果正处于切换场景中的话忽略掉
        if (this.gateState != null && this.gateState < GameGate.STATE_3_IN_SCENE_COMPLETE) return;
        // 【0】设置游戏之门状态：离开场景，开始执行相关准备事件
        GameGate.gateState = GameGate.STATE_0_START_EXECUTE_LEAVE_SCENE_EVENT;
        EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
        // 根据state状态来执行相关准备事件（离开场景时事件、新游戏开始事件、读档开始事件）
        var startEvents = [ClientWorld.data.leaveSceneEvent, ClientWorld.data.newGameStartEvent, ClientWorld.data.loadGameStartEvent];
        CommandPage.startTriggerFragmentEvent(startEvents[inNewSceneState], Game.player.sceneObject, Game.player.sceneObject, Callback.New(disposeLastScene, this));
        var lastTonal = null;
        // 释放上一个场景
        function disposeLastScene() {
            // 【1】设置游戏之门状态：开始加载场景
            GameGate.gateState = GameGate.STATE_1_START_LOAD_SCENE;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            if (Game.currentScene) {
                // 玩家的场景对象移除出来不用销毁
                if (Game.player.sceneObject.inScene) Game.currentScene.removeSceneObject(Game.player.sceneObject);
                // 获取上一个场景
                var lastScene = Game.currentScene;
                // 记录上一个场景的色调
                lastTonal = lastScene.displayObject.getTonal();
                // 移除上一个场景
                Game.layer.sceneLayer.removeChildren();
                // 卸载进入场景前预加载的资源，减少引用计数
                if (inNewSceneState == 0) AssetManager.disposeScene(lastScene.id);
                // 卸载当前场景
                lastScene.dispose();
                Game.currentScene = null;
            }
            loadPlayerAsset();
        }
        // 加载玩家场景对象需要的资源
        function loadPlayerAsset() {
            if (inNewSceneState != 0) AssetManager.preLoadSceneObjectAsset(Game.player.data.sceneObject, Callback.New(loadNewScene, this));
            else loadNewScene.apply(this);
        }
        // 加载新的场景
        function loadNewScene() {
            // 预加载场景资源，增加引用计数
            AssetManager.preLoadSceneAsset(sceneID, Callback.New(() => {
                // 创建场景
                ClientScene.createScene(sceneID, Callback.New((scene: ClientScene) => {

                }, this), Callback.New(onLoadedNewScene, this), true);
            }, this), true, false, true);
        }
        /**
         * 当场景资源加载完毕时
         * @param scene 新的场景
         */
        function onLoadedNewScene(scene: ClientScene) {
            // 记录新的场景
            Game.currentScene = scene;
            // 恢复上个场景的色调
            if (lastTonal) {
                var t = lastTonal;
                Game.currentScene.displayObject.setTonal(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            // 非读档模式下：添加预设的场景对象（读档的话会自动恢复场景对象和其自定义属性、独立开关）
            if (inNewSceneState != 2) {
                var sceneObjects: SceneObject[] = scene.getPresetSceneObjectDatas();
                var len = sceneObjects.length;
                for (var i = 0; i < len; i++) {
                    var soObj = sceneObjects[i];
                    if (!soObj) continue;
                    var soc = scene.addSceneObjectFromClone(sceneID, i, false);
                    // 安装对象开关
                    var soSwitchs = SinglePlayerGame.getSceneObjectSwitch(sceneID, i);
                    if (soSwitchs) {
                        soc.installSwitchs(soSwitchs);
                    }
                }
            }
            // 添加玩家场景对象
            var insertNewPostion = inNewSceneState != 2;
            if (!GameGate.inSceneInited) {
                GameGate.addPlayerSceneObject(Game.player.data.sceneObject, false, insertNewPostion);
            }
            else {
                GameGate.addPlayerSceneObject(Game.player.sceneObject, true, insertNewPostion);
            }
            // 场景开始渲染
            Game.currentScene.startRender();
            // 添加到显示列表中
            Game.layer.sceneLayer.addChild(Game.currentScene.displayObject);
            // 如果是从存档恢复的则恢复存档数据
            if (inNewSceneState == 2) {
                SinglePlayerGame.recoveryData();
            }
            startExecuteSceneLoadedEvent.apply(this);
        }
        // 【2】开始执行场景加载完成时事件
        function startExecuteSceneLoadedEvent() {
            GameGate.gateState = GameGate.STATE_2_START_EXECUTE_IN_SCENE_EVENT;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            var endEvents = [ClientWorld.data.inSceneLoadCompleteEvent, ClientWorld.data.newGameEndEvent, ClientWorld.data.loadGameEndEvent];
            CommandPage.startTriggerFragmentEvent(endEvents[inNewSceneState], Game.player.sceneObject, Game.player.sceneObject, Callback.New(inSceneComplete, this));
        }
        /**
         * 【3】进入场景完成
         */
        function inSceneComplete() {
            GameGate.gateState = GameGate.STATE_3_IN_SCENE_COMPLETE;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            // 游戏首次登入场景时初始化事件（无论通过新游戏还是存档，都会调用，用于进入游戏时自定义初始化用）
            if (!GameGate.inSceneInited) {
                GameGate.inSceneInited = true;
                CommandPage.startTriggerFragmentEvent(WorldData.gameInitEvent, Game.player.sceneObject, Game.player.sceneObject);
            }
            // 非读档的情况
            if (inNewSceneState != 2) {
                // 获取进入场景的事件
                var sceneCmdTypeIndex = 0;
                var commandPageInScene = Game.currentScene.customCommandPages[sceneCmdTypeIndex];
                var inSceneCmdLength = commandPageInScene.commands.length;
                // 执行场景进入事件则派发事件
                if (inSceneCmdLength > 0) {
                    // 获取事件触发器：由玩家触发，执行者也是玩家
                    var commandTriggerInScene = Game.player.sceneObject.getCommandTrigger(CommandTrigger.COMMAND_MAIN_TYPE_SCENE, sceneCmdTypeIndex, Game.currentScene, Game.player.sceneObject);
                    // 监听一次事件执行，完毕后启动控制器
                    EventUtils.addEventListener(commandTriggerInScene, CommandTrigger.EVENT_OVER, Callback.New(() => {
                    }, this, []), true);
                    // 开始执行事件
                    commandPageInScene.startTriggerEvent(commandTriggerInScene);
                }
            }
        }
    }
    /**
     * 添加玩家的场景对象
     * @param so 玩家场景对象数据
     * @param isEntity 是否是场景对象实体 
     * @param insertNewPostion 插入到新的空位置上，如普通的切换场景时
     */
    private static addPlayerSceneObject(so: SceneObject, isEntity: boolean = false, insertNewPostion: boolean = true): void {
        if (!Game.currentScene) return;
        if (!isEntity) delete so.player;
        else {
            so.x = Game.player.data.sceneObject.x;
            so.y = Game.player.data.sceneObject.y;
        }
        if (insertNewPostion) {
            var newIndex = ArrayUtils.getNullPosition(Game.currentScene.sceneObjects);
            so.index = newIndex;
        }
        var soc = Game.currentScene.addSceneObject(so, isEntity, true);
        Game.player.sceneObject = soc as any;
        soc.player = Game.player;
    }
}