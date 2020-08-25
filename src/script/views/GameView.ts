import GameStateManager from "../games/GameStateManager";
import { EnterGameType } from "../games/CommonDefine";
import ViewChangeManager from "../games/ViewChangeManager";
import GameEvent from "../games/GameEvent";
import { PlayerDataManager } from "../common/GameDataManager";
import ConfigManager from "../games/ConfigManager";
import { LevelManager } from "../manager/LevelManager";
import SoundManager from "../common/SoundManager";
import { MiniManeger } from "../minigame/MiniManeger";
import AddPsView from "./game/AddPsView";
import PlatformDY from "../../PlatformDY";
import GuessLike from "./game/wecat/GuessLike";
import WeCatMoreGameView from "./game/wecat/WeCatMoreGameView";

export default class GameView extends BaseSceneUISkinPopView {
    className_key = "GameView";
    public bg_img_res = null

    //public grp_center:Laya.Box;
    public grp_center: Laya.Box;
    public boxBtList: Laya.Box;
    public imageBtGotoNextLevel: Laya.Image;
    public imageBtTip: Laya.Image;
    public imageBtRestart: Laya.Image;
    public imageBtToHome: Laya.Image;
    public hBoxIndex: Laya.HBox;
    public box_choose: Laya.Box;
    public icon_chooseLeft: Laya.Image;
    public icon_chooseRight: Laya.Image;
    public icon_left: Laya.Image;
    public icon_right: Laya.Image;
    public spNum: Laya.Sprite;
    public imageSpFull: Laya.Image;
    public imageBtAttSp: Laya.Image;
    public stLableTime: Laya.Label;
    public imageBtGoldAdd: Laya.Image;
    public glodNum: Laya.Sprite;
    public spLevelLeft: Laya.Sprite;
    public spLevelRight: Laya.Sprite;
    public icon_chooseLeft_shdow: Laya.Image;
    public icon_chooseRight_shdow: Laya.Image;
    public imageHand: Laya.Image;
    public boxLevelInfo: Laya.HBox;
    public imageTTVideo: Laya.Image;
    public icon_choseCoverUpRight: Laya.Image;
    public icon_choseCoverUpLeft: Laya.Image;
    public image_wm: Laya.Image;

    //一些数据控制
    public bHanderAniShow: boolean;
    public bIsRunning: boolean;

    //当前关卡是否已经结束
    public bLevelOver: boolean;

    constructor() {
        super();
        this.bHanderAniShow = false;
        this.bIsRunning = false;
        this.bLevelOver = false;
        this.skin = "game/GameView.json";

    }

    protected childrenCreated(): void {
        super.childrenCreated();
        let self = this;
        if (!self.guessLike && DeviceUtil.isWXMiniGame()) {//微信需要增加滑动推荐
            MiniManeger.instance.createGuessLike(self).then((guessLike) => {
                if (PlatformDY.gameListInfos.length <= 0) {
                    return;
                }
                self.guessLike = guessLike;
                self.guessLike.x = (Laya.stage.width - self.guessLike.width) / 2;
                self.guessLike.y = 250;
            });
        }

    }
    private guessLike: GuessLike;//推广位
    onAddStage(): void {
        AddPsView.bCloseBinner = true;
        MiniManeger.instance.showInterstitialAd();
        EventMgr.getInstance().addEvent(GameEvent.CHANGE_VIDEO_IMAGE, this, this.stopVideoImage);
        this.initView();
        this.addEvent();
        if (DeviceUtil.isTTMiniGame()) {
            MiniManeger.instance.hideBanner();
        } else if (DeviceUtil.isQQMiniGame()) {
            MiniManeger.instance.showBannerAd();
        } else if (DeviceUtil.isWXMiniGame()) {
            //MiniManeger.instance.hideBanner();
        }
    }

    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
        this.bIsRunning = false;
        Laya.Tween.clearAll(this.imageBtTip);
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.choosesuper_light);
        Laya.Tween.clearAll(this.starOne);
        Laya.Tween.clearAll(this.starTwo);
        Laya.Tween.clearAll(this.image_wm);
    }


    private initView() {
        this.initPlView();
        this.bLevelOver = false;
        this.bIsRunning = true;
        //this.refreshUpIndeInfo(2,3);
        this.refreshChoose();
        this.startimageBtTipAni();
        // this.refreshSPValue();
        // this.refreshGoldValue();
        // this.refreshTimeView();
        this.imageBtTip.visible = false;
        this.imageBtGotoNextLevel.visible = false;
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.visible = true;
            this.startWmAni();
        }
        this.rotationLight();
        this.lunchStarAni();
    }


    /**初始化一下选择的的显示 */
    public refreshChoose() {
        this.box_choose.visible = false;
        this.initViewInfo();
    }


    private addEvent() {
        this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
        this.imageBtTip.on(Laya.Event.CLICK, this, this.onGameViewShareGame);
        this.imageBtRestart.on(Laya.Event.CLICK, this, this.gameViewRestartGame);
        this.imageBtGotoNextLevel.on(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    private removeEvent() {
        this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
        this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        this.imageBtTip.off(Laya.Event.CLICK, this, this.onGameViewShareGame);
        this.imageBtRestart.off(Laya.Event.CLICK, this, this.gameViewRestartGame);
        this.imageBtGotoNextLevel.off(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
        EventMgr.getInstance().removeEvent(GameEvent.CHANGE_VIDEO_IMAGE, this, this.stopVideoImage);
        //this.removeEnentUpdateView();
        if (DeviceUtil.isWXMiniGame()) {
            this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
        }
    }

    /**下一关 */
    private onGameViewWatchVideoNextLevel() {
        SoundManager.getInstance().playEffect("button", 1);
        this.imageBtGotoNextLevel.off(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
        MiniManeger.instance.playViderAd({
            successFun: () => {
                this.onGameViewNextLevel();
                this.imageBtGotoNextLevel.on(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            },
            failFun: () => {
                this.imageBtGotoNextLevel.on(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            },
            errorFun: () => {
                this.imageBtGotoNextLevel.on(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            }
        });

    }

    private onGameViewNextLevel() {
        if (this.bLevelOver) {
            return;
        }
        ViewChangeManager.getInstance().goToNextLevel();
    }


    /**重新开始游戏 */
    private gameViewRestartGame() {
        SoundManager.getInstance().playEffect("button", 1);
        if (this.bLevelOver) {
            return;
        }
        ViewChangeManager.getInstance().restartGame(true);
    }


    /**返回主页 */
    private returnToGameHome() {
        SoundManager.getInstance().playEffect("button", 1);
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
        ViewChangeManager.getInstance().CurLevelBase.returnToGameHome();
        this.removeSelf();
    }

    public onClick(evt: Laya.Event) {
        SoundManager.getInstance().playEffect("button", 1);
        let tar = (evt.currentTarget as Laya.Image)
        let data = this.viewData_.data;
        let icon_name = ''
        switch (evt.currentTarget) {
            case this.icon_chooseLeft:
                icon_name = data.chooseLeftName;
                this.chooseLeft = 'left';
                this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);//关闭右边的事件
                this.icon_choseCoverUpLeft.visible = true;
                break;
            case this.icon_chooseRight:
                icon_name = data.chooseRightName;
                this.chooseLeft = 'right';
                this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);//关闭左边的点击事件
                this.icon_choseCoverUpRight.visible = true;
                break;
            // case this.icon_chooseSuper:
            //     icon_name = data.superName;
            //     this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClick);//关闭左边的点击事件
            //     break;
        }
        this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        ViewChangeManager.getInstance().CurLevelBase.isPop = false;
        this.viewData_.callBack(icon_name == data.rightName, icon_name);
        // tar.skin = 'resource/assets/img/level/baseboard2.png';
        //this.mouseEnabled = false;
        this.imageBtTip.visible = false;
        this.imageBtGotoNextLevel.visible = false;
        //重置一下手相关的数据
        // this.initViewInfo();
    }

    public onClickSuper() {
        this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        let self = this;

        MiniManeger.instance.playViderAd({
            successFun: () => {
                if (DeviceUtil.isTTMiniGame) {
                    Laya.timer.once(100, this, () => {
                        self.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, self, self.onClick);//关闭左边的点击事件
                        ViewChangeManager.getInstance().CurLevelBase.isPop = false;
                        self.viewData_.callBack(true, self.viewData_.data.superName);
                        self.imageBtTip.visible = false;
                        self.imageBtGotoNextLevel.visible = false;
                    })
                }else{
                    self.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, self, self.onClick);//关闭左边的点击事件
                    ViewChangeManager.getInstance().CurLevelBase.isPop = false;
                    self.viewData_.callBack(true, self.viewData_.data.superName);
                    self.imageBtTip.visible = false;
                    self.imageBtGotoNextLevel.visible = false;
                }
            },
            failFun: () => {
                self.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                self.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                self.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, self, self.onClickSuper);
            },
            errorFun: () => {
                self.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                self.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                self.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, self, self.onClickSuper);
            }
        });
    }

    public chooseLeft: 'left' | "right" = null

    /**
     * 显示正确或者错误
     */
    public showResultIcon(isRight: boolean) {
        this.createChooseAnswer(isRight)
        if (isRight) {
            SoundManager.getInstance().playEffect("right", 1);
            Laya.timer.once(1000, this, () => {

                this.hideChoseView()
            })
        } else {
            SoundManager.getInstance().playEffect("wrong", 1);
        }
    }

    public createChooseAnswer(isRight: boolean) {
        let tar: Laya.Image;
        let skin = 'resource/assets/img/ui/game/gameinterface_icon_4.png';
        if (!isRight) {
            skin = 'resource/assets/img/ui/game/gameinterface_icon_5.png';
        }
        if (this.chooseLeft == 'left') {
            tar = this.icon_choseCoverUpLeft;
        } else {
            tar = this.icon_choseCoverUpRight;

        }
        let img = new Laya.Image();
        img.skin = skin;
        img.centerX = img.centerY = 0;
        tar.addChild(img);
    }

    public showChoseView(data: any) {
        this.imageBtTip.visible = true;
        this.imageBtGotoNextLevel.visible = true;
        //展示的时候初始化数据
        this.initViewInfo();
        this.viewData_ = data;
        //选项框初始化
        this.initChooseView();
        this.box_choose.visible = true;
        this.refreshViewChose();
        this.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        //ViewChangeManager.getInstance().CommonView.removeBtEvent();
    }


    public hideChoseView() {
        this.imageBtTip.visible = false;
        this.imageBtGotoNextLevel.visible = false;
        Laya.Tween.to(this.box_choose, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.backIn);
        this.box_choose.visible = false;
        this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
        this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        //隐藏的时候初始化数据的时候初始化数据
        this.initViewInfo();
        // ViewChangeManager.getInstance().CommonView.addBtEvent();
    }

    public icon_super: Laya.Image;
    public refreshViewChose() {
        //this.mouseEnabled = true;
        this.box_choose.scale(0.2, 0.2);
        Laya.Tween.to(this.box_choose, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backIn);
        //this.icon_chooseRight.skin = 'resource/assets/img/level/baseboard1.png';
        this.icon_choseCoverUpRight.removeChildren();
        //this.icon_chooseRight.removeChildren();
        this.icon_choseCoverUpLeft.removeChildren();
        //this.icon_chooseLeft.skin = 'resource/assets/img/level/baseboard1.png';
        //this.icon_chooseLeft.removeChildren();
        this.icon_choseCoverUpRight.visible = false;
        this.icon_choseCoverUpLeft.visible = false;
        this.icon_left.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_chooseLeft + '.png'
        this.icon_right.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_chooseRight + '.png';
        if (this.viewData_.data.icon_super != null) {
            this.icon_super.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_super + '.png';
        }
    }

    public removeSelf() {
        // GameManager.instance.showTopBar(ShowType.showAll)
        return super.removeSelf();
    }


    /****************************游戏顶部的节数更新**************************** */
    public refreshUpIndeInfo(nIndexCur: number, nIndexMax: number) {
        let nIndexTemp = 0;
        //刷新左右两边的关卡数值
        let nCur = PlayerDataManager.getInstance().stPlayerDataBase.nCurLevel;
        nCur = nCur >= PlayerDataManager.getInstance().nMaxLevelCount ? PlayerDataManager.getInstance().getCurLevelMax() - 1 : nCur;
        this.spLevelLeft.destroyChildren();
        this.spLevelRight.destroyChildren();
        let nNumLefc = 0;
        let nNumRight = 0;
        nNumLefc = this.spLevelLeft.numChildren;
        nNumRight = this.spLevelRight.numChildren;

        // //为了头条提审的修改
        //if(DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0){
        // if(BaseConst.infos.gameInfo.openPsAward == 0){
        //     if(PlayerDataManager.getInstance().stPlayerDataBase.nCurLevel != PlayerDataManager.getInstance().getCurLevelMax()){
        //         nCur -= 1;
        //         nCur  = nCur < 0 ? 0 : nCur;
        //     }
        // }

        nNumLefc = nCur + 1;
        nNumRight = nCur + 2;
        //如果没达到最大关卡就显示
        if (!PlayerDataManager.getInstance().allCustomsClearance()) {
            this.spLevelLeft.visible = true;
            this.spLevelRight.visible = true;
            BitmapLabelUtils.setLabel(this.spLevelLeft, nNumLefc.toString(), "resource/assets/img/ui/game/gameinterface_number1/gameinterface_number1_", 0, ".png", "center");
            BitmapLabelUtils.setLabel(this.spLevelRight, nNumRight.toString(), "resource/assets/img/ui/game/gameinterface_number1/gameinterface_number1_", 0, ".png", "center");
        } else {
            this.spLevelLeft.visible = false;
            this.spLevelRight.visible = false;
        }
        nNumLefc = this.spLevelLeft.numChildren;
        nNumRight = this.spLevelRight.numChildren;
        let nCount = this.hBoxIndex.numChildren;
        for (let i = 0; i < nCount; ++i) {
            let stImageInfo = this.hBoxIndex.getChildAt(i) as Laya.Image;
            if (stImageInfo) {
                //显示小结
                if (i < nIndexMax) {
                    stImageInfo.visible = true;
                } else {
                    stImageInfo.visible = false;
                }
                //显示小结完成的进度
                let pImageFinish = stImageInfo.getChildAt(0) as Laya.Image;
                if (pImageFinish) {
                    if (i < nIndexCur) {
                        pImageFinish.visible = true;
                        ++nIndexTemp;
                    } else {
                        pImageFinish.visible = false;
                    }
                }
            }
        }
        if (nIndexTemp >= nIndexMax) {
            this.bLevelOver = true;
        }
        //刷新下长度
        this.boxLevelInfo.width = 108 + 20 + this.hBoxIndex.width + 20 + 108;
    }

    /**提示相关的功能*/
    private onGameViewShareGame() {
        SoundManager.getInstance().playEffect("button", 1);
        if (!this.box_choose.visible && !this.bHanderAniShow) {
            console.log("box choose not show!");
            return;
        }
        //TODO 分享
        if (DeviceUtil.isMiniGame()) {
            let self = this;
            MiniManeger.instance.bFlagDouYin = false;
            MiniManeger.instance.shareAppMessage({
                sucFun: () => {
                    self.onShareGameSuccess();
                }
            });
        } else {
            this.onShareGameSuccess();
        }

    }

    /**分享成功后的操作 */
    private onShareGameSuccess() {
        let data = ViewChangeManager.getInstance().CurLevelBase.getCurChooseInfo();
        let nHandX = 0;
        let nHandY = 0;
        if (!data) {
            return;
        }
        if (data.chooseLeftName == data.rightName) { //如果正确值是左边
            //this.icon_chooseRight.skin = 'resource/assets/img/ui/game/gameinterface_baseboard_1.png';
            this.icon_choseCoverUpRight.visible = false;
            this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);//关闭右边的点击事件
            nHandX = this.icon_chooseLeft.x + this.icon_chooseLeft.width / 2;
            nHandY = this.icon_chooseLeft.y + this.icon_chooseLeft.height / 2;
        } else { //反之遮住左边
            // this.icon_chooseLeft.skin = 'resource/assets/img/ui/game/gameinterface_baseboard_1.png';
            this.icon_choseCoverUpLeft.visible = false;
            nHandX = this.icon_chooseRight.x + this.icon_chooseRight.width / 2;
            nHandY = this.icon_chooseRight.y + this.icon_chooseRight.height / 2;
            this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);//关闭左边的点击事件
        }
        this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        //显示小手
        this.imageHand.x = nHandX;
        this.imageHand.y = nHandY;
        this.bHanderAniShow = true;
        this.imageHand.visible = true;
        //手的一个小动画
        this.handAni();
    }

    /**小手的动画 */
    private handAni() {
        if (!this.bHanderAniShow) {
            return;
        }
        this.imageHand.skin = "resource/assets/img/ui/game/gameinterface_icon_1.png";
        Laya.timer.once(500, this, () => {
            this.imageHand.skin = "resource/assets/img/ui/game/gameinterface_icon_2.png";
            Laya.timer.once(500, this, this.handAni);
        })
    }
    /**初始化数据 */
    private initViewInfo() {
        // this.icon_chooseLeft_shdow.visible = false;
        // this.icon_chooseRight_shdow.visible = false;
        this.imageHand.visible = false;
        this.bHanderAniShow = false;
        this.bLevelOver = false;
    }

    private startimageBtTipAni() {
        if (!this.bIsRunning) {
            return;
        }
        Laya.Tween.clearAll(this.imageBtTip);
        Laya.Tween.to(this.imageBtTip, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageBtTip, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startimageBtTipAni);
            }));
        }));
    }

    /**头条平台的界面初始化 */
    private initPlView() {
        if (DeviceUtil.isTTMiniGame()) {
            this.imageTTVideo.visible = true;
        }
    }

    /**开始录屏的界面设置*/
    public startVideoImage() {
        this.imageTTVideo.skin = "resource/assets/img/common/gaming_icon_4.png";
    }

    /**关闭视频录制 */
    public stopVideoImage() {
        console.log("stopVideoImage");
        this.imageTTVideo.skin = "resource/assets/img/common/gaming_icon_5.png";
    }

    /**超级选项框 */
    public choosesuper_light: Laya.Image;
    public icon_chooseSuper: Laya.Image;
    public initChooseView() {
        if (this.viewData_.data.superName == null) {
            this.icon_chooseRight.left = 584;
            this.icon_chooseLeft.left = 267;
            this.choosesuper_light.visible = false;
            this.icon_chooseSuper.visible = false;
        } else {
            this.choosesuper_light.visible = true;
            this.icon_chooseSuper.visible = true;
            this.icon_chooseRight.left = 120;
            this.icon_chooseLeft.left = 426;
        }
    }

    /**旋转的动画 */
    private rotationLight() {
        this.choosesuper_light.rotation = 0;
        Laya.Tween.clearAll(this.choosesuper_light);
        Laya.Tween.to(this.choosesuper_light, { rotation: 360 }, 3000, null, Laya.Handler.create(this, (args) => {
            this.rotationLight();
        }));
    }

    /**两颗星星 */
    public starOne: Laya.Image;
    public starTwo: Laya.Image;
    private starAni(imageObj: Laya.Image) {
        Laya.Tween.clearAll(imageObj);
        Laya.Tween.to(imageObj, { alpha: 0 }, 1000, null, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(imageObj, { alpha: 1 }, 1000, null, Laya.Handler.create(this, (args) => {
                this.starAni(imageObj);
            }));
        }));
    }

    private lunchStarAni() {
        this.starAni(this.starOne);
        Laya.timer.once(1000, this, () => {
            this.starAni(this.starTwo);
        })
    }

    private startWmAni() {
        Laya.Tween.clearAll(this.image_wm);
        Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startWmAni);
            }));
        }));
    }

    private pWeCatMoreGameView: WeCatMoreGameView;
    private imageWeCatMoreGame:Laya.Image;
    private initOperView() {
        //2020.7.13-2
        if (DeviceUtil.isWXMiniGame()) {
            if (PlayerDataManager.getInstance().bIsNewPlayer) {
                Laya.timer.once(1000, this, () => {
                    this.pWeCatMoreGameView = ViewManager.getInstance().showView(WeCatMoreGameView) as WeCatMoreGameView;
                    //this.registerEvent(this.imageWeCatMoreGame, Laya.Event.CLICK, this.weCatViewOper, this);
                    this.imageWeCatMoreGame.on(Laya.Event.CLICK, this, this.weCatViewOper);
                    this.imageWeCatMoreGame.visible = true;
                });
            } else {
                this.imageWeCatMoreGame.visible = true;
                this.imageWeCatMoreGame.on(Laya.Event.CLICK, this, this.weCatViewOper);
            }
        }
        // else {
        //     this.registerEvent(this.imageWeCatMoreGame,Laya.Event.CLICK,this.weCatViewOper,this);
        // }
    }


    //2020.7.13-2
    private weCatViewOper() {
        this.pWeCatMoreGameView = ViewManager.getInstance().showView(WeCatMoreGameView) as WeCatMoreGameView;
    }

    public closeWeCatMoreGameView(){
        if (!DeviceUtil.isWXMiniGame()) {
            return;
        }
        if (WeCatMoreGameView.isOpen && this.pWeCatMoreGameView) {
            this.pWeCatMoreGameView.removeSelf();
        }
    }
}