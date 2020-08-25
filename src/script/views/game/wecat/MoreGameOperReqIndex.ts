
import PlatformDY from "../../../../PlatformDY";
import { GameData } from "../../../common/GameData";


export default class MoreGameOperReqIndex extends BaseSceneUISkin {
    className_key = "MoreGameOperReqIndex";
    public icon: Laya.Image;
    public lableName: Laya.Label;
    public lableCount: Laya.Label;
    private _nIndex: number;
    constructor(data: any) {
        super();
        this._nIndex = data;
        // this.width  = 300;
        // this.height = 380;
        this.skin = "game/uiView/wecat/MoreGameOperReqIndex.json";
        this.width = 279;
        this.height = 311;
    }

    onAddStage(): void {
        super.onAddStage();
        if(this.isCreate){
            this.initView();
            this.addEvent();
        }
    }

    onRemoved() {
        this.removeEvent();
    }

    setData(data: any): void {
        this._nIndex = data;
        this.initView();
    }

    /**初始化界面 */
    public initView() {
        if (this._nIndex < 0 || this._nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
            this._nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
            if (this._nIndex < 0) return;
        }
        this.lableName.text = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].name;
        this.icon.skin = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_img;
        let numCount = Utils.random(100000, 200000);
        this.lableCount.text = numCount.toString() + "人正在玩";
    }

    public addEvent() {
        this.on(Laya.Event.CLICK, this, this.gotoGame);
    }

    public removeEvent() {
        this.off(Laya.Event.CLICK, this, this.gotoGame);
    }

    private gotoGame() {
        if (!DeviceUtil.isWXMiniGame()) return;
        //判断下数据是否存在
        if (this._nIndex < 0 || 　this._nIndex 　>= GameData.getInstance().weCatMiniIconsInfo.length) {
            return;
        }
        let objData = GameData.getInstance().weCatMiniIconsInfo[this._nIndex];
        if (!objData) {
            return;
        }
        //嘟游
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.clickGame(GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_id);
        }

        this.navigateToMiniProgram();
    }

    private navigateToMiniProgram(){
        let data = {
            appId: GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_appid,
            path: GameData.getInstance().weCatMiniIconsInfo[this._nIndex].url,
            success: () => {
                console.log("navigateToMiniProgram success");
                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    console.log("self.nIndex = ", this._nIndex);
                    PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_id);
                }
            },
            fail: (e) => {
                console.log("navigateToMiniProgram fail e =", e); //嘟游
               
            }
        };
        platform.navigateToMiniProgram(data);
    }
}