
import ViewChangeMgr from "../../../games/ViewChangeManager";
import MoreGameOperReqIndex from "./MoreGameOperReqIndex";

import GameStatusMgr from "../../../games/GameStateManager";

import { PopBaseScene } from "../../base/PopBaseScene";

import { GameManager } from "../../../manager/GameManager";
import MoreGameRandomGameBoxItem713 from "./MoreGameRandomGameBoxItem713";
import PlatformDY from "../../../../PlatformDY";
import MoreGameOperRequestTwo from "./MoreGameOperRequestTwo";

import MoreGameViewTemp from "./MoreGameViewTemp";
import { MiniManeger } from "../../../minigame/MiniManeger";
import { PlayerDataManager } from "../../../common/GameDataManager";
import SuccessfulEntryThreeView from "../SuccessfulEntryThreeView";
import FailEntryTwoView from "../FailEntryTwoView";
import { GameData } from "../../../common/GameData";

//随机游戏盒子
export default class MoreGameRandomGameBox713Temp extends PopBaseScene {
    className_key = "MoreGameOperRequestTemp";
    public imageBtReturn: Laya.Image;
    public imageBtConGame: Laya.Image;
    public moreGamePanel: Laya.Box;
    public lableTitle: Laya.Label;
    private nRandomIndxe: number;
    private panel_gamelist: Laya.Panel;
    private moreGamePanel2: Laya.Box;

    private bAniOver: boolean;

    private imageRandom: Laya.Image;
    public nOpenNum: number;
    public static bSuccess: boolean = false;
    public static bSpecial: boolean = false;
    constructor() {
        super();
        this.skin = "game/uiView/wecat/MoreGameRandomGameBox713Temp.json";
        this.nRandomIndxe = 0;
        this.bAniOver = false;
        this.nOpenNum = 0;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.moreGamePanel.height = Laya.stage.height - (1920 - 1640);
        this.panel_gamelist.height = Laya.stage.height - (1920 - 1640);
        // this.initView();
        // this.addEvent();
    }

    // onAddStage(): void {
    //     super.onAddStage();

    //     if (this.isCreate) {
    //         this.initView();
    //         this.addEvent();
    //         //this.moreGameShowBinner(this.imageBtConGame.bottom);
    //     }
    //     //2020-7-13

    // }

    public onRemoved() {
        super.onRemoved();
        //this.removeEvent();
        //MiniManeger.instance.showBannerAd();
        this.bAniOver = true;
    }

    // private addEvent() {
    //     this.imageBtReturn.on(Laya.Event.CLICK, this, this.onBack);
    //     this.imageBtConGame.on(Laya.Event.CLICK, this, this.goToGame);
    //     this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
    //     this.imageRandom.on(Laya.Event.CLICK, this, this.goToGameRandom);
    // }

    public addEvent() {
        this.registerEvent(this.imageBtReturn, Laya.Event.CLICK, this.onBackTemp, this);
        this.registerEvent(this.imageBtConGame, Laya.Event.CLICK, this.onSpeical, this);
        this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
        //this.registerEvent(this.panel_gamelist, Laya.Event.CLICK, this.mousedown, this);
        this.registerEvent(this.imageRandom, Laya.Event.CLICK, this.goToGameRandom, this);
    }

    private nStartY: number = 0;
    protected mousedown(evt: Laya.Event) {
        this.nStartY = evt.currentTarget.mouseY;
        let self = this;
        function mouseMove(evt1: Laya.Event) {
            let nYTemp = self.nStartY - evt1.currentTarget.mouseY;
            self.moreGamePanel.y -= nYTemp;
            self.moreGamePanel2.y -= nYTemp;
            self.nStartY = evt1.currentTarget.mouseY;

            if (self.moreGamePanel.y >= 0 && self.moreGamePanel2.y >= 0) {
                self.moreGamePanel.y = 0;
                self.moreGamePanel2.y = self.moreGamePanel.height;
            }
        }
        function mouseUp(evt1: Laya.Event) {
            this.panel_gamelist.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
            this.panel_gamelist.off(Laya.Event.MOUSE_UP, this, mouseUp);
        }
        this.panel_gamelist.on(Laya.Event.MOUSE_MOVE, this, mouseMove);
        this.panel_gamelist.on(Laya.Event.MOUSE_UP, this, mouseUp);
    }

    // private removeEvent() {
    //     this.imageBtReturn.off(Laya.Event.CLICK, this, this.onBack);
    //     this.imageBtConGame.off(Laya.Event.CLICK, this, this.goToGame);
    //     this.imageRandom.off(Laya.Event.CLICK, this, this.goToGameRandom);
    // }
    /**初始话pinnel***/
    private initPanel() {
        // this.panel_gamelist.vScrollBarSkin = '';
        // this.panel_gamelist.elasticEnabled = true;
        // this.panel_gamelist.vScrollBar.elasticDistance = 200;
        // this.panel_gamelist.vScrollBar.elasticBackTime = 100;
    }
    //2020.7.13-5
    public initView() {
        this.nOpenNum += 1;
        MiniManeger.instance.bFlagSpecialView = false;
        MiniManeger.instance.hideBanner();
        Laya.timer.clear(this, this.onMove);
        ViewChangeMgr.getInstance().CommonView.visible = false;
        this.initPanel();
        let nXStart = 0;
        let nYStart = 0;
        let nCount = 3;
        let aryInfo: number[] = [];
        aryInfo = this.getRandomIndex(18);
        this.moreGamePanel.removeChildren();
        this.moreGamePanel.y = 0;
        for (let i = 0; i < aryInfo.length; ++i) {//WeCatMoreGameItemOne MoreGameOperReqIndex
            let pWeCatMoreGameItemOne: MoreGameRandomGameBoxItem713 = this.moreGamePanel.getChildAt(i) as MoreGameRandomGameBoxItem713;
            if (pWeCatMoreGameItemOne) {
                pWeCatMoreGameItemOne.setData(aryInfo[i]);
                pWeCatMoreGameItemOne.isBox713Temp = true;
            } else {
                pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i],true);
                pWeCatMoreGameItemOne.isBox713Temp = true;
                let nAddX = Math.floor(i % nCount);
                let nYAdd = Math.floor(i / nCount);
                pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                this.moreGamePanel.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
            }
        }
        this.moreGamePanel2.y = this.moreGamePanel.height;
        this.moreGamePanel2.removeChildren();
        for (let i = 0; i < aryInfo.length; ++i) {//WeCatMoreGameItemOne MoreGameOperReqIndex
            let pWeCatMoreGameItemOne: MoreGameRandomGameBoxItem713 = this.moreGamePanel2.getChildAt(i) as MoreGameRandomGameBoxItem713;
            if (pWeCatMoreGameItemOne) {
                pWeCatMoreGameItemOne.setData(aryInfo[i]);
            } else {
                pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i]);

                let nAddX = Math.floor(i % nCount);
                let nYAdd = Math.floor(i / nCount);
                pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                this.moreGamePanel2.addChild(pWeCatMoreGameItemOne);
                this.moreGamePanel2.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height
            }
        }

        //2020.6.2运营需求  每次使用后刷新下游戏列表
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.refreshGameList();
        }

        Laya.timer.frameLoop(1, this, this.onMove);

        //this.timerChangerImage();
        if ((this.nOpenNum >= 2 || !PlayerDataManager.getInstance().bIsNewPlayer) && BaseConst.infos.gameInfo.openPsAward == 1) {
            this.timerChangerImage();
        } else {
            this.changeImage();
        }
    }

    private bContinue: boolean = false;
    /**5秒后变化图标 */
    private timerChangerImage() {
        this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_2.png";
        this.bContinue = false;
        Laya.timer.clear(this, this.changeImage);
        Laya.timer.once(5000, this, this.changeImage);
    }
    private changeImage() {
        this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_3.png";
        this.bContinue = true;
    }
    private onSpeical() {
        if (this.bContinue) {
            if(!MoreGameRandomGameBox713Temp.bSpecial){
                if (MoreGameRandomGameBox713Temp.bSuccess) {
                    ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                } else {
                    ViewManager.getInstance().showView(FailEntryTwoView);
                }
            }
            
            MoreGameRandomGameBox713Temp.bSuccess = false;
            MoreGameRandomGameBox713Temp.bSpecial = false;
            this.removeSelf();
        } else {
            this.goToGameRandom();
        }
    }

    public onMove() {
        let nHight = this.moreGamePanel.height;
        this.moreGamePanel2.y -= 2;
        this.moreGamePanel.y -= 2;
        if (this.moreGamePanel.y <= -nHight) {
            this.moreGamePanel.y = this.moreGamePanel2.y + nHight;
        }
        if (this.moreGamePanel2.y <= -nHight) {
            this.moreGamePanel2.y = this.moreGamePanel.y + nHight;
        }
    }

    private onBackTemp() {
        if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
            // MoreGameView.bSpeical = true;
            // ViewManager.getInstance().showView(MoreGameView);
            ViewManager.getInstance().showView(MoreGameViewTemp);
        } else {
            //MoreGameRandomGameBox713Temp.bSpecial = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
        }
    }

    //2020.7.13-5
    private onBack() {
        MoreGameRandomGameBox713Temp.bSuccess = false;
        MoreGameRandomGameBox713Temp.bSpecial = false;
        this.removeSelf();
        Laya.timer.clearAll(this);
    }


    private getRandomIndex(nMax: number): number[] {
        if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
            return [];
        }
        let nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
        let nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
        if (nCount > 0) {
            nCount = 3 - nCount;
        }

        nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
        if (nCount <= nMax) {
            nCount = nMax;
        }
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


    /**2020.5.25 新的运营需求 */
    // static bOperFlag:boolean = false; //2020.5.25 修改运营 新的导出需求 true 表示在结算界面之前进入  false 表示从其他情况进入
    // static bSuccess:boolean  = false; //2020.5.25 修改运营 true 表示当前成功   false 表示当前失败
    private onClickOper() {

    }


    public aryCatMiniIconsInfoTemp: any[];
    private goToGameRandom() {
        this.aryCatMiniIconsInfoTemp = GameData.getInstance().weCatMiniIconsInfo;
        //this.onClickOper();
        if (this.aryCatMiniIconsInfoTemp.length <= 0) {
            return;
        }
        this.nRandomIndxe = Utils.random(0, this.aryCatMiniIconsInfoTemp.length - 1);
        //嘟游
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.clickGame(this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id);
        }
        let self = this;
        let stData = this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id
        let data = {
            appId: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].ad_appid,
            path: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].url,
            success: function () {
                console.log("navigateToMiniProgram success");
                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    console.log("self.nIndex = ", stData);
                    PlatformDY.toGame(stData.ad_id);
                }
            },
            fail: function (e) {
                console.log("navigateToMiniProgram fail e =", e); //嘟游
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        platform.navigateToMiniProgram(data);

    }
}