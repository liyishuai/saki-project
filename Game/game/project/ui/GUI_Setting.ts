/**
 * 系统设置
 * Created by 黑暗之神KDS on 2020-12-21 13:55:53.
 */
class GUI_Setting extends GUI_6 {
    /**
     * 构造函数
     */
    constructor() {
        super();
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
    /**
     * 当界面打开时
     */
    private onDisplay() {
        this.bgmSlider.setValueForce(GameAudio.bgmVolume);
        this.bgsSlider.setValueForce(GameAudio.bgsVolume);
        this.seSlider.setValueForce(GameAudio.seVolume);
        this.tsSlider.setValueForce(GameAudio.tsVolume);
    }
    /**
     * 当界面关闭时
     */
    private onUndisplay() {
        SinglePlayerGame.saveGlobalData(null);
    }
    /**
     * 当音量改变时处理
     * @param slider 
     * @param mode 
     */
    private onAudioSliderChange(slider: UISlider, mode: number) {
        if (mode == 0) GameAudio.bgmVolume = slider.value;
        else if (mode == 1) GameAudio.bgsVolume = slider.value;
        else if (mode == 2) GameAudio.seVolume = slider.value;
        else if (mode == 3) GameAudio.tsVolume = slider.value;
    }
    //------------------------------------------------------------------------------------------------------
    // 载入设定
    //------------------------------------------------------------------------------------------------------
    /**
     * 初始化
     */
    static init() {
        // 配置：音量不跟随存档
        SinglePlayerGame.saveConfig.audioVolume = false;
        // 载入配置
        var settingData = SinglePlayerGame.getSaveCustomGlobalData("Setting");
        if (settingData) {
            GameAudio.bgmVolume = settingData.bgmVolume;
            GameAudio.bgsVolume = settingData.bgsVolume;
            GameAudio.seVolume = settingData.seVolume;
            GameAudio.tsVolume = settingData.tsVolume;
        }
        // 注册自定义储存信息
        SinglePlayerGame.regSaveCustomGlobalData("Setting", Callback.New(this.getGlobalData, this));
    }
    /**
     * 获取全局数据
     */
    static getGlobalData() {
        return {
            bgmVolume: GameAudio.bgmVolume,
            bgsVolume: GameAudio.bgsVolume,
            seVolume: GameAudio.seVolume,
            tsVolume: GameAudio.tsVolume
        };
    }
}