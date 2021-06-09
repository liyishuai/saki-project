/**
 * 自定义条件分歧
 * Created by 黑暗之神KDS on 2020-09-16 19:47:24.
 */
module CustomCondition {
    /**
     * 界面
     * @param trigger 事件触发器
     * @param p 自定义参数
     * @return [boolean] 
     */
    export function f1(trigger: CommandTrigger, p: CustomConditionParams_1): boolean {
        // 获取界面
        if (p.checkType == 0) {
            if (p.useVarID) {
                var uiID = Game.player.variable.getVariable(p.uiIDVarID);
            }
            else {
                uiID = p.uiID;
            }
        }
        else {
            uiID = p.uiComp.uiID;
        }
        // 界面ID
        var ui: GUI_BASE = GameUI.get(uiID) as any;
        if (!ui) {
            if (p.checkType == 0 && p.type == 3) return true;
            return false;
        }
        if (p.checkType == 1) {
            // 根据组件唯一ID找到该组件
            var comp = ui.compsIDInfo[p.uiComp.compID];
            if (!comp) return false;
            var value = comp[p.uiComp.varName];
            return value ? true : false;
        }
        if (p.type == 0) return true;
        if (p.type == 1) return false;
        if (p.type == 2) return ui.stage ? true : false;
        if (p.type == 3) return ui.stage ? false : true;
        if (p.type == 4) return Game.layer.uiLayer.getChildAt(Game.layer.uiLayer.numChildren - 1) == ui;
    }
    /**
     * 系统
     */
    export function f2(trigger: CommandTrigger, p: CustomConditionParams_2): boolean {
        if (p.sys == 0) return GameDialog.isInDialog;
        else if (p.sys == 1) return GameDialog.isPlaying;
        else if (p.sys == 2) return isPlayTS;
        else if (p.sys == 3) return os.fullscreen;
        else if (p.sys == 4) return ___dialogRecord[GameDialog.fromCommandID];
        else if (p.sys == 5) return Browser.onMobile;
        else if (p.sys == 6) return os.platform == 3;
    }
}