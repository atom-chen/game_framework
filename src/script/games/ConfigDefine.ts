//签到数据定义
export type ConfigSignDataIndex = {
    ID:number;          //编号
    strValue:string;    //签到的标签
    nType:number;       //奖励的物品类型
    nCount:number;      //奖励的物资数量
    nType7:number;       //奖励的物品类型
    nCount7:number;      //奖励的物资数量
}

//GameConfig中的通用配置
export type GameConfigIndex = {
    ID:number;          //数据编号
    strValue:string;    //配置的值
    strDesc:string;     //游戏的描述信息
}

//LevelPs中的配置数据
export type LevelPsIndex = {
    ID:number;
    nPs:number;
}

//DialogBox中的配置参数
export type DialogBoxIndex = {
    id:number;
    type:number;
    desc:string;
    showid:string;
    nFps:number;
    strAniName:string;
    nX:number;
    nY:number;
} 

//邀请表
export type InviteConfigIndex = {
    ID:number;          //编号
    nCount:number;      //奖励体力的数量
}