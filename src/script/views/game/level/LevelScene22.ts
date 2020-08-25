import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第22关
 */
export default class LevelScene22 extends LevelBase {
    className_key = "LevelScene22";

    private box_frame: Laya.Box;
    private box_down: Laya.Box;
    private sp_nainao: Laya.Sprite;


    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene22.json";
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

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();


        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 0;
        this.box_game.x = 0;
        this.box_frame.x = 0;
        this.box_down.x = 0;
        this.sp_nainao.visible = true;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                Laya.Tween.to(this.box_game, { x: -1080 }, 2880);
                Laya.Tween.to(this.box_frame, { x: -1080 }, 2880);
                Laya.Tween.to(this.box_down, { x: -1080 }, 2880);
                break;
            case "smove1":
                Laya.Tween.to(this.box_game, { x: -2160 }, 2880);
                Laya.Tween.to(this.box_frame, { x: -2160 }, 2880);
                Laya.Tween.to(this.box_down, { x: -2160 }, 2880);
                break;
            case "smove2":
                Laya.Tween.to(this.box_player, { x: 1080 }, 2880);
                break;
            case "xs1":
            case "xs2":
                this.sp_nainao.visible = false;
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
                this.sp_nainao.visible = true;
            } else if (this.index == 2) {

            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_frame);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_down);
        Laya.Tween.clearAll(this.box_player);
    }
}