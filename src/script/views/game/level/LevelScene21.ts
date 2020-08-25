import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第21关
 */
export default class LevelScene21 extends LevelBase {
    className_key = "LevelScene21";

    private box_frame: Laya.Box;
    private box_oper: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene21.json";
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

    private image_frame: Laya.Image;

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
        this.image_frame.x = 585;
        this.box_frame.y = 2500;
        this.box_oper.y = 2500;
        this.box_player.y = 610;
        this.bSmove = false;
        this.nSpeedAni = 0;
        this.onStart();
        Laya.timer.frameLoop(1, this, this.onMove);
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }
    private  bSmove:boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "pmove":
                Laya.Tween.to(this.box_player, { x: 400 }, 1920);
                break;
            case "smove":
                Laya.Tween.to(this.box_game, { x: -1080 }, 1920);
                Laya.Tween.to(this.image_frame, { x: -505 }, 1920);
                break;
            case "smove1":
                if(!this.bSmove){
                    this.bSmove = true;
                    return;
                }
                this.nSpeedAni = 27;
                break;
            case "pmove1":
                Laya.Tween.to(this.box_player, { y: 1200 }, 1330);
                break;
            case "smove2":
                this.nSpeedAni = 14;
                break;
            case "smove3":
                this.nSpeedAni = 27;
                break;
            case "smove4":
                this.box_frame.y = 0;
                this.box_oper.y = 0;
                this.nSpeedAni = 0;
                break;
            case "smove5":
                Laya.Tween.to(this.box_game, { x: -2160 }, 3080);
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
                this.box_game.x = 0;
                this.image_frame.x = 585;
                this.box_player.y = 610;
                this.bSmove = false;
                this.nSpeedAni = 0;
            } else if (this.index == 1) {

            } else if (this.index == 2) {

            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.image_frame);
    }
    private nSpeedAni: number = 0;
    private box_1: Laya.Box;
    private box_2: Laya.Box;

    public onMove() {
        let nHight = this.box_1.height;
        this.box_1.y -= this.nSpeedAni;
        this.box_2.y -= this.nSpeedAni;
        if (this.box_1.y <= -nHight) {
            this.box_1.y = this.box_2.y + nHight;
        }
        if (this.box_2.y <= -nHight) {
            this.box_2.y = this.box_1.y + nHight;
        }
    }
}