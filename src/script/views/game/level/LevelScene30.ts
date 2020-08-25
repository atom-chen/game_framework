import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第29关
 */
export default class LevelScene30 extends LevelBase {
    className_key = "LevelScene30";
 
    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene30.json";
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

    skAnim = {
        monkey: null as Laya.Skeleton
    }

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        
        for (let k in this.skAnim){
            let obj = this.mapData[k];
            let skItem = this.skAnim.monkey = await this.createSkeleton(obj.url);
            skItem.x = obj.x;
            skItem.y = obj.y;
            this.box_enb.addChild(skItem);
        }

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        
        this.box_player.x = -200;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);

        let cData, pData;
        switch (evt.name) {
            case "pmove":
                pData = this.mapData.player.move[0];
                Laya.Tween.to(this.box_player, {x: pData.x}, pData.t)
                break;
            case "smove":
                pData = this.mapData.player.move[1];
                Laya.Tween.to(this.box_player, {x: pData.x}, pData.t)
                cData = this.mapData.bg.move[0];
                Laya.Tween.to(this.box_game, {x: cData.x}, cData.t)
                break;
            case "smove1":
                pData = this.mapData.player.move[2];
                Laya.Tween.to(this.box_player, {x: pData.x}, pData.t)
                cData = this.mapData.bg.move[1];
                Laya.Tween.to(this.box_game, {x: cData.x}, cData.t)
                break;
            case "pmove1":
            case "pmove2":
                pData = this.mapData.player.move[3];
                Laya.Tween.to(this.box_player, {x: pData.x}, pData.t)
                break;
            case "sevent_houzi1_1":
                this.skAnim.monkey.play("houzi1", true);
                break;
            case "sevent_houzi2_1":
                Laya.Tween.to(this.skAnim.monkey, {x: this.skAnim.monkey.x + 900}, 2400)
                this.skAnim.monkey.play("houzi2", false);
                break;
            case "sevent_houzi3_1":
                this.skAnim.monkey.play("houzi3", false);
                break;
            case "sevent_houzi4_1":
                this.skAnim.monkey.play("houzi4", false);
                break;
            case "sevent_houzi5_1":
                Laya.Tween.to(this.skAnim.monkey, {x: this.skAnim.monkey.x + 900}, 2400)
                this.skAnim.monkey.play("houzi5", false);
                break;
            case "sevent_houzi6_1":
                this.skAnim.monkey.play("houzi6", false);
                break;
            case "sevent_houzi7_1":
                this.skAnim.monkey.play("houzi7", false);
                break;
            case "sevent_houzi8_1":
                this.skAnim.monkey.play("houzi8", false);
                break;
            case "sevent_houzi9_1":
                this.skAnim.monkey.play("houzi9", false);
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
                this.box_player.x = -200;
            } else if (this.index == 1) {
                
            } else if (this.index == 2) {
                this.skAnim.monkey.play("houzi6", false)
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_player);
    }
}