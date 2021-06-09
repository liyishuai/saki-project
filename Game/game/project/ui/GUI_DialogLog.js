




var GUI_DialogLog = (function (_super) {
    __extends(GUI_DialogLog, _super);
    function GUI_DialogLog() {
        _super.call(this);
        this.on(EventObject.DISPLAY, this, this.refreshList);
        this.dialogRecordList.onCreateItem = Callback.New(this.onCreateItem, this);
    }
    GUI_DialogLog.prototype.onCreateItem = function (ui, data, index) {
        var dialogRecordInfo = data.data;
        if (dialogRecordInfo && dialogRecordInfo.tsURL) {
            ui.tsBtn.visible = true;
            ui.tsBtn.on(EventObject.CLICK, this, function () {
                GameAudio.stopTS();
                GameAudio.playTS(dialogRecordInfo.tsURL);
            });
        }
        else {
            ui.tsBtn.visible = false;
        }
    };
    GUI_DialogLog.prototype.refreshList = function () {
        var dialogRecords = WorldData.dialogRecords;
        if (!dialogRecords || dialogRecords.length == 0) {
            this.dialogRecordList.items = [];
            return;
        }
        var a = [];
        for (var i = 0; i < dialogRecords.length; i++) {
            var item = new ListItem_1002;
            var dialogRecordInfo = dialogRecords[i];
            item.dialogName = dialogRecordInfo.dialogName;
            item.dialogContent = dialogRecordInfo.dialogContent;
            item.data = dialogRecordInfo;
            a.push(item);
        }
        this.dialogRecordList.items = a;
        this.dialogRecordList.scrollTo(99999);
    };
    return GUI_DialogLog;
}(GUI_4));
//# sourceMappingURL=GUI_DialogLog.js.map