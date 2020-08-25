import MoreGameOperReqIndex from "./MoreGameOperReqIndex";
import GameStatusMgr from "../../../games/GameStateManager";
import { GameManager } from "../../../manager/GameManager";
import MoreGameRandomGameBoxItem713 from "./MoreGameRandomGameBoxItem713";
import PlatformDY from "../../../../PlatformDY";
import MoreGameOperRequestTwo from "./MoreGameOperRequestTwo";
import MoreGameRandomGameBox713Temp from "./MoreGameRandomGameBox713Temp";
import WeCatMoreGameView from "./WeCatMoreGameView";
import MoreGameViewTemp from "./MoreGameViewTemp";
import { PopBaseScene } from "../../base/PopBaseScene";
import { MiniManeger } from "../../../minigame/MiniManeger";
import ViewChangeManager from "../../../games/ViewChangeManager";
import { PlayerDataManager } from "../../../common/GameDataManager";
import { LevelManager } from "../../../manager/LevelManager";
import { GameData } from "../../../common/GameData";
import { GoodsType, EnterGameType } from "../../../games/CommonDefine";
import AddPsView from "../AddPsView";
import SuccessfulEntryOneView from "../SuccessfulEntryOneView";
import SuccessfulEntryThreeView from "../SuccessfulEntryThreeView";
import FailEntryTwoView from "../FailEntryTwoView";
import GameStateManager from "../../../games/GameStateManager";

//随机游戏盒子
export default class MoreGameRandomGameBox713 extends PopBaseScene {
    className_key = "MoreGameOperRequest";
    public imageBtReturn: Laya.Image;
    public imageBtConGame: Laya.Image;
    public moreGamePanel: Laya.Box;
    public lableTitle: Laya.Label;
    private nRandomIndxe: number;
    private panel_gamelist: Laya.Panel;
    private moreGamePanel2: Laya.Box;

    static bOperFlag: boolean = false;       //2020.5.25 修改运营 新的导出需求 true 表示在结算界面之前进入  false 表示从其他情况进入
    static bSuccess: boolean = false;       //2020.5.25 修改运营 true 表示当前成功   false 表示当前失败
    static toHome: boolean = false;       //2020.5.28 修改运营 true 表示当前成功   false 表示当前失败 直接进入主页
    static bGotoNextGame: boolean = false;   //是否到下一关
    static bEnterHotBox: boolean = false;
    static bReStartGame: boolean = false;

    static nEnterCount: number = 0;

    private bAniOver: boolean;

    private imageRandom: Laya.Image;
    public nOpenNum: number;
    constructor() {
        super();
        this.skin = "game/uiView/wecat/MoreGameRandomGameBox713.json";
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
        ViewChangeManager.getInstance().CommonView.visible = false;
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
            } else {
                pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i]);

                let nAddX = Math.floor(i % nCount);
                let nYAdd = Math.floor(i / nCount);
                pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                this.nTimePanel = (nYAdd + 1) * 1000;
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
                this.nTimePanel = (nYAdd + 1) * 1000;
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

    private onSpecialGotoGame() {
        // //2020.8.4
        if (PlayerDataManager.bGlobEnterGame) {
            ViewManager.getInstance().showView(WeCatMoreGameView);
            this.removeSelf();
            Laya.timer.clearAll(this);
            //执行操作后清理数据
            MoreGameRandomGameBox713.bOperFlag = false;
            MoreGameRandomGameBox713.bSuccess = false;
            MoreGameRandomGameBox713.bGotoNextGame = false;
            MoreGameRandomGameBox713.toHome = false;
            MoreGameRandomGameBox713.bEnterHotBox = false;
            MoreGameRandomGameBox713.bReStartGame = false;
            return
        }
        this.onClickOper();
    }

    private onSpeical() {
        if (this.bContinue) {
            this.onSpecialGotoGame();
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
        // MoreGameView.bSpeical = true;
        // ViewManager.getInstance().showView(MoreGameView);
        if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
            // MoreGameView.bSpeical = true;
            // ViewManager.getInstance().showView(MoreGameView);
            ViewManager.getInstance().showView(MoreGameViewTemp);
        } else {
            MoreGameRandomGameBox713Temp.bSpecial = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
        }
    }

    //2020.7.13-5
    private onBack() {
        MoreGameOperRequestTwo.bOperFlag = MoreGameRandomGameBox713.bOperFlag
        MoreGameOperRequestTwo.bSuccess = MoreGameRandomGameBox713.bSuccess
        MoreGameOperRequestTwo.bGotoNextGame = MoreGameRandomGameBox713.bGotoNextGame
        MoreGameOperRequestTwo.toHome = MoreGameRandomGameBox713.toHome;
        MoreGameOperRequestTwo.bReStartGame = MoreGameRandomGameBox713.bReStartGame;
        // ViewChangeManager.getInstance().CommonView.visible = true;
        //2020-7-13
        MiniManeger.instance.bFlagSpecialView = false;
        ViewManager.getInstance().showView(MoreGameOperRequestTwo);
        this.removeSelf();
        Laya.timer.clearAll(this);

        //执行操作后清理数据
        MoreGameRandomGameBox713.bOperFlag = false;
        MoreGameRandomGameBox713.bSuccess = false;
        MoreGameRandomGameBox713.bGotoNextGame = false;
        MoreGameRandomGameBox713.toHome = false;
        MoreGameRandomGameBox713.bEnterHotBox = false;
        MoreGameRandomGameBox713.bReStartGame = false;
    }

    private goToGame() {

        //    this.onClickOper();
        //     if (GameData.getInstance().weCatMiniIconsInfo.length <= 0) {
        //         return;
        //     }
        //     this.nRandomIndxe = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
        //     嘟游
        //     if (BaseConst.infos.gameInfo.isDY) {
        //         PlatformDY.clickGame(GameData.getInstance().weCatMiniIconsInfo[this.nRandomIndxe].ad_id);
        //     }
        //     let self = this;
        //     let data = {
        //         appId: GameData.getInstance().weCatMiniIconsInfo[self.nRandomIndxe].ad_appid,
        //         path: GameData.getInstance().weCatMiniIconsInfo[self.nRandomIndxe].url,
        //         success: function () {b
        //             console.log("navigateToMiniProgram success");
        //             嘟游
        //             if (BaseConst.infos.gameInfo.isDY) {
        //                 console.log("self.nIndex = ", self.nRandomIndxe);
        //                 PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[self.nRandomIndxe].ad_id);
        //             }
        //         },
        //         fail: function (e) {
        //             console.log("navigateToMiniProgram fail e =", e); //嘟游
        //         }
        //     };
        //     platform.navigateToMiniProgram(data);

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

    /**滚动效果 */
    private scrollSizeMax = 50;
    private nTimePanel = 5000;
    private panelScrollAni() {
        // Laya.Tween.clearAll(this.moreGamePanel.vScrollBar);
        // Laya.timer.clearAll(this.panelScrollAni);
        // // console.log("  this.panelWeCatMoreGame.vScrollBar.value =", this.moreGamePanel.vScrollBar.value,
        // //     "this.scrollSizeMax = ", this.scrollSizeMax);
        // // this.moreGamePanel.vScrollBar.touchScrollEnable =
        // //     this.moreGamePanel.vScrollBar.mouseWheelEnable = false;
        // console.log("max = ", this.moreGamePanel.vScrollBar.max, "min = ", this.moreGamePanel.vScrollBar.min);
        // Laya.Tween.to(this.moreGamePanel.vScrollBar, { value: this.scrollSizeMax }, this.nTimePanel, null, Laya.Handler.create(this, (args) => {
        //     Laya.Tween.to(this.moreGamePanel.vScrollBar, { value: 0 }, this.nTimePanel, null, Laya.Handler.create(this, (args) => {
        //         this.scrollSizeMax = this.moreGamePanel.vScrollBar.max;
        //         Laya.timer.once(0, this, this.panelScrollAni);
        //     }));
        // }));
    }



    /**2020.5.25 新的运营需求 */
    // static bOperFlag:boolean = false; //2020.5.25 修改运营 新的导出需求 true 表示在结算界面之前进入  false 表示从其他情况进入
    // static bSuccess:boolean  = false; //2020.5.25 修改运营 true 表示当前成功   false 表示当前失败
    private onClickOper() {
        // //2020.7.13-5  6、过关页—随机盒子—热门推荐盒子页—进入下一关。
        if (!MoreGameRandomGameBox713.bEnterHotBox) {
            //2020-7-13
            MiniManeger.instance.bFlagSpecialView = true;
            //如果是进入下一关
            if (MoreGameRandomGameBox713.bGotoNextGame) {
                let nSpCost = 1;
                //检测体力是否足够
                let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                if (!b) {
                    TipsManager.getInstance().showDefaultTips("体力不足");
                    ViewChangeManager.getInstance().showBufferLoadingView();
                    ResUtil.getIntance().loadGroups(["adsp"], async () => {
                        ViewManager.getInstance().showView(AddPsView);
                        ViewChangeManager.getInstance().hideBufferLoadingView();
                    });
                    return;
                }
                /**2020.6.1运营需求增加消息推送授权 */
                // if (DeviceUtil.isWXMiniGame()) {
                //     if (!MiniManeger.instance.bPushMsgShowFlagTen && PlayerDataManager.getInstance().getCurLevelToChallenge() + 1 == 10) {
                //         MiniManeger.instance.wxPushMsg();
                //         MiniManeger.instance.bPushMsgShowFlagTen = true;
                //     }
                // }
                //扣除体力
                PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                //2020.7.13-1-1

                if (PlayerDataManager.getInstance().getCurLevel() < BaseConst.infos.gameInfo.splevel
                    || BaseConst.infos.gameInfo.openPsAward == 0) {
                    ViewChangeManager.getInstance().goToNextLevel();
                } else {
                    //打开体力宝箱界面
                    //PlayerDataManager.getInstance().bEnterGameFromGameHome = false;
                    ViewManager.getInstance().showView(SuccessfulEntryOneView);
                }

            } else {
                //如果是从结算界面之前进入
                if (MoreGameRandomGameBox713.bOperFlag) {
                    //成功
                    if (MoreGameRandomGameBox713.bSuccess) {
                        //2020.7.13-1-1
                        if (BaseConst.infos.gameInfo.openPsAward == 1
                            && PlayerDataManager.getInstance().getCurLevel() >= BaseConst.infos.gameInfo.splevel
                            && BaseConst.infos.gameInfo.for_pay == 1) {
                            ViewManager.getInstance().showView(SuccessfulEntryOneView);
                        } else {
                            ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                        }
                    } else {//失败
                        //打开失败界面2
                        ViewManager.getInstance().showView(FailEntryTwoView);
                    }
                }
            }

            if (MoreGameRandomGameBox713.toHome) {
                //进入主页
                ViewChangeManager.getInstance().CurLevelBase.closeGameView();
                PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
                GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
                LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getCurLevelToChallenge());
            }
            ViewChangeManager.getInstance().CommonView.visible = true;
        } else {
            this.onBack(); ////2020.7.13-5 6、过关页—随机盒子—热门推荐盒子页—进入下一关。
        }
        this.removeSelf();
        Laya.timer.clearAll(this);
        //MiniManeger.instance.resetBinnerOper();
        MiniManeger.instance.showBannerAd();
        //执行操作后清理数据
        MoreGameRandomGameBox713.bOperFlag = false;
        MoreGameRandomGameBox713.bSuccess = false;
        MoreGameRandomGameBox713.bGotoNextGame = false;
        //2020.7.13-5
        MoreGameRandomGameBox713.toHome = false;
        MoreGameRandomGameBox713.bEnterHotBox = false;
        MoreGameRandomGameBox713.bReStartGame = false;
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
                MoreGameRandomGameBox713Temp.bSpecial = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        platform.navigateToMiniProgram(data);

    }
}