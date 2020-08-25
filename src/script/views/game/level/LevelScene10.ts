import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第十关
 */
export default class LevelScene10 extends LevelBase {
    className_key = "LevelScene10";
    public box_game_1: Laya.Box;
    public box_player: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene10.json";
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
    private long: Laya.Skeleton;

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.heipao = await this.createSkeleton(this.mapData.heipao.url);
        this.heipao.x = this.mapData.heipao.x;
        this.heipao.y = this.mapData.heipao.y;
        this.heipao.stop();
        this.box_player.addChild(this.heipao);

        this.long = await this.createSkeleton(this.mapData.long.url);
        this.long.x = this.mapData.long.x;
        this.long.y = this.mapData.long.y;
        this.box_player.addChild(this.long);

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

    private isHeiPaodaiji: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "smove":
                if (this.box_game.x == 0) Laya.Tween.to(this.box_game, { x: -1080 }, 3080);
                break
            case "sevent_10-1zoulu_1":
                this.heipao && this.heipao.play("10-1zoulu", false);
                this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                break
            case "sevent_10-2daiji_1":
                if (!this.isHeiPaodaiji) {
                    this.isHeiPaodaiji = true;
                    this.heipao && this.heipao.play("10-2daiji", true);
                }
                break
            case "sevent_10-4shuiqiu_1":
                this.heipao && this.heipao.play("10-4shuiqiu", false);
                break
            case "sevent_10-3xiongmao":
                this.heipao && this.heipao.play("10-3xiongmao", false);
                break
            case "smove2":
                if (this.box_game.x == -1080) {
                    this.isHeiPaodaiji = false;
                    Laya.Tween.to(this.box_game, { x: -2160 }, 4000);
                    this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.x }, 800));
                }
                break
            case "sevent_10-5zoulu_1":
                this.heipao && this.heipao.play("10-5zoulu", false);
                this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                break
            case "sevent_10-6daiji_1":
                if (!this.isHeiPaodaiji) {
                    this.isHeiPaodaiji = true;
                    this.heipao && this.heipao.play("10-6daiji", false);
                }
                break
            case "sevent_10-7shengzi_1":
                this.heipao && this.heipao.play("10-7shengzi", false);
                break
            case "sevent_10-8chuizi_1":
                this.heipao && this.heipao.play("10-8chuizi", false);
                break
            case "smove3":
                if (this.box_game.x == -2160) {
                    this.isHeiPaodaiji = false;
                    Laya.Tween.to(this.box_game, { x: -3240 }, 3000);
                    this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.x }, 500));
                }
                break
            case "sevent_10-9zoulu_1":
                this.heipao && this.heipao.play("10-9zoulu", false);
                this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                break
            case "sevent_10-10daiji_1":
                if (!this.isHeiPaodaiji) {
                    this.isHeiPaodaiji = true;
                    this.heipao && this.heipao.play("10-10daiji", false);
                }
                break
            case "sevent_10-11xiaoxiongmao_1":
                this.heipao && this.heipao.play("10-11xiaoxiongmao", false);
                break
            case "enterLong":
                //龙入场
                Laya.Tween.to(this.long, { x: this.mapData.long.tx }, 1500);
                break
            case "sevent_1-2longpenhuo_1":
                this.long && this.long.play("1-2longpenhuo", false);
                break
            case "sevent_10-12huolong_1":
                this.heipao && this.heipao.play("10-12huolong", false);
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
            super.restartGame();
            if (this.index == 0) {
                this.isHeiPaodaiji = false;
                this.box_game.x = 0;
                this.heipao && this.heipao.stop();
                this.heipao && (this.heipao.x = this.mapData.heipao.x - 20);
            } else if (this.index == 1) {
                this.isHeiPaodaiji = false;
                this.heipao && this.heipao.play("10-6daiji", true);
            } else if (this.index == 2) {
                this.isHeiPaodaiji = false;
                this.heipao && this.heipao.play("10-10daiji", true);
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