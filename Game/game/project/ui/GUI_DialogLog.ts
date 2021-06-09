/**
 * 对话记录
 * Created by 黑暗之神KDS on 2020-12-22 09:45:56.
 */
class GUI_DialogLog extends GUI_4 {
    /**
     * 构造函数
     */
    constructor() {
        super();
        this.on(EventObject.DISPLAY, this, this.refreshList);
        this.dialogRecordList.onCreateItem = Callback.New(this.onCreateItem, this);
    }
    /**
     * 当创建项显示对象时
     * @param ui 项显示对象界面 
     * @param data 项数据
     * @param index 所在的索引
     */
    private onCreateItem(ui: GUI_1002, data: ListItem_1002, index: number) {
        var dialogRecordInfo: DataStructure_dialogRecordInfo = data.data;
        if (dialogRecordInfo && dialogRecordInfo.tsURL) {
            ui.tsBtn.visible = true;
            ui.tsBtn.on(EventObject.CLICK, this, () => {
                GameAudio.stopTS();
                GameAudio.playTS(dialogRecordInfo.tsURL);
            });
        }
        else {
            ui.tsBtn.visible = false;
        }
    }
    /**
     * 刷新列表
     */
    private refreshList() {
        // 获取对话记录
        var dialogRecords = WorldData.dialogRecords;
        if (!dialogRecords || dialogRecords.length == 0) {
            this.dialogRecordList.items = [];
            return;
        }
        // 文本和对话内容
        let a: ListItem_1002[] = [];
        for (let i = 0; i < dialogRecords.length; i++) {
            let item: ListItem_1002 = new ListItem_1002;
            var dialogRecordInfo = dialogRecords[i];
            item.dialogName = dialogRecordInfo.dialogName;
            item.dialogContent = dialogRecordInfo.dialogContent;
            item.data = dialogRecordInfo;
            a.push(item);
        }
        this.dialogRecordList.items = a;
        // 滚动到最底下
        this.dialogRecordList.scrollTo(99999);
    }
}