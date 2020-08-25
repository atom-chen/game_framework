import PlatformDY from "../../../../PlatformDY";
import MoreGameRandomGameBox713Temp from "./MoreGameRandomGameBox713Temp";
import { GameData } from "../../../common/GameData";

// import { GameData } from "../../common/GameData";
// import PlatformDY from "../../../PlatformDY";
// import MoreGameOperRequest from "./MoreGameOperRequest";
// import MoreGameOperRequestTwo from "./MoreGameOperRequestTwo";

export default class MoreGameRandomGameBoxItem713 extends BaseSceneUISkin {
    public className_key = "WeCatMoreGameItemOne713";
    public imageIcon: Laya.Image;
    public lableGameName: Laya.Label;

    private nIndex: number;
    private stGameIndex: any;
    private bIsBox713Temp: boolean;
    constructor(data: any, b: boolean = false) {
        super();
        this.nIndex = data;
        this.bIsBox713Temp = b
        this.skin = "game/uiView/wecat/MoreGameRandomGameBoxItem713.json";
        this.width = 320;
        this.height = 390;
    }

    public set isBox713Temp(b: boolean) {
        this.bIsBox713Temp = b;
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
        this.nIndex = data;
        this.initView();
    }

    private initView() {
        if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
            this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
            if (this.nIndex < 0) return;
        }
        this.lableGameName.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
        this.imageIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
        this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
    }

    private addEvent() {
        if (!DeviceUtil.isTTMiniGame()) {
            this.on(Laya.Event.CLICK, this, this.gotoGame);
        }
    }

    private removeEvent() {
        this.off(Laya.Event.CLICK, this, this.gotoGame);
    }

    private gotoGame() {
        if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
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
            console.log("this.stGameIndex = ", this.stGameIndex);
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
                    //2020.7.13-1-4
                    // if(DeviceUtil.isWXMiniGame()){
                    //     ViewManager.getInstance().showView(MoreGameOperRequestTwo);
                    // }
                    if (!self.bIsBox713Temp) {
                        MoreGameRandomGameBox713Temp.bSpecial = true;
                    }
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            };
            platform.navigateToMiniProgram(data);
        }
    }
}