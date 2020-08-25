import GameLogicProcessingManager from "../../games/GameLogicProcessingManager";
import { PlayerDataManager } from "../../common/GameDataManager";
import ConfigManager from "../../games/ConfigManager";
import SoundManager from "../../common/SoundManager";
import { GoodsType } from "../../games/CommonDefine";
import { MiniManeger } from "../../minigame/MiniManeger";
import { GameData } from "../../common/GameData";

export default class SignView extends BaseSceneUISkinPopView {

    public className_key = "SignView";
    protected grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;


    public imageBtSign: Laya.Image;
    public spBtClose: Laya.Sprite;
    public boxDouble: Laya.Box;
    public btDouble: Laya.Sprite;
    public spDouble: Laya.Sprite;
    public boxItem: Laya.Box;
    public spWorldLeft: Laya.Sprite;
    public spWorldRight: Laya.Sprite;
    public spTomorrow: Laya.Sprite;

    private nCurTime: number;
    private bDouble: boolean;
    private bIsRunning: boolean;

    constructor() {
        super();
        this.bIsRunning = false;
        this.skin = "game/uiView/SignView.json";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.initView()

    }

    onAddStage(): void {
        super.onAddStage();
        //MiniManeger.instance.showInterstitialAd();
        this.addEvent();
        this.initView()
        MiniManeger.instance.showBannerAd();
    }


    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
        this.bIsRunning = false;
        Laya.Tween.clearAll(this.imageBtSign);
        Laya.timer.clearAll(this);

    }

    private initView() {
        this.nCurTime = 0;
        this.bDouble = false;
        this.bIsRunning = true;
        this.refreshSignData();
        this.refreshSignView();
        this.refreshSignRecvBt();
        this.initDouble();
        MiniManeger.instance.hideBlockAd();
    }

    private addEvent(): void {
        this.imageBtSign.on(Laya.Event.CLICK, this, this.onClick);
        this.spBtClose.on(Laya.Event.CLICK, this, this.onClick);
        this.boxDouble.on(Laya.Event.CLICK, this, this.onClick);
    }

    private removeEvent() {
        this.imageBtSign.off(Laya.Event.CLICK, this, this.onClick);
        this.spBtClose.off(Laya.Event.CLICK, this, this.onClick);
        this.boxDouble.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(evt: Laya.Event): void {
        SoundManager.getInstance().playEffect("button", 1);
        switch (evt.currentTarget) {
            case this.spBtClose:
                if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.signCloseVideoOpen) {
                    MiniManeger.instance.playViderAd({
                        successFun: () => {
                            this.removeSelf();
                        }
                    });
                } else {
                    this.removeSelf();
                }

                break
            case this.imageBtSign:
                this.onSigned();
                break;
            case this.boxDouble:
                this.onSignedDouble();
                break;
        }
    }

    public removeSelf() {
        MiniManeger.instance.showBlockAd();

        return super.removeSelf()
    }

    //是否消除当前需要的资源组
    // public _onRemoved(): void {
    //     super._onRemoved();
    //     console.log("signView onremoved");
    //     this.destroy(true);
    //     ResUtil.getIntance().destoryGroup("sign");
    // }

    /**双倍奖励的标签处理 */
    private onSignedDouble() {
        if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.signDoubleVideoOpen) {
            MiniManeger.instance.playViderAd({});
        }
        this.spDouble.visible = !this.spDouble.visible;
        this.bDouble = this.spDouble.visible;
    }

    /**刷新数据 */
    private refreshSignData() {
        //判断当前是否能签到
        this.nCurTime = GameLogicProcessingManager.GetCurTime();
        if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, this.nCurTime)) {
            this.btDouble.visible = false;
            return;
        }
        //7天后轮回
        if (PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex >= 7) {
            PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex = 0;
        }
    }

    /**初始化界面信息 */
    private refreshSignView() {
        let arySignData = ConfigManager.getInstance().getSignDataAll();
        let nLen = arySignData.length;
        let stImageTemp: Laya.Image = null;
        let stSpriteGoods: Laya.Sprite = null;
        for (let i = 0; i < nLen; ++i) {
            stImageTemp = this.boxItem.getChildAt(i) as Laya.Image;
            if (stImageTemp) {
                if (i < 6) {
                    //更新奖励图片
                    stSpriteGoods = stImageTemp.getChildAt(2) as Laya.Sprite;
                    if (stSpriteGoods) {
                        if (arySignData[i].nType == 1) {
                            stSpriteGoods.loadImage("resource/assets/img/common/maininterface_icon_7.png");
                        } else if (arySignData[i].nType == 2) {
                            stSpriteGoods.loadImage("resource/assets/img/common/maininterface_icon_6.png");
                        }
                    }
                    //刷新数量
                    let stBox = stImageTemp.getChildByName("boxWorld");
                    if (stBox) {
                        let spNum = stBox.getChildByName("spWorld") as Laya.Sprite;
                        if (spNum) {
                            BitmapLabelUtils.setLabel(spNum, arySignData[i].nCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                        }
                    }
                } else {
                    BitmapLabelUtils.setLabel(this.spWorldLeft, arySignData[i].nCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                    BitmapLabelUtils.setLabel(this.spWorldRight, arySignData[i].nCount7.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                }
                let spSigned: Laya.Image = stImageTemp.getChildByName("spSigned") as Laya.Image;
                if (spSigned) {
                    if (i < PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex) {
                        spSigned.visible = true;
                    } else {
                        spSigned.visible = false;
                    }
                }

            }
        }
    }

    /**双倍标签的初始状态*/
    private initDouble() {
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


        this.bDouble = this.spDouble.visible;
    }

    /**刷新领奖按钮的逻辑*/
    private refreshSignRecvBt() {
        this.nCurTime = GameLogicProcessingManager.GetCurTime();;
        // this.lableSigned.visible = false;
        this.boxDouble.visible = true;
        this.btDouble.visible = true;
        this.spTomorrow.visible = true;
        this.imageBtSign.visible = true;
        //如果是同一天
        if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, this.nCurTime)) {
            this.boxDouble.visible = false;
            this.btDouble.visible = false;
            this.imageBtSign.visible = false;
        } else {
            this.spTomorrow.visible = false;
            this.startSignImageBtShareAni();
        }
    }

    /**请求签到 */
    private onSigned() {
        if (this.bDouble) {
            this.imageBtSign.off(Laya.Event.CLICK, this, this.onClick);
            let self = this;
            MiniManeger.instance.playViderAd({
                successFun: () => {
                    self.procSignedData();
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onClick);
                },
                failFun: () => {
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onClick);
                },
                errorFun: () => {
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onClick);
                }
            });
        } else {
            this.procSignedData();
        }
    }

    /**签到的数据处理 */
    private procSignedData() {
        //增加体力值
        let stSignData = ConfigManager.getInstance().getSignDataBySignID(PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex);
        if (stSignData) {
            let nValue = stSignData.nCount;
            if (this.bDouble) {
                nValue *= 2;
            }
            PlayerDataManager.getInstance().AddGoods(stSignData.nType, nValue);
            if (stSignData.nType == GoodsType.enum_GoodsType_Sp) {
                TipsManager.getInstance().showDefaultTips("体力+" + nValue.toString());
            }
            if (PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex == 6) {
                let nValue = stSignData.nCount7;
                if (this.bDouble) {
                    nValue *= 2;
                }
                PlayerDataManager.getInstance().AddGoods(stSignData.nType7, nValue);
            }
        }
        //签到标签增加
        PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex += 1;
        //记录签到时间
        PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast = GameLogicProcessingManager.GetCurTime();
        //保存数据
        PlayerDataManager.getInstance().SaveData();
        //刷新界面信息
        this.refreshSignView();
        this.refreshSignRecvBt();
    }

    private startSignImageBtShareAni() {
        if (!this.bIsRunning && this.imageBtSign.visible) {
            return;
        }
        Laya.Tween.clearAll(this.imageBtSign);
        Laya.Tween.to(this.imageBtSign, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageBtSign, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.startSignImageBtShareAni);
            }));
        }));
    }

}