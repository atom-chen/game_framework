import LevelViewItem from "./LevelViewItem";
import GameHomeView from "../GameHomeView";
import ViewChangeManager from "../../games/ViewChangeManager";
import SoundManager from "../../common/SoundManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import { PlayerDataManager } from "../../common/GameDataManager";

export default class LevelView extends BaseSceneUISkinPopView {
    public className_key = "LevelView";
    public grp_center: Laya.Box;
    public imageBtHome: Laya.Image;
    public levelPanel: Laya.Panel;
    public levelBox: Laya.Box;

    public static pHomeView: GameHomeView;

    constructor() {
        super();
        this.skin = "game/uiView/LevelView.json";
    }

    protected createChildren(): void {
        super.createChildren();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.levelPanel.vScrollBarSkin = "";
        this.levelPanel.elasticEnabled = true;
        this.levelPanel.vScrollBar.elasticDistance = 130;

    }

    onAddStage(): void {
        MiniManeger.instance.showInterstitialAd();
        ViewChangeManager.getInstance().CommonView.visible = false;
        this.initView();
        this.addEvent();
        MiniManeger.instance.showBannerAd();
    }

    onRemoved() {
        this.removeEvent();

    }

    private addEvent() {
        this.imageBtHome.on(Laya.Event.CLICK, this, this.levelViewReturnToHome);
    }

    private removeEvent() {
        this.imageBtHome.off(Laya.Event.CLICK, this, this.levelViewReturnToHome);
    }

    private initView() {
        let xStart = 21 + 318 / 2;
        let xAdd = 42 + 318;
        let yStart = 329 / 2;
        let yAdd = 329 + 35;

        for (let i = 0, len = PlayerDataManager.getInstance().nMaxLevelCount; i < len; i++) {
            let item = this.levelBox.getChildAt(i) as LevelViewItem;
            if (item) {
                item.setData(i + 1);
            } else {
                item = new LevelViewItem(i + 1);
                // item.width = item.height = 210;
                item.x = (i % 3) * xAdd + xStart;
                item.y = Math.floor(i / 3) * yAdd + yStart;
                this.levelBox.addChild(item);
            }
            item.setParentView(this);
        }
        MiniManeger.instance.hideBlockAd();
    }

    private levelViewReturnToHome() {
        SoundManager.getInstance().playEffect("button", 1);
        ViewChangeManager.getInstance().CommonView.visible = true;
        MiniManeger.instance.showBlockAd();
        this.removeSelf();
    }

    //在这个界面点击了前往某个关卡需要关闭界面
    public closeViewWhenGoToLevel() {
        ViewChangeManager.getInstance().CommonView.visible = true;
        this.removeSelf();
        LevelView.pHomeView.removeSelf();
    }
}