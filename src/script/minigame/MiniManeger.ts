
import { GameData } from "../common/GameData";
import InviteManager from "../manager/InviteManager";
import SoundManager from "../common/SoundManager";
import { PlayerDataManager } from "../common/GameDataManager";
import ConfigManager from "../games/ConfigManager";
import { GoodsType } from "../games/CommonDefine";
import ViewChangeManager from "../games/ViewChangeManager";
import GameEvent from "../games/GameEvent";
import PlatformDY from "../../PlatformDY";
import NativeMgr from "../tool/NativeMgr";
import { HttpMgr } from "../base/net/HttpMgr";
import PlatfprmAiQiYi from "../../PlatfprmAiQiYi";
import GuessLike from "../views/game/wecat/GuessLike";
// import { PlatfromGame } from "../../platfromCL/PlatfromGame";
// import { BannerType, PlatfromCL } from "../../platfromCL/PlatfromCL";


/**
 * 小游戏管理器
 */
export class MiniManeger {
    private static ins: MiniManeger;
    public static get instance(): MiniManeger {
        if (this.ins == null) {
            this.ins = new MiniManeger();
        }

        return this.ins;
    }

    private constructor() {
        this.initVideoInfo();
    }

    /********************************************************** */

    public systemInfo;

    /**
     * 初始化小游戏
     */
    public initMiniGame() {
        // platform.onHide(onHide);
        let launchObj = platform.getLaunchOptionsSync();
        if (launchObj) {
            console.log('launchObj>>>>>>>>>>>>>>', launchObj);

        }
        this.getUpdateManager();
        platform.setKeepScreenOn();
        platform.updateShareMenu();
        platform.showShareMenu();
        // 	//默认分享
        platform.onShareAppMessage(() => {
            return this.defaultMssage;
        });
        this.systemInfo = platform.getSystemInfoSync();
        console.log("systemInfo >> ", this.systemInfo);
    }

    /**
     * 获取版本更新管理工具
     */
    private getUpdateManager(): void {

    }

    /**
     * 当音频开始时候
     */
    public onAudioInterruptionBegin(call: Function): void {

    }

    /**
     * 当音频结束时候
     */
    public onAudioInterruptionEnd(call: Function): void {

    }

    /**
     * 获取用户信息
     */
    public getUserInfo(): Promise<any> {
        return new Promise((resolve) => {
            // platform.getUserInfo();
            // wx.getUserInfo({
            //     withCredentials: true,
            //     lang: 'zh_CN',
            //     success: (res) => {//直接获取用户信息
            //         var userInfo = res.userInfo;
            //         resolve(res);
            //     },
            //     fail: (res) => {//创建登陆按钮
            //         if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
            //             处理用户拒绝授权的情况
            //         } else {

            //         }
            //         resolve(null);

            //     }
            // })
            resolve(null)
        })
    }

    public async initUserTemp() {
        let info = await this.getUserInfo();
        if (info == null) {//授权失败 创建 按钮授权
            info = await this.userButtonSize(0, 1, 0);
            let strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
            console.log("strOpenIdOther = ", strOpenIdOther);
            if (strOpenIdOther && strOpenIdOther != "") {
                platform.createUserInfoButton((data) => {
                    GameData.getInstance().userInfo.nick = data.userInfo.nickName;
                    GameData.getInstance().userInfo.avatarUrl = data.userInfo.avatarUrl;
                    if (!BaseConst.infos.gameInfo.isDY) {
                        InviteManager.getInstance().judgeInvite();
                        console.log("createUserInfoButton 用户信息 : ", GameData.getInstance().userInfo);
                    }
                    info = data;
                });
            }

        } else {
            GameData.getInstance().userInfo.nick = info.userInfo.nickName;
            GameData.getInstance().userInfo.avatarUrl = info.userInfo.avatarUrl;
            let strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
            console.log("strOpenIdOther = ", strOpenIdOther);
            if (strOpenIdOther && strOpenIdOther != "") {
                InviteManager.getInstance().judgeInvite();
                console.log("createUserInfoButton 用户信息 judgeInvite: ", GameData.getInstance().userInfo);
            }
        }
        MiniManeger.instance.defaultMssage.query = "openid=" + GameData.getInstance().userInfo.openId;
        platform.onShareAppMessage(() => {
            return MiniManeger.instance.defaultMssage;
        });
        return info;

    }




    /**
     * 创建用户按钮的尺寸大小
     * @param percentTop  按钮距离上面位置的比列
     * @param pectendSize  按钮尺寸大小占设计大小的比例
     * @param percentLeft  按钮距离左边位置的比列
     */
    public userButtonSize(percentTop: number, pectendSize: number, percentLeft: number) {
        let resInfo = platform.getSystemInfoSync()
        let left = resInfo['windowWidth'] * percentLeft;
        let top = resInfo['windowHeight'] * percentTop;
        var wid = resInfo['windowWidth'] * pectendSize;
        var height = resInfo['windowHeight'] * pectendSize;
        // ////自行处理
        // let btn = new Laya.Sprite();
        // Laya.stage.addChild(btn);
        // btn.once(Laya.Event.CLICK,this,()=>{

        // });
    }

    /**
     * 进入后台的时间戳
     */
    public hideTime = 0;
    /**
     * 进入前天的时间戳
     */
    public showTime = 0;
    public onShow(callBack: Function) {
        platform.onShow(() => {
            callBack && callBack();
            this.showTime = new Date().getTime();
            if (!DeviceUtil.isTTMiniGame()) {
                if (this.showTime - this.hideTime >= this.sucTime) {
                    this.shareSucful && this.shareSucful.call(this.thisObj);
                    // PlatfromManager.getInstance().uploadShare();
                } else {
                    this.shareFailful && this.shareFailful.call(this.thisObj);
                }
            }
            PlayerDataManager.nTimeHidSec = this.showTime - this.hideTime;
            if (PlayerDataManager.nTimeHidSec == this.showTime)
                PlayerDataManager.nTimeHidSec = 0;
            this.shareFailful = null;
            this.shareSucful = null;
            this.thisObj = null;
            //EventMgr.getInstance().sendEvent(GameEvent.ONSHOW);
        });
    }

    public onHide(callBack: Function) {
        platform.onHide(() => {
            callBack && callBack();
            // PlatfromManager.getInstance().initexposureInfoData();
            this.hideTime = new Date().getTime();
            //EventMgr.getInstance().sendEvent(GameEvent.ONHIDE);
        });
    }

    // public onAudioInterruptionBegin(callBack: Function) {
    //     platform.onAudioInterruptionBegin(() => {
    //         callBack && callBack();
    //     });
    // }

    // public onAudioInterruptionEnd(callBack: Function) {
    //     platform.onAudioInterruptionEnd(() => {
    //         callBack && callBack();
    //     });
    // }

    /**
     * 获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看运行机制文档。
     */
    // public getUpdateManager() {
    //     platform.getUpdateManager();
    // }


    public showMoreGame(data: { parent: Laya.Sprite, moreGame: any, bannerType?: any, showRowCount?: number, showColCount?: number }) {
        return new Promise((resolve) => {
            // let itemDataArr_ = await PlatfromCL.getInstance().getadArrBylocation_flg(data.bannerType);
            // itemDataArr_ = [
            //     {
            //         "ad_id": 2532,
            //         "ad_name": "扎心英雄",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20191031\/4b1001e747b41abd92472ed557f4b0f2.jpg",
            //         "ad_path": "?channel=5dd27466ba1f2",
            //         "ad_appid": "wx2e12fc8a5d32fc2a",
            //         "ad_count": 3819821,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2551,
            //         "ad_name": "抢购大作战",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20191108\/5dc70aea7084caa8aa3018d7b88c511b.jpg",
            //         "ad_path": "?channel=5dd4e29e0c86c",
            //         "ad_appid": "wx8ba54b10f7a02a5b",
            //         "ad_count": 8230049,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2392,
            //         "ad_name": "自行车冲刺",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20190905\/e766c479ce38259603ac498bec649f32.jpg",
            //         "ad_path": "?channel=5dc291124f28a",
            //         "ad_appid": "wxb61f909241e4647f",
            //         "ad_count": 37192990,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2411,
            //         "ad_name": "进击的方块君",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20191025\/017ca9eb93ebe7b39ee0a26a1b7b6f0f.jpg",
            //         "ad_path": "?channel=5dc37c53e01ec",
            //         "ad_appid": "wx2a1c56c3c4235d0e",
            //         "ad_count": 3128319,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2345,
            //         "ad_name": "快来划水",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20190704\/48db87d04c83ffae21dfe561175928f2.png",
            //         "ad_path": "?channel=5dc259e0e9cc3",
            //         "ad_appid": "wx34179a03db78feb9",
            //         "ad_count": 38391910,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2426,
            //         "ad_name": "守护家园塔防",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20190226\/cb525f609742e31d04b8c04846a8b21d.jpg",
            //         "ad_path": "?channel=5dc4d183c7604",
            //         "ad_appid": "wx6d9ceda5ddb23a62",
            //         "ad_count": 1231231,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2396,
            //         "ad_name": "全民陆战队",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20190820\/a480be6862d8848d635f730d9e5d9957.jpg",
            //         "ad_path": "?channel=5dc2974bc4cbf",
            //         "ad_appid": "wx1f501f62d07e3072",
            //         "ad_count": 32189191,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2465,
            //         "ad_name": "消灭臭蛋",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20190926\/9d289d324cb226fd1b7ac321f436743e.jpg",
            //         "ad_path": "?channel=5dc9393c89bd5",
            //         "ad_appid": "wx487ed70060dc6d2d",
            //         "ad_count": 3128319,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2480,
            //         "ad_name": "索道大冒险",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20191112\/1761739f1d94c685c351a8dabc83fa82.png",
            //         "ad_path": "?krq_sddmx=045&ald_media_id=29359&ald_link_key=ca40c797f63fb1d8&ald_position_id=0",
            //         "ad_appid": "wx21468e993862a4ac",
            //         "ad_count": 423892,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     },
            //     {
            //         "ad_id": 2380,
            //         "ad_name": "爱吃三明治",
            //         "ad_img": "https:\/\/img.yz061.com\/uploads\/20191106\/d1d8de551e175b24f2d624a51abca5af.jpg",
            //         "ad_path": "?krq_acsmz=046&ald_media_id=24726&ald_link_key=b7dd55df08c7ef96&ald_position_id=0",
            //         "ad_appid": "wxc4ab7f5c2b4b4f2d",
            //         "ad_count": 48230123,
            //         "ad_device": 0,
            //         "ad_dot": 0
            //     }
            // ]
            // if (itemDataArr_) {
            //     let showRowCount = data.showRowCount ? data.showRowCount : 2
            //     let showColCount = data.showColCount ? data.showColCount : 3
            //     data.moreGame = new PlatfromGame({ itemDataArr_: itemDataArr_, showRowCount: showRowCount, showColCount: showColCount });
            //     // data.moreGame.scale(1.2, 1.2);
            //     data.parent.addChild(data.moreGame);
            //     resolve(data.moreGame);
            // } else {
            //     resolve(data.moreGame);
            // }

        })

    }
    /****************************************分享************************************/



    public defaultMssage = {
        "title": "休闲解密游戏，开动你的小脑筋帮助公主逃离魔爪！",
        "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-1.jpg?v=" + 1.0,
        "query": ""
    }

    public shareInfo = [
        {
            "title": "烧脑推理，一键过关！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-1.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "休闲解密游戏，开动你的小脑筋帮助公主逃离魔爪！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-2.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "机会只有一次！救救公主！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-3.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "休闲解密游戏，开动你的小脑筋帮助公主逃离魔爪！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-4.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "机会只有一次！救救公主！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-5.jpg?v=" + 1.0,
            "query": ""
        }
    ]

    public shareInfoTT = [
        {
            "title": "烧脑推理，一键过关！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-1.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "休闲解密游戏，开动你的小脑筋帮助女孩逃离魔爪！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-2.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "机会只有一次！救救女孩！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-3.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "休闲解密游戏，开动你的小脑筋帮助女孩逃离魔爪！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-4.jpg?v=" + 1.0,
            "query": ""
        },
        {
            "title": "机会只有一次！救救女孩！",
            "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-5.jpg?v=" + 1.0,
            "query": ""
        }
    ]


    /**
     * 
     * @param query 得到分享配置
     */
    public getShareInfo(query: Object): any {
        let shareInfo = this.shareInfo;
        if (DeviceUtil.isTTMiniGame()) {
            shareInfo = this.shareInfoTT;
        }
        let info = shareInfo[Math.floor(Math.random() * shareInfo.length)];
        if (query) {
            let openId: string = GameData.getInstance().userInfo.openId;
            query['openid'] = openId;
        }
        // if (PlatfromManager.getInstance().lastId != null) {
        //     query['id'] = PlatfromManager.getInstance().lastId
        // }
        info.query = Utils.querStr(query);
        return info;
    }

    /**
     * @param query  分享配置
     * 
    */


    /**测试 */
    public testShareVideo() {
        let obj = {
            channel: "video",
            title: "测试分享视频",
            desc: "测试描述",
            imageUrl: "",
            templateId: "",
            query: "",
            extra: {
                videoPath: "ttfile://temp/test.mp4", // 可替换成录屏得到的视频地址
                videoTopics: ["话题11", "话题21"]
            },
            success() {
                console.log("分享视频成功");
            },
            fail(e) {
                console.log("分享视频失败");
            }
        }
        obj.extra.videoPath = this.strVideoPatch;
        platform.shareAppMessage(obj);
    }



    public shareInfoDouYin = [
        {
            "channel": "video",
            "title": "烧脑推理，一键过关！",
            "desc": "烧脑推理，一键过关",
            "imageUrl": "",
            "query": "",
            "extra": {
                "videoPath": "",
                "videoTopics": ["救救女孩", "帮助女孩逃出生天"]
            }
        },
        {
            "channel": "video",
            "title": "休闲解密游戏，开动你的小脑筋帮助女孩逃离魔爪？",
            "desc": "休闲解密游戏，开动你的小脑筋帮助女孩逃离魔爪？",
            "imageUrl": "",
            "query": "",
            "extra": {
                "videoPath": "",
                "videoTopics": ["救救女孩", "帮助女孩逃出生天"]
            }
        },
        {
            "channel": "video",
            "title": "机会只有一次！救救女孩！",
            "desc": "机会只有一次！救救女孩！",
            "imageUrl": "",
            "query": "",
            "extra": {
                "videoPath": "",
                "videoTopics": ["救救女孩", "帮助女孩逃出生天"]
            }
        }
    ]

    public getShareInfoDouYin(query: Object) {
        let shareInfo = this.shareInfoDouYin;
        let info = shareInfo[Math.floor(Math.random() * shareInfo.length)];
        if (query) {
            let openId: string = GameData.getInstance().userInfo.openId;
            query['openid'] = openId;
        }
        info.query = Utils.querStr(query);
        info.extra.videoPath = this.strVideoPatch;
        return info;
    }

    /**
     * 分享处理
     * @param data 
     */
    public bFlagDouYin: boolean = false; //抖音分享需要区分视频分享还是普通分享 true 为视频分享 false 为普通分享
    public shareAppMessage(data?: { message?: any, thisObj?: any, sucFun?: Function, failFun?: Function, time?: number }) {
        if (data == null) {
            data = {};
        }
        if (!data.message) {
            data.message = this.getShareInfo({});
        }

        //增加爱奇艺的分享
        if (this.isAiQiYi()) {
            PlatfprmAiQiYi.shareAiQiYi(data.message.title, data.message.title, data.message.imageUrl);
            return;
        }

        if (DeviceUtil.isTTMiniGame()) {
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN' && this.bFlagDouYin) {
                data.message = this.getShareInfoDouYin({});
                console.log("data.message = ", data.message);
            }
            if (data.sucFun) {
                data.sucFun && (data.message.success = data.sucFun);
            } else {
                data.message.success = () => {
                    TipsManager.getInstance().showDefaultTips('分享成功!');
                };
            }
            if (data.failFun) {
                data.failFun && (data.message.fail = data.failFun);
            } else {
                data.message.fail = () => {
                    // TipsManager.getInstance().showDefaultTips('分享失败!');
                };
            }
            platform.shareAppMessage(data.message);
            return
        }
        // if (DeviceUtil.isQQMiniGame()) {
        //     let info = data.message;
        //     // if (data.sucFun) {

        //     // }
        //     info.success = () => {
        //         console.log("分享成功>>>>")
        //         data.sucFun && data.sucFun()
        //     };
        //     info.fail = () => {
        //         data.failFun && data.failFun();
        //     }

        //     platform.shareAppMessage(info);
        //     // this.shareSucful = null;
        //     // this.shareFailful = null;
        //     // platform.shareAppMessage({
        //     //     success: () => {
        //     //         console.log("分享成功>>>>")
        //     //     },
        //     //     fail: () => {
        //     //         console.log("分享失败>>>>")
        //     //     }
        //     // })
        //     return;
        // }
        this.shareSucful = data.sucFun;
        this.shareFailful = () => {
            // TipsManager.getInstance().showDefaultTips('分享失败!');
            data.failFun && data.failFun();;
        }

        this.thisObj = data.thisObj;
        this.sucTime = data.time || 1500;
        if (DeviceUtil.isWXMiniGame() || DeviceUtil.isQQMiniGame()) {//qq有分享回调 但是会强制拉取列表即回调则做成延时
            platform.shareAppMessage(data.message);
        }
    }


    public shareSucful: Function;

    public shareFailful: Function;

    public thisObj: any;
    /**
     * 分享成功回调的等待时间
     */
    public sucTime: number = 0;


    /**********************************************广告*****************************************/
    /**
      * 播放视频广告
      * 
      */
    public playViderAd(data: { successFun?: Function, failFun?: Function, errorFun?: Function, isLongVideo?: boolean }) {
        if (DeviceUtil.isNative()) {
            NativeMgr.getInstance().showVideoAd(() => {
                data.successFun && data.successFun();
            }, () => {
                data.errorFun && data.errorFun();
            });
            return
        }
        if (!DeviceUtil.isMiniGame()) {
            ///暂时成功
            // TipsManager.getInstance().showDefaultTips('开发中');
            data.successFun && data.successFun();
            return;
        }
        let videoId = GameData.getInstance().videoId;
        if (data.isLongVideo) {
            videoId = GameData.getInstance().longVideoId;
        }
        if (videoId.length <= 0) {
            TipsManager.getInstance().showDefaultTips('开发中');
            data.errorFun && data.errorFun();
            // SoundManager.getInstance().playBgMusic(SoundManager.getInstance().curBgMusic);
            return;
        }
        // platform.showLoading({ title: '广告加载中', mask: true });
        ViewChangeManager.getInstance().showBufferLoadingView();

        let adId = videoId[Math.floor(Math.random() * videoId.length)];
        platform.createRewardedVideoAd(adId, (res) => {
            if (res.isEnded) {//正常关闭
                data.successFun && data.successFun();
                if (!DeviceUtil.isTTMiniGame()) {
                    SoundManager.getInstance().playBgMusic();
                }
                console.log(" video normal！");
            } else {
                data.failFun && data.failFun();
                if (!DeviceUtil.isTTMiniGame()) {
                    SoundManager.getInstance().playBgMusic();
                }
                console.log(" video not finish！");
            }
            // platform.hideLoading({});
            ViewChangeManager.getInstance().hideBufferLoadingView();
        }, () => {
            // platform.hideLoading({});o
            ViewChangeManager.getInstance().hideBufferLoadingView();
            TipsManager.getInstance().showDefaultTips('网络错误');
            data.errorFun && data.errorFun();
            if (!DeviceUtil.isTTMiniGame()) {
                SoundManager.getInstance().playBgMusic();
            }
        });
    }
    public bannerAd: any;
    public canShowBanner = true;
    public bFlagSpecialView = true;
    public bTimerOpen = false;
    /**
     * 显示banner
     */
    public showBannerAd(offset?: { w: number, h: number, callback?: Function }) {
        if (!DeviceUtil.isMiniGame()) {
            return;
        }

        if ((DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame()) && !this.bFlagSpecialView) {
            return;
        }
        console.log("showBannerAd");
        //抖音没有binner
        if (DeviceUtil.isTTMiniGame()) {
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN') {
                return;
            }
        }
        this.canShowBanner = true;
        let bannerId = GameData.getInstance().bannerId;
        if (bannerId.length <= 0) {
            console.log("bannerId.length <= 0");
            return;
        }
        let adId = bannerId[Math.floor(Math.random() * bannerId.length)];
        console.log("adId = ", adId);
        if (this.bannerAd == null) {
            let bannerAd = platform.createBannerAd(adId);
            this.bannerAd = bannerAd;
            if (bannerAd == null) return;
            // bannerAd.onResize(() => {
            //     // bannerAd.style.left = w - bannerAd.style.realWidth / 2 + 0.1;
            //     bannerAd.style.top = this.systemInfo.screenHeight - bannerAd.style.realHeight + 0.1;
            // });
            // bannerAd.style.top = this.systemInfo.screenHeight - bannerAd.style.realHeight + 0.1;
            bannerAd.show();
            // console.log("bannerAd", bannerAd);
        } else {
            // if (DeviceUtil.isQQMiniGame()) {
            //     platform.binnerDestroy();
            //     this.bannerAd = null;
            //     let bannerAd = platform.createBannerAd(adId);
            //     this.bannerAd = bannerAd;
            // }
        }

        this.bannerAd.show();
        if (!this.canShowBanner) {
            this.bannerAd.hide()
        }
        if (offset) {
            if (!DeviceUtil.isQQMiniGame()) {
                this.bannerAd.style.left = offset.w - this.bannerAd.style.realWidth / 2 + 0.1;
                this.bannerAd.style.top = offset.h - this.bannerAd.style.realHeight + 0.1;
            }

            offset.callback && offset.callback();
        }
        if (DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame()) {
            this.refreshBinner();
        }
    }

    private refreshBinnerReadl() {
        if (!this.bFlagSpecialView) {
            return;
        }
        if (DeviceUtil.isQQMiniGame()) {
            let bannerId = GameData.getInstance().bannerId;
            if (bannerId.length <= 0) {
                console.log("bannerId.length <= 0");
                return;
            }
            let adId = bannerId[Math.floor(Math.random() * bannerId.length)];
            platform.binnerDestroy();
            this.hideBanner()
            this.bannerAd = null;
            this.bannerAd = platform.createBannerAd(adId);
            this.showBannerAd();
        }
    }

    /**qq的定时刷新binner */
    private refreshBinner() {
        if (this.bTimerOpen) {
            return;
        }
        this.bTimerOpen = true;
        Laya.timer.clear(this, this.refreshBinnerReadl);
        Laya.timer.loop(BaseConst.infos.gameInfo.binnertime, this, this.refreshBinnerReadl);
    }

    /**
     * 隐藏banner
     */
    public hideBanner() {
        //抖音没有binner
        if (DeviceUtil.isTTMiniGame()) {
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN') {
                return;
            }
        }
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
        this.canShowBanner = false;
        // if(DeviceUtil.isQQMiniGame()){
        //     Laya.timer.clear(this,this.showBannerAd);
        // }

        console.log("hideBanner");
    }
    public stPhoneInfo: any = null;
    /**重置binner的参数 */
    public resetBinnerOper() {
        if (!this.stPhoneInfo) {
            this.stPhoneInfo = platform.getSystemInfoSync() as any;
        }
        if (this.bannerAd) {
            this.bannerAd.style.left = this.stPhoneInfo.screenWidth / 2 - this.bannerAd.style.realWidth / 2 + 0.1;
            this.bannerAd.style.top = this.stPhoneInfo.screenHeight - this.bannerAd.style.realHeight + 0.1;
        }
    }

    /**
     * 短震动
     */
    // public vibrateShort(data: { complete?: Function }) {
    //     if (!SoundUtil.getInstance().shakeIsOpen) return;
    //     if (DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame()) {
    //         platform.vibrateShort(data);
    //     }
    // }
    /**
     * 长震动
     */
    // public vibrateLong() {
    //     if (!SoundUtil.getInstance().shakeIsOpen) return;
    //     if (DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame()) {
    //         platform.vibrateLong();
    //     }
    // }

    /**
     * 适配添加到我的小程序
     * @param collec_img 
     * @param stage 
     */
    public adaptImgToClientRect(collec_img: Laya.Image, stage: Laya.Stage) {
        if (DeviceUtil.isWXMiniGame()) {
            let systemInfo = platform.getSystemInfoSync();
            let screenHeight = systemInfo['screenHeight'];
            let screenWidth = systemInfo['screenWidth'];
            let rect = platform.getMenuButtonBoundingClientRect();
            // collec_img.anchorY = 0.5;
            collec_img.top = stage.height * (rect['top'] / screenHeight);
            collec_img.right = stage.width * (1 - rect['right'] / screenWidth) + collec_img.width;
        }
    }

    /**
     * 发送到开放数据
     */
    public sendDataToWxOpen(data: { cmd: string, data: any }) {
        Laya.MiniAdpter.window.wx.postMessage(data);

    }

    /**
     * 
     * @param data 
     */
    public removeOpenData(data: { parent: Laya.Sprite }) {
        let wxOpenData: Laya.WXOpenDataViewer = data.parent.getChildByName('wxOpenData') as Laya.WXOpenDataViewer;
        this.sendDataToWxOpen({ cmd: 'close', data: null });
        if (wxOpenData) {
            wxOpenData.removeSelf();
            wxOpenData.destroy();
            wxOpenData = null;
        }
    }
    /**
     * 增加到微信开放域
     * @param data 
     */
    public addOpenWxData(data: { x?: number, y?: number, width: number, height: number, left?: number, right?: number, top?: number, bottom?: number, parent: Laya.Sprite, isCenter?: boolean }) {
        let shareData = MiniManeger.instance.getShareInfo({ id: GameData.getInstance().userInfo.openId })
        this.sendDataToWxOpen({ cmd: 'share', data: JSON.stringify(shareData) });
        let wxOpenData: Laya.WXOpenDataViewer = data.parent.getChildByName('wxOpenData') as Laya.WXOpenDataViewer;
        if (wxOpenData) {
            wxOpenData.removeSelf();
            wxOpenData.destroy();
            wxOpenData = null;
        }
        wxOpenData = new Laya.WXOpenDataViewer();
        wxOpenData.name = 'wxOpenData';
        wxOpenData.x = data.x || 0;
        wxOpenData.y = data.y || 0;
        wxOpenData.width = data.width;
        wxOpenData.height = data.height;
        if (data.isCenter) {
            wxOpenData.centerX = 0;
            wxOpenData.centerY = 0;
        } else {
            if (data.left != null) {
                wxOpenData.left = data.left;
            }
            if (data.right != null) {
                wxOpenData.right = data.right;
            }
            if (data.top != null) {
                wxOpenData.top = data.top;
            }
            if (data.bottom != null) {
                wxOpenData.bottom = data.bottom;
            }
        }
        if (data.parent) {
            data.parent.addChild(wxOpenData);
        }
        return wxOpenData;
    }


    //积木广告
    private blockAd: any;

    /**
     * 初始化积木广告
     */
    public initBlockAd(): void {
        if (!DeviceUtil.isQQMiniGame()) {
            return
        }
        //暂时不适用单例创建 隐藏积木广告 （安卓839版本支持，目前请销毁后重新创建）
        //if (DeviceUtil.isIOS()) {
        this.blockAd = platform.createBlockAD();
        //}
    }

    /**
     * 显示积木广告
     */
    public showBlockAd(): void {
        if (!DeviceUtil.isQQMiniGame()) {
            return
        }
        if (!this.blockAd) {
            return
        }
        console.log("显示积木广告--");
        this.blockAd.show().then(() => {
            console.log("积木广告显示成功！");
        }).catch((err) => {
            console.log("积木广告显示失败！ ", err);
        });

        /**
        if (!DeviceUtil.isIOS()) {
            if (!this.blockAd) {
                this.blockAd = platform.createBlockAD();
            }
        } else {
            if (!this.blockAd) {
                return
            }
            this.blockAd.show().then(() => {
                console.log("积木广告显示成功！");
            }).catch((err) => {
                console.log("积木广告显示失败！ ", err);
            });
        }
        */
    }

    /**
     * 隐藏积木广告
     */
    public hideBlockAd(): void {
        if (!DeviceUtil.isQQMiniGame()) {
            return
        }
        if (!this.blockAd) {
            return
        }
        // if (DeviceUtil.isIOS()) {
        this.blockAd.hide();
        //  return
        //}
        // console.log("destroy  --  积木广告");
        // this.blockAd.destroy();
        // this.blockAd = null;
    }

    private _imgRect: Laya.Image;
    private onCloseBoxAD: Function;
    private tempBoxAD: any;

    /**
     * 初始化盒子广告
     */
    public initBoxAd() {
        let self = this;
        if (!self.tempBoxAD) {
            self.tempBoxAD = platform.createAppBox(GameData.getInstance().boxId[0]);
            self.tempBoxAD.load().then((res) => {
                console.log("boxAd load");
                //console.log(res);
            }).catch((err) => {
                console.log("boxAd load err");
                console.log(err);
            });
            self.tempBoxAD.onClose(() => {
                self._imgRect && self._imgRect.removeSelf();
                self.onCloseBoxAD && self.onCloseBoxAD();
            });
        }
    }


    /**
     * 显示盒子广告
     */
    public async showBoxAd(onCloseCall?: Function) {
        let self = this;
        self.onCloseBoxAD = onCloseCall;
        if (DeviceUtil.isQQMiniGame()) {
            if (!self._imgRect) {
                self._imgRect = new Laya.Image(ResUtil.getIntance().getOriginUrlPath(ResUtil.getIntance().getResInfoByName("game_panel_db_png").url));
                self._imgRect.sizeGrid = "3,3,2,2";
                self._imgRect.width = Laya.stage.width;
                self._imgRect.height = Laya.stage.height;
            }
            try {
                if (self.tempBoxAD) {
                    let bxoAD = self.tempBoxAD.load();
                    if (bxoAD) {
                        bxoAD.then(() => {
                            let boxAdShow = self.tempBoxAD.show();
                            if (boxAdShow) {
                                boxAdShow.then((res) => {
                                    console.log("boxAd show");
                                    console.log(res);
                                    // self._imgRect && self._imgRect.removeSelf();
                                    Laya.stage.addChild(self._imgRect);
                                }).catch((err) => {
                                    console.log("boxAd show err");
                                    console.log(err);
                                    //self._imgRect && self._imgRect.removeSelf();
                                    self.onCloseBoxAD && self.onCloseBoxAD();
                                });
                            } else {
                                self.onCloseBoxAD && self.onCloseBoxAD();
                            }
                        });
                    } else {
                        self.onCloseBoxAD && self.onCloseBoxAD();
                    }
                } else {
                    self.onCloseBoxAD && self.onCloseBoxAD();
                }
            } catch (err) {
                console.log("err<>>>>>", err)
                self.onCloseBoxAD && self.onCloseBoxAD();
            }

        } else {
            self.onCloseBoxAD && self.onCloseBoxAD();
        }
    }
    /**头条的录屏需求 */
    private recorder: any;
    public strVideoPatch: string
    public nRecordTime: number = 60;
    public nRecordTimeReal: number = 0;

    /** 存储当前录制视频完成时回调 */
    public saveCallF: Function;


    /**初始化视频录制信息 */
    public initVideoInfo() {
        if (!DeviceUtil.isTTMiniGame()) {
            return;
        }
        this.recorder = platform.getGameRecorderManager();
        this.recorder.onStart(res => {
            // 录屏开始
            console.log("onStart -> ", res);

        })

        this.recorder.onStop(res => {
            this.strVideoPatch = res.videoPath;
            if (this.nRecordTimeReal < 3000) this.strVideoPatch = null;
            console.log("onStop ->", this.strVideoPatch);

            MiniManeger.instance.saveCallF && MiniManeger.instance.saveCallF();
        })

        this.recorder.onPause(res => {
            console.log("录制视频暂停 ");
        });

        this.recorder.onResume(res => {
            console.log("录制视频继续 ");
        });

    }

    public StartRecorderVideo() {
        if (!DeviceUtil.isTTMiniGame()) {
            return;
        }
        // this.StopVideo();
        this.nRecordTimeReal = 0;
        this.strVideoPatch = "";
        //开始录制
        //加个延迟 不然没有回调
        Laya.timer.once(100, this, () => {
            platform.getGameRecorderManager().start({ duration: this.nRecordTime });
        });
        //启动一个事件记录器记录设置的最大时间
        Laya.timer.loop(1000, this, this.timeStopVideo);
        console.log("开始录制视频");
    }

    /**达到最大事件需要停止录屏*/
    public timeStopVideo() {
        this.nRecordTimeReal += 1000;
        if (this.nRecordTimeReal >= this.nRecordTime * 1000) {
            this.StopVideo();
        }
    }

    /**停止录制视频 */
    public StopVideo() {
        if (!DeviceUtil.isTTMiniGame()) {
            return;
        }
        EventMgr.getInstance().sendEvent(GameEvent.CHANGE_VIDEO_IMAGE);
        platform.getGameRecorderManager().stop();
        Laya.timer.clear(this, this.timeStopVideo);
        console.log("停止录制视频  this.nRecordTimeReal=", this.nRecordTimeReal);
    }

    /**继续视频*/
    public resumeVideo() {
        platform.getGameRecorderManager().resume();
        console.log("继续录制视频 ");
    }

    /** 暂停录制视频*/
    public pauseVideo() {
        platform.getGameRecorderManager().resume();
        console.log("暂停录制视频 ");
    }

    public shareGameVideo(data?: { successFun?: Function, failFun?: Function, errorFun?: Function }): void {
        if (!this.strVideoPatch || this.strVideoPatch.length == 0) {
            TipsManager.getInstance().showDefaultTips("暂未录制视频哦!");
            return
        }

        if (this.nRecordTimeReal <= 3000) {
            TipsManager.getInstance().showDefaultTips("录制视频失败");
            data.failFun && data.failFun();
            return;
        }

        if (!DeviceUtil.isTTMiniGame()) { return }
        console.log("分享游戏视频--");
        let obj: any = {};
        obj.title = "阿罗斯营救";
        // obj.imageUrl = "https://package.32yx.com/ecy_game_small/game_basketball/share_img/game_basketball.jpg";
        obj.query = "openId=" + GameData.getInstance().userInfo.openId + "&nick=" + GameData.getInstance().userInfo.nick;
        obj.videoPath = this.strVideoPatch;
        obj.success = function () {
            console.log("视频分享成功！");
            TipsManager.getInstance().showDefaultTips("发布录制视频成功");
            data.successFun && data.successFun();
        };
        obj.fail = function (res) {
            console.log("视频分享失败！", res);
            data.failFun && data.failFun();
            TipsManager.getInstance().showDefaultTips("发布录制视频失败");
        };
        platform.shareVideo(obj);
    }

    public onShareVideoSuccess: boolean = false;
    public onShareVideo(data: { successFun?: Function, failFun?: Function }) {
        this.shareGameVideo(data);
    }

    /**显示一个插屏广告*/
    public showInterstitialAd() {
        if (DeviceUtil.isTTMiniGame()) {
            let info = platform.getSystemInfoSync() as any;
            if (info.appName.toUpperCase() == 'DOUYIN') {
                return;
            }
            let strID = BaseConst.infos.gameInfo.InterstitialAd;
            if (!strID && strID == "") {
                return;
            }
            platform.createInterstitialAd({ adUnitId: strID });
            console.log("to show createInterstitialAd!strID = ", strID);
        }
    }

    /**
     * 显示更多游戏
     * 
     * 需要提前设置 moreSomeAppInfos
     */
    public showMoreGamesModal(): void {
        let appLaunchOptions = [];
        for (let i = 0, len = GameData.getInstance().weCatMiniIconsInfo.length; i < len; i++) {
            appLaunchOptions.push({
                appId: GameData.getInstance().weCatMiniIconsInfo[i].ad_appid,
                query: "",
                extraData: {}
            });
        }
        platform.showMoreGamesModal({
            appLaunchOptions: appLaunchOptions,
            success(res) {
                console.log("success", res.errMsg);
                //GameStateChange.PauseGame();
            },
            fail(res) {
                console.log("fail", res.errMsg);
                // GameStateChange.PauseGame();
            },
            complete(res) {
                console.log("complete", res.errMsg);
                // GameStateChange.StartGame();
            }
        });
    }

    /**积木广告 */
    public pBlockAd: any = null;


    /**
     * 创建猜你喜欢
     */
    public async createGuessLike(parent: Laya.Sprite): Promise<GuessLike> {
        return new Promise<GuessLike>(async (resolve) => {
            let data = PlatformDY.gameListInfos;
            if (data == null) {
                data = await PlatformDY.getGameList();
            }
            if (data == null) {
                resolve(null)
                return;
            }
            if (data.length <= 0) {
                return;
            }

            if (data.length < 10) {
                let nCount = 10 - data.length;
                let nIndex = 0;
                for (let i = 0; i < nCount; ++i) {
                    if (nIndex >= data.length) {
                        nIndex = 0;
                    }
                    data.push(data[nIndex]);
                    nIndex += 1;
                }
            }
            console.log("data(GuessLike) ->", data);
            let guessLike = parent.getChildByName('GuessLike') as GuessLike;
            if (guessLike == null) {
                guessLike = new GuessLike("game/uiView/GuessLike.json", "game/uiView/GuessLikeItem.json", data, 220);
                parent.addChild(guessLike);
            }
            guessLike.name = 'GuessLike';
            guessLike.mouseThrough = true;
            guessLike.x = (Laya.stage.width - guessLike.width) / 2;
            guessLike.y = Laya.stage.height - guessLike.height;
            resolve(guessLike);
        });
    }

    /**特殊特殊数据*/
    public specialData = [
        {
            "AppID": "wx3aaf3ba7dc737bec",
            "path": "pages/read/read?chapterId=1653070&comicId=107477",     //"platfromName": "看漫画微信小程序",
            "extraData": {
                "appName": "KingsDaughter"
            }
        },
        {
            "AppID": "1109631505",
            "path": "pages/read/read?chapterId=1653070&comicId=107477", // "platfromName": "看漫画QQ小程序",
            "extraData": {
                "appName": "KingsDaughter"
            }
        },
        {
            "AppID": "ttc63ab0875910457b",
            "path": "pages/read/read?chapterId=1653070&comicId=107477", // "platfromName": "看漫画头条小程序",
            "extraData": {
                "appName": "KingsDaughter"
            }
        }
    ]

    /**获取内容信息 */
    public getAppInfo(): any {
        let nIndex = 0;
        if (DeviceUtil.isWXMiniGame()) {
            nIndex = 0;
        } else if (DeviceUtil.isQQMiniGame()) {
            nIndex = 1;
        } else if (DeviceUtil.isTTMiniGame()) {
            nIndex = 2;
        } else {
            return null;
        }
        return this.specialData[nIndex];
    }

    /**特殊的跳出逻辑 */
    public toGameSpecial() {
        let nIndex = 0;
        if (DeviceUtil.isWXMiniGame()) {
            nIndex = 0;
        } else if (DeviceUtil.isQQMiniGame()) {
            nIndex = 1;
        } else if (DeviceUtil.isTTMiniGame()) {
            nIndex = 2;
        } else {
            return;
        }

        let stDataTemp = this.specialData[nIndex];
        //嘟游
        if (BaseConst.infos.gameInfo.isDY) {
            PlatformDY.clickGame(stDataTemp.AppID);
        }
        let data = {
            appId: stDataTemp.AppID,
            path: stDataTemp.path,
            extraData: stDataTemp.extraData,
            success: function () {
                console.log("toGameSpecial success!");
                //嘟游
                if (BaseConst.infos.gameInfo.isDY) {
                    console.log("self.nIndex = ", stDataTemp.AppID);
                    PlatformDY.toGame(stDataTemp.AppID);
                }
            },
            fail: function (e) {
                console.log("toGameSpecial fail e =", e);
            }
        };
        platform.navigateToMiniProgram(data);
    }

    /**特殊城市的判断  使用搜狐API  http://pv.sohu.com/cityjson?ie=utf-8*/
    private strApiUrl: string = "https://pv.sohu.com/cityjson?ie=utf-8";
    public checkCityInfo() {
        if (!BaseConst.infos.gameInfo.region) {
            return;
        }
        // if (!DeviceUtil.isQQMiniGame()) {
        //     return;
        // }

        HttpMgr.getInstance().sendHttpTemp(this.strApiUrl, null, (data: any) => {
            console.log("regioninfo = ", data);
            let strRegion: string = data;
            let nLen = BaseConst.infos.gameInfo.region.length;
            let strDataTemp = "";
            for (let i = 0; i < nLen; ++i) {
                strDataTemp = BaseConst.infos.gameInfo.region[i];
                if (strRegion.indexOf(strDataTemp) != -1) {
                    BaseConst.infos.gameInfo.succShowBox = 0;
                    BaseConst.infos.gameInfo.siginC = 0;
                    BaseConst.infos.gameInfo.boxWDJ = 0;
                    break;
                }
            }
        }, () => {

        });
    }

    /**是否是爱奇艺 */
    public isAiQiYi() {
        return PlatfprmAiQiYi.isOpen;
    }
    ////////////////////////////////////////////////////////// qq////////////////////////////////////////////////////////////////////

    protected compareVersion(v1: string, v2: string) {
        let v1Arr = v1.split(".");
        let v2Arr = v2.split(".");
        const len = Math.max(v1Arr.length, v2Arr.length);

        while (v1Arr.length < len) {
            v1Arr.push("0");
        }
        while (v2Arr.length < len) {
            v2Arr.push("0");
        }

        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1Arr[i]);
            const num2 = parseInt(v2Arr[i]);
            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    }
    public addColorSign(data: { success: Function, fail?: Function, complete?: Function }) {
        if (DeviceUtil.isQQMiniGame()) {
            if (this.compareVersion(this.systemInfo.SDKVersion, "1.10.0") >= 0) {
                platform.addColorSign(data);
            }
        }
    }

    /**
  * 判断是否已在彩签内，基础库1.16.0开始支持。
  */
    public isColorSignExistSync(): boolean {
        if (this.compareVersion(this.systemInfo.SDKVersion, "1.16.0") >= 0) {
            return platform.isColorSignExistSync();
        } else {
            return this.compareVersion(this.systemInfo.SDKVersion, "1.10.0") >= 0;
        }
    }
}