import ViewChangeManager from "../games/ViewChangeManager";
import { PlayerDataManager } from "../common/GameDataManager";
import LevelView from "./game/LevelView";
import SignView from "./game/SignView";
import ConfigManager from "../games/ConfigManager";
import GameEvent from "../games/GameEvent";
import AddPsView from "./game/AddPsView";
import { GoodsType } from "../games/CommonDefine";
import SoundManager from "../common/SoundManager";
import InviteView from "./game/invite/InviteView";
import { MiniManeger } from "../minigame/MiniManeger";
import FailEntryTwoView from "./game/FailEntryTwoView";
import SuccessfulEntryThreeView from "./game/SuccessfulEntryThreeView";
import { GameData } from "../common/GameData";
import FailEntryOneView from "./game/FailEntryOneView";
import NativeMgr from "../tool/NativeMgr";
import { LotteryScene } from "./game/lottery/LotteryScene";
import GuessLike from "./game/wecat/GuessLike";
import WeCatMoreGameView from "./game/wecat/WeCatMoreGameView";
import MoreGameOperRequestTwo from "./game/wecat/MoreGameOperRequestTwo";

export default class GameHomeView extends BaseSceneUISkin {
    className_key = "GameHomeView";

    public spNum: Laya.Sprite;
    public imageSpFull: Laya.Image;
    public imageBtAttSp: Laya.Image;
    public glodNum: Laya.Sprite;
    public imageBtGoldAdd: Laya.Image;
    public imageBtStartGame: Laya.Image;
    // public imageBtFreeSkin: Laya.Image;
    public imageFreeSkin: Laya.Image;
    public imageBtShare: Laya.Image;
    public imageBtChoseLevel: Laya.Image;
    public imageBtSign: Laya.Image;
    public imageBtInvital: Laya.Image;
    public boxLevel: Laya.Box;
    public spLevelNum: Laya.Sprite;
    public stLableTime: Laya.Label;
    public boxFun: Laya.Box;
    public btn_more: Laya.Sprite;
    public imageWeCatMoreGame: Laya.Image;
    public more_games: Laya.Sprite;
    public back_btn: Laya.Sprite;
    public image_wm: Laya.Image;
    /**数据控制 */
    private bIsRunning: boolean;
    private bWeCatShow: boolean;


    private btn_lottery: Laya.Button;

    private btn_colorSign: Laya.Button;
    constructor() {
        super();
        this.skin = "game/GameHomeView.json";
        this.bIsRunning = false;
        this.bWeCatShow = false;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.btn_more.visible = false;
        if (DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
            this.btn_more.visible = true;
        }

        if (DeviceUtil.isTTMiniGame()) {
            (this.getChildByName("imageHead") as Laya.Image).skin = "resource/assets/preloading/loading_logo_4.png";
        } else if (DeviceUtil.isQQMiniGame()) {
            (this.getChildByName("imageHead") as Laya.Image).skin = "resource/assets/preloading/loading_logo.png";
        }

        if (DeviceUtil.isWXMiniGame()) {
            this.imageWeCatMoreGame.visible = true;
            this.more_games.visible = true;
            // this.back_btn.visible = true;
            (this.getChildByName("imageHead") as Laya.Image).skin = "resource/assets/preloading/loading_logo_8.png";
            //修改2
            (this.getChildByName("imageHead") as Laya.Image).visible = false;
        }
        //爱奇艺的包
        if (MiniManeger.instance.isAiQiYi()) {
            (this.getChildByName("imageHead") as Laya.Image).skin = "resource/assets/preloading/loading_logo_x.png";
        }

        //修改2
        this.addGuessLike();
    }

    onAddStage(): void {
        AddPsView.bCloseBinner = false;
        MiniManeger.instance.showBannerAd();
        this.bIsRunning = true;
        this.startGameAni();

        this.initView();
        //this.addEvent();
        //MiniManeger.instance.showInterstitialAd();
    }

    public onRemoved() {
        this.bIsRunning = false;
        super.onRemoved();
        this.removeEvent();
        Laya.Tween.clearAll(this.imageBtStartGame);
        Laya.Tween.clearAll(this.image_wm);

    }
    private onLottery() {
        SoundManager.getInstance().playEffect("button", 1);
        ViewChangeManager.getInstance().showBufferLoadingView();
        ResUtil.getIntance().loadGroups(["lottery"], async () => {
            // if (DeviceUtil.isQQMiniGame()) {
            //     if (GameData.getInstance().isNewPlayer && GameData.getInstance().gameQQInfo.lotterHomeOpenVideo) {
            //         MiniManeger.instance.playViderAd({
            //             successFun: () => {
            //                 GameData.getInstance().gameQQInfo.lotterHomeOpenVideo = false
            //             }
            //         })
            //     }
            // }
            ViewManager.getInstance().showView(LotteryScene);
            ViewChangeManager.getInstance().hideBufferLoadingView();
        });
    }

    private addEvent() {
        this.btn_lottery.on(Laya.Event.CLICK, this, this.onLottery);
        this.btn_colorSign.on(Laya.Event.CLICK, this, this.onColorSign);
        this.imageBtStartGame.on(Laya.Event.CLICK, this, this.gameHomeStartGame);
        this.btn_more.on(Laya.Event.CLICK, this, this.onMoreGame);
        this.imageBtChoseLevel.on(Laya.Event.CLICK, this, this.openLevelView);
        this.imageBtSign.on(Laya.Event.CLICK, this, this.openSignView);
        this.imageBtShare.on(Laya.Event.CLICK, this, this.onGameHomeShare);
        this.imageBtInvital.on(Laya.Event.CLICK, this, this.onInvite);
        //this.imageBtAttSp.on(Laya.Event.CLICK,this,this.openAddSpAddSp);
        //this.imageBtFreeSkin.on(Laya.Event.CLICK, this,this.onGetFreeSkin);
        if (DeviceUtil.isWXMiniGame()) {
            this.imageWeCatMoreGame.on(Laya.Event.CLICK, this, this.openChouTiView);
            this.more_games.on(Laya.Event.CLICK, this, this.wxShowMoreGame);
            this.back_btn.on(Laya.Event.CLICK, this, this.wxShowMoreGame);
            this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    private openChouTiView() {
        ViewManager.getInstance().showView(WeCatMoreGameView);
    }

    private onMoreGame(): void {
        if (DeviceUtil.isQQMiniGame()) {
            MiniManeger.instance.showBoxAd();
        } else if (DeviceUtil.isTTMiniGame()) {
            MiniManeger.instance.showMoreGamesModal();
        }
    }

    private removeEvent() {
        this.btn_lottery.off(Laya.Event.CLICK, this, this.onLottery);
        this.btn_colorSign.off(Laya.Event.CLICK, this, this.onColorSign);
        this.imageBtStartGame.off(Laya.Event.CLICK, this, this.gameHomeStartGame);
        this.btn_more.off(Laya.Event.CLICK, this, this.onMoreGame);
        this.imageBtChoseLevel.off(Laya.Event.CLICK, this, this.openLevelView);
        this.imageBtSign.off(Laya.Event.CLICK, this, this.openSignView);
        this.imageBtShare.off(Laya.Event.CLICK, this, this.onGameHomeShare);
        this.imageBtInvital.off(Laya.Event.CLICK, this, this.onInvite);
        //this.imageBtAttSp.off(Laya.Event.CLICK,this,this.openAddSp);
        //this.imageBtFreeSkin.off(Laya.Event.CLICK, this,this.onGetFreeSkin);
        if (DeviceUtil.isWXMiniGame()) {
            this.imageWeCatMoreGame.off(Laya.Event.CLICK, this, this.openChouTiView);
            this.more_games.off(Laya.Event.CLICK, this, this.wxShowMoreGame);
            this.back_btn.off(Laya.Event.CLICK, this, this.wxShowMoreGame);
            this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    /**
     * 显示更多游戏
     */
    private wxShowMoreGame(): void {
        ViewManager.getInstance().showView(MoreGameOperRequestTwo);
    }

    /**开始游戏 */
    private gameHomeStartGame() {
        //
        if (DeviceUtil.isNative()) {
            NativeMgr.getInstance().showInterstitialAd();
        }
        //
        SoundManager.getInstance().playEffect("button", 1);
        //ViewChangeManager.getInstance().getCommonView().removeSelf();
        let nSpCost = 1;
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
        if (stGameConfig) {
            nSpCost = parseInt(stGameConfig.strValue);
        }
        //检测体力是否足够
        let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
        if (!b) {
            TipsManager.getInstance().showDefaultTips("体力不足");
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["adsp"], () => {
                ViewManager.getInstance().showView(AddPsView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
            return;
        }
        //扣除体力
        PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);

        //为了头条的提审 隐藏binner可能会有延迟 
        if (DeviceUtil.isTTMiniGame()) {
            MiniManeger.instance.hideBanner();
        }
        //开始游戏
        ViewChangeManager.getInstance().CurLevelBase.startGame();
        this.removeSelf();
    }

    /**初始化界面 */
    private initView() {
        ViewChangeManager.getInstance().restartEnterGameHome();
        this.PlInitView();
        this.showSignView();
        BitmapLabelUtils.setLabel(this.spLevelNum, PlayerDataManager.getInstance().getLevelToChangeMaxLevel().toString(), "resource/assets/img/ui/gamehome/maininterface_number1/maininterface_number1_", 0, ".png", "center");
        // this.addChild(ViewChangeManager.getInstance().getCommonView());
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.visible = true;
            this.startWmAni();
        }
        if (DeviceUtil.isQQMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1) {
            MiniManeger.instance.showBlockAd();
            this.btn_lottery.visible = true;
            let flag = MiniManeger.instance.isColorSignExistSync();
            if (!flag) {//可以显示
                this.btn_colorSign.visible = true;
            } else {//不可以显示
                this.btn_colorSign.visible = false;
            }
        } else if (DeviceUtil.isTTMiniGame()) {
            this.btn_lottery.visible = true;
        }
    }
    private onColorSign() {
        MiniManeger.instance.addColorSign({
            success: (res) => {
                console.log(res);
                this.btn_colorSign.visible = false;

            }
        })
    }


    /**打开选关界面 */
    private openLevelView() {
        SoundManager.getInstance().playEffect("button", 1);
        ViewChangeManager.getInstance().showBufferLoadingView();
        ResUtil.getIntance().loadGroups(["levelview"], () => {
            LevelView.pHomeView = this;
            ViewManager.getInstance().showView(LevelView);
            ViewChangeManager.getInstance().hideBufferLoadingView();
        });

        //ViewManager.getInstance().showView(FailEntryTwoView);
    }

    /**打开签到界面 */
    private openSignView() {
        SoundManager.getInstance().playEffect("button", 1);

        ViewChangeManager.getInstance().showBufferLoadingView();
        ResUtil.getIntance().loadGroups(["sign"], () => {
            Laya.Resource.destroyUnusedResources();
            ViewManager.getInstance().showView(SignView);
            ViewChangeManager.getInstance().hideBufferLoadingView();
        });


        //    ViewManager.getInstance().showView(SuccessfulEntryThreeView);
    }

    /**分享 */
    private onGameHomeShare() {
        SoundManager.getInstance().playEffect("button", 1);
        MiniManeger.instance.bFlagDouYin = false;
        MiniManeger.instance.shareAppMessage();
        // MiniManeger.instance.shareAppMessage({
        //     sucFun: () => {
        //         console.log("分享成功");
        //         TipsManager.getInstance().showDefaultTips('分享成功'); 
        //     },
        //     failFun:()=>{
        //         console.log("分享失败");
        //         TipsManager.getInstance().showDefaultTips('分享失败'); 
        //     }
        // });
        // ViewManager.getInstance().showView(SuccessfulEntryThreeView);
    }

    private onInvite() {
        SoundManager.getInstance().playEffect("button", 1);
        ViewChangeManager.getInstance().showBufferLoadingView();
        ResUtil.getIntance().loadGroups(["invite"], () => {
            ViewManager.getInstance().showView(InviteView);
            ViewChangeManager.getInstance().hideBufferLoadingView();
        });
    }

    private startGameAni() {
        if (!this.bIsRunning) {
            return;
        }
        Laya.Tween.clearAll(this.imageBtStartGame);
        Laya.Tween.to(this.imageBtStartGame, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageBtStartGame, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startGameAni);
            }));
        }));
    }

    /**平台界面的刷新 */
    private PlInitView() {
        if (DeviceUtil.isTTMiniGame() || MiniManeger.instance.isAiQiYi()) {
            this.imageBtInvital.visible = false;
            this.boxFun.width = 650;
        }
    }

    /**判断下是否弹出签到 */
    private showSignView() {
        // if (PlayerDataManager.getInstance().isSign()) {
        //     ViewChangeManager.getInstance().showBufferLoadingView();
        //     ResUtil.getIntance().loadGroups(["sign"], () => {
        //         ViewManager.getInstance().showView(SignView);
        //         ViewChangeManager.getInstance().hideBufferLoadingView();
        //         this.addEvent();
        //     });
        // } else {
        this.addEvent();
        //}
    }

    private onGetFreeSkin() {
        // ViewChangeManager.getInstance().showBufferLoadingView();
        //     ResUtil.getIntance().loadGroups(["skin"],  () => {
        //         ViewManager.getInstance().showView(Sin);
        //         ViewChangeManager.getInstance().hideBufferLoadingView();
        //         this.addEvent();
        //     });
        //ViewManager.getInstance().showView(SkinView);
    }

    private weCatViewOper() {
        //    ViewManager.getInstance().showView(WeCatMoreGameView);
        this.wxShowMoreGame();
    }

    private startWmAni() {
        if (!this.bIsRunning) {
            return;
        }
        Laya.Tween.clearAll(this.image_wm);
        Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startWmAni);
            }));
        }));
    }

    private _guessLike: GuessLike;//推广位
    /**修改2 */
    private addGuessLike() {
        let self = this;
        if (!self._guessLike && DeviceUtil.isWXMiniGame()) {//微信需要增加滑动推荐
            MiniManeger.instance.createGuessLike(self).then((guessLike) => {
                if (!guessLike) {
                    return;
                }
                self._guessLike = guessLike;
                self._guessLike.x = (Laya.stage.width - self._guessLike.width) / 2;
                self._guessLike.y = 250;
            });
        }
    }
}