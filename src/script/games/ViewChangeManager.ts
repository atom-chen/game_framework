import { LevelBase } from "../views/game/level/LevelBase";
import CommonView from "../views/game/CommonView";
import GameStateManager from "./GameStateManager";
import { PlayerDataManager } from "../common/GameDataManager";
import { EnterGameType } from "./CommonDefine";
import { LevelManager } from "../manager/LevelManager";
import GameBufferLoading from "../loading/GameBufferLoading";
import { MiniManeger } from "../minigame/MiniManeger";
import PlatformDY from "../../PlatformDY";
import { GameData } from "../common/GameData";
import MoreGameViewTemp from "../views/game/wecat/MoreGameViewTemp";
import MoreGameRandomGameBox713Temp from "../views/game/wecat/MoreGameRandomGameBox713Temp";
import WeCatMoreGameView from "../views/game/wecat/WeCatMoreGameView";
import MoreGameRandomGameBox713 from "../views/game/wecat/MoreGameRandomGameBox713";
import AddPsView from "../views/game/AddPsView";
import ShouMoreGameInView from "../views/game/wecat/ShouMoreGameInView";

export default class ViewChangeManager {

    private static instance: ViewChangeManager;
    public static getInstance(): ViewChangeManager {
        if (!this.instance) {
            this.instance = new ViewChangeManager();
        }
        return this.instance;
    }

    public static bGameOpen: boolean = false;

    constructor() {

    }

    /**当前关卡场景的引用*/
    private pCurLevelBase: LevelBase;

    private pCommonView: CommonView;

    public get CommonView() {
        if (!this.pCommonView) {
            this.pCommonView = new CommonView();
            this.pCommonView.x = 0;
            this.pCommonView.y = 0;
        }
        return this.pCommonView;
    }

    public get CurLevelBase() {
        return this.pCurLevelBase;
    }

    public set CurLevelBase(pCurLevelBase: LevelBase) {
        this.pCurLevelBase = pCurLevelBase;
    }

    public showCommonView() {
        Laya.stage.addChild(this.CommonView);
    }

    public gotoLevel(nCurLevel: number) {
        PlayerDataManager.getInstance().setCurLevel(nCurLevel - 1);
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ChooseLevel;
        LevelManager.getInstance().createLevelScene(nCurLevel);
    }

    /**切换到下一关 */
    public goToNextLevel(bFlag: boolean = false) {
        MiniManeger.instance.StopVideo();
        this.pCurLevelBase.closeGameView();
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_Next;
        PlayerDataManager.getInstance().addLevel();
        //如果当前已经达到最大关卡
        let nLevel = PlayerDataManager.getInstance().getCurLevelToChallenge();
        LevelManager.getInstance().createLevelScene(nLevel);
    }

    /**全部重新开始 */
    public restartGame(bAll: boolean = true) {
        //开始游戏
        GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ReStart;
        //ViewChangeManager.getInstance().CurLevelBase.restartGame(false);
        this.pCurLevelBase.restartGame(bAll);
    }


    public rigestBufferLoadingView(): void {
        BufferLoadingManger.getInstance().registerOneBuffer("gamebuffer", new GameBufferLoading());
    }

    public showBufferLoadingView(): void {
        BufferLoadingManger.getInstance().showBuffer("gamebuffer");
    }

    public hideBufferLoadingView(): void {
        BufferLoadingManger.getInstance().hiddBuffer("gamebuffer");
    }

    /**
     * 进入游戏
     */
    public startGame(): void {
        if (!BaseConst.infos.gameInfo.isDY) {
            return;
        }
        if (!DeviceUtil.isWXMiniGame() && !DeviceUtil.isQQMiniGame() && !DeviceUtil.isTTMiniGame()) return
        PlatformDY.startGame();
    }

    /**
     * 游戏结束
     */
    public endGame(): void {
        if (!BaseConst.infos.gameInfo.isDY) {
            return;
        }
        if (!DeviceUtil.isWXMiniGame() && !DeviceUtil.isQQMiniGame() && !DeviceUtil.isTTMiniGame()) return
        PlatformDY.endGame({ id: PlatformDY.nGameID, level: PlayerDataManager.getInstance().getCurLevelToChallenge() });
    }

    /**全局增加一个退出按钮 */
    private image_exit: Laya.Image = null;
    public showImageExit() {
        if (!DeviceUtil.isWXMiniGame()) {
            return;
        }
        if (PlayerDataManager.getInstance().stOperData0807.bSpecial == false && BaseConst.infos.gameInfo.bwrite == 1) {
            console.log("GameDataMgr.getInstance().enterGameInfo", GameData.getInstance().enterGameInfo);
            if (GameData.getInstance().enterGameInfo.enterGameInfo == {}) {
                return;
            }
            if (!GameData.getInstance().enterGameInfo.referrerInfo.appId) {
                return;
            }
            if ("wxcff7381e631cf54e" == GameData.getInstance().enterGameInfo.referrerInfo.appId) {
                return;
            }
        }
        PlayerDataManager.getInstance().stOperData0807.bSpecial = true;
        //if(GameDataMgr.getInstance().enterGameInfo.referrerInfo.appId)
        if (this.image_exit) {
            return;
        }
        this.image_exit = new Laya.Image();
        this.image_exit.skin = "resource/assets/img/wecat/button.png";
        this.image_exit.right = 23;
        this.image_exit.top = 220;
        Laya.stage.addChild(this.image_exit);
        this.image_exit.on(Laya.Event.CLICK, this, this.onImageExit);
        PlayerDataManager.getInstance().SaveData();
    }

    private onImageExit() {
        if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
            ViewManager.getInstance().showView(MoreGameViewTemp);
        } else {
            MoreGameRandomGameBox713Temp.bSpecial = true;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
        }
    }

    public showImageExitTemp() {
        if (this.image_exit) {
            this.image_exit.visible = true;
        }
    }

    public hideImageExitTemp() {
        if (this.image_exit) {
            this.image_exit.visible = false;
        }
    }

    public restartEnterGameHome() {
        if (!DeviceUtil.isWXMiniGame()) {
            return;
        }

        if (PlayerDataManager.getInstance().bIsNewPlayer) {
            PlayerDataManager.bGlobEnterGame = false;
            return;
        }

        if (BaseConst.infos.gameInfo.openPsAward == 0) {
            PlayerDataManager.bGlobEnterGame = false;
            return;
        }
        PlayerDataManager.bGlobEnterGame = true;
        WeCatMoreGameView.nEnterCount = 0;
        ViewManager.getInstance().showView(MoreGameRandomGameBox713);
        this.pCommonView.visible = false;
        //this.hideCommonView();
    }
    /**
         * 体力不足
         */
    public onPowerNotEnough() {
        TipsManager.getInstance().showDefaultTips("体力不足");
        ViewChangeManager.getInstance().showBufferLoadingView();
        //EventMgr.getInstance().sendEvent(GameEvent.BUFFER_LOAD, true);
        ResUtil.getIntance().loadGroups(["adsp"], () => {
            ViewManager.getInstance().showView(AddPsView);
            ViewChangeManager.getInstance().hideBufferLoadingView();
           // EventMgr.getInstance().sendEvent(GameEvent.BUFFER_LOAD, false);
        });
    }
    private pShouMoreGameInView: ShouMoreGameInView;
    public  showMoreGameinView(bAni:boolean = true) {
        if (!this.pShouMoreGameInView) {
            this.pShouMoreGameInView = new ShouMoreGameInView();
        } else {
            this.pShouMoreGameInView.refreshWeCatMoreGame();
        }
        this.pShouMoreGameInView.ani = bAni;
        return this.pShouMoreGameInView;
    }

}