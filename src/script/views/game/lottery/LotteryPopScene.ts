import { BasePopScene } from "../../base/BasePopScene";
import { MiniManeger } from "../../../minigame/MiniManeger";
import { PlayerDataManager } from "../../../common/GameDataManager";

export class LotteryPopScene extends BasePopScene {

    className_key = "LotteryPopScene";

    public grp_center: Laya.Box;
    public icon_title: Laya.Image;
    public box_count: Laya.Box;
    public btn_rfeceive: Laya.Image;
    public omg_r_video: Laya.Image;
    public btn_double: Laya.Image;

    public box_double: Laya.Box;
    public img_double: Laya.Sprite;
    public constructor(data: { type: number, count: number }) {
        super(data);
        this.viewData_ = data
        this.skin = "game/uiView/lottery/LotterPopScene.json"
    }

    public viewData_: { type: number, count: number };
    public popAward() {
        let data = this.viewData_
        if (data.type == 1) {
            this.icon_title.skin = 'resource/assets/img/ui/qq/lottery/luckyturntable_icon_2.png';
        } else {
            this.icon_title.skin = 'resource/assets/img/ui/qq/lottery/luckyturntable_icon_1.png';
        }

        this.img_double.visible = BaseConst.infos.gameInfo.openPsAward == 0;

        if (!this.img_double.visible) {
            BitmapLabelUtils.setLabel(this.box_count, data.count * 2 + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
        } else {
            BitmapLabelUtils.setLabel(this.box_count, data.count + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
        }
    }


    public initView() {
        km:
        for (let i = 0; i < 1000; i++) {
            kx:
            for (let j = 0; j < 1000; j++) {
                if (j == 100) {
                    break km;
                } else {

                    break kx;
                }
            }
        }
        this.popAward();
    }

    public addEvent() {
        this.btn_rfeceive.on(Laya.Event.CLICK, this, this.onRecieve);
        this.box_double.on(Laya.Event.CLICK, this, this.onSelected);
        this.btn_double.on(Laya.Event.CLICK, this, this.onDoubleRecieve);
    }
    protected onSelected() {
        this.img_double.visible = !this.img_double.visible;
        if (!this.img_double.visible) {
            BitmapLabelUtils.setLabel(this.box_count, this.viewData_.count * 2 + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
        } else {
            BitmapLabelUtils.setLabel(this.box_count, this.viewData_.count + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
        }
    }

    public removeSelf() {
        this.box_count.destroyChildren();
        return super.removeSelf()
    }
    public getAward(mul: number) {
        PlayerDataManager.getInstance().AddGoods(this.viewData_.type, this.viewData_.count * mul);
        this.removeSelf();
    }
    private onRecieve() {
        if (!this.img_double.visible) {
            this.onDoubleRecieve();
        } else {
            this.getAward(1);
        }
    }
    private onDoubleRecieve() {
        let self = this;
        MiniManeger.instance.playViderAd({
            successFun: () => {
                self.getAward(2);
            }
        })
    }

    public removeEvent() {
        this.btn_rfeceive.off(Laya.Event.CLICK, this, this.onRecieve);
        this.box_double.off(Laya.Event.CLICK, this, this.onSelected);
        this.btn_double.off(Laya.Event.CLICK, this, this.onDoubleRecieve);
    }

}