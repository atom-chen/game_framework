
import { GameManager } from "./GameManager";
import { LevelScene1 } from "../views/game/level/LevelScene1";
import { LevelScene2 } from "../views/game/level/LevelScene2";
import { LevelScene3 } from "../views/game/level/LevelScene3";
import { LevelScene4 } from "../views/game/level/LevelScene4";
import { LevelScene5 } from "../views/game/level/LevelScene5";
import { LevelScene6 } from "../views/game/level/LevelScene6";
import LevelScene7 from "../views/game/level/LevelScene7";
import LevelScene8 from "../views/game/level/LevelScene8";
import LevelScene9 from "../views/game/level/LevelScene9";
import LevelScene10 from "../views/game/level/LevelScene10";
import LevelScene11 from "../views/game/level/LevelScene11";
import LevelScene12 from "../views/game/level/LevelScene12";
import { PlayerDataManager } from "../common/GameDataManager";
import ViewChangeManager from "../games/ViewChangeManager";
import { MiniManeger } from "../minigame/MiniManeger";
import { LevelBase } from "../views/game/level/LevelBase";
import { GameData } from "../common/GameData";
import LevelScene14 from "../views/game/level/LevelScene14";
import LevelScene13 from "../views/game/level/LevelScene13";
import LevelScene16 from "../views/game/level/LevelScene16";
import LevelScene15 from "../views/game/level/LevelScene15";
import LevelScene17 from "../views/game/level/LevelScene17";
import LevelScene18 from "../views/game/level/LevelScene18";
import LevelScene19 from "../views/game/level/LevelScene19";
import LevelScene21 from "../views/game/level/LevelScene21";
import LevelScene20 from "../views/game/level/LevelScene20";
import LevelScene22 from "../views/game/level/LevelScene22";
import LevelScene23 from "../views/game/level/LevelScene23";
import LevelScene24 from "../views/game/level/LevelScene24";
import LevelScene25 from "../views/game/level/LevelScene25";
import LevelScene29 from "../views/game/level/LevelScene29";
import LevelScene28 from "../views/game/level/LevelScene28";
import LevelScene27 from "../views/game/level/LevelScene27";
import LevelScene26 from "../views/game/level/LevelScene26";
import LevelScene30 from "../views/game/level/LevelScene30";

export class LevelManager {
    private static ins: LevelManager;

    public static getInstance(): LevelManager {
        if (!this.ins) this.ins = new LevelManager();
        return this.ins;
    }

    /**当前场景 */
    public currentGameScence: LevelBase;

    private levelBaseUrl = 'resource/assets/configs/map/map';

    /*当前关卡 */
    public nCurLevel: number = 0;


    /**
     * 创建关卡
     */
    public async createLevelScene(level: number) {
        let nLevel = level;
        if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
            //if(BaseConst.infos.gameInfo.openPsAward == 0){
            nLevel = nLevel + 1;
        }
        GameManager.instance.curLevel = level;
        let classKey: any;
        switch (nLevel) {
            case 1:
                classKey = LevelScene1;
                break
            case 2:
                classKey = LevelScene2;
                break
            case 3:
                classKey = LevelScene3;
                break
            case 4:
                classKey = LevelScene4;
                break
            case 5:
                classKey = LevelScene5;
                break
            case 6:
                classKey = LevelScene6;
                break;
            case 7:
                classKey = LevelScene7;
                break;
            case 8:
                classKey = LevelScene8;
                break;
            case 9:
                classKey = LevelScene9;
                break;
            case 10:
                classKey = LevelScene10;
                break;
            case 11:
                classKey = LevelScene11;
                break;
            case 12:
                classKey = LevelScene12;
                break;
            case 13:
                classKey = LevelScene13;
                break;
            case 14:
                classKey = LevelScene14;
                break;
            case 15:
                classKey = LevelScene15;
                break;
            case 16:
                classKey = LevelScene16;
                break;
            case 17:
                classKey = LevelScene17;
                break;
            case 18:
                classKey = LevelScene18;
                break;
            case 19:
                classKey = LevelScene19;
                break;
            case 20:
                classKey = LevelScene20;
                break;
            case 21:
                classKey = LevelScene21;
                break;
            case 22:
                classKey = LevelScene22;
                break;
            case 23:
                classKey = LevelScene23;
                break;
            case 24:
                classKey = LevelScene24;
                break;
            case 25:
                classKey = LevelScene25;
                break;
            case 26:
                classKey = LevelScene26;
                break;
            case 27:
                classKey = LevelScene27;
                break;
            case 28:
                classKey = LevelScene28;
                break;
            case 29:
                classKey = LevelScene29;
                break;
            case 30:
                classKey = LevelScene30;
                break;
            default:
                classKey = LevelScene1;
                break
        }
        if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
            //if(BaseConst.infos.gameInfo.openPsAward == 0){
            PlayerDataManager.getInstance().setCurLevel(nLevel - 2);
        } else {
            PlayerDataManager.getInstance().setCurLevel(nLevel - 1);
        }

        //为了头条的提审 隐藏binner可能会有延迟 
        if (DeviceUtil.isTTMiniGame()) {
            MiniManeger.instance.hideBanner();
        }

        let data = await GameManager.instance.loadCongigs(this.levelBaseUrl + nLevel + '.json')
        let stGroup = [];
        stGroup.push(nLevel.toString())
        ViewChangeManager.getInstance().showBufferLoadingView();
        let self = this;
        ResUtil.getIntance().loadGroups(stGroup, () => {
            if (self.currentGameScence && nLevel < PlayerDataManager.getInstance().nMaxLevelCount) {//当前场景存在的情况并且非最后一关
                self.currentGameScence.destroyAni();
                if (nLevel > 2) {
                    self.currentGameScence.destroy();
                    // //下一关清理上一关卡
                    let lastLevel = nLevel - 1;
                    ResUtil.getIntance().destoryGroup("" + lastLevel);
                    Laya.Resource.destroyUnusedResources();
                }
                self.currentGameScence = null;
            }
            if (self.currentGameScence) {
                self.currentGameScence.removeSelf();
                self.currentGameScence.destroyAni();
                self.currentGameScence.destroy();
                self.currentGameScence = null;
            }
            ViewChangeManager.getInstance().hideBufferLoadingView();
            self.currentGameScence = new classKey(data);
            self.currentGameScence.viewData_ = data;
            self.currentGameScence.mapData = data;
            this.nCurLevel = nLevel;
            SceneManager.getInstance().openSceneInstance(self.currentGameScence);
            // SceneManager.getInstance().openGameScene(classKey, data);
        }, () => { });
        Laya.timer.once(2000, this, () => {//进游戏后2s后加载下关资源
            //加载下一关的场景
            if (nLevel < PlayerDataManager.getInstance().getLevelNumMakeOver()) {
                stGroup = [];
                stGroup.push((nLevel + 1).toString());
                ResUtil.getIntance().loadGroups(stGroup);
            }
        });
    }
}