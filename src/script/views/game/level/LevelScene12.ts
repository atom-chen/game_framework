import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第十二关
 */
export default class LevelScene12 extends LevelBase {
    className_key = "LevelScene12";
    public box_player: Laya.Box;
    public box_game_1: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene12.json";
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

    private huo: Laya.Skeleton;
    private men: Laya.Skeleton;
    private bianfu: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.huo && this.huo.removeSelf();
        this.men && this.men.removeSelf();
        this.bianfu && this.bianfu.removeSelf();
    
        //
        this.huo = await this.createSkeleton(this.mapData.huo.url);
        this.huo.x = this.mapData.huo.x;
        this.huo.y = this.mapData.huo.y;
        this.huo.stop();
        this.box_game.addChild(this.huo);
        //
        this.men = await this.createSkeleton(this.mapData.men.url);
        this.men.x = this.mapData.men.x;
        this.men.y = this.mapData.men.y;
        this.men.play("men2", false);
        this.box_game.addChild(this.men);
        //
        this.bianfu = await this.createSkeleton(this.mapData.bianfu.url);
        this.bianfu.x = this.mapData.bianfu.x;
        this.bianfu.y = this.mapData.bianfu.y;
        this.box_game.addChild(this.bianfu);
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
        // this.box_game.x = this.box_game_1.x = -2160;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                if (this.box_game.x == 0) {
                    Laya.Tween.to(this.box_game, { x: -1080 }, 4920);
                    Laya.Tween.to(this.box_game_1, { x: -1080 }, 4920);
                }
                break
            case "smove1":
                if (this.box_game.x == -1080) {
                    Laya.Tween.to(this.box_game, { x: -2160 }, 4960);
                    Laya.Tween.to(this.box_game_1, { x: -2160 }, 4960);
                }
                break
            case "sevent_men2_1":
                this.men && this.men.play("men1", false);
                //开门蝙蝠飞进来
                if (this.bianfu) {
                    Laya.Tween.to(this.bianfu, { x: this.mapData.bianfu.tx }, 1500);
                    this.bianfu.play("bianfu1", true);
                }
                break
            case "sevent_men1_1":
                this.men && this.men.play("men1", false);
                break
            case "sevent_bianfu2_1":
                this.bianfu && this.bianfu.play("bianfu2", false);
                break
            case "sevent_bianfu1_1":
                this.bianfu && this.bianfu.play("bianfu1", false);
                break
            case "sevent_huo_1":
                this.huo && this.huo.play("huo", false);
                break
            case "sevent_bianfu3_1":
                this.bianfu && this.bianfu.play("bianfu3", false);
                break
            case "smove2":
                Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx }, 4960);
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
            } else if (this.index == 1) {
            } else if (this.index == 2) {
                this.bianfu && (this.bianfu.x = this.mapData.bianfu.x);
                this.bianfu && this.bianfu.play("bianfu2", true);
                this.men && this.men.play("men2", false);
                this.huo && this.huo.play("huo", false, true, 0, 0.04);
                //开门放蝙蝠
                this.men && this.men.play("men1", false);
                //开门蝙蝠飞进来
                if (this.bianfu) {
                    Laya.Tween.to(this.bianfu, { x: this.mapData.bianfu.tx }, 1500);
                    this.bianfu.play("bianfu1", true);
                }
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_game_1);
    }

}