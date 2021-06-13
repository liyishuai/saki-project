/**
 * 生成一套题目，需配合选项界面与 API 代码，在上述之前调用。
 * @param name 整套题目的名称；此后可根据此名称获取解题结果
 * @param problems 题目数组；其内容格式应为标准格式的 `{前缀}-{问题编号}` 如：`POJ-3469`
 */
function generateExam(name: string, problems: string[]): void {
    const problemsMap = {};
    problems.forEach((name) => problemsMap[name] = 0);
    WorldData.AllProblems[name] = problemsMap;

    // save a reference of this name
    WorldData.AllProblems.currentProblemsName = name

    // modify all in-game variables for options interface
    updateSolutionVariables(problemsMap);
}

function updateSolutionVariables(problemsMap) {
    Object.keys(problemsMap).forEach((key, index) => {
        const status = problemsMap[key];

        if (index > 19) {
            throw new Error('Cannot save problems more than 19s in one time; this can be solved by editing the source code');
        }

        // allowed start saved index from 2001(+0) to 2019
        Game.player.variable.setVariable(2001 + index, status);
        Game.player.variable.setString(2001 + index, `${key}${status ? ' (AC)' : ''}`);
    })

    // set in-game allAC value as tested value (in this version it's position is `2020`)
    // hence we throw the error if problemsMap has length more than 19.
    const allAC = Number(Object.keys(problemsMap).map((key) => problemsMap[key]).every((e) => Boolean(e)));
    Game.player.variable.setVariable(2020, allAC);
    Game.player.variable.setString(2020, (allAC ? '打完收工' : '放弃治疗'));
}

function solutionRequest() {
    // 当前的事件触发器：trigger: CommandTrigger;
    const ur = new HttpRequest();

    /* 获取解决方案的id，在前一个用户脚本中，以 string 的格式保存在了玩家变量数组位置[1]中 */
    const solutionId: string = Game.player.variable.getString(1);

    const problemsMapName = WorldData.AllProblems.currentProblemsName;
    const problemsMap = WorldData.AllProblems[problemsMapName];

    // vjudge API
    ur.send(`https://vjudge.net/solution/data/${solutionId}`);

    ur.on(EventObject.COMPLETE, this, (content: string) => {
        let data;

        try {
            data = JSON.parse(content);
        } catch(e) {
            // request is error flag
            Game.player.variable.setVariable(1, 2);
            return;
        }

        Game.player.variable.setString(6, data.author);
        Game.player.variable.setString(7, data.memory);
        Game.player.variable.setString(8, data.language);
        Game.player.variable.setString(9, data.status);

        const problem = [data.oj, data.probNum].join('-');

        if (data.statusCanonical === 'AC' && Object.keys(problemsMap).indexOf(problem) !== -1) {
            problemsMap[problem] = 1;
        }

        // update variables
        updateSolutionVariables(problemsMap);

        // request is done flag
        Game.player.variable.setVariable(1, 1);
    });

    ur.on(EventObject.ERROR, this, (error: string) => {
        // request is error flag
        Game.player.variable.setVariable(1, 2);
    });
}
