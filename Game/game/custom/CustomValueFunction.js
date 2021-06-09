var CustomValueFunction;
(function (CustomValueFunction) {
    function f1(trigger, triggerPlayer) {
        return Date.now() - ProjectGame.gameStartTime.getTime();
    }
    CustomValueFunction.f1 = f1;
    function f2(trigger, triggerPlayer) {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 1000);
    }
    CustomValueFunction.f2 = f2;
    function f3(trigger, triggerPlayer) {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 60000);
    }
    CustomValueFunction.f3 = f3;
    function f4(trigger, triggerPlayer) {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 3600000);
    }
    CustomValueFunction.f4 = f4;
    function f5(trigger, triggerPlayer) {
        return Math.floor((Date.now() - ProjectGame.gameStartTime.getTime()) / 86400000);
    }
    CustomValueFunction.f5 = f5;
    function f6(trigger, triggerPlayer) {
        return new Date().getSeconds();
    }
    CustomValueFunction.f6 = f6;
    function f7(trigger, triggerPlayer) {
        return new Date().getMinutes();
    }
    CustomValueFunction.f7 = f7;
    function f8(trigger, triggerPlayer) {
        return new Date().getHours();
    }
    CustomValueFunction.f8 = f8;
    function f9(trigger, triggerPlayer) {
        return new Date().getDay();
    }
    CustomValueFunction.f9 = f9;
    function f10(trigger, triggerPlayer) {
        return new Date().getDate();
    }
    CustomValueFunction.f10 = f10;
    function f11(trigger, triggerPlayer) {
        return new Date().getMonth() + 1;
    }
    CustomValueFunction.f11 = f11;
    function f12(trigger, triggerPlayer) {
        return new Date().getFullYear();
    }
    CustomValueFunction.f12 = f12;
    function f13(trigger, triggerPlayer) {
        return GUI_SaveFileManager.currentSveFileIndexInfo ? GUI_SaveFileManager.currentSveFileIndexInfo.id : 0;
    }
    CustomValueFunction.f13 = f13;
    function f14(trigger, triggerPlayer) {
        return trigger.inputMessage[0];
    }
    CustomValueFunction.f14 = f14;
    function f15(trigger, triggerPlayer) {
        return trigger.inputMessage[1];
    }
    CustomValueFunction.f15 = f15;
    function f16(trigger, triggerPlayer) {
        return trigger.inputMessage[2];
    }
    CustomValueFunction.f16 = f16;
    function f17(trigger, triggerPlayer) {
        return trigger.inputMessage[3];
    }
    CustomValueFunction.f17 = f17;
    function f18(trigger, triggerPlayer) {
        return trigger.inputMessage[4];
    }
    CustomValueFunction.f18 = f18;
    function f19(trigger, triggerPlayer) {
        return __fCount;
    }
    CustomValueFunction.f19 = f19;
})(CustomValueFunction || (CustomValueFunction = {}));
//# sourceMappingURL=CustomValueFunction.js.map