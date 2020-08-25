import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第20关
 */
export default class LevelScene20 extends LevelBase {
    className_key = "LevelScene20";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene20.json";
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

    private kuang: Laya.Skeleton;
    private yezhu: Laya.Skeleton;
    private zhizhu: Laya.Skeleton;
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        //框
        this.kuang = await this.createSkeleton(this.mapData.kuang.url);
        this.kuang.x = this.mapData.kuang.x;
        this.kuang.y = this.mapData.kuang.y;
        this.kuang.play("20-k13", true);
        this.kuang.visible = true;
        this.box_enb.addChild(this.kuang);
        //野猪
        this.yezhu = await this.createSkeleton(this.mapData.yezhu.url);
        this.yezhu.x = this.mapData.yezhu.x;
        this.yezhu.y = this.mapData.yezhu.y;
        this.yezhu.visible = false;
        this.box_enb.addChild(this.yezhu);
        //蜘蛛
        this.zhizhu = await this.createSkeleton(this.mapData.zhizhu.url);
        this.zhizhu.x = this.mapData.zhizhu.x;
        this.zhizhu.y = this.mapData.zhizhu.y;
        this.zhizhu.visible = false;
        this.zhizhu.play("20-zz7", false);
        this.box_enb.addChild(this.zhizhu);

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = -300;
        this.box_game.x = 0;
        this.byz3 = false;
        this.bzz8 = false;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }
    public byz3: boolean = false;
    public bzz8: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                Laya.Tween.to(this.box_player, { x: 0 }, 2500);
                break;
            case "sevent_20-yz2_1":
                this.yezhu.visible = true;
                this.yezhu.play("20-yz2", false);
                break;
            case "sevent_20-yz3_1":
                if (!this.byz3) {
                    this.byz3 = true;
                    return;
                }
                this.yezhu.play("20-yz3", true);
                break;
            case "sevent_20-yz4_1":
                this.yezhu.play("20-yz4", false);
                break;
            case "sevent_20-yz5_1":
                this.yezhu.play("20-yz5", false);
                break;
            case "smove1":
                this.yezhu.visible = false;
                Laya.Tween.to(this.box_game, { x: -1080 }, 2500);
                break;
            case "sevent_20-zz7_1":
                this.zhizhu.visible = true;
                this.zhizhu.play("20-zz7", false);
                break;
            case "sevent_20-zz8_1":
                if (!this.bzz8) {
                    this.bzz8 = true;
                    return;
                }
                this.zhizhu.play("20-zz8", false);
                break;
            case "sevent_20-zz9_1":
                this.zhizhu.play("20-zz9", false);
                break;
            case "sevent_20-zz10_1":
                this.zhizhu.play("20-zz10", false);
                break;
            case "smove2":
                this.zhizhu.visible = false;
                Laya.Tween.to(this.box_game, { x: -2160 }, 2500);
                break;
            case "sevent_20-k13_1":
                this.kuang.play("20-k13", true);
                break;
            case "sevent_20-k15_1":
                this.kuang.play("20-k15", false);
                break;
            case "smove3":
                Laya.Tween.to(this.box_player, { x: 1080 }, 2500);
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
                this.box_player.x = -300;
                this.yezhu.visible = false;
                this.byz3 = false;
                this.yezhu.play("20-yz3", true);
            } else if (this.index == 1) {
                this.zhizhu.play("20-zz8", true);
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