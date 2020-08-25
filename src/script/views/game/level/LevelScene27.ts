import { LevelBase } from "./LevelBase";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第27关
 */
export default class LevelScene27 extends LevelBase {
    className_key = "LevelScene27";
    public box_yun1: Laya.Box;
    public box_yun2: Laya.Box;
    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene27.json";
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
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
        this.startYunAni();
    }
   
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
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

            } else if (this.index == 2) {

            }
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_player);
    }

    /**开启动画 */
    private startYunAni() {
        this.moveSomeOne(this.box_yun1, 0, -1080, 2500);
        this.moveSomeOne(this.box_yun2, 0, -1080, 5000);
    }

    private moveSomeOne(box: Laya.Sprite, starX: number, tox: number, time: number): void {
        Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, () => {
            box.x = starX;
            this.moveSomeOne(box, starX, tox, time);
        }));
    }
}