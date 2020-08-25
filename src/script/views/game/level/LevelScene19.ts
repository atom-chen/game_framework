import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第19关
 */
export default class LevelScene19 extends LevelBase {
    className_key = "LevelScene19";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene19.json";
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

    private heipao: Laya.Skeleton;
    private ljuanfen: Laya.Skeleton;
    private pingguoshu: Laya.Skeleton;
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        //黑袍
        this.heipao = await this.createSkeleton(this.mapData.heipao19.url);
        this.heipao.x = this.mapData.heipao19.x;
        this.heipao.y = this.mapData.heipao19.y;
        this.heipao.play("heipao1", true);
        this.box_enb.addChild(this.heipao);
        //龙卷风
        this.ljuanfen = await this.createSkeleton(this.mapData.ljuanfen.url);
        this.ljuanfen.x = this.mapData.ljuanfen.x;
        this.ljuanfen.y = this.mapData.ljuanfen.y;
        this.ljuanfen.play("19-feng", false);
        this.ljuanfen.visible = false;
        this.box_player.addChild(this.ljuanfen);
        //苹果树
        this.pingguoshu = await this.createSkeleton(this.mapData.pingguoshu.url);
        this.pingguoshu.x = this.mapData.pingguoshu.x;
        this.pingguoshu.y = this.mapData.pingguoshu.y;
        this.pingguoshu.play("19-1x", true);
        this.pingguoshu.visible = true;
        this.box_enb.addChild(this.pingguoshu);

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
            case "pmove":
                Laya.Tween.to(this.box_player, { x: 400 }, 1670);
                break;
            case "smove":
                Laya.Tween.to(this.box_game, { x: -1080 }, 2920);
                Laya.Tween.to(this.box_player, { x: 0 }, 2920);
                break;
            case "sevent_19-feng_1":
                this.ljuanfen.visible = true;
                this.ljuanfen.zOrder = 1;
                this.ljuanfen.play("19-feng", false)
                break;
            case "smove2":
                this.ljuanfen.visible = false;
                this.pingguoshu.visible = true;
                Laya.Tween.to(this.box_game, { x: -2160 }, 2920);
                break;
            case "sevent_heipao2_1":
                this.heipao.play("heipao2", false);
                break;
            case "sevent_heipao3_1":
                this.heipao.play("heipao3", false);
                break;
            case "pmove1":
                Laya.Tween.to(this.box_player, { x: 1080 }, 3830);
                break;
            case "cs1":
                this.pingguoshu.visible = false;
                break;
            case "cs":
                this.pingguoshu.visible = false;
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
                this.ljuanfen.visible = false;
                this.pingguoshu.visible = true;
            }else if(this.index == 2){
                this.heipao.play("heipao1", true);
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