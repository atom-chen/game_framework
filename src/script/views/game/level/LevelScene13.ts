import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第十二关
 */
export default class LevelScene13 extends LevelBase {
    className_key = "LevelScene13";


    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene13.json";
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

    private duwu: Laya.Skeleton;
    private box_duwu: Laya.Box;
    private heipao: Laya.Skeleton;
    private box_heipao: Laya.Box;

    private box_dowm: Laya.Box;

    public async initPlayer() {
        this.nEventZouLu = false;
        this.bSmove = false;
        this.bSmove2 = false;
        this.box_duwu.removeChildren();
        this.box_heipao.removeChildren();

        this.box_heipao.x = 1080;
        ViewChangeManager.getInstance().showBufferLoadingView();
        //
        this.duwu = await this.createSkeleton(this.mapData.duwu.url);
        this.duwu.x = this.mapData.duwu.x;
        this.duwu.y = this.mapData.duwu.y;
        this.duwu.play("daiji", true);
        this.box_duwu.addChild(this.duwu);
        //
        this.heipao = await this.createSkeleton(this.mapData.heipao.url);
        this.heipao.x = this.mapData.heipao.x;
        this.heipao.y = this.mapData.heipao.y;
        this.heipao.play("daiji", true);
        this.box_heipao.addChild(this.heipao);
        //this.heipao.visible = false;
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        // console.log(this.ani_player.templet.eventAniArr)
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = - 100;
        this.box_game.x = 0;

        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }
    private nEventZouLu: boolean = false;
    private bSmove: boolean = false;
    private bSmove2: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        console.log(evt.name);
        switch (evt.name) {
            case "tmove":
                Laya.Tween.to(this.box_player, { x: 0 }, 1920);
                break;
            case "sevent_xiaoshi_1":
                this.duwu.play("xiaoshi", false);
                break;
            case "smove":
                if (!this.bSmove) {
                    this.bSmove = true;
                    return;
                }
                Laya.Tween.to(this.box_game, { x: -1080 }, 4790);
                Laya.Tween.to(this.box_dowm, { x: -1080 }, 4790);
                break;
            case "sevent_zoulu_1":
                if (!this.nEventZouLu) {
                    this.nEventZouLu = true;
                    return;
                }
                Laya.Tween.to(this.box_heipao, { x: 600 }, 1710);
                this.heipao.play("zoulu", false);
                break;
            case "sevent_huida_1":
                this.heipao.play("huida", false);
                break;
            case "sevent_shuaidao_1":
                this.heipao.play("shuaidao", false);
                break;
            case "smove2":
                if (!this.bSmove2) {
                    this.bSmove2 = true;
                    return;
                }
                Laya.Tween.to(this.box_game, { x: -2160 }, 4960);
                Laya.Tween.to(this.box_heipao, { x: -1400 }, 4960);
                break;
            case "sevent_kaimen_1":
                this.box_heipao.zOrder = 1;
                this.heipao.play("kaimen", false);
                Laya.Tween.to(this.box_heipao, { x: 0 }, 3460);
                break;
            case "sevent_wenhao_1":
                this.box_heipao.zOrder = 1;
                this.heipao.play("wenhao", false);
                Laya.Tween.to(this.box_heipao, { x: 0 }, 1710);
                break;
            case "pop":
                Laya.Tween.to(this.heipao, { x: 1080 }, 1250);
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
                this.box_player.x = - 100;
            } else if (this.index == 1) {

            } else if (this.index == 2) {
                this.box_heipao.x = -1400;
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_dowm);
    }

}