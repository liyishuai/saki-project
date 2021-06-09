/**
 * Created by 黑暗之神KDS on 2021-03-11 10:24:08.
 */
module CustomGameString {
    /**
     * 场景
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f1(trigger: CommandTrigger, p: CustomGameStringParams_1): string {
        switch (p.type) {
            case 0:
                return Game.currentScene.name;
        }
        return "";
    }
    /**
     * 界面
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f2(trigger: CommandTrigger, p: CustomGameStringParams_2): string {
        // 获取界面
        var uiID = p.uiComp.uiID;
        // 界面ID
        var ui: GUI_BASE = GameUI.get(uiID) as any;
        if (!ui) return "";
        // 根据组件唯一ID找到该组件
        var comp = ui.compsIDInfo[p.uiComp.compID];
        if (!comp) return "";
        var value = comp[p.uiComp.varName];
        return value == null ? "" : value.toString();
    }
    /**
     * 模块
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f3(trigger: CommandTrigger, p: CustomGameStringParams_3): string {
        var dataID = p.useDataVar ? Game.player.variable.getVariable(p.dataVarID) : p.dataID;
        var moduleData = GameData.getModuleData(p.moduleID, dataID);
        if (!moduleData) return "";
        var value = moduleData[p.attrName];
        return value == null ? "" : value.toString();
    }
    /**
     * 世界
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f4(trigger: CommandTrigger, p: CustomGameStringParams_4): string {
        var value = WorldData[p.customAttrName];
        return value == null ? "" : value.toString();
    }
}