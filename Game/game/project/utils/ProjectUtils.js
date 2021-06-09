var ProjectUtils = (function () {
    function ProjectUtils() {
    }
    ProjectUtils.init = function () {
        var _this = this;
        stage.on(EventObject.MOUSE_WHEEL, this, function (e) { ProjectUtils.mouseWhileValue = e.delta; });
        stage.on(EventObject.KEY_DOWN, this, function (e) { _this.keyboardEvent = e; });
        stage.on(EventObject.KEY_UP, this, function (e) { _this.keyboardEvent = null; });
    };
    ProjectUtils.takeoutRect = function () {
        return ProjectUtils.rectanglePool.takeout();
    };
    ProjectUtils.freeRect = function (rect) {
        ProjectUtils.rectanglePool.free(rect);
    };
    ProjectUtils.dateFormat = function (fmt, date) {
        var ret;
        var opt = {
            "Y+": date.getFullYear().toString(),
            "m+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "M+": date.getMinutes().toString(),
            "S+": date.getSeconds().toString()
        };
        for (var k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            }
            ;
        }
        ;
        return fmt;
    };
    ProjectUtils.timerFormat = function (time) {
        var S = 1000;
        var M = S * 60;
        var H = M * 60;
        var hTotal = Math.floor(time / H);
        var hStr = MathUtils.fixIntDigit(hTotal, 2);
        time -= H * hTotal;
        var mTotal = Math.floor(time / M);
        var mStr = MathUtils.fixIntDigit(mTotal, 2);
        time -= M * mTotal;
        var sTotal = Math.floor(time / S);
        var sStr = MathUtils.fixIntDigit(sTotal, 2);
        return hStr + ":" + mStr + ":" + sStr;
    };
    ProjectUtils.mouseWhileValue = 0;
    ProjectUtils.callbackHelper = new Callback;
    ProjectUtils.pointHelper = new Point;
    ProjectUtils.rectangleHelper = new Rectangle;
    ProjectUtils.rectanglePool = new PoolUtils(Rectangle);
    return ProjectUtils;
}());
//# sourceMappingURL=ProjectUtils.js.map