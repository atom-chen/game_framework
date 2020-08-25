import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第九关
 */
export default class LevelScene9 extends LevelBase {
    className_key = "LevelScene9";

    public box_game: Laya.Box;
    public box_player: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene9.json";
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

    private penquan: Laya.Skeleton;
    private huoci: Laya.Skeleton;
    private heipao: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.penquan && this.penquan.removeSelf();
        this.huoci   && this.huoci.removeSelf();
        this.heipao  && this.heipao.removeSelf();

        this.huoci = await this.createSkeleton(this.mapData.huoci.url);
        this.huoci.x = this.mapData.huoci.x;
        this.huoci.y = this.mapData.huoci.y;
        this.huoci.play("9-hc1", true);
        this.box_game.addChild(this.huoci);

        this.penquan = await this.createSkeleton(this.mapData.penquan.url);
        this.penquan.x = this.mapData.penquan.x;
        this.penquan.y = this.mapData.penquan.y;
        this.penquan.play("9-pq8", true);
        this.box_game.addChild(this.penquan);

        this.heipao = await this.createSkeleton(this.mapData.heipao.url);
        this.heipao.x = this.mapData.heipao.x;
        this.heipao.y = this.mapData.heipao.y;
        this.heipao.play("9-hp13", true);
        this.box_game.addChildAt(this.heipao, 5);

        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 0;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                if (this.box_game.x == 0) Laya.Tween.to(this.box_game, { x: -1080 }, 3460);
                break
            case "sevent_9-hc1_1":
                this.huoci && this.huoci.play("9-hc1", false);
                break
            case "sevent_9-hc4_1":
                this.huoci && this.huoci.play("9-hc4", false);
                break
            case "sevent_9-hc5_1":
                this.huoci && this.huoci.play("9-hc5", false);
                break
            case "smove1":
                if (this.box_game.x == -1080) Laya.Tween.to(this.box_game, { x: -2160 }, 3460);
                break
            case "sevent_9-pq8_1":
                // this.penquan && this.penquan.play("9-pq8", false);
                break
            case "sevent_9-pq10_1":
                this.penquan && this.penquan.play("9-pq10", false);
                break
            case "smove3":
                if (this.box_game.x == -2160) Laya.Tween.to(this.box_game, { x: -3240 }, 3460);
                break
            case "sevent_9-hp13_1":
                // this.heipao && this.heipao.play("9-hp13", false);
                break
            case "sevent_9-hp14_1":
                this.heipao && this.heipao.play("9-hp14", false);
                break
            case "sevent_9-hp15_1":
                this.heipao && this.heipao.play("9-hp15", false);
                break
            case "smove4":
                if (this.box_game.x == -3240) Laya.Tween.to(this.box_game, { x: -3900 }, 2580);
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
    public stopGame() {

    }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            this.initView();
            super.startGame();
            this.initPlayer();
        } else {
            super.restartGame();
            if (this.index == 0) {
                this.box_game.x = 0;
                this.huoci && this.huoci.play("9-hc1", true);
            } else if (this.index == 1) {
                this.penquan && this.penquan.play("9-pq8", true);
            } else if (this.index == 2) {
                this.heipao && this.heipao.play("9-hp13", true);
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