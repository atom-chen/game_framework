import { GoodsType, SkinState } from "../games/CommonDefine";
import ConfigManager from "../games/ConfigManager";
import GameLogicProcessingManager from "../games/GameLogicProcessingManager";
import GameEvent from "../games/GameEvent";
import { GameData } from "./GameData";
import ViewChangeManager from "../games/ViewChangeManager";

export class PlayerDataBase {
    nMaxLevel: number;
    nCurLevel: number;
    nCurIndex: number;

    /**签到相关数据 */
    nSignTimeLast: number;       //上一次签到时间
    nSignIndex: number;          //已经签到的天数

    nGlodCount: number;           //金币数量
    nPS: number;             //体力数量
    nPsTime: number;     //开始当前体力回复的时间节点

    
    nLotteryCount: number; //抽奖次数
    nLotteryTimeLast: number;       //上一次抽奖时间
    /** 已经领取过邀请奖励的id数组 */
    public inviteId: number[] = [];

    constructor() {
        this.nMaxLevel = 0;
        this.nCurLevel = 0;
        this.nCurIndex = 0;

        this.nSignTimeLast = 0;
        this.nSignIndex = 0;

        this.nGlodCount = 0;
        this.nPS = 5;
        this.nPsTime = 0;
    }
}

/**新需求 记录下发送了嘟游日志的关卡 */
class DYLogData {
    aryIndex: number[];
    constructor() {
        this.aryIndex = [];
    }
}

/**task20200611 新需求的记录 */
class NewOperData {
    nMaxLevelNew: number;
    nLastMaxLevel: number;
    constructor() {
        this.nMaxLevelNew = 0;
        this.nLastMaxLevel = 0;
    }

}

/**新增的每日看视频无限体力功能*/
class NewFuncPsLimitless {
    nRefreshTime: number;    //上一次刷新时间
    nCurTime: number;        //当前已经观看的次数
    nMaxTime: number;        //需要观看的最大次数
    constructor() {
        this.nRefreshTime = 0;
        this.nCurTime = 0;
        this.nMaxTime = 5;
    }
}

class  OperData0807{
    bSpecial:boolean;
    constructor(){
        this.bSpecial = false;
    }
}

export class PlayerDataManager {

    private static instance: PlayerDataManager;
    public static getInstance(): PlayerDataManager {
        if (!this.instance) {
            this.instance = new PlayerDataManager();
        }
        return this.instance;
    }
    public static  bGlobEnterGame:boolean = false;

    /**记录玩家切换到后台的时间**/
    public static nTimeHidSec: number = 0;

    public static nHidTime: number = 0;

    /**当前最大关卡 */
    public nMaxLevelCount: number = 30;

    /**体力回复的时间 */
    private nPsRecoveryTime: number;

    /**倒计时的时间*/
    private nPsTimeCountDown: number;

    /**当前的倒计时字符串 */
    private strUpDownTime: string;

    /**是否是新玩家 */
    public bIsNewPlayer: boolean;

    /**玩家数是否加载完成 */
    public bPlayerLoadFinish: boolean;

    /**资源是否加载完成 */
    public bResLoadFinish: boolean;

    /**task20200611*/
    private stNewOperData: NewOperData;

    /**新增看视频无限体力功能数据 */
    private stNewFuncPsLimitless: NewFuncPsLimitless;

    public stOperData0807:OperData0807;

    constructor() {
        this.stPlayerDataBase = new PlayerDataBase();
        this.stDYLogData = new DYLogData();
        this.stNewOperData = new NewOperData();/**task20200611 */
        this.stNewFuncPsLimitless = new NewFuncPsLimitless();
        this.nPsRecoveryTime = 0;
        this.nPsTimeCountDown = 0;
        this.strUpDownTime = "";
        this.bIsNewPlayer = false;
        this.bPlayerLoadFinish = false;
        this.bResLoadFinish = false;
        this.stOperData0807= new OperData0807();
        //头条提审的特殊处理
        this.ttMiniGameArraignmentSpecialOper();
    }

    public stPlayerDataBase: PlayerDataBase;

    public stDYLogData: DYLogData;

    /*增加关卡 */
    public addLevel() {

        this.stPlayerDataBase.nCurLevel += 1;
        if (this.stNewOperData.nMaxLevelNew < this.stPlayerDataBase.nCurLevel) {
            this.stNewOperData.nMaxLevelNew = this.stPlayerDataBase.nCurLevel;
            this.stNewOperData.nMaxLevelNew = this.stNewOperData.nMaxLevelNew >= this.nMaxLevelCount ? this.nMaxLevelCount : this.stNewOperData.nMaxLevelNew;
        }
        this.stPlayerDataBase.nCurLevel = this.stPlayerDataBase.nCurLevel < this.nMaxLevelCount ? this.stPlayerDataBase.nCurLevel : this.nMaxLevelCount - 1;
        if (this.stPlayerDataBase.nMaxLevel < this.stPlayerDataBase.nCurLevel) {
            this.stPlayerDataBase.nMaxLevel = this.stPlayerDataBase.nCurLevel;
        }

        this.SaveData();
    }

    /**获得当前关卡 */
    public getCurLevel() {
        return this.stPlayerDataBase.nCurLevel;
    }

    /**在胜利界面点击重来需要吧当前值 */

    /**获取当前最大关卡 */
    public getCurLevelMax() {
        return this.stPlayerDataBase.nMaxLevel;
    }

    /**设置当前关卡 */
    public setCurLevel(nLevel: number) {
        this.stPlayerDataBase.nCurLevel = nLevel;

        this.SaveData();
    }

    /**获得当前应该挑战的关卡 */
    public getCurLevelToChallenge(): number {
        let nRealData = this.stPlayerDataBase.nCurLevel + 1;
        if (nRealData > this.nMaxLevelCount) {
            nRealData = this.nMaxLevelCount;
        }
        if (this.allCustomsClearance()) {
            nRealData = Utils.random(1, this.nMaxLevelCount);
        }
        return nRealData;
    }

    /**主页上应该挑战的最大关卡 */
    public getLevelToChangeMaxLevel() {
        let nRealData = this.stPlayerDataBase.nMaxLevel + 1;
        if (nRealData > this.nMaxLevelCount) {
            nRealData = this.nMaxLevelCount;
        }
        if (this.allCustomsClearance()) {
            nRealData = this.stPlayerDataBase.nCurLevel + 1;
            if (nRealData > this.nMaxLevelCount) {
                nRealData = this.nMaxLevelCount;
            }
        }
        return nRealData;
    }

    /**levelView上面的显示 */
    public getLevelToChangeMaxLevelForLevelView() {
        let nRealData = this.stPlayerDataBase.nMaxLevel + 1;
        if (nRealData > this.nMaxLevelCount) {
            nRealData = this.nMaxLevelCount;
        }
        return nRealData;
    }




    /**保存数据*/
    public SaveData() {
        let str: string = JSON.stringify(this.stPlayerDataBase);
        Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "BaseData", str);
        // //新增嘟游的日志记录
        // str = JSON.stringify(this.stDYLogData);
        // Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "DYLogData", str);

        /**task20200611 */
        str = JSON.stringify(this.stNewOperData);
        Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "task20200611", str);

        /**无限体力 */
        str = JSON.stringify(this.stNewFuncPsLimitless);
        Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "NewFuncPsLimitless", str);

        let strNewOper0807 = JSON.stringify(this.stOperData0807);
        Laya.LocalStorage.setItem("OperData0807" + GameData.getInstance().userInfo.openId, strNewOper0807);
    }

    /**获取数据*/
    public GetData() {
        let str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "BaseData");
        if (str) {
            try {
                this.stPlayerDataBase = JSON.parse(str);
                this.bIsNewPlayer = false;
            } catch (e) {
                console.log("error player data : ", e);
                this.bIsNewPlayer = true;
                this.stPlayerDataBase = new PlayerDataBase();
            }
        } else {
            this.bIsNewPlayer = true;
        }
        //新增嘟游的日志记录
        // str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "DYLogData");
        // if (str) {
        //     try {
        //         this.stDYLogData = JSON.parse(str);
        //     } catch (e) {
        //         console.log("error player data : ", e);
        //         this.stDYLogData = new DYLogData();
        //     }
        // }

        /**task20200611 */
        str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "task20200611");
        if (str) {
            try {
                this.stNewOperData = JSON.parse(str);
            } catch (e) {
                console.log("error player data : ", e);
                this.stNewOperData = new NewOperData();
            }
        }

        let strOperData0807 = Laya.LocalStorage.getItem("OperData0807" + GameData.getInstance().userInfo.openId);
        if (strOperData0807) {
            this.stOperData0807 = JSON.parse(strOperData0807);
        } else {
            this.stOperData0807 = new OperData0807();
        }

        /**无限体力 */
        str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "NewFuncPsLimitless");
        if (str) {
            try {
                this.stNewFuncPsLimitless = JSON.parse(str);
            } catch (e) {
                console.log("error player data : ", e);
                this.stNewFuncPsLimitless = new NewFuncPsLimitless();
            }
        }

        if (this.stNewFuncPsLimitless.nRefreshTime == 0) {
            this.stNewFuncPsLimitless.nRefreshTime = new Date().getTime();
        }
        let nCurTime = new Date().getTime();
        if (!Utils.judgeIsOnTheSameDay(this.stNewFuncPsLimitless.nRefreshTime, nCurTime)) {
            this.stNewFuncPsLimitless.nCurTime = 0;
            this.stNewFuncPsLimitless.nRefreshTime = nCurTime;
        }

        if (this.stNewOperData.nMaxLevelNew == 0) {
            this.stNewOperData.nMaxLevelNew = this.stPlayerDataBase.nMaxLevel;
        }

        if (this.stNewOperData.nLastMaxLevel == 0) {
            this.stNewOperData.nLastMaxLevel = this.nMaxLevelCount;
        }
        if (this.stNewOperData.nLastMaxLevel < this.nMaxLevelCount && (this.stPlayerDataBase.nMaxLevel + 1) == this.stNewOperData.nMaxLevelNew) {
            this.stPlayerDataBase.nMaxLevel += 1;
            this.stNewOperData.nLastMaxLevel = this.nMaxLevelCount;
        }

        if (BaseConst.infos.gameInfo.openalllevel && BaseConst.infos.gameInfo.openalllevel == 1) {
            this.stPlayerDataBase.nCurLevel = this.nMaxLevelCount - 1;
            this.stPlayerDataBase.nMaxLevel = this.nMaxLevelCount - 1;
            this.bIsNewPlayer = false;
        }

        // str = JSON.stringify(this.stNewOperData);
        // Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "task20200611", str);
        //刷新数据
        EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
        EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
        this.bPlayerLoadFinish = true;
        if (this.bResLoadFinish && BaseConst.infos.gameInfo.isDY) {
            EventMgr.getInstance().sendEvent(GameEvent.HAS_GET_PLAYER_DATA);
        }

        if (this.stNewFuncPsLimitless.nCurTime == this.stNewFuncPsLimitless.nMaxTime) {
            EventMgr.getInstance().sendEvent(GameEvent.PS_LIMITLESS);
        }

        
    }

    /**增加道具 */
    public AddGoods(nType: number, nCount: number) {
        if (nType == GoodsType.enum_GoodsType_Glod) {
            this.stPlayerDataBase.nGlodCount += nCount;
            //发送金币变更的时间
            EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
        } else if (nType == GoodsType.enum_GoodsType_Sp) {
            this.stPlayerDataBase.nPS += nCount;
            let nMax = 99;
            let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(4)
            if (stGameConfig) {
                nMax = parseInt(stGameConfig.strValue);
            }
            if (this.stPlayerDataBase.nPS > nMax) {
                TipsManager.getInstance().showDefaultTips("体力已满");
                this.stPlayerDataBase.nPS = nMax;
            }
            //发送体力变更的时间
            EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
            //开启体力倒计时的时间检测
            this.openPSRecoveryTime();
        }
        this.SaveData();
    }

    /**检测道具是否足够 */
    public CheckGoods(nType: number, nCount: number): boolean {
        if (nType == GoodsType.enum_GoodsType_Glod) {
            return this.stPlayerDataBase.nGlodCount >= nCount;
        } else if (nType == GoodsType.enum_GoodsType_Sp) {
            //进入无限状态直接返回true
            if (this.isPsLimitlessState()) {
                return true;
            }
            return this.stPlayerDataBase.nPS >= nCount;
        }
    }

    /**扣除道具*/
    public subGoods(nType: number, nCount: number) {
        if (nType == GoodsType.enum_GoodsType_Glod) {
            this.stPlayerDataBase.nGlodCount -= nCount;
            this.stPlayerDataBase.nGlodCount = this.stPlayerDataBase.nGlodCount < 0 ? 0 : this.stPlayerDataBase.nGlodCount;
            //发送金币变更的时间
            EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
        } else if (nType == GoodsType.enum_GoodsType_Sp) {
            //进入无限状态不扣体力
            if (this.isPsLimitlessState()) {
                return;
            }
            this.stPlayerDataBase.nPS -= nCount;
            this.stPlayerDataBase.nPS = this.stPlayerDataBase.nPS < 0 ? 0 : this.stPlayerDataBase.nPS;
            //发送体力变更的时间
            EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
            //开启体力倒计时的时间检测
            this.openPSRecoveryTime();
        }
        this.SaveData();
    }

    /**获取体力剩余时间 */
    public getSpLastTime(): string {
        return this.strUpDownTime;
    }

    /**触发计算离线体力 */
    public refreshOffLinePS() {
        //读取数据的时候刷新下离线的体力
        this.addPsAboutOffLine();
        //开启体力倒计时的检测
        this.openPSRecoveryTime();
    }

    /**离线的体力计算 */
    public addPsAboutOffLine() {
        //没有开启过体力恢复
        if (this.stPlayerDataBase.nPsTime == 0) {
            return;
        }
        let nMaxPs = 10;
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(1);
        if (stGameConfig) {
            nMaxPs = parseInt(stGameConfig.strValue);
        }
        //超过时间回复的最大值
        if (this.stPlayerDataBase.nPS >= nMaxPs) {
            return;
        }
        //回复体力
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(2);
        if (stGameConfig) {
            let nAddPsPerTime = parseInt(stGameConfig.strValue);
            if (nAddPsPerTime == 0) {
                return;
            }
            let nCurtTime = GameLogicProcessingManager.GetCurTime();
            let nTimeOverFlow = nCurtTime - this.stPlayerDataBase.nPsTime;
            let nPsAdd = Math.floor(nTimeOverFlow / nAddPsPerTime);
            this.stPlayerDataBase.nPS += nPsAdd;
            nTimeOverFlow = nTimeOverFlow % nAddPsPerTime;
            this.stPlayerDataBase.nPsTime = nCurtTime - nTimeOverFlow;
            if (this.stPlayerDataBase.nPS >= nMaxPs) {
                this.stPlayerDataBase.nPS = nMaxPs;
                this.stPlayerDataBase.nPsTime = 0;
            }
            this.SaveData();
        }
    }

    /**开启一个体力回复的倒计时 */
    private openPSRecoveryTime() {
        //初始化一下数据
        if (this.nPsRecoveryTime == 0) {
            let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(2);
            if (!stGameConfig) {
                return;
            }
            this.nPsRecoveryTime = parseInt(stGameConfig.strValue);
        }
        let nMaxPs = 10;
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(1);
        if (stGameConfig) {
            nMaxPs = parseInt(stGameConfig.strValue);
        }
        //超过时间回复的最大值
        if (this.stPlayerDataBase.nPS >= nMaxPs) {
            Laya.timer.clear(this, this.subTimeAndRefreshPsRecoveryTimeView);
            this.stPlayerDataBase.nPsTime = 0;
            GameLogicProcessingManager.getInstance().PSRecoveryOpen = false;
        } else {
            if (!GameLogicProcessingManager.getInstance().PSRecoveryOpen) {
                GameLogicProcessingManager.getInstance().PSRecoveryOpen = true;
                let nCurTime = GameLogicProcessingManager.GetCurTime();
                if (this.stPlayerDataBase.nPsTime == 0) {
                    this.stPlayerDataBase.nPsTime = nCurTime;
                }
                //离线和在线统一处理
                this.nPsTimeCountDown = this.nPsRecoveryTime - (nCurTime - this.stPlayerDataBase.nPsTime);
                //开启时间倒计时
                this.refreshPsRecoveryTimeView(this.nPsTimeCountDown);
                Laya.timer.loop(1000, this, this.subTimeAndRefreshPsRecoveryTimeView);
                //保存下时间
                this.SaveData();
            }
        }
    }

    /**定时更新界面的显示信息 */
    private subTimeAndRefreshPsRecoveryTimeView() {
        //已经关闭了
        if (!GameLogicProcessingManager.getInstance().PSRecoveryOpen) {
            return;
        }
        if (PlayerDataManager.nTimeHidSec != 0) {
            PlayerDataManager.nTimeHidSec = PlayerDataManager.nTimeHidSec - PlayerDataManager.nTimeHidSec % 1000;
        }
        this.nPsTimeCountDown -= 1000 + PlayerDataManager.nTimeHidSec;
        PlayerDataManager.nTimeHidSec = 0;
        //this.nPsTimeCountDown  = this.nPsTimeCountDown  < 0 ? 0 :this.nPsTimeCountDown;
        this.refreshPsRecoveryTimeView(this.nPsTimeCountDown);
    }

    /**刷新时间界面*/
    private refreshPsRecoveryTimeView(nTime: number) {
        let nLastTime = nTime;
        nLastTime = nLastTime < 0 ? 0 : nLastTime;
        //刷新界面显示
        // public timeMinTen:Laya.Sprite;
        // public timeMinBit:Laya.Sprite;
        // public timeSecTen:Laya.Sprite;
        // public timeSecBit:Laya.Sprite;
        nLastTime = Math.floor(nLastTime / 1000);
        let nMinTotal = Math.floor(nLastTime / 60);
        let nMinTen = Math.floor(nMinTotal / 10);
        let nMinBit = nMinTotal % 10;
        let nSecTotal = nLastTime % 60;
        // nSecTotal     = Math.floor(nSecTotal/1000);
        let nSecTen = Math.floor(nSecTotal / 10);
        let nSecBit = nSecTotal % 10;
        this.strUpDownTime = nMinTen.toString() + nMinTotal.toString() + ":" + nSecTen.toString() + nSecBit.toString();
        EventMgr.getInstance().sendEvent(GameEvent.ON_SP_UPDOWN_TIME);
        if (nTime < 0) {
            this.nPsTimeCountDown = 0;
            //设置为false
            GameLogicProcessingManager.getInstance().PSRecoveryOpen = false;
            //清空时间
            this.stPlayerDataBase.nPsTime = 0;
            //清理时钟
            Laya.timer.clear(this, this.refreshPsRecoveryTimeView);
            //增加体力
            this.AddGoods(GoodsType.enum_GoodsType_Sp, 1);
            return;
        }
    }

    /**已经做完的关卡数量 */
    public getLevelNumMakeOver() {
        return this.nMaxLevelCount;
    }


    /**初始化体力 */
    public initGoods() {
        if (!this.bIsNewPlayer) {
            return;
        }
        //初始话体力
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(15);
        if (stGameConfig) {
            this.stPlayerDataBase.nPS = parseInt(stGameConfig.strValue);
        }
        //初始化金币
        stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(16);
        if (stGameConfig) {
            this.stPlayerDataBase.nGlodCount = parseInt(stGameConfig.strValue);
        }
    }

    /**判断当天是否签到 */
    public isSign(): boolean {
        //判断当前是否能签到
        let nCurTime = GameLogicProcessingManager.GetCurTime();
        if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, nCurTime)) {
            return false;
        } else {
            return true;
        }
    }

    /**检测皮肤状态 text */
    public checkSkinState(nSkinID: number): number {
        let nState = SkinState.enum_SkinState_NotOwned;
        //to do
        if (nSkinID == 1) {
            nState = SkinState.enum_SkinState_Have;
        } else if (nSkinID == 2) {
            nState = SkinState.enum_SkinState_NotOwned;
        }
        return nState;
    }

    /**记录嘟游日志 */
    public recordDyLogIndex(nIndex: number) {
        this.stDYLogData.aryIndex.push(nIndex);
    }

    /**检测嘟游日志是否已经记录*/
    public checkDyLogIndexrecorded(nIndex: number): boolean {
        for (let i = 0; i < this.stDYLogData.aryIndex.length; ++i) {
            if (nIndex == this.stDYLogData.aryIndex[i]) {
                return true;
            }
        }
        return false;
    }

    /**头条提审的特殊操作 */
    public ttMiniGameArraignmentSpecialOper() {
        if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
            //if(BaseConst.infos.gameInfo.openPsAward == 0){
            this.nMaxLevelCount = this.nMaxLevelCount - 1;
        }
    }

    /**当前关卡是否全部通关了 */
    public allCustomsClearance() {
        return this.stNewOperData.nMaxLevelNew == PlayerDataManager.getInstance().nMaxLevelCount;
    }

    /**增加次数*/
    public addWatchVideoAddSpTime() {
        this.stNewFuncPsLimitless.nCurTime += 1;
        this.stNewFuncPsLimitless.nCurTime = this.stNewFuncPsLimitless.nCurTime > this.stNewFuncPsLimitless.nMaxTime ? this.stNewFuncPsLimitless.nMaxTime : this.stNewFuncPsLimitless.nCurTime;
        if (this.stNewFuncPsLimitless.nCurTime == this.stNewFuncPsLimitless.nMaxTime) {
            EventMgr.getInstance().sendEvent(GameEvent.PS_LIMITLESS);
        }
        this.SaveData();
    }

    /**当前是否是无限体力状态 */
    public isPsLimitlessState() {
        return this.stNewFuncPsLimitless.nCurTime >= this.stNewFuncPsLimitless.nMaxTime;
    }

    /**获取剩余次数 */
    public getPsLimitlessStateLastTime() {
        return this.stNewFuncPsLimitless.nMaxTime - this.stNewFuncPsLimitless.nCurTime;
    }

    /**获取无限体力数据 */
    public get pNewFuncPsLimitless() {
        return this.stNewFuncPsLimitless;
    }
    
    public checkIsSpecial(){
        return this.stOperData0807.bSpecial;
    }
}