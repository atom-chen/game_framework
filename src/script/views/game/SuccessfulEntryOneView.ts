import ConfigManager from "../../games/ConfigManager";
import { PlayerDataManager } from "../../common/GameDataManager";
import { GoodsType } from "../../games/CommonDefine";
import SuccessfulEntryThreeView from "./SuccessfulEntryThreeView";
import SoundManager from "../../common/SoundManager";
import GameLogicProcessingManager from "../../games/GameLogicProcessingManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import ViewChangeManager from "../../games/ViewChangeManager";
import MoreGameOperRequestTwo from "./wecat/MoreGameOperRequestTwo";

export default class SuccessfulEntryOneView extends BaseSceneUISkinPopView {

    public className_key = "SuccessfulEntryOneView";
    protected grp_center: Laya.Box;
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;

    public imageBt: Laya.Image;
    public imageHand: Laya.Image;
    public imageParValue: Laya.Image;
    public spTimeDown: Laya.Sprite;


    private nTimeDown: number;
    private nCountMax: number;
    private nPsAdd: number;

    private nAddPerOne: number;
    private nCurCount: number;

    private bTimeOver: boolean;
    private bAniRunning: boolean;
    private bFirst: boolean;

    private nTimeOverTemp: number;
    private nLastClickTime: number;

    private bBinnerShow = false;

    constructor() {
        super();
        this.nTimeDown = 5;
        this.nCountMax = 5;
        this.nPsAdd = 1;
        this.nAddPerOne = 0;
        this.nCurCount = 0;
        this.bTimeOver = false;
        this.bAniRunning = false;
        this.bFirst = true;
        this.nTimeOverTemp = 0;
        this.nLastClickTime = 0;
        this.bBinnerShow = false;
        this.skin = "game/uiView/SuccessfulEntryOneView.json";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    onAddStage(): void {
        MiniManeger.instance.showInterstitialAd();
        this.initView();
        this.addEvent();
        this.imageBt.bottom = 0;
        this.moveBtnTween = null;
        MiniManeger.instance.bFlagSpecialView = false;
        this.bBinnerShow = false;
        MiniManeger.instance.hideBanner();
        ViewChangeManager.getInstance().CommonView.visible = false;
    }

    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
        this.bFirst = false;
        this.bAniRunning = false;
        Laya.Tween.clearAll(this.imageHand);
        Laya.timer.clearAll(this);
        MiniManeger.instance.bFlagSpecialView = true;
    }

    /**初始化一些数据 */
    private initView() {

        SoundManager.getInstance().playEffect("win", 1);
        //初始化数据
        this.nTimeDown = 5;
        this.nCountMax = 5;
        this.nPsAdd = 1;
        this.nAddPerOne = 0;
        this.nCurCount = 0;
        this.bTimeOver = false;
        this.bAniRunning = true;
        this.bFirst = true;

        //点击倒计时
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(9);
        if (stGameConfig) {
            this.nTimeDown = parseInt(stGameConfig.strValue);
        }

        //先要把倒计时显示出来
        BitmapLabelUtils.setLabel(this.spTimeDown, this.nTimeDown.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");

        //点击次数最大值
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(10);
        if (stGameConfig) {
            this.nCountMax = parseInt(stGameConfig.strValue);
        }
        //增加的体力
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(11);
        if (stGameConfig) {
            this.nPsAdd = parseInt(stGameConfig.strValue);
        }

        //没有点击就扣次数
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(14);
        if (stGameConfig) {
            this.nTimeOverTemp = parseInt(stGameConfig.strValue);
        }

        this.nAddPerOne = Math.floor(870 / this.nCountMax);
        this.imageParValue.width = 0;
        this.openTimeDown();
        // this.spTimeDown.visible = false;
        this.openHandAni();
    }

    private addEvent() {
        this.imageBt.on(Laya.Event.CLICK, this, this.imageBtClickRecvAward);
    }

    private removeEvent() {
        this.imageBt.off(Laya.Event.CLICK, this, this.imageBtClickRecvAward);
    }

    /**点击宝箱增加进度 */
    private imageBtClickRecvAward() {
        SoundManager.getInstance().playEffect("button", 1);
        // if(this.bFirst){
        //     //this.spTimeDown.visible = true;
        //     this.openTimeDown();
        //     this.bFirst = false;
        // }

        if (this.bTimeOver) {
            return;
        }
        this.nCurCount += 1;
        let nWithCur = this.nCurCount * this.nAddPerOne;
        this.imageParValue.width = nWithCur;
        if (this.nCurCount >= this.nCountMax) {
            Laya.timer.clear(this, this.timeDownView);
            this.procLogicOver();
        }

        this.nLastClickTime = GameLogicProcessingManager.GetCurTime();
    }

    //移动 btn
    private moveBtnTween: Laya.Tween;

    /**启动一个倒计时 */
    private openTimeDown() {
        BitmapLabelUtils.setLabel(this.spTimeDown, this.nTimeDown.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");
        Laya.timer.loop(1000, this, this.timeDownView);
        Laya.timer.loop(this.nTimeOverTemp, this, this.subCount);
    }

    /**处理时间回退 */
    private subCount() {
        this.nCurCount -= 1;
        this.nCurCount = this.nCurCount < 0 ? 0 : this.nCurCount;
        let nWithCur = this.nCurCount * this.nAddPerOne;
        // Laya.Tween.to(this.imageParValue, { width: nWithCur }, 700)
        this.imageParValue.width = nWithCur;
    }

    /**倒计时相关的处理 */
    private timeDownView() {
        this.nTimeDown -= 1;
        let nTemp = this.nTimeDown;
        nTemp = nTemp < 0 ? 0 : nTemp;
        BitmapLabelUtils.setLabel(this.spTimeDown, nTemp.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");
        if (this.nTimeDown < 0) {
            this.bTimeOver = true;
            this.procLogicOver();
        }
    }

    /**结束的相关处理 */
    private procLogicOver() {
        Laya.timer.clear(this, this.timeDownView);
        if (this.bTimeOver) {
            TipsManager.getInstance().showDefaultTips("领取失败");
        }else if (this.nCurCount >= this.nCountMax) {
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Sp, this.nPsAdd);
            TipsManager.getInstance().showDefaultTips("体力+" + this.nPsAdd.toString());
        }
       
        if (DeviceUtil.isWXMiniGame()) {
            if (PlayerDataManager.bGlobEnterGame) {
                ViewManager.getInstance().showView(MoreGameOperRequestTwo);
                //2020.7.13-1-1
                MiniManeger.instance.bFlagSpecialView = true;
                this.removeSelf();
            }else{
                ViewChangeManager.getInstance().goToNextLevel();
                this.removeSelf();
            }
        } else {
            ViewManager.getInstance().showView(SuccessfulEntryThreeView);
            ViewChangeManager.getInstance().CommonView.visible = true;
            this.removeSelf();
            MiniManeger.instance.bFlagSpecialView = true;
        }
    }

    /**手上下动的动画 */
    private openHandAni() {
        if (!this.bAniRunning) {
            return;
        }
        let yTemp = this.imageHand.y;
        Laya.Tween.clearAll(this.imageHand);
        Laya.Tween.to(this.imageHand, { y: yTemp - 25 }, 300, null, Laya.Handler.create(this, (args) => {
            Laya.Tween.to(this.imageHand, { y: yTemp }, 300, null, Laya.Handler.create(this, (args) => {
                Laya.timer.once(0, this, this.openHandAni);
            }));
        }));
    }
}