function request() {
    // 当前的事件触发器：trigger: CommandTrigger;
    const ur = new HttpRequest();
    /* 获取解决方案的id，在前一个用户脚本中，以 string 的格式保存在了玩家变量数组位置[1]中 */
    const solutionId: string = Game.player.variable.getString(1);

    // vjudge API
    ur.send(`https://vjudge.net/solution/data/${solutionId}`);

    ur.on(EventObject.COMPLETE, this, (content:string) => {
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

        if (data.statusCanonical === "AC" && Object.keys(probsMap).indexOf(data.probNum) !== -1) {
            Game.player.variable.setVariable(probsMap[data.probNum], 1);
        }

        // check if every problem is AC
        Game.player.variable.setVariable(2006,
            Number(Object.keys(probsMap).map((key) => Game.player.variable.getVariable(probsMap[key])).every(e => Boolean(e)))
        );

        // request is done flag
        Game.player.variable.setVariable(1, 1);
    });

    ur.on(EventObject.ERROR, this, (error:string) => {
        // request is error flag
        Game.player.variable.setVariable(1, 2);
        trace(error)
    });

}
