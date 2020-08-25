import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第29关
 */
export default class LevelScene29 extends LevelBase {
    className_key = "LevelScene29";
    public spYue: Laya.Sprite;
    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene29.json";
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

    private skLang: Laya.Skeleton;
    private skYanjing: Laya.Skeleton;
    private skYanhua: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.spYue.visible = true;
        this.bmove1 = false;
        this.skLang = await this.createSkeleton(this.mapData.lang.url);
        this.skLang.x = this.mapData.lang.x;
        this.skLang.y = this.mapData.lang.y;
        this.skLang.play("lang1", true);
        this.skLang.visible = true;
        this.box_enb.addChild(this.skLang);

        this.skYanjing = await this.createSkeleton(this.mapData.yanjing.url);
        this.skYanjing.x = this.mapData.yanjing.x;
        this.skYanjing.y = this.mapData.yanjing.y;
        this.skYanjing.stop();
        this.skYanjing.visible = false;
        this.box_enb.addChild(this.skYanjing);

        this.skYanhua = await this.createSkeleton(this.mapData.yanhua.url);
        this.skYanhua.x = this.mapData.yanhua.x;
        this.skYanhua.y = this.mapData.yanhua.y;
        this.skYanhua.stop();
        this.skYanhua.visible = false;
        this.box_enb.addChild(this.skYanhua);

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 100;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }
    private bmove1: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "pmove":
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[0].x }, this.mapData.player.move[0].t, null, Laya.Handler.create(this, (args) => {
                    this.box_player.x = 110;
                }));
                break;
            case "smove":
                this.box_player.x = 845;
                Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[0].x }, this.mapData.bg.move[0].t);
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[1].x }, this.mapData.player.move[1].t, null, Laya.Handler.create(this, (args) => {
                    this.box_player.x = 0;
                }));
                break;
            case "sevent_lang2_1":
                this.skLang.play("lang2", false);
                break;
            case "sevent_lang3_1":
                this.skLang.play("lang3", false);
                this.skLang.player.once(Laya.Event.STOPPED, this, () => {
                    this.skLang.visible = false;
                });
                break;
            case "smove1":
                if (!this.bmove1) {
                    this.bmove1 = true;
                    return;
                }
                Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[1].x }, this.mapData.bg.move[1].t);
                break;
            case "sevent_yanjing_1":
                this.skYanjing.visible = true;
                this.skYanjing.play("yanjing", false);
                break;
            case "pmove1":
                Laya.Tween.to(this.box_player, { x: this.mapData.player.move[2].x }, this.mapData.player.move[2].t);
                break;
            case "sevent_yanhua_1":
                this.skYanhua.visible = true;
                this.skYanhua.play("yanhua", false);
                break;
            case "xs":
                this.spYue.visible = false;
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

            } else if (this.index == 1) {
                this.skLang.visible = true;
                this.skLang.play("lang1", true);
            } else if (this.index == 2) {
                this.skYanhua.visible = false;
                this.skYanjing.visible = false;
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