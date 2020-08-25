import { EventObj } from "./BaseUIScene";
import { MiniManeger } from "../../minigame/MiniManeger";


export class PopBaseScene extends BaseSceneUISkinPopView {
    className_key = 'PopBaseScene';

    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;

    protected childrenCreated() {
        super.childrenCreated();
    }

    public onAddStage() {
        super.onAddStage();
        if (this.isCreate) {
            this.initView();
            this.addEvent();
            this.initMiniGame();
        }
        this.off(Laya.Event.ADDED, this, this.onAddStage);
    }

    public initMiniGame() {
        this.showBanner({ className_key: this.className_key });
    }

    public setData(data: any) {
        this.viewData_ = data;
        if (this.isCreate) {
            this.initMiniGame();
            this.initView();
            this.addEvent();
            this.showEnterAnimation();

        }
    }

    public initView() { }

    public addEvent() { }

    public removeSelf() {
        let node = super.removeSelf();
        // GameManager.instance.hideUserButton();
        // if (SceneManager.getInstance().currentScene.className_key != 'HomeScene') {
        //     this.hideBanner();
        // }
        // EventMgr.getInstance().sendEvent("onRemove", this.className_key);

        return node;
    }

    private eventPool: Array<EventObj> = [];
    protected registerEvent(target: Laya.Sprite, type: any, callback: Function, callbackobj: any) {
        target.on(type, callbackobj, callback);
        this.eventPool.push({ target: target, type: type, callback: callback, callbackobj: callbackobj });
    }
    /**移除全部事件 */
    public clearEvent() {
        let eventPool = this.eventPool
        if (eventPool.length > 0) {
            for (let i = 0; i < this.eventPool.length; i++) {
                let target = eventPool[i].target;
                let type = eventPool[i].type;
                let callback = eventPool[i].callback;
                let callbackobj = eventPool[i].callbackobj;
                if (target) {
                    target.off(type, callbackobj, callback);
                }
            }
        }
        eventPool = [];
    }

    public onDisable() {
        this.removeEvent();
    }


    public onRemoved() {
        super.onRemoved();
        this.clearEvent();

    }
    public removeEvent() {
        this.clearEvent();
    }


    public showBanner(data: { bannerId?: string, className_key?: string }) {
        // if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame() || DeviceUtil.isQQMiniGame()) {
        //     // let phone = MiniGameMgr.instance.systemInfo;
        //     // let offset = { w: phone.screenWidth / 2, h: phone.screenHeight }
        // }
        MiniManeger.instance.showBannerAd();
    }

    public destoryBanner() {
        MiniManeger.instance.hideBanner();
    }
    public hideBanner() {
        MiniManeger.instance.hideBanner();
    }
}