import SuccessfulEntryThreeView from "./SuccessfulEntryThreeView";
import { MiniManeger } from "../../minigame/MiniManeger";
import SoundManager from "../../common/SoundManager";

export default class VentonesangerView extends BaseSceneUISkinPopView {

    public className_key = "VentonesangerView";
    protected showEnterType: BasePopAnimationEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;

    public grp_center: Laya.Box;
    public image_change: Laya.Image;
    public imageValue: Laya.Image;

    private nNumMax: number;
    private nCurNum: number;
    private nHightAdd: number;
    constructor() {
        super();
        this.skin = "game/uiView/VentonesangerView.json";
        this.nNumMax = 10;
        this.nCurNum = 0;
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    onAddStage(): void {
        this.initView();
    }

    onRemoved() {
        super.onRemoved();
        this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.timer.clearAll(this);
    }

    private initView() {
        this.nCurNum = 0 ;
        this.image_change.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.image_change.on(Laya.Event.MOUSE_UP, this, this.onMouseUp)

        this.nHightAdd = 674 / 10;
        this.imageValue.height = 0;
        Laya.timer.loop(500, this, this.subValue);
    }

    private onMouseDown() {
        SoundManager.getInstance().playEffect("1032a2", 1);
        this.image_change.skin = "resource/assets/img/ui/hit/touch_people_2.png";
        this.nCurNum += 1;
        this.nCurNum = this.nCurNum > this.nNumMax ? this.nNumMax : this.nCurNum;
        this.imageValue.height = this.nHightAdd * this.nCurNum;
        // MoreGameOperRequestTwo.bOperFlag = true;
        // MoreGameOperRequestTwo.bSuccess = true;
        if (this.nCurNum >= 8 && this.nCurNum < 10) {
            let nNum = Utils.random(0, 10);
            if (nNum <= 8) {
                this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                MiniManeger.instance.showBoxAd(() => {
                    ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    this.removeSelf();
                });  
                Laya.timer.clearAll(this);
            }
        } else if (this.nCurNum == 10) {
            this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            MiniManeger.instance.showBoxAd(() => {
                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                this.removeSelf();
            });  
            Laya.timer.clearAll(this);
        }
    }

    private onMouseUp(){
        this.image_change.skin = "resource/assets/img/ui/hit/touch_people_1.png";
    }

    /**每0.5秒降低勇气值 */
    private subValue() {
        this.nCurNum -= 1;
        this.nCurNum = this.nCurNum < 0 ? 0 : this.nCurNum;
        this.imageValue.height = this.nHightAdd * this.nCurNum;
    }
}