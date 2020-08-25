import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第二关
 */
export class LevelScene2 extends LevelBase {
    className_key = "LevelScene2";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene2.json";
    }
    public box_player: Laya.Box;

    public onAddStage() {
        super.onAddStage();
    }

    /**游戏逻辑控制 */
    public startGame() {
        super.startGame();
        this.initPlayer();
    }

    /**停止游戏 */
    public stopGame() {

    }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            super.initView();
            super.startGame();
            this.initPlayer();
        } else {
            super.restartGame();
            this.box_player.x = ((this.index) * 1080);
            this.box_game.x = ((this.index) * (-1080));
            this.onStart();
        }
    }

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    public addEvent() {

    }

    public removeEvent() {

    }

    public removeSelf() {

        return super.removeSelf();
    }
    /**
    * 当从父节点移除时候
    */
    public onRemoved() {
        super.onRemoved();
        super.clearData();
        this.removeEvent();
        console.log("level 2 on Removed!")
    }
}