function request() {
    var ur = new HttpRequest();
    var solutionId = Game.player.variable.getString(1);
    ur.send("https://vjudge.net/solution/data/" + solutionId);
    ur.on(EventObject.COMPLETE, this, function (content) {
        var data;
        try {
            data = JSON.parse(content);
        }
        catch (e) {
            Game.player.variable.setVariable(1, 2);
            return;
        }
        Game.player.variable.setString(6, data.author);
        Game.player.variable.setString(7, data.memory);
        Game.player.variable.setString(8, data.language);
        Game.player.variable.setString(9, data.status);
        if (data.statusCanonical === "AC" && Object.keys(probsMap).indexOf(data.probNum) !== -1) {
            Game.player.variable.setVariable(probsMap[data.probNum], 1);
        }
        Game.player.variable.setVariable(2006, Number(Object.keys(probsMap).map(function (key) { return Game.player.variable.getVariable(probsMap[key]); }).every(function (e) { return Boolean(e); })));
        Game.player.variable.setVariable(1, 1);
    });
    ur.on(EventObject.ERROR, this, function (error) {
        Game.player.variable.setVariable(1, 2);
        trace(error);
    });
}
//# sourceMappingURL=SolutionSubmit.js.map