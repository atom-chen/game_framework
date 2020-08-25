import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第28关
 */
export default class LevelScene28 extends LevelBase {
    className_key = "LevelScene28";
    public spYue: Laya.Sprite;
    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene28.json";
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

    private skHouZi: Laya.Skeleton;
    private skHuo: Laya.Skeleton;
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.bmove2 = false;
        this.skHouZi = await this.createSkeleton(this.mapData.houzi.url);
        this.skHouZi.x = this.mapData.houzi.x;
        this.skHouZi.y = this.mapData.houzi.y;
        this.skHouZi.play("houzi1", true);
        this.box_enb.addChild(this.skHouZi);

        this.skHuo = await this.createSkeleton(this.mapData.huo.url);
        this.skHuo.x = this.mapData.huo.x;
        this.skHuo.y = this.mapData.huo.y;
        this.skHuo.play("huo2", true);
        this.skHuo.visible = false;
        this.box_enb.addChild(this.skHuo);

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = -100;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }
    private bmove2: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "pmove":
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[0].x }, this.mapData.player.move[0].t);
                break;
            case "sevent_huo2_1":
                this.skHuo.visible = true;
                break;
            case "smove":
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[1].x }, this.mapData.player.move[1].t);
                Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[0].x }, this.mapData.bg.move[0].t);
                break;
            case "sevent_houzi1_1":
                this.skHouZi.play("houzi1", true);
                break;
            case "sevent_houzi2_1":
                this.skHouZi.play("houzi2", false);
                break;
            case "sevent_houzi3_1":
                this.skHouZi.play("houzi3", false);
                break;
            case "smove1":
                Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[1].x }, this.mapData.bg.move[1].t);
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[2].x }, this.mapData.player.move[2].t);
                break;
            case "pmove1":
                if (!this.bmove2) {
                    this.bmove2 = true;
                    return;
                }
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[3].x }, this.mapData.player.move[3].t);
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
                this.skHuo.visible = false;
            } else if (this.index == 1) {

            } else if (this.index == 2) {

            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_player);
    }
}