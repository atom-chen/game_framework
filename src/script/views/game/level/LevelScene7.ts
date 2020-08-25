import { LevelBase } from "./LevelBase";
import SoundManager from "../../../common/SoundManager";
import ViewChangeManager from "../../../games/ViewChangeManager";

export default class LevelScene7 extends LevelBase {
    className_key = "LevelScene7";

    public box_game: Laya.Box;
    public box_game_1: Laya.Box;
    public box_enb: Laya.Box;
    public box_player: Laya.Box;

    constructor(data_) {
        super(data_);
        this.skin = "game/level_ks/KsLevelScene7.json";
    }

    public onAddStage() {
        super.onAddStage();
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    /**
   * 当从父节点移除时候
   */
    public onRemoved() {
        super.onRemoved();
    }

    public initView() {
        super.initView();
    }

    //火焰的动画
    private ani_huo: Laya.Skeleton;
    // 洒水
    private sashui: Laya.Skeleton;
    public async initPlayer() {
        ViewChangeManager.getInstance().showBufferLoadingView();

        this.ani_huo && this.ani_huo.removeSelf();
        this.sashui  && this.sashui.removeSelf();

        //火焰
        this.ani_huo = await this.createSkeleton(this.mapData.huoyan.ani.url);
        this.ani_huo.x = this.mapData.huoyan.x;
        this.ani_huo.y = this.mapData.huoyan.y;
        this.ani_huo.play("huo3", true);
        this.box_game.addChild(this.ani_huo);
        //洒水
        this.sashui = await this.createSkeleton(this.mapData.sashui.ani.url);
        this.sashui.x = this.mapData.sashui.x;
        this.sashui.y = this.mapData.sashui.y;
        this.sashui.scale(1.2, 1.2);
        this.sashui.play("sashui1_1", true);
        this.box_game.addChild(this.sashui);
        //玩家
        //
        !this.ani_player && (this.ani_player = await this.createSkeleton(this.mapData.player.url));
        this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
        this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
        this.ani_player.x = this.mapData.player.x;
        this.ani_player.y = this.mapData.player.y;
        //
        this.box_player.x = this.box_game.x = 0;
        this.onStart();
        ViewChangeManager.getInstance().hideBufferLoadingView();

    }

    public onPlayLabel(evt: any) {
        if (this.bAniDestory) return;
        super.onPlayLabel(evt);
        if ("sevent_huo1_1" == evt.name) {
            this.ani_huo && this.ani_huo.play("huo1", false);
        } else if ("sevent_huo2_1" == evt.name) {
            this.ani_huo && this.ani_huo.play("huo2", false);
        } else if ("smove" == evt.name) {
            Laya.Tween.to(this.box_game, { x: -1040 }, 5000);
            Laya.Tween.to(this.box_game_1, { x: -1040 }, 5000);
        } else if ("sevent_sashui1_1" == evt.name) {
            this.sashui && this.sashui.play("sashui1", true);
        } else if ("sevent_sashui1_2" == evt.name) {
            this.sashui && this.sashui.play("sashui2", false);
        } else if ("smove1" == evt.name) {
            Laya.Tween.to(this.box_game, { x: -2120 }, 4880);
            Laya.Tween.to(this.box_game_1, { x: -2120 }, 4880);
        }
    }

    /**
     * 选择回调
     */
    public callBack(right: boolean, aniName: string) {
        if (right) {
            if (this.index < this.mapData.player.choose.length) {
                this.index++;
            }
            //刷新下进度
            this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
            this.pGameView.showResultIcon(right);
        }
        if (aniName == "7-5") {
            Laya.Tween.to(this.box_player, { x: this.mapData.player.tx }, 2000, null, null, 1000);
        }
        this.playAni(aniName, () => {
            this.onPlayOnce();
        });
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
            //this.destroyAni();
            super.restartGame();
            if (this.index == 0) {
                this.ani_huo && this.ani_huo.play("huo3", true);
            } else if (this.index == 1) {
                this.box_player.x = 0;
            } else if (this.index == 2) {

            }
            //场景移动
            this.onStart();
        }
    }

}