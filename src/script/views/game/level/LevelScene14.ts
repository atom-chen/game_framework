import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第十二关
 */
export default class LevelScene14 extends LevelBase {
    className_key = "LevelScene14";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene14.json";
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

    private gou: Laya.Skeleton;
    private men: Laya.Skeleton;


    private image_fj: Laya.Image;
    private box_gou: Laya.Box;
    private box_dowm: Laya.Box;
    private box_frame: Laya.Box;



    public async initPlayer() {
        this.box_gou.removeChildren();
        
        ViewChangeManager.getInstance().showBufferLoadingView();
        //

        //门
        this.men = await this.createSkeleton(this.mapData.men.url);
        this.men.x = this.mapData.men.x;
        this.men.y = this.mapData.men.y;
        this.men.play("men2", false);
        this.box_enb.addChild(this.men);
        //狗
        this.gou = await this.createSkeleton(this.mapData.gou.url);
        this.gou.x = this.mapData.gou.x;
        this.gou.y = this.mapData.gou.y;
        this.gou.play("gou1", true);
        this.box_gou.addChild(this.gou);

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
        this.box_dowm.x  = 0;
        this.image_fj.visible = true;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "tmove":
                Laya.Tween.to(this.box_player, { x: 540 }, 2750);

                break
            case "sevent_men1_1":
                this.men && this.men.play("men1", false);
                break;
            case "smove2":
                Laya.Tween.to(this.box_game, { x: -1080 }, 4170);
                Laya.Tween.to(this.box_dowm, { x: -1080 }, 4170);
                Laya.Tween.to(this.box_frame, { x: -1080 }, 4170);
                Laya.Tween.to(this.box_player, { x: 0 }, 4170);
                break;
            case "sevent_gou2_1":
                this.gou.play("gou2", false);
                break;
            case "sevent_gou3_1":
                this.gou.play("gou3", false);
                break;
            case "smove3":
                Laya.Tween.to(this.box_game, { x: -2160 }, 4170);
                Laya.Tween.to(this.box_dowm, { x: -2160 }, 4170);
                break;
            case "sevent_lol_1":
                this.image_fj.visible = false;
                break;
            case "sevent_lol2_1":
                this.image_fj.visible = false;
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
                this.box_player.x = -100;
            } else if (this.index == 1) {
                this.gou.play("gou1", true);
            } else if (this.index == 2) {
                this.image_fj.visible = true;
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_dowm);
    }

}