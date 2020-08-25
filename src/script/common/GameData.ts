import { PlayerDataBase } from "./GameDataManager";
import { netData } from "./GameDataType";

/**
 * 游戏数据缓存
 */
export class GameData {

    constructor() {
        this.bannerId = new Array<string>();
        this.videoId = Array<string>();
        this.longVideoId = Array<string>();
        this.randomTime = "?v=" + Date.now();
    }

    private static instance: GameData;
    static getInstance(): GameData {
        if (!GameData.instance) {
            GameData.instance = new GameData();
        }
        return GameData.instance;
    }

    public isNewPlayer = true;
    public gameQQInfo = {
        "psViewCloseOpen": true,//3.【不了，谢谢】做开关按钮，点击播放视频。左上角延时出现×号，点击×符号关闭界面
        "signCloseVideoOpen": true,//1.弹出每日签到后不管是点击x还是点击勾选都弹出强拉视频（开关）
        "signDoubleVideoOpen": true,//1.弹出每日签到后不管是点击x还是点击勾选都弹出强拉视频（开关）
        "showLevelOverViewoOpen": [3, 6, 9],//第三关、第六关、第九关出现无论是失败还是成功的页面都弹出一次强拉视频（开关）
        "lotteryShowVideoNoIconOpen": true//隐藏抽奖下方视频图标，点击抽奖后自动弹出强拉视频（开关）
    }
    public randomTime: string


    /** 游戏ID */
    public gameId: string = "1049";

    /** 进入游戏的一些信息 */
    public enterGameInfo: any;

    /** 用户基本信息 */
    userInfo: netData.UserInfos = new netData.UserInfos();

    // /** 邀请相关数据 */
    // invite: netData.Invite = new netData.Invite();

    /** 是否通过收藏进入 */
    isByCollection: boolean = false;

    /** 是否是通过分享进入 */
    isByShare: boolean = false;

    /** 邀请人openId */
    inviterId: string;
    /** 邀请人登录游戏的平台 */
    inviterPlatform: string;

    /** 死亡动作时长（ms） */
    deadTime: number = 1500;
    oppoMiniIconsInfo: any[];

    /** 
     * 
     * 服务类型 
     * 
     * (nts 内网测试服)
     * (wts 外网测试服)
     * (wzs 外网正式服)
     * */
    private serverConf_: "nts" | "wts" | "wzs";

    /**
     * 服务类型 只能设置一次 即可修改服务并且指明版本号
     * 
     * (nts 内网测试服)
     * (wts 外网测试服)
     * (wzs 外网正式服)
     */
    public set serverConf(sc) {
        this.serverConf_ = sc;
        this.initServer();
    }

    /**
     * 初始服务配置
     */
    private initServer(): void {
        switch (GameData.instance.serverConf_) {
            case "nts":
                this.URL_SAVE_DATA = this.URL_SAVE_DATA_TEST;
                this.URL_OF_RANK = this.URL_OF_RANK_TEST;
                this.URL_OF_INVITE = this.URL_OF_INVITE_TEST;
                this.URL_DELETE_DATA = this.URL_DELETE_DATA_TEST;
                break
            case "wts":
                break
            case "wzs":
                break
        }
    }

    /**
	 * 代码版本 号
	 */
    private codeVersion_: string = "t.v.4.3.3";

    /**
     * 获取版本号
     */
    public get codeVersion() {
        return this.codeVersion_ + " " + this.serverConf_;
    }

    /**
     * qq小程序 远程资源地址
     */
    qqMiniGameResUrl: string = "https://package.32yx.com/ecy_game_small/laya/girl_ks/qq_res/qq_res_v_z_2_7/";

    /**
     * wx小程序 远程资源地址
     */
    wxMiniGameResUrl: string = "https://package.32yx.com/ecy_game_small/laya/girl_ks/wx_res/wx_res_v_z_3_2/";
    // wxMiniGameResUrl: string = "http://172.17.0.224:8900/release/wxgame_romota/wx_res_v_z_1_0/";


    /**
     * tt小程序 远程资源地址
     */
    ttMiniGameResUrl: string = "https://package.32yx.com/ecy_game_small/laya/girl_ks/tt_res/tt_res_v_z_3_2/";

    /**
     * 是否测试版本 显示 怪物血量和关卡的号
     */
    private debug_: boolean = (this.serverConf_ != "wzs");
    public get debug() {
        return (this.serverConf_ != "wzs");
    }
    ///////////////////////////////////////////版本修改参数

    /** 章节关卡数（章节-1做索引） */
    guanQiaArr: number[] = [30, 50, 20, 50, 50];

    /** 请求超时，提示内容 */
    tips: string = "";

    /** 非正常退出观看视频提示 */
    videoTips: string = "视频观看完整才能获得奖励哦";


    /** 服务器Http地址（清空服务器数据）*/
    public URL_DELETE_DATA: string = "https://littlegame.32yx.com/DelMiniGameData.fcgi";
    // public URL_DELETE_DATA_TEST: string = "https://yxtest.32yx.com/DelMiniGameData.fcgi";
    public URL_DELETE_DATA_TEST: string = "https://172.17.3.217:8090/DelMiniGameData.fcgi";

    /** 服务器Http地址（保存数据）*/
    public URL_SAVE_DATA: string = "https://littlegame.32yx.com/MiniGameData.fcgi";
    public URL_SAVE_DATA_TEST: string = "http://172.17.3.217:8090/MiniGameData.fcgi";

    /** 服务器Http地址（排行榜）*/
    public URL_OF_RANK: string = "https://littlegame.32yx.com/MiniGameRank.fcgi";
    public URL_OF_RANK_TEST: string = "http://172.17.3.217:8090/MiniGameRank.fcgi";

    /** 服务器Http地址（邀请关联）*/
    public URL_OF_INVITE: string = "https://littlegame.32yx.com/Invitation.fcgi";
    public URL_OF_INVITE_TEST: string = "http://172.17.3.217:8090/Invitation.fcgi";

    /** 从服务器获取当前时间戳地址 */
    public URL_TIMESTAMP: string = "https://littlegame.32yx.com/gettime.php";

    /** 服务器Http地址（微信登录请求） */
    public URL_WX_REQ: string = "https://yxtest.32yx.com/MiniGame.fcgi";
    public URL_WX_REQ_TEST: string = "http://172.17.3.217:8090/MiniGame.fcgi";

    /** banner */
    public bannerId: Array<string>;
    /** 短视频id */
    public videoId: Array<string>;
    /** 长视频id */
    public longVideoId: Array<string>;
    /** 盒子id */
    public boxId: Array<string>;

    /**平台的更多游戏数据 */
    public weCatMiniIconsInfo: any[];

    /**头条的更多游戏推荐 */
    // public  ttMiniIconsInfo: any[];
    /**
     * 初始化一些参数
     * @param res 
     */
    public initConfig(res) {
        if (res) {
            this.bannerId = res.gameInfo.bannerId;
            this.videoId = res.gameInfo.videoId;
            this.longVideoId = res.gameInfo.longVideoId;
            this.boxId = res.gameInfo.boxId;
        } else {
            console.error("GameData.initConfig res error!");
        }

    }

}