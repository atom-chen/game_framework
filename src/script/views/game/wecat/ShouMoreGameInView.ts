import ShouMoreGameItem from "./ShouMoreGameItem";
import PlatformDY from "../../../../PlatformDY";
import { GameData } from "../../../common/GameData";

export default class ShouMoreGameInView extends BaseSceneUISkin {
    public className_key = "ShouMoreGameInView";
    constructor() {
        super();
        this.skin = "game/uiView/wecat/ShowMoreGameInfoInView.json";
        this.image_hand = null;
        this.bAni = true;
        this.height = 860;
        this.width  = 800;
    }

    // constructor() { 
    //     super();

    //  }

    private bAni: boolean;


    onAddStage(): void {
        this.initView()
    }

    public set ani(b: boolean) {
        this.bAni = b;
    }

    private initView() {
        this.refreshWeCatMoreGame();
    }

    private image_hand: Laya.Image;
    public  box_wecat:Laya.Box;
    ////2020.7.13-4
    public refreshWeCatMoreGame() {
        let nXAddTemp = 425;
        let nYAddTemp = 450;
        let aryInfo: number[] = [];
        let nCount = 2;
        aryInfo = this.getRandomIndex_num(4);
        let nLen = 4;
        let nRandomNum = Utils.random(0, nLen - 1);
        let nHandX = 0;
        let nHandY = 0;
        nLen = nLen >= aryInfo.length ? aryInfo.length : nLen;
        for (let i = 0; i < nLen; ++i) {
            let pWeCatMoreGameItemOne: ShouMoreGameItem = this.box_wecat.getChildAt(i) as ShouMoreGameItem;
            if (pWeCatMoreGameItemOne) {
                pWeCatMoreGameItemOne.setAni(this.bAni);
                pWeCatMoreGameItemOne.setData(aryInfo[i]);
            } else {
                pWeCatMoreGameItemOne = new ShouMoreGameItem(aryInfo[i], 375, 430);
                pWeCatMoreGameItemOne.setAni(false);
                let nAddX = Math.floor(i % nCount);
                let nYAdd = Math.floor(i / nCount);
                pWeCatMoreGameItemOne.x = pWeCatMoreGameItemOne.pivotX + nXAddTemp * nAddX
                pWeCatMoreGameItemOne.y = pWeCatMoreGameItemOne.pivotY + nYAddTemp * nYAdd;
                this.box_wecat.addChild(pWeCatMoreGameItemOne);
            }
            if (nRandomNum == i) {
                nHandX = pWeCatMoreGameItemOne.x;
                nHandY = pWeCatMoreGameItemOne.y;
            }
        }

        //2020.6.2运营需求  每次使用后刷新下游戏列表
        if (BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame()) {
            PlatformDY.refreshGameList();

        }

        if (!this.image_hand) {
            this.image_hand = new Laya.Image("resource/assets/img/wecat/failed_icon_1.png");
            this.box_wecat.addChild(this.image_hand);
        }
        //刷新手的位置
        this.image_hand.visible = true;
        this.image_hand.x = nHandX;
        this.image_hand.y = nHandY;
    }

    /**运营要改成随机6个游戏 */
    //2020.7.13-4
    private getRandomIndex_num(nNum: number): number[] {
        if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
            return [];
        }
        let nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
        // let nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
        // if (nCount > 0) {
        //     nCount = 3 - nCount;
        // }
        let nCount = nNum;
        //nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;

        let aryInfo: number[] = [];
        for (let i = 0; i < nCount; ++i) {
            aryInfo.push(nRandom);
            nRandom += 1;
            if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                nRandom = 0;
            }
        }
        return aryInfo;
    }
}