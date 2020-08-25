 //技能类型定义
 export enum EnterGameType{
    enum_EnterGameType_GameHome    = 1,        //通过主页进入
    enum_EnterGameType_Next        = 2,        //点击进入下一关
    enum_EnterGameType_ReStart     = 3,        //重新开启
    enum_EnterGameType_ChooseLevel = 4,        //选择关卡进入
}

//道具类型
export enum GoodsType{
    enum_GoodsType_Sp   = 1,        //体力
    enum_GoodsType_Glod = 2         //金币
}

//皮肤的状态
export enum SkinState{
    enum_SkinState_Have = 1,     //已拥有
    enum_SkinState_NotOwned = 2, //未拥有
    enum_SkinState_Used = 3,     //使用中
}

export class MoreGameIndex {
    ad_id:number;
    ad_img:string;
    name:string;
    ad_appid:string;
    url:string;

    constructor(){
       this.ad_id = 0;
       this.ad_img = "";
       this.name   = "";
       this.ad_appid = "";
       this.url = "";
    }
};