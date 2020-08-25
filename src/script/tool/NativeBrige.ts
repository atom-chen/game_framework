import SoundManager from "../common/SoundManager";
import ViewChangeManager from "../games/ViewChangeManager";
import NativeMgr from "./NativeMgr";

/**
 * native 消息 交互
 */
export default class NativeBrige {

    static instance: NativeBrige;

    constructor() { }

    static getInstance(): NativeBrige {
        if (!NativeBrige.instance) {
            NativeBrige.instance = new NativeBrige();
        }
        return NativeBrige.instance;
    }

    /**
     * 融合 接口的用户信息
     */
    public rhUserInfo: UserInfoRh;

    /**
     * 获取到设备号回调
     */
    public getDeviceNoCall: Function;

    /**
     * 复制回调
     */
    public copyStrCall: Function;

    /**
     * 登陆成功回调  sdk中
     */
    public loginSucc: Function;

    /**
     * 显示用户信息回调
     */
    public showAccountCenterCall: Function;

    /**
     * 支付的回调
     */
    public payCall: Function;

    /**
     * Native 端發出來消息
     * @param msgJsonObj 
     */
    public callByNative(msgJsonObj: any) {
        console.log("NativeBrige callByNative : " + JSON.stringify(msgJsonObj));
        // TipsManager.instance.showDefaultTips(JSON.stringify(msgJsonObj));
        switch (msgJsonObj.msg) {
            case NativeMsg.toStop:
                // GameManager.getInstance().isPauseTick = true;
                // EventMgr.getInstance().sendEvent(GameEvent.GAME_PAUSE);
                SoundManager.getInstance().playBgMusic();
                if (ViewChangeManager.bGameOpen) {
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                    }
                }
                break
            case NativeMsg.toGame:
                // EventMgr.getInstance().sendEvent(GameEvent.GAME_RESUME);
                SoundManager.getInstance().pauseBgm();
                if (ViewChangeManager.getInstance().CurLevelBase) {
                    ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
                }
                break
            case NativeMsg.getDeviceNo:
                // GameData.getInstance().deviceNumber = msgJsonObj.data;
                if (this.getDeviceNoCall) {
                    this.getDeviceNoCall();
                }
                break
            case NativeMsg.copyStr:
                if (this.copyStrCall) {
                    this.copyStrCall(msgJsonObj);
                }
                break
            case NativeMsg.loginSucc:
                if (this.loginSucc) {
                    this.loginSucc(msgJsonObj);
                }
                break
            case NativeMsg.outLogin:
                //退出登陆
                // GameMgr.getInstance().outLogin();
                break
            case NativeMsg.userInfo:
                this.rhUserInfo = msgJsonObj.data;
                break
            case NativeMsg.showAccountCenter:
                if (this.showAccountCenterCall) {
                    this.showAccountCenterCall(msgJsonObj);
                }
                break
            case NativeMsg.pay:
                if (this.payCall) {
                    //回调对象 {info:string,code:number} 200 成功 201 失败 202 支付取消
                    this.payCall(msgJsonObj);
                }
                break
            case NativeMsg.changeUser:
                // GameMgr.getInstance().changeUserLogin(true);
                break
            case NativeMsg.ShowAdView:
                // GameMgr.getInstance().changeUserLogin(true);
                switch (msgJsonObj.data) {
                    case "onAdLoaded": break
                    case "onAdFailedToLoad": break
                    case "onAdOpened": break
                    case "onAdClicked": break
                    case "onAdLeftApplication": break
                    case "onAdClosed": break
                }
                break
            case NativeMsg.ShowAdVideo:
                // GameMgr.getInstance().changeUserLogin(true);
                switch (msgJsonObj.data) {
                    case "RewardedAdNotLoaded":
                        NativeMgr.getInstance().videoAdErrorCallFunc();
                        break
                    case "onRewardedAdLoaded": break
                    case "onRewardedAdFailedToLoad": break
                    case "onRewardedAdOpened": break
                    case "onRewardedAdClosed":
                        NativeMgr.getInstance().videoAdCloseCallFunc();
                        break
                    case "onUserEarnedReward": break
                    case "onRewardedAdFailedToShow":
                        NativeMgr.getInstance().videoAdErrorCallFunc();
                        break
                }
                break
            case NativeMsg.ShowInterstitialAd:
                // GameMgr.getInstance().changeUserLogin(true);
                switch (msgJsonObj.data) {
                    case "AdNotLoaded":
                        NativeMgr.getInstance().interstitialAdCloseCallFunc();
                        break
                    case "onAdLoaded": break
                    case "onAdFailedToLoad": break
                    case "onAdOpened": break
                    case "onAdLeftApplication": break
                    case "onAdClosed":
                        NativeMgr.getInstance().interstitialAdCloseCallFunc();
                        break
                }
                break
        }
    }

    /**
     * 發送消息 到 Native
     * @param msgJson 
     */
    public sendToNative(msgJson: string) {
        window["loadingView"].sendToNative(msgJson);
    }
}

/**naitve 的消息*/
export class NativeMsg {
    /**
     * 后台
     * */
    public static toStop = "toStop";

    /**
     * 前台
     */
    public static toGame = "toGame";

    /**
     * 获取设备号
     */
    public static getDeviceNo = "getDeviceNo";

    /**
     * 复制内容
     */
    public static copyStr = "copyStr";

    /**
     * 登陆成功
     */
    public static loginSucc = "loginSucc";

    /**
     * 调用登陆
     */
    public static goLogin = "goLogin";

    /**
     * 退出sdk登陆
     */
    public static outLogin = "outLogin";

    /**
     * 用户信息
     */
    public static userInfo = "userInfo";

    /**
     * 显示个人中心
     */
    public static showAccountCenter = "showAccountCenter";

    ////////////////数据统计相关/////////////
    /**
      * 进入游戏 数据统计
      */
    public static createUser = "createUser";

    /**
     * 进入游戏 数据统计
     */
    public static enterGame = "enterGame";

    /**
     * 角色升级 数据统计
     */
    public static roleUpLevel = "roleUpLevel";
    ////////////////数据统计相关/////////////
    /**
     * 支付
     */
    public static pay = "pay";

    /**
     * 切换账号
     */
    public static changeUser = "changeUser";


    /**
     * 显示广告
     * <p>
     * 当广告被操作也会发送这个事件给js 对应有
     * onAdLoaded
     * onAdFailedToLoad
     * onAdOpened
     * onAdClicked
     * onAdLeftApplication
     * onAdClosed
     */
    public static ShowAdView: string = "ShowAdView";

    /**
     * 显示视频
     * <p>
     * onRewardedAdLoaded
     * onRewardedAdFailedToLoad
     * <p>
     * onRewardedAdOpened
     * onRewardedAdClosed
     * onUserEarnedReward
     * onRewardedAdFailedToShow
     */
    public static ShowAdVideo: string = "ShowAdVideo";

    /**
     * 显示插屏广告
     *
     * create
     * show
     *
     * onAdLoaded
     * onAdFailedToLoad
     * onAdOpened
     * onAdLeftApplication
     * onAdClosed
     */
    public static ShowInterstitialAd: string = "ShowInterstitialAd";

}

/**
 * 融合 接口用户信息
 */
export class UserInfoRh {
    public channel_uid: string;
    public channel_token: string;
    public user_name: string;
    public nick_name: string;
    public gender: string;
    public avatar: string;
    public extra: string;
}

/**
 * 融合 接口需要的角色信息 上传记录使用
 */
export class RhInitRoleInfo {
    /**游戏币 数量 */
    public MoneyNum: number;
    /**角色id */
    public RoleID: string;
    /**角色名称 */
    public RoleName: string;
    /**角色等级 */
    public RoleLevel: string;
    /**服务名称 */
    public ServerName: string;
    /**角色升级时间 */
    public RoleLevelUpTime: number;
    /**
     * 角色创建时间
     */
    RoleCreateTime: number;
}

/**
 * 融合 接口需要的支付参数
 */
export class RhPayInfo {
    /**  总金额，单位：元，默认为6元*/
    Amount: number;
    /**单价 */
    Price: number;
    /**单价单位:元 */
    Count: number;
    /** 玩家账户余额(游戏币数量)*/
    CoinNum: number;
    /** 商品Id*/
    ProductId: string;
    /**商品名称 */
    ProductName: string;
    /**商品描述或备注 */
    ProductDesc: string;
    /**玩家角色id */
    RoleId: string;
    /**玩家角色等级，没有则传1，整型数字 */
    RoleLevel: number;
    /**游戏角色名称 */
    RoleName: string;
    /**透传信息 */
    Extension: string;
}