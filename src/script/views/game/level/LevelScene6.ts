import { LevelBase } from "./LevelBase";
import { PopChooseScene } from "../PopChooseScene";
import GameStateManager from "../../../games/GameStateManager";
import { EnterGameType } from "../../../games/CommonDefine";
import GameView from "../../GameView";
import ViewChangeManager from "../../../games/ViewChangeManager";
/**第六关 */
export class LevelScene6 extends LevelBase {
    className_key = "LevelScene6";

    public box_cg1: Laya.Box;
    public box_hd: Laya.Box;
    public box_game_1: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene6.json";
    }

    public onAddStage() {
        super.onAddStage();
    }

    public childrenCreated() {
        super.childrenCreated();
    }


    public initView() {
        this.stopAni();
        super.initView();
    }

    public onRemoved() {
        super.onRemoved();
        this.stopAni();
    }
    public ani_changjin: Laya.Skeleton;
    public ani_hd: Laya.Skeleton;//坏蛋
    public ani_player: Laya.Skeleton; //人 

    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.ani_changjin&& this.ani_changjin.removeSelf();
        this.ani_hd&&this.ani_hd.removeSelf();
        
        //场景
        this.ani_changjin = await this.createSkeleton(this.mapData.cg.ani.url);
        this.ani_changjin.x = this.mapData.cg.x;
        this.ani_changjin.y = this.mapData.cg.y;
        this.box_game.addChild(this.ani_changjin);
        this.ani_changjin.play("tengman2", false);
        //坏蛋
        this.ani_hd = await this.createSkeleton(this.mapData.hd.ani.url);
        this.ani_hd.x = this.mapData.hd.x;
        this.ani_hd.y = this.mapData.hd.y;
        this.box_game.addChild(this.addChild(this.ani_hd));
        this.ani_hd.play("daiji", true);
        //人物
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
        // this.box_game.x = this.box_game_1.x = -2160;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();
    }
    public bFlagMove: boolean = false;
    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        switch (evt.name) {
            case "sevent_tengman_1":
                this.ani_changjin.play("tengman", false);
                break
            case "smovex":
                if (this.box_game.x == 0) {
                    Laya.Tween.to(this.box_game, { x: -1040 }, 4650);
                    Laya.Tween.to(this.box_game_1, { x: -1040 }, 4650);
                    Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx1 }, 4650);
                }
                break
            case "sevent_nianye1_1":
                let self = this;
                Laya.timer.once(1000, self, () => {
                    Laya.Tween.to(self.ani_changjin, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
                        self.ani_changjin.alpha = 1;
                        self.ani_changjin.play("nianye1", true);
                    }))
                });
                break
            case "sevent_nianye2_1":
                this.ani_changjin.play("nianye2", false);
                break
            case "smove2x":
                if (this.box_game.x == -1040) {
                    Laya.Tween.to(this.box_game, { x: -2120 }, 6000);
                    Laya.Tween.to(this.box_game_1, { x: -2120 }, 6000);
                    Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx2 }, 4650);
                }
                break
            case "sevent_chaoxiao_1":
                this.ani_hd.play("chaoxiao", false);
                break
            case "sevent_xuanyun_1":
                this.ani_hd.play("xuanyun", false);
                break
            case "smove3x":
                Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx3 }, 4650);
                break
        }
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
            if (this.index == 2) {
                this.ani_hd.play("daiji", true);
            }
            //this.destroyAni();
            super.restartGame();
            //场景移动
            this.onStart();
        }
    }

    /**停止动画 */
    private stopAni() {
        Laya.Tween.clearAll(this.box_player);
        Laya.Tween.clearAll(this.box_game);
        Laya.Tween.clearAll(this.box_game_1);
    }
}