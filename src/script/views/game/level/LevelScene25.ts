import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第22关
 */
export default class LevelScene25 extends LevelBase {
    className_key = "LevelScene25";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene25.json";
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
        power: null as Laya.Skeleton,
        snake: null as Laya.Skeleton,
        savage: null as Laya.Skeleton,
        savage1: null as Laya.Skeleton
    }

    box_power: Laya.Box
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        for (let k in this.skAnim){
            let obj = this.mapData[k]
            if (!this.skAnim[k] || (this.skAnim[k] && this.skAnim[k].destroyed)){
                this.skAnim[k] = await this.createSkeleton(obj.url)
            }
            let skItem = this.skAnim[k];
            skItem.x = obj.x;
            skItem.y = obj.y;
            if (k == "savage"){
                skItem.visible = true;
                skItem.play("25-yr01x", true);
            } else if (k == "power" || k == "snake"){
                skItem.visible = false;   
            }
       
            if (k=="power"){
                this.box_power.getChildIndex(skItem) == -1 && (this.box_power.addChild(skItem));
            } else {
                this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));
            }
        }

        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
    
        this.box_player.x = 0;
        this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }
    localEvent: string[] = [];
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        /**检测重复事件 */
        if (this.localEvent.indexOf(evt.name) != -1) return;
        this.localEvent.push(evt.name);
        let cPos, pPos;
        switch (evt.name) {
            case "pmove":
                pPos = this.mapData.player.move[0];
                Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                break;
            case "smove":
                cPos = this.mapData.bg.move[0];
                pPos = this.mapData.player.move[1];
                Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                break;
            case "smove1":
                cPos = this.mapData.bg.move[1];
                pPos = this.mapData.player.move[2];
                Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                break;
            case "sevent_25-yr01x_1":
                this.skAnim.savage.play("25-yr01x", true);
                break;
            case "pop":
                this.skAnim.savage.visible = false;
                break;
            case "sevent_25-yr01_1":
                this.skAnim.savage.visible = true;
                this.skAnim.savage1.play("25-yr01", true);
                break;
            case "sevent_25-yr02_1":
                this.skAnim.savage1.play("25-yr02", false);
                break;
            case "sevent_25-yr03_1":
                this.skAnim.savage1.play("25-yr03", false);
                break;
            case "sevent_25-yr04_1":
                this.skAnim.savage1.play("25-yr04", false);
                break;
            case "sevent_25-lsj01_1":
                this.skAnim.power.visible = true;
                this.skAnim.power.play("25-lsj01", false);
                break;
            case "sevent_25-she_1":
                this.skAnim.snake.visible = true;
                this.skAnim.snake.x = this.mapData.snake.x;
                Laya.Tween.to(this.skAnim.snake, {x: this.mapData.snake.mx}, this.mapData.snake.mt)
                this.skAnim.snake.play("25-she", true);
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
        this.localEvent = [];
        if (bReStartAll) {
            this.initView();
            super.startGame();
            this.initPlayer();
        } else {
            super.restartGame();
            if (this.index == 0) {
                this.skAnim.savage.visible = true;
                this.box_player.x = 0;
            } else if (this.index == 1) {
                this.skAnim.savage1.play("25-yr01", true);
            } else if (this.index == 2) {
                this.skAnim.snake.visible = false;
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        this.box_power.removeChildren();
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_player);
    }
}