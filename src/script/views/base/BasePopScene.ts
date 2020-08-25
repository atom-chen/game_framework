export class BasePopScene extends BaseSceneUISkinPopView {
    className_key = "BasePopScene";

    public constructor(data) {
        super();
        this.viewData_ = data
    }
    public onAddStage() {
        super.onAddStage();
        if (this.isCreate) {
            this.initView();
            this.addEvent();
        }
    }

    public setData(data: any) {
        this.viewData_ = data;
        if (this.isCreate) {
            this.initView();
            this.addEvent();
        }
    }
    public initView() {

    }
    public addEvent() {

    }

    public removeEvent() {

    }

    public removeSelf() {
        // GameManager.instance.showTopBar(ShowType.showAll)
        return super.removeSelf();
    }
    /**
    * 当从父节点移除时候
    */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
    }

}