import ConfigManager from "../../games/ConfigManager";
import { PlayerDataBase, PlayerDataManager } from "../../common/GameDataManager";
import { GoodsType } from "../../games/CommonDefine";
import SoundManager from "../../common/SoundManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import ViewChangeManager from "../../games/ViewChangeManager";
import { GameData } from "../../common/GameData";
import AnimationManager from "../../manager/AnimationManager";

export default class AddPsView extends BaseSceneUISkinPopView {
    className_key = "AddPsView";
    public grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
    public spNum: Laya.Sprite;
    public imageBtGet: Laya.Image;
    public btLable: Laya.Label;
    public btn_close: Laya.Label;

    //无限体力
    public box_qq: Laya.Box;
    public box_index: Laya.Box;
    public box_up: Laya.Box;
    public box_down: Laya.Box;
    public lable_number: Laya.Label;
    public box_lable: Laya.Box;

    private nPsAdd: number;

    public static bCloseBinner: boolean = true;

    constructor() {
        super();
        this.skin = "game/uiView/AddSpView.json";
    }

    protected createChildren(): void {
        super.createChildren();
    }

    onAddStage(): void {
        MiniManeger.instance.showInterstitialAd();
        ViewChangeManager.getInstance().CommonView.removeBtEvent();
        this.initView();
        this.addEvent();
        if (DeviceUtil.isQQMiniGame()) {
            // EventMgr.getInstance().sendEvent("SuccBlockShow", false);
        }
        MiniManeger.instance.showBannerAd();
    }

    onRemoved() {
        this.removeEvent();
        if (DeviceUtil.isQQMiniGame()) {
            // EventMgr.getInstance().sendEvent("SuccBlockShow", true);
        }
        Laya.timer.clearAll(this);
    }

    private initView() {
        /**刷新进度 */
        this.refreshPsLimitLessView();
        //初始化体力的数值
        this.nPsAdd = 5;
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(3);
        if (stGameConfig) {
            this.nPsAdd = parseInt(stGameConfig.strValue);
        }
        BitmapLabelUtils.setLabel(this.spNum, this.nPsAdd.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");

        this.btn_close.visible = false;
        if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.psViewCloseOpen) {
            AnimationManager.instance.zoomTween(this.imageBtGet, this)
            this.btLable.visible = true;
            Laya.timer.once(2000, this, () => {
                this.btn_close.visible = true;
            })
        } else {
            //不了谢谢的按钮
            this.btLable.visible = false;
            //两秒后显示出来
            Laya.timer.once(2000, this, () => {
                this.btLable.visible = true;
            })
        }

    }

    private addEvent() {
        this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
        this.btLable.on(Laya.Event.CLICK, this, this.onClick);
        this.btn_close.on(Laya.Event.CLICK, this, this.onClose);

    }
    public onClick() {
        if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.psViewCloseOpen) {
            MiniManeger.instance.playViderAd({})
        } else {
            this.onClose();
        }
    }

    private removeEvent() {
        this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
        this.btLable.off(Laya.Event.CLICK, this, this.onClick);
        this.btn_close.off(Laya.Event.CLICK, this, this.onClose);
    }

    /**查看视频增加体力 */
    private addPsWatchVideo() {
        SoundManager.getInstance().playEffect("button", 1);
        // if (DeviceUtil.isWXMiniGame()) {
        //     // platform.createRewardedVideoAd(GameData.videoUnitIdCur, (res) => {
        //     //     if (res.isEnded) {
        //     //         this.onAutoClickLogic();
        //     //          //增加总的看视频次数
        //     //         PublicInteractionDataManager.getInstance().AddWatchVideoCount();
        //     //     } else {
        //     //         TipsManager.getInstance().showTips(CustemTipsView,"完整观看视频才可获得奖励哦");
        //     //     }

        //     // }, (error) => {
        //     //     console.error("error ->", error);
        //     // });
        //     this.addPsFun();
        // }
        // else {
        //     // this.onAutoClickLogic();
        //     //  //增加总的看视频次数
        //     //  PublicInteractionDataManager.getInstance().AddWatchVideoCount();
        //     this.addPsFun();
        // }
        this.imageBtGet.off(Laya.Event.CLICK, this, this.addPsWatchVideo);
        MiniManeger.instance.playViderAd({
            successFun: () => {
                this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
                ViewChangeManager.getInstance().CommonView.addBtEvent();
                this.addPsFun();
            },
            failFun: () => {
                this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
            },
            errorFun: () => {
                this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
            }
        });
    }

    /**增加体力 */
    private addPsFun() {
        if (AddPsView.bCloseBinner)
            MiniManeger.instance.hideBanner();
        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Sp, this.nPsAdd);
        PlayerDataManager.getInstance().addWatchVideoAddSpTime();
        this.removeSelf();
    }

    /**不了谢谢 */
    private onClose() {
        if (AddPsView.bCloseBinner)
            MiniManeger.instance.hideBanner();
        SoundManager.getInstance().playEffect("button", 1);
        ViewChangeManager.getInstance().CommonView.addBtEvent();
        if (DeviceUtil.isTTMiniGame()) {
            if (BaseConst.infos.gameInfo.ttPsClose) {
                MiniManeger.instance.playViderAd({
                    successFun: () => {
                        this.removeSelf();
                    }
                })
            } else {
                this.removeSelf();
            }
        } else {

            this.removeSelf();
        }
    }

    /**无限体力刷新 */
    private refreshPsLimitLessView() {
        //刷新进度
        let nLen = this.box_up.numChildren > PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime ? PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime : this.box_up.numChildren;
        for (let i = 0; i < nLen; ++i) {
            let pData = this.box_up.getChildAt(i) as Laya.Image;
            if (pData) {
                pData.visible = true;
            }
        }
        nLen = this.box_down.numChildren > PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime ? PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime : this.box_down.numChildren;
        for (let i = 0; i < nLen; ++i) {
            let pData = this.box_down.getChildAt(i) as Laya.Image;
            if (pData) {
                pData.visible = true;
            }
        }
        //刷新进度显示
        let nLastCount = PlayerDataManager.getInstance().getPsLimitlessStateLastTime();
        if (nLastCount <= 0) {
            this.box_lable.visible = false;
        } else {
            this.lable_number.text = nLastCount.toString();
        }
    }
}