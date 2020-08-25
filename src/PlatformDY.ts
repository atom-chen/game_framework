import { HttpMgr } from "./script/base/net/HttpMgr";
//import { DeviceUtil } from "./base/utils/DeviceUtil";
//import { GameManager } from "./script/game/view/manager/GameManager";
import Utils from "./script/base/utils/Utils";
import { GameData } from "./script/common/GameData";
import { MoreGameIndex } from "./script/games/CommonDefine";

/**
 * 平台-嘟游网络科技有限公司
 */
export default class PlatformDY {
    /**
     * 接口的url
     * 
     * 默认wx 接口url
     */
    public static url: string = "https://zy.qkxz.com/WxApi/?webid=84";

    /**qq 接口url  */
    public static qqUrl: string = "https://qq.xyxapi.com/home/jjxpy/index.php?webid=18";
    /**qq 接口url  */
    public static ttUrl: string = "https://fxqq.xyxapi.com/home/?webid=18";

    /**
     * 版本号
     */
    public static version: number = 1;


    public getParams() {
        let str = '';
        if (DeviceUtil.isWXMiniGame()) {

        } else if (DeviceUtil.isQQMiniGame()) {

        } else if (DeviceUtil.isTTMiniGame()) {

        }
        return ''
    }

    /**
     * openid
     */
    public static openid: string;

    /**
     * 跳转可以跳转的list  默认wx
     */
    public static miniProgramList = [
        "wxab25c21f394059f7",
        "wxdc9df67ccf148dfd",
        "wxcc5f1dba1f408c14",
        "wx3bccea145a3d578d",
        "wx72b3922b76cf8ae2",
        "wx456ada1706d364d5",
        "wxc739584afdc7288e",
        "wxbb0b00982cbd1b4f",
        "wx99854f9305fcbab6"
    ];

    /**
     * qq跳转可以跳转的list
     */
    public static qqMiniProgramList = [
        "wxab25c21f394059f7",
        "wxdc9df67ccf148dfd",
        "wxcc5f1dba1f408c14",
        "wx3bccea145a3d578d",
        "wx72b3922b76cf8ae2",
        "wx456ada1706d364d5",
        "wxc739584afdc7288e",
        "wxbb0b00982cbd1b4f",
        "wx99854f9305fcbab6"
    ];
    /**
     * qq跳转可以跳转的list
     */
    public static ttMiniProgramList = [
        "tt82bbf4061d918bed",
        "tte34895f57c628a08",
        "tt73a80515ec8262b2",
        "tta2b2d40f3d98b327",
        "tt6fd51968f0ff74bf",
        "tt8e38f8851112953c",
        "ttb98ccf3126a6a5f4"
    ];

    /**
     * 获取openid接口,以及授权接口  头条的
     * 
     * @param obj DYAuthorzia_Cmd
     */
    public static getTTOpenidAndAuthorzia(obj: DYAuthorzia_Cmd): Promise<DYAuthorzia_Rev> {
        let data = Utils.objToParams(obj);

        return new Promise<DYAuthorzia_Rev>((resolve) => {
            HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=userinfo" + "&", obj, (rev) => {
                let jsonRev: DYAuthorzia_Rev = rev.data;
                PlatformDY.openid = jsonRev.openid;
                console.log("DY---> authorzia rev = " + rev);
                resolve(jsonRev);
            }, null, "get");
        });
    }
    /**
     * 获取openid接口,以及授权接口
     * 
     * @param obj DYAuthorzia_Cmd
     */
    public static getOpenidAndAuthorzia(obj: DYAuthorzia_Cmd): Promise<DYAuthorzia_Rev> {
        return new Promise<DYAuthorzia_Rev>((resolve) => {
            HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=userinfo&version=" + PlatformDY.version + "&", obj, (rev) => {
                let jsonRev: DYAuthorzia_Rev = rev.data;
                PlatformDY.openid = jsonRev.openid;
                console.log("DY---> authorzia rev = " + rev);
                resolve(jsonRev);
            }, null, "get");
        });
    }

    /**请求刷新游戏列表 */
    public static refreshGameList() {
        PlatformDY.getGameList().then(() => {
            GameData.getInstance().weCatMiniIconsInfo = [];
            let nLen = 0;
            if (PlatformDY.gameListInfos)
                nLen = PlatformDY.gameListInfos.length;
            for (let i = 0; i < nLen; ++i) {
                let stData = new MoreGameIndex();
                stData.ad_id = PlatformDY.gameListInfos[i].id;
                stData.ad_img = PlatformDY.gameListInfos[i].img;
                stData.name = PlatformDY.gameListInfos[i].title;
                stData.ad_appid = PlatformDY.gameListInfos[i].appid;
                stData.url = PlatformDY.gameListInfos[i].url;
                GameData.getInstance().weCatMiniIconsInfo.push(stData);
            }
            console.log("GameData.getInstance().weCatMiniIconsInfo = ", GameData.getInstance().weCatMiniIconsInfo);
        });
    }

    /**
     * 开始游戏
     * 返回游戏id
     */
    public static nGameID: number = 0;
    public static startGame(): Promise<number> {
        return new Promise<number>((resolve) => {
            HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=index&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&", null, (rev) => {
                let jsonRev = rev.data;
                console.log("DY---> startGame rev = ", rev);
                PlatformDY.nGameID = jsonRev.id;
                resolve(jsonRev);
            }, null, "get");
        });
    }

    /**
     * 游戏结束接口
     */
    public static endGame(obj: DYEndGame_Cmd): Promise<number> {
        return new Promise<number>((resolve) => {
            HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=end&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&", obj, (rev) => {
                let jsonRev = rev.data;
                console.log("DY---> endGame rev = ", rev);
                resolve(jsonRev);
            }, null, "get");
        });
    }

    /**
     * 导出点击游戏统计接口
     * 
     * 点击
     * 
     * /index.php?act=game&id=ID
     * @param id 
     */
    public static clickGame(id: string): void {
        HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=game&version=" + PlatformDY.version + "&id=" + id + "&openid=" + PlatformDY.openid, null, (rev) => {
            console.log("DY---> clickGame rev = ", rev);
        }, null, "get");
    }

    /**
     * 确认游戏导出统计
     * 
     * 导出成功
     * 
     * /index.php?act=cgame&id=ID
     * @param id 
     */
    public static toGame(id: string): void {
        HttpMgr.getInstance().sendHttpDY(PlatformDY.url + "&act=cgame&version=" + PlatformDY.version + "&id=" + id + "&openid=" + PlatformDY.openid, null, (rev) => {
            console.log("DY---> toGame rev = ", rev);
        }, null, "get");
    }

    /**游戏显示列表 */
    public static gameListInfos: any[];
    /**广告显示 */
    public static bannerInfos: any[];



    public static delSameFlag(arr: DYGameListItem[]) {
        if (arr == null) return null;
        let len = arr.length;
        let obj = {}
        for (let i = 0; i < len; i++) {
            obj[arr[i].id] = arr[i];
        }

        let newArr = [];
        for (var id in obj) {
            newArr.push(obj[id]);
        }
        return newArr
    }

    /**
     * 获取游戏接口
     * 
     * /index.php?act=gamelist 
     */
    public static getGameList(): Promise<DYGameListItem[]> {
        return new Promise<DYGameListItem[]>((resolve) => {
            let url = PlatformDY.url + "&act=gamelist&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&v=" + Math.random();
            HttpMgr.getInstance().sendHttpDY(url, null, (rev) => {
                console.log("DY---> getGameList rev = ", rev);
                PlatformDY.bannerInfos = rev.data.banner;
                PlatformDY.gameListInfos = PlatformDY.delSameFlag(rev.data.gamelist);
                resolve(rev.data);
            }, null, "get");
        });
    }

    //////////////////////////////盒子相关逻辑
    public static boxView: any;

    /**
     * 初始化 boxView
     * @param adUnitId 
     */
    public static initBoxView(adUnitId: string): void {
        PlatformDY.boxView = platform.createAppBox(adUnitId);
        PlatformDY.boxView.load();
        PlatformDY.boxView.onClose(PlatformDY.boxViewClose);
    }

    /**
     * boxView 关闭的时候
     */
    private static boxViewClose(): void {
        console.log("qq boxView close");
        if (PlatformDY.tempCloseBoxViewCallFunc) {
            PlatformDY.tempCloseBoxViewCallFunc.apply(PlatformDY.tempCloseBoxViewCallObj, PlatformDY.tempCloseBoxViewCallParam);
            PlatformDY.tempCloseBoxViewCallFunc = null;
        }
    }

    /**
     * 显示boxView
     */
    public static async showBoxView() {
        if (!PlatformDY.boxView) {
            console.error("boxView not init!!!!!!!!!");
        }
        await PlatformDY.boxView.show();
    }

    /**
     * 关闭boxView 的临时回调--切记只回调一次
     */
    public static tempCloseBoxViewCallFunc: Function;

    /**
     * 关闭boxView 的临时回调对象--切记只回调一次
     */
    public static tempCloseBoxViewCallObj: any;

    /**
     * 关闭boxView 的临时回调参数--切记只回调一次
     */
    public static tempCloseBoxViewCallParam: any[];
}

/**
 * 授权 嘟游 获取openid的发送参数
 */
export class DYAuthorzia_Cmd {
    /**
     * Wx.login 获取的code
     */
    code: string;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 头像
     */
    avatarUrl: string;
    /**
     * 性别
     */
    gender: number;
    /**
     * wx 的进入场景值
     * 启动小游戏的场景值
     */
    scene: string;
}

/**
 * 授权 嘟游 获取openid的回应参数
 */
export class DYAuthorzia_Rev {
    /**
     * 用户id
     */
    id: string;
    /**
     * openid
     */
    openid: string;
    /**
     * 昵称
     */
    nick_name: string;
    /**
     * 头像
     */
    avatar_url: string;
    /**
     * 1为授权 0为没有授权
     */
    is_authorize: number;
}

/**
 * 授权 嘟游 游戏结束接口的回发送参数
 */
export class DYEndGame_Cmd {
    /**
     * 游戏ID
     */
    id: number;
    /**
     * 关卡等级
     */
    level: number;
}

/**
 * 获取到的gamelistItem信息
 */
export class DYGameListItem {
    /**
     * 游戏id
     */
    id: string;
    /**
     * 跳转参数
     */
    url: string;
    /**
     * 显示图片
     */
    img: string;
    /**
     * 备用显示图片
     */
    img1: string;
    /**
     * 标题
     */
    title: string;
    /**
     * appid
     */
    appid: string;
    /**
     * 点击次数-单位为万人
     */
    click: string;
}


