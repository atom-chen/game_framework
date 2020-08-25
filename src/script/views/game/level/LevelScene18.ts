import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第18关
 */
export default class LevelScene18 extends LevelBase {
    className_key = "LevelScene18";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene18.json";
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

    private mifeng: Laya.Skeleton;
    private xiongmao: Laya.Skeleton;
    private box_down:Laya.Box;
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        //蜜蜂
        this.mifeng = await this.createSkeleton(this.mapData.mifeng.url);
        this.mifeng.x = this.mapData.mifeng.x;
        this.mifeng.y = this.mapData.mifeng.y;
        this.mifeng.play("18-mf8", true);
        this.box_enb.addChild(this.mifeng);
        //熊猫
        this.xiongmao = await this.createSkeleton(this.mapData.xiongmao.url);
        this.xiongmao.x = this.mapData.xiongmao.x;
        this.xiongmao.y = this.mapData.xiongmao.y;
        this.xiongmao.play("18-xm13", true);
        this.box_enb.addChild(this.xiongmao);
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = 0;
        this.box_game.x = 0;
        this.box_down.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();


    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "pmove":
                Laya.Tween.to(this.box_player, { x: 150 }, 1670);
                break;
            case "pmove1":
                Laya.Tween.to(this.box_player, { x: 600 }, 1580);
                break;
            case "smove":
                Laya.Tween.to(this.box_player, { x: 0 }, 2500);
                Laya.Tween.to(this.box_game, { x: -1080 }, 2500);
                Laya.Tween.to(this.box_down,{x:-1080}, 2500);
                break;
            case "sevent_18-mf8_1":
                this.mifeng.play("18-mf8", true);
                break;
            case "sevent_18-mf9_1":
                this.mifeng.play("18-mf9", false);
                break;
            case "sevent_18-mf10_1":
                this.mifeng.play("18-mf10", false);
                break;
            // case "xiongmao9":
            //     break;
            case "sevent_18-xm13_1":
                this.mifeng.play("18-xm13", false);
                break;
            case "pmove2":
                Laya.Tween.to(this.box_player, { x: 1080 }, 3380);
                break;
            case "smove1":
                Laya.Tween.to(this.box_game, { x: -2160 }, 3300);
                Laya.Tween.to(this.box_down, {x:-2160}, 3300);
                break;
            case "pop1":
            case "pop2":
                this.xiongmao.visible = false;
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
            }else if(this.index == 1){
                this.mifeng.play("18-mf8", true);
            }
            else if(this.index == 2){
                this.xiongmao.visible = true;
                this.xiongmao.play("18-xm13", true);
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_down);
    }
}