import { LevelManager } from "../../manager/LevelManager";
import { PlayerDataManager } from "../../common/GameDataManager";
import GameStateManager from "../../games/GameStateManager";
import { EnterGameType, GoodsType } from "../../games/CommonDefine";
import ViewChangeManager from "../../games/ViewChangeManager";
import ConfigManager from "../../games/ConfigManager";
import AnimationManager from "../../manager/AnimationManager";
import SoundManager from "../../common/SoundManager";
import AddPsView from "./AddPsView";
import { MiniManeger } from "../../minigame/MiniManeger";
import { GameData } from "../../common/GameData";
import PlatformDY from "../../../PlatformDY";
import { GameManager } from "../../manager/GameManager";
import MoreGameRandomGameBox713 from "./wecat/MoreGameRandomGameBox713";

export default class SuccessfulEntryThreeView extends BaseSceneUISkinPopView {
    public className_key = "SuccessfulEntryThreeView";
    protected grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;

    private box_content: Laya.Box;

    public boxGameData: Laya.Box;
    public btNextLevel: Laya.Image;
    public spGlodAdd: Laya.Sprite;
    public btLable: Laya.Sprite;
    public imageRecv: Laya.Box;
    public imageGoodsType: Laya.Image;
    public spCountAddMore: Laya.Sprite;
    public spCost: Laya.Sprite;
    public imageBtShare: Laya.Box;
    public imageBtRestart: Laya.Box;
    public btDouble: Laya.Sprite;
    public spDouble: Laya.Sprite;
    public lableDesc: Laya.Label;
    public imageBtToHome: Laya.Image;
    public imageGoodsTypeUp: Laya.Image;
    public spCostPs: Laya.Sprite;
    public imageShareGameName: Laya.Image;
    private nGlodAddByWathcVideo: number;

    private shareGlodCount: Laya.Sprite;
    private imageShareIcon: Laya.Image;

    private ttGoodsType: Laya.Image;
    private ttSpecial: Laya.Sprite;
    private box_award: Laya.Box;
    private box_double: Laya.Box;

    public aniReal: Laya.Skeleton;

    public imageWeCatMoreGame: Laya.Image;
    public panelWeCatMoreGame: Laya.Panel;

    private moreGamePanel2: Laya.Box;
    public moreGamePanel: Laya.Box;


    /**一些数据 */
    private nGlodAdd: number;    //通关后增加的金币
    private nGlodRadio: number;  //看视频后增加的倍数

    private bIsRunning: boolean;
    private bRecvAward: boolean;

    constructor() {
        super();
        this.nGlodAdd = 50;
        this.nGlodRadio = 4;
        this.bIsRunning = false;
        this.bRecvAward = false;
        this.skin = 'game/uiView/SuccessfulEntryThreeView.json';
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        //处理适配推荐高度
        this.grp_center.width = this.width;
        this.grp_center.height = this.height;
        this.imageWeCatMoreGame.height = (this.height - this.imageWeCatMoreGame.y - (1920 - this.imageWeCatMoreGame.y - this.imageWeCatMoreGame.height));
        this.panelWeCatMoreGame.height = this.imageWeCatMoreGame.height - 110;
    }

    onAddStage(): void {
        this.wxShareShowMoreGame = false;
        AddPsView.bCloseBinner = false;
        ViewChangeManager.getInstance().CommonView.addBtEvent();
        this.initView();
        this.addEvent();
        this.isShowBox = false;
        MiniManeger.instance.showBannerAd();
        MiniManeger.instance.showInterstitialAd();
        //
    }

    public onRemoved() {
        super.onRemoved();
        MiniManeger.instance.hideBlockAd();
        this.removeEvent();
        this.bIsRunning = false;
        Laya.Tween.clearAll(this.imageBtShare);
        Laya.timer.clearAll(this);
        if (this.aniReal) {
            this.aniReal.stop();
            this.aniReal.removeSelf();
        }

    }

    /**初始话pinnel***/
    private initPanel() {
        if (!DeviceUtil.isWXMiniGame() && !BaseConst.infos.gameInfo.isDY) {
            this.panelWeCatMoreGame.vScrollBarSkin = "";
            this.panelWeCatMoreGame.elasticEnabled = true;
            this.panelWeCatMoreGame.vScrollBar.elasticDistance = 200;
            this.panelWeCatMoreGame.vScrollBar.elasticBackTime = 100;
        }
    }

    /**初始化一些信息 */
    private initView() {
        this.initPanel();
        this.proceMoreGame();
        MiniManeger.instance.onShareVideoSuccess = false;
        //MiniManeger.instance.StopVideo();
        this.initPlView();
        SoundManager.getInstance().playEffect("win", 1);
        this.bRecvAward = false;
        if (!this.aniReal) {
            this.createSkeleton("resource/assets/img/ani/celebrate/celebrate.sk");
        } else {
            this.aniReal.play(0, false);
            this.grp_center.addChild(this.aniReal);
        }

        //初始化双倍领奖的按钮
        if (BaseConst.infos.gameInfo.double && BaseConst.infos.gameInfo.double == 1) {
            this.spDouble.visible = true;
        } else {
            this.spDouble.visible = false;
        }

        if (DeviceUtil.isQQMiniGame()) {
            if (Math.random() < BaseConst.infos.gameInfo.siginC) {//qq的平台单独使用概率配置
                this.spDouble.visible = true;
            } else {
                this.spDouble.visible = false;
            }
        }

        this.bIsRunning = true;
        //初始化通关加的金币
        let pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(12);
        if (pGameConfig) {
            this.nGlodAdd = parseInt(pGameConfig.strValue);
        }
        //BitmapLabelUtils.setLabel(this.spGlodAdd, this.nGlodAdd.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
        //初始化看视频增加的倍数
        pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(13);
        if (pGameConfig) {
            this.nGlodRadio = parseInt(pGameConfig.strValue);
            //更新描述
            this.lableDesc.text = pGameConfig.strDesc;
        }
        BitmapLabelUtils.setLabel(this.spCost, this.nGlodRadio.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");

        //扣除的体力数值
        let nCost = 1;
        pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
        if (pGameConfig) {
            nCost = parseInt(pGameConfig.strValue);
        }
        BitmapLabelUtils.setLabel(this.spCostPs, nCost.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");

        //总数
        let bAddMore = this.nGlodAdd * this.nGlodRadio;
        BitmapLabelUtils.setLabel(this.spCountAddMore, bAddMore.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");

        if(DeviceUtil.isWXMiniGame()){
            this.spDouble.visible = false;
        }
        if (this.spDouble.visible) {
            let nReal = this.nGlodAdd * this.nGlodRadio;
            BitmapLabelUtils.setLabel(this.spGlodAdd, nReal.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
        } else {
            BitmapLabelUtils.setLabel(this.spGlodAdd, this.nGlodAdd.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
        }

        /**刷新分享的金币 */
        // let nGlodCount = 50;
        // stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
        // if(stGameConfig){
        //     nGlodCount = parseInt(stGameConfig.strValue)
        // }
        // BitmapLabelUtils.setLabel(this.shareGlodCount, nGlodCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");

        //开启缩放动画
        this.startSuccessImageBtShareAni();
        if (DeviceUtil.isQQMiniGame()) {
            GameManager.instance.selAddLottery(this.box_content);
        }
        if (DeviceUtil.isTTMiniGame()) {
            this.box_double.bottom = Laya.stage.height - (this.box_award.y + 120);
            this.box_double.scale(0.8, 0.8);
        }
        GameManager.instance.openLevelVideo(()=>{
            GameManager.instance.selAddLottery(this.box_content);
        })
    }

    private addEvent() {
        this.btLable.on(Laya.Event.CLICK, this, this.successfulEntryThreeNextLevel);
        this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
        this.imageBtShare.on(Laya.Event.CLICK, this, this.successShareGame);
        this.imageBtRestart.on(Laya.Event.CLICK, this, this.successReStart);
        this.imageRecv.on(Laya.Event.CLICK, this, this.successRecvAward);
        this.btDouble.on(Laya.Event.CLICK, this, this.onDoubleGlod);
        this.btNextLevel.on(Laya.Event.CLICK,this,this.weCatGotoNextLevel);
        if (DeviceUtil.isQQMiniGame()) {
            EventMgr.getInstance().addEvent("SuccBlockShow", this, this.showBlockAd);
        }
    }



    private removeEvent() {
        this.btLable.off(Laya.Event.CLICK, this, this.successfulEntryThreeNextLevel);
        this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
        this.imageBtShare.off(Laya.Event.CLICK, this, this.successShareGame);
        this.imageBtRestart.off(Laya.Event.CLICK, this, this.successReStart);
        this.imageRecv.off(Laya.Event.CLICK, this, this.successRecvAward);
        this.btDouble.off(Laya.Event.CLICK, this, this.onDoubleGlod);
        if (DeviceUtil.isQQMiniGame()) {
            EventMgr.getInstance().removeEvent("SuccBlockShow", this, this.showBlockAd);
        }
    }

    private onDoubleGlod() {
        SoundManager.getInstance().playEffect("button", 1);
        this.spDouble.visible = !this.spDouble.visible;
        if (this.spDouble.visible) {
            let nReal = this.nGlodAdd * this.nGlodRadio;
            BitmapLabelUtils.setLabel(this.spGlodAdd, nReal.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
        } else {
            BitmapLabelUtils.setLabel(this.spGlodAdd, this.nGlodAdd.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
        }
    }

    /**标识微信上是否分享点击显示过更多游戏 */
    private wxShareShowMoreGame: boolean = false;
    /**分享 */
    private successShareGame() {
        let self = this;
        SoundManager.getInstance().playEffect("button", 1);
        // if (DeviceUtil.isWXMiniGame()) {
        //     // MiniManeger.instance.shareAppMessage({
        //     //     thisObj: self, sucFun: () => {
        //     //         if (!self.wxShareShowMoreGame) {
        //     //             self.wxShareShowMoreGame = true;
        //     //             //ViewManager.getInstance().showView(MoreGameOperRequest);
        //     //         }
        //     //     }, failFun: () => {
        //     //         if (!self.wxShareShowMoreGame) {
        //     //             self.wxShareShowMoreGame = true;
        //     //             //ViewManager.getInstance().showView(MoreGameOperRequest);
        //     //         }
        //     //     }
        //     // });
        //     MiniManeger.instance.bFlagDouYin = false;
        //     MiniManeger.instance.shareAppMessage();
        //     return
        // }
        MiniManeger.instance.bFlagDouYin = false;
        MiniManeger.instance.shareAppMessage();
    }

    /**
     * 显示积木广告
     */
    private showBlockAd(isShow: boolean): void {
        if (isShow) {
            MiniManeger.instance.showBlockAd();
        } else {
            MiniManeger.instance.hideBlockAd();
        }
    }

    /**重新开始 */
    private successReStart() {
        SoundManager.getInstance().playEffect("button", 1);
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
            return
        }
        //扣除体力
        PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
        //重新开始游戏
        ViewChangeManager.getInstance().restartGame(true);
        MiniManeger.instance.bFlagSpecialView = true
        this.removeSelf();
    }

    private isShowBox: boolean = false;
    /**接受奖励 */
    private successRecvAward() {
        let self = this
        SoundManager.getInstance().playEffect("button", 1);
        if (DeviceUtil.isQQMiniGame() && !self.isShowBox && Math.random() < BaseConst.infos.gameInfo.succShowBox) {//qq 开关有开启结算弹起盒子广告
            MiniManeger.instance.hideBlockAd();
            MiniManeger.instance.showBoxAd(() => {
                self.isShowBox = true;
                MiniManeger.instance.showBlockAd();
            });
            return
        }

        if (this.bRecvAward) {  //体力不足的情况才会领取了奖励还在当前界面
            //领完奖励执行切换到下一关的逻辑
            this.successfulEntryThreeNextLevel();
            return
        }

        if (this.spDouble.visible) {
            this.imageRecv.off(Laya.Event.CLICK, this, this.successRecvAward);
            MiniManeger.instance.playViderAd({
                successFun: () => {
                    this.sendAwardAfterWatchVideo();
                    this.imageRecv.on(Laya.Event.CLICK, this, this.successRecvAward);
                },
                failFun: () => {
                    this.imageRecv.on(Laya.Event.CLICK, this, this.successRecvAward);
                },
                errorFun: () => {
                    this.imageRecv.on(Laya.Event.CLICK, this, this.successRecvAward);
                }
            });
        } else {
            this.nGlodRadio = 1;
            this.sendAwardAfterWatchVideo();
        }
    }

    /**看视频成功后获得奖励 */
    private sendAwardAfterWatchVideo() {
        this.bRecvAward = true;
        this.flayGlodSuccess();
        let nGlodAddTemp = this.nGlodAdd * this.nGlodRadio;
        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodAddTemp);
        //领完奖励执行切换到下一关的逻辑
        this.successfulEntryThreeNextLevel();
    }

    /**下一关 */
    private successfulEntryThreeNextLevel() {
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
            return
        } else {
            this.removeEvent();
            if (DeviceUtil.isWXMiniGame()) {
                if (!this.bRecvAward) {
                    // Laya.timer.once(1000, this, () => {
                    //     MoreGameOperRequest.bGotoNextGame = true;
                    //     ViewManager.getInstance().showView(MoreGameOperRequest);
                    //     this.removeSelf();
                    // });
                } else {
                    // MoreGameOperRequest.bGotoNextGame = true;
                    // ViewManager.getInstance().showView(MoreGameOperRequest);
                    // this.removeSelf();
                }
            } else {
                //扣除体力
                PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                ViewChangeManager.getInstance().goToNextLevel();
                MiniManeger.instance.bFlagSpecialView = true
                this.removeSelf();
            }
        }
    }

    /**返回主页 */
    private returnToGameHome() {
        SoundManager.getInstance().playEffect("button", 1);
        if (DeviceUtil.isWXMiniGame()) {
            if (PlayerDataManager.getInstance().bIsNewPlayer || BaseConst.infos.gameInfo.openPsAward == 0 ||
                BaseConst.infos.gameInfo.glodegg == 0) {
                MoreGameRandomGameBox713.toHome = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                //2020.7.13-4
                MiniManeger.instance.bFlagSpecialView = true;
                this.removeSelf();
                return
            }
        }

        ViewChangeManager.getInstance().CurLevelBase.closeGameView();
        PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
        LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getCurLevelToChallenge());
        AddPsView.bCloseBinner = false;
        MiniManeger.instance.bFlagSpecialView = true
        this.removeSelf();
    }


    private startSuccessImageBtShareAni() {
        if (!this.bIsRunning) {
            return;
        }
        Laya.Tween.clearAll(this.imageBtShare);
        Laya.Tween.to(this.imageBtShare, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageBtShare, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startSuccessImageBtShareAni);
            }));
        }));
    }

    /**飞金币 */
    private flayGlodSuccess() {
        let stPoint = new Laya.Point();
        stPoint.x = this.imageGoodsTypeUp.x;
        stPoint.y = this.imageGoodsTypeUp.y;
        let stBoxParent = this.imageGoodsTypeUp.parent as Laya.Box;
        stPoint = stBoxParent.localToGlobal(stPoint);
        AnimationManager.instance.flayGlod(stPoint.x, stPoint.y, 341, 105);
    }

    public createSkeleton(url: string): Promise<Laya.Skeleton> {
        return new Promise<Laya.Skeleton>((resolve) => {
            AnimationManager.instance.showSkeletonAnimation(url, (boomAnimation: Laya.Skeleton) => {
                this.aniReal = boomAnimation;
                this.aniReal.player.playbackRate = 1;
                this.aniReal.autoSize = true;
                this.aniReal.scale(1, 1);
                this.aniReal.play(0, false);
                this.aniReal.x = this.grp_center.width / 2;
                this.aniReal.y = this.grp_center.height / 2;
                this.grp_center.addChild(this.aniReal);
                resolve(boomAnimation)
            }, 1);
        })

    }

    /**平台的区分的特殊界面初始化 */
    private
    /**头条的特殊界面初始化 */
    private initPlView() {
        if (DeviceUtil.isTTMiniGame()) {
            // this.imageShareGameName.skin = "resource/assets/img/ui/success/failure_word_8.png";
            // this.imageShareIcon.skin = "resource/assets/img/common/succeed_icon_3.png";
            // this.imageShareGameName.y = 15;
            // this.shareGlodCount.visible = true;
            // this.ttGoodsType.visible = true;
            // this.ttSpecial.visible = true;
            /**刷新分享的金币 */
            // let nGlodCount = 50;
            // let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
            // if(stGameConfig){
            //     nGlodCount = parseInt(stGameConfig.strValue)
            // }
            // BitmapLabelUtils.setLabel(this.shareGlodCount, nGlodCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
            this.imageShareGameName.skin = "resource/assets/img/ui/success/failure_word_2.png";
            this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
            this.shareGlodCount.visible = false;
            this.ttGoodsType.visible = false;
            this.ttSpecial.visible = false;
            this.imageShareGameName.y = 38;
            this.imageShareGameName.right = 30;
            this.imageShareIcon.left = 30;
        } else {
            this.imageShareGameName.skin = "resource/assets/img/ui/success/failure_word_2.png";
            this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
            this.shareGlodCount.visible = false;
            this.ttGoodsType.visible = false;
            this.ttSpecial.visible = false;
            this.imageShareGameName.y = 38;
            this.imageShareGameName.right = 30;
            this.imageShareIcon.left = 30;
        }
    }

    /**看视频领奖非金币的动画 */
    private flayGlodRecv() {
        console.log("flayGlodRecv");
        let pPoint = new Laya.Point();
        pPoint.x = this.ttGoodsType.x;
        pPoint.y = this.ttGoodsType.y;
        let stParent = this.ttGoodsType.parent as Laya.Image;
        pPoint = stParent.localToGlobal(pPoint);
        AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
    }

    /**控制更多游戏的函数 */
    private proceMoreGame() {
        // //微信平台
        // if (DeviceUtil.isTTMiniGame()) {
        //     this.refreshTTMoreGame();
        //     this.imageWeCatMoreGame.visible = true;
        // } else
        if (DeviceUtil.isWXMiniGame()) {
            this.initPl();
        }
        //TO DO  其他平台
        //……
    }

    private nBtNextLevel: number = 360;
    private nBtNextLevelSp: number = 50;
    public box_wecat: Laya.Box;
    public initPl() {
        if (DeviceUtil.isWXMiniGame()) {
            this.box_wecat.visible = true;
            this.box_wecat.removeChildren();
            this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView());
            this.box_double.visible = false;
            this.btNextLevel.visible = true;

            this.imageBtShare.visible = false;
            this.imageRecv.visible = false;
            this.imageWeCatMoreGame.visible = false;
            this.imageRecv.bottom = 400;
            this.imageBtShare.bottom = 400;
            if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                //this.btNextLevel.visible = true;
                this.btNextLevel.bottom = this.nBtNextLevelSp;
                MiniManeger.instance.bFlagSpecialView = false;
                MiniManeger.instance.hideBanner();
                return;
            } else {
                this.btNextLevel.bottom = this.nBtNextLevel;
            }
        }
        MiniManeger.instance.showBannerAd();
    }

      
    /**微信进入下一关的处理 */
    private weCatGotoNextLevel() {
        SoundManager.getInstance().playEffect("button", 1);

        this.bRecvAward = true;
        this.flayGlodSuccess();
        //2020.7.13
        //if(MiniManeger.instance.isWxMiniGameForOperReq()){
        this.nGlodRadio = 1;
        // }
        let nGlodAddTemp = this.nGlodAdd * this.nGlodRadio;
        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodAddTemp);

        let numCost = 1;
        // let objData = Config.getInstance().getGCDBID(8);
        // if (objData) {
        //     numCost = parseInt(objData.strValue);
        // }
        let self = this
        let fun = () => {
            MoreGameRandomGameBox713.bGotoNextGame = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            MiniManeger.instance.bFlagSpecialView = true;
            self.removeSelf();
        }
        //检测体力是否足够
        let bln = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, numCost);
        if (!bln) {
            ViewChangeManager.getInstance().onPowerNotEnough();
            return;
        } else {
            this.removeEvent();
            if (LevelManager.getInstance().nCurLevel == 1) {
                MoreGameRandomGameBox713.bGotoNextGame = true;
            } else if (LevelManager.getInstance().nCurLevel >= 2) {
                MoreGameRandomGameBox713.bGotoNextGame = true;
                MoreGameRandomGameBox713.bEnterHotBox = true;
            }
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            //2020.7.13-4
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        }
    }
}