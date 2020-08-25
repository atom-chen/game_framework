import PlatformDY from "../../../../PlatformDY";
import { BaseUIScene } from "../../base/BaseUIScene";
import { GameManager } from "../../../manager/GameManager";
import { GameData } from "../../../common/GameData";


export default class WeCatMoreGameItemOne extends BaseUIScene {
    public className_key = "WeCatMoreGameItemOne";
    public imgIcon: Laya.Image;
    public labGameName: Laya.Label;

    private _nIndex: number;
    constructor(data: any) {
        super();
        this._nIndex = data;
        this.skin = "game/uiView/wecat/WeCatMoreGameItemOne.json";
        this.width = 200;
        this.height = 240;
    }

    onAddStage(): void {
        super.onAddStage();
        this.addEvent();
        this.initView()
    }

    onRemoved() {
        this.removeEvent();
    }

    setData(data: any): void {
        this._nIndex = data;
        this.initView();
    }

    public initView() {
        if (this._nIndex < 0 || this._nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
            this._nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
            if (this._nIndex < 0) return;
        }
        this.labGameName.text = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].name;
        this.imgIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_img;
    }

    public addEvent() {
        if (!DeviceUtil.isTTMiniGame()) {
            this.on(Laya.Event.CLICK, this, this.gotoGameDuYou);
        }
    }

    public removeEvent() {
        this.off(Laya.Event.CLICK, this, this.gotoGameDuYou);
    }

    private gotoGameDuYou() {
        if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
            
            GameManager.instance.goToDuyou(this._nIndex)
        }
    }
}