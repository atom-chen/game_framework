import ConfigManager from "../../games/ConfigManager";
import { PlayerDataManager } from "../../common/GameDataManager";
import { GoodsType } from "../../games/CommonDefine";
import FailEntryTwoView from "./FailEntryTwoView";
import ViewChangeManager from "../../games/ViewChangeManager";
import AnimationManager from "../../manager/AnimationManager";
import SoundManager from "../../common/SoundManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import MoreGameOperRequestTwo from "./wecat/MoreGameOperRequestTwo";
import MoreGameRandomGameBox713 from "./wecat/MoreGameRandomGameBox713";
import MoreGameView from "./wecat/MoreGameView";

export default class FailEntryOneView extends BaseSceneUISkinPopView {
    public className_key = "FailEntryOneView";
    protected grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
    public imageBtSign: Laya.Image;
    public btLable: Laya.Label;
    public imageRecv: Laya.Image;
    public imageGoodsType: Laya.Image;
    public spGlod: Laya.Image;
    public boxAni: Laya.Box;
    public aniReal: Laya.Skeleton;
    public img_back: Laya.Image;
    public image_wm: Laya.Image;
    /**数据 */
    private nGlodCost: number;

    constructor() {
        super();
        this.nGlodCost = 200;
        this.skin = "game/uiView/FailEntryOneView.json";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        if (DeviceUtil.isWXMiniGame()) {
            // this.img_back.visible = true;
        }
    }

    onAddStage(): void {
        MiniManeger.instance.showInterstitialAd();
        this.initView();
        this.addEvent();
        MiniManeger.instance.showBannerAd();
    }

    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
        if (this.aniReal) {
            this.aniReal.stop();
        }
        Laya.Tween.clearAll(this.image_wm);
    }

    private initView() {
        this.forExamine();
        this.refreshLable();

        if (DeviceUtil.isWXMiniGame()) {
            if (!this.aniReal) {
                this.createSkeleton("resource/assets/img/ani/failure/failure.sk");
            } else {
                this.aniReal.play(0, true);
            }
        }

        //刷新金币数量
        this.refreshReLiveByGlod();

        // if (DeviceUtil.isWXMiniGame()) {
        //     // this.image_wm.visible = true;
        //     //this.startWmAni();
        // } else {
        //     //两秒后显示出来
        //     this.btLable.visible = false;
        //     Laya.timer.once(2000, this, () => {
        //         this.btLable.visible = true;
        //     });
        // }
        this.initPl();
    }

    private addEvent() {
        this.imageRecv.on(Laya.Event.CLICK, this, this.onCostGlodRelive);
        this.imageBtSign.on(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
        this.btLable.on(Laya.Event.CLICK, this, this.onNoThanks);
        this.img_back.on(Laya.Event.CLICK, this, this.onBack);
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    private removeEvent() {
        this.imageRecv.off(Laya.Event.CLICK, this, this.onCostGlodRelive);
        this.imageBtSign.off(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
        this.btLable.off(Laya.Event.CLICK, this, this.onNoThanks);
        this.img_back.off(Laya.Event.CLICK, this, this.onBack);
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    /**看视频复活 */
    private onWatchVideoToRelive() {
        SoundManager.getInstance().playEffect("button", 1);
        this.imageBtSign.off(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
        let self = this;

        if (ViewChangeManager.getInstance().CurLevelBase) {
            ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
        }

        MiniManeger.instance.playViderAd({
            successFun: () => {
                Laya.timer.once(100, self, () => {

                    self.onFailRestartGame();
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                    }
                })
                console.log("onFailRestartGame xxx");
                self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
            },
            failFun: () => {
                self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
                if (ViewChangeManager.getInstance().CurLevelBase) {
                    ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                }
            },
            errorFun: () => {
                self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
                if (ViewChangeManager.getInstance().CurLevelBase) {
                    ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                }
            }
        });
    }

    private onFailRestartGame() {
        //为了头条的提审 隐藏binner可能会有延迟 
        if (DeviceUtil.isTTMiniGame() || DeviceUtil.isWXMiniGame()) {
            MiniManeger.instance.hideBanner();
        }
        ViewChangeManager.getInstance().restartGame(false);
        MiniManeger.instance.bFlagSpecialView = true;
        this.removeSelf();
    }

    /**花费金币复活 */
    private onCostGlodRelive() {
        SoundManager.getInstance().playEffect("button", 1);
        //检测金币是否足够
        let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
        if (!b) {
            return;
        }
        //花费金币
        PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);

        //开启游戏
        this.onFailRestartGame();
    }

    /**
     * 点击返回
     */
    private onBack(): void {
        MoreGameRandomGameBox713.bOperFlag = false;
        ViewManager.getInstance().showView(MoreGameRandomGameBox713);
        MiniManeger.instance.bFlagSpecialView = true;
        this.removeSelf();
    }

    /**不了谢谢 */
    private onNoThanks() {
        SoundManager.getInstance().playEffect("button", 1);
        if (DeviceUtil.isWXMiniGame()) {
            if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                MoreGameView.bSuccess = false;
                ViewManager.getInstance().showView(MoreGameView);
            } else {
                MoreGameRandomGameBox713.bOperFlag = true;
                MoreGameRandomGameBox713.bSuccess = false;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            }
        } else {
            //打开失败界面2
            ViewManager.getInstance().showView(FailEntryTwoView);
        }
        MiniManeger.instance.bFlagSpecialView = true;
        this.removeSelf();
    }

    /**刷新金币复活的信息 */
    private refreshReLiveByGlod() {
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(6);
        if (stGameConfig) {
            this.nGlodCost = parseInt(stGameConfig.strValue);
        }
        //检测金币是否足够
        let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
        if (!b) {
            this.imageRecv.visible = false;
            return;
        }
        this.imageRecv.visible = true;
        BitmapLabelUtils.setLabel(this.spGlod, this.nGlodCost.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
    }

    public createSkeleton(url: string): Promise<Laya.Skeleton> {
        return new Promise<Laya.Skeleton>((resolve) => {
            AnimationManager.instance.showSkeletonAnimation(url, (boomAnimation: Laya.Skeleton) => {
                this.aniReal = boomAnimation;
                this.aniReal.player.playbackRate = 1;
                this.aniReal.autoSize = true;
                this.aniReal.scale(1, 1);
                this.aniReal.play(0, true);
                this.aniReal.x = this.aniReal.width - 100;
                this.aniReal.y = this.aniReal.height;
                this.boxAni.addChild(this.aniReal);
                resolve(boomAnimation)
            }, 1);
        });
    }

    /**不了谢谢延迟显示 */
    private refreshLable() {
        if (DeviceUtil.isWXMiniGame()) {
            return;
        }
        this.btLable.visible = false;
        Laya.timer.once(3000, this, () => {
            this.btLable.visible = true;
        });
    }

    private forExamine() {
    }

    private startWmAni() {
        Laya.Tween.clearAll(this.image_wm);
        Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startWmAni);
            }));
        }));
    }

    // public hideImageWm(){

    // }

    private box_wecat: Laya.Box;
    private nBtNextLevel: number = 360;
    private nBtNextLevelSp: number = 50;
    private initPl() {
        if (DeviceUtil.isWXMiniGame()) {
            this.box_wecat.removeChildren();
            this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView(true));

            let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(6);
            if (stGameConfig) {
                this.nGlodCost = parseInt(stGameConfig.strValue);
            }
            //检测金币是否足够
            let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
            if (b) {
                this.boxAni.visible = false;
                this.box_wecat.visible = true;
                this.imageRecv.bottom = this.imageBtSign.bottom;
                this.imageRecv.centerX = 250;
                this.imageBtSign.centerX = -250;
            } else {
                this.imageBtSign.centerX = 0;
            }
            this.boxAni.visible = false;
            if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                this.btLable.bottom = this.nBtNextLevelSp;
                MiniManeger.instance.bFlagSpecialView = false;
                MiniManeger.instance.hideBanner();
                return;
            } else {
                this.btLable.bottom = this.nBtNextLevel;
            }
        } else {
            MiniManeger.instance.bFlagSpecialView = true;
            MiniManeger.instance.showBannerAd();
        }
    }
}