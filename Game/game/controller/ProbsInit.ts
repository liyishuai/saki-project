function generateExam(...probs) {
    // 生成相关选项。。。
    // 会根据点击不同的选项，调用API更新特定的状态
    // 列表方式添加数据
    const a = new UIList();
    a.overImageURL = "asset/image/picture/control/uilistover.png";
    a.selectImageURL = "asset/image/picture/control/uilistselect.png";
    a.itemModelGUI = 14; // 使用指定的界面ID来创建项，如果需要指定类，请使用 itemModelClass
    stage.addChild(a);
    const dArr = [];
    for (let i=0; i<4; i++) {
        const d: ListItem_15 = new ListItem_15();
        d.label = `选项${i*2}`;
        dArr.push(d);
    }
    // a.on(EventObject.CHANGE,this,this.onChange);
}

// 例如这样调用，会生成 1213，2559 这两个题目选项
// 分别点击会给出输入框，让玩家输入答案。
// 再由右边的逻辑去检查答案是否正确。
function probsInit() {
    return generateExam( 1213, 2559, );
}

