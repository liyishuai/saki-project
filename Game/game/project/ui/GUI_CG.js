




var GUI_CG = (function (_super) {
    __extends(GUI_CG, _super);
    function GUI_CG() {
        _super.call(this);
        this.on(EventObject.DISPLAY, this, this.onDisplay);
        this.cgList.on(UIList.ITEM_CLICK, this, this.onItemClick);
        this.cgList.on(EventObject.CHANGE, this, ___listSEPlay);
    }
    GUI_CG.prototype.onDisplay = function () {
        var arr = [];
        var len = GameData.getLength(1, 1);
        for (var i = 1; i <= len; i++) {
            var cgID = i;
            var d = new ListItem_1003;
            arr.push(d);
            if (WorldData.myCG.indexOf(cgID) != -1) {
                var cgData = GameData.getModuleData(1, cgID);
                d.cg = cgData.CGs[0];
                d.data = cgData;
            }
        }
        this.cgList.items = arr;
    };
    GUI_CG.prototype.onItemClick = function () {
        var selectedItem = this.cgList.selectedItem;
        if (!selectedItem)
            return;
        var cgData = selectedItem.data;
        if (!cgData)
            return;
        this.cgIndex = 0;
        var bigCGUI = GameUI.show(12);
        bigCGUI.bigCG.off(EventObject.CLICK, this, this.onCGClick);
        bigCGUI.bigCG.on(EventObject.CLICK, this, this.onCGClick);
        bigCGUI.bigCG.image = cgData.CGs[0];
        this.currentCGData = cgData;
        bigCGUI.bigCG.visible = true;
    };
    GUI_CG.prototype.onCGClick = function () {
        var bigCGUI = GameUI.get(12);
        this.cgIndex++;
        if (this.cgIndex >= this.currentCGData.CGs.length) {
            this.cgIndex = 0;
        }
        bigCGUI.bigCG.image = this.currentCGData.CGs[this.cgIndex];
    };
    return GUI_CG;
}(GUI_11));
//# sourceMappingURL=GUI_CG.js.map