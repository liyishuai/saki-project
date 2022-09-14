class WorldData {
    static readonly screenMode: number; // = 0; 移动端屏幕布局模式
    static readonly saveFileMax: number; // = 10; 存档总数
    static bornScene: number; // = 0; 游戏初始场景
    static dialogRecords: DataStructure_dialogRecordInfo[]; // = [];
    static myCG: number[]; // = [];
    static listSelectSE: string; // = ""; 列表选项选中时音效
    static AllProblems: any;
    static dialogStart: string; // = ""; 对话开始时处理
    static dialogEnd: string; // = ""; 对话结束时处理
    static dialogWordPlay: string; // = ""; 对话文本播放时处理
    static dialogWordPlayComplete: string; // = ""; 对话文本播放完成时处理
    static dialogTsComplete: string; // = ""; 对话语音播放完毕时处理
    static readonly startupEvent: string; // = ""; 游戏启动时处理
    static readonly newGameStartEvent: string; // = ""; 新游戏开始时处理
    static readonly newGameEndEvent: string; // = ""; 新游戏完成时处理
    static readonly loadGameStartEvent: string; // = ""; 读取存档开始时处理
    static readonly loadGameEndEvent: string; // = ""; 读取存档完成时处理
    static readonly loadGameFailEvent: string; // = ""; 读档失败时处理
    static readonly saveSuccessEvent: string; // = ""; 存档成功时处理
    static readonly saveFailEvent: string; // = ""; 存档失败时处理
    static readonly inSceneLoadCompleteEvent: string; // = ""; 进入场景时事件
    static readonly leaveSceneEvent: string; // = ""; 离开场景时事件
    static readonly gameInitEvent: string; // = ""; 游戏初始化处理
}
class PlayerData {
    sceneObject: SceneObject;
}