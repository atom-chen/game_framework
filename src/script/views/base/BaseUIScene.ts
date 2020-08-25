export class BaseUIScene extends BaseSceneUISkin {
    className_key = "BaseUIScene";


    private eventPool: Array<EventObj> = [];


    /**注册事件 会在dispose时自动移除 */
    protected registerEvent(target: Laya.Sprite, type: any, callback: Function, callbackobj: any) {
        // if (!target.hasListener(type)) {
        // }
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

    public removeSelf() {
        return super.removeSelf();
    }
    public onRemoved() {
        super.onRemoved();
        this.clearEvent();

    }
    public removeEvent() {
        this.clearEvent();
    }

    public initView() {

    }

    public addEvent() {

    }
}



export class EventObj {
    target: Laya.Sprite;
    type: any;
    callback: Function;
    callbackobj: any;
}