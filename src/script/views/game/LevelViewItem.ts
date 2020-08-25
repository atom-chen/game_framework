import { PlayerDataManager } from "../../common/GameDataManager";
import GameStateManager from "../../games/GameStateManager";
import { EnterGameType, GoodsType } from "../../games/CommonDefine";
import { LevelManager } from "../../manager/LevelManager";
import LevelView from "./LevelView";
import ViewChangeManager from "../../games/ViewChangeManager";
import ConfigManager from "../../games/ConfigManager";
import SoundManager from "../../common/SoundManager";
import { MiniManeger } from "../../minigame/MiniManeger";
import AddPsView from "./AddPsView";

export default class LevelViewItem  extends BaseSceneUISkin {
    public className_key = "LevelViewItem";
   
    public spBg:Laya.Sprite;
    public levelNum:Laya.Sprite;
    public spG:Laya.Sprite;
    
    private nCurLeve:number;
    private pParentView:LevelView;
    private bAni:boolean;
    constructor(data_:number) { 
        super(); 
        this.nCurLeve = data_;
        this.skin = "game/uiView/LevelIndexView.json";
        this.width  = 318;
        this.height = 329;
        this.pivotX = 318/2;
        this.pivotY = 329/2;
    }
    
    onEnable(): void {
        this.on(Laya.Event.CLICK, this, this.enterLevel);
    }

    onDisable(): void {
        this.off(Laya.Event.CLICK, this, this.enterLevel);
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this.openLevelItemAni);
    }

    protected createChildren(): void {
        super.createChildren();
    }

    protected childrenCreated(): void {
        this.refreshView();
    }

    private refreshView(){
        this.spG.visible = false;
        this.bAni = false;
        //刷新关卡节点的数字
        BitmapLabelUtils.setLabel(this.levelNum, this.nCurLeve.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "center");
        //刷新界面
        if(this.nCurLeve <= PlayerDataManager.getInstance().getCurLevelMax()){
            this.spG.visible = true;
            this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_1.png");
        }
        else if(this.nCurLeve == PlayerDataManager.getInstance().getLevelToChangeMaxLevelForLevelView()){
            this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_2.png");
            this.bAni = true;
        }else{
            this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_3.png");
        }
        this.openLevelItemAni();
    }

    public setData(data_:number){
        this.nCurLeve = data_;
        this.refreshView();
    }

    public enterLevel(){
        SoundManager.getInstance().playEffect("button",1);
        if(this.nCurLeve > PlayerDataManager.getInstance().getLevelToChangeMaxLevelForLevelView()){
            TipsManager.getInstance().showDefaultTips("未解锁");
            return;
        }

        let nSpCost = 1;
        let stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
        if(stGameConfig){
            nSpCost = parseInt(stGameConfig.strValue);
        }

        //检测体力是否足够
        let b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp,nSpCost);
        if(!b){
            TipsManager.getInstance().showDefaultTips("体力不足");
            ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], () => {
                ViewManager.getInstance().showView(AddPsView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
             });
            return;
        }
        //扣除体力
        PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp,nSpCost);


        ViewChangeManager.getInstance().gotoLevel(this.nCurLeve);
        // PlayerDataManager.getInstance().setCurLevel(this.nCurLeve-1);
        // GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ChooseLevel;
        // LevelManager.getInstance().createLevelScene(this.nCurLeve);
        this.pParentView.closeViewWhenGoToLevel();
    }

    public setParentView(pParentView:LevelView){
        this.pParentView = pParentView;
    }

    /**开启一个缩放的动画 */
    private openLevelItemAni(){
        if(this.nCurLeve == PlayerDataManager.getInstance().getLevelToChangeMaxLevel() && this.bAni){
            Laya.Tween.clearAll(this);
            Laya.Tween.to(this, { scaleX:1.1,scaleY:1.1}, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                Laya.Tween.to(this, { scaleX:1,scaleY:1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, (args) => {
                    Laya.timer.once(0,this,this.openLevelItemAni);
                }));
            }));
        }else{
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this.openLevelItemAni);
        }
    }
}