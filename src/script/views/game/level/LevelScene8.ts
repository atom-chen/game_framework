import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第八关
 */
export default class LevelScene8 extends LevelBase {
    className_key = "LevelScene8";

    public box_game_1: Laya.Box;
    public box_player: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene8.json";
    }

    public onAddStage() {
        super.onAddStage();
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    /**
    * 当从父节点移除时候
    */
    public onRemoved() {
        super.onRemoved();
    }

    public initView() {
        super.initView();
    }

    private laoshu: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.laoshu && this.laoshu.removeSelf();

        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.laoshu = await this.createSkeleton(this.mapData.laoshu.url);
        this.laoshu.x = this.mapData.laoshu.x;
        this.laoshu.y = this.mapData.laoshu.y;
        this.laoshu.play("8-1ls", true);
        this.box_game.addChild(this.laoshu);

        this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
        //this.box_game.x = this.box_game_1.x = -1080;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                break
            case "smove2":
                if (this.box_game.x == 0) {
                    Laya.Tween.to(this.box_game, { x: -1080 }, 3460);
                    Laya.Tween.to(this.box_game_1, { x: -1080 }, 3460);
                }
                break
            case "sevent_8-1ls_1":
                break
            case "sevent_8-2ls_1":
                this.laoshu && this.laoshu.play("8-2ls", false);
                break
            case "smove3":
                if (this.box_game.x == -1080) {
                    Laya.Tween.to(this.box_game, { x: -2160 }, 3170);
                    Laya.Tween.to(this.box_game_1, { x: -2160 }, 3170);
                }
                break
            case "sevent_8-3ls_1":
                this.laoshu && this.laoshu.play("8-3ls", false);
                Laya.Tween.to(this.laoshu, { x: this.mapData.laoshu.toX }, 2000);
                break
            case "smove4":
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
    public stopGame() { }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            this.initView();
            super.startGame();
            this.initPlayer();
        } else {
            //this.destroyAni();
            super.restartGame();
            //初始化水的位置
            if (this.index == 0) {
            } else if (this.index == 1) {
                this.laoshu && this.laoshu.play("8-1ls", true);
            } else if (this.index == 2) {
                this.laoshu && (this.laoshu.x = this.mapData.laoshu.x);
                this.laoshu && this.laoshu.play("8-1ls", true);
            }
            this.onStart();
        }
    }
}