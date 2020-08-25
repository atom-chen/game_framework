import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第16关
 */
export default class LevelScene16 extends LevelBase {
    className_key = "LevelScene16";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene16.json";
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

    private huaping: Laya.Skeleton;
    private men: Laya.Skeleton;
    private daochaoren: Laya.Skeleton;

    private box_frame: Laya.Box;


    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        //门
        this.men = await this.createSkeleton(this.mapData.men.url);
        this.men.x = this.mapData.men.x;
        this.men.y = this.mapData.men.y;
        this.men.play("men2", false);
        this.box_enb.addChild(this.men);
        //花瓶
        this.huaping = await this.createSkeleton(this.mapData.huaping.url);
        this.huaping.x = this.mapData.huaping.x;
        this.huaping.y = this.mapData.huaping.y;
        this.huaping.play("huaping1", false);
        this.box_enb.addChild(this.huaping);

        //稻草人
        this.daochaoren = await this.createSkeleton(this.mapData.daochaoren.url);
        this.daochaoren.x = this.mapData.daochaoren.x;
        this.daochaoren.y = this.mapData.daochaoren.y;
        this.daochaoren.play("daocaoren1", false);
        this.box_enb.addChild(this.daochaoren);

        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 0;
        this.box_game.x = 0;
        this.box_frame.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
        

    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "tmove":
                Laya.Tween.to(this.box_player, { x: 540 }, 1460);
                break;
            case "sevent_men1_1":
                this.men.play("men1", false);
                break;
            case "smove":
                Laya.Tween.to(this.box_game, { x: -1080 }, 3000);
                Laya.Tween.to(this.box_frame, { x: -1080 }, 3000);
                Laya.Tween.to(this.box_player, { x: 50 }, 3000);
                break;
            case "sevent_huaping2_1":
                this.huaping.play("huaping2", false);
                break;
            case "sevent_huaping3_1":
                this.huaping.play("huaping3", false);
                Laya.Tween.to(this.huaping, { y: 500 }, 2000);
                break;
            case "smove2":
                Laya.Tween.to(this.box_game, { x: -2160 }, 3000);
                Laya.Tween.to(this.box_frame, { x: -2160 }, 3000);
                break;
            case "sevent_daocaoren2_1":
                this.daochaoren.play("daocaoren2", false);
                break;
            case "tmove2":
                Laya.Tween.to(this.box_player, { x: 1080 }, 2840);
                break;
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
                this.box_player.x = 0;
            } else if (this.index == 1) {
                this.huaping.play("huaping1", false);
            } else if (this.index == 2) {
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