import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第22关
 */
export default class LevelScene24 extends LevelBase {
    className_key = "LevelScene24";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene24.json";
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
        man: null as Laya.Skeleton,
        man1: null as Laya.Skeleton,
        man2: null as Laya.Skeleton
    }

    public async initPlayerStatus(){
        let k: string = "man";
        let obj = this.mapData[k]
        this.skAnim[k] = await this.createSkeleton(obj.url,true)
        let skItem = this.skAnim[k];
        this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));
        skItem.x = obj.x;
        skItem.y = obj.y;
        skItem.play("24-yr03", true)   
    }
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
            this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));

        }

        for (let k in this.skAnim){
            let skItem = this.skAnim[k];
            skItem.play("sevent_24-yr03_1", true)
            if (k == "man2"){
                skItem.visible = false;
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
        let cData, pData;
        switch (evt.name) {
            case "pmove":
                pData = this.mapData.player.move[0];
                Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                break;
            case "smove":
                cData = this.mapData.bg.move[0];
                pData = this.mapData.player.move[1];
                Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                break;
            case "smove1":
                cData = this.mapData.bg.move[1];
                pData = this.mapData.player.move[2];
                Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                break;
            case "pmove1":
                pData = this.mapData.player.move[3];
                Laya.Tween.to(this.skAnim.man2, {x: this.skAnim.man2.x + 1600}, 2600)
                Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                break;
            case "sevent_24-yr03_1":
                this.skAnim.man.play("24-yr03", true)
                break;
            case "sevent_24-yr04_1":
                this.skAnim.man.play("24-yr04", false)
                break;
            case "sevent_24-yr05_1":
                this.skAnim.man.play("24-yr05", false)
                break;
            case "sevent_24-yr06_1":
                this.skAnim.man1.play("24-yr06", true)
                break;
            case "sevent_24-yr07_1":
                this.skAnim.man1.play("24-yr07", false)
                break;
            case "sevent_24-yr08_1":
                this.skAnim.man1.play("24-yr08", true)
                break;
            case "sevent_24-yr09_1":
                this.skAnim.man1.play("24-yr09", false)
                break;
            case "sevent_24-yr10_1":
                this.skAnim.man1.play("24-yr10", false)
                break;
            case "sevent_24-yr11_1":
                this.skAnim.man1.play("24-yr11", false)
                break;
            case "sevent_24-yr12_1":
                this.skAnim.man1.play("24-yr12", false)
                break;
            case "sevent_24-yr13_1":
                this.skAnim.man1.play("24-yr13", false)
                break;
            case "sevent_24-yr14_1":
                this.skAnim.man2.visible = true;
                this.skAnim.man2.play("24-yr14", false)
                break;
            case "sevent_24-yr15_1":
                this.skAnim.man2.x -= 400;
                this.skAnim.man2.visible = true;
                this.skAnim.man2.play("24-yr15", true)
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
                this.box_player.x = 0;
            } else if (this.index == 1) {
                this.skAnim.man1.play("24-yr08", true)
            } else if (this.index == 2) {
                this.skAnim.man2.visible = false;
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