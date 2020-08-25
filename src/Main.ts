import GameConfig from "./GameConfig";
import { GameData } from "./script/common/GameData";
import GamePreLoadingView from "./script/loading/GamePreLoadingView";
import SoundManager from "./script/common/SoundManager";

import { LevelManager } from "./script/manager/LevelManager";
import GameStateManager from "./script/games/GameStateManager";
import { EnterGameType, MoreGameIndex } from "./script/games/CommonDefine";
import { PlayerDataManager } from "./script/common/GameDataManager";
import ConfigManager from "./script/games/ConfigManager";
import ViewChangeManager from "./script/games/ViewChangeManager";
import { MiniManeger } from "./script/minigame/MiniManeger";
import InviteManager from "./script/manager/InviteManager";
import PlatformDY from "./PlatformDY";
import NativeBrige, { NativeMsg } from "./script/tool/NativeBrige";
import SoundConst from "./script/common/SoundConst";
import NativeMgr from "./script/tool/NativeMgr";
import GameEvent from "./script/games/GameEvent";
import PlatfprmAiQiYi from "./PlatfprmAiQiYi";

declare var VConsole;
declare var loadLib;

class Main extends BaseContent {

	private loadingView: GamePreLoadingView;
	constructor() {
		super({ width: 1080, height: 1920, exportSceneToJson: true });
		//
		GameConfig.init();

		if (DeviceUtil.isNative()) {
			SoundConst.perfix = "resource/assets/sounds/ogg/"
			SoundConst.sufix = ".ogg";
		}
		// let s = Utils

		let onShow = function (obj) {
			if(MiniManeger.instance.isAiQiYi()){
				return;
			}
			console.log("onShow...", obj);
			SoundManager.getInstance().playBgMusic();
			if (ViewChangeManager.bGameOpen) {
				if (ViewChangeManager.getInstance().CurLevelBase) {
					ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
				}
			}
		}

		let onHide = function () {
			if(MiniManeger.instance.isAiQiYi()){
				return;
			}
			console.log("onHide...");
			SoundManager.getInstance().pauseBgm();
			if (ViewChangeManager.getInstance().CurLevelBase) {
				ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
			}
		}

		let onAudioInterruptionBegin = (res) => {
			console.log("onAudioInterruptionBegin");
			// SoundManager.getInstance().stopBgMusic();
		};

		let onAudioInterruptionEnd = (res) => {
			console.log("onAudioInterruptionEnd");
			// SoundManager.getInstance().playBgMusic(SoundManager.getInstance().curBgMusic);
		};

		if (DeviceUtil.isMiniGame()) {
			GameData.getInstance().enterGameInfo = platform.getLaunchOptionsSync();
			MiniManeger.instance.onShow(onShow);
			MiniManeger.instance.onHide(onHide);
			MiniManeger.instance.onAudioInterruptionBegin(onAudioInterruptionBegin);
			MiniManeger.instance.onAudioInterruptionEnd(onAudioInterruptionEnd);
			MiniManeger.instance.initMiniGame();
		} else {
			Laya.stage.on(Laya.Event.FOCUS, this, () => {
				console.log("获取焦点");
				onShow(null);
				//EventMgr.getInstance().sendEvent(GameEvent.ONSHOW);
			});
			Laya.stage.on(Laya.Event.BLUR, this, () => {
				console.log("失去焦点");
				onHide();
				//EventMgr.getInstance().sendEvent(GameEvent.ONHIDE);
			});
		}
	}

	/**
	 * 检验平台
	 */
	public checkPlatform(): void {
		this.loadingView = new GamePreLoadingView();
		SceneManager.getInstance().openSceneInstance(this.loadingView);

		console.log("检验平台---");
		let self = this;
		//h5
		if (window["loadingH5"]) {
			window["loadingH5"](100);
			// 初始化
			// loadLib("vconsole.min.js");
		}
		//app
		if (window["loadingView"]) {
			//native brige
			window["NativeBrige"] = NativeBrige.getInstance();
			window["loadingView"].loading(100);
		}
		
		window["onEventNotify"] = PlatfprmAiQiYi.processAppMsg;
		
		//判断平台使用不同的地址资源
		let resUrl: string = "./";
		if (DeviceUtil.isQQMiniGame()) {
			//开启定时回收触发
			GameData.getInstance().gameId = "1050";//qq的游戏id
			//开启定时回收触发
			Laya.timer.loop(10000, window, () => {
				console.log("qq加速回收---");
				platform.triggerGC();
			});
			resUrl = GameData.getInstance().qqMiniGameResUrl;
			self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
		} else if (DeviceUtil.isWXMiniGame()) {
			GameData.getInstance().gameId = "1054";//微信的游戏id
			//开启定时回收触发
			Laya.timer.loop(10000, window, () => {
				console.log("wx加速回收---");
				platform.triggerGC();
			});
			resUrl = GameData.getInstance().wxMiniGameResUrl;
			self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
		} else if (DeviceUtil.isTTMiniGame()) {
			GameData.getInstance().gameId = "1049";
			//开启定时回收触发
			Laya.timer.loop(10000, window, () => {
				console.log("tt加速回收---");
				platform.triggerGC();
			});
			resUrl = GameData.getInstance().ttMiniGameResUrl;
			self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
		} else if (DeviceUtil.isNative()) {
			resUrl = "";
			GameData.getInstance().gameId = "1049";
			//剩余其他的平台
			self.loadPreLoadRes(resUrl + "configs/infos.json");
			Laya.timer.once(5000, window, () => {
				NativeMgr.getInstance().showAdView();
			});
		} else {
			GameData.getInstance().gameId = "1049";
			//剩余其他的平台
			self.initDebug();
			self.loadPreLoadRes(resUrl + "configs/infos.json");
		}
		//
		if (DeviceUtil.isMiniGame()) {
			ResUtil.getIntance().defaultOriginUrl = resUrl;
			ResUtil.getIntance().addVersionPrefix(resUrl);
		}
	}

	/**
	 * 加载预加载资源
	 */
	private loadPreLoadRes(resUrl: string) {
		//
		this.initInfos(resUrl);
		Laya.timer.once(5000, this, this.loadPreLoadRes, [resUrl]);
	}

	/**标记确保infos加载成功 */
	private isFlage: boolean = false;

	protected enableFileConfig(): void {
		Laya.timer.clearAll(this);
		this.loadFileConfig("fileconfig.json");
		if (this.isFlage) {
			return
		}
		this.isFlage = true;
		console.log(BaseConst.infos);
		//
		GameData.getInstance().initConfig(BaseConst.infos);
		if(DeviceUtil.isWXMiniGame()){
			PlatformDY.url = BaseConst.infos.gameInfo.url;
		}
		//区域检测
		MiniManeger.instance.showBannerAd();
		MiniManeger.instance.checkCityInfo();
	}

	/**
	 * 平台登陆
	 */
	private async platformLogin() {
		if (DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
			console.log("开始登录");
			let res;
			let self = this;
			if (DeviceUtil.isQQMiniGame()) {
				MiniManeger.instance.initBoxAd();
				MiniManeger.instance.initBlockAd();
			}
			let enter = async () => {
				if (DeviceUtil.isWXMiniGame() || DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
					if (BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame()) {
						let isAuthorize = await platform.checkIsAuthorize();
						let userinfo = null;
						if (isAuthorize) {
							userinfo = await MiniManeger.instance.initUserTemp();
						}
						if (userinfo == null) {//如果没授权 就是纯净模式
							userinfo = { nickName: '', avatarUrl: '', gender: '' };
						}
						let obj = GameData.getInstance().enterGameInfo;
						let scene = obj.query.scene == undefined ? null : obj.query.scene;
						PlatformDY.getOpenidAndAuthorzia({
							code: res, nickName: userinfo.nickName, avatarUrl: userinfo.avatarUrl, gender:
								userinfo.gender, scene: decodeURIComponent(scene)
						}).then((dyUser) => {
							GameData.getInstance().userInfo.openId = dyUser.openid;
							let strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
							console.log("strOpenIdOther = ", strOpenIdOther);
							if (strOpenIdOther && strOpenIdOther != "") {
								InviteManager.getInstance().judgeInvite();
								console.log("createUserInfoButton 用户信息 : ", GameData.getInstance().userInfo);
							}
							//嘟游
							if (BaseConst.infos.gameInfo.isDY) {
								PlatformDY.getGameList().then(() => {
									//let nLen = 10;
									//nLen = PlatformDY.gameListInfos.length > 10 ? 10 :// PlatformDY.gameListInfos.length
									GameData.getInstance().weCatMiniIconsInfo = [];
									let nLen = PlatformDY.gameListInfos.length;
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
							//加载玩家数据
							PlayerDataManager.getInstance().GetData();
						});
					} else {
						console.log("登陆信息:", res);
						GameData.getInstance().userInfo.openId = res.openid;
						GameData.getInstance().userInfo.sessionKey = res.session_key;

						console.log("用户信息 : ", GameData.getInstance().userInfo);
						if (DeviceUtil.isTTMiniGame()) {
							let userInfo = await platform.getUserInfo();
							console.log("getUserInfo:", userInfo);
							GameData.getInstance().userInfo.nick = userInfo.nickName;
							GameData.getInstance().userInfo.avatarUrl = userInfo.avatarUrl;
							console.log("授权用户信息 : ", GameData.getInstance().userInfo);
						} else {
							await MiniManeger.instance.initUserTemp();
						}
						PlayerDataManager.getInstance().GetData();
					}
				}
			}
			if (DeviceUtil.isTTMiniGame()) {
				let res = await platform.login();
				if (res) {
					res = JSON.parse(res);
					console.log("登陆信息:", res);
					GameData.getInstance().userInfo.openId = res.openid;
					GameData.getInstance().userInfo.sessionKey = res.session_key;
					console.log("用户信息 : ", GameData.getInstance().userInfo);
				}
				//加载玩家数据
				PlayerDataManager.getInstance().GetData();
			} else {
				if (BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame()) {
					res = await platform.DYlogin();
				} else {
					res = await platform.login();
					res = JSON.parse(res);
				}
				enter();
			}
		} else {
			GameData.getInstance().userInfo.openId = GameData.getInstance().userInfo.sessionKey = DeviceUtil.getDeviceNo();
			PlayerDataManager.getInstance().GetData();
		}
	}

	/**
	 * 加载资源
	 */
	protected async loadRes() {
		await this.platformLogin();
		console.log("loadRes---");
		console.log("加载预加载资源--");
		let resUrl = "";
		if (DeviceUtil.isQQMiniGame()) {
			Laya.loader.create("configs/gameQQInfo.json" + GameData.getInstance().randomTime, Laya.Handler.create(this, (infos) => {
				GameData.getInstance().gameQQInfo = infos;
			}), null);
		}
		if (DeviceUtil.isNative()) {
			await ResUtil.getIntance().loadThms(resUrl + "resource/default.thm.json");
			await ResUtil.getIntance().loadRESConfig(resUrl + "resource/default.res.json");
		} else {
			let loadresUrl = resUrl;
			await ResUtil.getIntance().loadThms(loadresUrl + "resource/default.thm.json?v=" + Math.random());
			await ResUtil.getIntance().loadRESConfig(loadresUrl + "resource/default.res.json?v=" + Math.random());
		}

		//加载微信的运营需求
		if (DeviceUtil.isWXMiniGame() && !BaseConst.infos.gameInfo.isDY) {
			Laya.loader.load(resUrl + "configs/wxmoregame.json?v=" + Math.random(), Laya.Handler.create(this, (res) => {
				if (typeof (res) == "string") {
					res = JSON.parse(res);
				}
				let infos = [];
				for (let i = 0, len = res.iconList.length; i < len; i++) {
					res.iconList[i].ad_img = "https://package.32yx.com/ecy_game_small/laya/girl/wx_res/moregame/" + res.iconList[i].ad_img;
				}
				GameData.getInstance().weCatMiniIconsInfo = res.iconList;
			}));
		} else if (DeviceUtil.isTTMiniGame()) {
			Laya.loader.load(resUrl + "configs/ttmoregame.json?v=" + Math.random(), Laya.Handler.create(this, (res) => {
				if (typeof (res) == "string") {
					res = JSON.parse(res);
				}
				let infos = [];
				for (let i = 0, len = res.iconList.length; i < len; i++) {
					res.iconList[i].ad_img = "https://package.32yx.com/ecy_game_small/laya/girl/tt/moregame/" + res.iconList[i].ad_img;
				}
				GameData.getInstance().weCatMiniIconsInfo = res.iconList;
			}));
		}
		let group = ["gamehome"];
		//加入当前关卡的数据
		let nLevelGroup = PlayerDataManager.getInstance().getCurLevelToChallenge();
		if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
			nLevelGroup = nLevelGroup + 1;
		}
		ViewChangeManager.getInstance().rigestBufferLoadingView();

		if (nLevelGroup == 3)
			nLevelGroup = 2;
		group.push(nLevelGroup.toString());
		let self = this;
		ResUtil.getIntance().fastLoadGroups(group, () => {
			ViewChangeManager.getInstance().showBufferLoadingView();
			ConfigManager.getInstance().initConfigInfo().then(() => {
				if (PlayerDataManager.getInstance().bPlayerLoadFinish || !BaseConst.infos.gameInfo.isDY) {
					this.funcAfterLodRed();
				} else {
					PlayerDataManager.getInstance().bResLoadFinish = true;
					EventMgr.getInstance().addEvent(GameEvent.HAS_GET_PLAYER_DATA, this, this.funcAfterLodRed);
				}
			});
			SoundManager.getInstance().isEnterView = true;
			self.onPlayMusic();
		}, (cur, total) => {
			self.loadingView.progress(cur, total);
		});
	}

	public onPlayMusic() {
		SoundManager.getInstance().bgm = 'bg';
	}

	public funcAfterLodRed() {
		console.log("配置加载完成---");
		PlayerDataManager.getInstance().initGoods();
		PlayerDataManager.getInstance().refreshOffLinePS();

		if (!PlayerDataManager.getInstance().bIsNewPlayer) {
			GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
		} else {
			GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ChooseLevel;
			PlayerDataManager.getInstance().SaveData();
		}
		

		PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getLevelToChangeMaxLevel() - 1);
		LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getLevelToChangeMaxLevel());
		ViewChangeManager.getInstance().showCommonView();
		ViewChangeManager.getInstance().showImageExit();
		ViewChangeManager.bGameOpen = true;
		ResUtil.getIntance().loadGroups(['success', 'game', "panel", "common"]);
		ViewChangeManager.getInstance().hideBufferLoadingView();
	}
}
//激活启动类
new Main();
