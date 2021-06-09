




var GUI_Setting = (function (_super) {
    __extends(GUI_Setting, _super);
    function GUI_Setting() {
        _super.call(this);
        if (!this.bgmSlider) {
            alert("设置界面缺失组件「bgmSlider」");
            return;
        }
        if (!this.bgsSlider) {
            alert("设置界面缺失组件「bgsSlider」");
            return;
        }
        if (!this.seSlider) {
            alert("设置界面缺失组件「seSlider」");
            return;
        }
        if (!this.tsSlider) {
            alert("设置界面缺失组件「tsSlider」");
            return;
        }
        this.bgmSlider.on(EventObject.CHANGE, this, this.onAudioSliderChange, [this.bgmSlider, 0]);
        this.bgsSlider.on(EventObject.CHANGE, this, this.onAudioSliderChange, [this.bgsSlider, 1]);
        this.seSlider.on(EventObject.CHANGE, this, this.onAudioSliderChange, [this.seSlider, 2]);
        this.tsSlider.on(EventObject.CHANGE, this, this.onAudioSliderChange, [this.tsSlider, 3]);
        this.on(EventObject.UNDISPLAY, this, this.onUndisplay);
        this.on(EventObject.DISPLAY, this, this.onDisplay);
    }
    GUI_Setting.prototype.onDisplay = function () {
        this.bgmSlider.setValueForce(GameAudio.bgmVolume);
        this.bgsSlider.setValueForce(GameAudio.bgsVolume);
        this.seSlider.setValueForce(GameAudio.seVolume);
        this.tsSlider.setValueForce(GameAudio.tsVolume);
    };
    GUI_Setting.prototype.onUndisplay = function () {
        SinglePlayerGame.saveGlobalData(null);
    };
    GUI_Setting.prototype.onAudioSliderChange = function (slider, mode) {
        if (mode == 0)
            GameAudio.bgmVolume = slider.value;
        else if (mode == 1)
            GameAudio.bgsVolume = slider.value;
        else if (mode == 2)
            GameAudio.seVolume = slider.value;
        else if (mode == 3)
            GameAudio.tsVolume = slider.value;
    };
    GUI_Setting.init = function () {
        SinglePlayerGame.saveConfig.audioVolume = false;
        var settingData = SinglePlayerGame.getSaveCustomGlobalData("Setting");
        if (settingData) {
            GameAudio.bgmVolume = settingData.bgmVolume;
            GameAudio.bgsVolume = settingData.bgsVolume;
            GameAudio.seVolume = settingData.seVolume;
            GameAudio.tsVolume = settingData.tsVolume;
        }
        SinglePlayerGame.regSaveCustomGlobalData("Setting", Callback.New(this.getGlobalData, this));
    };
    GUI_Setting.getGlobalData = function () {
        return {
            bgmVolume: GameAudio.bgmVolume,
            bgsVolume: GameAudio.bgsVolume,
            seVolume: GameAudio.seVolume,
            tsVolume: GameAudio.tsVolume
        };
    };
    return GUI_Setting;
}(GUI_6));
//# sourceMappingURL=GUI_Setting.js.map