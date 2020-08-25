import PlatformDY from "../../../../PlatformDY";
import MoreGameOperRequestTwo from "./MoreGameOperRequestTwo";
import MoreGameRandomGameBox713 from "./MoreGameRandomGameBox713";
import GuessItemData from "../GuessItemData";



/**
 * 猜你喜欢的显示item
 */
export default class GuessLikeItem extends BaseSceneUISkin {
    public className_key = "GuessLikeItem";

    constructor(skin: string, itemData: GuessItemData) {
        super();
        this.itemData_ = itemData;
        this.skin = skin;
    }
    /**背景 */
    protected bg_: Laya.Image;
    /**icon 显示图 */
    protected icon_: Laya.Image;
    protected iconMask_: Laya.Image;
    /**名称 */
    protected name_txt: Laya.Label;
    /**数据 */
    protected itemData_: GuessItemData;

    protected childrenCreated(): void {
        super.childrenCreated();
        //
        this.on(Laya.Event.CLICK, this, this.click);

        this.dataChange(this.itemData_);
    }

    /**
     * 添加到父节点
     */
    public onEnabled(): void {
        // console.log("onEnabled");
        // this.width = Laya.stage.width;
        // this.height = Laya.stage.height;
    }
    /**
     * 设置数据
     * @param data 
     */
    public dataChange(data: any): void {
        this.exposure();
        //
        this.itemData_ = data;
        //2020.7.13-3
        if (data.img)
            this.icon_.skin = data.img;
        else
            this.icon_.skin = data.ad_img
        //
        if (this.iconMask_) {
            this.icon_.mask = this.iconMask_;
            this.icon_.mask.visible = false;
        }
        if (this.name_txt) {
            if (data.title) {
                this.name_txt.text = data.title;
            }
            if ((data as any).name) {
                this.name_txt.text = (data as any).name;
            }
        }
    }

    /**
     * 曝光
     */
    public exposure(): void {
        if (DeviceUtil.isOPPOMiniGame()) { return }
        // console.log("曝光--> ", this.itemData_);
    }

    /**
     * 点击
     */
    protected click(): void {
        let itemData_: any = this.itemData_;
        if(BaseConst.infos.gameInfo.isDY){
            PlatformDY.clickGame(itemData_.id);
        }
        let data = {
            appId: itemData_.appid,
            path: itemData_.url,
            success: function () {
                console.log("navigateToMiniProgram success");
                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    PlatformDY.toGame(itemData_.id);
                }
            },
            fail: function (e) {
                console.log("navigateToMiniProgram fail e =", e); //嘟游
                 //2020.7.13-1-4
                if (DeviceUtil.isWXMiniGame()) {
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                }
            }
        };
        platform.navigateToMiniProgram(data);
    }
}