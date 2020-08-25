import { LevelBase } from "./LevelBase";
import { PopChooseScene } from "../PopChooseScene";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第5关
 */
export class LevelScene5 extends LevelBase {
    className_key = "LevelScene5";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene5.json";
    }

    public popChooseScene: PopChooseScene;

    public box_enb1: Laya.Box;
    public icon_bg: Laya.Image;

    public onAddStage() {
        super.onAddStage();
    }

    public initView() {
        super.initView();
        this.stopAni();
    }

    private box_game_1: Laya.Box;
    private box_game_2: Laya.Box;
    public gou: Laya.Skeleton;
    public heiping: Laya.Skeleton;
    public men: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.gou&&this.gou.removeSelf();
        this.heiping&&this.heiping.removeSelf();
        this.men&& this.men.removeSelf();
        
        //
        this.gou = await this.createSkeleton(this.mapData.gou.url);
        this.gou.x = this.mapData.gou.x;
        this.gou.y = this.mapData.gou.y;
        this.box_game.addChild(this.gou);
        //
        this.men = await this.createSkeleton(this.mapData.men.url);
        this.men.x = this.mapData.men.x;
        this.men.y = this.mapData.men.y;

        this.box_game.addChild(this.men);
        //
        this.heiping = await this.createSkeleton(this.mapData.heiping.url);
        this.heiping.x = this.mapData.heiping.x;
        this.heiping.scaleX = 1080 / 1052;
        this.heiping.scaleY = 718 / 708;
        this.heiping.y = this.mapData.heiping.y;
        this.box_game_1.addChild(this.heiping);
        //
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = this.box_game.x = this.box_game_1.x = this.box_game_2.x = 0;
        // this.box_game.x = this.box_game_1.x = this.box_game_2.x = -1080;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }

    private isGouMove: boolean = false;// 狗是否移动
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "sevent_5-g1_1":
                this.gou && this.gou.play("5-g1", true);
                break
            case "sevent_5-g3_1":
                this.gou && this.gou.play("5-g3", false);
                break
            case "sevnet_5-g4_1":
                this.gou && this.gou.play("5-g4", false);
                break
            case "sevent_5-heiping1_1":
                this.heiping && this.heiping.play("5-heiping1", false);
                break
            case "sevent_5-heiping3_1":
                this.heiping && this.heiping.play("5-heiping3", false);
                break
            case "sevent_5-men10_1":
                this.men && this.men.play("5-men10", false);
                break
            case "smove4":
                if (this.box_game.x == 0) {
                    Laya.Tween.to(this.box_game, { x: -1080 }, 3300);
                    Laya.Tween.to(this.box_game_1, { x: -1080 }, 3300);
                    Laya.Tween.to(this.box_game_2, { x: -1080 }, 3300);
                }
                break
            case "smove":
                if (this.box_game.x == -1080) {
                    Laya.Tween.to(this.box_game, { x: -2160 }, 4160);
                    Laya.Tween.to(this.box_game_1, { x: -2160 }, 4160);
                    Laya.Tween.to(this.box_game_2, { x: -2160 }, 4160);
                }
                break
            case "smove3":
                break
            case "sevent_5-g10_1":
                if (!this.isGouMove) {
                    this.isGouMove = true;
                    if (this.gou) {
                        this.gou.x = 900;
                        Laya.Tween.to(this.gou, { x: 1650 }, 1800);
                        this.gou.play("5-g10", true);
                    }
                }
                break
            case "sevent_5-men11_1":
                this.men && this.men.play("5-men11", false);
                break
            case "sevent_5-men13_1":
                this.men && this.men.play("5-men13", false);
                break
            case "sevent_5-men12_1":
                this.men && this.men.play("5-men12", false);
                break
            case "sevent_5-men14_1":
                this.men && this.men.play("5-men14", false);
                break
        }
    }

    public addEvent() { }

    public removeEvent() {
        if (this.ani_player) {
            this.ani_player.off(Laya.Event.LABEL, this, this.onPlayLabel);
        }
    }

    public removeSelf() {
        return super.removeSelf();
    }

    /**
     * 当从父节点移除时候
     */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
        this.stopAni();
    }

    /**
     * 游戏逻辑控制
     */
    public startGame() {
        super.startGame();
        this.initPlayer();
    }

    /**停止游戏 */
    public stopGame() { }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            super.initView();
            super.startGame();
            this.initPlayer();
        } else {
            super.restartGame();
            if (this.index == 0) {
                this.box_game.x = this.box_game_1.x = this.box_game_2.x = 0;
            } else if (this.index == 1) {
                this.box_game.x = this.box_game_1.x = this.box_game_2.x = -1080;
                this.heiping && this.heiping.play("5-heiping1", false);
            } else if (this.index == 2) {
                this.men && this.men.play("5-men12", false);
                this.box_game.x = this.box_game_1.x = this.box_game_2.x = -2160;
            }
            //场景移动
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
    }
}