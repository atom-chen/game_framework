import { PlayerDataManager } from "../../../common/GameDataManager";
import { MiniManeger } from "../../../minigame/MiniManeger";
import GameLogicProcessingManager from "../../../games/GameLogicProcessingManager";
import { LotteryPopScene } from "./LotteryPopScene";
import { GameData } from "../../../common/GameData";

export class LotterySelScene extends BaseSceneUISkin {
    className_key = "LotterySelScene";

    public constructor(data: any) {
        super();
        this.viewData_ = data;
        this.versionRandom = "?v=" + Date.now();
        this.skin = 'game/uiView/lottery/LotterySelScene.json';

    }

    public onAddStage() {
        super.onAddStage();
        if (this.isCreate) {
            this.initView()
            this.addEvent()
        }
    }
    public initView() {
        this.checkCanFreeLottery();
        this.initLottery();
    }
    public adaptationStage() {

    }


    public addEvent() {
        this.btn_lottery.on(Laya.Event.CLICK, this, this.clickLottery);
    }

    public img_lottery: Laya.Image;
    public btn_lottery: Laya.Button;
    public img_video: Laya.Image;

    public versionRandom = "";

    private lotteryData = [
        { "id": "3", "item": "0|0", "des": "再来一次", "worth": "2000" },
        { "id": "4", "item": "2|200", "des": "200金币", "worth": "1000" },
        { "id": "5", "item": "1|6", "des": "6体力", "worth": "500" },
        { "id": "6", "item": "0|0", "des": "感谢参与", "worth": "1500" },
        { "id": "7", "item": "2|150", "des": "150金币", "worth": "1000" },
        { "id": "8", "item": "1|4", "des": "4体力", "worth": "500" },
        { "id": "1", "item": "2|50", "des": "50金币", "worth": "2000" },
        { "id": "2", "item": "1|2", "des": "2体力", "worth": "1500" }
    ]

    private async  getLotteryConfig() {
        return new Promise((resolve) => {
            Laya.loader.load("resource/assets/config/LotteryConfig.json" + this.versionRandom, Laya.Handler.create(this, async (data) => {
                this.lotteryData = Utils.copy(data);
                resolve(data);
            }))
        })
    }

    private weightArr: number[];
    public async initLottery() {
        await this.getLotteryConfig()
        if (!this.weightArr) {
            this.weightArr = [];
            for (let i = 0, len = this.lotteryData.length; i < len; i++) {
                // let item = this.lotteryData[i].item;
                this.weightArr.push(parseInt(this.lotteryData[i].worth));
            }
        }
    }


    /**
     * 根据权重数组返回一个索引
     */
    private getRandomByWeightArr(oArr: Array<number>): number {
        let sum = 0;    // 总和
        let rand = 0;   // 每次循环产生的随机数
        let result = 0; // 返回的对象的index
        // 计算总和
        for (let i in oArr) {
            sum += Number(oArr[i]);
        }
        // 思路就是如果设置的数落在随机数内，则返回，否则减去本次的数
        for (let i in oArr) {
            rand = Math.floor(Math.random() * sum + 1);
            if (oArr[i] >= rand) {
                result = Number(i);
                break;
            } else {
                sum -= oArr[i];
            }
        }
        return result;
    }
    /**
     * 是否抽奖中
     */
    public isLotterying = false;
    private onLottery() {
        if (this.isLotterying) { return };
        this.isLotterying = true;
        this.noCanTouch();
        let awardIndex = this.getRandomByWeightArr(this.weightArr);
        this.startLottery(awardIndex);
        PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast = Date.now();
        PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount += 1;
        PlayerDataManager.getInstance().SaveData();
    }


    public needVideo = false;
    public clickLottery() {
        if (this.needVideo) {
            MiniManeger.instance.playViderAd({
                successFun: () => {
                    this.onLottery();
                }
            })
        } else {
            this.onLottery();
        }
    }


    private canTouch() {
        // Laya.stage.mouseEnabled = true;
        // Laya.stage.mouseThrough = true;
        let sp = (ViewManager.getInstance().popLayer as Laya.Sprite);
        sp.mouseEnabled = true;
        sp.mouseThrough = true;
    }

    private noCanTouch() {
        // Laya.stage.mouseEnabled = false;
        let sp = (ViewManager.getInstance().popLayer as Laya.Sprite);
        sp.mouseEnabled = false;
        sp.mouseThrough = false;
    }
    /**
     * 调速  越大越慢
     */
    public tn: number = 5;
    /**
     * 转的数量
     */
    public totalNum: number = 8;
    /**
     * 开始抽奖
     */
    public startLottery(index: number) {
        this.img_lottery.rotation = this.img_lottery.rotation % 360;
        let ro = Utils.random(-10, 10);
        Laya.Tween.clearAll(this.img_lottery);

        // index = 2
        console.log(index);
        let roa = -index * 360 / this.totalNum - (360 / this.totalNum / 2) + 3600  // + ro
        let timeDelay = 1400 * this.tn;

        Laya.Tween.to(this.img_lottery, { rotation: roa }, timeDelay, Laya.Ease.strongInOut, Laya.Handler.create(this, () => {
            Laya.Tween.clearAll(this.img_lottery);
            this.isLotterying = false;
            this.canTouch();
            // Laya.stage.mouseEnabled=true
            let data = this.lotteryData[index];

            this.checkLottery(data);
        }))
        //    Laya.Tween.get().to({ rotation: s }, timeDelay, egret.Ease.backOut).call(() => {
        //         this.endGame();
        //         egret.Tween.removeTweens(this.icon_rotaion);
        //     }, this);
    }

    /**
     * 抽奖信息
     */
    private lotteryInfo: { count: number, time: number };

    public checkCanFreeLottery() {
        let nCurTime = GameLogicProcessingManager.GetCurTime();
        if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast, nCurTime)) {//显示
            if (PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount == 0) {
                this.img_video.visible = false;
                this.needVideo = false;
            } else {

                this.needVideo = true;

                if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.lotteryShowVideoNoIconOpen) {
                    this.img_video.visible = false;
                } else {
                    this.img_video.visible = true;
                }
            }
        } else {
            this.needVideo = false;
            this.img_video.visible = false;
        }
    }

    private checkLottery(data: {
        "id": string,
        "item": string,
        "des": string,
        "worth": string
    }) {
        let id = data.id;
        if (id == 3 + '') {//再来一次
            this.onLottery();
        } else if (id == 6 + '') {//感谢参与
            TipsManager.getInstance().showDefaultTips("感谢参与");
        } else {//其他
            let arr = data.item.split("|");
            let type = arr[0];
            let count = arr[1];
            ViewManager.getInstance().showView(LotteryPopScene, { type: type, count: count });
        }
        // this.img_video.visible = true;
        this.checkCanFreeLottery();
    }



}