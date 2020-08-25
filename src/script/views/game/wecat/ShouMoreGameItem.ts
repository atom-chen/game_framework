import { BaseUIScene } from "../../base/BaseUIScene";
import PlatformDY from "../../../../PlatformDY";
import MoreGameOperRequestTwo from "./MoreGameOperRequestTwo";
import MoreGameRandomGameBox713 from "./MoreGameRandomGameBox713";
import { GameData } from "../../../common/GameData";


export default class ShouMoreGameItem extends BaseUIScene {
    public className_key = "ShouMoreGameItem";
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    public image_icon: Laya.Image;
    public lable_name: Laya.Label;
    private nIndex: number;
    private stGameIndex: any;
    private bAni: boolean;
    constructor(data: any, nWith: number, nHeight: number) {
        super();
        this.skin = "game/uiView/wecat/ShowMoreGameInfoItem.json";
        this.nIndex = data;
        this.width = nWith;//375;
        this.height = nHeight;//430;
        this.pivotX = this.width / 2;
        this.pivotY = this.height / 2;
        this.bAni = true;
    }

    onAddStage(): void {
        this.addEvent();
        this.initView()
    }

    onRemoved() {
        this.removeEvent();
        Laya.Tween.clearAll(this);
    }

    setData(data: any): void {
        this.removeEvent();
        this.addEvent();
        this.nIndex = data;
        this.initView();
    }

    setAni(b: boolean) {
        this.bAni = b;
    }

    initView() {
        if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
            this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
            if (this.nIndex < 0) return;
        }
        let stData = GameData.getInstance().weCatMiniIconsInfo;
        let stDataIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        this.lable_name.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
        this.image_icon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
        this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        this.startOperAni();
    }

    addEvent() {
        //if(!DeviceUtil.isTTMiniGame()){
        this.on(Laya.Event.CLICK, this, this.gotoGame);
        //}
    }

     removeEvent() {
        this.off(Laya.Event.CLICK, this, this.gotoGame);
    }

    private gotoGame() {
        // if (DeviceUtil.isWXMiniGame()||DeviceUtil.isTTMiniGame()){
        // //判断下数据是否存在
        // if(this.nIndex < 0 ||　this.nIndex　>= GameData.getInstance().weCatMiniIconsInfo.length){
        //     return;
        // }
        // let stData = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        // if(!stData){
        //     return;
        // }
        //嘟游
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.clickGame(this.stGameIndex.ad_id);
        }
        let self = this;
        let data = {
            appId: this.stGameIndex.ad_appid,
            path: this.stGameIndex.url,
            success: function () {
                console.log("navigateToMiniProgram success!");
                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    console.log("self.nIndex = ", self.nIndex);
                    PlatformDY.toGame(self.stGameIndex.ad_id);
                }
            },
            fail: function (e) {
                console.log("navigateToMiniProgram fail e =", e);
                // //嘟游
                // if(BaseConst.infos.gameInfo.isDY){
                //     console.log("self.nIndex = ",self.nIndex);
                //     PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[self.nIndex].ad_id);
                // }
                //if(DeviceUtil.isWXMiniGame()){
                //2020.7.13-1-4
                if (DeviceUtil.isWXMiniGame()) {
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                }
            }
        };
        platform.navigateToMiniProgram(data);
    }


    /**摇摆的动画 */
    private startOperAni(){
    if (!this.bAni) {
        return;
    }
    this.operAni();
}

    private operAni(){
    Laya.Tween.clearAll(this);
    Laya.Tween.to(this, { rotation: -5 }, 500, null, Laya.Handler.create(this, (args) => {
        Laya.Tween.to(this, { rotation: 5 }, 500, null, Laya.Handler.create(this, (args) => {
            Laya.timer.once(0, this, this.operAni);
        }));
    }));
}
}