import PlatformDY from "../../../../PlatformDY";
import MoreGameRandomGameBox713Temp from "./MoreGameRandomGameBox713Temp";

/**
* 邀请item
*/
export default class MoreGameItemView extends BaseSceneUISkin {
    public className_key = "MoreGameItemView";
    constructor() {
        super();
        this.skin = "game/uiView/wecat/MoreGameItemView.json";
        this.width  = 1080; 
        this.height = 200;
    }

    public index:number=0;
    private data:any;
   
    public titleLabel:Laya.Label;
    public desLabel:Laya.Label;
    public headiconImg:Laya.Image;
    public goBtn:Laya.Button;
    public baokuanImg:Laya.Image;


    protected childrenCreated() {
        super.childrenCreated();
    }

    protected adaptationStage() {
       // this.size(815, 142);
    }

    public onAddStage() {
        if (this.isCreate) {
            this.init();
            this.addEvent();
        }
    }
  /**
   * 
   * @param data 数据
   */
    public setData(data:any):void
    {
      this.data=data;
    }

    public refreshData(data:any):void
    {
        this.setData(data);
        this.init();
    }

    public onGogame():void
    {
        if (DeviceUtil.isWXMiniGame()){
            // //判断下数据是否存在
            // if(this.nIndex < 0 ||　this.nIndex　>= GameData.getInstance().weCatMiniIconsInfo.length){
            //     return;
            // }
            // let stData = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
            // if(!stData){
            //     return;
            // }
            //嘟游
            if(BaseConst.infos.gameInfo.isDY){
                PlatformDY.clickGame(this.data.ad_id); 
            }
            let self = this;
            let data = {
                appId: this.data.ad_appid,
                path:this.data.url,
                success: function() {
                    console.log("navigateToMiniProgram success!");
                    //嘟游
                    if(BaseConst.infos.gameInfo.isDY){
                        console.log("self.nIndex = ",self.data);
                        PlatformDY.toGame(self.data.ad_id);
                    }
                },
                fail: function(e) {
                    console.log("navigateToMiniProgram fail e =",e);
                    // //嘟游
                    // if(BaseConst.infos.gameInfo.isDY){
                    //     console.log("self.nIndex = ",self.nIndex);
                    //     PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[self.nIndex].ad_id);
                    // }
                    // if(DeviceUtil.isWXMiniGame()){
                    //     //2020.7.13-1-4
                    //     ViewManager.getInstance().showView(MoreGameOperRequest);
                    // }
                    MoreGameRandomGameBox713Temp.bSpecial = true;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            };
            platform.navigateToMiniProgram(data);
        }
    }



    /** 添加事件 */
    private addEvent() {
        this.on(Laya.Event.MOUSE_DOWN,this,this.onGogame);
    }

   

    /** 初始化页面 */
    private init() {
        this.titleLabel.text=this.data.name;
        this.headiconImg.skin=this.data.ad_img;
        this.desLabel.text=Math.ceil(Math.random()*100000)+'人正在玩';
        this.baokuanImg.visible=Math.random()>0.5?true:false;
    }


    /** 移除事件 */
    private removeEvent() {
        this.off(Laya.Event.MOUSE_DOWN,this,this.onGogame);
    }

    
    /**
     * 当从父节点移除时候
     */
    public onRemoved() {
        super.onRemoved();
        this.removeEvent();
    }
}