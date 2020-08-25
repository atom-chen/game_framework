import ConfigManager from "../../games/ConfigManager";
import SuccessfulEntryOneView from "./SuccessfulEntryOneView";
import SuccessfulEntryThreeView from "./SuccessfulEntryThreeView";
import { MiniManeger } from "../../minigame/MiniManeger";
import { PlayerDataManager } from "../../common/GameDataManager";
import { GoodsType } from "../../games/CommonDefine";
import ViewChangeManager from "../../games/ViewChangeManager";

/** 分享录屏 */
export default class ShareRecordVideoView extends BaseSceneUISkinPopView {
    className_key = "ShareRecordVideoView";
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;
    private btn_shareVideo: Laya.Button;
    private btn_cancel: Laya.Button;
    private shareGlodCount: Laya.Image;
    private nGlodCount = 50;

    public constructor(data: any) {
        super(data);
        this.skin = "game/uiView/ShareRecordVideoSkinView.json";
    }

    protected childrenCreated() { }

    onAddStage() {
        if (this.isCreate) {
            this.init();
            this.addEvent();
        }
    }

    setData(data: any) {
        super.setData(data);
        if (this.isCreate) {
            this.init();
            this.addEvent();
        }
    }

    private init() {
        console.log("ShareRecordVideoView data ->", this.viewData_);
        ViewChangeManager.getInstance().CommonView.removeBtEvent();
        this.btn_cancel.visible = false;
        /** 刷新分享的金币 */
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
        if (stGameConfig) {
            this.nGlodCount = parseInt(stGameConfig.strValue);
        }
        BitmapLabelUtils.setLabel(this.shareGlodCount, this.nGlodCount.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
        Laya.timer.once(2000, this, () => {
            this.btn_cancel.visible = true;
        });
        MiniManeger.instance.showBannerAd();
    }

    private addEvent() {
        this.btn_shareVideo.on(Laya.Event.CLICK, this, this.onClick);
        this.btn_cancel.on(Laya.Event.CLICK, this, this.onClick);
    }

    private removeEvent() {
        this.btn_shareVideo.off(Laya.Event.CLICK, this, this.onClick);
        this.btn_cancel.off(Laya.Event.CLICK, this, this.onClick);
    }

    private onClick(evt: Laya.Event) {
        switch (evt.currentTarget) {
            case this.btn_shareVideo:
                this.shareVideo();
                break
            case this.btn_cancel:
                this.removeUs();
                break
        }
    }

    private shareVideo() {
        let self = this;
        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = false;
        if (DeviceUtil.isTTMiniGame()) {
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN') {
                MiniManeger.instance.bFlagDouYin = true;
                MiniManeger.instance.shareAppMessage({
                    sucFun: () => {
                        console.log("发布录制视频成功");
                        TipsManager.getInstance().showDefaultTips('分享成功');
                        if (MiniManeger.instance.onShareVideoSuccess) {
                            return;
                        }
                        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, self.nGlodCount);
                        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                        self.removeUs();
                    },
                    failFun: () => {
                        console.log("发布录制视频失败");
                        TipsManager.getInstance().showDefaultTips('分享失败');
                        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                    }
                });
            } else {
                MiniManeger.instance.shareGameVideo({
                    successFun: () => {
                        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, self.nGlodCount);
                        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                        self.removeUs();
                    }, failFun: () => {
                        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                    }, errorFun: () => {
                        self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                    }
                })
            }
        } else {
            MiniManeger.instance.shareAppMessage();
        }


    }

    removeUs() {
        super.removeUs();
    }

    onRemoved() {
        this.removeEvent();
        ViewChangeManager.getInstance().CommonView.addBtEvent();
        if (BaseConst.infos.gameInfo.openPsAward == 1 && ConfigManager.getInstance().getTreasureByCurLevel() == 1) {
            ViewManager.getInstance().showView(SuccessfulEntryOneView);
        } else {
            ViewManager.getInstance().showView(SuccessfulEntryThreeView);
        }
    }
}