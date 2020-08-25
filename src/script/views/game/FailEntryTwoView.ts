import ViewChangeManager from "../../games/ViewChangeManager";
import GameStateManager from "../../games/GameStateManager";
import { EnterGameType, GoodsType } from "../../games/CommonDefine";
import { LevelManager } from "../../manager/LevelManager";
import { PlayerDataManager } from "../../common/GameDataManager";
import ConfigManager from "../../games/ConfigManager";
import SoundManager from "../../common/SoundManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import AnimationManager from "../../manager/AnimationManager";
import GameEvent from "../../games/GameEvent";
import { GameData } from "../../common/GameData";
import AddPsView from "./AddPsView";
import PlatformDY from "../../../PlatformDY";
import { GameManager } from "../../manager/GameManager";
import MoreGameRandomGameBox713 from "./wecat/MoreGameRandomGameBox713";
import WeCatMoreGameItemOne from "./wecat/WeCatMoreGameItemOne";

export default class FailEntryTwoView extends BaseSceneUISkinPopView {
    public className_key = "FailEntryTwoView";
    protected grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;

    private box_content: Laya.Box;
    public imageRecv: Laya.Image;
    public imageGoodsType: Laya.Image;
    public btLable: Laya.Label;
    public imageBtRestart: Laya.Image;
    public imageBtShare: Laya.Image;
    public boxGameData: Laya.Box;
    public imageBtToHome: Laya.Image;
    public spCount: Laya.Sprite;
    public spCost: Laya.Sprite;
    public imageShareName: Laya.Image;

    private nGlodAddByWathcVideo: number;
    private bIsRunning: boolean;
    private shareGlodCount: Laya.Sprite;
    private imageShareIcon: Laya.Image;

    private ttGoodsType: Laya.Image;
    private ttSpecial: Laya.Sprite;

    public imageWeCatMoreGame: Laya.Image;
    public panelWeCatMoreGame: Laya.Panel;

    private moreGamePanel2: Laya.Box;
    public moreGamePanel: Laya.Box;


    private bRecvAward: boolean
    private bShareAward: boolean

    constructor() {
        super();
        this.nGlodAddByWathcVideo = 200;
        this.bIsRunning = false;
        this.bRecvAward = false;
        this.bShareAward = false
        this.skin = 'game/uiView/FailEntryTwoView.json';
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
        MiniManeger.instance.showInterstitialAd();
        this.initView();
        this.addEvent();
        MiniManeger.instance.showBannerAd();
        // MiniManeger.instance.showBlockAd();
    }

    public onRemoved() {
        super.onRemoved();
        // MiniManeger.instance.hideBlockAd();
        this.removeEvent();
        this.bIsRunning = false;
        this.bRecvAward = false;
        Laya.Tween.clearAll(this.imageBtShare);
        Laya.timer.clearAll(this);

    }

    private addEvent() {
        this.imageBtRestart.on(Laya.Event.CLICK, this, this.failEntryTwoReStartGame);
        this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
        this.imageBtShare.on(Laya.Event.CLICK, this, this.failSharGame);
        this.imageRecv.on(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
        //this.btLable.on(Laya.Event.CLICK, this, this.failSharGame);
        EventMgr.getInstance().addEvent(GameEvent.EVENT_FLAY_GLOD, this, this.flayGlodFileShare);

        if (DeviceUtil.isTTMiniGame()) {
            this.panelWeCatMoreGame.on(Laya.Event.CLICK, this, this.onShowMoreGame);
        }
        if (DeviceUtil.isQQMiniGame()) {
            EventMgr.getInstance().addEvent("SuccBlockShow", this, this.showBlockAd);
        }
    }

    private removeEvent() {
        this.imageBtRestart.off(Laya.Event.CLICK, this, this.failEntryTwoReStartGame);
        this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
        this.imageBtShare.off(Laya.Event.CLICK, this, this.failSharGame);
        this.imageRecv.off(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
        //this.btLable.off(Laya.Event.CLICK, this, this.failSharGame);
        EventMgr.getInstance().removeEvent(GameEvent.EVENT_FLAY_GLOD, this, this.flayGlodFileShare);
        if (DeviceUtil.isTTMiniGame()) {
            this.panelWeCatMoreGame.off(Laya.Event.CLICK, this, this.onShowMoreGame);
        }

        if (DeviceUtil.isQQMiniGame()) {
            EventMgr.getInstance().removeEvent("SuccBlockShow", this, this.showBlockAd);
        }
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

    /**标识微信上是否分享点击显示过更多游戏 */
    private wxShareShowMoreGame: boolean = false;
    /**分享游戏 */
    private failSharGame() {
        let self = this;
        SoundManager.getInstance().playEffect("button", 1);
        if (DeviceUtil.isWXMiniGame()) {
            // MiniManeger.instance.shareAppMessage({
            //     thisObj: self, sucFun: () => {
            //         if (!self.wxShareShowMoreGame) {
            //             self.wxShareShowMoreGame = true;
            //             ViewManager.getInstance().showView(MoreGameOperRequest713);
            //         }
            //     }, failFun: () => {
            //         if (!self.wxShareShowMoreGame) {
            //             self.wxShareShowMoreGame = true;
            //             ViewManager.getInstance().showView(MoreGameOperRequest);
            //         }
            //     }
            // });
            MiniManeger.instance.shareAppMessage();
            return
        }
        if (DeviceUtil.isTTMiniGame()) {
            if (this.bShareAward) {
                TipsManager.getInstance().showDefaultTips("已经领过奖励了哦");
                return;
            }
            this.removeEvent();
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN') {
                MiniManeger.instance.bFlagDouYin = true;
                MiniManeger.instance.shareAppMessage({
                    sucFun: () => {
                        console.log("发布录制视频成功");
                        this.bShareAward = true;
                        this.addEvent();
                        TipsManager.getInstance().showDefaultTips('分享成功');
                        if (MiniManeger.instance.onShareVideoSuccess) {
                            return;
                        }
                        let nGlodCount = 50;
                        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
                        if (stGameConfig) {
                            nGlodCount = parseInt(stGameConfig.strValue);
                        }
                        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodCount);
                        MiniManeger.instance.onShareVideoSuccess = true;
                        Laya.timer.once(1000, self, () => {
                            self.flayGlodFileShare();
                        })

                        //EventMgr.getInstance().sendEvent(GameEvent.EVENT_FLAY_GLOD);
                    },
                    failFun: () => {
                        this.addEvent();
                        console.log("发布录制视频失败");
                        TipsManager.getInstance().showDefaultTips('分享失败');
                    }
                });
            } else {
                MiniManeger.instance.onShareVideo({
                    successFun: () => {
                        console.log("发布录制视频成功");
                        this.addEvent();
                        this.bShareAward = true;
                        if (MiniManeger.instance.onShareVideoSuccess) {
                            return;
                        }
                        let nGlodCount = 50;
                        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
                        if (stGameConfig) {
                            nGlodCount = parseInt(stGameConfig.strValue);
                        }
                        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodCount);
                        MiniManeger.instance.onShareVideoSuccess = true;
                        this.flayGlodFileShare();
                    },
                    failFun: () => {
                        console.log("发布录制视频失败");
                        this.addEvent();
                    }
                });
            }
        } else {
            MiniManeger.instance.shareAppMessage();
        }
    }

    /**开始游戏 */
    private failEntryTwoReStartGame() {
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
        AddPsView.bCloseBinner = true;
        //2020.7.13-9
        if (DeviceUtil.isWXMiniGame()) {
            MoreGameRandomGameBox713.bReStartGame = true;
            MoreGameRandomGameBox713.bEnterHotBox = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
        } else {
            //扣除体力
            PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            //重新开始游戏
            ViewChangeManager.getInstance().restartGame(true);
        }

        MiniManeger.instance.bFlagSpecialView = true;
        this.removeSelf();
    }

    /**返回主页 */
    private returnToGameHome() {
        if (DeviceUtil.isWXMiniGame()) {
            MoreGameRandomGameBox713.toHome = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
            return
        }
        SoundManager.getInstance().playEffect("button", 1);
        //PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
        ViewChangeManager.getInstance().CurLevelBase.returnToGameHome();
        MiniManeger.instance.bFlagSpecialView = true;
        this.removeSelf();
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

    /**刷新界面 */
    private initView() {
        this.initPl();
        this.initPanel();
        MiniManeger.instance.onShareVideoSuccess = false;
        this.initPlView();
        this.proceMoreGame();
        this.bIsRunning = true;
        this.bRecvAward = false;
        this.bShareAward = false;
        //刷新视频领取奖励的数值
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(7);
        if (stGameConfig) {
            this.nGlodAddByWathcVideo = parseInt(stGameConfig.strValue);
        }
        BitmapLabelUtils.setLabel(this.spCount, this.nGlodAddByWathcVideo.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");

        //扣除的体力数值
        let nCost = 1;
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
        if (stGameConfig) {
            nCost = parseInt(stGameConfig.strValue);
        }
        BitmapLabelUtils.setLabel(this.spCost, nCost.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");


        //开启放大缩小的动画
        this.startimageBtShareAni();

        GameManager.instance.openLevelVideo(() => {
            GameManager.instance.selAddLottery(this.box_content);
        })
    }

    private startimageBtShareAni() {
        if (DeviceUtil.isWXMiniGame()) {
            return;
        }
        if (!this.bIsRunning) {
            return;
        }
        Laya.Tween.clearAll(this.imageBtShare);
        Laya.Tween.to(this.imageBtShare, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageBtShare, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startimageBtShareAni);
            }));
        }));
    }

    private onWatchVideoRecvAward() {
        console.log("onWatchVideoRecvAward = ", this.bRecvAward);
        if (this.bRecvAward) {
            TipsManager.getInstance().showDefaultTips("已经领过奖励了哦");
            return;
        }
        let self = this;
        this.imageRecv.off(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
        MiniManeger.instance.playViderAd({
            successFun: () => {
                self.bRecvAward = true;
                self.addGlodReal();
                self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
            },
            failFun: () => {
                self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
            },
            errorFun: () => {
                self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
            }
        });
    }

    private addGlodReal() {
        this.bRecvAward = true;
        console.log("addGlodReal = ", this.bRecvAward);
        //增加金币
        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, this.nGlodAddByWathcVideo);
        this.flayGlodRecv();
    }

    /**头条的特殊界面初始化 */
    private initPlView() {
        if (DeviceUtil.isTTMiniGame()) {
            this.imageShareName.skin = "resource/assets/img/ui/success/failure_word_8.png";
            this.imageShareIcon.skin = "resource/assets/img/common/succeed_icon_3.png";
            this.imageShareName.y = 15;
            this.shareGlodCount.visible = true;
            this.ttGoodsType.visible = true;
            this.ttSpecial.visible = true;
            /**刷新分享的金币 */
            let nGlodCount = 50;
            let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
            if (stGameConfig) {
                nGlodCount = parseInt(stGameConfig.strValue)
            }
            BitmapLabelUtils.setLabel(this.shareGlodCount, nGlodCount.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
            this.imageShareName.right = 40;
            this.imageShareIcon.left = 40;
        } else {
            this.imageShareName.skin = "resource/assets/img/ui/success/failure_word_2.png";
            this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
            this.shareGlodCount.visible = false;
            this.ttGoodsType.visible = false;
            this.ttSpecial.visible = false;
            this.imageShareName.y = 38;
            this.imageShareName.right = 40;
            this.imageShareIcon.left = 40;

        }
    }

    /*分享游戏飞金币的动画 */
    private flayGlodFileShare() {
        console.log("flayGlodFileShare");
        let pPoint = new Laya.Point();
        pPoint.x = this.ttGoodsType.x;
        pPoint.y = this.ttGoodsType.y;
        let stParent = this.ttGoodsType.parent as Laya.Image;
        pPoint = stParent.localToGlobal(pPoint);
        AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
        console.log("pPoint.x = ", pPoint.x, "pPoint.y = ", pPoint.y);
    }

    /**看视频领奖非金币的动画 */
    private flayGlodRecv() {
        console.log("flayGlodRecv");
        let pPoint = new Laya.Point();
        pPoint.x = this.imageGoodsType.x;
        pPoint.y = this.imageGoodsType.y;
        let stParent = this.imageGoodsType.parent as Laya.Image;
        pPoint = stParent.localToGlobal(pPoint);
        AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
    }

    /**控制更多游戏的函数 */
    private proceMoreGame() {
        //微信平台
        if (DeviceUtil.isTTMiniGame()) {
            // this.refreshTTMoreGame();
            // this.imageWeCatMoreGame.visible = true;
        } else if (DeviceUtil.isWXMiniGame()) {
        }
    }


    /**微信运营需求初始化 */
    private refreshTTMoreGame() {
        //this.imageWeCatMoreGame.visible = true;
        // if(!DeviceUtil.isWXMiniGame() || !DeviceUtil.isWXMiniGame()){
        //     this.imageWeCatMoreGame.visible = false;
        //     return;
        // }else{
        //     this.imageWeCatMoreGame.visible = true;
        // }
        let nXStart = 70;
        let nXAddTemp = 150;// + 107;
        let nYAddTemp = 180;// + 47;
        let nYStart = 47;
        let aryInfo: number[] = [];
        let nCount = 3;
        aryInfo = this.getRandomIndex();

        let nLen = 8;
        if (DeviceUtil.isWXMiniGame()) {
            nLen = aryInfo.length;
        } else {
            nLen = 9;
            nLen = nLen < aryInfo.length ? nLen : aryInfo.length;
        }
        this.panelWeCatMoreGame.removeChildren();
        for (let i = 0; i < nLen; ++i) {
            let pWeCatMoreGameItemOne: WeCatMoreGameItemOne = this.panelWeCatMoreGame.getChildAt(i) as WeCatMoreGameItemOne;
            if (pWeCatMoreGameItemOne) {
                pWeCatMoreGameItemOne.setData(aryInfo[i]);
            } else {
                pWeCatMoreGameItemOne = new WeCatMoreGameItemOne(aryInfo[i]);
                let nAddX = Math.floor(i % nCount);
                let nYAdd = Math.floor(i / nCount);
                pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 70 * nAddX;
                pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                this.panelWeCatMoreGame.addChild(pWeCatMoreGameItemOne);
                this.scrollSizeMax = 120 * (nYAdd + 1);
                this.nTimePanel = 5000;
            }
        }
        //if (DeviceUtil.isWXMiniGame())
        this.panelScrollAni();
    }
    /**滚动效果 */
    private scrollSizeMax = 50;
    private nTimePanel = 5000;
    private panelScrollAni() {
        Laya.Tween.clearAll(this.panelWeCatMoreGame.vScrollBar);
        Laya.timer.clearAll(this.panelScrollAni);
        // this.panelWeCatMoreGame.vScrollBar.touchScrollEnable =
        //     this.panelWeCatMoreGame.vScrollBar.mouseWheelEnable = false;
        Laya.Tween.to(this.panelWeCatMoreGame.vScrollBar, { value: this.scrollSizeMax }, this.nTimePanel, null, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.panelWeCatMoreGame.vScrollBar, { value: 0 }, this.nTimePanel, null, Laya.Handler.create(this, (args) => {
                this.scrollSizeMax = this.panelWeCatMoreGame.vScrollBar.max;
                Laya.timer.once(0, this, this.panelScrollAni);
            }));
        }));
    }


    /**随机得到8个编号 */

    private getRandomIndex(): number[] {
        if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
            return [];
        }
        let nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
        let nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
        if (nCount > 0) {
            nCount = 3 - nCount;
        }

        nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;

        let aryInfo: number[] = [];
        for (let i = 0; i < nCount; ++i) {
            aryInfo.push(nRandom);
            nRandom += 1;
            if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                nRandom = 0;
            }
        }
        return aryInfo;
    }

    private onShowMoreGame() {
        MiniManeger.instance.showMoreGamesModal();
    }

    private nBtNextLevel: number = 360;
    private nBtNextLevelSp: number = 50;
    public box_wecat: Laya.Box;
    private initPl() {
        if (DeviceUtil.isWXMiniGame()) {
            this.box_wecat.removeChildren();
            this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView());
            this.box_wecat.visible = true;
            // this.imgShare.y = 1417;

            // this.imageBtShare.width = 271;
            // this.imageBtShare.height = 109;
            // this.imageBtShare.pivotX = 271/2;
            // this.imageBtShare.pivotY = 109/2;
            this.imageBtShare.scaleX = 0.6;
            this.imageBtShare.scaleY = 0.6;
            this.imageBtShare.left = 70;
            this.imageBtShare.bottom = 550;
            // this.imgGet.y = 1417;
            // this.imageRecv.width = 271;
            // this.imageRecv.height = 109;
            // this.imageRecv.pivotX = 271/2;
            // this.imageRecv.pivotY = 109/2;
            this.imageRecv.scaleX = 0.6;
            this.imageRecv.scaleY = 0.6;
            // let firstChiled = this.imageRecv.getChildAt(0);
            // if(firstChiled){
            //     firstChiled.removeSelf();
            // }
            this.imageRecv.right = 70;
            this.imageRecv.bottom = 550;
            if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                this.imageBtRestart.bottom = this.nBtNextLevelSp;
                MiniManeger.instance.bFlagSpecialView = false;
                MiniManeger.instance.hideBanner();
                return;
            } else {
                this.imageBtRestart.bottom = this.nBtNextLevel;
            }
        } else {
            MiniManeger.instance.bFlagSpecialView = true;
            MiniManeger.instance.showBannerAd();
        }
    }
}