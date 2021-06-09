




var ProjectGame = (function (_super) {
    __extends(ProjectGame, _super);
    function ProjectGame() {
        _super.call(this);
        EventUtils.addEventListener(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, Callback.New(this.onInSceneStateChange, this));
    }
    ProjectGame.prototype.init = function () {
        this.player = new ProjectPlayer();
    };
    ProjectGame.prototype.onInSceneStateChange = function (inNewSceneState) {
        if (inNewSceneState == 1) {
            ProjectGame.gameStartTime = new Date();
        }
        else if (inNewSceneState == 2) {
            ProjectGame.gameStartTime = new Date((Date.now() - GUI_SaveFileManager.currentSveFileIndexInfo.indexInfo.gameTime));
        }
    };
    return ProjectGame;
}(GameBase));
//# sourceMappingURL=ProjectGame.js.map