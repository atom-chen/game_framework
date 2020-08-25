import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第23关
 */
export default class LevelScene23 extends LevelBase {
    className_key = "LevelScene23";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene23.json";
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

    private skMiGong: Laya.Skeleton;
    private skShiQiang: Laya.Skeleton;
    private skYeZhu: Laya.Skeleton;
    private skGou: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.bMiGong1 = false;
        this.skShiQiang = await this.createSkeleton(this.mapData.shiqiang.url);
        this.skShiQiang.x = this.mapData.shiqiang.x;
        this.skShiQiang.y = this.mapData.shiqiang.y;
        this.skShiQiang.stop();
        this.box_enb.addChild(this.skShiQiang);

        this.skMiGong = await this.createSkeleton(this.mapData.migong.url);
        this.skMiGong.x = this.mapData.migong.x;
        this.skMiGong.y = this.mapData.migong.y;
        this.skMiGong.stop();
        
        this.box_enb.addChild(this.skMiGong);

        this.skYeZhu = await this.createSkeleton(this.mapData.yezhu.url);
        this.skYeZhu.x = this.mapData.yezhu.x;
        this.skYeZhu.y = this.mapData.yezhu.y;
        this.skYeZhu.stop();
        this.skYeZhu.visible = false;
        this.box_enb.addChild(this.skYeZhu);

        this.skGou = await this.createSkeleton(this.mapData.gou.url);
        this.skGou.x = this.mapData.gou.x;
        this.skGou.y = this.mapData.gou.y;
        this.skGou.stop();
        this.box_enb.addChild(this.skGou);

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = -200;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }
    private bMiGong1: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "pmove":
                Laya.Tween.to(this.box_player, { x: 0 }, 1670);
                break;
            case "sevent_shiqiang_1":
                this.skShiQiang.visible = true;
                this.skShiQiang.play("shiqiang", false);
                break;
            case "sevent_migong1_1":
                if (this.bMiGong1) {
                    return;
                }
                this.bMiGong1 = true;
                this.skMiGong.visible = true;
                this.skMiGong.play("migong1", false);
                break;
            case "sevent_migong2_1":
                this.skMiGong.play("migong2", false);
                break;
            case "pmove1":
                Laya.Tween.to(this.box_player, { x: 200 }, 830);
                break;
            case "pmove2":
                Laya.Tween.to(this.box_player, { x: 200 }, 830);
                break;
            case "sevent_migong3_1":
                this.skMiGong.play("migong3", false);
                break;
            case "smove":
                Laya.Tween.to(this.box_game, { x: -1580 }, 2080);
                Laya.Tween.to(this.box_player, { x: 0 }, 2080);
                break;
            case "sevent_yezhu1_1":
                this.skYeZhu.visible = true;
                this.skYeZhu.play("yezhu1", false);
                Laya.Tween.to(this.skYeZhu, { x: 1580 }, 1000);
                break;
            case "sevent_yezhu2_1":
                this.skYeZhu.play("yezhu2", false);
                break;
            case "sevent_yezhu3_1":
                this.skYeZhu.play("yezhu3", false);
                break;
            case "sevent_yezhu4_1":
                this.skYeZhu.play("yezhu4", false);
                break;
            case "sevent_gou1_1":
                this.skGou.play("gou1", true);
                //Laya.Tween.to(this.box_player, { x: 0 }, 1920);
                break;
            case "sevent_gou2_1":
                this.skGou.play("gou2", false);
                break;
            case "smove3":
                Laya.Tween.to(this.box_player, { x: 1080 }, 2580);
                break;
            case "smove1":
            case "smove2":
                Laya.Tween.to(this.box_game, { x: -2160 }, 1920);
                this.skYeZhu.visible = false;
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
                this.bMiGong1 = false;
                this.box_player.x = -200;
                this.skShiQiang.visible = false;
                this.skMiGong.visible = false;
            } else if (this.index == 1) {

            } else if (this.index == 2) {
                this.skGou.play("gou1", true);
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