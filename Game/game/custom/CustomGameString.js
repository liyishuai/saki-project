var CustomGameString;
(function (CustomGameString) {
    function f1(trigger, p) {
        switch (p.type) {
            case 0:
                return Game.currentScene.name;
        }
        return "";
    }
    CustomGameString.f1 = f1;
    function f2(trigger, p) {
        var uiID = p.uiComp.uiID;
        var ui = GameUI.get(uiID);
        if (!ui)
            return "";
        var comp = ui.compsIDInfo[p.uiComp.compID];
        if (!comp)
            return "";
        var value = comp[p.uiComp.varName];
        return value == null ? "" : value.toString();
    }
    CustomGameString.f2 = f2;
    function f3(trigger, p) {
        var dataID = p.useDataVar ? Game.player.variable.getVariable(p.dataVarID) : p.dataID;
        var moduleData = GameData.getModuleData(p.moduleID, dataID);
        if (!moduleData)
            return "";
        var value = moduleData[p.attrName];
        return value == null ? "" : value.toString();
    }
    CustomGameString.f3 = f3;
    function f4(trigger, p) {
        var value = WorldData[p.customAttrName];
        return value == null ? "" : value.toString();
    }
    CustomGameString.f4 = f4;
})(CustomGameString || (CustomGameString = {}));
//# sourceMappingURL=CustomGameString.js.map