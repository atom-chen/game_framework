import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第22关
 */
export default class LevelScene26 extends LevelBase {
    className_key = "LevelScene26";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene26.json";
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
        snake: null as Laya.Skeleton,
        dragon: null as Laya.Skeleton,
        savage: null as Laya.Skeleton,
        savage1: null as Laya.Skeleton,
    }
    box_long: Laya.Box
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        for (let k in this.skAnim){
            let obj = this.mapData[k]
            this.skAnim[k] = await this.createSkeleton(obj.url)
            let skItem = this.skAnim[k];
            
            skItem.x = obj.x;
            skItem.y = obj.y;
            if (k == "dragon"){
                this.box_long.addChild(skItem)
                skItem.visible = false;
            } else {
                this.box_enb.addChild(skItem)
            }
        }
        this.skAnim.snake.visible = true;

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

    public playAni() {
        super.playAni.apply(this,arguments);
        let animName = arguments[0];
        if (animName == "26-10" ||animName == "26-9") {
            this.skAnim.savage.visible = false;
        } else if (animName == "26-11"){
            this.skAnim.savage.visible = true;
            this.skAnim.savage.play("26-10s", true)
        } else if (animName ==  "26-15" ||animName ==  "26-16"){
            this.skAnim.savage1.visible = false;
        }
    }

    localEvent: string[] = [];
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        console.log("event Name -->>>", evt.name)
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
            case "sevent_26-1x_1":
                this.skAnim.snake.play("26-1x", true);
                break;
            case "sevent_26-3x_1":
                this.skAnim.snake.play("26-3x", false);
                break;
            case "sevent_26-2x_1":
                this.skAnim.snake.play("26-2x", false);
                this.skAnim.snake.once(Laya.Event.STOPPED, this, ()=>{
                    this.skAnim.snake.visible = false;
                });
                break;
            case "sevent_26-01s_1":
                this.skAnim.savage.play("26-01s", true);
                break;
            case "sevent_1-1longdaiji_1":
                this.skAnim.dragon.visible = true;
                Laya.Tween.to(this.skAnim.dragon, {x: 2870}, 500);
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
                this.skAnim.savage.visible = true;
            } else if (this.index == 2) {
                this.skAnim.savage1.visible = true;
            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        this.box_long.removeChildren();
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_player);
    }
}