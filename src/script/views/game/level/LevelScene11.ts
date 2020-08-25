import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第十一关卡
 */
export default class LevelScene11 extends LevelBase {
    className_key = "LevelScene11";

    public box_game: Laya.Box;
    public box_game_1: Laya.Box;
    public box_player: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene11.json";
    }

    public onAddStage() {
        super.onAddStage();
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public initView() {
        super.initView();
        this.stopAni();
    }

    /**
    * 当从父节点移除时候
    */
    public onRemoved() {
        super.onRemoved();
        this.stopAni();
    }

    private heipao: Laya.Skeleton;
    private men: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.heipao && this.heipao.removeSelf();
        this.men &&  this.men.removeSelf();

        this.heipao = await this.createSkeleton(this.mapData.heipao.url);
        this.heipao.x = this.mapData.heipao.x;
        this.heipao.y = this.mapData.heipao.y;
        this.heipao.play("11-hp2", true);
        this.box_game.addChild(this.heipao);

        this.men = await this.createSkeleton(this.mapData.men.url);
        this.men.x = this.mapData.men.x;
        this.men.y = this.mapData.men.y;
        this.box_game.addChild(this.men);
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 0;
        this.box_game.x = this.box_game_1.x = 0;

        // this.box_game.x = this.box_game_1.x = -2160;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "sevent_11-hp2_1":
                this.heipao && this.heipao.play("11-hp2", false);
                break
            case "sevent_11-hp3_1":
                this.heipao && this.heipao.play("11-hp3", false);
                break
            case "sevent_11-hp4_1":
                this.heipao && this.heipao.play("11-hp4", false);
                break
            case "smove":
                if (this.box_game.x == 0) {
                    Laya.Tween.to(this.box_game, { x: -1045 }, 3750);
                    Laya.Tween.to(this.box_game_1, { x: -1045 }, 3750);
                }
                break
            case "smove1":
                if (this.box_game.x == -1045) {
                    Laya.Tween.to(this.box_game, { x: -2145 }, 5000);
                    Laya.Tween.to(this.box_game_1, { x: -2145 }, 5000);
                }
                break
            case "sevent_11-m12_1":
                this.men && this.men.play("11-m12", false);
                break
            case "sevent_11-m13_1":
                this.men && this.men.play("11-m13", false);
                break
            case "sevent_11-m14_1":
                this.men && this.men.play("11-m14", false);
                break
        }
    }

    /**游戏逻辑控制 */
    public startGame() {
        this.clearData();
        super.startGame();
        this.initPlayer();
    }

    /**停止游戏 */
    public stopGame() { }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            this.initView();
            super.startGame();
            this.initPlayer();
        } else {
            super.restartGame();
            if (this.index == 0) {
                this.heipao.play("11-hp2", true);
            } else if (this.index == 2) {
                this.men && this.men.play("11-m12", false);
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
    }


}