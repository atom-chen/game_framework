import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第15关
 */
export default class LevelScene15 extends LevelBase {
    className_key = "LevelScene15";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene15.json";
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

    private skHeiPao: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        //黑袍
        this.skHeiPao = await this.createSkeleton(this.mapData.heipao.url);
        this.skHeiPao.x = this.mapData.heipao.x;
        this.skHeiPao.y = this.mapData.heipao.y;
        this.skHeiPao.play("piaofu", true);
        this.box_enb.addChild(this.skHeiPao);

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
        this.startWaterAni();
    }
    private nPlayerY: number = 0;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                this.ani_player && Laya.Tween.to(this.ani_player, { x: -440 }, 2000);
                this.skHeiPao && Laya.Tween.to(this.skHeiPao, { x: -200 }, 2000);
                break;
            case "sevent_beizha_1":
                this.skHeiPao && this.skHeiPao.play("beizha", false);
                break;
            case "sevent_jiezhu_1":
                this.skHeiPao && this.skHeiPao.play("jiezhu", false);
                break;
            case "sevent_zhezhulian_1":
                this.skHeiPao && this.skHeiPao.play("zhezhulian", false);
                break;
            case "sevent_xizou_1":
                this.skHeiPao && this.skHeiPao.play("xizou", false);
                break;
            case "dod":
                if (this.ani_player) {
                    this.nPlayerY = this.ani_player.y;
                }
                this.ani_player && Laya.Tween.to(this.ani_player, { y: 1920 }, 2300);

                break;
            case "tot":
                this.ani_player && Laya.Tween.to(this.ani_player, { x: 1080 }, 4000);
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
                this.skHeiPao.play("piaofu", true);
            } else if (this.index == 2) {
                this.ani_player.y = this.nPlayerY;
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
    }

    /**开启动画 */
    private startWaterAni() {
        this.moveSomeOne(this.box_game, 0, -3240, 10000);
    }

    private moveSomeOne(box: Laya.Sprite, starX: number, tox: number, time: number): void {
        Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, () => {
            box.x = starX;
            this.moveSomeOne(box, starX, tox, time);
        }));
    }

}