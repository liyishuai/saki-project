var CustomGameNumber;
(function (CustomGameNumber) {
    function f1(trigger, p) {
        if (p.useVarID) {
            var uiID = Game.player.variable.getVariable(p.uiIDVarID);
        }
        else {
            uiID = p.type == 1 ? p.uiComp.uiID : p.uiID;
        }
        var ui = GameUI.get(uiID);
        if (!ui)
            return 0;
        if (p.type == 0) {
            return MathUtils.float(ui[p.uiAttrName]);
        }
        else if (p.type == 1) {
            var comp = ui.compsIDInfo[p.uiComp.compID];
            if (!comp)
                return 0;
            return MathUtils.float(comp[p.uiComp.varName]);
        }
    }
    CustomGameNumber.f1 = f1;
    function f2(trigger, p) {
        if (p.type == 0)
            return stage.mouseX;
        else if (p.type == 1)
            return stage.mouseY;
        else if (p.type == 2)
            return ProjectUtils.mouseWhileValue;
        else if (p.type == 3)
            return p.pointKeyboard;
        else if (p.type == 4)
            return ProjectUtils.keyboardEvent ? ProjectUtils.keyboardEvent.keyCode : -1;
    }
    CustomGameNumber.f2 = f2;
    function f3(trigger, p) {
        var dataID = p.useDataVar ? Game.player.variable.getVariable(p.dataVarID) : p.dataID;
        var moduleData = GameData.getModuleData(p.moduleID, dataID);
        if (!moduleData)
            return 0;
        return MathUtils.float(moduleData[p.attrName]);
    }
    CustomGameNumber.f3 = f3;
    function f4(trigger, p) {
        if (p.type == 0) {
            if (p.presetType == 0)
                return GameAudio.bgmVolume * 100;
            if (p.presetType == 1)
                return GameAudio.bgsVolume * 100;
            if (p.presetType == 2)
                return GameAudio.seVolume * 100;
            if (p.presetType == 3)
                return GameAudio.tsVolume * 100;
        }
        else {
            return MathUtils.float(WorldData[p.attrName]);
        }
    }
    CustomGameNumber.f4 = f4;
})(CustomGameNumber || (CustomGameNumber = {}));
//# sourceMappingURL=CustomGameNumber.js.map