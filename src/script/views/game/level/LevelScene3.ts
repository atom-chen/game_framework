import { LevelBase } from "./LevelBase";
import { PopChooseScene } from "../PopChooseScene";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第3关
 */
export class LevelScene3 extends LevelBase {
    className_key = "LevelScene3";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene2.json";
    }

    public popChooseScene: PopChooseScene;


    public box_player: Laya.Box;
    public icon_bg: Laya.Image;
    public onAddStage() {
        super.onAddStage();
    }

    /**游戏逻辑控制 */
    public startGame() {
        super.startGame();
        this.initPlayer();
    }

    /**停止游戏 */
    public stopGame() {}

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            super.initView();
            super.startGame();
            this.initPlayer();
        } else {
            //this.destroyAni();
            super.restartGame();
            // this.initPlayer();
            this.ani_player.x = this.mapData.player.ex;
            Laya.Tween.to(this.ani_player, { x: this.mapData.player.lx }, 1670);
            this.box_player.x = 0; this.isYao = false;
            this.box_game.x = 0;
            //场景移动
            this.onStart();
        }
    }

    /**宝宝动画 */
    private babyAni: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.ex;
        this.ani_player.y = this.mapData.player.y;
        //
        this.babyAni = await this.createSkeleton(this.mapData.bg.ani.url);
        this.babyAni.x = this.mapData.bg.ani.x;
        this.babyAni.y = this.mapData.bg.ani.y;
        this.box_player.addChild(this.babyAni);
        //
        Laya.Tween.to(this.ani_player, { x: this.mapData.player.lx }, 1670);
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    private isYao: boolean = false;//由于摇动驱动过于频繁效果不好
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        if (evt.name == "sevent_3-1_1") {
            this.babyAni && this.babyAni.play('3-1', false);
        } else if ("sevent_3-2_1" == evt.name) {
            //摇动灯
            if (!this.isYao) {
                this.isYao = true;
                this.babyAni && this.babyAni.play('3-2', true);
            }
        } else if ("sevent_3-4_1" == evt.name) {
            this.babyAni && this.babyAni.play('3-4', false);
        } else if ("sevent_3-5_1" == evt.name) {
            this.babyAni && this.babyAni.play('3-5', false);
        }
    }


    public addEvent() {

    }

    public removeEvent() {

    }

    public removeSelf() {
        // GameManager.instance.showTopBar(ShowType.showAll)
        return super.removeSelf();
    }
    /**
    * 当从父节点移除时候
    */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
    }
}