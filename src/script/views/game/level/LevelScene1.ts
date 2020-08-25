import { LevelBase } from "./LevelBase";
import GameStateManager from "../../../games/GameStateManager";
import { EnterGameType } from "../../../games/CommonDefine";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第一关
 */
export class LevelScene1 extends LevelBase {
    className_key = "LevelScene1";

    constructor(data_) {
        super(data_);
        this.skin = 'game/level_ks/KsLevelScene1.json';// + this.mapData.skin;
    }

    public box_waterup: Laya.Box;
    public boxDowmTotal: Laya.Box;

    public onAddStage() {
        super.onAddStage();
        this.stopAni();
    }

    /**游戏逻辑控制 */
    public startGame() {
        super.startGame();
        this.initPlayer();
    }

    /**停止游戏 */
    public stopGame() { }

    /**重新开始游戏 */
    public restartGame(bReStartAll: boolean = true) {
        if (bReStartAll) {
            super.initView();
            super.startGame();
            this.initPlayer();
            console.log("restart level1!", bReStartAll);
        } else {
            super.restartGame();
            this.ani_long && this.ani_long.play('1-1longdaiji', true);
            this.box_player.x = (this.index) * 1080;
            this.box_game.x = (this.index) * 1080;
            this.boxDowmTotal.x = (this.index) * 1080;
            this.box_enb.x = 1080;
            this.box_player.zOrder = 0;
            let time = 3750;
            Laya.Tween.to(this.boxDowmTotal, { x: -1080 }, time);
            Laya.Tween.to(this.box_game, { x: -1080 }, time);
            Laya.Tween.to(this.box_enb, { x: 0 }, time);
            this.ani_player.x = this.mapData.player.x;
            let startX = this.ani_player.x;
            Laya.Tween.to(this.ani_player, { x: startX + 100 }, time / 3, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.ani_player, { x: startX - 200 }, time * 2 / 3);
            }));

            this.onStart();
        }
    }

    /**龙 */
    public ani_long: Laya.Skeleton;

    /**初始化玩家 */
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.ani_long = await this.createSkeleton(this.mapData.bg.ani.url);
        this.ani_long.x = this.mapData.bg.ani.x;
        this.ani_long.y = this.mapData.bg.ani.y;
        this.ani_long.play(0, true);
        this.box_enb.addChild(this.ani_long);
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        let index = this.box_player.getChildIndex(this.ani_player);
        if (index == -1) {
            this.box_player.addChild(this.ani_player);
        }
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.onStart();

        this.box_player.x = (this.index) * 1080;
        this.box_game.x = (this.index) * 1080;
        this.boxDowmTotal.x = (this.index) * 1080;
        this.box_enb.x = 1080;
        //
        let time = 3750;
        Laya.Tween.to(this.boxDowmTotal, { x: -1080 }, time);
        Laya.Tween.to(this.box_game, { x: -1080 }, time);
        //
        Laya.Tween.to(this.box_enb, { x: 0 }, time);
        let startX = this.ani_player.x;
        Laya.Tween.to(this.ani_player, { x: startX + 100 }, time / 3, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.ani_player, { x: startX - 200 }, time * 2 / 3);
        }));
        //
        ViewChangeManager.getInstance().hideBufferLoadingView();
        this.startWaterAni();
    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        if (evt.name == "sevent_1-1longdaiji_1") {
            //this.ani_long.play('1-1longdaiji', true);
        } else if ("sevent_1-2longpenhuo_1" == evt.name) {
            this.ani_long && this.ani_long.play('1-2longpenhuo', false);
        } else if ("sevent_1-3longdaixin_1" == evt.name) {
            this.ani_long && this.ani_long.play('1-3longdaixin', false);
            this.box_player.zOrder = 1;
        } else if ("smove" == evt.name) {
            Laya.Tween.to(this.box_player, { x: 1080 }, 5500);
            Laya.Tween.to(this.box_game, { x: -1080 }, 5500);
        }
    }

    public addEvent() { }

    public removeEvent() { }

    public removeSelf() {
        return super.removeSelf();
    }

    /**
     * 当从父节点移除时候
     */
    public onRemoved() {
        super.onRemoved();
        super.clearData();
        this.removeEvent();
        this.stopAni();
        console.log("level 1 on Removed!")
    }

    /**开启动画 */
    private startWaterAni() {
        this.moveSomeOne(this.box_waterup, 0, -1436, 5000);
    }

    private moveSomeOne(box: Laya.Sprite, starX: number, tox: number, time: number): void {
        Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, () => {
            box.x = starX;
            this.moveSomeOne(box, starX, tox, time);
        }));
    }

    /**停止动画 */
    private stopAni() {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_enb);
        Laya.Tween.clearAll(this.box_waterup);
        Laya.Tween.clearAll(this.boxDowmTotal);
    }
}