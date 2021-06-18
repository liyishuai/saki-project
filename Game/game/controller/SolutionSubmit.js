function generateExam(name, problems) {
    var problemsMap = {};
    problems.forEach(function (name) { return problemsMap[name] = 0; });
    WorldData.AllProblems[name] = problemsMap;
    WorldData.AllProblems.currentProblemsName = name;
    updateSolutionVariables(problemsMap);
}
function updateSolutionVariables(problemsMap) {
    Object.keys(problemsMap).forEach(function (key, index) {
        var status = problemsMap[key];
        if (index > 19) {
            throw new Error('Cannot save problems more than 19s in one time; this can be solved by editing the source code');
        }
        Game.player.variable.setVariable(2001 + index, status);
        Game.player.variable.setString(2001 + index, "" + key + (status ? ' (AC)' : ''));
    });
    var allAC = Number(Object.keys(problemsMap).map(function (key) { return problemsMap[key]; }).every(function (e) { return Boolean(e); }));
    Game.player.variable.setVariable(2020, allAC);
    Game.player.variable.setString(2020, (allAC ? '打完收工' : '放弃治疗'));
}
function solutionRequest() {
    var ur = new HttpRequest();
    var solutionId = Game.player.variable.getString(1);
    var problemsMapName = WorldData.AllProblems.currentProblemsName;
    var problemsMap = WorldData.AllProblems[problemsMapName];
    ur.send("https://vjudge.net/solution/data/" + solutionId, null, 'get', 'json');
    ur.on(EventObject.COMPLETE, this, function (content) {
        Game.player.variable.setString(6, content.author);
        Game.player.variable.setString(7, content.memory);
        Game.player.variable.setString(8, content.language);
        Game.player.variable.setString(9, content.status);
        var problem = [content.oj, content.probNum].join('-');
        if (content.statusCanonical === 'AC' && Object.keys(problemsMap).indexOf(problem) !== -1) {
            problemsMap[problem] = 1;
        }
        updateSolutionVariables(problemsMap);
        Game.player.variable.setVariable(1, 1);
    });
    ur.on(EventObject.ERROR, this, function (error) {
        Game.player.variable.setVariable(1, 2);
    });
}
//# sourceMappingURL=SolutionSubmit.js.map