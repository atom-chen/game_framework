
import { GameData } from "../common/GameData";
import { LotterySelScene } from "../views/game/lottery/LotterySelScene";
import { MiniManeger } from "../minigame/MiniManeger";
import PlatformDY from "../../PlatformDY";
import MoreGameRandomGameBox713 from "../views/game/wecat/MoreGameRandomGameBox713";


/**
 * 游戏管理器\
 * 处理游戏基本逻辑的
 */
export class GameManager {
    private static ins: GameManager;

    public static get instance(): GameManager {
        if (this.ins == null) {
            this.ins = new GameManager();
        }
        return this.ins
    }
    private constructor() {

    }



    /**
     * 是否是小游戏
     */
    public isMiniGame = false;

    public curLevel = 0;

    public openLevelVideo(success: Function) {
        if (DeviceUtil.isQQMiniGame()) {
            let nCul = this.curLevel;
            if (GameData.getInstance().gameQQInfo.showLevelOverViewoOpen.indexOf(nCul) > -1) {
                MiniManeger.instance.playViderAd({
                    successFun: () => {
                        success && success()
                    }, failFun: () => {
                        success && success()

                    }, errorFun: () => {
                        success && success()

                    }
                });
            } else {
                success && success()
            }
        } else {
            success && success()

        }
    }

    private selLotteryScene: LotterySelScene;

    public selAddLottery(box_content: Laya.Box) {
        let self = this

        if (DeviceUtil.isQQMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1) {
            MiniManeger.instance.showBoxAd(() => {
                self.addLotteryScene(box_content);
            });

        } else if ((DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1)) {
            self.addLotteryScene(box_content);
        }
    }

    private addLotteryScene(box_content: Laya.Box) {
        let self = this

        if (self.selLotteryScene == null) {
            self.selLotteryScene = new LotterySelScene(null);
        } else {
            self.selLotteryScene.initView();
        }
        box_content.visible = true;
        box_content.addChild(self.selLotteryScene);
    }






    /**
     * 转换商店显示时间
     * time  为时间  秒
     */
    public parseShopTimeShow(time: number, en: boolean): string {
        let min = time / 60;
        let hour = min / 60;
        let day = hour / 24;
        let str = ''
        if (day >= 1) {
            str = day.toFixed(2) + '天'
        } else if (hour >= 1) {
            str = hour.toFixed(2) + '小时'
        } else {
            str = min.toFixed(2) + '分钟'
        }
        if (en) {
            str = str.replace("天", 'day');
            str = str.replace("小时", 'hour');
            str = str.replace("分钟", 'min');
        }
        return str;
    }


    public loadCongigs(url): Promise<any> {
        return new Promise((resolve) => {
            let jsonUrl = url;
            Laya.loader.load(jsonUrl, Laya.Handler.create(this, (res) => {
                if (typeof (res) == "string") {
                    res = JSON.parse(res);
                }
                resolve(Utils.copy(res))
            }));
        });
    }


    public goToDuyou(_nIndex: number) {

        //嘟游
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.clickGame(GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_id);
        }
        let self = this;
        let objData = {
            appId: GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_appid,
            path: GameData.getInstance().weCatMiniIconsInfo[_nIndex].url,
            success: function () {
                console.log("navigateToMiniProgram success!");

                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    console.log("self.nIndex = ", _nIndex);
                    PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_id);
                }
            },
            fail: function (e) {
                console.log("navigateToMiniProgram fail e =", e);
                // //嘟游
                // if(BaseConst.infos.gameInfo.isDY){
                //     console.log("self.nIndex = ",self.nIndex);
                //     PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[self.nIndex].ad_id);
                // }
                if (DeviceUtil.isWXMiniGame()) {
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                }
            }
        };
        platform.navigateToMiniProgram(objData);
    }


}

window['GameManager'] = GameManager;

