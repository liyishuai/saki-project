/**
 * 自定义游戏数值
 * Created by 黑暗之神KDS on 2020-09-16 19:47:24.
 */
module CustomGameNumber {
    /**
     * 界面
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f1(trigger: CommandTrigger, p: CustomGameNumberParams_1): number {
        // 获取界面
        if (p.useVarID) {
            var uiID = Game.player.variable.getVariable(p.uiIDVarID);
        }
        else {
            uiID = p.type == 1 ? p.uiComp.uiID : p.uiID;
        }
        // 界面ID
        var ui: GUI_BASE = GameUI.get(uiID) as any;
        if (!ui) return 0;
        // 界面本体属性
        if (p.type == 0) {
            return MathUtils.float(ui[p.uiAttrName]);
        }
        // 界面内组件的属性
        else if (p.type == 1) {
            // 根据组件唯一ID找到该组件
            var comp = ui.compsIDInfo[p.uiComp.compID];
            if (!comp) return 0;
            return MathUtils.float(comp[p.uiComp.varName]);
        }
    }
    /**
     * 鼠标
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f2(trigger: CommandTrigger, p: CustomGameNumberParams_2): number {
        if (p.type == 0) return stage.mouseX;
        else if (p.type == 1) return stage.mouseY;
        else if (p.type == 2) return ProjectUtils.mouseWhileValue;
        else if (p.type == 3) return p.pointKeyboard;
        else if (p.type == 4) return ProjectUtils.keyboardEvent ? ProjectUtils.keyboardEvent.keyCode : -1;

    }
    /**
     * 模块
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f3(trigger: CommandTrigger, p: CustomGameNumberParams_3): number {
        var dataID = p.useDataVar ? Game.player.variable.getVariable(p.dataVarID) : p.dataID;
        var moduleData = GameData.getModuleData(p.moduleID, dataID);
        if (!moduleData) return 0;
        return MathUtils.float(moduleData[p.attrName]);
    }
    /**
     * 世界
     * @param trigger 触发器，可能为空
     * @param p 自定义数值参数 
     */
    export function f4(trigger: CommandTrigger, p: CustomGameNumberParams_4): number {
        if (p.type == 0) {
            if (p.presetType == 0) return GameAudio.bgmVolume * 100;
            if (p.presetType == 1) return GameAudio.bgsVolume * 100;
            if (p.presetType == 2) return GameAudio.seVolume * 100;
            if (p.presetType == 3) return GameAudio.tsVolume * 100;
        }
        else {
            return MathUtils.float(WorldData[p.attrName]);
        }
    }
}