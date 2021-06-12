/**
 * Created by JayLen on 2021-05-17 20:06:35.
 */
module CommandExecute {
    //------------------------------------------------------------------------------------------------------
    // 手机端双指缩放
    //------------------------------------------------------------------------------------------------------
    export function customCommand_15001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], gc: CustomCommandParams_15001): void {
        //不是手机端直接返回
        if (os.platform == 2) return;
        // 操作事件
        stage.on(EventObject.MOUSE_DOWN, this, onStageMouseDown);
        //
        var gcType = gc.scaleType;
        var factor: number = 0.005;
        var lastScaleX: number;
        var lastScaleY: number;
        var middlePoint: Point = new Point();
        var lastDistance: number;
        function onStageMouseDown(e: EventObject): void {
            var touches = e.touches;
            if (touches && touches.length == 2) {
                var firstPoint: Point;
                var secondPoint: Point;
                if (gcType == 0) {
                    if (!Game.currentScene) return;
                    lastScaleX = Game.currentScene.camera.scaleX;
                    lastScaleY = Game.currentScene.camera.scaleY;
                    //计算一下
                    var layer = Game.currentScene.sceneObjectLayer;
                    firstPoint = layer.globalToLocal(new Point(touches[0].stageX, touches[0].stageY));
                    secondPoint = layer.globalToLocal(new Point(touches[1].stageX, touches[1].stageY));
                    middlePoint.x = (secondPoint.x + firstPoint.x) * 0.5;
                    middlePoint.y = (secondPoint.y + firstPoint.y) * 0.5;
                } else if (gcType == 1) {
                    var ui = GameUI.get(gc.uiID);
                    if (!ui || !ui.stage) return;
                    lastScaleX = ui.scaleX;
                    lastScaleY = ui.scaleY;
                    //计算一下
                    firstPoint = ui.globalToLocal(new Point(touches[0].stageX, touches[0].stageY));
                    secondPoint = ui.globalToLocal(new Point(touches[1].stageX, touches[1].stageY));
                    middlePoint.x = (secondPoint.x + firstPoint.x) * 0.5;
                    middlePoint.y = (secondPoint.y + firstPoint.y) * 0.5;
                }
                //计算两指距离
                lastDistance = getDistance(touches);
                //其他事件
                stage.on(EventObject.MOUSE_MOVE, this, onStageMouseMove);
                stage.on(EventObject.MOUSE_UP, this, onStageMouseUp);
                stage.on(EventObject.MOUSE_OUT, this, onStageMouseUp);
            }
        }
        function getDistance(points: any[]): number {
            var distance: number = 0;
            if (points && points.length == 2) {
                var dx: number = points[0].stageX - points[1].stageX;
                var dy: number = points[0].stageY - points[1].stageY;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        }
        function onStageMouseMove(e: EventObject) {
            var touches = e.touches;
            if (touches && touches.length == 2) {
                var distance: number = getDistance(e.touches);
                //判断当前距离与上次距离变化，确定是放大还是缩小
                var __scalex = lastScaleX + (distance - lastDistance) * factor;
                var __scaley = lastScaleY + (distance - lastDistance) * factor;
                if (__scalex > 12) __scalex = 12;
                if (__scaley > 12) __scaley = 12;
                if (__scalex < 0.25) __scalex = 0.25;
                if (__scaley < 0.25) __scaley = 0.25;
                var firstPoint: Point;
                var secondPoint: Point;
                var cameraPosx;
                var cameraPosy
                //计算两指中心
                if (gcType == 0) {
                    if (!Game.currentScene) return;
                    if (Game.currentScene.camera.scaleX != __scalex || Game.currentScene.camera.scaleY != __scaley) {
                        Game.currentScene.camera.scaleX = __scalex;
                        Game.currentScene.camera.scaleY = __scaley;
                        Game.currentScene.updateCamera();
                        //计算一下
                        var layer = Game.currentScene.sceneObjectLayer;
                        firstPoint = layer.globalToLocal(new Point(touches[0].stageX, touches[0].stageY));
                        secondPoint = layer.globalToLocal(new Point(touches[1].stageX, touches[1].stageY));
                        cameraPosx = (middlePoint.x - (secondPoint.x + firstPoint.x) * 0.5) * 0.5;
                        cameraPosy = (middlePoint.y - (secondPoint.y + firstPoint.y) * 0.5) * 0.5;
                        //计算实际
                        var __x = Game.currentScene.camera.viewPort.x + cameraPosx;
                        var __y = Game.currentScene.camera.viewPort.y + cameraPosy;
                        var __width = Game.currentScene.camera.viewPort.width;
                        var __height = Game.currentScene.camera.viewPort.height;
                        var rect = new Rectangle(__x, __y, __width, __height);
                        var sw = 0;
                        var sh = 0;
                        if (__scalex != 1 || __scaley != 1) {
                            sw = (1 / __scalex) * rect.width - rect.width;
                            sh = (1 / __scaley) * rect.height - rect.height;
                            rect.x -= sw * 0.5;
                            rect.y -= sh * 0.5;
                            rect.width += sw;
                            rect.height += sh;
                        }
                        //限制
                        rect.x = Math.min(Math.max(rect.x, 0), Game.currentScene.width - rect.width);
                        rect.y = Math.min(Math.max(rect.y, 0), Game.currentScene.height - rect.height);
                        if (__scalex != 1 || __scaley != 1) {
                            rect.x += sw * 0.5;
                            rect.y += sh * 0.5;
                        }
                        //刷新镜头
                        Game.currentScene.camera.sceneObject = null;
                        Game.currentScene.camera.viewPort.x = rect.x;
                        Game.currentScene.camera.viewPort.y = rect.y;
                        Game.currentScene.updateCamera();
                    }
                } else if (gcType == 1) {
                    var ui = GameUI.get(gc.uiID);
                    if (!ui || !ui.stage) return;
                    if (ui.scaleX != __scalex || ui.scaleY != __scaley) {
                        ui.scaleX = __scalex;
                        ui.scaleY = __scaley;
                        //计算一下
                        firstPoint = ui.globalToLocal(new Point(touches[0].stageX, touches[0].stageY));
                        secondPoint = ui.globalToLocal(new Point(touches[1].stageX, touches[1].stageY));
                        cameraPosx = (middlePoint.x - (secondPoint.x + firstPoint.x) * 0.5) * 0.5;
                        cameraPosy = (middlePoint.y - (secondPoint.y + firstPoint.y) * 0.5) * 0.5;
                        ui.x -= cameraPosx;
                        ui.y -= cameraPosy;
                    }
                }
            }
        }
        function onStageMouseUp(e: EventObject) {
            //
            stage.off(EventObject.MOUSE_MOVE, this, onStageMouseMove);
            stage.off(EventObject.MOUSE_UP, this, onStageMouseUp);
            stage.off(EventObject.MOUSE_OUT, this, onStageMouseUp);
        }
    }
}