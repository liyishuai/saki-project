var CustomCondition;
(function (CustomCondition) {
    function f1(trigger, p) {
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
        var ui = GameUI.get(uiID);
        if (!ui) {
            if (p.checkType == 0 && p.type == 3)
                return true;
            return false;
        }
        if (p.checkType == 1) {
            var comp = ui.compsIDInfo[p.uiComp.compID];
            if (!comp)
                return false;
            var value = comp[p.uiComp.varName];
            return value ? true : false;
        }
        if (p.type == 0)
            return true;
        if (p.type == 1)
            return false;
        if (p.type == 2)
            return ui.stage ? true : false;
        if (p.type == 3)
            return ui.stage ? false : true;
        if (p.type == 4)
            return Game.layer.uiLayer.getChildAt(Game.layer.uiLayer.numChildren - 1) == ui;
    }
    CustomCondition.f1 = f1;
    function f2(trigger, p) {
        if (p.sys == 0)
            return GameDialog.isInDialog;
        else if (p.sys == 1)
            return GameDialog.isPlaying;
        else if (p.sys == 2)
            return isPlayTS;
        else if (p.sys == 3)
            return os.fullscreen;
        else if (p.sys == 4)
            return ___dialogRecord[GameDialog.fromCommandID];
        else if (p.sys == 5)
            return Browser.onMobile;
        else if (p.sys == 6)
            return os.platform == 3;
    }
    CustomCondition.f2 = f2;
})(CustomCondition || (CustomCondition = {}));
//# sourceMappingURL=CustomCondition.js.map