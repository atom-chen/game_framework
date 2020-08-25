import { LevelBase } from "./LevelBase";
import { PopChooseScene } from "../PopChooseScene";
import ViewChangeManager from "../../../games/ViewChangeManager";

/**
 * 第4关
 */
export class LevelScene4 extends LevelBase {
    className_key = "LevelScene4";

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene4.json";
    }

    public box_game_1: Laya.Box;
    public box_player: Laya.Box;

    public onAddStage() {
        super.onAddStage();
    }

    public initView() {
        super.initView();
        this.stopAni();
    }

    public callBack(right: boolean, aniName: string) {
        if (right) {
            this.index++;
            //刷新下进度
            this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
            this.pGameView.showResultIcon(right)
        } else {
            if (aniName == "4-5") {
            }
        }
        this.playAni(aniName, () => {
            this.onPlayOnce();
        });
    }

    //豆子
    private bean: Laya.Skeleton;
    //门
    private door: Laya.Skeleton;



    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();
        this.bean&&this.bean.removeSelf();
        this.door&&this.door.removeSelf();

        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.bean = await this.createSkeleton(this.mapData.bean.url);
        this.bean.x = this.mapData.bean.x;
        this.bean.y = this.mapData.bean.y;
        this.bean.stop();
        this.box_game.addChild(this.bean);
        //
        this.door = await this.createSkeleton(this.mapData.door.url);
        this.door.x = this.mapData.door.x;
        this.door.y = this.mapData.door.y;
        this.box_game.addChild(this.door);
        //
        this.box_game.x = this.box_game_1.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        // console.log(evt);\
        super.onPlayLabel(evt);
        if (evt.name == "sevent_tengwan_1") {
            this.bean.play('tengwan', false);
        } else if ("sevent_men_1" == evt.name) {
            this.door.play('men', false);
        } else if ("sevent_xisui_1" == evt.name) {
            this.door.play('xisui', false);
        } else if ("smove" == evt.name) {
            Laya.Tween.to(this.box_game, { x: -1080 }, 4130);
            Laya.Tween.to(this.box_game_1, { x: -1080 }, 4130);
        } else if ("pmove_69" == evt.name) {
            //角色移动
            Laya.Tween.to(this.ani_player, { x: 650 }, 69 * 1000 / 24);
        } else if ("pmove_48" == evt.name) {
            //角色移动
            Laya.Tween.to(this.ani_player, { x: 1200 }, 48 * 1000 / 24);
        }
    }

    public addEvent() { }

    public removeEvent() {
        if (this.ani_player) {
            this.ani_player.off(Laya.Event.LABEL, this, this.onPlayLabel);
        }
    }

    public removeSelf() {
        // GameManager.instance.showTopBar(ShowType.showAll)
        return super.removeSelf();
    }

    /**
     * 当从父节点移除时候
     */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
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
        } else {
            //this.destroyAni();
            super.restartGame();
            // this.initPlayer();
            // this.box_player.x = ((this.index) * 1080);
            //场景移动
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_game);
    }
}