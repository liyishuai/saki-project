function generateExam(...probs) {
    // 生成相关选项。。。
    // 会根据点击不同的选项，调用API更新特定的状态
}

// 例如这样调用，会生成 1213，2559 这两个题目选项
// 分别点击会给出输入框，让玩家输入答案。
// 再由右边的逻辑去检查答案是否正确。
function probsInit() {
    return generateExam( 1213, 2559, );
}

