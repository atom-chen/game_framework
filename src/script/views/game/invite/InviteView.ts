import InviteManager from "../../../manager/InviteManager";
import InviteItem from "./InviteItem";
import SoundManager from "../../../common/SoundManager";
import GameEvent from "../../../games/GameEvent";
import { MiniManeger } from "../../../minigame/MiniManeger";

/**
 * 邀请界面
 */
export default class InviteView extends BaseSceneUISkinPopView {
    public className_key = "InviteView";
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;

    // private box_content: Laya.Box;

    private btn_close: Laya.Image;
    private panelInva: Laya.Panel;
    private boxInva: Laya.Box;
    private imageBtInvite: Laya.Button;

    constructor() {
        super();
        this.skin = "game/uiView/InviteFriendsView.json";
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.boxInva.removeChildren();
        this.panelInva.vScrollBarSkin = "";
        this.panelInva.elasticEnabled = true;
        this.panelInva.vScrollBar.elasticDistance = 100;
        this.panelInva.vScrollBar.elasticBackTime = 100;
    }

    public onAddStage() {
        super.onAddStage();
        if (this.isCreate) {
            this.initView();
            this.addEvent();
        }
        MiniManeger.instance.showBannerAd();
    }

    /** 添加事件 */
    private addEvent() {
        this.btn_close.on(Laya.Event.CLICK, this, this.onClose);
        this.imageBtInvite.on(Laya.Event.CLICK, this, this.onInvite);
        EventMgr.getInstance().addEvent(GameEvent.REFRESH_INVITE, this, this.refreshUI);
    }

    private initView() {
        
        this.getInvitePlayer();
        MiniManeger.instance.hideBlockAd();

    }

    /** 获取邀请玩家数据 */
    private getInvitePlayer() {
        InviteManager.getInstance().selectInfo((code) => {
            if (code == '0') {
                this.refreshUI();
            }
        }, this);
    }

    private refreshUI() {
        let dataArr = InviteManager.getInstance().getInviteAwardData();
        console.log("InviteView >>>>>>> refreshUI", dataArr);
        for (let i = 0, len = dataArr.length; i < len; i++) {
            let item = <InviteItem>this.boxInva.getChildAt(i);
            if (item) {
                item.setData(dataArr[i]);
            } else {
                item = new InviteItem(dataArr[i]);
                item.x = 0;
                item.y = (128 + 20) * i;
                this.boxInva.addChild(item);
            }
        }
    }

    private onInvite() {
        SoundManager.getInstance().playEffect("button", 1);
        MiniManeger.instance.bFlagDouYin = false;
        MiniManeger.instance.shareAppMessage();
    }

    private onClose() {
        this.removeEvent();
        SoundManager.getInstance().playEffect("button", 1);
        MiniManeger.instance.showBlockAd();

        this.removeUs();
    }

    /** 移除事件 */
    private removeEvent() {
        this.btn_close.off(Laya.Event.CLICK, this, this.onClose);
        this.imageBtInvite.off(Laya.Event.CLICK, this, this.onInvite);
        EventMgr.getInstance().removeEvent(GameEvent.REFRESH_INVITE, this, this.refreshUI);
    }

    /**
     * 当从父节点移除时候
     */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
    }
}