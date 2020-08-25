import { ConfigSignDataIndex, GameConfigIndex, LevelPsIndex, DialogBoxIndex, InviteConfigIndex } from "./ConfigDefine";
import { PlayerDataManager } from "../common/GameDataManager";
import GamePreLoadingView from "../loading/GamePreLoadingView";
import { GameManager } from "../manager/GameManager";

/*配置表相关逻辑*/
export default class ConfigManager {
    //单例
    private static instance: ConfigManager;
    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    constructor() {

    }

    //配置中的数据
    private aryGameConfig: GameConfigIndex[];
    private arySignData: ConfigSignDataIndex[];
    private aryLevelPsData: LevelPsIndex[];
    private aryDialogBoxIndex: DialogBoxIndex[];
    private aryInviteConfigIndex: InviteConfigIndex[];

    private mapDialogBoxIndex: any = {};

    /**初始化配置表信息 */
    public initConfigInfo(): Promise<void> {
        let self = ConfigManager.instance;
        let subF = "";
        let preF = "resource/assets/config/";
        if (DeviceUtil.isMiniGame()) {
            subF += "?v=" + Math.random();
        }
        return new Promise((resolve) => {
            let count: number = 0;
            let len: number = 5;
            let loadConfigSucc = function () {
                count++;
                if (count >= len) {
                    resolve();
                }
            };
            //GameConfig
            Laya.loader.load(preF + 'GameConfig.json' + subF, new Laya.Handler(self, (json: any) => {
                if (typeof (json) == "string") {
                    self.aryGameConfig = JSON.parse(json);
                } else {
                    self.aryGameConfig = json;
                }

                loadConfigSucc();
            }));

            //SignData
            Laya.loader.load(preF + 'SignConfig.json' + subF, new Laya.Handler(self, (json: any) => {
                if (typeof (json) == "string") {
                    self.arySignData = JSON.parse(json);
                } else {
                    self.arySignData = json;
                }

                loadConfigSucc();
            }));

            //LevelPs
            Laya.loader.load(preF + 'LevelPsInfo.json' + subF, new Laya.Handler(self, (json: any) => {

                if (typeof (json) == "string") {
                    self.aryLevelPsData = JSON.parse(json);
                } else {
                    self.aryLevelPsData = json;
                }
                loadConfigSucc();
            }));

            //DialogBox
            Laya.loader.load(preF + 'DialogBox.json' + subF, new Laya.Handler(self, (json: any) => {
                // console.log("DialogBox--", json);
                if (typeof (json) == "string") {
                    self.aryDialogBoxIndex = JSON.parse(json);
                } else {
                    self.aryDialogBoxIndex = json;
                }

                let nLen = self.aryDialogBoxIndex.length;
                for (let i = 0; i < nLen; ++i) {
                    self.mapDialogBoxIndex[self.aryDialogBoxIndex[i].id] = self.aryDialogBoxIndex[i];
                }

                loadConfigSucc();
            }));

            //InviteConfigIndex
            Laya.loader.load(preF + 'InviteConfig.json' + subF, new Laya.Handler(self, (json: any) => {
                if (typeof (json) == "string") {
                    self.aryInviteConfigIndex = JSON.parse(json);
                } else {
                    self.aryInviteConfigIndex = json;
                }

                loadConfigSucc();
            }));

        });
    }

    /**获取邀请的数据信息 */
    public getInviteConfigInfo() {
        return ConfigManager.instance.aryInviteConfigIndex;
    }

    /**获取签到的配置数据信息*/
    public getSignDataAll(): ConfigSignDataIndex[] {
        return ConfigManager.instance.arySignData;
    }

    /**通过签到编号获取签到数据*/
    public getSignDataBySignID(nIndex: number): ConfigSignDataIndex {
        if (nIndex < 0 || nIndex >= ConfigManager.instance.arySignData.length) {
            return null;
        }
        return ConfigManager.instance.arySignData[nIndex];
    }


    /**通过ID获取GameConfig中的配置数据 */
    public getGameConfigDataByID(nID: number): GameConfigIndex {
        if (nID > ConfigManager.instance.aryGameConfig.length || nID <= 0) {
            return null;
        }
        let nRealID = nID - 1;
        return ConfigManager.instance.aryGameConfig[nRealID];
    }

    /**通过当前关卡获取宝箱信息 */
    public getTreasureByCurLevel(): number {
        let nRealIndex = PlayerDataManager.getInstance().getCurLevel();
        if (nRealIndex < 0 || ConfigManager.instance.aryLevelPsData.length < 0) {
            return 0
        }
        nRealIndex = nRealIndex >= ConfigManager.instance.aryLevelPsData.length ? ConfigManager.instance.aryLevelPsData.length - 1 : nRealIndex;
        return ConfigManager.instance.aryLevelPsData[nRealIndex].nPs;
    }

    /**通过对话空ID获得坐标和描述信息 */
    public getDialogInfo(nDialogID: number): any {
        return ConfigManager.instance.mapDialogBoxIndex[nDialogID];
    }
}