(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var CustemButton = (function (_super) {
        __extends(CustemButton, _super);
        function CustemButton() {
            return _super.call(this) || this;
        }
        return CustemButton;
    }(CustomScaleComponent));

    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.init = function () {
            var reg = Laya.ClassUtils.regClass;
            reg("script/tool/CustemButton.ts", CustemButton);
        };
        GameConfig.width = 640;
        GameConfig.height = 1136;
        GameConfig.scaleMode = "fixedwidth";
        GameConfig.screenMode = "none";
        GameConfig.alignV = "top";
        GameConfig.alignH = "left";
        GameConfig.startScene = "game/GameHomeView.scene";
        GameConfig.sceneRoot = "";
        GameConfig.debug = false;
        GameConfig.stat = false;
        GameConfig.physicsDebug = false;
        GameConfig.exportSceneToJson = true;
        return GameConfig;
    }());
    GameConfig.init();

    var localData;
    (function (localData) {
        var InviteData = (function () {
            function InviteData() {
            }
            return InviteData;
        }());
        localData.InviteData = InviteData;
    })(localData || (localData = {}));
    var netData;
    (function (netData) {
        var UserInfos = (function () {
            function UserInfos() {
                this.openId = "";
                this.nick = "";
                this.avatarUrl = "";
                this.sex = 0;
                this.sessionKey = "";
                this.accessToken = "";
            }
            return UserInfos;
        }());
        netData.UserInfos = UserInfos;
        var PlayerData = (function () {
            function PlayerData() {
                this.lastTime = null;
                this.gold = 2000;
                this.snacks = 0;
                this.lottery = { fish: 0, fishVideo: 1 };
                this.curMaxCompLv = 1;
            }
            return PlayerData;
        }());
        netData.PlayerData = PlayerData;
        var Invite = (function () {
            function Invite() {
                this.inviteId = [];
            }
            return Invite;
        }());
        netData.Invite = Invite;
        var Inviter = (function () {
            function Inviter() {
            }
            return Inviter;
        }());
        netData.Inviter = Inviter;
    })(netData || (netData = {}));

    var GameData = (function () {
        function GameData() {
            this.isNewPlayer = true;
            this.gameQQInfo = {
                "psViewCloseOpen": true,
                "signCloseVideoOpen": true,
                "signDoubleVideoOpen": true,
                "showLevelOverViewoOpen": [3, 6, 9],
                "lotteryShowVideoNoIconOpen": true
            };
            this.gameId = "1049";
            this.userInfo = new netData.UserInfos();
            this.isByCollection = false;
            this.isByShare = false;
            this.deadTime = 1500;
            this.codeVersion_ = "t.v.4.3.3";
            this.qqMiniGameResUrl = "https://package.32yx.com/ecy_game_small/laya/girl_ks/qq_res/qq_res_v_z_2_7/";
            this.wxMiniGameResUrl = "https://package.32yx.com/ecy_game_small/laya/girl_ks/wx_res/wx_res_v_z_3_2/";
            this.ttMiniGameResUrl = "https://package.32yx.com/ecy_game_small/laya/girl_ks/tt_res/tt_res_v_z_3_2/";
            this.debug_ = (this.serverConf_ != "wzs");
            this.guanQiaArr = [30, 50, 20, 50, 50];
            this.tips = "";
            this.videoTips = "视频观看完整才能获得奖励哦";
            this.URL_DELETE_DATA = "https://littlegame.32yx.com/DelMiniGameData.fcgi";
            this.URL_DELETE_DATA_TEST = "https://172.17.3.217:8090/DelMiniGameData.fcgi";
            this.URL_SAVE_DATA = "https://littlegame.32yx.com/MiniGameData.fcgi";
            this.URL_SAVE_DATA_TEST = "http://172.17.3.217:8090/MiniGameData.fcgi";
            this.URL_OF_RANK = "https://littlegame.32yx.com/MiniGameRank.fcgi";
            this.URL_OF_RANK_TEST = "http://172.17.3.217:8090/MiniGameRank.fcgi";
            this.URL_OF_INVITE = "https://littlegame.32yx.com/Invitation.fcgi";
            this.URL_OF_INVITE_TEST = "http://172.17.3.217:8090/Invitation.fcgi";
            this.URL_TIMESTAMP = "https://littlegame.32yx.com/gettime.php";
            this.URL_WX_REQ = "https://yxtest.32yx.com/MiniGame.fcgi";
            this.URL_WX_REQ_TEST = "http://172.17.3.217:8090/MiniGame.fcgi";
            this.bannerId = new Array();
            this.videoId = Array();
            this.longVideoId = Array();
            this.randomTime = "?v=" + Date.now();
        }
        GameData.getInstance = function () {
            if (!GameData.instance) {
                GameData.instance = new GameData();
            }
            return GameData.instance;
        };
        Object.defineProperty(GameData.prototype, "serverConf", {
            set: function (sc) {
                this.serverConf_ = sc;
                this.initServer();
            },
            enumerable: true,
            configurable: true
        });
        GameData.prototype.initServer = function () {
            switch (GameData.instance.serverConf_) {
                case "nts":
                    this.URL_SAVE_DATA = this.URL_SAVE_DATA_TEST;
                    this.URL_OF_RANK = this.URL_OF_RANK_TEST;
                    this.URL_OF_INVITE = this.URL_OF_INVITE_TEST;
                    this.URL_DELETE_DATA = this.URL_DELETE_DATA_TEST;
                    break;
                case "wts":
                    break;
                case "wzs":
                    break;
            }
        };
        Object.defineProperty(GameData.prototype, "codeVersion", {
            get: function () {
                return this.codeVersion_ + " " + this.serverConf_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameData.prototype, "debug", {
            get: function () {
                return (this.serverConf_ != "wzs");
            },
            enumerable: true,
            configurable: true
        });
        GameData.prototype.initConfig = function (res) {
            if (res) {
                this.bannerId = res.gameInfo.bannerId;
                this.videoId = res.gameInfo.videoId;
                this.longVideoId = res.gameInfo.longVideoId;
                this.boxId = res.gameInfo.boxId;
            }
            else {
                console.error("GameData.initConfig res error!");
            }
        };
        return GameData;
    }());

    var AnimationManager = (function () {
        function AnimationManager() {
        }
        Object.defineProperty(AnimationManager, "instance", {
            get: function () {
                if (AnimationManager.ins == null) {
                    AnimationManager.ins = new AnimationManager();
                }
                return AnimationManager.ins;
            },
            enumerable: true,
            configurable: true
        });
        AnimationManager.prototype.getAtlasAnimation = function (url, fex) {
            url = url + fex;
            return new Promise(function (resolve) {
                var roleAni = new Laya.Animation();
                roleAni.loadAtlas(url, Laya.Handler.create(null, function () {
                    resolve(roleAni);
                }));
            });
        };
        AnimationManager.prototype.scaleTween = function (target, caller, duration, complete, props, ease) {
            if (duration === void 0) { duration = 500; }
            target.visible = true;
            target.scale(0.8, 0.8);
            Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, ease, Laya.Handler.create(caller, function () {
                complete && complete();
            }));
        };
        AnimationManager.prototype.scaleBTween = function (target, caller, duration, complete, props, ease) {
            if (duration === void 0) { duration = 500; }
            target.scale(1.1, 1.1);
            Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, ease, Laya.Handler.create(caller, function () {
                complete && complete();
            }));
        };
        AnimationManager.prototype.upToDownTween = function (target, props, duration, caller, ease, complete) {
            Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(caller, function () {
                complete && complete();
            }));
        };
        AnimationManager.prototype.showSkeletonAnimation = function (url, callBack, aniMode) {
            console.log(url);
            var boomAnimation = new Laya.Skeleton();
            boomAnimation.load(url, Laya.Handler.create(this, function () {
                if (boomAnimation.player == null) {
                    callBack && callBack(null);
                    return;
                }
                boomAnimation.player.playbackRate = 1;
                callBack && callBack(boomAnimation);
            }), aniMode);
        };
        AnimationManager.prototype.show2dBoonAnimation = function (url, dbBox, index, loop, rate, x, y, rotation) {
            var _this = this;
            return new Promise(function (resolve) {
                var self = _this;
                dbBox.removeChildren();
                var boomAnimation = new Laya.Skeleton();
                boomAnimation.load(url, Laya.Handler.create(self, function () {
                    if (!boomAnimation.player) {
                        resolve();
                        return;
                    }
                    boomAnimation.player.playbackRate = rate;
                    boomAnimation.player.once(Laya.Event.STOPPED, self, function () {
                        resolve();
                    });
                    boomAnimation.scale(2, 2);
                    dbBox.addChild(boomAnimation);
                    boomAnimation.x = x;
                    boomAnimation.y = y;
                    boomAnimation.rotation = rotation;
                    boomAnimation.play(index, loop);
                }));
            });
        };
        AnimationManager.prototype.displayTwinkle = function (target, prefix, caller) {
            var index = 1;
            Laya.timer.loop(500, caller, function () {
                target.skin = prefix + index + ".png";
                index = index == 1 ? 2 : 1;
            });
        };
        AnimationManager.prototype.frameAni = function (target, prefix, caller, frameNum, time) {
            if (time === void 0) { time = 100; }
            var index = 1;
            Laya.timer.loop(time, caller, function () {
                target.skin = prefix + index + ".png";
                index++;
                if (index > frameNum)
                    index = 1;
            });
        };
        AnimationManager.prototype.zoomTween = function (target, caller) {
            var scaleDelta = 0;
            Laya.timer.loop(20, caller, function () {
                scaleDelta += 0.04;
                var scaleVaule = Math.sin(scaleDelta) * 0.1 + 1;
                target.scale(scaleVaule, scaleVaule);
            });
        };
        AnimationManager.prototype.zoomImgTween = function (target, caller) {
            var scaleDelta = 0;
            Laya.timer.loop(20, caller, function () {
                scaleDelta += 0.04;
                var scaleVaule = Math.sin(scaleDelta) * 0.02 + 1;
                target.rotation += Math.sin(scaleDelta) * 0.02;
                target.scale(scaleVaule, scaleVaule);
            });
        };
        AnimationManager.prototype.titleImgTween = function (target, caller) {
            var scaleDelta = 0;
            Laya.timer.loop(20, caller, function () {
                scaleDelta += 0.04;
                target.rotation += Math.sin(scaleDelta) * 0.2;
            });
        };
        AnimationManager.prototype.VTween = function (target, caller, ds) {
            if (ds === void 0) { ds = 1; }
            var xDelta = 0;
            Laya.timer.loop(20, caller, function () {
                xDelta += 0.04;
                var xVaule = Math.sin(xDelta) * ds;
                target.x += xVaule;
            });
        };
        AnimationManager.prototype.flaTween = function (target, caller) {
            var alp = 0;
            Laya.timer.loop(20, caller, function () {
                alp += 0.04;
                var alpVaule = Math.abs(Math.sin(alp) * 0.5) + 0.5;
                target.alpha = alpVaule;
            });
        };
        AnimationManager.prototype.swingHeadTween = function (target, caller) {
            var scaleDelta = 0;
            var posY = target.y;
            Laya.timer.loop(20, caller, function () {
                scaleDelta += 0.04;
                var scaleVaule = Math.sin(scaleDelta) * 6;
                target.y = scaleVaule + posY;
            });
        };
        AnimationManager.prototype.fallAni = function (target, caller, duration) {
            var disY = 1920 - target.y;
            var time = (duration / 20) + 1;
            var vX = Math.random() * 10 - 5;
            var vY = -Math.random() * 30;
            var aY = (disY - vY * time) * 2 / (time * time);
            var x = target.x;
            var y = target.y;
            var t = 0;
            var r = 360 / time;
            Laya.timer.loop(20, caller, function onLoop() {
                vY += aY;
                x += vX;
                y += vY;
                t += 20;
                target.pos(x, y);
                target.rotation += r;
                if (t > duration) {
                    Laya.timer.clear(caller, onLoop);
                    target.destroy();
                }
            });
        };
        AnimationManager.prototype.riseAni = function (target, caller, duration) {
            var vY = -Math.random() * 2;
            var t = 0;
            var scaleDelta = 0;
            Laya.timer.loop(20, caller, function onLoop() {
                target.y += vY;
                t += 20;
                scaleDelta += 0.04;
                var scaleVaule = Math.sin(scaleDelta) * 0.5 + 0.1;
                target.scale(scaleVaule, scaleVaule);
                if (t > duration) {
                    Laya.timer.clear(caller, onLoop);
                    target.destroy();
                }
            });
        };
        AnimationManager.prototype.flayGlod = function (xSrc, ySrc, xObj, yObj) {
            var _this = this;
            var iTeme = 30;
            var nCount = 10;
            var goldArr = [];
            for (var i = 0; i < nCount; i++) {
                var goldImg = Laya.Pool.getItem("goods");
                if (!goldImg)
                    goldImg = new Laya.Image();
                goldImg.skin = "resource/assets/img/common/maininterface_icon_6.png";
                Laya.stage.addChild(goldImg);
                goldImg.x = xSrc;
                goldImg.y = ySrc;
                goldArr.push(goldImg);
            }
            var _loop_1 = function (i) {
                Laya.timer.once(i * iTeme, this_1, function () {
                    Laya.Tween.to(goldArr[i], { x: xObj, y: yObj }, 200, null, Laya.Handler.create(_this, function () {
                        Laya.stage.removeChild(goldArr[i]);
                        Laya.Pool.recover("goods", goldArr[i]);
                    }));
                });
            };
            var this_1 = this;
            for (var i = 0; i < goldArr.length; i++) {
                _loop_1(i);
            }
        };
        return AnimationManager;
    }());

    var EnterGameType;
    (function (EnterGameType) {
        EnterGameType[EnterGameType["enum_EnterGameType_GameHome"] = 1] = "enum_EnterGameType_GameHome";
        EnterGameType[EnterGameType["enum_EnterGameType_Next"] = 2] = "enum_EnterGameType_Next";
        EnterGameType[EnterGameType["enum_EnterGameType_ReStart"] = 3] = "enum_EnterGameType_ReStart";
        EnterGameType[EnterGameType["enum_EnterGameType_ChooseLevel"] = 4] = "enum_EnterGameType_ChooseLevel";
    })(EnterGameType || (EnterGameType = {}));
    var GoodsType;
    (function (GoodsType) {
        GoodsType[GoodsType["enum_GoodsType_Sp"] = 1] = "enum_GoodsType_Sp";
        GoodsType[GoodsType["enum_GoodsType_Glod"] = 2] = "enum_GoodsType_Glod";
    })(GoodsType || (GoodsType = {}));
    var SkinState;
    (function (SkinState) {
        SkinState[SkinState["enum_SkinState_Have"] = 1] = "enum_SkinState_Have";
        SkinState[SkinState["enum_SkinState_NotOwned"] = 2] = "enum_SkinState_NotOwned";
        SkinState[SkinState["enum_SkinState_Used"] = 3] = "enum_SkinState_Used";
    })(SkinState || (SkinState = {}));
    var MoreGameIndex = (function () {
        function MoreGameIndex() {
            this.ad_id = 0;
            this.ad_img = "";
            this.name = "";
            this.ad_appid = "";
            this.url = "";
        }
        return MoreGameIndex;
    }());

    var GameLogicProcessingManager = (function () {
        function GameLogicProcessingManager() {
        }
        GameLogicProcessingManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new GameLogicProcessingManager();
            }
            return this.instance;
        };
        GameLogicProcessingManager.GetCurTime = function () {
            return Laya.Browser.now();
        };
        Object.defineProperty(GameLogicProcessingManager.prototype, "PSRecoveryOpen", {
            get: function () {
                return this.bPSRecoveryOpen;
            },
            set: function (b) {
                this.bPSRecoveryOpen = b;
            },
            enumerable: true,
            configurable: true
        });
        return GameLogicProcessingManager;
    }());

    var GameEvent = (function () {
        function GameEvent() {
        }
        GameEvent.ON_PS_CHANGE = "ON_PS_CHANGE";
        GameEvent.ON_GLOD_CHANGE = "ON_GLOD_CHANGE";
        GameEvent.ON_SP_UPDOWN_TIME = "ON_SP_UPDOWN_TIME";
        GameEvent.REFRESH_INVITE = "REFRESH_INVITE";
        GameEvent.EVENT_FLAY_GLOD = "EVENT_FLAY_GLOD";
        GameEvent.CHANGE_VIDEO_IMAGE = "CHANGE_VIDEO_IMAGE";
        GameEvent.HAS_GET_PLAYER_DATA = "HAS_GET_PLAYER_DATA";
        GameEvent.PS_LIMITLESS = "PS_LIMITLISS";
        return GameEvent;
    }());
    window['GameEvent'] = GameEvent;

    var PlayerDataBase = (function () {
        function PlayerDataBase() {
            this.inviteId = [];
            this.nMaxLevel = 0;
            this.nCurLevel = 0;
            this.nCurIndex = 0;
            this.nSignTimeLast = 0;
            this.nSignIndex = 0;
            this.nGlodCount = 0;
            this.nPS = 5;
            this.nPsTime = 0;
        }
        return PlayerDataBase;
    }());
    var DYLogData = (function () {
        function DYLogData() {
            this.aryIndex = [];
        }
        return DYLogData;
    }());
    var NewOperData = (function () {
        function NewOperData() {
            this.nMaxLevelNew = 0;
            this.nLastMaxLevel = 0;
        }
        return NewOperData;
    }());
    var NewFuncPsLimitless = (function () {
        function NewFuncPsLimitless() {
            this.nRefreshTime = 0;
            this.nCurTime = 0;
            this.nMaxTime = 5;
        }
        return NewFuncPsLimitless;
    }());
    var OperData0807 = (function () {
        function OperData0807() {
            this.bSpecial = false;
        }
        return OperData0807;
    }());
    var PlayerDataManager = (function () {
        function PlayerDataManager() {
            this.nMaxLevelCount = 30;
            this.stPlayerDataBase = new PlayerDataBase();
            this.stDYLogData = new DYLogData();
            this.stNewOperData = new NewOperData();
            this.stNewFuncPsLimitless = new NewFuncPsLimitless();
            this.nPsRecoveryTime = 0;
            this.nPsTimeCountDown = 0;
            this.strUpDownTime = "";
            this.bIsNewPlayer = false;
            this.bPlayerLoadFinish = false;
            this.bResLoadFinish = false;
            this.stOperData0807 = new OperData0807();
            this.ttMiniGameArraignmentSpecialOper();
        }
        PlayerDataManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new PlayerDataManager();
            }
            return this.instance;
        };
        PlayerDataManager.prototype.addLevel = function () {
            this.stPlayerDataBase.nCurLevel += 1;
            if (this.stNewOperData.nMaxLevelNew < this.stPlayerDataBase.nCurLevel) {
                this.stNewOperData.nMaxLevelNew = this.stPlayerDataBase.nCurLevel;
                this.stNewOperData.nMaxLevelNew = this.stNewOperData.nMaxLevelNew >= this.nMaxLevelCount ? this.nMaxLevelCount : this.stNewOperData.nMaxLevelNew;
            }
            this.stPlayerDataBase.nCurLevel = this.stPlayerDataBase.nCurLevel < this.nMaxLevelCount ? this.stPlayerDataBase.nCurLevel : this.nMaxLevelCount - 1;
            if (this.stPlayerDataBase.nMaxLevel < this.stPlayerDataBase.nCurLevel) {
                this.stPlayerDataBase.nMaxLevel = this.stPlayerDataBase.nCurLevel;
            }
            this.SaveData();
        };
        PlayerDataManager.prototype.getCurLevel = function () {
            return this.stPlayerDataBase.nCurLevel;
        };
        PlayerDataManager.prototype.getCurLevelMax = function () {
            return this.stPlayerDataBase.nMaxLevel;
        };
        PlayerDataManager.prototype.setCurLevel = function (nLevel) {
            this.stPlayerDataBase.nCurLevel = nLevel;
            this.SaveData();
        };
        PlayerDataManager.prototype.getCurLevelToChallenge = function () {
            var nRealData = this.stPlayerDataBase.nCurLevel + 1;
            if (nRealData > this.nMaxLevelCount) {
                nRealData = this.nMaxLevelCount;
            }
            if (this.allCustomsClearance()) {
                nRealData = Utils.random(1, this.nMaxLevelCount);
            }
            return nRealData;
        };
        PlayerDataManager.prototype.getLevelToChangeMaxLevel = function () {
            var nRealData = this.stPlayerDataBase.nMaxLevel + 1;
            if (nRealData > this.nMaxLevelCount) {
                nRealData = this.nMaxLevelCount;
            }
            if (this.allCustomsClearance()) {
                nRealData = this.stPlayerDataBase.nCurLevel + 1;
                if (nRealData > this.nMaxLevelCount) {
                    nRealData = this.nMaxLevelCount;
                }
            }
            return nRealData;
        };
        PlayerDataManager.prototype.getLevelToChangeMaxLevelForLevelView = function () {
            var nRealData = this.stPlayerDataBase.nMaxLevel + 1;
            if (nRealData > this.nMaxLevelCount) {
                nRealData = this.nMaxLevelCount;
            }
            return nRealData;
        };
        PlayerDataManager.prototype.SaveData = function () {
            var str = JSON.stringify(this.stPlayerDataBase);
            Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "BaseData", str);
            str = JSON.stringify(this.stNewOperData);
            Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "task20200611", str);
            str = JSON.stringify(this.stNewFuncPsLimitless);
            Laya.LocalStorage.setItem(GameData.getInstance().userInfo.openId + "NewFuncPsLimitless", str);
            var strNewOper0807 = JSON.stringify(this.stOperData0807);
            Laya.LocalStorage.setItem("OperData0807" + GameData.getInstance().userInfo.openId, strNewOper0807);
        };
        PlayerDataManager.prototype.GetData = function () {
            var str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "BaseData");
            if (str) {
                try {
                    this.stPlayerDataBase = JSON.parse(str);
                    this.bIsNewPlayer = false;
                }
                catch (e) {
                    console.log("error player data : ", e);
                    this.bIsNewPlayer = true;
                    this.stPlayerDataBase = new PlayerDataBase();
                }
            }
            else {
                this.bIsNewPlayer = true;
            }
            str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "task20200611");
            if (str) {
                try {
                    this.stNewOperData = JSON.parse(str);
                }
                catch (e) {
                    console.log("error player data : ", e);
                    this.stNewOperData = new NewOperData();
                }
            }
            var strOperData0807 = Laya.LocalStorage.getItem("OperData0807" + GameData.getInstance().userInfo.openId);
            if (strOperData0807) {
                this.stOperData0807 = JSON.parse(strOperData0807);
            }
            else {
                this.stOperData0807 = new OperData0807();
            }
            str = Laya.LocalStorage.getItem(GameData.getInstance().userInfo.openId + "NewFuncPsLimitless");
            if (str) {
                try {
                    this.stNewFuncPsLimitless = JSON.parse(str);
                }
                catch (e) {
                    console.log("error player data : ", e);
                    this.stNewFuncPsLimitless = new NewFuncPsLimitless();
                }
            }
            if (this.stNewFuncPsLimitless.nRefreshTime == 0) {
                this.stNewFuncPsLimitless.nRefreshTime = new Date().getTime();
            }
            var nCurTime = new Date().getTime();
            if (!Utils.judgeIsOnTheSameDay(this.stNewFuncPsLimitless.nRefreshTime, nCurTime)) {
                this.stNewFuncPsLimitless.nCurTime = 0;
                this.stNewFuncPsLimitless.nRefreshTime = nCurTime;
            }
            if (this.stNewOperData.nMaxLevelNew == 0) {
                this.stNewOperData.nMaxLevelNew = this.stPlayerDataBase.nMaxLevel;
            }
            if (this.stNewOperData.nLastMaxLevel == 0) {
                this.stNewOperData.nLastMaxLevel = this.nMaxLevelCount;
            }
            if (this.stNewOperData.nLastMaxLevel < this.nMaxLevelCount && (this.stPlayerDataBase.nMaxLevel + 1) == this.stNewOperData.nMaxLevelNew) {
                this.stPlayerDataBase.nMaxLevel += 1;
                this.stNewOperData.nLastMaxLevel = this.nMaxLevelCount;
            }
            if (BaseConst.infos.gameInfo.openalllevel && BaseConst.infos.gameInfo.openalllevel == 1) {
                this.stPlayerDataBase.nCurLevel = this.nMaxLevelCount - 1;
                this.stPlayerDataBase.nMaxLevel = this.nMaxLevelCount - 1;
                this.bIsNewPlayer = false;
            }
            EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
            EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
            this.bPlayerLoadFinish = true;
            if (this.bResLoadFinish && BaseConst.infos.gameInfo.isDY) {
                EventMgr.getInstance().sendEvent(GameEvent.HAS_GET_PLAYER_DATA);
            }
            if (this.stNewFuncPsLimitless.nCurTime == this.stNewFuncPsLimitless.nMaxTime) {
                EventMgr.getInstance().sendEvent(GameEvent.PS_LIMITLESS);
            }
        };
        PlayerDataManager.prototype.AddGoods = function (nType, nCount) {
            if (nType == GoodsType.enum_GoodsType_Glod) {
                this.stPlayerDataBase.nGlodCount += nCount;
                EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
            }
            else if (nType == GoodsType.enum_GoodsType_Sp) {
                this.stPlayerDataBase.nPS += nCount;
                var nMax = 99;
                var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(4);
                if (stGameConfig) {
                    nMax = parseInt(stGameConfig.strValue);
                }
                if (this.stPlayerDataBase.nPS > nMax) {
                    TipsManager.getInstance().showDefaultTips("体力已满");
                    this.stPlayerDataBase.nPS = nMax;
                }
                EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
                this.openPSRecoveryTime();
            }
            this.SaveData();
        };
        PlayerDataManager.prototype.CheckGoods = function (nType, nCount) {
            if (nType == GoodsType.enum_GoodsType_Glod) {
                return this.stPlayerDataBase.nGlodCount >= nCount;
            }
            else if (nType == GoodsType.enum_GoodsType_Sp) {
                if (this.isPsLimitlessState()) {
                    return true;
                }
                return this.stPlayerDataBase.nPS >= nCount;
            }
        };
        PlayerDataManager.prototype.subGoods = function (nType, nCount) {
            if (nType == GoodsType.enum_GoodsType_Glod) {
                this.stPlayerDataBase.nGlodCount -= nCount;
                this.stPlayerDataBase.nGlodCount = this.stPlayerDataBase.nGlodCount < 0 ? 0 : this.stPlayerDataBase.nGlodCount;
                EventMgr.getInstance().sendEvent(GameEvent.ON_GLOD_CHANGE);
            }
            else if (nType == GoodsType.enum_GoodsType_Sp) {
                if (this.isPsLimitlessState()) {
                    return;
                }
                this.stPlayerDataBase.nPS -= nCount;
                this.stPlayerDataBase.nPS = this.stPlayerDataBase.nPS < 0 ? 0 : this.stPlayerDataBase.nPS;
                EventMgr.getInstance().sendEvent(GameEvent.ON_PS_CHANGE);
                this.openPSRecoveryTime();
            }
            this.SaveData();
        };
        PlayerDataManager.prototype.getSpLastTime = function () {
            return this.strUpDownTime;
        };
        PlayerDataManager.prototype.refreshOffLinePS = function () {
            this.addPsAboutOffLine();
            this.openPSRecoveryTime();
        };
        PlayerDataManager.prototype.addPsAboutOffLine = function () {
            if (this.stPlayerDataBase.nPsTime == 0) {
                return;
            }
            var nMaxPs = 10;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(1);
            if (stGameConfig) {
                nMaxPs = parseInt(stGameConfig.strValue);
            }
            if (this.stPlayerDataBase.nPS >= nMaxPs) {
                return;
            }
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(2);
            if (stGameConfig) {
                var nAddPsPerTime = parseInt(stGameConfig.strValue);
                if (nAddPsPerTime == 0) {
                    return;
                }
                var nCurtTime = GameLogicProcessingManager.GetCurTime();
                var nTimeOverFlow = nCurtTime - this.stPlayerDataBase.nPsTime;
                var nPsAdd = Math.floor(nTimeOverFlow / nAddPsPerTime);
                this.stPlayerDataBase.nPS += nPsAdd;
                nTimeOverFlow = nTimeOverFlow % nAddPsPerTime;
                this.stPlayerDataBase.nPsTime = nCurtTime - nTimeOverFlow;
                if (this.stPlayerDataBase.nPS >= nMaxPs) {
                    this.stPlayerDataBase.nPS = nMaxPs;
                    this.stPlayerDataBase.nPsTime = 0;
                }
                this.SaveData();
            }
        };
        PlayerDataManager.prototype.openPSRecoveryTime = function () {
            if (this.nPsRecoveryTime == 0) {
                var stGameConfig_1 = ConfigManager.getInstance().getGameConfigDataByID(2);
                if (!stGameConfig_1) {
                    return;
                }
                this.nPsRecoveryTime = parseInt(stGameConfig_1.strValue);
            }
            var nMaxPs = 10;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(1);
            if (stGameConfig) {
                nMaxPs = parseInt(stGameConfig.strValue);
            }
            if (this.stPlayerDataBase.nPS >= nMaxPs) {
                Laya.timer.clear(this, this.subTimeAndRefreshPsRecoveryTimeView);
                this.stPlayerDataBase.nPsTime = 0;
                GameLogicProcessingManager.getInstance().PSRecoveryOpen = false;
            }
            else {
                if (!GameLogicProcessingManager.getInstance().PSRecoveryOpen) {
                    GameLogicProcessingManager.getInstance().PSRecoveryOpen = true;
                    var nCurTime = GameLogicProcessingManager.GetCurTime();
                    if (this.stPlayerDataBase.nPsTime == 0) {
                        this.stPlayerDataBase.nPsTime = nCurTime;
                    }
                    this.nPsTimeCountDown = this.nPsRecoveryTime - (nCurTime - this.stPlayerDataBase.nPsTime);
                    this.refreshPsRecoveryTimeView(this.nPsTimeCountDown);
                    Laya.timer.loop(1000, this, this.subTimeAndRefreshPsRecoveryTimeView);
                    this.SaveData();
                }
            }
        };
        PlayerDataManager.prototype.subTimeAndRefreshPsRecoveryTimeView = function () {
            if (!GameLogicProcessingManager.getInstance().PSRecoveryOpen) {
                return;
            }
            if (PlayerDataManager.nTimeHidSec != 0) {
                PlayerDataManager.nTimeHidSec = PlayerDataManager.nTimeHidSec - PlayerDataManager.nTimeHidSec % 1000;
            }
            this.nPsTimeCountDown -= 1000 + PlayerDataManager.nTimeHidSec;
            PlayerDataManager.nTimeHidSec = 0;
            this.refreshPsRecoveryTimeView(this.nPsTimeCountDown);
        };
        PlayerDataManager.prototype.refreshPsRecoveryTimeView = function (nTime) {
            var nLastTime = nTime;
            nLastTime = nLastTime < 0 ? 0 : nLastTime;
            nLastTime = Math.floor(nLastTime / 1000);
            var nMinTotal = Math.floor(nLastTime / 60);
            var nMinTen = Math.floor(nMinTotal / 10);
            var nSecTotal = nLastTime % 60;
            var nSecTen = Math.floor(nSecTotal / 10);
            var nSecBit = nSecTotal % 10;
            this.strUpDownTime = nMinTen.toString() + nMinTotal.toString() + ":" + nSecTen.toString() + nSecBit.toString();
            EventMgr.getInstance().sendEvent(GameEvent.ON_SP_UPDOWN_TIME);
            if (nTime < 0) {
                this.nPsTimeCountDown = 0;
                GameLogicProcessingManager.getInstance().PSRecoveryOpen = false;
                this.stPlayerDataBase.nPsTime = 0;
                Laya.timer.clear(this, this.refreshPsRecoveryTimeView);
                this.AddGoods(GoodsType.enum_GoodsType_Sp, 1);
                return;
            }
        };
        PlayerDataManager.prototype.getLevelNumMakeOver = function () {
            return this.nMaxLevelCount;
        };
        PlayerDataManager.prototype.initGoods = function () {
            if (!this.bIsNewPlayer) {
                return;
            }
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(15);
            if (stGameConfig) {
                this.stPlayerDataBase.nPS = parseInt(stGameConfig.strValue);
            }
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(16);
            if (stGameConfig) {
                this.stPlayerDataBase.nGlodCount = parseInt(stGameConfig.strValue);
            }
        };
        PlayerDataManager.prototype.isSign = function () {
            var nCurTime = GameLogicProcessingManager.GetCurTime();
            if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, nCurTime)) {
                return false;
            }
            else {
                return true;
            }
        };
        PlayerDataManager.prototype.checkSkinState = function (nSkinID) {
            var nState = SkinState.enum_SkinState_NotOwned;
            if (nSkinID == 1) {
                nState = SkinState.enum_SkinState_Have;
            }
            else if (nSkinID == 2) {
                nState = SkinState.enum_SkinState_NotOwned;
            }
            return nState;
        };
        PlayerDataManager.prototype.recordDyLogIndex = function (nIndex) {
            this.stDYLogData.aryIndex.push(nIndex);
        };
        PlayerDataManager.prototype.checkDyLogIndexrecorded = function (nIndex) {
            for (var i = 0; i < this.stDYLogData.aryIndex.length; ++i) {
                if (nIndex == this.stDYLogData.aryIndex[i]) {
                    return true;
                }
            }
            return false;
        };
        PlayerDataManager.prototype.ttMiniGameArraignmentSpecialOper = function () {
            if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
                this.nMaxLevelCount = this.nMaxLevelCount - 1;
            }
        };
        PlayerDataManager.prototype.allCustomsClearance = function () {
            return this.stNewOperData.nMaxLevelNew == PlayerDataManager.getInstance().nMaxLevelCount;
        };
        PlayerDataManager.prototype.addWatchVideoAddSpTime = function () {
            this.stNewFuncPsLimitless.nCurTime += 1;
            this.stNewFuncPsLimitless.nCurTime = this.stNewFuncPsLimitless.nCurTime > this.stNewFuncPsLimitless.nMaxTime ? this.stNewFuncPsLimitless.nMaxTime : this.stNewFuncPsLimitless.nCurTime;
            if (this.stNewFuncPsLimitless.nCurTime == this.stNewFuncPsLimitless.nMaxTime) {
                EventMgr.getInstance().sendEvent(GameEvent.PS_LIMITLESS);
            }
            this.SaveData();
        };
        PlayerDataManager.prototype.isPsLimitlessState = function () {
            return this.stNewFuncPsLimitless.nCurTime >= this.stNewFuncPsLimitless.nMaxTime;
        };
        PlayerDataManager.prototype.getPsLimitlessStateLastTime = function () {
            return this.stNewFuncPsLimitless.nMaxTime - this.stNewFuncPsLimitless.nCurTime;
        };
        Object.defineProperty(PlayerDataManager.prototype, "pNewFuncPsLimitless", {
            get: function () {
                return this.stNewFuncPsLimitless;
            },
            enumerable: true,
            configurable: true
        });
        PlayerDataManager.prototype.checkIsSpecial = function () {
            return this.stOperData0807.bSpecial;
        };
        PlayerDataManager.bGlobEnterGame = false;
        PlayerDataManager.nTimeHidSec = 0;
        PlayerDataManager.nHidTime = 0;
        return PlayerDataManager;
    }());

    var ConfigManager = (function () {
        function ConfigManager() {
            this.mapDialogBoxIndex = {};
        }
        ConfigManager.getInstance = function () {
            if (!ConfigManager.instance) {
                ConfigManager.instance = new ConfigManager();
            }
            return ConfigManager.instance;
        };
        ConfigManager.prototype.initConfigInfo = function () {
            var self = ConfigManager.instance;
            var subF = "";
            var preF = "resource/assets/config/";
            if (DeviceUtil.isMiniGame()) {
                subF += "?v=" + Math.random();
            }
            return new Promise(function (resolve) {
                var count = 0;
                var len = 5;
                var loadConfigSucc = function () {
                    count++;
                    if (count >= len) {
                        resolve();
                    }
                };
                Laya.loader.load(preF + 'GameConfig.json' + subF, new Laya.Handler(self, function (json) {
                    if (typeof (json) == "string") {
                        self.aryGameConfig = JSON.parse(json);
                    }
                    else {
                        self.aryGameConfig = json;
                    }
                    loadConfigSucc();
                }));
                Laya.loader.load(preF + 'SignConfig.json' + subF, new Laya.Handler(self, function (json) {
                    if (typeof (json) == "string") {
                        self.arySignData = JSON.parse(json);
                    }
                    else {
                        self.arySignData = json;
                    }
                    loadConfigSucc();
                }));
                Laya.loader.load(preF + 'LevelPsInfo.json' + subF, new Laya.Handler(self, function (json) {
                    if (typeof (json) == "string") {
                        self.aryLevelPsData = JSON.parse(json);
                    }
                    else {
                        self.aryLevelPsData = json;
                    }
                    loadConfigSucc();
                }));
                Laya.loader.load(preF + 'DialogBox.json' + subF, new Laya.Handler(self, function (json) {
                    if (typeof (json) == "string") {
                        self.aryDialogBoxIndex = JSON.parse(json);
                    }
                    else {
                        self.aryDialogBoxIndex = json;
                    }
                    var nLen = self.aryDialogBoxIndex.length;
                    for (var i = 0; i < nLen; ++i) {
                        self.mapDialogBoxIndex[self.aryDialogBoxIndex[i].id] = self.aryDialogBoxIndex[i];
                    }
                    loadConfigSucc();
                }));
                Laya.loader.load(preF + 'InviteConfig.json' + subF, new Laya.Handler(self, function (json) {
                    if (typeof (json) == "string") {
                        self.aryInviteConfigIndex = JSON.parse(json);
                    }
                    else {
                        self.aryInviteConfigIndex = json;
                    }
                    loadConfigSucc();
                }));
            });
        };
        ConfigManager.prototype.getInviteConfigInfo = function () {
            return ConfigManager.instance.aryInviteConfigIndex;
        };
        ConfigManager.prototype.getSignDataAll = function () {
            return ConfigManager.instance.arySignData;
        };
        ConfigManager.prototype.getSignDataBySignID = function (nIndex) {
            if (nIndex < 0 || nIndex >= ConfigManager.instance.arySignData.length) {
                return null;
            }
            return ConfigManager.instance.arySignData[nIndex];
        };
        ConfigManager.prototype.getGameConfigDataByID = function (nID) {
            if (nID > ConfigManager.instance.aryGameConfig.length || nID <= 0) {
                return null;
            }
            var nRealID = nID - 1;
            return ConfigManager.instance.aryGameConfig[nRealID];
        };
        ConfigManager.prototype.getTreasureByCurLevel = function () {
            var nRealIndex = PlayerDataManager.getInstance().getCurLevel();
            if (nRealIndex < 0 || ConfigManager.instance.aryLevelPsData.length < 0) {
                return 0;
            }
            nRealIndex = nRealIndex >= ConfigManager.instance.aryLevelPsData.length ? ConfigManager.instance.aryLevelPsData.length - 1 : nRealIndex;
            return ConfigManager.instance.aryLevelPsData[nRealIndex].nPs;
        };
        ConfigManager.prototype.getDialogInfo = function (nDialogID) {
            return ConfigManager.instance.mapDialogBoxIndex[nDialogID];
        };
        return ConfigManager;
    }());

    var InviteManager = (function () {
        function InviteManager() {
            this.URL = GameData.getInstance().URL_OF_INVITE;
            this.inviterInfo = new netData.Inviter();
            this.newPlayer = [];
        }
        InviteManager.getInstance = function () {
            if (!InviteManager.instance_) {
                InviteManager.instance_ = new InviteManager();
            }
            return InviteManager.instance_;
        };
        InviteManager.prototype.selectInfo = function (callF, obj) {
            var _this = this;
            if (callF === void 0) { callF = null; }
            if (obj === void 0) { obj = null; }
            var gameId = GameData.getInstance().gameId;
            var openId = GameData.getInstance().userInfo.openId;
            var msg = {};
            msg.msg_type = "16";
            msg.msg_data = {
                "gameid": gameId,
                "openid": openId
            };
            console.log("查询受邀人列表 ->", msg);
            HttpMgr.getInstance().sendHttp(this.URL, msg, function (e) {
                var code = e["msg_data"]["error_code"];
                if (code == "0") {
                    console.log("查询受邀人列表成功 ->", e);
                    if (e["msg_data"]["index_list"] != "") {
                        var newPlayerTemp = e["msg_data"]["index_list"];
                        if (newPlayerTemp) {
                            _this.newPlayer = newPlayerTemp;
                        }
                        console.log("recvnewplayer = ", _this.newPlayer);
                    }
                }
                else {
                    console.warn("查询受邀人列表失败：", "str");
                }
                if (callF && obj) {
                    callF.call(obj, code);
                }
            }, function (e) { });
        };
        InviteManager.prototype.createInfo = function (callF, obj) {
            if (callF === void 0) { callF = null; }
            if (obj === void 0) { obj = null; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new Promise(function (res, rej) {
                                var inviterOpenId = _this.inviterInfo.openId;
                                var tx_url = GameData.getInstance().userInfo.avatarUrl;
                                var nick = GameData.getInstance().userInfo.nick;
                                var gameId = GameData.getInstance().gameId;
                                var msg = {};
                                msg.msg_type = "14";
                                msg.msg_data = {
                                    "openid": inviterOpenId,
                                    "url": tx_url,
                                    "name": nick,
                                    "gameid": gameId
                                };
                                console.log("关联自己及邀请人 ->", msg, " game id = ", GameData.getInstance().gameId);
                                HttpMgr.getInstance().sendHttp(_this.URL, msg, function (e) {
                                    var code = e["msg_data"]["error_code"];
                                    if (code == "0") {
                                        console.log("关联自己及邀请人成功...");
                                    }
                                    else {
                                        var str = code.toString();
                                        console.warn("关联自己及邀请人失败：", str);
                                    }
                                    if (callF && obj) {
                                        callF.call(obj, code);
                                    }
                                    res();
                                }, function (e) { });
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        InviteManager.prototype.judgeInvite = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var res = GameData.getInstance().enterGameInfo;
                console.log("开始关联邀请人", res);
                console.log("自己信息", GameData.getInstance().userInfo);
                if (res) {
                    var scene = res.scene;
                    if (scene == 1007 || scene == 1008 || scene == 1044) {
                        if (GameData.getInstance().userInfo.openId && res.query && res.query["openid"]) {
                            _this.inviterInfo.nick = res.query["nick"];
                            _this.inviterInfo.openId = res.query["openid"];
                            if (GameData.getInstance().userInfo.openId != _this.inviterInfo.openId) {
                                console.log("关联邀请人", res.query);
                                _this.createInfo();
                            }
                        }
                    }
                    resolve();
                }
                else {
                    resolve();
                }
            });
        };
        InviteManager.prototype.getInviteAwardData = function () {
            var inviteConfig = ConfigManager.getInstance().getInviteConfigInfo();
            var lingqu = PlayerDataManager.getInstance().stPlayerDataBase.inviteId;
            var invitePlayer = this.newPlayer;
            var dataArr = [];
            for (var i = 0, len = inviteConfig.length; i < len; i++) {
                var invite = inviteConfig[i];
                var awardId = invite.ID;
                var canLingqu = false;
                var lingqued = false;
                var player = null;
                if (invitePlayer.length - 1 >= i) {
                    player = invitePlayer[i];
                }
                if (lingqu.indexOf(awardId) > -1)
                    lingqued = true;
                if (player)
                    canLingqu = true;
                var data = new localData.InviteData();
                data.id = awardId;
                data.head = player ? player["url"] : "";
                data.reward = invite.nCount;
                data.lingqued = lingqued;
                data.canLingqu = canLingqu;
                dataArr.push(data);
            }
            return dataArr;
        };
        return InviteManager;
    }());

    var SoundConst = (function () {
        function SoundConst() {
        }
        SoundConst.getKeyUrl = function (key) {
            return SoundConst.perfix + key + SoundConst.sufix;
        };
        SoundConst.Bgm = "bgm";
        SoundConst.Btn_1 = "btn_1";
        SoundConst.perfix = "resource/assets/sounds/";
        SoundConst.sufix = ".mp3";
        return SoundConst;
    }());

    var SoundManager = (function () {
        function SoundManager() {
            this._shakeIsOpen = true;
            this._soundIsOpen = true;
            this.effectPool = {};
            this._musicOpen = true;
            this.isEnterView = false;
            this._bgm = 'bg';
            this._bgvolume = 1;
            this.effectPools = {};
            this.onPlaySoundNum = 0;
            this.effectVolume = 1;
            this._soundOpen = true;
        }
        SoundManager.getInstance = function () {
            if (!SoundManager.instance) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        };
        Object.defineProperty(SoundManager.prototype, "shakeIsOpen", {
            get: function () {
                return this._shakeIsOpen;
            },
            set: function (isOpen) {
                this._shakeIsOpen = isOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "soundIsOpen", {
            get: function () {
                return this._soundIsOpen;
            },
            set: function (isOpen) {
                this._soundIsOpen = isOpen;
                this.musicOpen = isOpen;
                this.soundOpen = isOpen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "musicOpen", {
            get: function () {
                return this._musicOpen;
            },
            set: function (value) {
                this._musicOpen = value;
                if (value) {
                    this.playBgMusic();
                }
                else {
                    this.stopBgMusic();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "bgm", {
            get: function () {
                return this._bgm;
            },
            set: function (bgm) {
                if (!this._bgm || this._bgm != bgm) {
                    this._bgm = bgm;
                    this.playBgMusic();
                }
                else if (this._bgm == bgm) {
                    this.stopBgMusic();
                    this.playBgMusic();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "bgvolume", {
            get: function () {
                return this._bgvolume;
            },
            set: function (value) {
                this.musicChannel && (this.musicChannel.volume = value);
                this._bgvolume = value;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.playBgMusic = function () {
            if (!this.isEnterView) {
                return;
            }
            console.log("playBgm >>>", this._bgm, this.musicOpen);
            if (!this._bgm)
                return;
            if (!this.musicOpen)
                return;
            this.playMusic();
        };
        SoundManager.prototype.playMusic = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _url, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.soundChannel) return [3, 1];
                            this.soundChannel.resume();
                            return [3, 3];
                        case 1:
                            _url = SoundConst.getKeyUrl(this._bgm);
                            console.log("bgm url >>>", _url);
                            _a = this;
                            return [4, Laya.SoundManager.playMusic(_url, 0)];
                        case 2:
                            _a.soundChannel = _b.sent();
                            _b.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        SoundManager.prototype.pauseBgm = function () {
            console.log("pauseBgm >>>");
            this.soundChannel && this.soundChannel.pause();
        };
        SoundManager.prototype.stopBgMusic = function () {
            console.log("stopBgm >>>");
            Laya.SoundManager.stopMusic();
        };
        Object.defineProperty(SoundManager.prototype, "soundOpen", {
            get: function () {
                return this._soundOpen;
            },
            set: function (_soundOpen) {
                this._soundOpen = _soundOpen;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.destoryOneSound = function (soundName) {
            var _url = SoundConst.getKeyUrl(soundName);
            if (DeviceUtil.isMiniGame()) {
                _url = Laya.URL.basePath + _url;
            }
            Laya.loader.clearRes(_url);
            this.effectPool[_url].destroy();
            this.effectPool[_url] = null;
            this.effectPools[_url].destroy();
            this.effectPools[_url] = null;
        };
        SoundManager.prototype.playEffect = function (soundUrl, times) {
            return __awaiter(this, void 0, void 0, function () {
                var _url, sound, soundChannel, soundChannel;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _url = SoundConst.getKeyUrl(soundUrl);
                            if (this._soundOpen == false || !soundUrl || soundUrl == "")
                                return [2];
                            if (DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
                                this.playMiniGameEffect(Laya.URL.basePath + _url);
                                return [2];
                            }
                            sound = this.effectPool[soundUrl];
                            if (!(!sound || !sound.audioBuffer || !sound._disposed)) return [3, 5];
                            return [4, ResUtil.getIntance().getAsyncRESByUrl(_url)];
                        case 1:
                            sound = _a.sent();
                            if (!sound) return [3, 2];
                            this.effectPool[soundUrl] = sound;
                            soundChannel = sound.play(0, times);
                            soundChannel.volume = this.effectVolume;
                            return [3, 4];
                        case 2: return [4, ResUtil.getIntance().getAsyncRESByUrl(_url).then(function () {
                                _this.playEffect(soundUrl, times);
                            })];
                        case 3:
                            _a.sent();
                            return [2];
                        case 4: return [3, 6];
                        case 5:
                            soundChannel = sound.play(0, times);
                            if (soundChannel) {
                                soundChannel.play();
                            }
                            soundChannel.volume = this.effectVolume;
                            _a.label = 6;
                        case 6: return [2];
                    }
                });
            });
        };
        SoundManager.prototype.stopEffect = function (soundUrl) {
            var stLayaSound = this.effectPool[soundUrl];
            if (stLayaSound) {
                stLayaSound.dispose;
            }
        };
        SoundManager.prototype.playMiniGameEffect = function (soundUrl) {
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                var innerAudioContext_1 = this.effectPools[soundUrl];
                if (!innerAudioContext_1) {
                    SoundManager.getInstance().effectPools[soundUrl] = innerAudioContext_1 = platform.createInnerAudioContext();
                    innerAudioContext_1.autoplay = true;
                    innerAudioContext_1.src = soundUrl;
                    innerAudioContext_1.onError(function () {
                        innerAudioContext_1.destroy();
                        SoundManager.getInstance().effectPools[soundUrl] = null;
                    });
                    innerAudioContext_1.onStop(function () {
                        innerAudioContext_1.destroy();
                        SoundManager.getInstance().effectPools[soundUrl] = null;
                    });
                }
                innerAudioContext_1.play();
                return;
            }
            var miniSounds = this.effectPools[soundUrl];
            if (!miniSounds) {
                this.effectPools[soundUrl] = miniSounds = [];
            }
            var miniSound;
            if (miniSounds.length < 1) {
                miniSound = new MiniGameSound();
                miniSound.create(soundUrl);
            }
            else {
                miniSound = miniSounds.shift();
                if (miniSound.isEnded == false) {
                    miniSound = new MiniGameSound();
                    miniSound.create(soundUrl);
                }
                else {
                    miniSound.play();
                }
            }
            this.onPlaySoundNum += 1;
        };
        return SoundManager;
    }());
    var MiniGameSound = (function () {
        function MiniGameSound() {
        }
        MiniGameSound.prototype.create = function (soundUrl) {
            var _this = this;
            this.innerAudioContext = platform.createInnerAudioContext();
            this.innerAudioContext.onEnded(function () {
                _this.isEnded = true;
                SoundManager.getInstance().effectPools[_this.soundUrl].push(_this);
                SoundManager.getInstance().onPlaySoundNum -= 1;
            });
            this.isEnded = false;
            this.soundUrl = soundUrl;
            this.innerAudioContext.src = soundUrl;
            this.innerAudioContext.autoplay = true;
        };
        MiniGameSound.prototype.play = function () {
            this.innerAudioContext.play();
        };
        return MiniGameSound;
    }());

    var AddPsView = (function (_super) {
        __extends(AddPsView, _super);
        function AddPsView() {
            var _this = _super.call(this) || this;
            _this.className_key = "AddPsView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.skin = "game/uiView/AddSpView.json";
            return _this;
        }
        AddPsView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        AddPsView.prototype.onAddStage = function () {
            MiniManeger.instance.showInterstitialAd();
            ViewChangeManager.getInstance().CommonView.removeBtEvent();
            this.initView();
            this.addEvent();
            if (DeviceUtil.isQQMiniGame()) ;
            MiniManeger.instance.showBannerAd();
        };
        AddPsView.prototype.onRemoved = function () {
            this.removeEvent();
            if (DeviceUtil.isQQMiniGame()) ;
            Laya.timer.clearAll(this);
        };
        AddPsView.prototype.initView = function () {
            var _this = this;
            this.refreshPsLimitLessView();
            this.nPsAdd = 5;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(3);
            if (stGameConfig) {
                this.nPsAdd = parseInt(stGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.spNum, this.nPsAdd.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
            this.btn_close.visible = false;
            if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.psViewCloseOpen) {
                AnimationManager.instance.zoomTween(this.imageBtGet, this);
                this.btLable.visible = true;
                Laya.timer.once(2000, this, function () {
                    _this.btn_close.visible = true;
                });
            }
            else {
                this.btLable.visible = false;
                Laya.timer.once(2000, this, function () {
                    _this.btLable.visible = true;
                });
            }
        };
        AddPsView.prototype.addEvent = function () {
            this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
            this.btLable.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_close.on(Laya.Event.CLICK, this, this.onClose);
        };
        AddPsView.prototype.onClick = function () {
            if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.psViewCloseOpen) {
                MiniManeger.instance.playViderAd({});
            }
            else {
                this.onClose();
            }
        };
        AddPsView.prototype.removeEvent = function () {
            this.imageBtGet.on(Laya.Event.CLICK, this, this.addPsWatchVideo);
            this.btLable.off(Laya.Event.CLICK, this, this.onClick);
            this.btn_close.off(Laya.Event.CLICK, this, this.onClose);
        };
        AddPsView.prototype.addPsWatchVideo = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("button", 1);
            this.imageBtGet.off(Laya.Event.CLICK, this, this.addPsWatchVideo);
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    _this.imageBtGet.on(Laya.Event.CLICK, _this, _this.addPsWatchVideo);
                    ViewChangeManager.getInstance().CommonView.addBtEvent();
                    _this.addPsFun();
                },
                failFun: function () {
                    _this.imageBtGet.on(Laya.Event.CLICK, _this, _this.addPsWatchVideo);
                },
                errorFun: function () {
                    _this.imageBtGet.on(Laya.Event.CLICK, _this, _this.addPsWatchVideo);
                }
            });
        };
        AddPsView.prototype.addPsFun = function () {
            if (AddPsView.bCloseBinner)
                MiniManeger.instance.hideBanner();
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Sp, this.nPsAdd);
            PlayerDataManager.getInstance().addWatchVideoAddSpTime();
            this.removeSelf();
        };
        AddPsView.prototype.onClose = function () {
            var _this = this;
            if (AddPsView.bCloseBinner)
                MiniManeger.instance.hideBanner();
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().CommonView.addBtEvent();
            if (DeviceUtil.isTTMiniGame()) {
                if (BaseConst.infos.gameInfo.ttPsClose) {
                    MiniManeger.instance.playViderAd({
                        successFun: function () {
                            _this.removeSelf();
                        }
                    });
                }
                else {
                    this.removeSelf();
                }
            }
            else {
                this.removeSelf();
            }
        };
        AddPsView.prototype.refreshPsLimitLessView = function () {
            var nLen = this.box_up.numChildren > PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime ? PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime : this.box_up.numChildren;
            for (var i = 0; i < nLen; ++i) {
                var pData = this.box_up.getChildAt(i);
                if (pData) {
                    pData.visible = true;
                }
            }
            nLen = this.box_down.numChildren > PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime ? PlayerDataManager.getInstance().pNewFuncPsLimitless.nCurTime : this.box_down.numChildren;
            for (var i = 0; i < nLen; ++i) {
                var pData = this.box_down.getChildAt(i);
                if (pData) {
                    pData.visible = true;
                }
            }
            var nLastCount = PlayerDataManager.getInstance().getPsLimitlessStateLastTime();
            if (nLastCount <= 0) {
                this.box_lable.visible = false;
            }
            else {
                this.lable_number.text = nLastCount.toString();
            }
        };
        AddPsView.bCloseBinner = true;
        return AddPsView;
    }(BaseSceneUISkinPopView));

    var CommonView = (function (_super) {
        __extends(CommonView, _super);
        function CommonView() {
            var _this = _super.call(this) || this;
            _this.className_key = "CommonView";
            _this.skin = "game/uiView/CommonView.json";
            _this.width = 600;
            _this.height = 200;
            return _this;
        }
        CommonView.prototype.onAddStage = function () {
            if (!this.isCreate) {
                return;
            }
            this.addEventUpdateView();
            this.refreshSPValue();
            this.refreshGoldValue();
            this.refreshTimeView();
            this.refreshPsLimitLess();
            if (BaseConst.infos.gameInfo.openPsAward == 1 && DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                this.imageBtGoldAdd.visible = true;
            }
        };
        CommonView.prototype.childrenCreated = function () {
            this.refreshSPValue();
            this.refreshGoldValue();
            this.refreshTimeView();
        };
        CommonView.prototype.onRemoved = function () {
            this.removeEnentUpdateView();
        };
        CommonView.prototype.addEventUpdateView = function () {
            this.sp.on(Laya.Event.CLICK, this, this.openAddSp);
            if (!DeviceUtil.isWXMiniGame()) {
                this.glod.on(Laya.Event.CLICK, this, this.onAddGold);
            }
            EventMgr.getInstance().addEvent(GameEvent.ON_PS_CHANGE, this, this.refreshSPValue);
            EventMgr.getInstance().addEvent(GameEvent.ON_GLOD_CHANGE, this, this.refreshGoldValue);
            EventMgr.getInstance().addEvent(GameEvent.ON_SP_UPDOWN_TIME, this, this.refreshTimeLableInfo);
            EventMgr.getInstance().addEvent(GameEvent.PS_LIMITLESS, this, this.refreshPsLimitLess);
        };
        CommonView.prototype.addBtEvent = function () {
            this.imageBtAttSp.visible = true;
            this.sp && this.sp.on(Laya.Event.CLICK, this, this.openAddSp);
            if (BaseConst.infos.gameInfo.openPsAward == 1 && DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                this.imageBtGoldAdd.visible = true;
                this.glod && this.glod.on(Laya.Event.CLICK, this, this.onAddGold);
            }
        };
        CommonView.prototype.removeBtEvent = function () {
            this.imageBtAttSp.visible = false;
            this.imageBtGoldAdd.visible = false;
            this.sp && this.sp.off(Laya.Event.CLICK, this, this.openAddSp);
            if (DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                this.glod && this.glod.off(Laya.Event.CLICK, this, this.onAddGold);
            }
        };
        CommonView.prototype.onAddGold = function () {
            if (BaseConst.infos.gameInfo.openPsAward == 1 && DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                MiniManeger.instance.playViderAd({
                    successFun: function () {
                        TipsManager.getInstance().showDefaultTips("金币+" + 100);
                        PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, 100);
                    }
                });
            }
        };
        CommonView.prototype.removeEnentUpdateView = function () {
            this.sp.off(Laya.Event.CLICK, this, this.openAddSp);
            this.glod.off(Laya.Event.CLICK, this, this.onAddGold);
            EventMgr.getInstance().removeEvent(GameEvent.ON_PS_CHANGE, this, this.refreshSPValue);
            EventMgr.getInstance().removeEvent(GameEvent.ON_GLOD_CHANGE, this, this.refreshGoldValue);
            EventMgr.getInstance().removeEvent(GameEvent.ON_SP_UPDOWN_TIME, this, this.refreshTimeLableInfo);
            EventMgr.getInstance().removeEvent(GameEvent.PS_LIMITLESS, this, this.refreshPsLimitLess);
        };
        CommonView.prototype.openAddSp = function () {
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["adsp"], function () {
                ViewManager.getInstance().showView(AddPsView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
        };
        CommonView.prototype.refreshSPValue = function () {
            if (!this.isCreate) {
                return;
            }
            if (PlayerDataManager.getInstance().isPsLimitlessState()) {
                return;
            }
            BitmapLabelUtils.setLabel(this.spNum, PlayerDataManager.getInstance().stPlayerDataBase.nPS.toString(), "resource/assets/img/ui/gamehome/maininterface_number1/maininterface_number1_", 0, ".png", "center");
            this.refreshTimeView();
        };
        CommonView.prototype.refreshGoldValue = function () {
            if (!this.isCreate) {
                return;
            }
            BitmapLabelUtils.setLabel(this.glodNum, PlayerDataManager.getInstance().stPlayerDataBase.nGlodCount.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
        };
        CommonView.prototype.refreshTimeView = function () {
            if (PlayerDataManager.getInstance().isPsLimitlessState()) {
                return;
            }
            var nSpTimeMax = 5;
            var stGameData = ConfigManager.getInstance().getGameConfigDataByID(1);
            if (stGameData) {
                nSpTimeMax = parseInt(stGameData.strValue);
            }
            if (nSpTimeMax <= PlayerDataManager.getInstance().stPlayerDataBase.nPS) {
                this.imageSpFull.visible = true;
                this.stLableTime.visible = false;
                this.stLableTime.text = "";
            }
            else {
                this.imageSpFull.visible = false;
                this.stLableTime.visible = true;
            }
        };
        CommonView.prototype.refreshTimeLableInfo = function () {
            if (PlayerDataManager.getInstance().isPsLimitlessState()) {
                return;
            }
            this.imageSpFull.visible = false;
            this.stLableTime.visible = true;
            this.stLableTime.text = PlayerDataManager.getInstance().getSpLastTime();
        };
        CommonView.prototype.refreshPsLimitLess = function () {
            if (!PlayerDataManager.getInstance().isPsLimitlessState()) {
                return;
            }
            this.stLableTime.visible = false;
            this.spNum.visible = false;
            this.imageSpFull.visible = true;
            this.imageSpFull.skin = "resource/assets/img/ui/gamehome/maininterface_word_3.png";
            this.sp.skin = "resource/assets/img/ui/gamehome/maininterface_baseboard_1_2.png";
        };
        return CommonView;
    }(BaseSceneUISkin));

    var GameStateManager = (function () {
        function GameStateManager() {
            this.nLevelState = EnterGameType.enum_EnterGameType_GameHome;
        }
        GameStateManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new GameStateManager();
            }
            return this.instance;
        };
        Object.defineProperty(GameStateManager.prototype, "levelState", {
            get: function () {
                return this.nLevelState;
            },
            set: function (nState) {
                this.nLevelState = nState;
            },
            enumerable: true,
            configurable: true
        });
        return GameStateManager;
    }());

    var BasePopScene = (function (_super) {
        __extends(BasePopScene, _super);
        function BasePopScene(data) {
            var _this = _super.call(this) || this;
            _this.className_key = "BasePopScene";
            _this.viewData_ = data;
            return _this;
        }
        BasePopScene.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            if (this.isCreate) {
                this.initView();
                this.addEvent();
            }
        };
        BasePopScene.prototype.setData = function (data) {
            this.viewData_ = data;
            if (this.isCreate) {
                this.initView();
                this.addEvent();
            }
        };
        BasePopScene.prototype.initView = function () {
        };
        BasePopScene.prototype.addEvent = function () {
        };
        BasePopScene.prototype.removeEvent = function () {
        };
        BasePopScene.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        BasePopScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        return BasePopScene;
    }(BaseSceneUISkinPopView));

    var LotteryPopScene = (function (_super) {
        __extends(LotteryPopScene, _super);
        function LotteryPopScene(data) {
            var _this = _super.call(this, data) || this;
            _this.className_key = "LotteryPopScene";
            _this.viewData_ = data;
            _this.skin = "game/uiView/lottery/LotterPopScene.json";
            return _this;
        }
        LotteryPopScene.prototype.popAward = function () {
            var data = this.viewData_;
            if (data.type == 1) {
                this.icon_title.skin = 'resource/assets/img/ui/qq/lottery/luckyturntable_icon_2.png';
            }
            else {
                this.icon_title.skin = 'resource/assets/img/ui/qq/lottery/luckyturntable_icon_1.png';
            }
            this.img_double.visible = BaseConst.infos.gameInfo.openPsAward == 0;
            if (!this.img_double.visible) {
                BitmapLabelUtils.setLabel(this.box_count, data.count * 2 + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
            }
            else {
                BitmapLabelUtils.setLabel(this.box_count, data.count + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
            }
        };
        LotteryPopScene.prototype.initView = function () {
            this.popAward();
        };
        LotteryPopScene.prototype.addEvent = function () {
            this.btn_rfeceive.on(Laya.Event.CLICK, this, this.onRecieve);
            this.box_double.on(Laya.Event.CLICK, this, this.onSelected);
            this.btn_double.on(Laya.Event.CLICK, this, this.onDoubleRecieve);
        };
        LotteryPopScene.prototype.onSelected = function () {
            this.img_double.visible = !this.img_double.visible;
            if (!this.img_double.visible) {
                BitmapLabelUtils.setLabel(this.box_count, this.viewData_.count * 2 + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
            }
            else {
                BitmapLabelUtils.setLabel(this.box_count, this.viewData_.count + '', "resource/assets/img/ui/qq/lottery/luckyturntable_number/luckyturntable_number_", 0, ".png", "left");
            }
        };
        LotteryPopScene.prototype.removeSelf = function () {
            this.box_count.destroyChildren();
            return _super.prototype.removeSelf.call(this);
        };
        LotteryPopScene.prototype.getAward = function (mul) {
            PlayerDataManager.getInstance().AddGoods(this.viewData_.type, this.viewData_.count * mul);
            this.removeSelf();
        };
        LotteryPopScene.prototype.onRecieve = function () {
            if (!this.img_double.visible) {
                this.onDoubleRecieve();
            }
            else {
                this.getAward(1);
            }
        };
        LotteryPopScene.prototype.onDoubleRecieve = function () {
            var self = this;
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    self.getAward(2);
                }
            });
        };
        LotteryPopScene.prototype.removeEvent = function () {
            this.btn_rfeceive.off(Laya.Event.CLICK, this, this.onRecieve);
            this.box_double.off(Laya.Event.CLICK, this, this.onSelected);
            this.btn_double.off(Laya.Event.CLICK, this, this.onDoubleRecieve);
        };
        return LotteryPopScene;
    }(BasePopScene));

    var LotterySelScene = (function (_super) {
        __extends(LotterySelScene, _super);
        function LotterySelScene(data) {
            var _this = _super.call(this) || this;
            _this.className_key = "LotterySelScene";
            _this.versionRandom = "";
            _this.lotteryData = [
                { "id": "3", "item": "0|0", "des": "再来一次", "worth": "2000" },
                { "id": "4", "item": "2|200", "des": "200金币", "worth": "1000" },
                { "id": "5", "item": "1|6", "des": "6体力", "worth": "500" },
                { "id": "6", "item": "0|0", "des": "感谢参与", "worth": "1500" },
                { "id": "7", "item": "2|150", "des": "150金币", "worth": "1000" },
                { "id": "8", "item": "1|4", "des": "4体力", "worth": "500" },
                { "id": "1", "item": "2|50", "des": "50金币", "worth": "2000" },
                { "id": "2", "item": "1|2", "des": "2体力", "worth": "1500" }
            ];
            _this.isLotterying = false;
            _this.needVideo = false;
            _this.tn = 5;
            _this.totalNum = 8;
            _this.viewData_ = data;
            _this.versionRandom = "?v=" + Date.now();
            _this.skin = 'game/uiView/lottery/LotterySelScene.json';
            return _this;
        }
        LotterySelScene.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            if (this.isCreate) {
                this.initView();
                this.addEvent();
            }
        };
        LotterySelScene.prototype.initView = function () {
            this.checkCanFreeLottery();
            this.initLottery();
        };
        LotterySelScene.prototype.adaptationStage = function () {
        };
        LotterySelScene.prototype.addEvent = function () {
            this.btn_lottery.on(Laya.Event.CLICK, this, this.clickLottery);
        };
        LotterySelScene.prototype.getLotteryConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            Laya.loader.load("resource/assets/config/LotteryConfig.json" + _this.versionRandom, Laya.Handler.create(_this, function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.lotteryData = Utils.copy(data);
                                    resolve(data);
                                    return [2];
                                });
                            }); }));
                        })];
                });
            });
        };
        LotterySelScene.prototype.initLottery = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, len;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getLotteryConfig()];
                        case 1:
                            _a.sent();
                            if (!this.weightArr) {
                                this.weightArr = [];
                                for (i = 0, len = this.lotteryData.length; i < len; i++) {
                                    this.weightArr.push(parseInt(this.lotteryData[i].worth));
                                }
                            }
                            return [2];
                    }
                });
            });
        };
        LotterySelScene.prototype.getRandomByWeightArr = function (oArr) {
            var sum = 0;
            var rand = 0;
            var result = 0;
            for (var i in oArr) {
                sum += Number(oArr[i]);
            }
            for (var i in oArr) {
                rand = Math.floor(Math.random() * sum + 1);
                if (oArr[i] >= rand) {
                    result = Number(i);
                    break;
                }
                else {
                    sum -= oArr[i];
                }
            }
            return result;
        };
        LotterySelScene.prototype.onLottery = function () {
            if (this.isLotterying) {
                return;
            }
            this.isLotterying = true;
            this.noCanTouch();
            var awardIndex = this.getRandomByWeightArr(this.weightArr);
            this.startLottery(awardIndex);
            PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast = Date.now();
            PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount += 1;
            PlayerDataManager.getInstance().SaveData();
        };
        LotterySelScene.prototype.clickLottery = function () {
            var _this = this;
            if (this.needVideo) {
                MiniManeger.instance.playViderAd({
                    successFun: function () {
                        _this.onLottery();
                    }
                });
            }
            else {
                this.onLottery();
            }
        };
        LotterySelScene.prototype.canTouch = function () {
            var sp = ViewManager.getInstance().popLayer;
            sp.mouseEnabled = true;
            sp.mouseThrough = true;
        };
        LotterySelScene.prototype.noCanTouch = function () {
            var sp = ViewManager.getInstance().popLayer;
            sp.mouseEnabled = false;
            sp.mouseThrough = false;
        };
        LotterySelScene.prototype.startLottery = function (index) {
            var _this = this;
            this.img_lottery.rotation = this.img_lottery.rotation % 360;
            var ro = Utils.random(-10, 10);
            Laya.Tween.clearAll(this.img_lottery);
            console.log(index);
            var roa = -index * 360 / this.totalNum - (360 / this.totalNum / 2) + 3600;
            var timeDelay = 1400 * this.tn;
            Laya.Tween.to(this.img_lottery, { rotation: roa }, timeDelay, Laya.Ease.strongInOut, Laya.Handler.create(this, function () {
                Laya.Tween.clearAll(_this.img_lottery);
                _this.isLotterying = false;
                _this.canTouch();
                var data = _this.lotteryData[index];
                _this.checkLottery(data);
            }));
        };
        LotterySelScene.prototype.checkCanFreeLottery = function () {
            var nCurTime = GameLogicProcessingManager.GetCurTime();
            if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast, nCurTime)) {
                if (PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount == 0) {
                    this.img_video.visible = false;
                    this.needVideo = false;
                }
                else {
                    this.needVideo = true;
                    if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.lotteryShowVideoNoIconOpen) {
                        this.img_video.visible = false;
                    }
                    else {
                        this.img_video.visible = true;
                    }
                }
            }
            else {
                this.needVideo = false;
                this.img_video.visible = false;
            }
        };
        LotterySelScene.prototype.checkLottery = function (data) {
            var id = data.id;
            if (id == 3 + '') {
                this.onLottery();
            }
            else if (id == 6 + '') {
                TipsManager.getInstance().showDefaultTips("感谢参与");
            }
            else {
                var arr = data.item.split("|");
                var type = arr[0];
                var count = arr[1];
                ViewManager.getInstance().showView(LotteryPopScene, { type: type, count: count });
            }
            this.checkCanFreeLottery();
        };
        return LotterySelScene;
    }(BaseSceneUISkin));

    var HttpMgr$1 = (function () {
        function HttpMgr() {
            this.printLog = true;
            this.defaultTimeOut = 5000;
        }
        HttpMgr.getInstance = function () {
            if (!HttpMgr.instance_) {
                HttpMgr.instance_ = new HttpMgr();
            }
            return HttpMgr.instance_;
        };
        HttpMgr.prototype.sendHttpTemp = function (url, data, secces, fail, type, responseType) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (secces === void 0) { secces = null; }
            if (fail === void 0) { fail = null; }
            if (type === void 0) { type = "post"; }
            console.log("url ->", url);
            var jsonStr = data ? JSON.stringify(data) : "null";
            if (this.printLog) {
                var date = new Date();
                console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
            }
            var httpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);
            httpRequest.http.timeout = this.defaultTimeOut;
            httpRequest.http.ontimeout = function () {
                console.log('ontimeout');
                if (fail) {
                    fail(null);
                    TipsManager.getInstance().showDefaultTips("网络请求超时！");
                }
                httpRequest.http.ontimeout = null;
                Laya.Pool.recover("HttpRequest", httpRequest);
            };
            httpRequest.once(Laya.Event.COMPLETE, this, function (rev) {
                if (secces) {
                    secces(rev);
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.once(Laya.Event.ERROR, this, function (e) {
                if (_this.printLog) {
                    var date = new Date();
                    console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
                }
                if (fail) {
                    fail(e);
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.send(url, data ? jsonStr : null, type, "text");
        };
        HttpMgr.prototype.sendHttpDY = function (url, data, secces, fail, type, responseType) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (secces === void 0) { secces = null; }
            if (fail === void 0) { fail = null; }
            if (type === void 0) { type = "post"; }
            if (type == "get" && data) {
                url += Utils.querStr(data);
            }
            console.log("url ->", url);
            var jsonStr = data ? JSON.stringify(data) : "null";
            if (this.printLog) {
                var date = new Date();
                console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
            }
            var httpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);
            httpRequest.http.timeout = this.defaultTimeOut;
            httpRequest.http.ontimeout = function () {
                console.log("ontimeout");
                if (fail) {
                    fail(null);
                    TipsManager.getInstance().showDefaultTips("网络请求超时！");
                }
                httpRequest.http.ontimeout = null;
                Laya.Pool.recover("HttpRequest", httpRequest);
            };
            httpRequest.once(Laya.Event.COMPLETE, this, function (rev) {
                if (secces) {
                    secces(JSON.parse(rev));
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.once(Laya.Event.ERROR, this, function (e) {
                if (_this.printLog) {
                    var date = new Date();
                    console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
                }
                if (fail) {
                    fail(e);
                    TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            if (type == "get") {
                httpRequest.send(url);
                return;
            }
            httpRequest.send(url, data ? jsonStr : null, "post", "text");
        };
        HttpMgr.prototype.sendPostHttp = function (url, data, secces, fail, type, showParse) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (secces === void 0) { secces = null; }
            if (fail === void 0) { fail = null; }
            if (type === void 0) { type = "post"; }
            if (showParse === void 0) { showParse = true; }
            console.log("url ->", url);
            var param;
            if (showParse) {
                param = this.getEncodeParam(data);
            }
            param = data;
            var httpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);
            httpRequest.http.timeout = this.defaultTimeOut;
            httpRequest.http.ontimeout = function () {
                console.log('ontimeout');
                if (fail) {
                    fail(null);
                    TipsManager.getInstance().showDefaultTips("网络请求超时！");
                }
                httpRequest.http.ontimeout = null;
                Laya.Pool.recover("HttpRequest", httpRequest);
            };
            httpRequest.once(Laya.Event.COMPLETE, this, function (rev) {
                if (secces) {
                    secces(rev);
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.once(Laya.Event.ERROR, this, function (e) {
                if (_this.printLog) {
                    var date = new Date();
                    console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
                }
                if (fail) {
                    fail(e);
                    TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.send(url, param, type, "json");
        };
        HttpMgr.prototype.sendGetHttp = function (url, data, secces, fail, type, responseType) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (secces === void 0) { secces = null; }
            if (fail === void 0) { fail = null; }
            if (type === void 0) { type = "get"; }
            console.log("url ->", url);
            var jsonStr = data ? JSON.stringify(data) : "null";
            var param = '';
            param = this.getEncodeParam(data);
            if (this.printLog) {
                var date = new Date();
                console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
            }
            var httpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);
            httpRequest.http.timeout = this.defaultTimeOut;
            var httpRequests = httpRequest.http;
            httpRequests.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.http.ontimeout = function () {
                console.log('ontimeout');
                if (fail) {
                    fail(null);
                    TipsManager.getInstance().showDefaultTips("网络请求超时！");
                }
                httpRequest.http.ontimeout = null;
                Laya.Pool.recover("HttpRequest", httpRequest);
            };
            httpRequest.once(Laya.Event.COMPLETE, this, function (rev) {
                if (secces) {
                    secces(JSON.parse(rev));
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.once(Laya.Event.ERROR, this, function (e) {
                if (_this.printLog) {
                    var date = new Date();
                    console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
                }
                if (fail) {
                    fail(e);
                    TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
                }
                Laya.Pool.recover("HttpRequest", httpRequest);
            });
            httpRequest.send(url + param, param, type, "text");
        };
        HttpMgr.prototype.getEncodeParam = function (data) {
            var param = '';
            if (data) {
                if (data instanceof String) {
                    return data;
                }
                var arr = [];
                for (var obj in data) {
                    arr.push(obj + '=' + data[obj]);
                }
                param = arr.join('&');
            }
            return param;
        };
        return HttpMgr;
    }());

    var Utils$1 = (function () {
        function Utils() {
        }
        Utils.objToParams = function (obj) {
            if (obj == null)
                return '';
            var arr = [];
            for (var key in obj) {
                arr.push(key + '=' + obj[key]);
            }
            var str = arr.join('&');
            arr = null;
            return str;
        };
        return Utils;
    }());

    var PlatformDY = (function () {
        function PlatformDY() {
        }
        PlatformDY.prototype.getParams = function () {
            if (DeviceUtil.isWXMiniGame()) ;
            else if (DeviceUtil.isQQMiniGame()) ;
            else if (DeviceUtil.isTTMiniGame()) ;
            return '';
        };
        PlatformDY.getTTOpenidAndAuthorzia = function (obj) {
            var data = Utils$1.objToParams(obj);
            return new Promise(function (resolve) {
                HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=userinfo" + "&", obj, function (rev) {
                    var jsonRev = rev.data;
                    PlatformDY.openid = jsonRev.openid;
                    console.log("DY---> authorzia rev = " + rev);
                    resolve(jsonRev);
                }, null, "get");
            });
        };
        PlatformDY.getOpenidAndAuthorzia = function (obj) {
            return new Promise(function (resolve) {
                HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=userinfo&version=" + PlatformDY.version + "&", obj, function (rev) {
                    var jsonRev = rev.data;
                    PlatformDY.openid = jsonRev.openid;
                    console.log("DY---> authorzia rev = " + rev);
                    resolve(jsonRev);
                }, null, "get");
            });
        };
        PlatformDY.refreshGameList = function () {
            PlatformDY.getGameList().then(function () {
                GameData.getInstance().weCatMiniIconsInfo = [];
                var nLen = 0;
                if (PlatformDY.gameListInfos)
                    nLen = PlatformDY.gameListInfos.length;
                for (var i = 0; i < nLen; ++i) {
                    var stData = new MoreGameIndex();
                    stData.ad_id = PlatformDY.gameListInfos[i].id;
                    stData.ad_img = PlatformDY.gameListInfos[i].img;
                    stData.name = PlatformDY.gameListInfos[i].title;
                    stData.ad_appid = PlatformDY.gameListInfos[i].appid;
                    stData.url = PlatformDY.gameListInfos[i].url;
                    GameData.getInstance().weCatMiniIconsInfo.push(stData);
                }
                console.log("GameData.getInstance().weCatMiniIconsInfo = ", GameData.getInstance().weCatMiniIconsInfo);
            });
        };
        PlatformDY.startGame = function () {
            return new Promise(function (resolve) {
                HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=index&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&", null, function (rev) {
                    var jsonRev = rev.data;
                    console.log("DY---> startGame rev = ", rev);
                    PlatformDY.nGameID = jsonRev.id;
                    resolve(jsonRev);
                }, null, "get");
            });
        };
        PlatformDY.endGame = function (obj) {
            return new Promise(function (resolve) {
                HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=end&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&", obj, function (rev) {
                    var jsonRev = rev.data;
                    console.log("DY---> endGame rev = ", rev);
                    resolve(jsonRev);
                }, null, "get");
            });
        };
        PlatformDY.clickGame = function (id) {
            HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=game&version=" + PlatformDY.version + "&id=" + id + "&openid=" + PlatformDY.openid, null, function (rev) {
                console.log("DY---> clickGame rev = ", rev);
            }, null, "get");
        };
        PlatformDY.toGame = function (id) {
            HttpMgr$1.getInstance().sendHttpDY(PlatformDY.url + "&act=cgame&version=" + PlatformDY.version + "&id=" + id + "&openid=" + PlatformDY.openid, null, function (rev) {
                console.log("DY---> toGame rev = ", rev);
            }, null, "get");
        };
        PlatformDY.delSameFlag = function (arr) {
            if (arr == null)
                return null;
            var len = arr.length;
            var obj = {};
            for (var i = 0; i < len; i++) {
                obj[arr[i].id] = arr[i];
            }
            var newArr = [];
            for (var id in obj) {
                newArr.push(obj[id]);
            }
            return newArr;
        };
        PlatformDY.getGameList = function () {
            return new Promise(function (resolve) {
                var url = PlatformDY.url + "&act=gamelist&version=" + PlatformDY.version + "&openid=" + PlatformDY.openid + "&v=" + Math.random();
                HttpMgr$1.getInstance().sendHttpDY(url, null, function (rev) {
                    console.log("DY---> getGameList rev = ", rev);
                    PlatformDY.bannerInfos = rev.data.banner;
                    PlatformDY.gameListInfos = PlatformDY.delSameFlag(rev.data.gamelist);
                    resolve(rev.data);
                }, null, "get");
            });
        };
        PlatformDY.initBoxView = function (adUnitId) {
            PlatformDY.boxView = platform.createAppBox(adUnitId);
            PlatformDY.boxView.load();
            PlatformDY.boxView.onClose(PlatformDY.boxViewClose);
        };
        PlatformDY.boxViewClose = function () {
            console.log("qq boxView close");
            if (PlatformDY.tempCloseBoxViewCallFunc) {
                PlatformDY.tempCloseBoxViewCallFunc.apply(PlatformDY.tempCloseBoxViewCallObj, PlatformDY.tempCloseBoxViewCallParam);
                PlatformDY.tempCloseBoxViewCallFunc = null;
            }
        };
        PlatformDY.showBoxView = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!PlatformDY.boxView) {
                                console.error("boxView not init!!!!!!!!!");
                            }
                            return [4, PlatformDY.boxView.show()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        PlatformDY.url = "https://zy.qkxz.com/WxApi/?webid=84";
        PlatformDY.qqUrl = "https://qq.xyxapi.com/home/jjxpy/index.php?webid=18";
        PlatformDY.ttUrl = "https://fxqq.xyxapi.com/home/?webid=18";
        PlatformDY.version = 1;
        PlatformDY.miniProgramList = [
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
        PlatformDY.qqMiniProgramList = [
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
        PlatformDY.ttMiniProgramList = [
            "tt82bbf4061d918bed",
            "tte34895f57c628a08",
            "tt73a80515ec8262b2",
            "tta2b2d40f3d98b327",
            "tt6fd51968f0ff74bf",
            "tt8e38f8851112953c",
            "ttb98ccf3126a6a5f4"
        ];
        PlatformDY.nGameID = 0;
        return PlatformDY;
    }());

    var PopBaseScene = (function (_super) {
        __extends(PopBaseScene, _super);
        function PopBaseScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.className_key = 'PopBaseScene';
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;
            _this.eventPool = [];
            return _this;
        }
        PopBaseScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PopBaseScene.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            if (this.isCreate) {
                this.initView();
                this.addEvent();
                this.initMiniGame();
            }
            this.off(Laya.Event.ADDED, this, this.onAddStage);
        };
        PopBaseScene.prototype.initMiniGame = function () {
            this.showBanner({ className_key: this.className_key });
        };
        PopBaseScene.prototype.setData = function (data) {
            this.viewData_ = data;
            if (this.isCreate) {
                this.initMiniGame();
                this.initView();
                this.addEvent();
                this.showEnterAnimation();
            }
        };
        PopBaseScene.prototype.initView = function () { };
        PopBaseScene.prototype.addEvent = function () { };
        PopBaseScene.prototype.removeSelf = function () {
            var node = _super.prototype.removeSelf.call(this);
            return node;
        };
        PopBaseScene.prototype.registerEvent = function (target, type, callback, callbackobj) {
            target.on(type, callbackobj, callback);
            this.eventPool.push({ target: target, type: type, callback: callback, callbackobj: callbackobj });
        };
        PopBaseScene.prototype.clearEvent = function () {
            var eventPool = this.eventPool;
            if (eventPool.length > 0) {
                for (var i = 0; i < this.eventPool.length; i++) {
                    var target = eventPool[i].target;
                    var type = eventPool[i].type;
                    var callback = eventPool[i].callback;
                    var callbackobj = eventPool[i].callbackobj;
                    if (target) {
                        target.off(type, callbackobj, callback);
                    }
                }
            }
            eventPool = [];
        };
        PopBaseScene.prototype.onDisable = function () {
            this.removeEvent();
        };
        PopBaseScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.clearEvent();
        };
        PopBaseScene.prototype.removeEvent = function () {
            this.clearEvent();
        };
        PopBaseScene.prototype.showBanner = function (data) {
            MiniManeger.instance.showBannerAd();
        };
        PopBaseScene.prototype.destoryBanner = function () {
            MiniManeger.instance.hideBanner();
        };
        PopBaseScene.prototype.hideBanner = function () {
            MiniManeger.instance.hideBanner();
        };
        return PopBaseScene;
    }(BaseSceneUISkinPopView));

    var MoreGameItemView = (function (_super) {
        __extends(MoreGameItemView, _super);
        function MoreGameItemView() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameItemView";
            _this.index = 0;
            _this.skin = "game/uiView/wecat/MoreGameItemView.json";
            _this.width = 1080;
            _this.height = 200;
            return _this;
        }
        MoreGameItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MoreGameItemView.prototype.adaptationStage = function () {
        };
        MoreGameItemView.prototype.onAddStage = function () {
            if (this.isCreate) {
                this.init();
                this.addEvent();
            }
        };
        MoreGameItemView.prototype.setData = function (data) {
            this.data = data;
        };
        MoreGameItemView.prototype.refreshData = function (data) {
            this.setData(data);
            this.init();
        };
        MoreGameItemView.prototype.onGogame = function () {
            if (DeviceUtil.isWXMiniGame()) {
                if (BaseConst.infos.gameInfo.isDY) {
                    PlatformDY.clickGame(this.data.ad_id);
                }
                var self_1 = this;
                var data = {
                    appId: this.data.ad_appid,
                    path: this.data.url,
                    success: function () {
                        console.log("navigateToMiniProgram success!");
                        if (BaseConst.infos.gameInfo.isDY) {
                            console.log("self.nIndex = ", self_1.data);
                            PlatformDY.toGame(self_1.data.ad_id);
                        }
                    },
                    fail: function (e) {
                        console.log("navigateToMiniProgram fail e =", e);
                        MoreGameRandomGameBox713Temp.bSpecial = true;
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                    }
                };
                platform.navigateToMiniProgram(data);
            }
        };
        MoreGameItemView.prototype.addEvent = function () {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onGogame);
        };
        MoreGameItemView.prototype.init = function () {
            this.titleLabel.text = this.data.name;
            this.headiconImg.skin = this.data.ad_img;
            this.desLabel.text = Math.ceil(Math.random() * 100000) + '人正在玩';
            this.baokuanImg.visible = Math.random() > 0.5 ? true : false;
        };
        MoreGameItemView.prototype.removeEvent = function () {
            this.off(Laya.Event.MOUSE_DOWN, this, this.onGogame);
        };
        MoreGameItemView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        return MoreGameItemView;
    }(BaseSceneUISkin));

    var MoreGameViewTemp = (function (_super) {
        __extends(MoreGameViewTemp, _super);
        function MoreGameViewTemp() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameViewTemp";
            _this.ITEM_H = 200;
            _this.isAuto = true;
            _this.dataArr = [{ t: 0 }, { t: 1 }, { t: 2 }, { t: 3 }];
            _this.speed = 2;
            _this.dir = -1;
            _this.skin = "game/uiView/wecat/MoreGameView.json";
            return _this;
        }
        MoreGameViewTemp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MoreGameViewTemp.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MoreGameViewTemp.prototype.onAddStage = function () {
            this.initView();
            this.addEvent();
            MiniManeger.instance.hideBanner();
            MiniManeger.instance.bFlagSpecialView = false;
            ViewChangeManager.getInstance().hideImageExitTemp();
        };
        MoreGameViewTemp.prototype.onRemoved = function () {
            this.removeEvent();
            this.stPanel.removeChildren();
            Laya.timer.clearAll(this);
            ViewChangeManager.getInstance().showImageExitTemp();
        };
        MoreGameViewTemp.prototype.addEvent = function () {
            this.stPanel.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.stPanel.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.stPanel.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.image_back.on(Laya.Event.CLICK, this, this.onBack);
        };
        MoreGameViewTemp.prototype.removeEvent = function () {
            this.stPanel.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.stPanel.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.stPanel.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.image_back.off(Laya.Event.CLICK, this, this.onBack);
        };
        MoreGameViewTemp.prototype.onBack = function () {
            this.removeSelf();
            MiniManeger.instance.bFlagSpecialView = true;
        };
        MoreGameViewTemp.prototype.mouseDown = function (e) {
            this.isAuto = false;
            this.stx = e.stageX;
            this.sty = e.stageY;
        };
        MoreGameViewTemp.prototype.mouseMove = function (e) {
            var dy = e.stageY - this.sty;
            for (var i = 0; i < this.stPanel.numChildren; i++) {
                var item = this.stPanel.getChildAt(i);
                item.y += dy;
            }
            this.sty = e.stageY;
            this.dir = dy > 0 ? 1 : -1;
            this.refresh();
        };
        MoreGameViewTemp.prototype.mouseUp = function (e) {
            this.isAuto = true;
            this.dir = -1;
        };
        MoreGameViewTemp.prototype.initView = function () {
            Laya.timer.frameLoop(1, this, this.updata);
            var canuseHeight = Laya.stage.height - 280;
            this.maxCount = Math.ceil(canuseHeight / this.ITEM_H);
            this.dataArr = GameData.getInstance().weCatMiniIconsInfo;
            console.log(GameData.getInstance().weCatMiniIconsInfo);
            var didnex = 0;
            for (var i = 0; i < this.maxCount + 1; i++) {
                var item = new MoreGameItemView();
                item.index = didnex;
                item.setData(this.dataArr[item.index]);
                didnex++;
                if (didnex >= this.dataArr.length) {
                    didnex = 0;
                }
                item.y = i * this.ITEM_H;
                this.stPanel.addChild(item);
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
        };
        MoreGameViewTemp.prototype.getUpIndexforCurIndex = function (index) {
            if (index >= this.dataArr.length || index < 0)
                return 0;
            return index - 1 >= 0 ? index - 1 : this.dataArr.length - 1;
        };
        MoreGameViewTemp.prototype.getDownIndexforCurIndex = function (index) {
            if (index >= this.dataArr.length || index < 0)
                return 0;
            return index + 1 < this.dataArr.length ? index + 1 : 0;
        };
        MoreGameViewTemp.prototype.updata = function (dt) {
            if (!this.isAuto)
                return;
            for (var i = 0; i < this.stPanel.numChildren; i++) {
                var item = this.stPanel.getChildAt(i);
                item.y += this.speed * this.dir;
            }
            this.refresh();
        };
        MoreGameViewTemp.prototype.refresh = function () {
            var startItem;
            var lastItem;
            startItem = this.stPanel.getChildAt(0);
            lastItem = this.stPanel.getChildAt(this.maxCount);
            if (this.dir == -1) {
                if (startItem.y < -this.ITEM_H) {
                    startItem.y = lastItem.y + lastItem.height;
                    startItem.zOrder = lastItem.zOrder + 1;
                    startItem.index = this.getDownIndexforCurIndex(lastItem.index);
                    startItem.refreshData(this.dataArr[startItem.index]);
                    console.log('idnex-=======>', startItem.index);
                }
            }
            else {
                if (lastItem.y > this.maxCount * this.ITEM_H) {
                    lastItem.y = startItem.y - startItem.height;
                    lastItem.zOrder = startItem.zOrder - 1;
                    lastItem.index = this.getUpIndexforCurIndex(startItem.index);
                    lastItem.refreshData(this.dataArr[lastItem.index]);
                }
            }
        };
        return MoreGameViewTemp;
    }(BaseSceneUISkinPopView));

    var SuccessfulEntryThreeView = (function (_super) {
        __extends(SuccessfulEntryThreeView, _super);
        function SuccessfulEntryThreeView() {
            var _this = _super.call(this) || this;
            _this.className_key = "SuccessfulEntryThreeView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.wxShareShowMoreGame = false;
            _this.isShowBox = false;
            _this.nBtNextLevel = 360;
            _this.nBtNextLevelSp = 50;
            _this.nGlodAdd = 50;
            _this.nGlodRadio = 4;
            _this.bIsRunning = false;
            _this.bRecvAward = false;
            _this.skin = 'game/uiView/SuccessfulEntryThreeView.json';
            return _this;
        }
        SuccessfulEntryThreeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.grp_center.width = this.width;
            this.grp_center.height = this.height;
            this.imageWeCatMoreGame.height = (this.height - this.imageWeCatMoreGame.y - (1920 - this.imageWeCatMoreGame.y - this.imageWeCatMoreGame.height));
            this.panelWeCatMoreGame.height = this.imageWeCatMoreGame.height - 110;
        };
        SuccessfulEntryThreeView.prototype.onAddStage = function () {
            this.wxShareShowMoreGame = false;
            AddPsView.bCloseBinner = false;
            ViewChangeManager.getInstance().CommonView.addBtEvent();
            this.initView();
            this.addEvent();
            this.isShowBox = false;
            MiniManeger.instance.showBannerAd();
            MiniManeger.instance.showInterstitialAd();
        };
        SuccessfulEntryThreeView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            MiniManeger.instance.hideBlockAd();
            this.removeEvent();
            this.bIsRunning = false;
            Laya.Tween.clearAll(this.imageBtShare);
            Laya.timer.clearAll(this);
            if (this.aniReal) {
                this.aniReal.stop();
                this.aniReal.removeSelf();
            }
        };
        SuccessfulEntryThreeView.prototype.initPanel = function () {
            if (!DeviceUtil.isWXMiniGame() && !BaseConst.infos.gameInfo.isDY) {
                this.panelWeCatMoreGame.vScrollBarSkin = "";
                this.panelWeCatMoreGame.elasticEnabled = true;
                this.panelWeCatMoreGame.vScrollBar.elasticDistance = 200;
                this.panelWeCatMoreGame.vScrollBar.elasticBackTime = 100;
            }
        };
        SuccessfulEntryThreeView.prototype.initView = function () {
            var _this = this;
            this.initPanel();
            this.proceMoreGame();
            MiniManeger.instance.onShareVideoSuccess = false;
            this.initPlView();
            SoundManager.getInstance().playEffect("win", 1);
            this.bRecvAward = false;
            if (!this.aniReal) {
                this.createSkeleton("resource/assets/img/ani/celebrate/celebrate.sk");
            }
            else {
                this.aniReal.play(0, false);
                this.grp_center.addChild(this.aniReal);
            }
            if (BaseConst.infos.gameInfo.double && BaseConst.infos.gameInfo.double == 1) {
                this.spDouble.visible = true;
            }
            else {
                this.spDouble.visible = false;
            }
            if (DeviceUtil.isQQMiniGame()) {
                if (Math.random() < BaseConst.infos.gameInfo.siginC) {
                    this.spDouble.visible = true;
                }
                else {
                    this.spDouble.visible = false;
                }
            }
            this.bIsRunning = true;
            var pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(12);
            if (pGameConfig) {
                this.nGlodAdd = parseInt(pGameConfig.strValue);
            }
            pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(13);
            if (pGameConfig) {
                this.nGlodRadio = parseInt(pGameConfig.strValue);
                this.lableDesc.text = pGameConfig.strDesc;
            }
            BitmapLabelUtils.setLabel(this.spCost, this.nGlodRadio.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
            var nCost = 1;
            pGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (pGameConfig) {
                nCost = parseInt(pGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.spCostPs, nCost.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
            var bAddMore = this.nGlodAdd * this.nGlodRadio;
            BitmapLabelUtils.setLabel(this.spCountAddMore, bAddMore.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
            if (DeviceUtil.isWXMiniGame()) {
                this.spDouble.visible = false;
            }
            if (this.spDouble.visible) {
                var nReal = this.nGlodAdd * this.nGlodRadio;
                BitmapLabelUtils.setLabel(this.spGlodAdd, nReal.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
            }
            else {
                BitmapLabelUtils.setLabel(this.spGlodAdd, this.nGlodAdd.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
            }
            this.startSuccessImageBtShareAni();
            if (DeviceUtil.isQQMiniGame()) {
                GameManager.instance.selAddLottery(this.box_content);
            }
            if (DeviceUtil.isTTMiniGame()) {
                this.box_double.bottom = Laya.stage.height - (this.box_award.y + 120);
                this.box_double.scale(0.8, 0.8);
            }
            GameManager.instance.openLevelVideo(function () {
                GameManager.instance.selAddLottery(_this.box_content);
            });
        };
        SuccessfulEntryThreeView.prototype.addEvent = function () {
            this.btLable.on(Laya.Event.CLICK, this, this.successfulEntryThreeNextLevel);
            this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
            this.imageBtShare.on(Laya.Event.CLICK, this, this.successShareGame);
            this.imageBtRestart.on(Laya.Event.CLICK, this, this.successReStart);
            this.imageRecv.on(Laya.Event.CLICK, this, this.successRecvAward);
            this.btDouble.on(Laya.Event.CLICK, this, this.onDoubleGlod);
            this.btNextLevel.on(Laya.Event.CLICK, this, this.weCatGotoNextLevel);
            if (DeviceUtil.isQQMiniGame()) {
                EventMgr.getInstance().addEvent("SuccBlockShow", this, this.showBlockAd);
            }
        };
        SuccessfulEntryThreeView.prototype.removeEvent = function () {
            this.btLable.off(Laya.Event.CLICK, this, this.successfulEntryThreeNextLevel);
            this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
            this.imageBtShare.off(Laya.Event.CLICK, this, this.successShareGame);
            this.imageBtRestart.off(Laya.Event.CLICK, this, this.successReStart);
            this.imageRecv.off(Laya.Event.CLICK, this, this.successRecvAward);
            this.btDouble.off(Laya.Event.CLICK, this, this.onDoubleGlod);
            if (DeviceUtil.isQQMiniGame()) {
                EventMgr.getInstance().removeEvent("SuccBlockShow", this, this.showBlockAd);
            }
        };
        SuccessfulEntryThreeView.prototype.onDoubleGlod = function () {
            SoundManager.getInstance().playEffect("button", 1);
            this.spDouble.visible = !this.spDouble.visible;
            if (this.spDouble.visible) {
                var nReal = this.nGlodAdd * this.nGlodRadio;
                BitmapLabelUtils.setLabel(this.spGlodAdd, nReal.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
            }
            else {
                BitmapLabelUtils.setLabel(this.spGlodAdd, this.nGlodAdd.toString(), "resource/assets/img/ui/success/succeed_number1/succeed_number1_", 0, ".png", "left");
            }
        };
        SuccessfulEntryThreeView.prototype.successShareGame = function () {
            SoundManager.getInstance().playEffect("button", 1);
            MiniManeger.instance.bFlagDouYin = false;
            MiniManeger.instance.shareAppMessage();
        };
        SuccessfulEntryThreeView.prototype.showBlockAd = function (isShow) {
            if (isShow) {
                MiniManeger.instance.showBlockAd();
            }
            else {
                MiniManeger.instance.hideBlockAd();
            }
        };
        SuccessfulEntryThreeView.prototype.successReStart = function () {
            SoundManager.getInstance().playEffect("button", 1);
            var nSpCost = 1;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nSpCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (!b) {
                TipsManager.getInstance().showDefaultTips("体力不足");
                ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], function () {
                    ViewManager.getInstance().showView(AddPsView);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                });
                return;
            }
            PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            ViewChangeManager.getInstance().restartGame(true);
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        SuccessfulEntryThreeView.prototype.successRecvAward = function () {
            var _this = this;
            var self = this;
            SoundManager.getInstance().playEffect("button", 1);
            if (DeviceUtil.isQQMiniGame() && !self.isShowBox && Math.random() < BaseConst.infos.gameInfo.succShowBox) {
                MiniManeger.instance.hideBlockAd();
                MiniManeger.instance.showBoxAd(function () {
                    self.isShowBox = true;
                    MiniManeger.instance.showBlockAd();
                });
                return;
            }
            if (this.bRecvAward) {
                this.successfulEntryThreeNextLevel();
                return;
            }
            if (this.spDouble.visible) {
                this.imageRecv.off(Laya.Event.CLICK, this, this.successRecvAward);
                MiniManeger.instance.playViderAd({
                    successFun: function () {
                        _this.sendAwardAfterWatchVideo();
                        _this.imageRecv.on(Laya.Event.CLICK, _this, _this.successRecvAward);
                    },
                    failFun: function () {
                        _this.imageRecv.on(Laya.Event.CLICK, _this, _this.successRecvAward);
                    },
                    errorFun: function () {
                        _this.imageRecv.on(Laya.Event.CLICK, _this, _this.successRecvAward);
                    }
                });
            }
            else {
                this.nGlodRadio = 1;
                this.sendAwardAfterWatchVideo();
            }
        };
        SuccessfulEntryThreeView.prototype.sendAwardAfterWatchVideo = function () {
            this.bRecvAward = true;
            this.flayGlodSuccess();
            var nGlodAddTemp = this.nGlodAdd * this.nGlodRadio;
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodAddTemp);
            this.successfulEntryThreeNextLevel();
        };
        SuccessfulEntryThreeView.prototype.successfulEntryThreeNextLevel = function () {
            var nSpCost = 1;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nSpCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (!b) {
                TipsManager.getInstance().showDefaultTips("体力不足");
                ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], function () {
                    ViewManager.getInstance().showView(AddPsView);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                });
                return;
            }
            else {
                this.removeEvent();
                if (DeviceUtil.isWXMiniGame()) {
                    if (!this.bRecvAward) ;
                }
                else {
                    PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                    ViewChangeManager.getInstance().goToNextLevel();
                    MiniManeger.instance.bFlagSpecialView = true;
                    this.removeSelf();
                }
            }
        };
        SuccessfulEntryThreeView.prototype.returnToGameHome = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (DeviceUtil.isWXMiniGame()) {
                if (PlayerDataManager.getInstance().bIsNewPlayer || BaseConst.infos.gameInfo.openPsAward == 0 ||
                    BaseConst.infos.gameInfo.glodegg == 0) {
                    MoreGameRandomGameBox713.toHome = true;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                    MiniManeger.instance.bFlagSpecialView = true;
                    this.removeSelf();
                    return;
                }
            }
            ViewChangeManager.getInstance().CurLevelBase.closeGameView();
            PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
            LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getCurLevelToChallenge());
            AddPsView.bCloseBinner = false;
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        SuccessfulEntryThreeView.prototype.startSuccessImageBtShareAni = function () {
            var _this = this;
            if (!this.bIsRunning) {
                return;
            }
            Laya.Tween.clearAll(this.imageBtShare);
            Laya.Tween.to(this.imageBtShare, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageBtShare, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startSuccessImageBtShareAni);
                }));
            }));
        };
        SuccessfulEntryThreeView.prototype.flayGlodSuccess = function () {
            var stPoint = new Laya.Point();
            stPoint.x = this.imageGoodsTypeUp.x;
            stPoint.y = this.imageGoodsTypeUp.y;
            var stBoxParent = this.imageGoodsTypeUp.parent;
            stPoint = stBoxParent.localToGlobal(stPoint);
            AnimationManager.instance.flayGlod(stPoint.x, stPoint.y, 341, 105);
        };
        SuccessfulEntryThreeView.prototype.createSkeleton = function (url) {
            var _this = this;
            return new Promise(function (resolve) {
                AnimationManager.instance.showSkeletonAnimation(url, function (boomAnimation) {
                    _this.aniReal = boomAnimation;
                    _this.aniReal.player.playbackRate = 1;
                    _this.aniReal.autoSize = true;
                    _this.aniReal.scale(1, 1);
                    _this.aniReal.play(0, false);
                    _this.aniReal.x = _this.grp_center.width / 2;
                    _this.aniReal.y = _this.grp_center.height / 2;
                    _this.grp_center.addChild(_this.aniReal);
                    resolve(boomAnimation);
                }, 1);
            });
        };
        SuccessfulEntryThreeView.prototype.initPlView = function () {
            if (DeviceUtil.isTTMiniGame()) {
                this.imageShareGameName.skin = "resource/assets/img/ui/success/failure_word_2.png";
                this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
                this.shareGlodCount.visible = false;
                this.ttGoodsType.visible = false;
                this.ttSpecial.visible = false;
                this.imageShareGameName.y = 38;
                this.imageShareGameName.right = 30;
                this.imageShareIcon.left = 30;
            }
            else {
                this.imageShareGameName.skin = "resource/assets/img/ui/success/failure_word_2.png";
                this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
                this.shareGlodCount.visible = false;
                this.ttGoodsType.visible = false;
                this.ttSpecial.visible = false;
                this.imageShareGameName.y = 38;
                this.imageShareGameName.right = 30;
                this.imageShareIcon.left = 30;
            }
        };
        SuccessfulEntryThreeView.prototype.flayGlodRecv = function () {
            console.log("flayGlodRecv");
            var pPoint = new Laya.Point();
            pPoint.x = this.ttGoodsType.x;
            pPoint.y = this.ttGoodsType.y;
            var stParent = this.ttGoodsType.parent;
            pPoint = stParent.localToGlobal(pPoint);
            AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
        };
        SuccessfulEntryThreeView.prototype.proceMoreGame = function () {
            if (DeviceUtil.isWXMiniGame()) {
                this.initPl();
            }
        };
        SuccessfulEntryThreeView.prototype.initPl = function () {
            if (DeviceUtil.isWXMiniGame()) {
                this.box_wecat.visible = true;
                this.box_wecat.removeChildren();
                this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView());
                this.box_double.visible = false;
                this.btNextLevel.visible = true;
                this.imageBtShare.visible = false;
                this.imageRecv.visible = false;
                this.imageWeCatMoreGame.visible = false;
                this.imageRecv.bottom = 400;
                this.imageBtShare.bottom = 400;
                if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                    this.btNextLevel.bottom = this.nBtNextLevelSp;
                    MiniManeger.instance.bFlagSpecialView = false;
                    MiniManeger.instance.hideBanner();
                    return;
                }
                else {
                    this.btNextLevel.bottom = this.nBtNextLevel;
                }
            }
            MiniManeger.instance.showBannerAd();
        };
        SuccessfulEntryThreeView.prototype.weCatGotoNextLevel = function () {
            SoundManager.getInstance().playEffect("button", 1);
            this.bRecvAward = true;
            this.flayGlodSuccess();
            this.nGlodRadio = 1;
            var nGlodAddTemp = this.nGlodAdd * this.nGlodRadio;
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodAddTemp);
            var numCost = 1;
            var bln = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, numCost);
            if (!bln) {
                ViewChangeManager.getInstance().onPowerNotEnough();
                return;
            }
            else {
                this.removeEvent();
                if (LevelManager.getInstance().nCurLevel == 1) {
                    MoreGameRandomGameBox713.bGotoNextGame = true;
                }
                else if (LevelManager.getInstance().nCurLevel >= 2) {
                    MoreGameRandomGameBox713.bGotoNextGame = true;
                    MoreGameRandomGameBox713.bEnterHotBox = true;
                }
                ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                MiniManeger.instance.bFlagSpecialView = true;
                this.removeSelf();
            }
        };
        return SuccessfulEntryThreeView;
    }(BaseSceneUISkinPopView));

    var BaseUIScene = (function (_super) {
        __extends(BaseUIScene, _super);
        function BaseUIScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.className_key = "BaseUIScene";
            _this.eventPool = [];
            return _this;
        }
        BaseUIScene.prototype.registerEvent = function (target, type, callback, callbackobj) {
            target.on(type, callbackobj, callback);
            this.eventPool.push({ target: target, type: type, callback: callback, callbackobj: callbackobj });
        };
        BaseUIScene.prototype.clearEvent = function () {
            var eventPool = this.eventPool;
            if (eventPool.length > 0) {
                for (var i = 0; i < this.eventPool.length; i++) {
                    var target = eventPool[i].target;
                    var type = eventPool[i].type;
                    var callback = eventPool[i].callback;
                    var callbackobj = eventPool[i].callbackobj;
                    if (target) {
                        target.off(type, callbackobj, callback);
                    }
                }
            }
            eventPool = [];
        };
        BaseUIScene.prototype.onDisable = function () {
            this.removeEvent();
        };
        BaseUIScene.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        BaseUIScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.clearEvent();
        };
        BaseUIScene.prototype.removeEvent = function () {
            this.clearEvent();
        };
        BaseUIScene.prototype.initView = function () {
        };
        BaseUIScene.prototype.addEvent = function () {
        };
        return BaseUIScene;
    }(BaseSceneUISkin));

    var WeCatMoreGameItemOne = (function (_super) {
        __extends(WeCatMoreGameItemOne, _super);
        function WeCatMoreGameItemOne(data) {
            var _this = _super.call(this) || this;
            _this.className_key = "WeCatMoreGameItemOne";
            _this._nIndex = data;
            _this.skin = "game/uiView/wecat/WeCatMoreGameItemOne.json";
            _this.width = 200;
            _this.height = 240;
            return _this;
        }
        WeCatMoreGameItemOne.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
        };
        WeCatMoreGameItemOne.prototype.onRemoved = function () {
            this.removeEvent();
        };
        WeCatMoreGameItemOne.prototype.setData = function (data) {
            this._nIndex = data;
            this.initView();
        };
        WeCatMoreGameItemOne.prototype.initView = function () {
            if (this._nIndex < 0 || this._nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
                this._nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
                if (this._nIndex < 0)
                    return;
            }
            this.labGameName.text = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].name;
            this.imgIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this._nIndex].ad_img;
        };
        WeCatMoreGameItemOne.prototype.addEvent = function () {
            if (!DeviceUtil.isTTMiniGame()) {
                this.on(Laya.Event.CLICK, this, this.gotoGameDuYou);
            }
        };
        WeCatMoreGameItemOne.prototype.removeEvent = function () {
            this.off(Laya.Event.CLICK, this, this.gotoGameDuYou);
        };
        WeCatMoreGameItemOne.prototype.gotoGameDuYou = function () {
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
                GameManager.instance.goToDuyou(this._nIndex);
            }
        };
        return WeCatMoreGameItemOne;
    }(BaseUIScene));

    var FailEntryTwoView = (function (_super) {
        __extends(FailEntryTwoView, _super);
        function FailEntryTwoView() {
            var _this = _super.call(this) || this;
            _this.className_key = "FailEntryTwoView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.wxShareShowMoreGame = false;
            _this.scrollSizeMax = 50;
            _this.nTimePanel = 5000;
            _this.nBtNextLevel = 360;
            _this.nBtNextLevelSp = 50;
            _this.nGlodAddByWathcVideo = 200;
            _this.bIsRunning = false;
            _this.bRecvAward = false;
            _this.bShareAward = false;
            _this.skin = 'game/uiView/FailEntryTwoView.json';
            return _this;
        }
        FailEntryTwoView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.grp_center.width = this.width;
            this.grp_center.height = this.height;
            this.imageWeCatMoreGame.height = (this.height - this.imageWeCatMoreGame.y - (1920 - this.imageWeCatMoreGame.y - this.imageWeCatMoreGame.height));
            this.panelWeCatMoreGame.height = this.imageWeCatMoreGame.height - 110;
        };
        FailEntryTwoView.prototype.onAddStage = function () {
            this.wxShareShowMoreGame = false;
            AddPsView.bCloseBinner = false;
            ViewChangeManager.getInstance().CommonView.addBtEvent();
            MiniManeger.instance.showInterstitialAd();
            this.initView();
            this.addEvent();
            MiniManeger.instance.showBannerAd();
        };
        FailEntryTwoView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.bIsRunning = false;
            this.bRecvAward = false;
            Laya.Tween.clearAll(this.imageBtShare);
            Laya.timer.clearAll(this);
        };
        FailEntryTwoView.prototype.addEvent = function () {
            this.imageBtRestart.on(Laya.Event.CLICK, this, this.failEntryTwoReStartGame);
            this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
            this.imageBtShare.on(Laya.Event.CLICK, this, this.failSharGame);
            this.imageRecv.on(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
            EventMgr.getInstance().addEvent(GameEvent.EVENT_FLAY_GLOD, this, this.flayGlodFileShare);
            if (DeviceUtil.isTTMiniGame()) {
                this.panelWeCatMoreGame.on(Laya.Event.CLICK, this, this.onShowMoreGame);
            }
            if (DeviceUtil.isQQMiniGame()) {
                EventMgr.getInstance().addEvent("SuccBlockShow", this, this.showBlockAd);
            }
        };
        FailEntryTwoView.prototype.removeEvent = function () {
            this.imageBtRestart.off(Laya.Event.CLICK, this, this.failEntryTwoReStartGame);
            this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
            this.imageBtShare.off(Laya.Event.CLICK, this, this.failSharGame);
            this.imageRecv.off(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
            EventMgr.getInstance().removeEvent(GameEvent.EVENT_FLAY_GLOD, this, this.flayGlodFileShare);
            if (DeviceUtil.isTTMiniGame()) {
                this.panelWeCatMoreGame.off(Laya.Event.CLICK, this, this.onShowMoreGame);
            }
            if (DeviceUtil.isQQMiniGame()) {
                EventMgr.getInstance().removeEvent("SuccBlockShow", this, this.showBlockAd);
            }
        };
        FailEntryTwoView.prototype.showBlockAd = function (isShow) {
            if (isShow) {
                MiniManeger.instance.showBlockAd();
            }
            else {
                MiniManeger.instance.hideBlockAd();
            }
        };
        FailEntryTwoView.prototype.failSharGame = function () {
            var _this = this;
            var self = this;
            SoundManager.getInstance().playEffect("button", 1);
            if (DeviceUtil.isWXMiniGame()) {
                MiniManeger.instance.shareAppMessage();
                return;
            }
            if (DeviceUtil.isTTMiniGame()) {
                if (this.bShareAward) {
                    TipsManager.getInstance().showDefaultTips("已经领过奖励了哦");
                    return;
                }
                this.removeEvent();
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN') {
                    MiniManeger.instance.bFlagDouYin = true;
                    MiniManeger.instance.shareAppMessage({
                        sucFun: function () {
                            console.log("发布录制视频成功");
                            _this.bShareAward = true;
                            _this.addEvent();
                            TipsManager.getInstance().showDefaultTips('分享成功');
                            if (MiniManeger.instance.onShareVideoSuccess) {
                                return;
                            }
                            var nGlodCount = 50;
                            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
                            if (stGameConfig) {
                                nGlodCount = parseInt(stGameConfig.strValue);
                            }
                            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodCount);
                            MiniManeger.instance.onShareVideoSuccess = true;
                            Laya.timer.once(1000, self, function () {
                                self.flayGlodFileShare();
                            });
                        },
                        failFun: function () {
                            _this.addEvent();
                            console.log("发布录制视频失败");
                            TipsManager.getInstance().showDefaultTips('分享失败');
                        }
                    });
                }
                else {
                    MiniManeger.instance.onShareVideo({
                        successFun: function () {
                            console.log("发布录制视频成功");
                            _this.addEvent();
                            _this.bShareAward = true;
                            if (MiniManeger.instance.onShareVideoSuccess) {
                                return;
                            }
                            var nGlodCount = 50;
                            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
                            if (stGameConfig) {
                                nGlodCount = parseInt(stGameConfig.strValue);
                            }
                            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, nGlodCount);
                            MiniManeger.instance.onShareVideoSuccess = true;
                            _this.flayGlodFileShare();
                        },
                        failFun: function () {
                            console.log("发布录制视频失败");
                            _this.addEvent();
                        }
                    });
                }
            }
            else {
                MiniManeger.instance.shareAppMessage();
            }
        };
        FailEntryTwoView.prototype.failEntryTwoReStartGame = function () {
            SoundManager.getInstance().playEffect("button", 1);
            var nSpCost = 1;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nSpCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (!b) {
                TipsManager.getInstance().showDefaultTips("体力不足");
                ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], function () {
                    ViewManager.getInstance().showView(AddPsView);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                });
                return;
            }
            AddPsView.bCloseBinner = true;
            if (DeviceUtil.isWXMiniGame()) {
                MoreGameRandomGameBox713.bReStartGame = true;
                MoreGameRandomGameBox713.bEnterHotBox = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            }
            else {
                PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                ViewChangeManager.getInstance().restartGame(true);
            }
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        FailEntryTwoView.prototype.returnToGameHome = function () {
            if (DeviceUtil.isWXMiniGame()) {
                MoreGameRandomGameBox713.toHome = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                MiniManeger.instance.bFlagSpecialView = true;
                this.removeSelf();
                return;
            }
            SoundManager.getInstance().playEffect("button", 1);
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
            ViewChangeManager.getInstance().CurLevelBase.returnToGameHome();
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        FailEntryTwoView.prototype.initPanel = function () {
            if (!DeviceUtil.isWXMiniGame() && !BaseConst.infos.gameInfo.isDY) {
                this.panelWeCatMoreGame.vScrollBarSkin = "";
                this.panelWeCatMoreGame.elasticEnabled = true;
                this.panelWeCatMoreGame.vScrollBar.elasticDistance = 200;
                this.panelWeCatMoreGame.vScrollBar.elasticBackTime = 100;
            }
        };
        FailEntryTwoView.prototype.initView = function () {
            var _this = this;
            this.initPl();
            this.initPanel();
            MiniManeger.instance.onShareVideoSuccess = false;
            this.initPlView();
            this.proceMoreGame();
            this.bIsRunning = true;
            this.bRecvAward = false;
            this.bShareAward = false;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(7);
            if (stGameConfig) {
                this.nGlodAddByWathcVideo = parseInt(stGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.spCount, this.nGlodAddByWathcVideo.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
            var nCost = 1;
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nCost = parseInt(stGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.spCost, nCost.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
            this.startimageBtShareAni();
            GameManager.instance.openLevelVideo(function () {
                GameManager.instance.selAddLottery(_this.box_content);
            });
        };
        FailEntryTwoView.prototype.startimageBtShareAni = function () {
            var _this = this;
            if (DeviceUtil.isWXMiniGame()) {
                return;
            }
            if (!this.bIsRunning) {
                return;
            }
            Laya.Tween.clearAll(this.imageBtShare);
            Laya.Tween.to(this.imageBtShare, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageBtShare, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startimageBtShareAni);
                }));
            }));
        };
        FailEntryTwoView.prototype.onWatchVideoRecvAward = function () {
            console.log("onWatchVideoRecvAward = ", this.bRecvAward);
            if (this.bRecvAward) {
                TipsManager.getInstance().showDefaultTips("已经领过奖励了哦");
                return;
            }
            var self = this;
            this.imageRecv.off(Laya.Event.CLICK, this, this.onWatchVideoRecvAward);
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    self.bRecvAward = true;
                    self.addGlodReal();
                    self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
                },
                failFun: function () {
                    self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
                },
                errorFun: function () {
                    self.imageRecv.on(Laya.Event.CLICK, self, self.onWatchVideoRecvAward);
                }
            });
        };
        FailEntryTwoView.prototype.addGlodReal = function () {
            this.bRecvAward = true;
            console.log("addGlodReal = ", this.bRecvAward);
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, this.nGlodAddByWathcVideo);
            this.flayGlodRecv();
        };
        FailEntryTwoView.prototype.initPlView = function () {
            if (DeviceUtil.isTTMiniGame()) {
                this.imageShareName.skin = "resource/assets/img/ui/success/failure_word_8.png";
                this.imageShareIcon.skin = "resource/assets/img/common/succeed_icon_3.png";
                this.imageShareName.y = 15;
                this.shareGlodCount.visible = true;
                this.ttGoodsType.visible = true;
                this.ttSpecial.visible = true;
                var nGlodCount = 50;
                var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
                if (stGameConfig) {
                    nGlodCount = parseInt(stGameConfig.strValue);
                }
                BitmapLabelUtils.setLabel(this.shareGlodCount, nGlodCount.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
                this.imageShareName.right = 40;
                this.imageShareIcon.left = 40;
            }
            else {
                this.imageShareName.skin = "resource/assets/img/ui/success/failure_word_2.png";
                this.imageShareIcon.skin = "resource/assets/img/common/common_icon_3.png";
                this.shareGlodCount.visible = false;
                this.ttGoodsType.visible = false;
                this.ttSpecial.visible = false;
                this.imageShareName.y = 38;
                this.imageShareName.right = 40;
                this.imageShareIcon.left = 40;
            }
        };
        FailEntryTwoView.prototype.flayGlodFileShare = function () {
            console.log("flayGlodFileShare");
            var pPoint = new Laya.Point();
            pPoint.x = this.ttGoodsType.x;
            pPoint.y = this.ttGoodsType.y;
            var stParent = this.ttGoodsType.parent;
            pPoint = stParent.localToGlobal(pPoint);
            AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
            console.log("pPoint.x = ", pPoint.x, "pPoint.y = ", pPoint.y);
        };
        FailEntryTwoView.prototype.flayGlodRecv = function () {
            console.log("flayGlodRecv");
            var pPoint = new Laya.Point();
            pPoint.x = this.imageGoodsType.x;
            pPoint.y = this.imageGoodsType.y;
            var stParent = this.imageGoodsType.parent;
            pPoint = stParent.localToGlobal(pPoint);
            AnimationManager.instance.flayGlod(pPoint.x, pPoint.y, 341, 105);
        };
        FailEntryTwoView.prototype.proceMoreGame = function () {
            if (DeviceUtil.isTTMiniGame()) ;
            else if (DeviceUtil.isWXMiniGame()) ;
        };
        FailEntryTwoView.prototype.refreshTTMoreGame = function () {
            var nXStart = 70;
            var nYStart = 47;
            var aryInfo = [];
            var nCount = 3;
            aryInfo = this.getRandomIndex();
            var nLen = 8;
            if (DeviceUtil.isWXMiniGame()) {
                nLen = aryInfo.length;
            }
            else {
                nLen = 9;
                nLen = nLen < aryInfo.length ? nLen : aryInfo.length;
            }
            this.panelWeCatMoreGame.removeChildren();
            for (var i = 0; i < nLen; ++i) {
                var pWeCatMoreGameItemOne = this.panelWeCatMoreGame.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new WeCatMoreGameItemOne(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 70 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.panelWeCatMoreGame.addChild(pWeCatMoreGameItemOne);
                    this.scrollSizeMax = 120 * (nYAdd + 1);
                    this.nTimePanel = 5000;
                }
            }
            this.panelScrollAni();
        };
        FailEntryTwoView.prototype.panelScrollAni = function () {
            var _this = this;
            Laya.Tween.clearAll(this.panelWeCatMoreGame.vScrollBar);
            Laya.timer.clearAll(this.panelScrollAni);
            Laya.Tween.to(this.panelWeCatMoreGame.vScrollBar, { value: this.scrollSizeMax }, this.nTimePanel, null, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.panelWeCatMoreGame.vScrollBar, { value: 0 }, _this.nTimePanel, null, Laya.Handler.create(_this, function (args) {
                    _this.scrollSizeMax = _this.panelWeCatMoreGame.vScrollBar.max;
                    Laya.timer.once(0, _this, _this.panelScrollAni);
                }));
            }));
        };
        FailEntryTwoView.prototype.getRandomIndex = function () {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
            if (nCount > 0) {
                nCount = 3 - nCount;
            }
            nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        FailEntryTwoView.prototype.onShowMoreGame = function () {
            MiniManeger.instance.showMoreGamesModal();
        };
        FailEntryTwoView.prototype.initPl = function () {
            if (DeviceUtil.isWXMiniGame()) {
                this.box_wecat.removeChildren();
                this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView());
                this.box_wecat.visible = true;
                this.imageBtShare.scaleX = 0.6;
                this.imageBtShare.scaleY = 0.6;
                this.imageBtShare.left = 70;
                this.imageBtShare.bottom = 550;
                this.imageRecv.scaleX = 0.6;
                this.imageRecv.scaleY = 0.6;
                this.imageRecv.right = 70;
                this.imageRecv.bottom = 550;
                if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                    this.imageBtRestart.bottom = this.nBtNextLevelSp;
                    MiniManeger.instance.bFlagSpecialView = false;
                    MiniManeger.instance.hideBanner();
                    return;
                }
                else {
                    this.imageBtRestart.bottom = this.nBtNextLevel;
                }
            }
            else {
                MiniManeger.instance.bFlagSpecialView = true;
                MiniManeger.instance.showBannerAd();
            }
        };
        return FailEntryTwoView;
    }(BaseSceneUISkinPopView));

    var MoreGameRandomGameBox713Temp = (function (_super) {
        __extends(MoreGameRandomGameBox713Temp, _super);
        function MoreGameRandomGameBox713Temp() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameOperRequestTemp";
            _this.nStartY = 0;
            _this.bContinue = false;
            _this.skin = "game/uiView/wecat/MoreGameRandomGameBox713Temp.json";
            _this.nRandomIndxe = 0;
            _this.bAniOver = false;
            _this.nOpenNum = 0;
            return _this;
        }
        MoreGameRandomGameBox713Temp.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.panel_gamelist.height = Laya.stage.height - (1920 - 1640);
        };
        MoreGameRandomGameBox713Temp.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.bAniOver = true;
        };
        MoreGameRandomGameBox713Temp.prototype.addEvent = function () {
            this.registerEvent(this.imageBtReturn, Laya.Event.CLICK, this.onBackTemp, this);
            this.registerEvent(this.imageBtConGame, Laya.Event.CLICK, this.onSpeical, this);
            this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
            this.registerEvent(this.imageRandom, Laya.Event.CLICK, this.goToGameRandom, this);
        };
        MoreGameRandomGameBox713Temp.prototype.mousedown = function (evt) {
            this.nStartY = evt.currentTarget.mouseY;
            var self = this;
            function mouseMove(evt1) {
                var nYTemp = self.nStartY - evt1.currentTarget.mouseY;
                self.moreGamePanel.y -= nYTemp;
                self.moreGamePanel2.y -= nYTemp;
                self.nStartY = evt1.currentTarget.mouseY;
                if (self.moreGamePanel.y >= 0 && self.moreGamePanel2.y >= 0) {
                    self.moreGamePanel.y = 0;
                    self.moreGamePanel2.y = self.moreGamePanel.height;
                }
            }
            function mouseUp(evt1) {
                this.panel_gamelist.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
                this.panel_gamelist.off(Laya.Event.MOUSE_UP, this, mouseUp);
            }
            this.panel_gamelist.on(Laya.Event.MOUSE_MOVE, this, mouseMove);
            this.panel_gamelist.on(Laya.Event.MOUSE_UP, this, mouseUp);
        };
        MoreGameRandomGameBox713Temp.prototype.initPanel = function () {
        };
        MoreGameRandomGameBox713Temp.prototype.initView = function () {
            this.nOpenNum += 1;
            MiniManeger.instance.bFlagSpecialView = false;
            MiniManeger.instance.hideBanner();
            Laya.timer.clear(this, this.onMove);
            ViewChangeManager.getInstance().CommonView.visible = false;
            this.initPanel();
            var nXStart = 0;
            var nYStart = 0;
            var nCount = 3;
            var aryInfo = [];
            aryInfo = this.getRandomIndex(18);
            this.moreGamePanel.removeChildren();
            this.moreGamePanel.y = 0;
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                    pWeCatMoreGameItemOne.isBox713Temp = true;
                }
                else {
                    pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i], true);
                    pWeCatMoreGameItemOne.isBox713Temp = true;
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                    this.moreGamePanel.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            this.moreGamePanel2.y = this.moreGamePanel.height;
            this.moreGamePanel2.removeChildren();
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel2.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel2.addChild(pWeCatMoreGameItemOne);
                    this.moreGamePanel2.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
            Laya.timer.frameLoop(1, this, this.onMove);
            if ((this.nOpenNum >= 2 || !PlayerDataManager.getInstance().bIsNewPlayer) && BaseConst.infos.gameInfo.openPsAward == 1) {
                this.timerChangerImage();
            }
            else {
                this.changeImage();
            }
        };
        MoreGameRandomGameBox713Temp.prototype.timerChangerImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_2.png";
            this.bContinue = false;
            Laya.timer.clear(this, this.changeImage);
            Laya.timer.once(5000, this, this.changeImage);
        };
        MoreGameRandomGameBox713Temp.prototype.changeImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_3.png";
            this.bContinue = true;
        };
        MoreGameRandomGameBox713Temp.prototype.onSpeical = function () {
            if (this.bContinue) {
                if (!MoreGameRandomGameBox713Temp.bSpecial) {
                    if (MoreGameRandomGameBox713Temp.bSuccess) {
                        ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    }
                    else {
                        ViewManager.getInstance().showView(FailEntryTwoView);
                    }
                }
                MoreGameRandomGameBox713Temp.bSuccess = false;
                MoreGameRandomGameBox713Temp.bSpecial = false;
                this.removeSelf();
            }
            else {
                this.goToGameRandom();
            }
        };
        MoreGameRandomGameBox713Temp.prototype.onMove = function () {
            var nHight = this.moreGamePanel.height;
            this.moreGamePanel2.y -= 2;
            this.moreGamePanel.y -= 2;
            if (this.moreGamePanel.y <= -nHight) {
                this.moreGamePanel.y = this.moreGamePanel2.y + nHight;
            }
            if (this.moreGamePanel2.y <= -nHight) {
                this.moreGamePanel2.y = this.moreGamePanel.y + nHight;
            }
        };
        MoreGameRandomGameBox713Temp.prototype.onBackTemp = function () {
            if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                ViewManager.getInstance().showView(MoreGameViewTemp);
            }
            else {
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        MoreGameRandomGameBox713Temp.prototype.onBack = function () {
            MoreGameRandomGameBox713Temp.bSuccess = false;
            MoreGameRandomGameBox713Temp.bSpecial = false;
            this.removeSelf();
            Laya.timer.clearAll(this);
        };
        MoreGameRandomGameBox713Temp.prototype.getRandomIndex = function (nMax) {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
            if (nCount > 0) {
                nCount = 3 - nCount;
            }
            nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
            if (nCount <= nMax) {
                nCount = nMax;
            }
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        MoreGameRandomGameBox713Temp.prototype.onClickOper = function () {
        };
        MoreGameRandomGameBox713Temp.prototype.goToGameRandom = function () {
            this.aryCatMiniIconsInfoTemp = GameData.getInstance().weCatMiniIconsInfo;
            if (this.aryCatMiniIconsInfoTemp.length <= 0) {
                return;
            }
            this.nRandomIndxe = Utils.random(0, this.aryCatMiniIconsInfoTemp.length - 1);
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id);
            }
            var self = this;
            var stData = this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id;
            var data = {
                appId: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].ad_appid,
                path: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].url,
                success: function () {
                    console.log("navigateToMiniProgram success");
                    if (BaseConst.infos.gameInfo.isDY) {
                        console.log("self.nIndex = ", stData);
                        PlatformDY.toGame(stData.ad_id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            };
            platform.navigateToMiniProgram(data);
        };
        MoreGameRandomGameBox713Temp.bSuccess = false;
        MoreGameRandomGameBox713Temp.bSpecial = false;
        return MoreGameRandomGameBox713Temp;
    }(PopBaseScene));

    var MoreGameRandomGameBoxItem713 = (function (_super) {
        __extends(MoreGameRandomGameBoxItem713, _super);
        function MoreGameRandomGameBoxItem713(data, b) {
            if (b === void 0) { b = false; }
            var _this = _super.call(this) || this;
            _this.className_key = "WeCatMoreGameItemOne713";
            _this.nIndex = data;
            _this.bIsBox713Temp = b;
            _this.skin = "game/uiView/wecat/MoreGameRandomGameBoxItem713.json";
            _this.width = 320;
            _this.height = 390;
            return _this;
        }
        Object.defineProperty(MoreGameRandomGameBoxItem713.prototype, "isBox713Temp", {
            set: function (b) {
                this.bIsBox713Temp = b;
            },
            enumerable: true,
            configurable: true
        });
        MoreGameRandomGameBoxItem713.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
        };
        MoreGameRandomGameBoxItem713.prototype.onRemoved = function () {
            this.removeEvent();
        };
        MoreGameRandomGameBoxItem713.prototype.setData = function (data) {
            this.nIndex = data;
            this.initView();
        };
        MoreGameRandomGameBoxItem713.prototype.initView = function () {
            if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
                this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
                if (this.nIndex < 0)
                    return;
            }
            this.lableGameName.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
            this.imageIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
            this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        };
        MoreGameRandomGameBoxItem713.prototype.addEvent = function () {
            if (!DeviceUtil.isTTMiniGame()) {
                this.on(Laya.Event.CLICK, this, this.gotoGame);
            }
        };
        MoreGameRandomGameBoxItem713.prototype.removeEvent = function () {
            this.off(Laya.Event.CLICK, this, this.gotoGame);
        };
        MoreGameRandomGameBoxItem713.prototype.gotoGame = function () {
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
                if (BaseConst.infos.gameInfo.isDY) {
                    PlatformDY.clickGame(this.stGameIndex.ad_id);
                }
                console.log("this.stGameIndex = ", this.stGameIndex);
                var self_1 = this;
                var data = {
                    appId: this.stGameIndex.ad_appid,
                    path: this.stGameIndex.url,
                    success: function () {
                        console.log("navigateToMiniProgram success!");
                        if (BaseConst.infos.gameInfo.isDY) {
                            console.log("self.nIndex = ", self_1.nIndex);
                            PlatformDY.toGame(self_1.stGameIndex.ad_id);
                        }
                    },
                    fail: function (e) {
                        console.log("navigateToMiniProgram fail e =", e);
                        if (!self_1.bIsBox713Temp) {
                            MoreGameRandomGameBox713Temp.bSpecial = true;
                        }
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                    }
                };
                platform.navigateToMiniProgram(data);
            }
        };
        return MoreGameRandomGameBoxItem713;
    }(BaseSceneUISkin));

    var WeCatMoreGameItemOne713Big = (function (_super) {
        __extends(WeCatMoreGameItemOne713Big, _super);
        function WeCatMoreGameItemOne713Big(data) {
            var _this = _super.call(this) || this;
            _this.className_key = "WeCatMoreGameItemOne713Big";
            _this.nIndex = data;
            _this.skin = "game/uiView/wecat/WeCatMoreGameItemOne713Big.json";
            _this.width = 465;
            _this.height = 537;
            return _this;
        }
        WeCatMoreGameItemOne713Big.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
        };
        WeCatMoreGameItemOne713Big.prototype.onRemoved = function () {
            this.removeEvent();
        };
        WeCatMoreGameItemOne713Big.prototype.setData = function (data) {
            this.nIndex = data;
            this.initView();
        };
        WeCatMoreGameItemOne713Big.prototype.initView = function () {
            if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
                this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
                if (this.nIndex < 0)
                    return;
            }
            this.lableGameName.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
            this.imageIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
            this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        };
        WeCatMoreGameItemOne713Big.prototype.addEvent = function () {
            if (!DeviceUtil.isTTMiniGame()) {
                this.on(Laya.Event.CLICK, this, this.gotoGame);
            }
        };
        WeCatMoreGameItemOne713Big.prototype.removeEvent = function () {
            this.off(Laya.Event.CLICK, this, this.gotoGame);
        };
        WeCatMoreGameItemOne713Big.prototype.gotoGame = function () {
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
                if (BaseConst.infos.gameInfo.isDY) {
                    PlatformDY.clickGame(this.stGameIndex.ad_id);
                }
                var self_1 = this;
                var data = {
                    appId: this.stGameIndex.ad_appid,
                    path: this.stGameIndex.url,
                    success: function () {
                        console.log("navigateToMiniProgram success!");
                        if (BaseConst.infos.gameInfo.isDY) {
                            console.log("self.nIndex = ", self_1.nIndex);
                            PlatformDY.toGame(self_1.stGameIndex.ad_id);
                        }
                    },
                    fail: function (e) {
                        console.log("navigateToMiniProgram fail e =", e);
                        MoreGameRandomGameBox713Temp.bSpecial = true;
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                    }
                };
                platform.navigateToMiniProgram(data);
            }
        };
        return WeCatMoreGameItemOne713Big;
    }(BaseSceneUISkin));

    var WeCatMoreGameItemTwo = (function (_super) {
        __extends(WeCatMoreGameItemTwo, _super);
        function WeCatMoreGameItemTwo(data) {
            var _this = _super.call(this) || this;
            _this.className_key = "WeCatMoreGameItemTwo";
            _this.nIndex = data;
            _this.skin = "game/uiView/WeCatMoreGameItemTwo.json";
            _this.width = 210;
            _this.height = 258;
            return _this;
        }
        WeCatMoreGameItemTwo.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
        };
        WeCatMoreGameItemTwo.prototype.onRemoved = function () {
            this.removeEvent();
        };
        WeCatMoreGameItemTwo.prototype.setData = function (data) {
            this.nIndex = data;
            this.initView();
        };
        WeCatMoreGameItemTwo.prototype.initView = function () {
            if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
                this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
                if (this.nIndex < 0)
                    return;
            }
            var stData = GameData.getInstance().weCatMiniIconsInfo;
            var stDataTemp = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
            this.lableGameName.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
            this.imageIcon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
            this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
        };
        WeCatMoreGameItemTwo.prototype.addEvent = function () {
            if (!DeviceUtil.isTTMiniGame()) {
                this.on(Laya.Event.CLICK, this, this.gotoGame);
            }
        };
        WeCatMoreGameItemTwo.prototype.removeEvent = function () {
            this.off(Laya.Event.CLICK, this, this.gotoGame);
        };
        WeCatMoreGameItemTwo.prototype.gotoGame = function () {
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame()) {
                if (BaseConst.infos.gameInfo.isDY) {
                    PlatformDY.clickGame(this.stGameIndex.ad_id);
                }
                var self_1 = this;
                var data = {
                    appId: this.stGameIndex.ad_appid,
                    path: this.stGameIndex.url,
                    success: function () {
                        console.log("navigateToMiniProgram success!");
                        if (BaseConst.infos.gameInfo.isDY) {
                            console.log("self.nIndex = ", self_1.nIndex);
                            PlatformDY.toGame(self_1.stGameIndex.ad_id);
                        }
                    },
                    fail: function (e) {
                        console.log("navigateToMiniProgram fail e =", e);
                        if (DeviceUtil.isWXMiniGame()) {
                            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                        }
                    }
                };
                platform.navigateToMiniProgram(data);
            }
        };
        return WeCatMoreGameItemTwo;
    }(BaseSceneUISkin));

    var SuccessfulEntryOneView = (function (_super) {
        __extends(SuccessfulEntryOneView, _super);
        function SuccessfulEntryOneView() {
            var _this = _super.call(this) || this;
            _this.className_key = "SuccessfulEntryOneView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.bBinnerShow = false;
            _this.nTimeDown = 5;
            _this.nCountMax = 5;
            _this.nPsAdd = 1;
            _this.nAddPerOne = 0;
            _this.nCurCount = 0;
            _this.bTimeOver = false;
            _this.bAniRunning = false;
            _this.bFirst = true;
            _this.nTimeOverTemp = 0;
            _this.nLastClickTime = 0;
            _this.bBinnerShow = false;
            _this.skin = "game/uiView/SuccessfulEntryOneView.json";
            return _this;
        }
        SuccessfulEntryOneView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        SuccessfulEntryOneView.prototype.onAddStage = function () {
            MiniManeger.instance.showInterstitialAd();
            this.initView();
            this.addEvent();
            this.imageBt.bottom = 0;
            this.moveBtnTween = null;
            MiniManeger.instance.bFlagSpecialView = false;
            this.bBinnerShow = false;
            MiniManeger.instance.hideBanner();
            ViewChangeManager.getInstance().CommonView.visible = false;
        };
        SuccessfulEntryOneView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.bFirst = false;
            this.bAniRunning = false;
            Laya.Tween.clearAll(this.imageHand);
            Laya.timer.clearAll(this);
            MiniManeger.instance.bFlagSpecialView = true;
        };
        SuccessfulEntryOneView.prototype.initView = function () {
            SoundManager.getInstance().playEffect("win", 1);
            this.nTimeDown = 5;
            this.nCountMax = 5;
            this.nPsAdd = 1;
            this.nAddPerOne = 0;
            this.nCurCount = 0;
            this.bTimeOver = false;
            this.bAniRunning = true;
            this.bFirst = true;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(9);
            if (stGameConfig) {
                this.nTimeDown = parseInt(stGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.spTimeDown, this.nTimeDown.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(10);
            if (stGameConfig) {
                this.nCountMax = parseInt(stGameConfig.strValue);
            }
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(11);
            if (stGameConfig) {
                this.nPsAdd = parseInt(stGameConfig.strValue);
            }
            stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(14);
            if (stGameConfig) {
                this.nTimeOverTemp = parseInt(stGameConfig.strValue);
            }
            this.nAddPerOne = Math.floor(870 / this.nCountMax);
            this.imageParValue.width = 0;
            this.openTimeDown();
            this.openHandAni();
        };
        SuccessfulEntryOneView.prototype.addEvent = function () {
            this.imageBt.on(Laya.Event.CLICK, this, this.imageBtClickRecvAward);
        };
        SuccessfulEntryOneView.prototype.removeEvent = function () {
            this.imageBt.off(Laya.Event.CLICK, this, this.imageBtClickRecvAward);
        };
        SuccessfulEntryOneView.prototype.imageBtClickRecvAward = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (this.bTimeOver) {
                return;
            }
            this.nCurCount += 1;
            var nWithCur = this.nCurCount * this.nAddPerOne;
            this.imageParValue.width = nWithCur;
            if (this.nCurCount >= this.nCountMax) {
                Laya.timer.clear(this, this.timeDownView);
                this.procLogicOver();
            }
            this.nLastClickTime = GameLogicProcessingManager.GetCurTime();
        };
        SuccessfulEntryOneView.prototype.openTimeDown = function () {
            BitmapLabelUtils.setLabel(this.spTimeDown, this.nTimeDown.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");
            Laya.timer.loop(1000, this, this.timeDownView);
            Laya.timer.loop(this.nTimeOverTemp, this, this.subCount);
        };
        SuccessfulEntryOneView.prototype.subCount = function () {
            this.nCurCount -= 1;
            this.nCurCount = this.nCurCount < 0 ? 0 : this.nCurCount;
            var nWithCur = this.nCurCount * this.nAddPerOne;
            this.imageParValue.width = nWithCur;
        };
        SuccessfulEntryOneView.prototype.timeDownView = function () {
            this.nTimeDown -= 1;
            var nTemp = this.nTimeDown;
            nTemp = nTemp < 0 ? 0 : nTemp;
            BitmapLabelUtils.setLabel(this.spTimeDown, nTemp.toString(), "resource/assets/img/ui/success/succeed_number2/succeed_number2_", 0, ".png", "center");
            if (this.nTimeDown < 0) {
                this.bTimeOver = true;
                this.procLogicOver();
            }
        };
        SuccessfulEntryOneView.prototype.procLogicOver = function () {
            Laya.timer.clear(this, this.timeDownView);
            if (this.bTimeOver) {
                TipsManager.getInstance().showDefaultTips("领取失败");
            }
            else if (this.nCurCount >= this.nCountMax) {
                PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Sp, this.nPsAdd);
                TipsManager.getInstance().showDefaultTips("体力+" + this.nPsAdd.toString());
            }
            if (DeviceUtil.isWXMiniGame()) {
                if (PlayerDataManager.bGlobEnterGame) {
                    ViewManager.getInstance().showView(MoreGameOperRequestTwo);
                    MiniManeger.instance.bFlagSpecialView = true;
                    this.removeSelf();
                }
                else {
                    ViewChangeManager.getInstance().goToNextLevel();
                    this.removeSelf();
                }
            }
            else {
                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                ViewChangeManager.getInstance().CommonView.visible = true;
                this.removeSelf();
                MiniManeger.instance.bFlagSpecialView = true;
            }
        };
        SuccessfulEntryOneView.prototype.openHandAni = function () {
            var _this = this;
            if (!this.bAniRunning) {
                return;
            }
            var yTemp = this.imageHand.y;
            Laya.Tween.clearAll(this.imageHand);
            Laya.Tween.to(this.imageHand, { y: yTemp - 25 }, 300, null, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageHand, { y: yTemp }, 300, null, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.openHandAni);
                }));
            }));
        };
        return SuccessfulEntryOneView;
    }(BaseSceneUISkinPopView));

    var WeCatMoreGameView = (function (_super) {
        __extends(WeCatMoreGameView, _super);
        function WeCatMoreGameView() {
            var _this = _super.call(this) || this;
            _this.className_key = "WeCatMoreGameView";
            _this.nStartY = 0;
            _this.bWeCatShow = false;
            _this.skin = "game/uiView/WeCatMoreGameView.json";
            return _this;
        }
        WeCatMoreGameView.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
            this.viewAniIn();
        };
        WeCatMoreGameView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        WeCatMoreGameView.prototype.initPanel = function () {
        };
        WeCatMoreGameView.prototype.initView = function () {
            var nXStart = 0;
            var nYStart = 0;
            var nCount = 3;
            var aryInfo = [];
            aryInfo = this.getRandomIndex(12);
            this.moreGamePanel.removeChildren();
            this.moreGamePanel.y = 0;
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new WeCatMoreGameItemTwo(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 15 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                    this.moreGamePanel.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height + 10;
                }
            }
            this.moreGamePanel2.y = this.moreGamePanel.height;
            this.moreGamePanel2.removeChildren();
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel2.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new WeCatMoreGameItemTwo(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 15 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel2.addChild(pWeCatMoreGameItemOne);
                    this.moreGamePanel2.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height + 10;
                }
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
            Laya.timer.frameLoop(1, this, this.onMove);
        };
        WeCatMoreGameView.prototype.onMove = function () {
            var nHight = this.moreGamePanel.height;
            this.moreGamePanel2.y -= 1.5;
            this.moreGamePanel.y -= 1.5;
            if (this.moreGamePanel.y <= -nHight) {
                this.moreGamePanel.y = this.moreGamePanel2.y + nHight;
            }
            if (this.moreGamePanel2.y <= -nHight) {
                this.moreGamePanel2.y = this.moreGamePanel.y + nHight;
            }
        };
        WeCatMoreGameView.prototype.getRandomIndex = function (nMax) {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
            if (nCount > 0) {
                nCount = 3 - nCount;
            }
            nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
            if (nCount <= nMax) {
                nCount = nMax;
            }
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        WeCatMoreGameView.prototype.addEvent = function () {
            this.imageBtWeCat.on(Laya.Event.CLICK, this, this.viewAniOut);
            this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
        };
        WeCatMoreGameView.prototype.removeEvent = function () {
            this.imageBtWeCat.off(Laya.Event.CLICK, this, this.viewAniOut);
        };
        WeCatMoreGameView.prototype.mousedown = function (evt) {
            this.nStartY = evt.currentTarget.mouseY;
            var self = this;
            function mouseMove(evt1) {
                var nYTemp = self.nStartY - evt1.currentTarget.mouseY;
                self.moreGamePanel.y -= nYTemp;
                self.moreGamePanel2.y -= nYTemp;
                self.nStartY = evt1.currentTarget.mouseY;
                if (self.moreGamePanel.y >= 0 && self.moreGamePanel2.y >= 0) {
                    self.moreGamePanel.y = 0;
                    self.moreGamePanel2.y = self.moreGamePanel.height;
                }
            }
            function mouseUp(evt1) {
                this.panel_gamelist.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
                this.panel_gamelist.off(Laya.Event.MOUSE_UP, this, mouseUp);
            }
            this.panel_gamelist.on(Laya.Event.MOUSE_MOVE, this, mouseMove);
            this.panel_gamelist.on(Laya.Event.MOUSE_UP, this, mouseUp);
        };
        WeCatMoreGameView.prototype.weCatViewOper = function () {
            var _this = this;
            this.bWeCatShow = !this.bWeCatShow;
            this.imageBtWeCat.off(Laya.Event.CLICK, this, this.weCatViewOper);
            if (this.bWeCatShow) {
                Laya.Tween.to(this.boxWeCatMoreGame, { x: -713 }, 1000, null, Laya.Handler.create(this, function (args) {
                    _this.imageBtWeCat.on(Laya.Event.CLICK, _this, _this.weCatViewOper);
                    _this.imageBtWeCat.skin = "resource/assets/img/common/game_button_2.png";
                }));
            }
            else {
                Laya.Tween.to(this.boxWeCatMoreGame, { x: 0 }, 1000, null, Laya.Handler.create(this, function (args) {
                    _this.imageBtWeCat.on(Laya.Event.CLICK, _this, _this.weCatViewOper);
                    _this.imageBtWeCat.skin = "resource/assets/img/common/game_button_3.png";
                }));
            }
        };
        WeCatMoreGameView.prototype.viewAniIn = function () {
            var _this = this;
            this.boxWeCatMoreGame.x = -713;
            WeCatMoreGameView.isOpen = true;
            Laya.Tween.to(this.boxWeCatMoreGame, { x: 0 }, 500, null, Laya.Handler.create(this, function (args) {
                _this.addEvent();
                _this.imageBtWeCat.skin = "resource/assets/img/common/game_button_3.png";
            }));
        };
        WeCatMoreGameView.prototype.viewAniOut = function () {
            var _this = this;
            this.boxWeCatMoreGame.x = 0;
            Laya.Tween.to(this.boxWeCatMoreGame, { x: -713 }, 500, null, Laya.Handler.create(this, function (args) {
                _this.imageBtWeCat.skin = "resource/assets/img/common/game_button_2.png";
                WeCatMoreGameView.nEnterCount += 1;
                if (WeCatMoreGameView.nEnterCount >= 2) {
                    if (PlayerDataManager.bGlobEnterGame) {
                        ViewChangeManager.getInstance().CommonView.visible = true;
                    }
                    PlayerDataManager.bGlobEnterGame = false;
                }
                if (PlayerDataManager.bGlobEnterGame) {
                    MiniManeger.instance.playViderAd({
                        successFun: function () {
                            ViewManager.getInstance().showView(SuccessfulEntryOneView);
                            _this.removeSelf();
                            WeCatMoreGameView.isOpen = false;
                        },
                        failFun: function () {
                            ViewManager.getInstance().showView(SuccessfulEntryOneView);
                            _this.removeSelf();
                            WeCatMoreGameView.isOpen = false;
                        },
                        errorFun: function () {
                            ViewManager.getInstance().showView(SuccessfulEntryOneView);
                            _this.removeSelf();
                            WeCatMoreGameView.isOpen = false;
                        }
                    });
                }
                else {
                    _this.removeSelf();
                    WeCatMoreGameView.isOpen = false;
                }
            }));
        };
        WeCatMoreGameView.isOpen = false;
        WeCatMoreGameView.nEnterCount = 0;
        return WeCatMoreGameView;
    }(BaseSceneUISkinPopView));

    var MoreGameOperRequestTwo = (function (_super) {
        __extends(MoreGameOperRequestTwo, _super);
        function MoreGameOperRequestTwo() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameOperRequestTwo";
            _this.bContinue = false;
            _this.nStartY = 0;
            _this.scrollSizeMax = 50;
            _this.nTimePanel = 5000;
            _this.skin = "game/uiView/wecat/MoreGameOperRequestTwo.json";
            _this.nRandomIndxe = 0;
            _this.aryCatMiniIconsInfoTemp = [];
            _this.nOpenNum = 0;
            return _this;
        }
        MoreGameOperRequestTwo.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.panel_gamelist.height = Laya.stage.height - (1920 - 1640);
            this.initView();
            this.addEvent();
        };
        MoreGameOperRequestTwo.prototype.onAddStage = function () {
            var _this = this;
            _super.prototype.onAddStage.call(this);
            this.nOpenNum += 1;
            MiniManeger.instance.hideBanner();
            if (this.isCreate) {
                this.initView();
                this.addEvent();
                this.imageBtReturn.visible = false;
                Laya.timer.once(3000, this, function () {
                    _this.imageBtReturn.visible = true;
                });
                MoreGameOperRequestTwo.isOpen = true;
            }
            MiniManeger.instance.bFlagSpecialView = false;
        };
        MoreGameOperRequestTwo.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            MoreGameOperRequestTwo.isOpen = false;
        };
        MoreGameOperRequestTwo.prototype.onBackTemp = function () {
            if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                ViewManager.getInstance().showView(MoreGameViewTemp);
            }
            else {
                MoreGameRandomGameBox713Temp.bSpecial = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        MoreGameOperRequestTwo.prototype.timerChangerImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_2.png";
            this.bContinue = false;
            Laya.timer.clear(this, this.changeImage);
            Laya.timer.once(5000, this, this.changeImage);
        };
        MoreGameOperRequestTwo.prototype.changeImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_3.png";
            this.bContinue = true;
        };
        MoreGameOperRequestTwo.prototype.onSpeical = function () {
            if (this.bContinue) {
                this.onClickOper();
            }
            else {
                this.goToGame();
            }
        };
        MoreGameOperRequestTwo.prototype.addEvent = function () {
            this.imageBtReturn.on(Laya.Event.CLICK, this, this.onBackTemp);
            this.imageBtConGame.on(Laya.Event.CLICK, this, this.onSpeical);
            this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
        };
        MoreGameOperRequestTwo.prototype.mousedown = function (evt) {
            this.nStartY = evt.currentTarget.mouseY;
            var self = this;
            function mouseMove(evt1) {
                var nYTemp = self.nStartY - evt1.currentTarget.mouseY;
                self.moreGamePanel.y -= nYTemp;
                self.moreGamePanel2.y -= nYTemp;
                self.nStartY = evt1.currentTarget.mouseY;
                if (self.moreGamePanel.y >= 0 && self.moreGamePanel2.y >= 0) {
                    self.moreGamePanel.y = 0;
                    self.moreGamePanel2.y = self.moreGamePanel.height;
                }
            }
            function mouseUp(evt1) {
                this.panel_gamelist.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
                this.panel_gamelist.off(Laya.Event.MOUSE_UP, this, mouseUp);
            }
            this.panel_gamelist.on(Laya.Event.MOUSE_MOVE, this, mouseMove);
            this.panel_gamelist.on(Laya.Event.MOUSE_UP, this, mouseUp);
        };
        MoreGameOperRequestTwo.prototype.removeEvent = function () {
            this.imageBtReturn.off(Laya.Event.CLICK, this, this.onBackTemp);
            this.imageBtConGame.off(Laya.Event.CLICK, this, this.onSpeical);
        };
        MoreGameOperRequestTwo.prototype.initPanel = function () {
        };
        MoreGameOperRequestTwo.prototype.initView = function () {
            Laya.timer.clear(this, this.onMove);
            this.aryCatMiniIconsInfoTemp = [];
            this.aryCatMiniIconsInfoTemp = GameData.getInstance().weCatMiniIconsInfo;
            ViewChangeManager.getInstance().CommonView.visible = false;
            this.initPanel();
            var nXStart = 0;
            var nYStart = 0;
            var nCount = 2;
            var aryInfo = [];
            this.moreGamePanel.removeChildren();
            aryInfo = this.getRandomIndex(18);
            this.moreGamePanel.y = 0;
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new WeCatMoreGameItemOne713Big(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 50 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                    this.moreGamePanel.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            this.moreGamePanel2.y = this.moreGamePanel.height;
            this.moreGamePanel2.removeChildren();
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel2.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new WeCatMoreGameItemOne713Big(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 50 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel2.addChild(pWeCatMoreGameItemOne);
                    this.nTimePanel = (nYAdd + 1) * 1000;
                    this.moreGamePanel2.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
            if ((this.nOpenNum >= 2 || !PlayerDataManager.getInstance().bIsNewPlayer) && BaseConst.infos.gameInfo.openPsAward == 1) {
                this.timerChangerImage();
            }
            else {
                this.changeImage();
            }
            Laya.timer.frameLoop(1, this, this.onMove);
        };
        MoreGameOperRequestTwo.prototype.onMove = function () {
            var nHight = this.moreGamePanel.height;
            this.moreGamePanel2.y -= 2;
            this.moreGamePanel.y -= 2;
            if (this.moreGamePanel.y <= -nHight) {
                this.moreGamePanel.y = this.moreGamePanel2.y + nHight;
            }
            if (this.moreGamePanel2.y <= -nHight) {
                this.moreGamePanel2.y = this.moreGamePanel.y + nHight;
            }
        };
        MoreGameOperRequestTwo.prototype.onBack = function () {
            this.onClickOper();
        };
        MoreGameOperRequestTwo.prototype.goToGame = function () {
            if (this.aryCatMiniIconsInfoTemp.length <= 0) {
                return;
            }
            this.nRandomIndxe = Utils.random(0, this.aryCatMiniIconsInfoTemp.length - 1);
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id);
            }
            var self = this;
            var data = {
                appId: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].ad_appid,
                path: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].url,
                success: function () {
                    console.log("navigateToMiniProgram success");
                    if (BaseConst.infos.gameInfo.isDY) {
                        console.log("self.nIndex = ", self.nRandomIndxe);
                        PlatformDY.toGame(this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].ad_id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    MoreGameRandomGameBox713Temp.bSpecial = true;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            };
            platform.navigateToMiniProgram(data);
        };
        MoreGameOperRequestTwo.prototype.getRandomIndex = function (nMax) {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
            if (nCount > 0) {
                nCount = 3 - nCount;
            }
            nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
            if (nCount <= nMax) {
                nCount = nMax;
            }
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        MoreGameOperRequestTwo.prototype.panelScrollAni = function () {
        };
        MoreGameOperRequestTwo.prototype.onClickOper = function () {
            var _this = this;
            MiniManeger.instance.bFlagSpecialView = true;
            if (PlayerDataManager.bGlobEnterGame) {
                ViewManager.getInstance().showView(WeCatMoreGameView);
            }
            else {
                if (MoreGameOperRequestTwo.bGotoNextGame) {
                    var nSpCost = 1;
                    var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                    if (!b) {
                        TipsManager.getInstance().showDefaultTips("体力不足");
                        ViewChangeManager.getInstance().showBufferLoadingView();
                        ResUtil.getIntance().loadGroups(["adsp"], function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                ViewManager.getInstance().showView(AddPsView);
                                ViewChangeManager.getInstance().hideBufferLoadingView();
                                return [2];
                            });
                        }); });
                        return;
                    }
                    PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                    if (LevelManager.getInstance().nCurLevel >= BaseConst.infos.gameInfo.splevel
                        && BaseConst.infos.gameInfo.openPsAward == 1
                        && BaseConst.infos.gameInfo.for_pay == 1) {
                        ViewManager.getInstance().showView(SuccessfulEntryOneView);
                    }
                    else {
                        ViewChangeManager.getInstance().goToNextLevel();
                    }
                }
                else {
                    if (MoreGameOperRequestTwo.bOperFlag) {
                        if (MoreGameOperRequestTwo.bSuccess) {
                            if (BaseConst.infos.gameInfo.openPsAward == 1
                                && LevelManager.getInstance().nCurLevel >= BaseConst.infos.gameInfo.splevel
                                && BaseConst.infos.gameInfo.for_pay == 1) {
                                ViewManager.getInstance().showView(SuccessfulEntryOneView);
                            }
                            else {
                                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                            }
                        }
                        else {
                            ViewManager.getInstance().showView(FailEntryTwoView);
                        }
                    }
                }
                if (MoreGameOperRequestTwo.toHome) {
                    ViewChangeManager.getInstance().CurLevelBase.closeGameView();
                    PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
                    GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
                    LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getCurLevelToChallenge());
                }
                if (MoreGameOperRequestTwo.bReStartGame) {
                    PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, 1);
                    ViewChangeManager.getInstance().restartGame(true);
                }
            }
            this.removeSelf();
            Laya.timer.clearAll(this);
            MiniManeger.instance.showBannerAd();
            MoreGameOperRequestTwo.bOperFlag = false;
            MoreGameOperRequestTwo.bSuccess = false;
            MoreGameOperRequestTwo.bGotoNextGame = false;
            MoreGameOperRequestTwo.toHome = false;
            ViewChangeManager.getInstance().CommonView.visible = true;
        };
        MoreGameOperRequestTwo.bOperFlag = false;
        MoreGameOperRequestTwo.bSuccess = false;
        MoreGameOperRequestTwo.toHome = false;
        MoreGameOperRequestTwo.bGotoNextGame = false;
        MoreGameOperRequestTwo.bReStartGame = false;
        MoreGameOperRequestTwo.isOpen = false;
        return MoreGameOperRequestTwo;
    }(BaseSceneUISkinPopView));

    var MoreGameRandomGameBox713 = (function (_super) {
        __extends(MoreGameRandomGameBox713, _super);
        function MoreGameRandomGameBox713() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameOperRequest";
            _this.nStartY = 0;
            _this.bContinue = false;
            _this.scrollSizeMax = 50;
            _this.nTimePanel = 5000;
            _this.skin = "game/uiView/wecat/MoreGameRandomGameBox713.json";
            _this.nRandomIndxe = 0;
            _this.bAniOver = false;
            _this.nOpenNum = 0;
            return _this;
        }
        MoreGameRandomGameBox713.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.panel_gamelist.height = Laya.stage.height - (1920 - 1640);
        };
        MoreGameRandomGameBox713.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.bAniOver = true;
        };
        MoreGameRandomGameBox713.prototype.addEvent = function () {
            this.registerEvent(this.imageBtReturn, Laya.Event.CLICK, this.onBackTemp, this);
            this.registerEvent(this.imageBtConGame, Laya.Event.CLICK, this.onSpeical, this);
            this.panel_gamelist.on(Laya.Event.MOUSE_DOWN, this, this.mousedown);
            this.registerEvent(this.imageRandom, Laya.Event.CLICK, this.goToGameRandom, this);
        };
        MoreGameRandomGameBox713.prototype.mousedown = function (evt) {
            this.nStartY = evt.currentTarget.mouseY;
            var self = this;
            function mouseMove(evt1) {
                var nYTemp = self.nStartY - evt1.currentTarget.mouseY;
                self.moreGamePanel.y -= nYTemp;
                self.moreGamePanel2.y -= nYTemp;
                self.nStartY = evt1.currentTarget.mouseY;
                if (self.moreGamePanel.y >= 0 && self.moreGamePanel2.y >= 0) {
                    self.moreGamePanel.y = 0;
                    self.moreGamePanel2.y = self.moreGamePanel.height;
                }
            }
            function mouseUp(evt1) {
                this.panel_gamelist.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
                this.panel_gamelist.off(Laya.Event.MOUSE_UP, this, mouseUp);
            }
            this.panel_gamelist.on(Laya.Event.MOUSE_MOVE, this, mouseMove);
            this.panel_gamelist.on(Laya.Event.MOUSE_UP, this, mouseUp);
        };
        MoreGameRandomGameBox713.prototype.initPanel = function () {
        };
        MoreGameRandomGameBox713.prototype.initView = function () {
            this.nOpenNum += 1;
            MiniManeger.instance.bFlagSpecialView = false;
            MiniManeger.instance.hideBanner();
            Laya.timer.clear(this, this.onMove);
            ViewChangeManager.getInstance().CommonView.visible = false;
            this.initPanel();
            var nXStart = 0;
            var nYStart = 0;
            var nCount = 3;
            var aryInfo = [];
            aryInfo = this.getRandomIndex(18);
            this.moreGamePanel.removeChildren();
            this.moreGamePanel.y = 0;
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel.addChild(pWeCatMoreGameItemOne);
                    this.nTimePanel = (nYAdd + 1) * 1000;
                    this.moreGamePanel.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            this.moreGamePanel2.y = this.moreGamePanel.height;
            this.moreGamePanel2.removeChildren();
            for (var i = 0; i < aryInfo.length; ++i) {
                var pWeCatMoreGameItemOne = this.moreGamePanel2.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new MoreGameRandomGameBoxItem713(aryInfo[i]);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = nXStart + pWeCatMoreGameItemOne.width * nAddX + 30 * nAddX;
                    pWeCatMoreGameItemOne.y = nYStart + pWeCatMoreGameItemOne.height * nYAdd + 10 * nYAdd;
                    this.moreGamePanel2.addChild(pWeCatMoreGameItemOne);
                    this.nTimePanel = (nYAdd + 1) * 1000;
                    this.moreGamePanel2.height = pWeCatMoreGameItemOne.y + pWeCatMoreGameItemOne.height;
                }
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
            Laya.timer.frameLoop(1, this, this.onMove);
            if ((this.nOpenNum >= 2 || !PlayerDataManager.getInstance().bIsNewPlayer) && BaseConst.infos.gameInfo.openPsAward == 1) {
                this.timerChangerImage();
            }
            else {
                this.changeImage();
            }
        };
        MoreGameRandomGameBox713.prototype.timerChangerImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_2.png";
            this.bContinue = false;
            Laya.timer.clear(this, this.changeImage);
            Laya.timer.once(5000, this, this.changeImage);
        };
        MoreGameRandomGameBox713.prototype.changeImage = function () {
            this.imageBtConGame.skin = "resource/assets/img/wecat/box_button_3.png";
            this.bContinue = true;
        };
        MoreGameRandomGameBox713.prototype.onSpecialGotoGame = function () {
            if (PlayerDataManager.bGlobEnterGame) {
                ViewManager.getInstance().showView(WeCatMoreGameView);
                this.removeSelf();
                Laya.timer.clearAll(this);
                MoreGameRandomGameBox713.bOperFlag = false;
                MoreGameRandomGameBox713.bSuccess = false;
                MoreGameRandomGameBox713.bGotoNextGame = false;
                MoreGameRandomGameBox713.toHome = false;
                MoreGameRandomGameBox713.bEnterHotBox = false;
                MoreGameRandomGameBox713.bReStartGame = false;
                return;
            }
            this.onClickOper();
        };
        MoreGameRandomGameBox713.prototype.onSpeical = function () {
            if (this.bContinue) {
                this.onSpecialGotoGame();
            }
            else {
                this.goToGameRandom();
            }
        };
        MoreGameRandomGameBox713.prototype.onMove = function () {
            var nHight = this.moreGamePanel.height;
            this.moreGamePanel2.y -= 2;
            this.moreGamePanel.y -= 2;
            if (this.moreGamePanel.y <= -nHight) {
                this.moreGamePanel.y = this.moreGamePanel2.y + nHight;
            }
            if (this.moreGamePanel2.y <= -nHight) {
                this.moreGamePanel2.y = this.moreGamePanel.y + nHight;
            }
        };
        MoreGameRandomGameBox713.prototype.onBackTemp = function () {
            if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                ViewManager.getInstance().showView(MoreGameViewTemp);
            }
            else {
                MoreGameRandomGameBox713Temp.bSpecial = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        MoreGameRandomGameBox713.prototype.onBack = function () {
            MoreGameOperRequestTwo.bOperFlag = MoreGameRandomGameBox713.bOperFlag;
            MoreGameOperRequestTwo.bSuccess = MoreGameRandomGameBox713.bSuccess;
            MoreGameOperRequestTwo.bGotoNextGame = MoreGameRandomGameBox713.bGotoNextGame;
            MoreGameOperRequestTwo.toHome = MoreGameRandomGameBox713.toHome;
            MoreGameOperRequestTwo.bReStartGame = MoreGameRandomGameBox713.bReStartGame;
            MiniManeger.instance.bFlagSpecialView = false;
            ViewManager.getInstance().showView(MoreGameOperRequestTwo);
            this.removeSelf();
            Laya.timer.clearAll(this);
            MoreGameRandomGameBox713.bOperFlag = false;
            MoreGameRandomGameBox713.bSuccess = false;
            MoreGameRandomGameBox713.bGotoNextGame = false;
            MoreGameRandomGameBox713.toHome = false;
            MoreGameRandomGameBox713.bEnterHotBox = false;
            MoreGameRandomGameBox713.bReStartGame = false;
        };
        MoreGameRandomGameBox713.prototype.goToGame = function () {
        };
        MoreGameRandomGameBox713.prototype.getRandomIndex = function (nMax) {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = GameData.getInstance().weCatMiniIconsInfo.length % 3;
            if (nCount > 0) {
                nCount = 3 - nCount;
            }
            nCount = GameData.getInstance().weCatMiniIconsInfo.length + nCount;
            if (nCount <= nMax) {
                nCount = nMax;
            }
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        MoreGameRandomGameBox713.prototype.panelScrollAni = function () {
        };
        MoreGameRandomGameBox713.prototype.onClickOper = function () {
            var _this = this;
            if (!MoreGameRandomGameBox713.bEnterHotBox) {
                MiniManeger.instance.bFlagSpecialView = true;
                if (MoreGameRandomGameBox713.bGotoNextGame) {
                    var nSpCost = 1;
                    var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                    if (!b) {
                        TipsManager.getInstance().showDefaultTips("体力不足");
                        ViewChangeManager.getInstance().showBufferLoadingView();
                        ResUtil.getIntance().loadGroups(["adsp"], function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                ViewManager.getInstance().showView(AddPsView);
                                ViewChangeManager.getInstance().hideBufferLoadingView();
                                return [2];
                            });
                        }); });
                        return;
                    }
                    PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
                    if (PlayerDataManager.getInstance().getCurLevel() < BaseConst.infos.gameInfo.splevel
                        || BaseConst.infos.gameInfo.openPsAward == 0) {
                        ViewChangeManager.getInstance().goToNextLevel();
                    }
                    else {
                        ViewManager.getInstance().showView(SuccessfulEntryOneView);
                    }
                }
                else {
                    if (MoreGameRandomGameBox713.bOperFlag) {
                        if (MoreGameRandomGameBox713.bSuccess) {
                            if (BaseConst.infos.gameInfo.openPsAward == 1
                                && PlayerDataManager.getInstance().getCurLevel() >= BaseConst.infos.gameInfo.splevel
                                && BaseConst.infos.gameInfo.for_pay == 1) {
                                ViewManager.getInstance().showView(SuccessfulEntryOneView);
                            }
                            else {
                                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                            }
                        }
                        else {
                            ViewManager.getInstance().showView(FailEntryTwoView);
                        }
                    }
                }
                if (MoreGameRandomGameBox713.toHome) {
                    ViewChangeManager.getInstance().CurLevelBase.closeGameView();
                    PlayerDataManager.getInstance().setCurLevel(PlayerDataManager.getInstance().getCurLevelMax());
                    GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
                    LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getCurLevelToChallenge());
                }
                ViewChangeManager.getInstance().CommonView.visible = true;
            }
            else {
                this.onBack();
            }
            this.removeSelf();
            Laya.timer.clearAll(this);
            MiniManeger.instance.showBannerAd();
            MoreGameRandomGameBox713.bOperFlag = false;
            MoreGameRandomGameBox713.bSuccess = false;
            MoreGameRandomGameBox713.bGotoNextGame = false;
            MoreGameRandomGameBox713.toHome = false;
            MoreGameRandomGameBox713.bEnterHotBox = false;
            MoreGameRandomGameBox713.bReStartGame = false;
        };
        MoreGameRandomGameBox713.prototype.goToGameRandom = function () {
            this.aryCatMiniIconsInfoTemp = GameData.getInstance().weCatMiniIconsInfo;
            if (this.aryCatMiniIconsInfoTemp.length <= 0) {
                return;
            }
            this.nRandomIndxe = Utils.random(0, this.aryCatMiniIconsInfoTemp.length - 1);
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id);
            }
            var self = this;
            var stData = this.aryCatMiniIconsInfoTemp[this.nRandomIndxe].ad_id;
            var data = {
                appId: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].ad_appid,
                path: this.aryCatMiniIconsInfoTemp[self.nRandomIndxe].url,
                success: function () {
                    console.log("navigateToMiniProgram success");
                    if (BaseConst.infos.gameInfo.isDY) {
                        console.log("self.nIndex = ", stData);
                        PlatformDY.toGame(stData.ad_id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    MoreGameRandomGameBox713Temp.bSpecial = true;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            };
            platform.navigateToMiniProgram(data);
        };
        MoreGameRandomGameBox713.bOperFlag = false;
        MoreGameRandomGameBox713.bSuccess = false;
        MoreGameRandomGameBox713.toHome = false;
        MoreGameRandomGameBox713.bGotoNextGame = false;
        MoreGameRandomGameBox713.bEnterHotBox = false;
        MoreGameRandomGameBox713.bReStartGame = false;
        MoreGameRandomGameBox713.nEnterCount = 0;
        return MoreGameRandomGameBox713;
    }(PopBaseScene));

    var GameManager = (function () {
        function GameManager() {
            this.isMiniGame = false;
            this.curLevel = 0;
        }
        Object.defineProperty(GameManager, "instance", {
            get: function () {
                if (this.ins == null) {
                    this.ins = new GameManager();
                }
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });
        GameManager.prototype.openLevelVideo = function (success) {
            if (DeviceUtil.isQQMiniGame()) {
                var nCul = this.curLevel;
                if (GameData.getInstance().gameQQInfo.showLevelOverViewoOpen.indexOf(nCul) > -1) {
                    MiniManeger.instance.playViderAd({
                        successFun: function () {
                            success && success();
                        }, failFun: function () {
                            success && success();
                        }, errorFun: function () {
                            success && success();
                        }
                    });
                }
                else {
                    success && success();
                }
            }
            else {
                success && success();
            }
        };
        GameManager.prototype.selAddLottery = function (box_content) {
            var self = this;
            if (DeviceUtil.isQQMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1) {
                MiniManeger.instance.showBoxAd(function () {
                    self.addLotteryScene(box_content);
                });
            }
            else if ((DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1)) {
                self.addLotteryScene(box_content);
            }
        };
        GameManager.prototype.addLotteryScene = function (box_content) {
            var self = this;
            if (self.selLotteryScene == null) {
                self.selLotteryScene = new LotterySelScene(null);
            }
            else {
                self.selLotteryScene.initView();
            }
            box_content.visible = true;
            box_content.addChild(self.selLotteryScene);
        };
        GameManager.prototype.parseShopTimeShow = function (time, en) {
            var min = time / 60;
            var hour = min / 60;
            var day = hour / 24;
            var str = '';
            if (day >= 1) {
                str = day.toFixed(2) + '天';
            }
            else if (hour >= 1) {
                str = hour.toFixed(2) + '小时';
            }
            else {
                str = min.toFixed(2) + '分钟';
            }
            if (en) {
                str = str.replace("天", 'day');
                str = str.replace("小时", 'hour');
                str = str.replace("分钟", 'min');
            }
            return str;
        };
        GameManager.prototype.loadCongigs = function (url) {
            var _this = this;
            return new Promise(function (resolve) {
                var jsonUrl = url;
                Laya.loader.load(jsonUrl, Laya.Handler.create(_this, function (res) {
                    if (typeof (res) == "string") {
                        res = JSON.parse(res);
                    }
                    resolve(Utils.copy(res));
                }));
            });
        };
        GameManager.prototype.goToDuyou = function (_nIndex) {
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_id);
            }
            var objData = {
                appId: GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_appid,
                path: GameData.getInstance().weCatMiniIconsInfo[_nIndex].url,
                success: function () {
                    console.log("navigateToMiniProgram success!");
                    if (BaseConst.infos.gameInfo.isDY) {
                        console.log("self.nIndex = ", _nIndex);
                        PlatformDY.toGame(GameData.getInstance().weCatMiniIconsInfo[_nIndex].ad_id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    if (DeviceUtil.isWXMiniGame()) {
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                    }
                }
            };
            platform.navigateToMiniProgram(objData);
        };
        return GameManager;
    }());
    window['GameManager'] = GameManager;

    var LevelViewItem = (function (_super) {
        __extends(LevelViewItem, _super);
        function LevelViewItem(data_) {
            var _this = _super.call(this) || this;
            _this.className_key = "LevelViewItem";
            _this.nCurLeve = data_;
            _this.skin = "game/uiView/LevelIndexView.json";
            _this.width = 318;
            _this.height = 329;
            _this.pivotX = 318 / 2;
            _this.pivotY = 329 / 2;
            return _this;
        }
        LevelViewItem.prototype.onEnable = function () {
            this.on(Laya.Event.CLICK, this, this.enterLevel);
        };
        LevelViewItem.prototype.onDisable = function () {
            this.off(Laya.Event.CLICK, this, this.enterLevel);
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this.openLevelItemAni);
        };
        LevelViewItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        LevelViewItem.prototype.childrenCreated = function () {
            this.refreshView();
        };
        LevelViewItem.prototype.refreshView = function () {
            this.spG.visible = false;
            this.bAni = false;
            BitmapLabelUtils.setLabel(this.levelNum, this.nCurLeve.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "center");
            if (this.nCurLeve <= PlayerDataManager.getInstance().getCurLevelMax()) {
                this.spG.visible = true;
                this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_1.png");
            }
            else if (this.nCurLeve == PlayerDataManager.getInstance().getLevelToChangeMaxLevelForLevelView()) {
                this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_2.png");
                this.bAni = true;
            }
            else {
                this.spBg.loadImage("resource/assets/img/ui/levelview/level_baseboard_3.png");
            }
            this.openLevelItemAni();
        };
        LevelViewItem.prototype.setData = function (data_) {
            this.nCurLeve = data_;
            this.refreshView();
        };
        LevelViewItem.prototype.enterLevel = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (this.nCurLeve > PlayerDataManager.getInstance().getLevelToChangeMaxLevelForLevelView()) {
                TipsManager.getInstance().showDefaultTips("未解锁");
                return;
            }
            var nSpCost = 1;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nSpCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (!b) {
                TipsManager.getInstance().showDefaultTips("体力不足");
                ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], function () {
                    ViewManager.getInstance().showView(AddPsView);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                });
                return;
            }
            PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            ViewChangeManager.getInstance().gotoLevel(this.nCurLeve);
            this.pParentView.closeViewWhenGoToLevel();
        };
        LevelViewItem.prototype.setParentView = function (pParentView) {
            this.pParentView = pParentView;
        };
        LevelViewItem.prototype.openLevelItemAni = function () {
            var _this = this;
            if (this.nCurLeve == PlayerDataManager.getInstance().getLevelToChangeMaxLevel() && this.bAni) {
                Laya.Tween.clearAll(this);
                Laya.Tween.to(this, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                    Laya.Tween.to(_this, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                        Laya.timer.once(0, _this, _this.openLevelItemAni);
                    }));
                }));
            }
            else {
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this.openLevelItemAni);
            }
        };
        return LevelViewItem;
    }(BaseSceneUISkin));

    var LevelView = (function (_super) {
        __extends(LevelView, _super);
        function LevelView() {
            var _this = _super.call(this) || this;
            _this.className_key = "LevelView";
            _this.skin = "game/uiView/LevelView.json";
            return _this;
        }
        LevelView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        LevelView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.levelPanel.vScrollBarSkin = "";
            this.levelPanel.elasticEnabled = true;
            this.levelPanel.vScrollBar.elasticDistance = 130;
        };
        LevelView.prototype.onAddStage = function () {
            MiniManeger.instance.showInterstitialAd();
            ViewChangeManager.getInstance().CommonView.visible = false;
            this.initView();
            this.addEvent();
            MiniManeger.instance.showBannerAd();
        };
        LevelView.prototype.onRemoved = function () {
            this.removeEvent();
        };
        LevelView.prototype.addEvent = function () {
            this.imageBtHome.on(Laya.Event.CLICK, this, this.levelViewReturnToHome);
        };
        LevelView.prototype.removeEvent = function () {
            this.imageBtHome.off(Laya.Event.CLICK, this, this.levelViewReturnToHome);
        };
        LevelView.prototype.initView = function () {
            var xStart = 21 + 318 / 2;
            var xAdd = 42 + 318;
            var yStart = 329 / 2;
            var yAdd = 329 + 35;
            for (var i = 0, len = PlayerDataManager.getInstance().nMaxLevelCount; i < len; i++) {
                var item = this.levelBox.getChildAt(i);
                if (item) {
                    item.setData(i + 1);
                }
                else {
                    item = new LevelViewItem(i + 1);
                    item.x = (i % 3) * xAdd + xStart;
                    item.y = Math.floor(i / 3) * yAdd + yStart;
                    this.levelBox.addChild(item);
                }
                item.setParentView(this);
            }
            MiniManeger.instance.hideBlockAd();
        };
        LevelView.prototype.levelViewReturnToHome = function () {
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().CommonView.visible = true;
            MiniManeger.instance.showBlockAd();
            this.removeSelf();
        };
        LevelView.prototype.closeViewWhenGoToLevel = function () {
            ViewChangeManager.getInstance().CommonView.visible = true;
            this.removeSelf();
            LevelView.pHomeView.removeSelf();
        };
        return LevelView;
    }(BaseSceneUISkinPopView));

    var SignView = (function (_super) {
        __extends(SignView, _super);
        function SignView() {
            var _this = _super.call(this) || this;
            _this.className_key = "SignView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.bIsRunning = false;
            _this.skin = "game/uiView/SignView.json";
            return _this;
        }
        SignView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initView();
        };
        SignView.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.addEvent();
            this.initView();
            MiniManeger.instance.showBannerAd();
        };
        SignView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.bIsRunning = false;
            Laya.Tween.clearAll(this.imageBtSign);
            Laya.timer.clearAll(this);
        };
        SignView.prototype.initView = function () {
            this.nCurTime = 0;
            this.bDouble = false;
            this.bIsRunning = true;
            this.refreshSignData();
            this.refreshSignView();
            this.refreshSignRecvBt();
            this.initDouble();
            MiniManeger.instance.hideBlockAd();
        };
        SignView.prototype.addEvent = function () {
            this.imageBtSign.on(Laya.Event.CLICK, this, this.onClick);
            this.spBtClose.on(Laya.Event.CLICK, this, this.onClick);
            this.boxDouble.on(Laya.Event.CLICK, this, this.onClick);
        };
        SignView.prototype.removeEvent = function () {
            this.imageBtSign.off(Laya.Event.CLICK, this, this.onClick);
            this.spBtClose.off(Laya.Event.CLICK, this, this.onClick);
            this.boxDouble.off(Laya.Event.CLICK, this, this.onClick);
        };
        SignView.prototype.onClick = function (evt) {
            var _this = this;
            SoundManager.getInstance().playEffect("button", 1);
            switch (evt.currentTarget) {
                case this.spBtClose:
                    if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.signCloseVideoOpen) {
                        MiniManeger.instance.playViderAd({
                            successFun: function () {
                                _this.removeSelf();
                            }
                        });
                    }
                    else {
                        this.removeSelf();
                    }
                    break;
                case this.imageBtSign:
                    this.onSigned();
                    break;
                case this.boxDouble:
                    this.onSignedDouble();
                    break;
            }
        };
        SignView.prototype.removeSelf = function () {
            MiniManeger.instance.showBlockAd();
            return _super.prototype.removeSelf.call(this);
        };
        SignView.prototype.onSignedDouble = function () {
            if (DeviceUtil.isQQMiniGame() && GameData.getInstance().gameQQInfo.signDoubleVideoOpen) {
                MiniManeger.instance.playViderAd({});
            }
            this.spDouble.visible = !this.spDouble.visible;
            this.bDouble = this.spDouble.visible;
        };
        SignView.prototype.refreshSignData = function () {
            this.nCurTime = GameLogicProcessingManager.GetCurTime();
            if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, this.nCurTime)) {
                this.btDouble.visible = false;
                return;
            }
            if (PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex >= 7) {
                PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex = 0;
            }
        };
        SignView.prototype.refreshSignView = function () {
            var arySignData = ConfigManager.getInstance().getSignDataAll();
            var nLen = arySignData.length;
            var stImageTemp = null;
            var stSpriteGoods = null;
            for (var i = 0; i < nLen; ++i) {
                stImageTemp = this.boxItem.getChildAt(i);
                if (stImageTemp) {
                    if (i < 6) {
                        stSpriteGoods = stImageTemp.getChildAt(2);
                        if (stSpriteGoods) {
                            if (arySignData[i].nType == 1) {
                                stSpriteGoods.loadImage("resource/assets/img/common/maininterface_icon_7.png");
                            }
                            else if (arySignData[i].nType == 2) {
                                stSpriteGoods.loadImage("resource/assets/img/common/maininterface_icon_6.png");
                            }
                        }
                        var stBox = stImageTemp.getChildByName("boxWorld");
                        if (stBox) {
                            var spNum = stBox.getChildByName("spWorld");
                            if (spNum) {
                                BitmapLabelUtils.setLabel(spNum, arySignData[i].nCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                            }
                        }
                    }
                    else {
                        BitmapLabelUtils.setLabel(this.spWorldLeft, arySignData[i].nCount.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                        BitmapLabelUtils.setLabel(this.spWorldRight, arySignData[i].nCount7.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
                    }
                    var spSigned = stImageTemp.getChildByName("spSigned");
                    if (spSigned) {
                        if (i < PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex) {
                            spSigned.visible = true;
                        }
                        else {
                            spSigned.visible = false;
                        }
                    }
                }
            }
        };
        SignView.prototype.initDouble = function () {
            if (BaseConst.infos.gameInfo.double && BaseConst.infos.gameInfo.double == 1) {
                this.spDouble.visible = true;
            }
            else {
                this.spDouble.visible = false;
            }
            if (DeviceUtil.isQQMiniGame()) {
                if (Math.random() < BaseConst.infos.gameInfo.siginC) {
                    this.spDouble.visible = true;
                }
                else {
                    this.spDouble.visible = false;
                }
            }
            this.bDouble = this.spDouble.visible;
        };
        SignView.prototype.refreshSignRecvBt = function () {
            this.nCurTime = GameLogicProcessingManager.GetCurTime();
            this.boxDouble.visible = true;
            this.btDouble.visible = true;
            this.spTomorrow.visible = true;
            this.imageBtSign.visible = true;
            if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast, this.nCurTime)) {
                this.boxDouble.visible = false;
                this.btDouble.visible = false;
                this.imageBtSign.visible = false;
            }
            else {
                this.spTomorrow.visible = false;
                this.startSignImageBtShareAni();
            }
        };
        SignView.prototype.onSigned = function () {
            if (this.bDouble) {
                this.imageBtSign.off(Laya.Event.CLICK, this, this.onClick);
                var self_1 = this;
                MiniManeger.instance.playViderAd({
                    successFun: function () {
                        self_1.procSignedData();
                        self_1.imageBtSign.on(Laya.Event.CLICK, self_1, self_1.onClick);
                    },
                    failFun: function () {
                        self_1.imageBtSign.on(Laya.Event.CLICK, self_1, self_1.onClick);
                    },
                    errorFun: function () {
                        self_1.imageBtSign.on(Laya.Event.CLICK, self_1, self_1.onClick);
                    }
                });
            }
            else {
                this.procSignedData();
            }
        };
        SignView.prototype.procSignedData = function () {
            var stSignData = ConfigManager.getInstance().getSignDataBySignID(PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex);
            if (stSignData) {
                var nValue = stSignData.nCount;
                if (this.bDouble) {
                    nValue *= 2;
                }
                PlayerDataManager.getInstance().AddGoods(stSignData.nType, nValue);
                if (stSignData.nType == GoodsType.enum_GoodsType_Sp) {
                    TipsManager.getInstance().showDefaultTips("体力+" + nValue.toString());
                }
                if (PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex == 6) {
                    var nValue_1 = stSignData.nCount7;
                    if (this.bDouble) {
                        nValue_1 *= 2;
                    }
                    PlayerDataManager.getInstance().AddGoods(stSignData.nType7, nValue_1);
                }
            }
            PlayerDataManager.getInstance().stPlayerDataBase.nSignIndex += 1;
            PlayerDataManager.getInstance().stPlayerDataBase.nSignTimeLast = GameLogicProcessingManager.GetCurTime();
            PlayerDataManager.getInstance().SaveData();
            this.refreshSignView();
            this.refreshSignRecvBt();
        };
        SignView.prototype.startSignImageBtShareAni = function () {
            var _this = this;
            if (!this.bIsRunning && this.imageBtSign.visible) {
                return;
            }
            Laya.Tween.clearAll(this.imageBtSign);
            Laya.Tween.to(this.imageBtSign, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageBtSign, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startSignImageBtShareAni);
                }));
            }));
        };
        return SignView;
    }(BaseSceneUISkinPopView));

    var InviteItem = (function (_super) {
        __extends(InviteItem, _super);
        function InviteItem(_data) {
            var _this = _super.call(this) || this;
            _this.className_key = "InviteItem";
            _this.data = _data;
            _this.skin = "game/uiView/InviteFriendsIndexView.json";
            return _this;
        }
        InviteItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        InviteItem.prototype.adaptationStage = function () {
            this.size(735, 128);
        };
        InviteItem.prototype.onAddStage = function () {
            if (this.isCreate) {
                this.initView();
                this.addEvent();
            }
        };
        InviteItem.prototype.addEvent = function () {
            this.img_get.on(Laya.Event.CLICK, this, this.onGet);
            this.img_null.on(Laya.Event.CLICK, this, this.onInvite);
        };
        InviteItem.prototype.setData = function (data) {
            this.data = data;
            if (this.isCreate) {
                this.initView();
            }
        };
        InviteItem.prototype.initView = function () {
            if (!this.data)
                return;
            var data = this.data;
            this.img_get.visible = this.img_no.visible = false;
            BitmapLabelUtils.setLabel(this.img_index, data.id + "", "resource/assets/img/ui/invite/invite_number1/invite_number1_", -10, ".png", "center");
            if (data.head && data.head != "") {
                this.img_head.skin = data.head;
            }
            else {
                this.img_head.skin = "";
            }
            BitmapLabelUtils.setLabel(this.img_award, data.reward + "", "resource/assets/img/common/level_number12/level_number1_", 0);
            if (data.lingqued) {
                this.img_get.visible = true;
                this.img_get.mouseEnabled = false;
                this.img_get.skin = "resource/assets/img/ui/invite/invite_button_2.png";
                this.img_null.visible = false;
                this.img_head.visible = true;
            }
            else {
                if (data.canLingqu) {
                    this.img_get.visible = true;
                    this.img_get.mouseEnabled = true;
                    this.img_get.skin = "resource/assets/img/ui/invite/invite_button_1.png";
                    this.img_null.visible = false;
                    this.img_head.visible = true;
                }
                else {
                    this.img_no.visible = true;
                    this.img_null.visible = true;
                    this.img_head.visible = false;
                }
            }
        };
        InviteItem.prototype.onGet = function () {
            SoundManager.getInstance().playEffect("button", 1);
            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Sp, this.data.reward);
            PlayerDataManager.getInstance().stPlayerDataBase.inviteId.push(this.data.id);
            PlayerDataManager.getInstance().SaveData();
            EventMgr.getInstance().sendEvent(GameEvent.REFRESH_INVITE);
        };
        InviteItem.prototype.onInvite = function () {
        };
        InviteItem.prototype.removeEvent = function () {
            this.img_get.off(Laya.Event.CLICK, this, this.onGet);
            this.img_null.off(Laya.Event.CLICK, this, this.onInvite);
        };
        InviteItem.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.data = null;
            this.removeEvent();
        };
        return InviteItem;
    }(BaseSceneUISkin));

    var InviteView = (function (_super) {
        __extends(InviteView, _super);
        function InviteView() {
            var _this = _super.call(this) || this;
            _this.className_key = "InviteView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;
            _this.skin = "game/uiView/InviteFriendsView.json";
            return _this;
        }
        InviteView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.boxInva.removeChildren();
            this.panelInva.vScrollBarSkin = "";
            this.panelInva.elasticEnabled = true;
            this.panelInva.vScrollBar.elasticDistance = 100;
            this.panelInva.vScrollBar.elasticBackTime = 100;
        };
        InviteView.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            if (this.isCreate) {
                this.initView();
                this.addEvent();
            }
            MiniManeger.instance.showBannerAd();
        };
        InviteView.prototype.addEvent = function () {
            this.btn_close.on(Laya.Event.CLICK, this, this.onClose);
            this.imageBtInvite.on(Laya.Event.CLICK, this, this.onInvite);
            EventMgr.getInstance().addEvent(GameEvent.REFRESH_INVITE, this, this.refreshUI);
        };
        InviteView.prototype.initView = function () {
            this.getInvitePlayer();
            MiniManeger.instance.hideBlockAd();
        };
        InviteView.prototype.getInvitePlayer = function () {
            var _this = this;
            InviteManager.getInstance().selectInfo(function (code) {
                if (code == '0') {
                    _this.refreshUI();
                }
            }, this);
        };
        InviteView.prototype.refreshUI = function () {
            var dataArr = InviteManager.getInstance().getInviteAwardData();
            console.log("InviteView >>>>>>> refreshUI", dataArr);
            for (var i = 0, len = dataArr.length; i < len; i++) {
                var item = this.boxInva.getChildAt(i);
                if (item) {
                    item.setData(dataArr[i]);
                }
                else {
                    item = new InviteItem(dataArr[i]);
                    item.x = 0;
                    item.y = (128 + 20) * i;
                    this.boxInva.addChild(item);
                }
            }
        };
        InviteView.prototype.onInvite = function () {
            SoundManager.getInstance().playEffect("button", 1);
            MiniManeger.instance.bFlagDouYin = false;
            MiniManeger.instance.shareAppMessage();
        };
        InviteView.prototype.onClose = function () {
            this.removeEvent();
            SoundManager.getInstance().playEffect("button", 1);
            MiniManeger.instance.showBlockAd();
            this.removeUs();
        };
        InviteView.prototype.removeEvent = function () {
            this.btn_close.off(Laya.Event.CLICK, this, this.onClose);
            this.imageBtInvite.off(Laya.Event.CLICK, this, this.onInvite);
            EventMgr.getInstance().removeEvent(GameEvent.REFRESH_INVITE, this, this.refreshUI);
        };
        InviteView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        return InviteView;
    }(BaseSceneUISkinPopView));

    var NativeBrige = (function () {
        function NativeBrige() {
        }
        NativeBrige.getInstance = function () {
            if (!NativeBrige.instance) {
                NativeBrige.instance = new NativeBrige();
            }
            return NativeBrige.instance;
        };
        NativeBrige.prototype.callByNative = function (msgJsonObj) {
            console.log("NativeBrige callByNative : " + JSON.stringify(msgJsonObj));
            switch (msgJsonObj.msg) {
                case NativeMsg.toStop:
                    SoundManager.getInstance().playBgMusic();
                    if (ViewChangeManager.bGameOpen) {
                        if (ViewChangeManager.getInstance().CurLevelBase) {
                            ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                        }
                    }
                    break;
                case NativeMsg.toGame:
                    SoundManager.getInstance().pauseBgm();
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
                    }
                    break;
                case NativeMsg.getDeviceNo:
                    if (this.getDeviceNoCall) {
                        this.getDeviceNoCall();
                    }
                    break;
                case NativeMsg.copyStr:
                    if (this.copyStrCall) {
                        this.copyStrCall(msgJsonObj);
                    }
                    break;
                case NativeMsg.loginSucc:
                    if (this.loginSucc) {
                        this.loginSucc(msgJsonObj);
                    }
                    break;
                case NativeMsg.outLogin:
                    break;
                case NativeMsg.userInfo:
                    this.rhUserInfo = msgJsonObj.data;
                    break;
                case NativeMsg.showAccountCenter:
                    if (this.showAccountCenterCall) {
                        this.showAccountCenterCall(msgJsonObj);
                    }
                    break;
                case NativeMsg.pay:
                    if (this.payCall) {
                        this.payCall(msgJsonObj);
                    }
                    break;
                case NativeMsg.changeUser:
                    break;
                case NativeMsg.ShowAdView:
                    switch (msgJsonObj.data) {
                        case "onAdLoaded": break;
                        case "onAdFailedToLoad": break;
                        case "onAdOpened": break;
                        case "onAdClicked": break;
                        case "onAdLeftApplication": break;
                        case "onAdClosed": break;
                    }
                    break;
                case NativeMsg.ShowAdVideo:
                    switch (msgJsonObj.data) {
                        case "RewardedAdNotLoaded":
                            NativeMgr.getInstance().videoAdErrorCallFunc();
                            break;
                        case "onRewardedAdLoaded": break;
                        case "onRewardedAdFailedToLoad": break;
                        case "onRewardedAdOpened": break;
                        case "onRewardedAdClosed":
                            NativeMgr.getInstance().videoAdCloseCallFunc();
                            break;
                        case "onUserEarnedReward": break;
                        case "onRewardedAdFailedToShow":
                            NativeMgr.getInstance().videoAdErrorCallFunc();
                            break;
                    }
                    break;
                case NativeMsg.ShowInterstitialAd:
                    switch (msgJsonObj.data) {
                        case "AdNotLoaded":
                            NativeMgr.getInstance().interstitialAdCloseCallFunc();
                            break;
                        case "onAdLoaded": break;
                        case "onAdFailedToLoad": break;
                        case "onAdOpened": break;
                        case "onAdLeftApplication": break;
                        case "onAdClosed":
                            NativeMgr.getInstance().interstitialAdCloseCallFunc();
                            break;
                    }
                    break;
            }
        };
        NativeBrige.prototype.sendToNative = function (msgJson) {
            window["loadingView"].sendToNative(msgJson);
        };
        return NativeBrige;
    }());
    var NativeMsg = (function () {
        function NativeMsg() {
        }
        NativeMsg.toStop = "toStop";
        NativeMsg.toGame = "toGame";
        NativeMsg.getDeviceNo = "getDeviceNo";
        NativeMsg.copyStr = "copyStr";
        NativeMsg.loginSucc = "loginSucc";
        NativeMsg.goLogin = "goLogin";
        NativeMsg.outLogin = "outLogin";
        NativeMsg.userInfo = "userInfo";
        NativeMsg.showAccountCenter = "showAccountCenter";
        NativeMsg.createUser = "createUser";
        NativeMsg.enterGame = "enterGame";
        NativeMsg.roleUpLevel = "roleUpLevel";
        NativeMsg.pay = "pay";
        NativeMsg.changeUser = "changeUser";
        NativeMsg.ShowAdView = "ShowAdView";
        NativeMsg.ShowAdVideo = "ShowAdVideo";
        NativeMsg.ShowInterstitialAd = "ShowInterstitialAd";
        return NativeMsg;
    }());

    var NativeMgr = (function () {
        function NativeMgr() {
        }
        NativeMgr.getInstance = function () {
            if (!NativeMgr.instance) {
                NativeMgr.instance = new NativeMgr();
            }
            return NativeMgr.instance;
        };
        NativeMgr.prototype.showAdView = function () {
            var msgJSon = {
                msg: NativeMsg.ShowAdView,
                data: "show"
            };
            NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
        };
        NativeMgr.prototype.interstitialAdCloseCallFunc = function () {
            this.interstitialAdCloseCall && this.interstitialAdCloseCall();
            this.interstitialAdCloseCall = null;
            ViewChangeManager.getInstance().hideBufferLoadingView();
            console.log("插屏广告关闭回调--");
        };
        NativeMgr.prototype.createInterstitialAd = function () {
            ViewChangeManager.getInstance().showBufferLoadingView();
            var msgJSon = {
                msg: NativeMsg.ShowInterstitialAd,
                data: "create"
            };
            NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
        };
        NativeMgr.prototype.showInterstitialAd = function (closeCall) {
            if (closeCall === void 0) { closeCall = null; }
            ViewChangeManager.getInstance().showBufferLoadingView();
            var msgJSon = {
                msg: NativeMsg.ShowInterstitialAd,
                data: "show"
            };
            NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
            this.interstitialAdCloseCall = closeCall;
        };
        NativeMgr.prototype.videoAdCloseCallFunc = function () {
            this.videoAdCloseCall && this.videoAdCloseCall();
            this.videoAdCloseCall = null;
            ViewChangeManager.getInstance().hideBufferLoadingView();
            console.log("视频广告关闭回调--");
        };
        NativeMgr.prototype.videoAdErrorCallFunc = function () {
            this.videoAdErrorCall && this.videoAdErrorCall();
            this.videoAdErrorCall = null;
            ViewChangeManager.getInstance().hideBufferLoadingView();
            console.log("视频广告加载错误回调--");
        };
        NativeMgr.prototype.showVideoAd = function (closeCall, errorCall) {
            if (closeCall === void 0) { closeCall = null; }
            if (errorCall === void 0) { errorCall = null; }
            ViewChangeManager.getInstance().showBufferLoadingView();
            var msgJSon = {
                msg: NativeMsg.ShowAdVideo,
                data: "show"
            };
            NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
            this.videoAdCloseCall = closeCall;
            this.videoAdErrorCall = errorCall;
        };
        return NativeMgr;
    }());

    var LotteryScene = (function (_super) {
        __extends(LotteryScene, _super);
        function LotteryScene(data) {
            var _this = _super.call(this, data) || this;
            _this.className_key = "LotteryScene";
            _this.versionRandom = "";
            _this.lotteryData = [
                { "id": "3", "item": "0|0", "des": "再来一次", "worth": "2000" },
                { "id": "4", "item": "2|200", "des": "200金币", "worth": "1000" },
                { "id": "5", "item": "1|6", "des": "6体力", "worth": "500" },
                { "id": "6", "item": "0|0", "des": "感谢参与", "worth": "1500" },
                { "id": "7", "item": "2|150", "des": "150金币", "worth": "1000" },
                { "id": "8", "item": "1|4", "des": "4体力", "worth": "500" },
                { "id": "1", "item": "2|50", "des": "50金币", "worth": "2000" },
                { "id": "2", "item": "1|2", "des": "2体力", "worth": "1500" }
            ];
            _this.isLotterying = false;
            _this.tn = 5;
            _this.totalNum = 8;
            _this.needVideo = false;
            _this.versionRandom = "?v=" + Date.now();
            _this.skin = "game/uiView/lottery/LotteryScene.json";
            return _this;
        }
        LotteryScene.prototype.getLotteryConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            Laya.loader.load("resource/assets/config/LotteryConfig.json" + _this.versionRandom, Laya.Handler.create(_this, function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.lotteryData = Utils.copy(data);
                                    resolve(data);
                                    return [2];
                                });
                            }); }));
                        })];
                });
            });
        };
        LotteryScene.prototype.initLottery = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, len;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getLotteryConfig()];
                        case 1:
                            _a.sent();
                            if (!this.weightArr) {
                                this.weightArr = [];
                                for (i = 0, len = this.lotteryData.length; i < len; i++) {
                                    this.weightArr.push(parseInt(this.lotteryData[i].worth));
                                }
                            }
                            return [2];
                    }
                });
            });
        };
        LotteryScene.prototype.getRandomByWeightArr = function (oArr) {
            var sum = 0;
            var rand = 0;
            var result = 0;
            for (var i in oArr) {
                sum += Number(oArr[i]);
            }
            for (var i in oArr) {
                rand = Math.floor(Math.random() * sum + 1);
                if (oArr[i] >= rand) {
                    result = Number(i);
                    break;
                }
                else {
                    sum -= oArr[i];
                }
            }
            return result;
        };
        LotteryScene.prototype.onLottery = function () {
            if (this.isLotterying) {
                return;
            }
            this.isLotterying = true;
            var awardIndex = this.getRandomByWeightArr(this.weightArr);
            this.startLottery(awardIndex);
            PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast = Date.now();
            PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount += 1;
            PlayerDataManager.getInstance().SaveData();
        };
        LotteryScene.prototype.clickLottery = function () {
            var _this = this;
            if (this.needVideo) {
                if (this.isLotterying) {
                    return;
                }
                MiniManeger.instance.playViderAd({
                    successFun: function () {
                        _this.onLottery();
                    }
                });
            }
            else {
                this.onLottery();
            }
        };
        LotteryScene.prototype.startLottery = function (index) {
            var _this = this;
            this.img_lottery.rotation = this.img_lottery.rotation % 360;
            var ro = Utils.random(-10, 10);
            Laya.Tween.clearAll(this.img_lottery);
            console.log(index);
            var roa = -index * 360 / this.totalNum - (360 / this.totalNum / 2) + 3600;
            var timeDelay = 1400 * this.tn;
            Laya.Tween.to(this.img_lottery, { rotation: roa }, timeDelay, Laya.Ease.strongInOut, Laya.Handler.create(this, function () {
                Laya.Tween.clearAll(_this.img_lottery);
                _this.isLotterying = false;
                var data = _this.lotteryData[index];
                _this.checkLottery(data);
            }));
        };
        LotteryScene.prototype.checkCanFreeLottery = function () {
            var nCurTime = GameLogicProcessingManager.GetCurTime();
            if (Utils.judgeIsOnTheSameDay(PlayerDataManager.getInstance().stPlayerDataBase.nLotteryTimeLast, nCurTime)) {
                if (PlayerDataManager.getInstance().stPlayerDataBase.nLotteryCount == 0) {
                    this.img_video.visible = false;
                    this.needVideo = false;
                }
                else {
                    this.img_video.visible = true;
                    this.needVideo = true;
                }
            }
            else {
                this.img_video.visible = false;
                this.needVideo = false;
            }
        };
        LotteryScene.prototype.checkLottery = function (data) {
            console.log("lottery>>>", data);
            var id = data.id;
            if (id == 3 + '') {
                this.onLottery();
            }
            else if (id == 6 + '') {
                TipsManager.getInstance().showDefaultTips("感谢参与");
            }
            else {
                var arr = data.item.split("|");
                var type = arr[0];
                var count = arr[1];
                ViewManager.getInstance().showView(LotteryPopScene, { type: type, count: count });
            }
            this.img_video.visible = true;
            this.needVideo = true;
        };
        LotteryScene.prototype.initMiniGame = function () {
        };
        LotteryScene.prototype.initView = function () {
            this.checkCanFreeLottery();
            this.initLottery();
            MiniManeger.instance.hideBlockAd();
        };
        LotteryScene.prototype.addEvent = function () {
            this.btn_lottery.on(Laya.Event.CLICK, this, this.clickLottery);
            this.btn_close.on(Laya.Event.CLICK, this, this.removeSelf);
        };
        LotteryScene.prototype.removeEvent = function () {
            this.btn_lottery.off(Laya.Event.CLICK, this, this.clickLottery);
            this.btn_close.off(Laya.Event.CLICK, this, this.removeSelf);
        };
        LotteryScene.prototype.removeSelf = function () {
            if (this.isLotterying) {
                return;
            }
            MiniManeger.instance.showBlockAd();
            return _super.prototype.removeSelf.call(this);
        };
        LotteryScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        return LotteryScene;
    }(BasePopScene));

    var GameHomeView = (function (_super) {
        __extends(GameHomeView, _super);
        function GameHomeView() {
            var _this = _super.call(this) || this;
            _this.className_key = "GameHomeView";
            _this.skin = "game/GameHomeView.json";
            _this.bIsRunning = false;
            _this.bWeCatShow = false;
            return _this;
        }
        GameHomeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btn_more.visible = false;
            if (DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame()) {
                this.btn_more.visible = true;
            }
            if (DeviceUtil.isTTMiniGame()) {
                this.getChildByName("imageHead").skin = "resource/assets/preloading/loading_logo_4.png";
            }
            else if (DeviceUtil.isQQMiniGame()) {
                this.getChildByName("imageHead").skin = "resource/assets/preloading/loading_logo.png";
            }
            if (DeviceUtil.isWXMiniGame()) {
                this.imageWeCatMoreGame.visible = true;
                this.more_games.visible = true;
                this.getChildByName("imageHead").skin = "resource/assets/preloading/loading_logo_8.png";
                this.getChildByName("imageHead").visible = false;
            }
            if (MiniManeger.instance.isAiQiYi()) {
                this.getChildByName("imageHead").skin = "resource/assets/preloading/loading_logo_x.png";
            }
            this.addGuessLike();
        };
        GameHomeView.prototype.onAddStage = function () {
            AddPsView.bCloseBinner = false;
            MiniManeger.instance.showBannerAd();
            this.bIsRunning = true;
            this.startGameAni();
            this.initView();
        };
        GameHomeView.prototype.onRemoved = function () {
            this.bIsRunning = false;
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            Laya.Tween.clearAll(this.imageBtStartGame);
            Laya.Tween.clearAll(this.image_wm);
        };
        GameHomeView.prototype.onLottery = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["lottery"], function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    ViewManager.getInstance().showView(LotteryScene);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                    return [2];
                });
            }); });
        };
        GameHomeView.prototype.addEvent = function () {
            this.btn_lottery.on(Laya.Event.CLICK, this, this.onLottery);
            this.btn_colorSign.on(Laya.Event.CLICK, this, this.onColorSign);
            this.imageBtStartGame.on(Laya.Event.CLICK, this, this.gameHomeStartGame);
            this.btn_more.on(Laya.Event.CLICK, this, this.onMoreGame);
            this.imageBtChoseLevel.on(Laya.Event.CLICK, this, this.openLevelView);
            this.imageBtSign.on(Laya.Event.CLICK, this, this.openSignView);
            this.imageBtShare.on(Laya.Event.CLICK, this, this.onGameHomeShare);
            this.imageBtInvital.on(Laya.Event.CLICK, this, this.onInvite);
            if (DeviceUtil.isWXMiniGame()) {
                this.imageWeCatMoreGame.on(Laya.Event.CLICK, this, this.openChouTiView);
                this.more_games.on(Laya.Event.CLICK, this, this.wxShowMoreGame);
                this.back_btn.on(Laya.Event.CLICK, this, this.wxShowMoreGame);
                this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        GameHomeView.prototype.openChouTiView = function () {
            ViewManager.getInstance().showView(WeCatMoreGameView);
        };
        GameHomeView.prototype.onMoreGame = function () {
            if (DeviceUtil.isQQMiniGame()) {
                MiniManeger.instance.showBoxAd();
            }
            else if (DeviceUtil.isTTMiniGame()) {
                MiniManeger.instance.showMoreGamesModal();
            }
        };
        GameHomeView.prototype.removeEvent = function () {
            this.btn_lottery.off(Laya.Event.CLICK, this, this.onLottery);
            this.btn_colorSign.off(Laya.Event.CLICK, this, this.onColorSign);
            this.imageBtStartGame.off(Laya.Event.CLICK, this, this.gameHomeStartGame);
            this.btn_more.off(Laya.Event.CLICK, this, this.onMoreGame);
            this.imageBtChoseLevel.off(Laya.Event.CLICK, this, this.openLevelView);
            this.imageBtSign.off(Laya.Event.CLICK, this, this.openSignView);
            this.imageBtShare.off(Laya.Event.CLICK, this, this.onGameHomeShare);
            this.imageBtInvital.off(Laya.Event.CLICK, this, this.onInvite);
            if (DeviceUtil.isWXMiniGame()) {
                this.imageWeCatMoreGame.off(Laya.Event.CLICK, this, this.openChouTiView);
                this.more_games.off(Laya.Event.CLICK, this, this.wxShowMoreGame);
                this.back_btn.off(Laya.Event.CLICK, this, this.wxShowMoreGame);
                this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        GameHomeView.prototype.wxShowMoreGame = function () {
            ViewManager.getInstance().showView(MoreGameOperRequestTwo);
        };
        GameHomeView.prototype.gameHomeStartGame = function () {
            if (DeviceUtil.isNative()) {
                NativeMgr.getInstance().showInterstitialAd();
            }
            SoundManager.getInstance().playEffect("button", 1);
            var nSpCost = 1;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(8);
            if (stGameConfig) {
                nSpCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (!b) {
                TipsManager.getInstance().showDefaultTips("体力不足");
                ViewChangeManager.getInstance().showBufferLoadingView();
                ResUtil.getIntance().loadGroups(["adsp"], function () {
                    ViewManager.getInstance().showView(AddPsView);
                    ViewChangeManager.getInstance().hideBufferLoadingView();
                });
                return;
            }
            PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Sp, nSpCost);
            if (DeviceUtil.isTTMiniGame()) {
                MiniManeger.instance.hideBanner();
            }
            ViewChangeManager.getInstance().CurLevelBase.startGame();
            this.removeSelf();
        };
        GameHomeView.prototype.initView = function () {
            ViewChangeManager.getInstance().restartEnterGameHome();
            this.PlInitView();
            this.showSignView();
            BitmapLabelUtils.setLabel(this.spLevelNum, PlayerDataManager.getInstance().getLevelToChangeMaxLevel().toString(), "resource/assets/img/ui/gamehome/maininterface_number1/maininterface_number1_", 0, ".png", "center");
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.visible = true;
                this.startWmAni();
            }
            if (DeviceUtil.isQQMiniGame() && BaseConst.infos.gameInfo.openPsAward == 1) {
                MiniManeger.instance.showBlockAd();
                this.btn_lottery.visible = true;
                var flag = MiniManeger.instance.isColorSignExistSync();
                if (!flag) {
                    this.btn_colorSign.visible = true;
                }
                else {
                    this.btn_colorSign.visible = false;
                }
            }
            else if (DeviceUtil.isTTMiniGame()) {
                this.btn_lottery.visible = true;
            }
        };
        GameHomeView.prototype.onColorSign = function () {
            var _this = this;
            MiniManeger.instance.addColorSign({
                success: function (res) {
                    console.log(res);
                    _this.btn_colorSign.visible = false;
                }
            });
        };
        GameHomeView.prototype.openLevelView = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["levelview"], function () {
                LevelView.pHomeView = _this;
                ViewManager.getInstance().showView(LevelView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
        };
        GameHomeView.prototype.openSignView = function () {
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["sign"], function () {
                Laya.Resource.destroyUnusedResources();
                ViewManager.getInstance().showView(SignView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
        };
        GameHomeView.prototype.onGameHomeShare = function () {
            SoundManager.getInstance().playEffect("button", 1);
            MiniManeger.instance.bFlagDouYin = false;
            MiniManeger.instance.shareAppMessage();
        };
        GameHomeView.prototype.onInvite = function () {
            SoundManager.getInstance().playEffect("button", 1);
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["invite"], function () {
                ViewManager.getInstance().showView(InviteView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
        };
        GameHomeView.prototype.startGameAni = function () {
            var _this = this;
            if (!this.bIsRunning) {
                return;
            }
            Laya.Tween.clearAll(this.imageBtStartGame);
            Laya.Tween.to(this.imageBtStartGame, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageBtStartGame, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startGameAni);
                }));
            }));
        };
        GameHomeView.prototype.PlInitView = function () {
            if (DeviceUtil.isTTMiniGame() || MiniManeger.instance.isAiQiYi()) {
                this.imageBtInvital.visible = false;
                this.boxFun.width = 650;
            }
        };
        GameHomeView.prototype.showSignView = function () {
            this.addEvent();
        };
        GameHomeView.prototype.onGetFreeSkin = function () {
        };
        GameHomeView.prototype.weCatViewOper = function () {
            this.wxShowMoreGame();
        };
        GameHomeView.prototype.startWmAni = function () {
            var _this = this;
            if (!this.bIsRunning) {
                return;
            }
            Laya.Tween.clearAll(this.image_wm);
            Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startWmAni);
                }));
            }));
        };
        GameHomeView.prototype.addGuessLike = function () {
            var self = this;
            if (!self._guessLike && DeviceUtil.isWXMiniGame()) {
                MiniManeger.instance.createGuessLike(self).then(function (guessLike) {
                    if (!guessLike) {
                        return;
                    }
                    self._guessLike = guessLike;
                    self._guessLike.x = (Laya.stage.width - self._guessLike.width) / 2;
                    self._guessLike.y = 250;
                });
            }
        };
        return GameHomeView;
    }(BaseSceneUISkin));

    var GameView = (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            _this.className_key = "GameView";
            _this.bg_img_res = null;
            _this.chooseLeft = null;
            _this.bHanderAniShow = false;
            _this.bIsRunning = false;
            _this.bLevelOver = false;
            _this.skin = "game/GameView.json";
            return _this;
        }
        GameView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            if (!self.guessLike && DeviceUtil.isWXMiniGame()) {
                MiniManeger.instance.createGuessLike(self).then(function (guessLike) {
                    if (PlatformDY.gameListInfos.length <= 0) {
                        return;
                    }
                    self.guessLike = guessLike;
                    self.guessLike.x = (Laya.stage.width - self.guessLike.width) / 2;
                    self.guessLike.y = 250;
                });
            }
        };
        GameView.prototype.onAddStage = function () {
            AddPsView.bCloseBinner = true;
            MiniManeger.instance.showInterstitialAd();
            EventMgr.getInstance().addEvent(GameEvent.CHANGE_VIDEO_IMAGE, this, this.stopVideoImage);
            this.initView();
            this.addEvent();
            if (DeviceUtil.isTTMiniGame()) {
                MiniManeger.instance.hideBanner();
            }
            else if (DeviceUtil.isQQMiniGame()) {
                MiniManeger.instance.showBannerAd();
            }
            else if (DeviceUtil.isWXMiniGame()) ;
        };
        GameView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.bIsRunning = false;
            Laya.Tween.clearAll(this.imageBtTip);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.choosesuper_light);
            Laya.Tween.clearAll(this.starOne);
            Laya.Tween.clearAll(this.starTwo);
            Laya.Tween.clearAll(this.image_wm);
        };
        GameView.prototype.initView = function () {
            this.initPlView();
            this.bLevelOver = false;
            this.bIsRunning = true;
            this.refreshChoose();
            this.startimageBtTipAni();
            this.imageBtTip.visible = false;
            this.imageBtGotoNextLevel.visible = false;
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.visible = true;
                this.startWmAni();
            }
            this.rotationLight();
            this.lunchStarAni();
        };
        GameView.prototype.refreshChoose = function () {
            this.box_choose.visible = false;
            this.initViewInfo();
        };
        GameView.prototype.addEvent = function () {
            this.imageBtToHome.on(Laya.Event.CLICK, this, this.returnToGameHome);
            this.imageBtTip.on(Laya.Event.CLICK, this, this.onGameViewShareGame);
            this.imageBtRestart.on(Laya.Event.CLICK, this, this.gameViewRestartGame);
            this.imageBtGotoNextLevel.on(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        GameView.prototype.removeEvent = function () {
            this.imageBtToHome.off(Laya.Event.CLICK, this, this.returnToGameHome);
            this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
            this.imageBtTip.off(Laya.Event.CLICK, this, this.onGameViewShareGame);
            this.imageBtRestart.off(Laya.Event.CLICK, this, this.gameViewRestartGame);
            this.imageBtGotoNextLevel.off(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            EventMgr.getInstance().removeEvent(GameEvent.CHANGE_VIDEO_IMAGE, this, this.stopVideoImage);
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        GameView.prototype.onGameViewWatchVideoNextLevel = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("button", 1);
            this.imageBtGotoNextLevel.off(Laya.Event.CLICK, this, this.onGameViewWatchVideoNextLevel);
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    _this.onGameViewNextLevel();
                    _this.imageBtGotoNextLevel.on(Laya.Event.CLICK, _this, _this.onGameViewWatchVideoNextLevel);
                },
                failFun: function () {
                    _this.imageBtGotoNextLevel.on(Laya.Event.CLICK, _this, _this.onGameViewWatchVideoNextLevel);
                },
                errorFun: function () {
                    _this.imageBtGotoNextLevel.on(Laya.Event.CLICK, _this, _this.onGameViewWatchVideoNextLevel);
                }
            });
        };
        GameView.prototype.onGameViewNextLevel = function () {
            if (this.bLevelOver) {
                return;
            }
            ViewChangeManager.getInstance().goToNextLevel();
        };
        GameView.prototype.gameViewRestartGame = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (this.bLevelOver) {
                return;
            }
            ViewChangeManager.getInstance().restartGame(true);
        };
        GameView.prototype.returnToGameHome = function () {
            SoundManager.getInstance().playEffect("button", 1);
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
            ViewChangeManager.getInstance().CurLevelBase.returnToGameHome();
            this.removeSelf();
        };
        GameView.prototype.onClick = function (evt) {
            SoundManager.getInstance().playEffect("button", 1);
            var tar = evt.currentTarget;
            var data = this.viewData_.data;
            var icon_name = '';
            switch (evt.currentTarget) {
                case this.icon_chooseLeft:
                    icon_name = data.chooseLeftName;
                    this.chooseLeft = 'left';
                    this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
                    this.icon_choseCoverUpLeft.visible = true;
                    break;
                case this.icon_chooseRight:
                    icon_name = data.chooseRightName;
                    this.chooseLeft = 'right';
                    this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
                    this.icon_choseCoverUpRight.visible = true;
                    break;
            }
            this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
            ViewChangeManager.getInstance().CurLevelBase.isPop = false;
            this.viewData_.callBack(icon_name == data.rightName, icon_name);
            this.imageBtTip.visible = false;
            this.imageBtGotoNextLevel.visible = false;
        };
        GameView.prototype.onClickSuper = function () {
            var _this = this;
            this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            var self = this;
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    if (DeviceUtil.isTTMiniGame) {
                        Laya.timer.once(100, _this, function () {
                            self.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, self, self.onClick);
                            ViewChangeManager.getInstance().CurLevelBase.isPop = false;
                            self.viewData_.callBack(true, self.viewData_.data.superName);
                            self.imageBtTip.visible = false;
                            self.imageBtGotoNextLevel.visible = false;
                        });
                    }
                    else {
                        self.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, self, self.onClick);
                        ViewChangeManager.getInstance().CurLevelBase.isPop = false;
                        self.viewData_.callBack(true, self.viewData_.data.superName);
                        self.imageBtTip.visible = false;
                        self.imageBtGotoNextLevel.visible = false;
                    }
                },
                failFun: function () {
                    self.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                    self.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                    self.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, self, self.onClickSuper);
                },
                errorFun: function () {
                    self.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                    self.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, self, self.onClick);
                    self.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, self, self.onClickSuper);
                }
            });
        };
        GameView.prototype.showResultIcon = function (isRight) {
            var _this = this;
            this.createChooseAnswer(isRight);
            if (isRight) {
                SoundManager.getInstance().playEffect("right", 1);
                Laya.timer.once(1000, this, function () {
                    _this.hideChoseView();
                });
            }
            else {
                SoundManager.getInstance().playEffect("wrong", 1);
            }
        };
        GameView.prototype.createChooseAnswer = function (isRight) {
            var tar;
            var skin = 'resource/assets/img/ui/game/gameinterface_icon_4.png';
            if (!isRight) {
                skin = 'resource/assets/img/ui/game/gameinterface_icon_5.png';
            }
            if (this.chooseLeft == 'left') {
                tar = this.icon_choseCoverUpLeft;
            }
            else {
                tar = this.icon_choseCoverUpRight;
            }
            var img = new Laya.Image();
            img.skin = skin;
            img.centerX = img.centerY = 0;
            tar.addChild(img);
        };
        GameView.prototype.showChoseView = function (data) {
            this.imageBtTip.visible = true;
            this.imageBtGotoNextLevel.visible = true;
            this.initViewInfo();
            this.viewData_ = data;
            this.initChooseView();
            this.box_choose.visible = true;
            this.refreshViewChose();
            this.icon_chooseLeft.once(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseRight.once(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseSuper.once(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
        };
        GameView.prototype.hideChoseView = function () {
            this.imageBtTip.visible = false;
            this.imageBtGotoNextLevel.visible = false;
            Laya.Tween.to(this.box_choose, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.backIn);
            this.box_choose.visible = false;
            this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
            this.initViewInfo();
        };
        GameView.prototype.refreshViewChose = function () {
            this.box_choose.scale(0.2, 0.2);
            Laya.Tween.to(this.box_choose, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backIn);
            this.icon_choseCoverUpRight.removeChildren();
            this.icon_choseCoverUpLeft.removeChildren();
            this.icon_choseCoverUpRight.visible = false;
            this.icon_choseCoverUpLeft.visible = false;
            this.icon_left.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_chooseLeft + '.png';
            this.icon_right.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_chooseRight + '.png';
            if (this.viewData_.data.icon_super != null) {
                this.icon_super.skin = 'resource/assets/img/choose/' + this.viewData_.data.icon_super + '.png';
            }
        };
        GameView.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        GameView.prototype.refreshUpIndeInfo = function (nIndexCur, nIndexMax) {
            var nIndexTemp = 0;
            var nCur = PlayerDataManager.getInstance().stPlayerDataBase.nCurLevel;
            nCur = nCur >= PlayerDataManager.getInstance().nMaxLevelCount ? PlayerDataManager.getInstance().getCurLevelMax() - 1 : nCur;
            this.spLevelLeft.destroyChildren();
            this.spLevelRight.destroyChildren();
            var nNumLefc = 0;
            var nNumRight = 0;
            nNumLefc = this.spLevelLeft.numChildren;
            nNumRight = this.spLevelRight.numChildren;
            nNumLefc = nCur + 1;
            nNumRight = nCur + 2;
            if (!PlayerDataManager.getInstance().allCustomsClearance()) {
                this.spLevelLeft.visible = true;
                this.spLevelRight.visible = true;
                BitmapLabelUtils.setLabel(this.spLevelLeft, nNumLefc.toString(), "resource/assets/img/ui/game/gameinterface_number1/gameinterface_number1_", 0, ".png", "center");
                BitmapLabelUtils.setLabel(this.spLevelRight, nNumRight.toString(), "resource/assets/img/ui/game/gameinterface_number1/gameinterface_number1_", 0, ".png", "center");
            }
            else {
                this.spLevelLeft.visible = false;
                this.spLevelRight.visible = false;
            }
            nNumLefc = this.spLevelLeft.numChildren;
            nNumRight = this.spLevelRight.numChildren;
            var nCount = this.hBoxIndex.numChildren;
            for (var i = 0; i < nCount; ++i) {
                var stImageInfo = this.hBoxIndex.getChildAt(i);
                if (stImageInfo) {
                    if (i < nIndexMax) {
                        stImageInfo.visible = true;
                    }
                    else {
                        stImageInfo.visible = false;
                    }
                    var pImageFinish = stImageInfo.getChildAt(0);
                    if (pImageFinish) {
                        if (i < nIndexCur) {
                            pImageFinish.visible = true;
                            ++nIndexTemp;
                        }
                        else {
                            pImageFinish.visible = false;
                        }
                    }
                }
            }
            if (nIndexTemp >= nIndexMax) {
                this.bLevelOver = true;
            }
            this.boxLevelInfo.width = 108 + 20 + this.hBoxIndex.width + 20 + 108;
        };
        GameView.prototype.onGameViewShareGame = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (!this.box_choose.visible && !this.bHanderAniShow) {
                console.log("box choose not show!");
                return;
            }
            if (DeviceUtil.isMiniGame()) {
                var self_1 = this;
                MiniManeger.instance.bFlagDouYin = false;
                MiniManeger.instance.shareAppMessage({
                    sucFun: function () {
                        self_1.onShareGameSuccess();
                    }
                });
            }
            else {
                this.onShareGameSuccess();
            }
        };
        GameView.prototype.onShareGameSuccess = function () {
            var data = ViewChangeManager.getInstance().CurLevelBase.getCurChooseInfo();
            var nHandX = 0;
            var nHandY = 0;
            if (!data) {
                return;
            }
            if (data.chooseLeftName == data.rightName) {
                this.icon_choseCoverUpRight.visible = false;
                this.icon_chooseRight.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
                nHandX = this.icon_chooseLeft.x + this.icon_chooseLeft.width / 2;
                nHandY = this.icon_chooseLeft.y + this.icon_chooseLeft.height / 2;
            }
            else {
                this.icon_choseCoverUpLeft.visible = false;
                nHandX = this.icon_chooseRight.x + this.icon_chooseRight.width / 2;
                nHandY = this.icon_chooseRight.y + this.icon_chooseRight.height / 2;
                this.icon_chooseLeft.off(Laya.Event.MOUSE_DOWN, this, this.onClick);
            }
            this.icon_chooseSuper.off(Laya.Event.MOUSE_DOWN, this, this.onClickSuper);
            this.imageHand.x = nHandX;
            this.imageHand.y = nHandY;
            this.bHanderAniShow = true;
            this.imageHand.visible = true;
            this.handAni();
        };
        GameView.prototype.handAni = function () {
            var _this = this;
            if (!this.bHanderAniShow) {
                return;
            }
            this.imageHand.skin = "resource/assets/img/ui/game/gameinterface_icon_1.png";
            Laya.timer.once(500, this, function () {
                _this.imageHand.skin = "resource/assets/img/ui/game/gameinterface_icon_2.png";
                Laya.timer.once(500, _this, _this.handAni);
            });
        };
        GameView.prototype.initViewInfo = function () {
            this.imageHand.visible = false;
            this.bHanderAniShow = false;
            this.bLevelOver = false;
        };
        GameView.prototype.startimageBtTipAni = function () {
            var _this = this;
            if (!this.bIsRunning) {
                return;
            }
            Laya.Tween.clearAll(this.imageBtTip);
            Laya.Tween.to(this.imageBtTip, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.imageBtTip, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startimageBtTipAni);
                }));
            }));
        };
        GameView.prototype.initPlView = function () {
            if (DeviceUtil.isTTMiniGame()) {
                this.imageTTVideo.visible = true;
            }
        };
        GameView.prototype.startVideoImage = function () {
            this.imageTTVideo.skin = "resource/assets/img/common/gaming_icon_4.png";
        };
        GameView.prototype.stopVideoImage = function () {
            console.log("stopVideoImage");
            this.imageTTVideo.skin = "resource/assets/img/common/gaming_icon_5.png";
        };
        GameView.prototype.initChooseView = function () {
            if (this.viewData_.data.superName == null) {
                this.icon_chooseRight.left = 584;
                this.icon_chooseLeft.left = 267;
                this.choosesuper_light.visible = false;
                this.icon_chooseSuper.visible = false;
            }
            else {
                this.choosesuper_light.visible = true;
                this.icon_chooseSuper.visible = true;
                this.icon_chooseRight.left = 120;
                this.icon_chooseLeft.left = 426;
            }
        };
        GameView.prototype.rotationLight = function () {
            var _this = this;
            this.choosesuper_light.rotation = 0;
            Laya.Tween.clearAll(this.choosesuper_light);
            Laya.Tween.to(this.choosesuper_light, { rotation: 360 }, 3000, null, Laya.Handler.create(this, function (args) {
                _this.rotationLight();
            }));
        };
        GameView.prototype.starAni = function (imageObj) {
            var _this = this;
            Laya.Tween.clearAll(imageObj);
            Laya.Tween.to(imageObj, { alpha: 0 }, 1000, null, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(imageObj, { alpha: 1 }, 1000, null, Laya.Handler.create(_this, function (args) {
                    _this.starAni(imageObj);
                }));
            }));
        };
        GameView.prototype.lunchStarAni = function () {
            var _this = this;
            this.starAni(this.starOne);
            Laya.timer.once(1000, this, function () {
                _this.starAni(_this.starTwo);
            });
        };
        GameView.prototype.startWmAni = function () {
            var _this = this;
            Laya.Tween.clearAll(this.image_wm);
            Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startWmAni);
                }));
            }));
        };
        GameView.prototype.initOperView = function () {
            var _this = this;
            if (DeviceUtil.isWXMiniGame()) {
                if (PlayerDataManager.getInstance().bIsNewPlayer) {
                    Laya.timer.once(1000, this, function () {
                        _this.pWeCatMoreGameView = ViewManager.getInstance().showView(WeCatMoreGameView);
                        _this.imageWeCatMoreGame.on(Laya.Event.CLICK, _this, _this.weCatViewOper);
                        _this.imageWeCatMoreGame.visible = true;
                    });
                }
                else {
                    this.imageWeCatMoreGame.visible = true;
                    this.imageWeCatMoreGame.on(Laya.Event.CLICK, this, this.weCatViewOper);
                }
            }
        };
        GameView.prototype.weCatViewOper = function () {
            this.pWeCatMoreGameView = ViewManager.getInstance().showView(WeCatMoreGameView);
        };
        GameView.prototype.closeWeCatMoreGameView = function () {
            if (!DeviceUtil.isWXMiniGame()) {
                return;
            }
            if (WeCatMoreGameView.isOpen && this.pWeCatMoreGameView) {
                this.pWeCatMoreGameView.removeSelf();
            }
        };
        return GameView;
    }(BaseSceneUISkinPopView));

    var MoreGameView = (function (_super) {
        __extends(MoreGameView, _super);
        function MoreGameView() {
            var _this = _super.call(this) || this;
            _this.className_key = "MoreGameView";
            _this.ITEM_H = 200;
            _this.isAuto = true;
            _this.dataArr = [{ t: 0 }, { t: 1 }, { t: 2 }, { t: 3 }];
            _this.speed = 2;
            _this.dir = -1;
            _this.skin = "game/uiView/wecat/MoreGameView.json";
            return _this;
        }
        MoreGameView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MoreGameView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MoreGameView.prototype.onAddStage = function () {
            this.initView();
            this.addEvent();
            ViewChangeManager.getInstance().CommonView.visible = false;
            MiniManeger.instance.hideBanner();
            MiniManeger.instance.bFlagSpecialView = false;
            ViewChangeManager.getInstance().hideImageExitTemp();
        };
        MoreGameView.prototype.onRemoved = function () {
            this.removeEvent();
            this.stPanel.removeChildren();
            Laya.timer.clearAll(this);
            ViewChangeManager.getInstance().showImageExitTemp();
        };
        MoreGameView.prototype.addEvent = function () {
            this.stPanel.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.stPanel.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.stPanel.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.image_back.on(Laya.Event.CLICK, this, this.onBack);
        };
        MoreGameView.prototype.removeEvent = function () {
            this.stPanel.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.stPanel.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.stPanel.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.image_back.off(Laya.Event.CLICK, this, this.onBack);
        };
        MoreGameView.prototype.onBack = function () {
            if (!MoreGameView.bSpeical) {
                if (MoreGameView.bSuccess) {
                    ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                }
                else {
                    ViewManager.getInstance().showView(FailEntryTwoView);
                }
                MoreGameView.bSuccess = false;
            }
            if (!MoreGameView.bSpeical) {
                ViewChangeManager.getInstance().CommonView.visible = true;
            }
            this.removeSelf();
            MiniManeger.instance.bFlagSpecialView = true;
            MoreGameView.bSpeical = false;
        };
        MoreGameView.prototype.mouseDown = function (e) {
            this.isAuto = false;
            this.stx = e.stageX;
            this.sty = e.stageY;
        };
        MoreGameView.prototype.mouseMove = function (e) {
            var dy = e.stageY - this.sty;
            for (var i = 0; i < this.stPanel.numChildren; i++) {
                var item = this.stPanel.getChildAt(i);
                item.y += dy;
            }
            this.sty = e.stageY;
            this.dir = dy > 0 ? 1 : -1;
            this.refresh();
        };
        MoreGameView.prototype.mouseUp = function (e) {
            this.isAuto = true;
            this.dir = -1;
        };
        MoreGameView.prototype.initView = function () {
            Laya.timer.frameLoop(1, this, this.updata);
            var canuseHeight = Laya.stage.height - 280;
            this.maxCount = Math.ceil(canuseHeight / this.ITEM_H);
            this.dataArr = GameData.getInstance().weCatMiniIconsInfo;
            console.log(GameData.getInstance().weCatMiniIconsInfo);
            var didnex = 0;
            for (var i = 0; i < this.maxCount + 1; i++) {
                var item = new MoreGameItemView();
                item.index = didnex;
                item.setData(this.dataArr[item.index]);
                didnex++;
                if (didnex >= this.dataArr.length) {
                    didnex = 0;
                }
                item.y = i * this.ITEM_H;
                this.stPanel.addChild(item);
            }
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.refreshGameList();
            }
        };
        MoreGameView.prototype.getUpIndexforCurIndex = function (index) {
            if (index >= this.dataArr.length || index < 0)
                return 0;
            return index - 1 >= 0 ? index - 1 : this.dataArr.length - 1;
        };
        MoreGameView.prototype.getDownIndexforCurIndex = function (index) {
            if (index >= this.dataArr.length || index < 0)
                return 0;
            return index + 1 < this.dataArr.length ? index + 1 : 0;
        };
        MoreGameView.prototype.updata = function (dt) {
            if (!this.isAuto)
                return;
            for (var i = 0; i < this.stPanel.numChildren; i++) {
                var item = this.stPanel.getChildAt(i);
                item.y += this.speed * this.dir;
            }
            this.refresh();
        };
        MoreGameView.prototype.refresh = function () {
            var startItem;
            var lastItem;
            startItem = this.stPanel.getChildAt(0);
            lastItem = this.stPanel.getChildAt(this.maxCount);
            if (this.dir == -1) {
                if (startItem.y < -this.ITEM_H) {
                    startItem.y = lastItem.y + lastItem.height;
                    startItem.zOrder = lastItem.zOrder + 1;
                    startItem.index = this.getDownIndexforCurIndex(lastItem.index);
                    startItem.refreshData(this.dataArr[startItem.index]);
                    console.log('idnex-=======>', startItem.index);
                }
            }
            else {
                if (lastItem.y > this.maxCount * this.ITEM_H) {
                    lastItem.y = startItem.y - startItem.height;
                    lastItem.zOrder = startItem.zOrder - 1;
                    lastItem.index = this.getUpIndexforCurIndex(startItem.index);
                    lastItem.refreshData(this.dataArr[lastItem.index]);
                }
            }
        };
        MoreGameView.bSuccess = false;
        MoreGameView.bSpeical = false;
        return MoreGameView;
    }(BaseSceneUISkinPopView));

    var FailEntryOneView = (function (_super) {
        __extends(FailEntryOneView, _super);
        function FailEntryOneView() {
            var _this = _super.call(this) || this;
            _this.className_key = "FailEntryOneView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.nBtNextLevel = 360;
            _this.nBtNextLevelSp = 50;
            _this.nGlodCost = 200;
            _this.skin = "game/uiView/FailEntryOneView.json";
            return _this;
        }
        FailEntryOneView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (DeviceUtil.isWXMiniGame()) ;
        };
        FailEntryOneView.prototype.onAddStage = function () {
            MiniManeger.instance.showInterstitialAd();
            this.initView();
            this.addEvent();
            MiniManeger.instance.showBannerAd();
        };
        FailEntryOneView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            if (this.aniReal) {
                this.aniReal.stop();
            }
            Laya.Tween.clearAll(this.image_wm);
        };
        FailEntryOneView.prototype.initView = function () {
            this.forExamine();
            this.refreshLable();
            if (DeviceUtil.isWXMiniGame()) {
                if (!this.aniReal) {
                    this.createSkeleton("resource/assets/img/ani/failure/failure.sk");
                }
                else {
                    this.aniReal.play(0, true);
                }
            }
            this.refreshReLiveByGlod();
            this.initPl();
        };
        FailEntryOneView.prototype.addEvent = function () {
            this.imageRecv.on(Laya.Event.CLICK, this, this.onCostGlodRelive);
            this.imageBtSign.on(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
            this.btLable.on(Laya.Event.CLICK, this, this.onNoThanks);
            this.img_back.on(Laya.Event.CLICK, this, this.onBack);
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.on(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        FailEntryOneView.prototype.removeEvent = function () {
            this.imageRecv.off(Laya.Event.CLICK, this, this.onCostGlodRelive);
            this.imageBtSign.off(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
            this.btLable.off(Laya.Event.CLICK, this, this.onNoThanks);
            this.img_back.off(Laya.Event.CLICK, this, this.onBack);
            if (DeviceUtil.isWXMiniGame()) {
                this.image_wm.off(Laya.Event.CLICK, MiniManeger.instance, MiniManeger.instance.toGameSpecial);
            }
        };
        FailEntryOneView.prototype.onWatchVideoToRelive = function () {
            SoundManager.getInstance().playEffect("button", 1);
            this.imageBtSign.off(Laya.Event.CLICK, this, this.onWatchVideoToRelive);
            var self = this;
            if (ViewChangeManager.getInstance().CurLevelBase) {
                ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
            }
            MiniManeger.instance.playViderAd({
                successFun: function () {
                    Laya.timer.once(100, self, function () {
                        self.onFailRestartGame();
                        if (ViewChangeManager.getInstance().CurLevelBase) {
                            ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                        }
                    });
                    console.log("onFailRestartGame xxx");
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
                },
                failFun: function () {
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                    }
                },
                errorFun: function () {
                    self.imageBtSign.on(Laya.Event.CLICK, self, self.onWatchVideoToRelive);
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                    }
                }
            });
        };
        FailEntryOneView.prototype.onFailRestartGame = function () {
            if (DeviceUtil.isTTMiniGame() || DeviceUtil.isWXMiniGame()) {
                MiniManeger.instance.hideBanner();
            }
            ViewChangeManager.getInstance().restartGame(false);
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        FailEntryOneView.prototype.onCostGlodRelive = function () {
            SoundManager.getInstance().playEffect("button", 1);
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
            if (!b) {
                return;
            }
            PlayerDataManager.getInstance().subGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
            this.onFailRestartGame();
        };
        FailEntryOneView.prototype.onBack = function () {
            MoreGameRandomGameBox713.bOperFlag = false;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        FailEntryOneView.prototype.onNoThanks = function () {
            SoundManager.getInstance().playEffect("button", 1);
            if (DeviceUtil.isWXMiniGame()) {
                if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                    MoreGameView.bSuccess = false;
                    ViewManager.getInstance().showView(MoreGameView);
                }
                else {
                    MoreGameRandomGameBox713.bOperFlag = true;
                    MoreGameRandomGameBox713.bSuccess = false;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                }
            }
            else {
                ViewManager.getInstance().showView(FailEntryTwoView);
            }
            MiniManeger.instance.bFlagSpecialView = true;
            this.removeSelf();
        };
        FailEntryOneView.prototype.refreshReLiveByGlod = function () {
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(6);
            if (stGameConfig) {
                this.nGlodCost = parseInt(stGameConfig.strValue);
            }
            var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
            if (!b) {
                this.imageRecv.visible = false;
                return;
            }
            this.imageRecv.visible = true;
            BitmapLabelUtils.setLabel(this.spGlod, this.nGlodCost.toString(), "resource/assets/img/common/level_number1/level_number1_", 0, ".png", "left");
        };
        FailEntryOneView.prototype.createSkeleton = function (url) {
            var _this = this;
            return new Promise(function (resolve) {
                AnimationManager.instance.showSkeletonAnimation(url, function (boomAnimation) {
                    _this.aniReal = boomAnimation;
                    _this.aniReal.player.playbackRate = 1;
                    _this.aniReal.autoSize = true;
                    _this.aniReal.scale(1, 1);
                    _this.aniReal.play(0, true);
                    _this.aniReal.x = _this.aniReal.width - 100;
                    _this.aniReal.y = _this.aniReal.height;
                    _this.boxAni.addChild(_this.aniReal);
                    resolve(boomAnimation);
                }, 1);
            });
        };
        FailEntryOneView.prototype.refreshLable = function () {
            var _this = this;
            if (DeviceUtil.isWXMiniGame()) {
                return;
            }
            this.btLable.visible = false;
            Laya.timer.once(3000, this, function () {
                _this.btLable.visible = true;
            });
        };
        FailEntryOneView.prototype.forExamine = function () {
        };
        FailEntryOneView.prototype.startWmAni = function () {
            var _this = this;
            Laya.Tween.clearAll(this.image_wm);
            Laya.Tween.to(this.image_wm, { scaleX: 1.1, scaleY: 1.1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this.image_wm, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.sineOut, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.startWmAni);
                }));
            }));
        };
        FailEntryOneView.prototype.initPl = function () {
            if (DeviceUtil.isWXMiniGame()) {
                this.box_wecat.removeChildren();
                this.box_wecat.addChild(ViewChangeManager.getInstance().showMoreGameinView(true));
                var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(6);
                if (stGameConfig) {
                    this.nGlodCost = parseInt(stGameConfig.strValue);
                }
                var b = PlayerDataManager.getInstance().CheckGoods(GoodsType.enum_GoodsType_Glod, this.nGlodCost);
                if (b) {
                    this.boxAni.visible = false;
                    this.box_wecat.visible = true;
                    this.imageRecv.bottom = this.imageBtSign.bottom;
                    this.imageRecv.centerX = 250;
                    this.imageBtSign.centerX = -250;
                }
                else {
                    this.imageBtSign.centerX = 0;
                }
                this.boxAni.visible = false;
                if (BaseConst.infos.gameInfo.openPsAward == 1 && BaseConst.infos.gameInfo.for_pay == 1) {
                    this.btLable.bottom = this.nBtNextLevelSp;
                    MiniManeger.instance.bFlagSpecialView = false;
                    MiniManeger.instance.hideBanner();
                    return;
                }
                else {
                    this.btLable.bottom = this.nBtNextLevel;
                }
            }
            else {
                MiniManeger.instance.bFlagSpecialView = true;
                MiniManeger.instance.showBannerAd();
            }
        };
        return FailEntryOneView;
    }(BaseSceneUISkinPopView));

    var ShareRecordVideoView = (function (_super) {
        __extends(ShareRecordVideoView, _super);
        function ShareRecordVideoView(data) {
            var _this = _super.call(this, data) || this;
            _this.className_key = "ShareRecordVideoView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK_MORE;
            _this.nGlodCount = 50;
            _this.skin = "game/uiView/ShareRecordVideoSkinView.json";
            return _this;
        }
        ShareRecordVideoView.prototype.childrenCreated = function () { };
        ShareRecordVideoView.prototype.onAddStage = function () {
            if (this.isCreate) {
                this.init();
                this.addEvent();
            }
        };
        ShareRecordVideoView.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
            if (this.isCreate) {
                this.init();
                this.addEvent();
            }
        };
        ShareRecordVideoView.prototype.init = function () {
            var _this = this;
            console.log("ShareRecordVideoView data ->", this.viewData_);
            ViewChangeManager.getInstance().CommonView.removeBtEvent();
            this.btn_cancel.visible = false;
            var stGameConfig = ConfigManager.getInstance().getGameConfigDataByID(18);
            if (stGameConfig) {
                this.nGlodCount = parseInt(stGameConfig.strValue);
            }
            BitmapLabelUtils.setLabel(this.shareGlodCount, this.nGlodCount.toString(), "resource/assets/img/common/level_number12/level_number1_", 0, ".png", "left");
            Laya.timer.once(2000, this, function () {
                _this.btn_cancel.visible = true;
            });
            MiniManeger.instance.showBannerAd();
        };
        ShareRecordVideoView.prototype.addEvent = function () {
            this.btn_shareVideo.on(Laya.Event.CLICK, this, this.onClick);
            this.btn_cancel.on(Laya.Event.CLICK, this, this.onClick);
        };
        ShareRecordVideoView.prototype.removeEvent = function () {
            this.btn_shareVideo.off(Laya.Event.CLICK, this, this.onClick);
            this.btn_cancel.off(Laya.Event.CLICK, this, this.onClick);
        };
        ShareRecordVideoView.prototype.onClick = function (evt) {
            switch (evt.currentTarget) {
                case this.btn_shareVideo:
                    this.shareVideo();
                    break;
                case this.btn_cancel:
                    this.removeUs();
                    break;
            }
        };
        ShareRecordVideoView.prototype.shareVideo = function () {
            var self = this;
            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = false;
            if (DeviceUtil.isTTMiniGame()) {
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN') {
                    MiniManeger.instance.bFlagDouYin = true;
                    MiniManeger.instance.shareAppMessage({
                        sucFun: function () {
                            console.log("发布录制视频成功");
                            TipsManager.getInstance().showDefaultTips('分享成功');
                            if (MiniManeger.instance.onShareVideoSuccess) {
                                return;
                            }
                            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, self.nGlodCount);
                            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                            self.removeUs();
                        },
                        failFun: function () {
                            console.log("发布录制视频失败");
                            TipsManager.getInstance().showDefaultTips('分享失败');
                            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                        }
                    });
                }
                else {
                    MiniManeger.instance.shareGameVideo({
                        successFun: function () {
                            PlayerDataManager.getInstance().AddGoods(GoodsType.enum_GoodsType_Glod, self.nGlodCount);
                            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                            self.removeUs();
                        }, failFun: function () {
                            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                        }, errorFun: function () {
                            self.btn_shareVideo.mouseEnabled = self.btn_cancel.mouseEnabled = true;
                        }
                    });
                }
            }
            else {
                MiniManeger.instance.shareAppMessage();
            }
        };
        ShareRecordVideoView.prototype.removeUs = function () {
            _super.prototype.removeUs.call(this);
        };
        ShareRecordVideoView.prototype.onRemoved = function () {
            this.removeEvent();
            ViewChangeManager.getInstance().CommonView.addBtEvent();
            if (BaseConst.infos.gameInfo.openPsAward == 1 && ConfigManager.getInstance().getTreasureByCurLevel() == 1) {
                ViewManager.getInstance().showView(SuccessfulEntryOneView);
            }
            else {
                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
            }
        };
        return ShareRecordVideoView;
    }(BaseSceneUISkinPopView));

    var VentonesangerView = (function (_super) {
        __extends(VentonesangerView, _super);
        function VentonesangerView() {
            var _this = _super.call(this) || this;
            _this.className_key = "VentonesangerView";
            _this.showEnterType = BasePopAnimationEnterType.SCALE_MODE_BACK;
            _this.skin = "game/uiView/VentonesangerView.json";
            _this.nNumMax = 10;
            _this.nCurNum = 0;
            return _this;
        }
        VentonesangerView.prototype.onEnable = function () {
        };
        VentonesangerView.prototype.onDisable = function () {
        };
        VentonesangerView.prototype.onAddStage = function () {
            this.initView();
        };
        VentonesangerView.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.timer.clearAll(this);
        };
        VentonesangerView.prototype.initView = function () {
            this.nCurNum = 0;
            this.image_change.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.image_change.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.nHightAdd = 674 / 10;
            this.imageValue.height = 0;
            Laya.timer.loop(500, this, this.subValue);
        };
        VentonesangerView.prototype.onMouseDown = function () {
            var _this = this;
            SoundManager.getInstance().playEffect("1032a2", 1);
            this.image_change.skin = "resource/assets/img/ui/hit/touch_people_2.png";
            this.nCurNum += 1;
            this.nCurNum = this.nCurNum > this.nNumMax ? this.nNumMax : this.nCurNum;
            this.imageValue.height = this.nHightAdd * this.nCurNum;
            if (this.nCurNum >= 8 && this.nCurNum < 10) {
                var nNum = Utils.random(0, 10);
                if (nNum <= 8) {
                    this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                    this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                    MiniManeger.instance.showBoxAd(function () {
                        ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                        _this.removeSelf();
                    });
                    Laya.timer.clearAll(this);
                }
            }
            else if (this.nCurNum == 10) {
                this.image_change.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                this.image_change.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                MiniManeger.instance.showBoxAd(function () {
                    ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    _this.removeSelf();
                });
                Laya.timer.clearAll(this);
            }
        };
        VentonesangerView.prototype.onMouseUp = function () {
            this.image_change.skin = "resource/assets/img/ui/hit/touch_people_1.png";
        };
        VentonesangerView.prototype.subValue = function () {
            this.nCurNum -= 1;
            this.nCurNum = this.nCurNum < 0 ? 0 : this.nCurNum;
            this.imageValue.height = this.nHightAdd * this.nCurNum;
        };
        return VentonesangerView;
    }(BaseSceneUISkinPopView));

    var LevelBase = (function (_super) {
        __extends(LevelBase, _super);
        function LevelBase(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene";
            _this.bAniDestory = false;
            _this.isLoadStatusOk = false;
            _this.index = 0;
            _this.showLabelObj = {};
            _this.showSoundObj = {};
            _this.aniArr = [];
            _this.localAniName = null;
            _this.urlArr = {};
            _this.localData = null;
            _this.isPop = false;
            _this.mapData = _this.viewData_ = data_;
            return _this;
        }
        LevelBase.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelBase.prototype.childrenCreated = function () {
            this.createLabelIcon();
            this.initView();
            this.addEvent();
        };
        LevelBase.prototype.initPlayerStatus = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ani_player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mapData.player.status) return [3, 2];
                            this.isLoadStatusOk = false;
                            return [4, this.createSkeleton(this.mapData.player.url, true)];
                        case 1:
                            ani_player = _a.sent();
                            if (ani_player == null) {
                                return [2];
                            }
                            (!this.ani_player) && (this.ani_player = ani_player);
                            if (!this.ani_player.parent && !this.box_player.getChildByName("ani_player")) {
                                this.box_player.addChild(this.ani_player);
                                this.isLoadStatusOk = true;
                                this.ani_player.name = "ani_player";
                                this.ani_player.x = this.mapData.player.status.x;
                                this.ani_player.y = this.mapData.player.status.y;
                                this.ani_player.play(this.mapData.player.status.aniN, this.mapData.player.status.loop);
                            }
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        LevelBase.prototype.createLabelIcon = function () {
            var skin = 'resource/assets/img/ui/game/gameinterface_baseboard_8.png';
            this.icon_showLabel = new Laya.Image();
            this.icon_showLabel.skin = skin;
            this.icon_showLabel.visible = false;
            this.lableValue = new Laya.Label();
            this.lableValue.centerX = 0;
            this.lableValue.centerY = -25;
            this.lableValue.fontSize = 30;
            this.lableValue.wordWrap = true;
            this.lableValue.width = 250;
            this.icon_showLabel.addChild(this.lableValue);
            this.boxDialog.addChild(this.icon_showLabel);
        };
        LevelBase.prototype.setData = function (data) {
            this.viewData_ = data;
            this.mapData = data;
        };
        LevelBase.prototype.initView = function () {
            this.bReturbToHome = false;
            this.index = 0;
            this.box_player.x = (this.index) * 1080;
            this.box_game.x = (this.index) * -1080;
            this.showSoundObj = [];
            if (this.pGameView) {
                this.pGameView.removeSelf();
            }
            this.pGameView = null;
            this.box_player.removeChildren();
            this.box_enb.removeChildren();
            this.destroyAni();
            ViewChangeManager.getInstance().CurLevelBase = this;
            this.refreshViewInLevel();
            this.bAniDestory = false;
        };
        LevelBase.prototype.playAni = function (aniName, callBack, isLoop) {
            if (isLoop === void 0) { isLoop = false; }
            console.log("aniName>>>>>>>>>>>>", aniName, "curtime = ", GameLogicProcessingManager.GetCurTime());
            this.localAniName = aniName;
            if (this.ani_player != null) {
                this.ani_player.visible = true;
                if (callBack && this.ani_player.player) {
                    this.ani_player.player.off(Laya.Event.STOPPED, this, this.onComplete);
                    this.ani_player.player.once(Laya.Event.STOPPED, this, this.onComplete, [aniName, callBack]);
                }
                this.ani_player.play(aniName, isLoop, true);
            }
            else {
                callBack && callBack(aniName);
            }
        };
        LevelBase.prototype.onComplete = function (aniName, callBack) {
            console.log("onComplete aniName =", aniName, "curtime = ", GameLogicProcessingManager.GetCurTime());
            callBack && callBack(aniName);
        };
        LevelBase.prototype.createSkeleton = function (url, status) {
            var _this = this;
            if (status === void 0) { status = false; }
            return new Promise(function (resolve) {
                console.log("创建龙骨动画-->" + url);
                if (!status) {
                    _this.urlArr[url] = "0";
                }
                AnimationManager.instance.showSkeletonAnimation(url, function (boomAnimation) {
                    if (boomAnimation == null) {
                        if (_this.urlArr[url] == "0" && status) {
                            resolve(null);
                        }
                        else {
                            resolve(_this.createSkeleton(url, status));
                        }
                        return;
                    }
                    boomAnimation.player.playbackRate = 1;
                    boomAnimation.autoSize = true;
                    boomAnimation.scale(1, 1);
                    _this.aniArr.push(boomAnimation);
                    if (status && _this.urlArr[url] == "0") {
                        console.log(" this.urlArr>>>>>>>>>>", _this.urlArr);
                        resolve(null);
                        return;
                    }
                    resolve(boomAnimation);
                }, 1);
            });
        };
        LevelBase.prototype.onPlayOnce = function () {
            var _this = this;
            this.localData = this.mapData.player.ani[this.localAniName];
            if (this.localData) {
                if (this.localData.pop) {
                    if (this.localData.popTime && this.localData.popTime > 1) {
                        var playTime_1 = 1;
                        var self_1 = this;
                        var platEndCall_1 = function (aniName) {
                            playTime_1++;
                            if (playTime_1 >= self_1.localData.popTime) {
                                if (!self_1.isPop) {
                                    self_1.popChoose();
                                }
                                self_1.playAni(self_1.localData.aniName, function () {
                                }, true);
                            }
                            else {
                                self_1.playAni(self_1.localData.aniName, platEndCall_1);
                            }
                        };
                        this.playAni(this.localData.aniName, platEndCall_1);
                    }
                    else {
                        if (!this.isPop) {
                            this.popChoose();
                        }
                        if (this.localData.loop) {
                            this.playAni(this.localData.aniName, function () {
                            }, true);
                        }
                    }
                }
                else {
                    if (this.localData.isWin == 1) {
                        this.onSuccess();
                        return;
                    }
                    else if (this.localData.isWin == 2) {
                        this.pGameView.showResultIcon(false);
                        Laya.timer.once(1000, this, function () {
                            _this.onFail();
                        });
                        return;
                    }
                    if (this.localData.next) {
                        this.playAni(this.localData.next, function () {
                            _this.onPlayOnce();
                        });
                    }
                }
            }
        };
        LevelBase.prototype.popChoose = function () {
            this.isPop = true;
            console.log("int pop choose!");
            if (!this.pGameView) {
                return;
            }
            var self = this;
            this.pGameView.showChoseView({
                data: this.mapData.player.choose[this.index], callBack: function (right, aniName) {
                    self.callBack(right, aniName);
                }
            });
        };
        LevelBase.prototype.onStart = function () {
            var _this = this;
            var start = this.mapData.player.start;
            this.localData = this.mapData.player.ani[start[this.index]];
            console.log("11111 this.index = ", this.index, "this.localData = ", this.localData);
            var bFlag = false;
            this.playAni(this.localData.aniName, function () {
                _this.onPlayOnce();
            }, bFlag);
        };
        LevelBase.prototype.callBack = function (right, aniName) {
            var _this = this;
            if (right) {
                if (this.index < this.mapData.player.choose.length) {
                    this.index++;
                }
                this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
                this.pGameView.showResultIcon(right);
            }
            this.playAni(aniName, function () {
                _this.onPlayOnce();
            });
        };
        LevelBase.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            if (evt.name != 'undefined' && evt.name) {
                console.log(evt.name);
                if (evt.name.indexOf('sound') > -1) {
                    var soundArr = evt.name.split('_');
                    var count = soundArr[2];
                    var soundName = soundArr[1];
                    var index = null;
                    var soundObj = this.showSoundObj[this.localAniName];
                    if (soundObj == null) {
                        soundObj = {};
                        index = 1;
                        if (Number(count) == 0) {
                            (count) = 1 + '';
                        }
                    }
                    else {
                        index = soundObj[soundName];
                        if (index == null) {
                            index = 1;
                            if (Number(count) == 0) {
                                (count) = 1 + '';
                            }
                        }
                        else {
                            if (Number(count) == 0 || soundName == "1015b") {
                                (count) = 1 + '';
                            }
                            else {
                                return;
                            }
                        }
                    }
                    soundObj[soundName] = index;
                    this.showSoundObj[this.localAniName] = soundObj;
                    console.log('播放声音', count, soundName);
                    SoundManager.getInstance().playEffect(soundName, Number(count));
                }
                else if (evt.name.indexOf('show') > -1) {
                    var showArr = evt.name.split("_");
                    var id = showArr[1];
                    if (!this.showLabelObj[id]) {
                        this.showLabelObj[id] = true;
                        this.showLabelView(parseInt(id));
                    }
                }
            }
        };
        LevelBase.prototype.showLabelView = function (id) {
            var self = this;
            if (self.icon_showLabel) {
                Laya.timer.clearAll(self.icon_showLabel);
                var stAnyData = ConfigManager.getInstance().getDialogInfo(id);
                if (stAnyData) {
                    if (stAnyData.nR == 1) {
                        self.icon_showLabel.scaleX = -1;
                        self.lableValue.scaleX = -1;
                    }
                    else {
                        self.icon_showLabel.scaleX = 1;
                        self.lableValue.scaleX = 1;
                    }
                    self.icon_showLabel.x = stAnyData.nX;
                    self.icon_showLabel.y = stAnyData.nY;
                    console.log("len = ", stAnyData.desc.length);
                    var nWith = stAnyData.desc.length * 30;
                    if (nWith > 250) {
                        nWith = 250;
                    }
                    self.lableValue.width = nWith;
                    self.lableValue.text = stAnyData.desc;
                    self.icon_showLabel.visible = true;
                    Laya.timer.once(1000, self.icon_showLabel, function (icon_showLabel) {
                        icon_showLabel.visible = false;
                    }, [self.icon_showLabel]);
                }
            }
        };
        LevelBase.prototype.destroyAni = function () {
            this.bAniDestory = true;
            var aniArr = this.aniArr;
            var len = aniArr.length;
            for (var i = 0; i < len; i++) {
                var ani = aniArr[i];
                if (ani) {
                    Laya.loader.clearRes(ani.url);
                    ani.stop();
                    ani.removeSelf();
                    ani.destroy(true);
                }
                ani = null;
            }
            this.aniArr = [];
            this.showLabelObj = {};
            this.ani_player = null;
        };
        LevelBase.prototype.addEvent = function () { };
        LevelBase.prototype.removeEvent = function () { };
        LevelBase.prototype.removeSelf = function () {
            this.urlArr = {};
            return _super.prototype.removeSelf.call(this);
        };
        LevelBase.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.destroyAni();
            this.urlArr = {};
        };
        LevelBase.prototype.showGameHome = function () {
            this.initPlayerStatus();
            ViewManager.getInstance().showView(GameHomeView);
        };
        LevelBase.prototype.showGameView = function () { };
        LevelBase.prototype.startGame = function () {
            MiniManeger.instance.hideBlockAd();
            this.urlArr = {};
            ViewChangeManager.getInstance().CommonView.removeBtEvent();
            MiniManeger.instance.StartRecorderVideo();
            this.bReturbToHome = false;
            this.pGameView = ViewManager.getInstance().showView(GameView);
            this.pGameView.startVideoImage();
            this.pGameView.refreshChoose();
            this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
            if (!PlayerDataManager.getInstance().checkDyLogIndexrecorded(PlayerDataManager.getInstance().getCurLevelToChallenge())) {
                ViewChangeManager.getInstance().startGame();
            }
        };
        LevelBase.prototype.stopGame = function () { };
        LevelBase.prototype.restartGame = function (bReStartAll) {
            MiniManeger.instance.StartRecorderVideo();
            this.bReturbToHome = false;
            this.showSoundObj = [];
            this.showLabelObj = [];
            if (this.pGameView) {
                this.pGameView.startVideoImage();
                this.pGameView.hideChoseView();
                this.pGameView.refreshChoose();
                this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
            }
            else {
                console.error("can not find pGameView!");
            }
        };
        LevelBase.prototype.returnToGameHome = function () {
            MiniManeger.instance.StopVideo();
            this.bReturbToHome = true;
            this.destroyAni();
            this.initPlayerStatus();
            if (this.icon_showLabel) {
                this.icon_showLabel.visible = false;
            }
            if (PlayerDataManager.getInstance().getCurLevelToChallenge() == PlayerDataManager.getInstance().getLevelToChangeMaxLevel()) {
                this.initView();
            }
            else {
                if (this.pGameView) {
                    this.pGameView.removeSelf();
                }
                this.pGameView = null;
                GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
                LevelManager.getInstance().createLevelScene(PlayerDataManager.getInstance().getLevelToChangeMaxLevel());
            }
        };
        LevelBase.prototype.clearData = function () {
            this.box_player.removeChildren();
        };
        LevelBase.prototype.onSuccess = function () {
            if (DeviceUtil.isTTMiniGame()) {
                MiniManeger.instance.saveCallF = function () {
                    if (MiniManeger.instance.strVideoPatch && MiniManeger.instance.strVideoPatch != "") {
                        ViewChangeManager.getInstance().showBufferLoadingView();
                        ResUtil.getIntance().loadGroups(["share"], function () {
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            ViewManager.getInstance().showView(ShareRecordVideoView);
                        });
                    }
                    else {
                        if (BaseConst.infos.gameInfo.openPsAward == 1 && ConfigManager.getInstance().getTreasureByCurLevel() == 1) {
                            ViewManager.getInstance().showView(SuccessfulEntryOneView);
                        }
                        else {
                            ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                        }
                    }
                    MiniManeger.instance.saveCallF = null;
                };
            }
            MiniManeger.instance.StopVideo();
            if (this.bReturbToHome) {
                return;
            }
            console.log("Level Success!");
            if (DeviceUtil.isQQMiniGame()) {
                if (DeviceUtil.isQQMiniGame() && ConfigManager.getInstance().getTreasureByCurLevel() == 1) {
                    if (Math.random() < BaseConst.infos.gameInfo.boxWDJ) {
                        ViewManager.getInstance().showView(SuccessfulEntryOneView);
                    }
                    else {
                        ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    }
                }
                else {
                    if (Math.random() < BaseConst.infos.gameInfo.boxWDJ) {
                        ViewManager.getInstance().showView(VentonesangerView);
                    }
                    else {
                        ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    }
                }
            }
            else if (DeviceUtil.isTTMiniGame()) {
                if (MiniManeger.instance.nRecordTimeReal >= MiniManeger.instance.nRecordTime * 1000) {
                    MiniManeger.instance.saveCallF && MiniManeger.instance.saveCallF();
                }
            }
            else {
                if (!DeviceUtil.isWXMiniGame()) {
                    if (BaseConst.infos.gameInfo.openPsAward == 1 && ConfigManager.getInstance().getTreasureByCurLevel() == 1) {
                        ViewManager.getInstance().showView(SuccessfulEntryOneView);
                    }
                    else {
                        ViewManager.getInstance().showView(SuccessfulEntryThreeView);
                    }
                }
                else {
                    this.weCatSpecialSettleMent();
                }
            }
            if (!PlayerDataManager.getInstance().checkDyLogIndexrecorded(PlayerDataManager.getInstance().getCurLevelToChallenge())) {
                ViewChangeManager.getInstance().endGame();
                PlayerDataManager.getInstance().recordDyLogIndex(PlayerDataManager.getInstance().getCurLevelToChallenge());
            }
        };
        LevelBase.prototype.weCatSpecialSettleMent = function () {
            if (!DeviceUtil.isWXMiniGame()) {
                return;
            }
            if (LevelManager.getInstance().nCurLevel >= 3) {
                if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                    MoreGameView.bSuccess = true;
                    ViewManager.getInstance().showView(MoreGameView);
                }
                else {
                    MoreGameRandomGameBox713Temp.bSuccess = true;
                    ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
                }
            }
            else {
                ViewManager.getInstance().showView(SuccessfulEntryThreeView);
            }
            this.pGameView.closeWeCatMoreGameView();
        };
        LevelBase.prototype.onFail = function () {
            MiniManeger.instance.StopVideo();
            if (this.bReturbToHome) {
                return;
            }
            console.log("Level Fail!");
            ViewManager.getInstance().showView(FailEntryOneView);
            if (!PlayerDataManager.getInstance().checkDyLogIndexrecorded(PlayerDataManager.getInstance().getCurLevelToChallenge())) {
                ViewChangeManager.getInstance().endGame();
                PlayerDataManager.getInstance().recordDyLogIndex(PlayerDataManager.getInstance().getCurLevelToChallenge());
            }
        };
        LevelBase.prototype.closeGameView = function () {
            if (this.pGameView) {
                this.pGameView.removeSelf();
                this.pGameView = null;
            }
        };
        LevelBase.prototype.refreshViewInLevel = function () {
            var nCurState = GameStateManager.getInstance().levelState;
            if (nCurState == EnterGameType.enum_EnterGameType_GameHome) {
                this.showGameHome();
                if (this.pGameView) {
                    this.pGameView.removeSelf();
                }
            }
            else {
                if (nCurState == EnterGameType.enum_EnterGameType_Next
                    || nCurState == EnterGameType.enum_EnterGameType_ChooseLevel) {
                    this.startGame();
                }
            }
        };
        LevelBase.prototype.getCurChooseInfo = function () {
            return this.mapData.player.choose[this.index];
        };
        LevelBase.prototype.levelOnShow = function () { };
        LevelBase.prototype.levelOnHide = function () { };
        return LevelBase;
    }(BaseSceneUISkin));

    var LevelScene1 = (function (_super) {
        __extends(LevelScene1, _super);
        function LevelScene1(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene1";
            _this.skin = 'game/level_ks/KsLevelScene1.json';
            return _this;
        }
        LevelScene1.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
            this.stopAni();
        };
        LevelScene1.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene1.prototype.stopGame = function () { };
        LevelScene1.prototype.restartGame = function (bReStartAll) {
            var _this = this;
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
                console.log("restart level1!", bReStartAll);
            }
            else {
                _super.prototype.restartGame.call(this);
                this.ani_long && this.ani_long.play('1-1longdaiji', true);
                this.box_player.x = (this.index) * 1080;
                this.box_game.x = (this.index) * 1080;
                this.boxDowmTotal.x = (this.index) * 1080;
                this.box_enb.x = 1080;
                this.box_player.zOrder = 0;
                var time_1 = 3750;
                Laya.Tween.to(this.boxDowmTotal, { x: -1080 }, time_1);
                Laya.Tween.to(this.box_game, { x: -1080 }, time_1);
                Laya.Tween.to(this.box_enb, { x: 0 }, time_1);
                this.ani_player.x = this.mapData.player.x;
                var startX_1 = this.ani_player.x;
                Laya.Tween.to(this.ani_player, { x: startX_1 + 100 }, time_1 / 3, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(_this.ani_player, { x: startX_1 - 200 }, time_1 * 2 / 3);
                }));
                this.onStart();
            }
        };
        LevelScene1.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, index, time, startX;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.bg.ani.url)];
                        case 1:
                            _a.ani_long = _d.sent();
                            this.ani_long.x = this.mapData.bg.ani.x;
                            this.ani_long.y = this.mapData.bg.ani.y;
                            this.ani_long.play(0, true);
                            this.box_enb.addChild(this.ani_long);
                            _b = !this.ani_player;
                            if (!_b) return [3, 3];
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 2:
                            _b = (_c.ani_player = _d.sent());
                            _d.label = 3;
                        case 3:
                            index = this.box_player.getChildIndex(this.ani_player);
                            if (index == -1) {
                                this.box_player.addChild(this.ani_player);
                            }
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.onStart();
                            this.box_player.x = (this.index) * 1080;
                            this.box_game.x = (this.index) * 1080;
                            this.boxDowmTotal.x = (this.index) * 1080;
                            this.box_enb.x = 1080;
                            time = 3750;
                            Laya.Tween.to(this.boxDowmTotal, { x: -1080 }, time);
                            Laya.Tween.to(this.box_game, { x: -1080 }, time);
                            Laya.Tween.to(this.box_enb, { x: 0 }, time);
                            startX = this.ani_player.x;
                            Laya.Tween.to(this.ani_player, { x: startX + 100 }, time / 3, null, Laya.Handler.create(this, function () {
                                Laya.Tween.to(_this.ani_player, { x: startX - 200 }, time * 2 / 3);
                            }));
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            this.startWaterAni();
                            return [2];
                    }
                });
            });
        };
        LevelScene1.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if (evt.name == "sevent_1-1longdaiji_1") ;
            else if ("sevent_1-2longpenhuo_1" == evt.name) {
                this.ani_long && this.ani_long.play('1-2longpenhuo', false);
            }
            else if ("sevent_1-3longdaixin_1" == evt.name) {
                this.ani_long && this.ani_long.play('1-3longdaixin', false);
                this.box_player.zOrder = 1;
            }
            else if ("smove" == evt.name) {
                Laya.Tween.to(this.box_player, { x: 1080 }, 5500);
                Laya.Tween.to(this.box_game, { x: -1080 }, 5500);
            }
        };
        LevelScene1.prototype.addEvent = function () { };
        LevelScene1.prototype.removeEvent = function () { };
        LevelScene1.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        LevelScene1.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            _super.prototype.clearData.call(this);
            this.removeEvent();
            this.stopAni();
            console.log("level 1 on Removed!");
        };
        LevelScene1.prototype.startWaterAni = function () {
            this.moveSomeOne(this.box_waterup, 0, -1436, 5000);
        };
        LevelScene1.prototype.moveSomeOne = function (box, starX, tox, time) {
            var _this = this;
            Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, function () {
                box.x = starX;
                _this.moveSomeOne(box, starX, tox, time);
            }));
        };
        LevelScene1.prototype.stopAni = function () {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_enb);
            Laya.Tween.clearAll(this.box_waterup);
            Laya.Tween.clearAll(this.boxDowmTotal);
        };
        return LevelScene1;
    }(LevelBase));

    var LevelScene2 = (function (_super) {
        __extends(LevelScene2, _super);
        function LevelScene2(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene2";
            _this.skin = "game/level_ks/KsLevelScene2.json";
            return _this;
        }
        LevelScene2.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene2.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene2.prototype.stopGame = function () {
        };
        LevelScene2.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                this.box_player.x = ((this.index) * 1080);
                this.box_game.x = ((this.index) * (-1080));
                this.onStart();
            }
        };
        LevelScene2.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _c.sent());
                            _c.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene2.prototype.addEvent = function () {
        };
        LevelScene2.prototype.removeEvent = function () {
        };
        LevelScene2.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        LevelScene2.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            _super.prototype.clearData.call(this);
            this.removeEvent();
            console.log("level 2 on Removed!");
        };
        return LevelScene2;
    }(LevelBase));

    var LevelScene3 = (function (_super) {
        __extends(LevelScene3, _super);
        function LevelScene3(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene3";
            _this.isYao = false;
            _this.skin = "game/level_ks/KsLevelScene2.json";
            return _this;
        }
        LevelScene3.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene3.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene3.prototype.stopGame = function () { };
        LevelScene3.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                this.ani_player.x = this.mapData.player.ex;
                Laya.Tween.to(this.ani_player, { x: this.mapData.player.lx }, 1670);
                this.box_player.x = 0;
                this.isYao = false;
                this.box_game.x = 0;
                this.onStart();
            }
        };
        LevelScene3.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _d.sent());
                            _d.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.ex;
                            this.ani_player.y = this.mapData.player.y;
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.bg.ani.url)];
                        case 3:
                            _c.babyAni = _d.sent();
                            this.babyAni.x = this.mapData.bg.ani.x;
                            this.babyAni.y = this.mapData.bg.ani.y;
                            this.box_player.addChild(this.babyAni);
                            Laya.Tween.to(this.ani_player, { x: this.mapData.player.lx }, 1670);
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene3.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if (evt.name == "sevent_3-1_1") {
                this.babyAni && this.babyAni.play('3-1', false);
            }
            else if ("sevent_3-2_1" == evt.name) {
                if (!this.isYao) {
                    this.isYao = true;
                    this.babyAni && this.babyAni.play('3-2', true);
                }
            }
            else if ("sevent_3-4_1" == evt.name) {
                this.babyAni && this.babyAni.play('3-4', false);
            }
            else if ("sevent_3-5_1" == evt.name) {
                this.babyAni && this.babyAni.play('3-5', false);
            }
        };
        LevelScene3.prototype.addEvent = function () {
        };
        LevelScene3.prototype.removeEvent = function () {
        };
        LevelScene3.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        LevelScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
        };
        return LevelScene3;
    }(LevelBase));

    var LevelScene4 = (function (_super) {
        __extends(LevelScene4, _super);
        function LevelScene4(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene4";
            _this.skin = "game/level_ks/KsLevelScene4.json";
            return _this;
        }
        LevelScene4.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene4.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene4.prototype.callBack = function (right, aniName) {
            var _this = this;
            if (right) {
                this.index++;
                this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
                this.pGameView.showResultIcon(right);
            }
            this.playAni(aniName, function () {
                _this.onPlayOnce();
            });
        };
        LevelScene4.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.bean && this.bean.removeSelf();
                            this.door && this.door.removeSelf();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _e.sent());
                            _e.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.bean.url)];
                        case 3:
                            _c.bean = _e.sent();
                            this.bean.x = this.mapData.bean.x;
                            this.bean.y = this.mapData.bean.y;
                            this.bean.stop();
                            this.box_game.addChild(this.bean);
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.door.url)];
                        case 4:
                            _d.door = _e.sent();
                            this.door.x = this.mapData.door.x;
                            this.door.y = this.mapData.door.y;
                            this.box_game.addChild(this.door);
                            this.box_game.x = this.box_game_1.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene4.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if (evt.name == "sevent_tengwan_1") {
                this.bean.play('tengwan', false);
            }
            else if ("sevent_men_1" == evt.name) {
                this.door.play('men', false);
            }
            else if ("sevent_xisui_1" == evt.name) {
                this.door.play('xisui', false);
            }
            else if ("smove" == evt.name) {
                Laya.Tween.to(this.box_game, { x: -1080 }, 4130);
                Laya.Tween.to(this.box_game_1, { x: -1080 }, 4130);
            }
            else if ("pmove_69" == evt.name) {
                Laya.Tween.to(this.ani_player, { x: 650 }, 69 * 1000 / 24);
            }
            else if ("pmove_48" == evt.name) {
                Laya.Tween.to(this.ani_player, { x: 1200 }, 48 * 1000 / 24);
            }
        };
        LevelScene4.prototype.addEvent = function () { };
        LevelScene4.prototype.removeEvent = function () {
            if (this.ani_player) {
                this.ani_player.off(Laya.Event.LABEL, this, this.onPlayLabel);
            }
        };
        LevelScene4.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        LevelScene4.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.stopAni();
        };
        LevelScene4.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene4.prototype.stopGame = function () { };
        LevelScene4.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                this.onStart();
            }
        };
        LevelScene4.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene4;
    }(LevelBase));

    var LevelScene5 = (function (_super) {
        __extends(LevelScene5, _super);
        function LevelScene5(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene5";
            _this.isGouMove = false;
            _this.skin = "game/level_ks/KsLevelScene5.json";
            return _this;
        }
        LevelScene5.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene5.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene5.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.gou && this.gou.removeSelf();
                            this.heiping && this.heiping.removeSelf();
                            this.men && this.men.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.gou.url)];
                        case 1:
                            _a.gou = _f.sent();
                            this.gou.x = this.mapData.gou.x;
                            this.gou.y = this.mapData.gou.y;
                            this.box_game.addChild(this.gou);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.men.url)];
                        case 2:
                            _b.men = _f.sent();
                            this.men.x = this.mapData.men.x;
                            this.men.y = this.mapData.men.y;
                            this.box_game.addChild(this.men);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.heiping.url)];
                        case 3:
                            _c.heiping = _f.sent();
                            this.heiping.x = this.mapData.heiping.x;
                            this.heiping.scaleX = 1080 / 1052;
                            this.heiping.scaleY = 718 / 708;
                            this.heiping.y = this.mapData.heiping.y;
                            this.box_game_1.addChild(this.heiping);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = this.box_game.x = this.box_game_1.x = this.box_game_2.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene5.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "sevent_5-g1_1":
                    this.gou && this.gou.play("5-g1", true);
                    break;
                case "sevent_5-g3_1":
                    this.gou && this.gou.play("5-g3", false);
                    break;
                case "sevnet_5-g4_1":
                    this.gou && this.gou.play("5-g4", false);
                    break;
                case "sevent_5-heiping1_1":
                    this.heiping && this.heiping.play("5-heiping1", false);
                    break;
                case "sevent_5-heiping3_1":
                    this.heiping && this.heiping.play("5-heiping3", false);
                    break;
                case "sevent_5-men10_1":
                    this.men && this.men.play("5-men10", false);
                    break;
                case "smove4":
                    if (this.box_game.x == 0) {
                        Laya.Tween.to(this.box_game, { x: -1080 }, 3300);
                        Laya.Tween.to(this.box_game_1, { x: -1080 }, 3300);
                        Laya.Tween.to(this.box_game_2, { x: -1080 }, 3300);
                    }
                    break;
                case "smove":
                    if (this.box_game.x == -1080) {
                        Laya.Tween.to(this.box_game, { x: -2160 }, 4160);
                        Laya.Tween.to(this.box_game_1, { x: -2160 }, 4160);
                        Laya.Tween.to(this.box_game_2, { x: -2160 }, 4160);
                    }
                    break;
                case "smove3":
                    break;
                case "sevent_5-g10_1":
                    if (!this.isGouMove) {
                        this.isGouMove = true;
                        if (this.gou) {
                            this.gou.x = 900;
                            Laya.Tween.to(this.gou, { x: 1650 }, 1800);
                            this.gou.play("5-g10", true);
                        }
                    }
                    break;
                case "sevent_5-men11_1":
                    this.men && this.men.play("5-men11", false);
                    break;
                case "sevent_5-men13_1":
                    this.men && this.men.play("5-men13", false);
                    break;
                case "sevent_5-men12_1":
                    this.men && this.men.play("5-men12", false);
                    break;
                case "sevent_5-men14_1":
                    this.men && this.men.play("5-men14", false);
                    break;
            }
        };
        LevelScene5.prototype.addEvent = function () { };
        LevelScene5.prototype.removeEvent = function () {
            if (this.ani_player) {
                this.ani_player.off(Laya.Event.LABEL, this, this.onPlayLabel);
            }
        };
        LevelScene5.prototype.removeSelf = function () {
            return _super.prototype.removeSelf.call(this);
        };
        LevelScene5.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEvent();
            this.stopAni();
        };
        LevelScene5.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene5.prototype.stopGame = function () { };
        LevelScene5.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_game.x = this.box_game_1.x = this.box_game_2.x = 0;
                }
                else if (this.index == 1) {
                    this.box_game.x = this.box_game_1.x = this.box_game_2.x = -1080;
                    this.heiping && this.heiping.play("5-heiping1", false);
                }
                else if (this.index == 2) {
                    this.men && this.men.play("5-men12", false);
                    this.box_game.x = this.box_game_1.x = this.box_game_2.x = -2160;
                }
                this.onStart();
            }
        };
        LevelScene5.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene5;
    }(LevelBase));

    var LevelScene6 = (function (_super) {
        __extends(LevelScene6, _super);
        function LevelScene6(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene6";
            _this.bFlagMove = false;
            _this.skin = "game/level_ks/KsLevelScene6.json";
            return _this;
        }
        LevelScene6.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene6.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene6.prototype.initView = function () {
            this.stopAni();
            _super.prototype.initView.call(this);
        };
        LevelScene6.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene6.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.ani_changjin && this.ani_changjin.removeSelf();
                            this.ani_hd && this.ani_hd.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.cg.ani.url)];
                        case 1:
                            _a.ani_changjin = _e.sent();
                            this.ani_changjin.x = this.mapData.cg.x;
                            this.ani_changjin.y = this.mapData.cg.y;
                            this.box_game.addChild(this.ani_changjin);
                            this.ani_changjin.play("tengman2", false);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.hd.ani.url)];
                        case 2:
                            _b.ani_hd = _e.sent();
                            this.ani_hd.x = this.mapData.hd.x;
                            this.ani_hd.y = this.mapData.hd.y;
                            this.box_game.addChild(this.addChild(this.ani_hd));
                            this.ani_hd.play("daiji", true);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene6.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "sevent_tengman_1":
                    this.ani_changjin.play("tengman", false);
                    break;
                case "smovex":
                    if (this.box_game.x == 0) {
                        Laya.Tween.to(this.box_game, { x: -1040 }, 4650);
                        Laya.Tween.to(this.box_game_1, { x: -1040 }, 4650);
                        Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx1 }, 4650);
                    }
                    break;
                case "sevent_nianye1_1":
                    var self_1 = this;
                    Laya.timer.once(1000, self_1, function () {
                        Laya.Tween.to(self_1.ani_changjin, { alpha: 0 }, 500, null, Laya.Handler.create(self_1, function () {
                            self_1.ani_changjin.alpha = 1;
                            self_1.ani_changjin.play("nianye1", true);
                        }));
                    });
                    break;
                case "sevent_nianye2_1":
                    this.ani_changjin.play("nianye2", false);
                    break;
                case "smove2x":
                    if (this.box_game.x == -1040) {
                        Laya.Tween.to(this.box_game, { x: -2120 }, 6000);
                        Laya.Tween.to(this.box_game_1, { x: -2120 }, 6000);
                        Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx2 }, 4650);
                    }
                    break;
                case "sevent_chaoxiao_1":
                    this.ani_hd.play("chaoxiao", false);
                    break;
                case "sevent_xuanyun_1":
                    this.ani_hd.play("xuanyun", false);
                    break;
                case "smove3x":
                    Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx3 }, 4650);
                    break;
            }
        };
        LevelScene6.prototype.startGame = function () {
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene6.prototype.stopGame = function () { };
        LevelScene6.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                _super.prototype.initView.call(this);
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                if (this.index == 2) {
                    this.ani_hd.play("daiji", true);
                }
                _super.prototype.restartGame.call(this);
                this.onStart();
            }
        };
        LevelScene6.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_game_1);
        };
        return LevelScene6;
    }(LevelBase));

    var LevelScene7 = (function (_super) {
        __extends(LevelScene7, _super);
        function LevelScene7(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene7";
            _this.skin = "game/level_ks/KsLevelScene7.json";
            return _this;
        }
        LevelScene7.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene7.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene7.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        LevelScene7.prototype.initView = function () {
            _super.prototype.initView.call(this);
        };
        LevelScene7.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.ani_huo && this.ani_huo.removeSelf();
                            this.sashui && this.sashui.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.huoyan.ani.url)];
                        case 1:
                            _a.ani_huo = _e.sent();
                            this.ani_huo.x = this.mapData.huoyan.x;
                            this.ani_huo.y = this.mapData.huoyan.y;
                            this.ani_huo.play("huo3", true);
                            this.box_game.addChild(this.ani_huo);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.sashui.ani.url)];
                        case 2:
                            _b.sashui = _e.sent();
                            this.sashui.x = this.mapData.sashui.x;
                            this.sashui.y = this.mapData.sashui.y;
                            this.sashui.scale(1.2, 1.2);
                            this.sashui.play("sashui1_1", true);
                            this.box_game.addChild(this.sashui);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene7.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if ("sevent_huo1_1" == evt.name) {
                this.ani_huo && this.ani_huo.play("huo1", false);
            }
            else if ("sevent_huo2_1" == evt.name) {
                this.ani_huo && this.ani_huo.play("huo2", false);
            }
            else if ("smove" == evt.name) {
                Laya.Tween.to(this.box_game, { x: -1040 }, 5000);
                Laya.Tween.to(this.box_game_1, { x: -1040 }, 5000);
            }
            else if ("sevent_sashui1_1" == evt.name) {
                this.sashui && this.sashui.play("sashui1", true);
            }
            else if ("sevent_sashui1_2" == evt.name) {
                this.sashui && this.sashui.play("sashui2", false);
            }
            else if ("smove1" == evt.name) {
                Laya.Tween.to(this.box_game, { x: -2120 }, 4880);
                Laya.Tween.to(this.box_game_1, { x: -2120 }, 4880);
            }
        };
        LevelScene7.prototype.callBack = function (right, aniName) {
            var _this = this;
            if (right) {
                if (this.index < this.mapData.player.choose.length) {
                    this.index++;
                }
                this.pGameView.refreshUpIndeInfo(this.index, this.mapData.player.choose.length);
                this.pGameView.showResultIcon(right);
            }
            if (aniName == "7-5") {
                Laya.Tween.to(this.box_player, { x: this.mapData.player.tx }, 2000, null, null, 1000);
            }
            this.playAni(aniName, function () {
                _this.onPlayOnce();
            });
        };
        LevelScene7.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene7.prototype.stopGame = function () { };
        LevelScene7.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.ani_huo && this.ani_huo.play("huo3", true);
                }
                else if (this.index == 1) {
                    this.box_player.x = 0;
                }
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        return LevelScene7;
    }(LevelBase));

    var LevelScene8 = (function (_super) {
        __extends(LevelScene8, _super);
        function LevelScene8(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene8";
            _this.skin = "game/level_ks/KsLevelScene8.json";
            return _this;
        }
        LevelScene8.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene8.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene8.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        LevelScene8.prototype.initView = function () {
            _super.prototype.initView.call(this);
        };
        LevelScene8.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.laoshu && this.laoshu.removeSelf();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _d.sent());
                            _d.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.laoshu.url)];
                        case 3:
                            _c.laoshu = _d.sent();
                            this.laoshu.x = this.mapData.laoshu.x;
                            this.laoshu.y = this.mapData.laoshu.y;
                            this.laoshu.play("8-1ls", true);
                            this.box_game.addChild(this.laoshu);
                            this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene8.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    break;
                case "smove2":
                    if (this.box_game.x == 0) {
                        Laya.Tween.to(this.box_game, { x: -1080 }, 3460);
                        Laya.Tween.to(this.box_game_1, { x: -1080 }, 3460);
                    }
                    break;
                case "sevent_8-1ls_1":
                    break;
                case "sevent_8-2ls_1":
                    this.laoshu && this.laoshu.play("8-2ls", false);
                    break;
                case "smove3":
                    if (this.box_game.x == -1080) {
                        Laya.Tween.to(this.box_game, { x: -2160 }, 3170);
                        Laya.Tween.to(this.box_game_1, { x: -2160 }, 3170);
                    }
                    break;
                case "sevent_8-3ls_1":
                    this.laoshu && this.laoshu.play("8-3ls", false);
                    Laya.Tween.to(this.laoshu, { x: this.mapData.laoshu.toX }, 2000);
                    break;
                case "smove4":
                    break;
            }
        };
        LevelScene8.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene8.prototype.stopGame = function () { };
        LevelScene8.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) {
                    this.laoshu && this.laoshu.play("8-1ls", true);
                }
                else if (this.index == 2) {
                    this.laoshu && (this.laoshu.x = this.mapData.laoshu.x);
                    this.laoshu && this.laoshu.play("8-1ls", true);
                }
                this.onStart();
            }
        };
        return LevelScene8;
    }(LevelBase));

    var LevelScene9 = (function (_super) {
        __extends(LevelScene9, _super);
        function LevelScene9(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene9";
            _this.skin = "game/level_ks/KsLevelScene9.json";
            return _this;
        }
        LevelScene9.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene9.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene9.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene9.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene9.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.penquan && this.penquan.removeSelf();
                            this.huoci && this.huoci.removeSelf();
                            this.heipao && this.heipao.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.huoci.url)];
                        case 1:
                            _a.huoci = _f.sent();
                            this.huoci.x = this.mapData.huoci.x;
                            this.huoci.y = this.mapData.huoci.y;
                            this.huoci.play("9-hc1", true);
                            this.box_game.addChild(this.huoci);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.penquan.url)];
                        case 2:
                            _b.penquan = _f.sent();
                            this.penquan.x = this.mapData.penquan.x;
                            this.penquan.y = this.mapData.penquan.y;
                            this.penquan.play("9-pq8", true);
                            this.box_game.addChild(this.penquan);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.heipao.url)];
                        case 3:
                            _c.heipao = _f.sent();
                            this.heipao.x = this.mapData.heipao.x;
                            this.heipao.y = this.mapData.heipao.y;
                            this.heipao.play("9-hp13", true);
                            this.box_game.addChildAt(this.heipao, 5);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene9.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    if (this.box_game.x == 0)
                        Laya.Tween.to(this.box_game, { x: -1080 }, 3460);
                    break;
                case "sevent_9-hc1_1":
                    this.huoci && this.huoci.play("9-hc1", false);
                    break;
                case "sevent_9-hc4_1":
                    this.huoci && this.huoci.play("9-hc4", false);
                    break;
                case "sevent_9-hc5_1":
                    this.huoci && this.huoci.play("9-hc5", false);
                    break;
                case "smove1":
                    if (this.box_game.x == -1080)
                        Laya.Tween.to(this.box_game, { x: -2160 }, 3460);
                    break;
                case "sevent_9-pq8_1":
                    break;
                case "sevent_9-pq10_1":
                    this.penquan && this.penquan.play("9-pq10", false);
                    break;
                case "smove3":
                    if (this.box_game.x == -2160)
                        Laya.Tween.to(this.box_game, { x: -3240 }, 3460);
                    break;
                case "sevent_9-hp13_1":
                    break;
                case "sevent_9-hp14_1":
                    this.heipao && this.heipao.play("9-hp14", false);
                    break;
                case "sevent_9-hp15_1":
                    this.heipao && this.heipao.play("9-hp15", false);
                    break;
                case "smove4":
                    if (this.box_game.x == -3240)
                        Laya.Tween.to(this.box_game, { x: -3900 }, 2580);
                    break;
            }
        };
        LevelScene9.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene9.prototype.stopGame = function () {
        };
        LevelScene9.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_game.x = 0;
                    this.huoci && this.huoci.play("9-hc1", true);
                }
                else if (this.index == 1) {
                    this.penquan && this.penquan.play("9-pq8", true);
                }
                else if (this.index == 2) {
                    this.heipao && this.heipao.play("9-hp13", true);
                }
                this.onStart();
            }
        };
        LevelScene9.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene9;
    }(LevelBase));

    var LevelScene10 = (function (_super) {
        __extends(LevelScene10, _super);
        function LevelScene10(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene10";
            _this.isHeiPaodaiji = false;
            _this.skin = "game/level_ks/KsLevelScene10.json";
            return _this;
        }
        LevelScene10.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene10.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene10.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene10.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene10.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.heipao.url)];
                        case 1:
                            _a.heipao = _e.sent();
                            this.heipao.x = this.mapData.heipao.x;
                            this.heipao.y = this.mapData.heipao.y;
                            this.heipao.stop();
                            this.box_player.addChild(this.heipao);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.long.url)];
                        case 2:
                            _b.long = _e.sent();
                            this.long.x = this.mapData.long.x;
                            this.long.y = this.mapData.long.y;
                            this.box_player.addChild(this.long);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene10.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    if (this.box_game.x == 0)
                        Laya.Tween.to(this.box_game, { x: -1080 }, 3080);
                    break;
                case "sevent_10-1zoulu_1":
                    this.heipao && this.heipao.play("10-1zoulu", false);
                    this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                    break;
                case "sevent_10-2daiji_1":
                    if (!this.isHeiPaodaiji) {
                        this.isHeiPaodaiji = true;
                        this.heipao && this.heipao.play("10-2daiji", true);
                    }
                    break;
                case "sevent_10-4shuiqiu_1":
                    this.heipao && this.heipao.play("10-4shuiqiu", false);
                    break;
                case "sevent_10-3xiongmao":
                    this.heipao && this.heipao.play("10-3xiongmao", false);
                    break;
                case "smove2":
                    if (this.box_game.x == -1080) {
                        this.isHeiPaodaiji = false;
                        Laya.Tween.to(this.box_game, { x: -2160 }, 4000);
                        this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.x }, 800));
                    }
                    break;
                case "sevent_10-5zoulu_1":
                    this.heipao && this.heipao.play("10-5zoulu", false);
                    this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                    break;
                case "sevent_10-6daiji_1":
                    if (!this.isHeiPaodaiji) {
                        this.isHeiPaodaiji = true;
                        this.heipao && this.heipao.play("10-6daiji", false);
                    }
                    break;
                case "sevent_10-7shengzi_1":
                    this.heipao && this.heipao.play("10-7shengzi", false);
                    break;
                case "sevent_10-8chuizi_1":
                    this.heipao && this.heipao.play("10-8chuizi", false);
                    break;
                case "smove3":
                    if (this.box_game.x == -2160) {
                        this.isHeiPaodaiji = false;
                        Laya.Tween.to(this.box_game, { x: -3240 }, 3000);
                        this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.x }, 500));
                    }
                    break;
                case "sevent_10-9zoulu_1":
                    this.heipao && this.heipao.play("10-9zoulu", false);
                    this.heipao && (Laya.Tween.to(this.heipao, { x: this.mapData.heipao.tx }, 3000));
                    break;
                case "sevent_10-10daiji_1":
                    if (!this.isHeiPaodaiji) {
                        this.isHeiPaodaiji = true;
                        this.heipao && this.heipao.play("10-10daiji", false);
                    }
                    break;
                case "sevent_10-11xiaoxiongmao_1":
                    this.heipao && this.heipao.play("10-11xiaoxiongmao", false);
                    break;
                case "enterLong":
                    Laya.Tween.to(this.long, { x: this.mapData.long.tx }, 1500);
                    break;
                case "sevent_1-2longpenhuo_1":
                    this.long && this.long.play("1-2longpenhuo", false);
                    break;
                case "sevent_10-12huolong_1":
                    this.heipao && this.heipao.play("10-12huolong", false);
                    break;
            }
        };
        LevelScene10.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene10.prototype.stopGame = function () { };
        LevelScene10.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.isHeiPaodaiji = false;
                    this.box_game.x = 0;
                    this.heipao && this.heipao.stop();
                    this.heipao && (this.heipao.x = this.mapData.heipao.x - 20);
                }
                else if (this.index == 1) {
                    this.isHeiPaodaiji = false;
                    this.heipao && this.heipao.play("10-6daiji", true);
                }
                else if (this.index == 2) {
                    this.isHeiPaodaiji = false;
                    this.heipao && this.heipao.play("10-10daiji", true);
                }
                this.onStart();
            }
        };
        LevelScene10.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene10;
    }(LevelBase));

    var LevelScene11 = (function (_super) {
        __extends(LevelScene11, _super);
        function LevelScene11(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene11";
            _this.skin = "game/level_ks/KsLevelScene11.json";
            return _this;
        }
        LevelScene11.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene11.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene11.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene11.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene11.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.heipao && this.heipao.removeSelf();
                            this.men && this.men.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.heipao.url)];
                        case 1:
                            _a.heipao = _e.sent();
                            this.heipao.x = this.mapData.heipao.x;
                            this.heipao.y = this.mapData.heipao.y;
                            this.heipao.play("11-hp2", true);
                            this.box_game.addChild(this.heipao);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.men.url)];
                        case 2:
                            _b.men = _e.sent();
                            this.men.x = this.mapData.men.x;
                            this.men.y = this.mapData.men.y;
                            this.box_game.addChild(this.men);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = this.box_game_1.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene11.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "sevent_11-hp2_1":
                    this.heipao && this.heipao.play("11-hp2", false);
                    break;
                case "sevent_11-hp3_1":
                    this.heipao && this.heipao.play("11-hp3", false);
                    break;
                case "sevent_11-hp4_1":
                    this.heipao && this.heipao.play("11-hp4", false);
                    break;
                case "smove":
                    if (this.box_game.x == 0) {
                        Laya.Tween.to(this.box_game, { x: -1045 }, 3750);
                        Laya.Tween.to(this.box_game_1, { x: -1045 }, 3750);
                    }
                    break;
                case "smove1":
                    if (this.box_game.x == -1045) {
                        Laya.Tween.to(this.box_game, { x: -2145 }, 5000);
                        Laya.Tween.to(this.box_game_1, { x: -2145 }, 5000);
                    }
                    break;
                case "sevent_11-m12_1":
                    this.men && this.men.play("11-m12", false);
                    break;
                case "sevent_11-m13_1":
                    this.men && this.men.play("11-m13", false);
                    break;
                case "sevent_11-m14_1":
                    this.men && this.men.play("11-m14", false);
                    break;
            }
        };
        LevelScene11.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene11.prototype.stopGame = function () { };
        LevelScene11.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.heipao.play("11-hp2", true);
                }
                else if (this.index == 2) {
                    this.men && this.men.play("11-m12", false);
                }
                this.onStart();
            }
        };
        LevelScene11.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene11;
    }(LevelBase));

    var LevelScene12 = (function (_super) {
        __extends(LevelScene12, _super);
        function LevelScene12(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene12";
            _this.skin = "game/level_ks/KsLevelScene12.json";
            return _this;
        }
        LevelScene12.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene12.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene12.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene12.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene12.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.huo && this.huo.removeSelf();
                            this.men && this.men.removeSelf();
                            this.bianfu && this.bianfu.removeSelf();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.huo.url)];
                        case 1:
                            _a.huo = _f.sent();
                            this.huo.x = this.mapData.huo.x;
                            this.huo.y = this.mapData.huo.y;
                            this.huo.stop();
                            this.box_game.addChild(this.huo);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.men.url)];
                        case 2:
                            _b.men = _f.sent();
                            this.men.x = this.mapData.men.x;
                            this.men.y = this.mapData.men.y;
                            this.men.play("men2", false);
                            this.box_game.addChild(this.men);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.bianfu.url)];
                        case 3:
                            _c.bianfu = _f.sent();
                            this.bianfu.x = this.mapData.bianfu.x;
                            this.bianfu.y = this.mapData.bianfu.y;
                            this.box_game.addChild(this.bianfu);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = this.box_game.x = this.box_game_1.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene12.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    if (this.box_game.x == 0) {
                        Laya.Tween.to(this.box_game, { x: -1080 }, 4920);
                        Laya.Tween.to(this.box_game_1, { x: -1080 }, 4920);
                    }
                    break;
                case "smove1":
                    if (this.box_game.x == -1080) {
                        Laya.Tween.to(this.box_game, { x: -2160 }, 4960);
                        Laya.Tween.to(this.box_game_1, { x: -2160 }, 4960);
                    }
                    break;
                case "sevent_men2_1":
                    this.men && this.men.play("men1", false);
                    if (this.bianfu) {
                        Laya.Tween.to(this.bianfu, { x: this.mapData.bianfu.tx }, 1500);
                        this.bianfu.play("bianfu1", true);
                    }
                    break;
                case "sevent_men1_1":
                    this.men && this.men.play("men1", false);
                    break;
                case "sevent_bianfu2_1":
                    this.bianfu && this.bianfu.play("bianfu2", false);
                    break;
                case "sevent_bianfu1_1":
                    this.bianfu && this.bianfu.play("bianfu1", false);
                    break;
                case "sevent_huo_1":
                    this.huo && this.huo.play("huo", false);
                    break;
                case "sevent_bianfu3_1":
                    this.bianfu && this.bianfu.play("bianfu3", false);
                    break;
                case "smove2":
                    Laya.Tween.to(this.ani_player, { x: this.mapData.player.tx }, 4960);
                    break;
            }
        };
        LevelScene12.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene12.prototype.stopGame = function () { };
        LevelScene12.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) ;
                else if (this.index == 2) {
                    this.bianfu && (this.bianfu.x = this.mapData.bianfu.x);
                    this.bianfu && this.bianfu.play("bianfu2", true);
                    this.men && this.men.play("men2", false);
                    this.huo && this.huo.play("huo", false, true, 0, 0.04);
                    this.men && this.men.play("men1", false);
                    if (this.bianfu) {
                        Laya.Tween.to(this.bianfu, { x: this.mapData.bianfu.tx }, 1500);
                        this.bianfu.play("bianfu1", true);
                    }
                }
                this.onStart();
            }
        };
        LevelScene12.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_game_1);
        };
        return LevelScene12;
    }(LevelBase));

    var LevelScene14 = (function (_super) {
        __extends(LevelScene14, _super);
        function LevelScene14(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene14";
            _this.skin = "game/level_ks/KsLevelScene14.json";
            return _this;
        }
        LevelScene14.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene14.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene14.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene14.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene14.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.box_gou.removeChildren();
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.men.url)];
                        case 1:
                            _a.men = _e.sent();
                            this.men.x = this.mapData.men.x;
                            this.men.y = this.mapData.men.y;
                            this.men.play("men2", false);
                            this.box_enb.addChild(this.men);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.gou.url)];
                        case 2:
                            _b.gou = _e.sent();
                            this.gou.x = this.mapData.gou.x;
                            this.gou.y = this.mapData.gou.y;
                            this.gou.play("gou1", true);
                            this.box_gou.addChild(this.gou);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.box_frame.x = 0;
                            this.box_dowm.x = 0;
                            this.image_fj.visible = true;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene14.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "tmove":
                    Laya.Tween.to(this.box_player, { x: 540 }, 2750);
                    break;
                case "sevent_men1_1":
                    this.men && this.men.play("men1", false);
                    break;
                case "smove2":
                    Laya.Tween.to(this.box_game, { x: -1080 }, 4170);
                    Laya.Tween.to(this.box_dowm, { x: -1080 }, 4170);
                    Laya.Tween.to(this.box_frame, { x: -1080 }, 4170);
                    Laya.Tween.to(this.box_player, { x: 0 }, 4170);
                    break;
                case "sevent_gou2_1":
                    this.gou.play("gou2", false);
                    break;
                case "sevent_gou3_1":
                    this.gou.play("gou3", false);
                    break;
                case "smove3":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 4170);
                    Laya.Tween.to(this.box_dowm, { x: -2160 }, 4170);
                    break;
                case "sevent_lol_1":
                    this.image_fj.visible = false;
                    break;
                case "sevent_lol2_1":
                    this.image_fj.visible = false;
                    break;
            }
        };
        LevelScene14.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene14.prototype.stopGame = function () { };
        LevelScene14.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = -100;
                }
                else if (this.index == 1) {
                    this.gou.play("gou1", true);
                }
                else if (this.index == 2) {
                    this.image_fj.visible = true;
                }
                this.onStart();
            }
        };
        LevelScene14.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_dowm);
        };
        return LevelScene14;
    }(LevelBase));

    var LevelScene13 = (function (_super) {
        __extends(LevelScene13, _super);
        function LevelScene13(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene13";
            _this.nEventZouLu = false;
            _this.bSmove = false;
            _this.bSmove2 = false;
            _this.skin = "game/level_ks/KsLevelScene13.json";
            return _this;
        }
        LevelScene13.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene13.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene13.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene13.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene13.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.nEventZouLu = false;
                            this.bSmove = false;
                            this.bSmove2 = false;
                            this.box_duwu.removeChildren();
                            this.box_heipao.removeChildren();
                            this.box_heipao.x = 1080;
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.duwu.url)];
                        case 1:
                            _a.duwu = _e.sent();
                            this.duwu.x = this.mapData.duwu.x;
                            this.duwu.y = this.mapData.duwu.y;
                            this.duwu.play("daiji", true);
                            this.box_duwu.addChild(this.duwu);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.heipao.url)];
                        case 2:
                            _b.heipao = _e.sent();
                            this.heipao.x = this.mapData.heipao.x;
                            this.heipao.y = this.mapData.heipao.y;
                            this.heipao.play("daiji", true);
                            this.box_heipao.addChild(this.heipao);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = -100;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene13.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            console.log(evt.name);
            switch (evt.name) {
                case "tmove":
                    Laya.Tween.to(this.box_player, { x: 0 }, 1920);
                    break;
                case "sevent_xiaoshi_1":
                    this.duwu.play("xiaoshi", false);
                    break;
                case "smove":
                    if (!this.bSmove) {
                        this.bSmove = true;
                        return;
                    }
                    Laya.Tween.to(this.box_game, { x: -1080 }, 4790);
                    Laya.Tween.to(this.box_dowm, { x: -1080 }, 4790);
                    break;
                case "sevent_zoulu_1":
                    if (!this.nEventZouLu) {
                        this.nEventZouLu = true;
                        return;
                    }
                    Laya.Tween.to(this.box_heipao, { x: 600 }, 1710);
                    this.heipao.play("zoulu", false);
                    break;
                case "sevent_huida_1":
                    this.heipao.play("huida", false);
                    break;
                case "sevent_shuaidao_1":
                    this.heipao.play("shuaidao", false);
                    break;
                case "smove2":
                    if (!this.bSmove2) {
                        this.bSmove2 = true;
                        return;
                    }
                    Laya.Tween.to(this.box_game, { x: -2160 }, 4960);
                    Laya.Tween.to(this.box_heipao, { x: -1400 }, 4960);
                    break;
                case "sevent_kaimen_1":
                    this.box_heipao.zOrder = 1;
                    this.heipao.play("kaimen", false);
                    Laya.Tween.to(this.box_heipao, { x: 0 }, 3460);
                    break;
                case "sevent_wenhao_1":
                    this.box_heipao.zOrder = 1;
                    this.heipao.play("wenhao", false);
                    Laya.Tween.to(this.box_heipao, { x: 0 }, 1710);
                    break;
                case "pop":
                    Laya.Tween.to(this.heipao, { x: 1080 }, 1250);
                    break;
            }
        };
        LevelScene13.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene13.prototype.stopGame = function () { };
        LevelScene13.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = -100;
                }
                else if (this.index == 1) ;
                else if (this.index == 2) {
                    this.box_heipao.x = -1400;
                }
                this.onStart();
            }
        };
        LevelScene13.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_dowm);
        };
        return LevelScene13;
    }(LevelBase));

    var LevelScene16 = (function (_super) {
        __extends(LevelScene16, _super);
        function LevelScene16(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene16";
            _this.skin = "game/level_ks/KsLevelScene16.json";
            return _this;
        }
        LevelScene16.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene16.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene16.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene16.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene16.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.men.url)];
                        case 1:
                            _a.men = _f.sent();
                            this.men.x = this.mapData.men.x;
                            this.men.y = this.mapData.men.y;
                            this.men.play("men2", false);
                            this.box_enb.addChild(this.men);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.huaping.url)];
                        case 2:
                            _b.huaping = _f.sent();
                            this.huaping.x = this.mapData.huaping.x;
                            this.huaping.y = this.mapData.huaping.y;
                            this.huaping.play("huaping1", false);
                            this.box_enb.addChild(this.huaping);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.daochaoren.url)];
                        case 3:
                            _c.daochaoren = _f.sent();
                            this.daochaoren.x = this.mapData.daochaoren.x;
                            this.daochaoren.y = this.mapData.daochaoren.y;
                            this.daochaoren.play("daocaoren1", false);
                            this.box_enb.addChild(this.daochaoren);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.box_frame.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene16.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "tmove":
                    Laya.Tween.to(this.box_player, { x: 540 }, 1460);
                    break;
                case "sevent_men1_1":
                    this.men.play("men1", false);
                    break;
                case "smove":
                    Laya.Tween.to(this.box_game, { x: -1080 }, 3000);
                    Laya.Tween.to(this.box_frame, { x: -1080 }, 3000);
                    Laya.Tween.to(this.box_player, { x: 50 }, 3000);
                    break;
                case "sevent_huaping2_1":
                    this.huaping.play("huaping2", false);
                    break;
                case "sevent_huaping3_1":
                    this.huaping.play("huaping3", false);
                    Laya.Tween.to(this.huaping, { y: 500 }, 2000);
                    break;
                case "smove2":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 3000);
                    Laya.Tween.to(this.box_frame, { x: -2160 }, 3000);
                    break;
                case "sevent_daocaoren2_1":
                    this.daochaoren.play("daocaoren2", false);
                    break;
                case "tmove2":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 2840);
                    break;
            }
        };
        LevelScene16.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene16.prototype.stopGame = function () { };
        LevelScene16.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.huaping.play("huaping1", false);
                }
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene16.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene16;
    }(LevelBase));

    var LevelScene15 = (function (_super) {
        __extends(LevelScene15, _super);
        function LevelScene15(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene15";
            _this.nPlayerY = 0;
            _this.skin = "game/level_ks/KsLevelScene15.json";
            return _this;
        }
        LevelScene15.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene15.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene15.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene15.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene15.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.heipao.url)];
                        case 1:
                            _a.skHeiPao = _d.sent();
                            this.skHeiPao.x = this.mapData.heipao.x;
                            this.skHeiPao.y = this.mapData.heipao.y;
                            this.skHeiPao.play("piaofu", true);
                            this.box_enb.addChild(this.skHeiPao);
                            _b = !this.ani_player;
                            if (!_b) return [3, 3];
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 2:
                            _b = (_c.ani_player = _d.sent());
                            _d.label = 3;
                        case 3:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            this.startWaterAni();
                            return [2];
                    }
                });
            });
        };
        LevelScene15.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    this.ani_player && Laya.Tween.to(this.ani_player, { x: -440 }, 2000);
                    this.skHeiPao && Laya.Tween.to(this.skHeiPao, { x: -200 }, 2000);
                    break;
                case "sevent_beizha_1":
                    this.skHeiPao && this.skHeiPao.play("beizha", false);
                    break;
                case "sevent_jiezhu_1":
                    this.skHeiPao && this.skHeiPao.play("jiezhu", false);
                    break;
                case "sevent_zhezhulian_1":
                    this.skHeiPao && this.skHeiPao.play("zhezhulian", false);
                    break;
                case "sevent_xizou_1":
                    this.skHeiPao && this.skHeiPao.play("xizou", false);
                    break;
                case "dod":
                    if (this.ani_player) {
                        this.nPlayerY = this.ani_player.y;
                    }
                    this.ani_player && Laya.Tween.to(this.ani_player, { y: 1920 }, 2300);
                    break;
                case "tot":
                    this.ani_player && Laya.Tween.to(this.ani_player, { x: 1080 }, 4000);
                    break;
            }
        };
        LevelScene15.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene15.prototype.stopGame = function () { };
        LevelScene15.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) {
                    this.skHeiPao.play("piaofu", true);
                }
                else if (this.index == 2) {
                    this.ani_player.y = this.nPlayerY;
                }
                this.onStart();
            }
        };
        LevelScene15.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        LevelScene15.prototype.startWaterAni = function () {
            this.moveSomeOne(this.box_game, 0, -3240, 10000);
        };
        LevelScene15.prototype.moveSomeOne = function (box, starX, tox, time) {
            var _this = this;
            Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, function () {
                box.x = starX;
                _this.moveSomeOne(box, starX, tox, time);
            }));
        };
        return LevelScene15;
    }(LevelBase));

    var LevelScene17 = (function (_super) {
        __extends(LevelScene17, _super);
        function LevelScene17(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene17";
            _this.skin = "game/level_ks/KsLevelScene17.json";
            return _this;
        }
        LevelScene17.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene17.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene17.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene17.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene17.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _c.sent());
                            _c.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene17.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
            }
        };
        LevelScene17.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene17.prototype.stopGame = function () { };
        LevelScene17.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                this.onStart();
            }
        };
        LevelScene17.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene17;
    }(LevelBase));

    var LevelScene18 = (function (_super) {
        __extends(LevelScene18, _super);
        function LevelScene18(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene18";
            _this.skin = "game/level_ks/KsLevelScene18.json";
            return _this;
        }
        LevelScene18.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene18.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene18.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene18.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene18.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.mifeng.url)];
                        case 1:
                            _a.mifeng = _e.sent();
                            this.mifeng.x = this.mapData.mifeng.x;
                            this.mifeng.y = this.mapData.mifeng.y;
                            this.mifeng.play("18-mf8", true);
                            this.box_enb.addChild(this.mifeng);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.xiongmao.url)];
                        case 2:
                            _b.xiongmao = _e.sent();
                            this.xiongmao.x = this.mapData.xiongmao.x;
                            this.xiongmao.y = this.mapData.xiongmao.y;
                            this.xiongmao.play("18-xm13", true);
                            this.box_enb.addChild(this.xiongmao);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.box_down.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene18.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: 150 }, 1670);
                    break;
                case "pmove1":
                    Laya.Tween.to(this.box_player, { x: 600 }, 1580);
                    break;
                case "smove":
                    Laya.Tween.to(this.box_player, { x: 0 }, 2500);
                    Laya.Tween.to(this.box_game, { x: -1080 }, 2500);
                    Laya.Tween.to(this.box_down, { x: -1080 }, 2500);
                    break;
                case "sevent_18-mf8_1":
                    this.mifeng.play("18-mf8", true);
                    break;
                case "sevent_18-mf9_1":
                    this.mifeng.play("18-mf9", false);
                    break;
                case "sevent_18-mf10_1":
                    this.mifeng.play("18-mf10", false);
                    break;
                case "sevent_18-xm13_1":
                    this.mifeng.play("18-xm13", false);
                    break;
                case "pmove2":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 3380);
                    break;
                case "smove1":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 3300);
                    Laya.Tween.to(this.box_down, { x: -2160 }, 3300);
                    break;
                case "pop1":
                case "pop2":
                    this.xiongmao.visible = false;
                    break;
            }
        };
        LevelScene18.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene18.prototype.stopGame = function () { };
        LevelScene18.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.mifeng.play("18-mf8", true);
                }
                else if (this.index == 2) {
                    this.xiongmao.visible = true;
                    this.xiongmao.play("18-xm13", true);
                }
                this.onStart();
            }
        };
        LevelScene18.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_down);
        };
        return LevelScene18;
    }(LevelBase));

    var LevelScene19 = (function (_super) {
        __extends(LevelScene19, _super);
        function LevelScene19(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene19";
            _this.skin = "game/level_ks/KsLevelScene19.json";
            return _this;
        }
        LevelScene19.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene19.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene19.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene19.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene19.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.heipao19.url)];
                        case 1:
                            _a.heipao = _f.sent();
                            this.heipao.x = this.mapData.heipao19.x;
                            this.heipao.y = this.mapData.heipao19.y;
                            this.heipao.play("heipao1", true);
                            this.box_enb.addChild(this.heipao);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.ljuanfen.url)];
                        case 2:
                            _b.ljuanfen = _f.sent();
                            this.ljuanfen.x = this.mapData.ljuanfen.x;
                            this.ljuanfen.y = this.mapData.ljuanfen.y;
                            this.ljuanfen.play("19-feng", false);
                            this.ljuanfen.visible = false;
                            this.box_player.addChild(this.ljuanfen);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.pingguoshu.url)];
                        case 3:
                            _c.pingguoshu = _f.sent();
                            this.pingguoshu.x = this.mapData.pingguoshu.x;
                            this.pingguoshu.y = this.mapData.pingguoshu.y;
                            this.pingguoshu.play("19-1x", true);
                            this.pingguoshu.visible = true;
                            this.box_enb.addChild(this.pingguoshu);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene19.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: 400 }, 1670);
                    break;
                case "smove":
                    Laya.Tween.to(this.box_game, { x: -1080 }, 2920);
                    Laya.Tween.to(this.box_player, { x: 0 }, 2920);
                    break;
                case "sevent_19-feng_1":
                    this.ljuanfen.visible = true;
                    this.ljuanfen.zOrder = 1;
                    this.ljuanfen.play("19-feng", false);
                    break;
                case "smove2":
                    this.ljuanfen.visible = false;
                    this.pingguoshu.visible = true;
                    Laya.Tween.to(this.box_game, { x: -2160 }, 2920);
                    break;
                case "sevent_heipao2_1":
                    this.heipao.play("heipao2", false);
                    break;
                case "sevent_heipao3_1":
                    this.heipao.play("heipao3", false);
                    break;
                case "pmove1":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 3830);
                    break;
                case "cs1":
                    this.pingguoshu.visible = false;
                    break;
                case "cs":
                    this.pingguoshu.visible = false;
                    break;
            }
        };
        LevelScene19.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene19.prototype.stopGame = function () { };
        LevelScene19.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.ljuanfen.visible = false;
                    this.pingguoshu.visible = true;
                }
                else if (this.index == 2) {
                    this.heipao.play("heipao1", true);
                }
                this.onStart();
            }
        };
        LevelScene19.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene19;
    }(LevelBase));

    var LevelScene21 = (function (_super) {
        __extends(LevelScene21, _super);
        function LevelScene21(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene21";
            _this.bSmove = false;
            _this.nSpeedAni = 0;
            _this.skin = "game/level_ks/KsLevelScene21.json";
            return _this;
        }
        LevelScene21.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene21.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene21.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene21.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene21.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _c.sent());
                            _c.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.image_frame.x = 585;
                            this.box_frame.y = 2500;
                            this.box_oper.y = 2500;
                            this.box_player.y = 610;
                            this.bSmove = false;
                            this.nSpeedAni = 0;
                            this.onStart();
                            Laya.timer.frameLoop(1, this, this.onMove);
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene21.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: 400 }, 1920);
                    break;
                case "smove":
                    Laya.Tween.to(this.box_game, { x: -1080 }, 1920);
                    Laya.Tween.to(this.image_frame, { x: -505 }, 1920);
                    break;
                case "smove1":
                    if (!this.bSmove) {
                        this.bSmove = true;
                        return;
                    }
                    this.nSpeedAni = 27;
                    break;
                case "pmove1":
                    Laya.Tween.to(this.box_player, { y: 1200 }, 1330);
                    break;
                case "smove2":
                    this.nSpeedAni = 14;
                    break;
                case "smove3":
                    this.nSpeedAni = 27;
                    break;
                case "smove4":
                    this.box_frame.y = 0;
                    this.box_oper.y = 0;
                    this.nSpeedAni = 0;
                    break;
                case "smove5":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 3080);
                    break;
            }
        };
        LevelScene21.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene21.prototype.stopGame = function () { };
        LevelScene21.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                    this.box_game.x = 0;
                    this.image_frame.x = 585;
                    this.box_player.y = 610;
                    this.bSmove = false;
                    this.nSpeedAni = 0;
                }
                else if (this.index == 1) ;
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene21.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.image_frame);
        };
        LevelScene21.prototype.onMove = function () {
            var nHight = this.box_1.height;
            this.box_1.y -= this.nSpeedAni;
            this.box_2.y -= this.nSpeedAni;
            if (this.box_1.y <= -nHight) {
                this.box_1.y = this.box_2.y + nHight;
            }
            if (this.box_2.y <= -nHight) {
                this.box_2.y = this.box_1.y + nHight;
            }
        };
        return LevelScene21;
    }(LevelBase));

    var LevelScene20 = (function (_super) {
        __extends(LevelScene20, _super);
        function LevelScene20(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene20";
            _this.byz3 = false;
            _this.bzz8 = false;
            _this.skin = "game/level_ks/KsLevelScene20.json";
            return _this;
        }
        LevelScene20.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene20.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene20.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene20.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene20.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.kuang.url)];
                        case 1:
                            _a.kuang = _f.sent();
                            this.kuang.x = this.mapData.kuang.x;
                            this.kuang.y = this.mapData.kuang.y;
                            this.kuang.play("20-k13", true);
                            this.kuang.visible = true;
                            this.box_enb.addChild(this.kuang);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.yezhu.url)];
                        case 2:
                            _b.yezhu = _f.sent();
                            this.yezhu.x = this.mapData.yezhu.x;
                            this.yezhu.y = this.mapData.yezhu.y;
                            this.yezhu.visible = false;
                            this.box_enb.addChild(this.yezhu);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.zhizhu.url)];
                        case 3:
                            _c.zhizhu = _f.sent();
                            this.zhizhu.x = this.mapData.zhizhu.x;
                            this.zhizhu.y = this.mapData.zhizhu.y;
                            this.zhizhu.visible = false;
                            this.zhizhu.play("20-zz7", false);
                            this.box_enb.addChild(this.zhizhu);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = -300;
                            this.box_game.x = 0;
                            this.byz3 = false;
                            this.bzz8 = false;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene20.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    Laya.Tween.to(this.box_player, { x: 0 }, 2500);
                    break;
                case "sevent_20-yz2_1":
                    this.yezhu.visible = true;
                    this.yezhu.play("20-yz2", false);
                    break;
                case "sevent_20-yz3_1":
                    if (!this.byz3) {
                        this.byz3 = true;
                        return;
                    }
                    this.yezhu.play("20-yz3", true);
                    break;
                case "sevent_20-yz4_1":
                    this.yezhu.play("20-yz4", false);
                    break;
                case "sevent_20-yz5_1":
                    this.yezhu.play("20-yz5", false);
                    break;
                case "smove1":
                    this.yezhu.visible = false;
                    Laya.Tween.to(this.box_game, { x: -1080 }, 2500);
                    break;
                case "sevent_20-zz7_1":
                    this.zhizhu.visible = true;
                    this.zhizhu.play("20-zz7", false);
                    break;
                case "sevent_20-zz8_1":
                    if (!this.bzz8) {
                        this.bzz8 = true;
                        return;
                    }
                    this.zhizhu.play("20-zz8", false);
                    break;
                case "sevent_20-zz9_1":
                    this.zhizhu.play("20-zz9", false);
                    break;
                case "sevent_20-zz10_1":
                    this.zhizhu.play("20-zz10", false);
                    break;
                case "smove2":
                    this.zhizhu.visible = false;
                    Laya.Tween.to(this.box_game, { x: -2160 }, 2500);
                    break;
                case "sevent_20-k13_1":
                    this.kuang.play("20-k13", true);
                    break;
                case "sevent_20-k15_1":
                    this.kuang.play("20-k15", false);
                    break;
                case "smove3":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 2500);
                    break;
            }
        };
        LevelScene20.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene20.prototype.stopGame = function () { };
        LevelScene20.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = -300;
                    this.yezhu.visible = false;
                    this.byz3 = false;
                    this.yezhu.play("20-yz3", true);
                }
                else if (this.index == 1) {
                    this.zhizhu.play("20-zz8", true);
                }
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene20.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_player);
            Laya.Tween.clearAll(this.box_game);
        };
        return LevelScene20;
    }(LevelBase));

    var LevelScene22 = (function (_super) {
        __extends(LevelScene22, _super);
        function LevelScene22(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene22";
            _this.skin = "game/level_ks/KsLevelScene22.json";
            return _this;
        }
        LevelScene22.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene22.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene22.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene22.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene22.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _c.sent());
                            _c.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.box_frame.x = 0;
                            this.box_down.x = 0;
                            this.sp_nainao.visible = true;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene22.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "smove":
                    Laya.Tween.to(this.box_game, { x: -1080 }, 2880);
                    Laya.Tween.to(this.box_frame, { x: -1080 }, 2880);
                    Laya.Tween.to(this.box_down, { x: -1080 }, 2880);
                    break;
                case "smove1":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 2880);
                    Laya.Tween.to(this.box_frame, { x: -2160 }, 2880);
                    Laya.Tween.to(this.box_down, { x: -2160 }, 2880);
                    break;
                case "smove2":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 2880);
                    break;
                case "xs1":
                case "xs2":
                    this.sp_nainao.visible = false;
                    break;
            }
        };
        LevelScene22.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene22.prototype.stopGame = function () { };
        LevelScene22.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) {
                    this.sp_nainao.visible = true;
                }
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene22.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_frame);
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_down);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene22;
    }(LevelBase));

    var LevelScene23 = (function (_super) {
        __extends(LevelScene23, _super);
        function LevelScene23(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene23";
            _this.bMiGong1 = false;
            _this.skin = "game/level_ks/KsLevelScene23.json";
            return _this;
        }
        LevelScene23.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene23.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene23.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene23.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene23.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.bMiGong1 = false;
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.shiqiang.url)];
                        case 1:
                            _a.skShiQiang = _g.sent();
                            this.skShiQiang.x = this.mapData.shiqiang.x;
                            this.skShiQiang.y = this.mapData.shiqiang.y;
                            this.skShiQiang.stop();
                            this.box_enb.addChild(this.skShiQiang);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.migong.url)];
                        case 2:
                            _b.skMiGong = _g.sent();
                            this.skMiGong.x = this.mapData.migong.x;
                            this.skMiGong.y = this.mapData.migong.y;
                            this.skMiGong.stop();
                            this.box_enb.addChild(this.skMiGong);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.yezhu.url)];
                        case 3:
                            _c.skYeZhu = _g.sent();
                            this.skYeZhu.x = this.mapData.yezhu.x;
                            this.skYeZhu.y = this.mapData.yezhu.y;
                            this.skYeZhu.stop();
                            this.skYeZhu.visible = false;
                            this.box_enb.addChild(this.skYeZhu);
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.gou.url)];
                        case 4:
                            _d.skGou = _g.sent();
                            this.skGou.x = this.mapData.gou.x;
                            this.skGou.y = this.mapData.gou.y;
                            this.skGou.stop();
                            this.box_enb.addChild(this.skGou);
                            _e = !this.ani_player;
                            if (!_e) return [3, 6];
                            _f = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 5:
                            _e = (_f.ani_player = _g.sent());
                            _g.label = 6;
                        case 6:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = -200;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene23.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: 0 }, 1670);
                    break;
                case "sevent_shiqiang_1":
                    this.skShiQiang.visible = true;
                    this.skShiQiang.play("shiqiang", false);
                    break;
                case "sevent_migong1_1":
                    if (this.bMiGong1) {
                        return;
                    }
                    this.bMiGong1 = true;
                    this.skMiGong.visible = true;
                    this.skMiGong.play("migong1", false);
                    break;
                case "sevent_migong2_1":
                    this.skMiGong.play("migong2", false);
                    break;
                case "pmove1":
                    Laya.Tween.to(this.box_player, { x: 200 }, 830);
                    break;
                case "pmove2":
                    Laya.Tween.to(this.box_player, { x: 200 }, 830);
                    break;
                case "sevent_migong3_1":
                    this.skMiGong.play("migong3", false);
                    break;
                case "smove":
                    Laya.Tween.to(this.box_game, { x: -1580 }, 2080);
                    Laya.Tween.to(this.box_player, { x: 0 }, 2080);
                    break;
                case "sevent_yezhu1_1":
                    this.skYeZhu.visible = true;
                    this.skYeZhu.play("yezhu1", false);
                    Laya.Tween.to(this.skYeZhu, { x: 1580 }, 1000);
                    break;
                case "sevent_yezhu2_1":
                    this.skYeZhu.play("yezhu2", false);
                    break;
                case "sevent_yezhu3_1":
                    this.skYeZhu.play("yezhu3", false);
                    break;
                case "sevent_yezhu4_1":
                    this.skYeZhu.play("yezhu4", false);
                    break;
                case "sevent_gou1_1":
                    this.skGou.play("gou1", true);
                    break;
                case "sevent_gou2_1":
                    this.skGou.play("gou2", false);
                    break;
                case "smove3":
                    Laya.Tween.to(this.box_player, { x: 1080 }, 2580);
                    break;
                case "smove1":
                case "smove2":
                    Laya.Tween.to(this.box_game, { x: -2160 }, 1920);
                    this.skYeZhu.visible = false;
                    break;
            }
        };
        LevelScene23.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene23.prototype.stopGame = function () { };
        LevelScene23.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.bMiGong1 = false;
                    this.box_player.x = -200;
                    this.skShiQiang.visible = false;
                    this.skMiGong.visible = false;
                }
                else if (this.index == 1) ;
                else if (this.index == 2) {
                    this.skGou.play("gou1", true);
                }
                this.onStart();
            }
        };
        LevelScene23.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene23;
    }(LevelBase));

    var LevelScene24 = (function (_super) {
        __extends(LevelScene24, _super);
        function LevelScene24(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene24";
            _this.skAnim = {
                man: null,
                man1: null,
                man2: null
            };
            _this.localEvent = [];
            _this.skin = "game/level_ks/KsLevelScene24.json";
            return _this;
        }
        LevelScene24.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene24.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene24.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene24.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene24.prototype.initPlayerStatus = function () {
            return __awaiter(this, void 0, void 0, function () {
                var k, obj, _a, _b, skItem;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            k = "man";
                            obj = this.mapData[k];
                            _a = this.skAnim;
                            _b = k;
                            return [4, this.createSkeleton(obj.url, true)];
                        case 1:
                            _a[_b] = _c.sent();
                            skItem = this.skAnim[k];
                            this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));
                            skItem.x = obj.x;
                            skItem.y = obj.y;
                            skItem.play("24-yr03", true);
                            return [2];
                    }
                });
            });
        };
        LevelScene24.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, obj, _c, _d, skItem, k, skItem, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = [];
                            for (_b in this.skAnim)
                                _a.push(_b);
                            _i = 0;
                            _g.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 5];
                            k = _a[_i];
                            obj = this.mapData[k];
                            if (!(!this.skAnim[k] || (this.skAnim[k] && this.skAnim[k].destroyed))) return [3, 3];
                            _c = this.skAnim;
                            _d = k;
                            return [4, this.createSkeleton(obj.url)];
                        case 2:
                            _c[_d] = _g.sent();
                            _g.label = 3;
                        case 3:
                            skItem = this.skAnim[k];
                            skItem.x = obj.x;
                            skItem.y = obj.y;
                            this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));
                            _g.label = 4;
                        case 4:
                            _i++;
                            return [3, 1];
                        case 5:
                            for (k in this.skAnim) {
                                skItem = this.skAnim[k];
                                skItem.play("sevent_24-yr03_1", true);
                                if (k == "man2") {
                                    skItem.visible = false;
                                }
                            }
                            _e = !this.ani_player;
                            if (!_e) return [3, 7];
                            _f = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 6:
                            _e = (_f.ani_player = _g.sent());
                            _g.label = 7;
                        case 7:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene24.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if (this.localEvent.indexOf(evt.name) != -1)
                return;
            this.localEvent.push(evt.name);
            var cData, pData;
            switch (evt.name) {
                case "pmove":
                    pData = this.mapData.player.move[0];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    break;
                case "smove":
                    cData = this.mapData.bg.move[0];
                    pData = this.mapData.player.move[1];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                    break;
                case "smove1":
                    cData = this.mapData.bg.move[1];
                    pData = this.mapData.player.move[2];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                    break;
                case "pmove1":
                    pData = this.mapData.player.move[3];
                    Laya.Tween.to(this.skAnim.man2, { x: this.skAnim.man2.x + 1600 }, 2600);
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    break;
                case "sevent_24-yr03_1":
                    this.skAnim.man.play("24-yr03", true);
                    break;
                case "sevent_24-yr04_1":
                    this.skAnim.man.play("24-yr04", false);
                    break;
                case "sevent_24-yr05_1":
                    this.skAnim.man.play("24-yr05", false);
                    break;
                case "sevent_24-yr06_1":
                    this.skAnim.man1.play("24-yr06", true);
                    break;
                case "sevent_24-yr07_1":
                    this.skAnim.man1.play("24-yr07", false);
                    break;
                case "sevent_24-yr08_1":
                    this.skAnim.man1.play("24-yr08", true);
                    break;
                case "sevent_24-yr09_1":
                    this.skAnim.man1.play("24-yr09", false);
                    break;
                case "sevent_24-yr10_1":
                    this.skAnim.man1.play("24-yr10", false);
                    break;
                case "sevent_24-yr11_1":
                    this.skAnim.man1.play("24-yr11", false);
                    break;
                case "sevent_24-yr12_1":
                    this.skAnim.man1.play("24-yr12", false);
                    break;
                case "sevent_24-yr13_1":
                    this.skAnim.man1.play("24-yr13", false);
                    break;
                case "sevent_24-yr14_1":
                    this.skAnim.man2.visible = true;
                    this.skAnim.man2.play("24-yr14", false);
                    break;
                case "sevent_24-yr15_1":
                    this.skAnim.man2.x -= 400;
                    this.skAnim.man2.visible = true;
                    this.skAnim.man2.play("24-yr15", true);
                    break;
            }
        };
        LevelScene24.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene24.prototype.stopGame = function () { };
        LevelScene24.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            this.localEvent = [];
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.skAnim.man1.play("24-yr08", true);
                }
                else if (this.index == 2) {
                    this.skAnim.man2.visible = false;
                }
                this.onStart();
            }
        };
        LevelScene24.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene24;
    }(LevelBase));

    var LevelScene25 = (function (_super) {
        __extends(LevelScene25, _super);
        function LevelScene25(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene25";
            _this.skAnim = {
                power: null,
                snake: null,
                savage: null,
                savage1: null
            };
            _this.localEvent = [];
            _this.skin = "game/level_ks/KsLevelScene25.json";
            return _this;
        }
        LevelScene25.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene25.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene25.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene25.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene25.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, obj, _c, _d, skItem, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = [];
                            for (_b in this.skAnim)
                                _a.push(_b);
                            _i = 0;
                            _g.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 5];
                            k = _a[_i];
                            obj = this.mapData[k];
                            if (!(!this.skAnim[k] || (this.skAnim[k] && this.skAnim[k].destroyed))) return [3, 3];
                            _c = this.skAnim;
                            _d = k;
                            return [4, this.createSkeleton(obj.url)];
                        case 2:
                            _c[_d] = _g.sent();
                            _g.label = 3;
                        case 3:
                            skItem = this.skAnim[k];
                            skItem.x = obj.x;
                            skItem.y = obj.y;
                            if (k == "savage") {
                                skItem.visible = true;
                                skItem.play("25-yr01x", true);
                            }
                            else if (k == "power" || k == "snake") {
                                skItem.visible = false;
                            }
                            if (k == "power") {
                                this.box_power.getChildIndex(skItem) == -1 && (this.box_power.addChild(skItem));
                            }
                            else {
                                this.box_enb.getChildIndex(skItem) == -1 && (this.box_enb.addChild(skItem));
                            }
                            _g.label = 4;
                        case 4:
                            _i++;
                            return [3, 1];
                        case 5:
                            _e = !this.ani_player;
                            if (!_e) return [3, 7];
                            _f = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 6:
                            _e = (_f.ani_player = _g.sent());
                            _g.label = 7;
                        case 7:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene25.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            if (this.localEvent.indexOf(evt.name) != -1)
                return;
            this.localEvent.push(evt.name);
            var cPos, pPos;
            switch (evt.name) {
                case "pmove":
                    pPos = this.mapData.player.move[0];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    break;
                case "smove":
                    cPos = this.mapData.bg.move[0];
                    pPos = this.mapData.player.move[1];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                    break;
                case "smove1":
                    cPos = this.mapData.bg.move[1];
                    pPos = this.mapData.player.move[2];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                    break;
                case "sevent_25-yr01x_1":
                    this.skAnim.savage.play("25-yr01x", true);
                    break;
                case "pop":
                    this.skAnim.savage.visible = false;
                    break;
                case "sevent_25-yr01_1":
                    this.skAnim.savage.visible = true;
                    this.skAnim.savage1.play("25-yr01", true);
                    break;
                case "sevent_25-yr02_1":
                    this.skAnim.savage1.play("25-yr02", false);
                    break;
                case "sevent_25-yr03_1":
                    this.skAnim.savage1.play("25-yr03", false);
                    break;
                case "sevent_25-yr04_1":
                    this.skAnim.savage1.play("25-yr04", false);
                    break;
                case "sevent_25-lsj01_1":
                    this.skAnim.power.visible = true;
                    this.skAnim.power.play("25-lsj01", false);
                    break;
                case "sevent_25-she_1":
                    this.skAnim.snake.visible = true;
                    this.skAnim.snake.x = this.mapData.snake.x;
                    Laya.Tween.to(this.skAnim.snake, { x: this.mapData.snake.mx }, this.mapData.snake.mt);
                    this.skAnim.snake.play("25-she", true);
                    break;
            }
        };
        LevelScene25.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene25.prototype.stopGame = function () { };
        LevelScene25.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            this.localEvent = [];
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.skAnim.savage.visible = true;
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.skAnim.savage1.play("25-yr01", true);
                }
                else if (this.index == 2) {
                    this.skAnim.snake.visible = false;
                }
                this.onStart();
            }
        };
        LevelScene25.prototype.stopAni = function () {
            this.box_power.removeChildren();
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene25;
    }(LevelBase));

    var LevelScene29 = (function (_super) {
        __extends(LevelScene29, _super);
        function LevelScene29(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene29";
            _this.bmove1 = false;
            _this.skin = "game/level_ks/KsLevelScene29.json";
            return _this;
        }
        LevelScene29.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene29.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene29.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene29.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene29.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.spYue.visible = true;
                            this.bmove1 = false;
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.lang.url)];
                        case 1:
                            _a.skLang = _f.sent();
                            this.skLang.x = this.mapData.lang.x;
                            this.skLang.y = this.mapData.lang.y;
                            this.skLang.play("lang1", true);
                            this.skLang.visible = true;
                            this.box_enb.addChild(this.skLang);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.yanjing.url)];
                        case 2:
                            _b.skYanjing = _f.sent();
                            this.skYanjing.x = this.mapData.yanjing.x;
                            this.skYanjing.y = this.mapData.yanjing.y;
                            this.skYanjing.stop();
                            this.skYanjing.visible = false;
                            this.box_enb.addChild(this.skYanjing);
                            _c = this;
                            return [4, this.createSkeleton(this.mapData.yanhua.url)];
                        case 3:
                            _c.skYanhua = _f.sent();
                            this.skYanhua.x = this.mapData.yanhua.x;
                            this.skYanhua.y = this.mapData.yanhua.y;
                            this.skYanhua.stop();
                            this.skYanhua.visible = false;
                            this.box_enb.addChild(this.skYanhua);
                            _d = !this.ani_player;
                            if (!_d) return [3, 5];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 4:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 5;
                        case 5:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 100;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene29.prototype.onPlayLabel = function (evt) {
            var _this = this;
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[0].x }, this.mapData.player.move[0].t, null, Laya.Handler.create(this, function (args) {
                        _this.box_player.x = 110;
                    }));
                    break;
                case "smove":
                    this.box_player.x = 845;
                    Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[0].x }, this.mapData.bg.move[0].t);
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[1].x }, this.mapData.player.move[1].t, null, Laya.Handler.create(this, function (args) {
                        _this.box_player.x = 0;
                    }));
                    break;
                case "sevent_lang2_1":
                    this.skLang.play("lang2", false);
                    break;
                case "sevent_lang3_1":
                    this.skLang.play("lang3", false);
                    this.skLang.player.once(Laya.Event.STOPPED, this, function () {
                        _this.skLang.visible = false;
                    });
                    break;
                case "smove1":
                    if (!this.bmove1) {
                        this.bmove1 = true;
                        return;
                    }
                    Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[1].x }, this.mapData.bg.move[1].t);
                    break;
                case "sevent_yanjing_1":
                    this.skYanjing.visible = true;
                    this.skYanjing.play("yanjing", false);
                    break;
                case "pmove1":
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[2].x }, this.mapData.player.move[2].t);
                    break;
                case "sevent_yanhua_1":
                    this.skYanhua.visible = true;
                    this.skYanhua.play("yanhua", false);
                    break;
                case "xs":
                    this.spYue.visible = false;
                    break;
            }
        };
        LevelScene29.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene29.prototype.stopGame = function () { };
        LevelScene29.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) {
                    this.skLang.visible = true;
                    this.skLang.play("lang1", true);
                }
                else if (this.index == 2) {
                    this.skYanhua.visible = false;
                    this.skYanjing.visible = false;
                }
                this.onStart();
            }
        };
        LevelScene29.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene29;
    }(LevelBase));

    var LevelScene28 = (function (_super) {
        __extends(LevelScene28, _super);
        function LevelScene28(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene28";
            _this.bmove2 = false;
            _this.skin = "game/level_ks/KsLevelScene28.json";
            return _this;
        }
        LevelScene28.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene28.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene28.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene28.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene28.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            this.bmove2 = false;
                            _a = this;
                            return [4, this.createSkeleton(this.mapData.houzi.url)];
                        case 1:
                            _a.skHouZi = _e.sent();
                            this.skHouZi.x = this.mapData.houzi.x;
                            this.skHouZi.y = this.mapData.houzi.y;
                            this.skHouZi.play("houzi1", true);
                            this.box_enb.addChild(this.skHouZi);
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.huo.url)];
                        case 2:
                            _b.skHuo = _e.sent();
                            this.skHuo.x = this.mapData.huo.x;
                            this.skHuo.y = this.mapData.huo.y;
                            this.skHuo.play("huo2", true);
                            this.skHuo.visible = false;
                            this.box_enb.addChild(this.skHuo);
                            _c = !this.ani_player;
                            if (!_c) return [3, 4];
                            _d = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 3:
                            _c = (_d.ani_player = _e.sent());
                            _e.label = 4;
                        case 4:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = -100;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene28.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
                case "pmove":
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[0].x }, this.mapData.player.move[0].t);
                    break;
                case "sevent_huo2_1":
                    this.skHuo.visible = true;
                    break;
                case "smove":
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[1].x }, this.mapData.player.move[1].t);
                    Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[0].x }, this.mapData.bg.move[0].t);
                    break;
                case "sevent_houzi1_1":
                    this.skHouZi.play("houzi1", true);
                    break;
                case "sevent_houzi2_1":
                    this.skHouZi.play("houzi2", false);
                    break;
                case "sevent_houzi3_1":
                    this.skHouZi.play("houzi3", false);
                    break;
                case "smove1":
                    Laya.Tween.to(this.box_game, { x: this.mapData.bg.move[1].x }, this.mapData.bg.move[1].t);
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[2].x }, this.mapData.player.move[2].t);
                    break;
                case "pmove1":
                    if (!this.bmove2) {
                        this.bmove2 = true;
                        return;
                    }
                    Laya.Tween.to(this.box_player, { x: this.mapData.player.move[3].x }, this.mapData.player.move[3].t);
                    break;
            }
        };
        LevelScene28.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene28.prototype.stopGame = function () { };
        LevelScene28.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = -100;
                    this.skHuo.visible = false;
                }
                else if (this.index == 1) ;
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene28.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene28;
    }(LevelBase));

    var LevelScene27 = (function (_super) {
        __extends(LevelScene27, _super);
        function LevelScene27(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene27";
            _this.skin = "game/level_ks/KsLevelScene27.json";
            return _this;
        }
        LevelScene27.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene27.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene27.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene27.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene27.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = !this.ani_player;
                            if (!_a) return [3, 2];
                            _b = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 1:
                            _a = (_b.ani_player = _c.sent());
                            _c.label = 2;
                        case 2:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            this.startYunAni();
                            return [2];
                    }
                });
            });
        };
        LevelScene27.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            switch (evt.name) {
            }
        };
        LevelScene27.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene27.prototype.stopGame = function () { };
        LevelScene27.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) ;
                else if (this.index == 1) ;
                else if (this.index == 2) ;
                this.onStart();
            }
        };
        LevelScene27.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        LevelScene27.prototype.startYunAni = function () {
            this.moveSomeOne(this.box_yun1, 0, -1080, 2500);
            this.moveSomeOne(this.box_yun2, 0, -1080, 5000);
        };
        LevelScene27.prototype.moveSomeOne = function (box, starX, tox, time) {
            var _this = this;
            Laya.Tween.to(box, { x: tox }, time, null, Laya.Handler.create(this, function () {
                box.x = starX;
                _this.moveSomeOne(box, starX, tox, time);
            }));
        };
        return LevelScene27;
    }(LevelBase));

    var LevelScene26 = (function (_super) {
        __extends(LevelScene26, _super);
        function LevelScene26(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene26";
            _this.skAnim = {
                snake: null,
                dragon: null,
                savage: null,
                savage1: null,
            };
            _this.localEvent = [];
            _this.skin = "game/level_ks/KsLevelScene26.json";
            return _this;
        }
        LevelScene26.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene26.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene26.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene26.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene26.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, obj, _c, _d, skItem, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = [];
                            for (_b in this.skAnim)
                                _a.push(_b);
                            _i = 0;
                            _g.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            k = _a[_i];
                            obj = this.mapData[k];
                            _c = this.skAnim;
                            _d = k;
                            return [4, this.createSkeleton(obj.url)];
                        case 2:
                            _c[_d] = _g.sent();
                            skItem = this.skAnim[k];
                            skItem.x = obj.x;
                            skItem.y = obj.y;
                            if (k == "dragon") {
                                this.box_long.addChild(skItem);
                                skItem.visible = false;
                            }
                            else {
                                this.box_enb.addChild(skItem);
                            }
                            _g.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4:
                            this.skAnim.snake.visible = true;
                            _e = !this.ani_player;
                            if (!_e) return [3, 6];
                            _f = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 5:
                            _e = (_f.ani_player = _g.sent());
                            _g.label = 6;
                        case 6:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = 0;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene26.prototype.playAni = function () {
            _super.prototype.playAni.apply(this, arguments);
            var animName = arguments[0];
            if (animName == "26-10" || animName == "26-9") {
                this.skAnim.savage.visible = false;
            }
            else if (animName == "26-11") {
                this.skAnim.savage.visible = true;
                this.skAnim.savage.play("26-10s", true);
            }
            else if (animName == "26-15" || animName == "26-16") {
                this.skAnim.savage1.visible = false;
            }
        };
        LevelScene26.prototype.onPlayLabel = function (evt) {
            var _this = this;
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            console.log("event Name -->>>", evt.name);
            if (this.localEvent.indexOf(evt.name) != -1)
                return;
            this.localEvent.push(evt.name);
            var cPos, pPos;
            switch (evt.name) {
                case "pmove":
                    pPos = this.mapData.player.move[0];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    break;
                case "smove":
                    cPos = this.mapData.bg.move[0];
                    pPos = this.mapData.player.move[1];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                    break;
                case "smove1":
                    cPos = this.mapData.bg.move[1];
                    pPos = this.mapData.player.move[2];
                    Laya.Tween.to(this.box_player, { x: pPos.x }, pPos.t);
                    Laya.Tween.to(this.box_game, { x: cPos.x }, cPos.t);
                    break;
                case "sevent_26-1x_1":
                    this.skAnim.snake.play("26-1x", true);
                    break;
                case "sevent_26-3x_1":
                    this.skAnim.snake.play("26-3x", false);
                    break;
                case "sevent_26-2x_1":
                    this.skAnim.snake.play("26-2x", false);
                    this.skAnim.snake.once(Laya.Event.STOPPED, this, function () {
                        _this.skAnim.snake.visible = false;
                    });
                    break;
                case "sevent_26-01s_1":
                    this.skAnim.savage.play("26-01s", true);
                    break;
                case "sevent_1-1longdaiji_1":
                    this.skAnim.dragon.visible = true;
                    Laya.Tween.to(this.skAnim.dragon, { x: 2870 }, 500);
                    break;
            }
        };
        LevelScene26.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene26.prototype.stopGame = function () { };
        LevelScene26.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            this.localEvent = [];
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = 0;
                }
                else if (this.index == 1) {
                    this.skAnim.savage.visible = true;
                }
                else if (this.index == 2) {
                    this.skAnim.savage1.visible = true;
                }
                this.onStart();
            }
        };
        LevelScene26.prototype.stopAni = function () {
            this.box_long.removeChildren();
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene26;
    }(LevelBase));

    var LevelScene30 = (function (_super) {
        __extends(LevelScene30, _super);
        function LevelScene30(data_) {
            var _this = _super.call(this, data_) || this;
            _this.className_key = "LevelScene30";
            _this.skAnim = {
                monkey: null
            };
            _this.skin = "game/level_ks/KsLevelScene30.json";
            return _this;
        }
        LevelScene30.prototype.onAddStage = function () {
            _super.prototype.onAddStage.call(this);
        };
        LevelScene30.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LevelScene30.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.stopAni();
        };
        LevelScene30.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.stopAni();
        };
        LevelScene30.prototype.initPlayer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, k, obj, skItem, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            _a = [];
                            for (_b in this.skAnim)
                                _a.push(_b);
                            _i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            k = _a[_i];
                            obj = this.mapData[k];
                            _c = this.skAnim;
                            return [4, this.createSkeleton(obj.url)];
                        case 2:
                            skItem = _c.monkey = _f.sent();
                            skItem.x = obj.x;
                            skItem.y = obj.y;
                            this.box_enb.addChild(skItem);
                            _f.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4:
                            _d = !this.ani_player;
                            if (!_d) return [3, 6];
                            _e = this;
                            return [4, this.createSkeleton(this.mapData.player.url)];
                        case 5:
                            _d = (_e.ani_player = _f.sent());
                            _f.label = 6;
                        case 6:
                            this.box_player.getChildIndex(this.ani_player) == -1 && (this.box_player.addChild(this.ani_player));
                            this.ani_player.on(Laya.Event.LABEL, this, this.onPlayLabel);
                            this.ani_player.x = this.mapData.player.x;
                            this.ani_player.y = this.mapData.player.y;
                            this.box_player.x = -200;
                            this.box_game.x = 0;
                            this.onStart();
                            ViewChangeManager.getInstance().hideBufferLoadingView();
                            return [2];
                    }
                });
            });
        };
        LevelScene30.prototype.onPlayLabel = function (evt) {
            if (this.bAniDestory)
                return;
            _super.prototype.onPlayLabel.call(this, evt);
            var cData, pData;
            switch (evt.name) {
                case "pmove":
                    pData = this.mapData.player.move[0];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    break;
                case "smove":
                    pData = this.mapData.player.move[1];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    cData = this.mapData.bg.move[0];
                    Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                    break;
                case "smove1":
                    pData = this.mapData.player.move[2];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    cData = this.mapData.bg.move[1];
                    Laya.Tween.to(this.box_game, { x: cData.x }, cData.t);
                    break;
                case "pmove1":
                case "pmove2":
                    pData = this.mapData.player.move[3];
                    Laya.Tween.to(this.box_player, { x: pData.x }, pData.t);
                    break;
                case "sevent_houzi1_1":
                    this.skAnim.monkey.play("houzi1", true);
                    break;
                case "sevent_houzi2_1":
                    Laya.Tween.to(this.skAnim.monkey, { x: this.skAnim.monkey.x + 900 }, 2400);
                    this.skAnim.monkey.play("houzi2", false);
                    break;
                case "sevent_houzi3_1":
                    this.skAnim.monkey.play("houzi3", false);
                    break;
                case "sevent_houzi4_1":
                    this.skAnim.monkey.play("houzi4", false);
                    break;
                case "sevent_houzi5_1":
                    Laya.Tween.to(this.skAnim.monkey, { x: this.skAnim.monkey.x + 900 }, 2400);
                    this.skAnim.monkey.play("houzi5", false);
                    break;
                case "sevent_houzi6_1":
                    this.skAnim.monkey.play("houzi6", false);
                    break;
                case "sevent_houzi7_1":
                    this.skAnim.monkey.play("houzi7", false);
                    break;
                case "sevent_houzi8_1":
                    this.skAnim.monkey.play("houzi8", false);
                    break;
                case "sevent_houzi9_1":
                    this.skAnim.monkey.play("houzi9", false);
                    break;
            }
        };
        LevelScene30.prototype.startGame = function () {
            this.clearData();
            _super.prototype.startGame.call(this);
            this.initPlayer();
        };
        LevelScene30.prototype.stopGame = function () { };
        LevelScene30.prototype.restartGame = function (bReStartAll) {
            if (bReStartAll === void 0) { bReStartAll = true; }
            if (bReStartAll) {
                this.initView();
                _super.prototype.startGame.call(this);
                this.initPlayer();
            }
            else {
                _super.prototype.restartGame.call(this);
                if (this.index == 0) {
                    this.box_player.x = -200;
                }
                else if (this.index == 1) ;
                else if (this.index == 2) {
                    this.skAnim.monkey.play("houzi6", false);
                }
                this.onStart();
            }
        };
        LevelScene30.prototype.stopAni = function () {
            Laya.Tween.clearAll(this.box_game);
            Laya.Tween.clearAll(this.box_player);
        };
        return LevelScene30;
    }(LevelBase));

    var LevelManager = (function () {
        function LevelManager() {
            this.levelBaseUrl = 'resource/assets/configs/map/map';
            this.nCurLevel = 0;
        }
        LevelManager.getInstance = function () {
            if (!this.ins)
                this.ins = new LevelManager();
            return this.ins;
        };
        LevelManager.prototype.createLevelScene = function (level) {
            return __awaiter(this, void 0, void 0, function () {
                var nLevel, classKey, data, stGroup, self;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nLevel = level;
                            if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
                                nLevel = nLevel + 1;
                            }
                            GameManager.instance.curLevel = level;
                            switch (nLevel) {
                                case 1:
                                    classKey = LevelScene1;
                                    break;
                                case 2:
                                    classKey = LevelScene2;
                                    break;
                                case 3:
                                    classKey = LevelScene3;
                                    break;
                                case 4:
                                    classKey = LevelScene4;
                                    break;
                                case 5:
                                    classKey = LevelScene5;
                                    break;
                                case 6:
                                    classKey = LevelScene6;
                                    break;
                                case 7:
                                    classKey = LevelScene7;
                                    break;
                                case 8:
                                    classKey = LevelScene8;
                                    break;
                                case 9:
                                    classKey = LevelScene9;
                                    break;
                                case 10:
                                    classKey = LevelScene10;
                                    break;
                                case 11:
                                    classKey = LevelScene11;
                                    break;
                                case 12:
                                    classKey = LevelScene12;
                                    break;
                                case 13:
                                    classKey = LevelScene13;
                                    break;
                                case 14:
                                    classKey = LevelScene14;
                                    break;
                                case 15:
                                    classKey = LevelScene15;
                                    break;
                                case 16:
                                    classKey = LevelScene16;
                                    break;
                                case 17:
                                    classKey = LevelScene17;
                                    break;
                                case 18:
                                    classKey = LevelScene18;
                                    break;
                                case 19:
                                    classKey = LevelScene19;
                                    break;
                                case 20:
                                    classKey = LevelScene20;
                                    break;
                                case 21:
                                    classKey = LevelScene21;
                                    break;
                                case 22:
                                    classKey = LevelScene22;
                                    break;
                                case 23:
                                    classKey = LevelScene23;
                                    break;
                                case 24:
                                    classKey = LevelScene24;
                                    break;
                                case 25:
                                    classKey = LevelScene25;
                                    break;
                                case 26:
                                    classKey = LevelScene26;
                                    break;
                                case 27:
                                    classKey = LevelScene27;
                                    break;
                                case 28:
                                    classKey = LevelScene28;
                                    break;
                                case 29:
                                    classKey = LevelScene29;
                                    break;
                                case 30:
                                    classKey = LevelScene30;
                                    break;
                                default:
                                    classKey = LevelScene1;
                                    break;
                            }
                            if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
                                PlayerDataManager.getInstance().setCurLevel(nLevel - 2);
                            }
                            else {
                                PlayerDataManager.getInstance().setCurLevel(nLevel - 1);
                            }
                            if (DeviceUtil.isTTMiniGame()) {
                                MiniManeger.instance.hideBanner();
                            }
                            return [4, GameManager.instance.loadCongigs(this.levelBaseUrl + nLevel + '.json')];
                        case 1:
                            data = _a.sent();
                            stGroup = [];
                            stGroup.push(nLevel.toString());
                            ViewChangeManager.getInstance().showBufferLoadingView();
                            self = this;
                            ResUtil.getIntance().loadGroups(stGroup, function () {
                                if (self.currentGameScence && nLevel < PlayerDataManager.getInstance().nMaxLevelCount) {
                                    self.currentGameScence.destroyAni();
                                    if (nLevel > 2) {
                                        self.currentGameScence.destroy();
                                        var lastLevel = nLevel - 1;
                                        ResUtil.getIntance().destoryGroup("" + lastLevel);
                                        Laya.Resource.destroyUnusedResources();
                                    }
                                    self.currentGameScence = null;
                                }
                                if (self.currentGameScence) {
                                    self.currentGameScence.removeSelf();
                                    self.currentGameScence.destroyAni();
                                    self.currentGameScence.destroy();
                                    self.currentGameScence = null;
                                }
                                ViewChangeManager.getInstance().hideBufferLoadingView();
                                self.currentGameScence = new classKey(data);
                                self.currentGameScence.viewData_ = data;
                                self.currentGameScence.mapData = data;
                                _this.nCurLevel = nLevel;
                                SceneManager.getInstance().openSceneInstance(self.currentGameScence);
                            }, function () { });
                            Laya.timer.once(2000, this, function () {
                                if (nLevel < PlayerDataManager.getInstance().getLevelNumMakeOver()) {
                                    stGroup = [];
                                    stGroup.push((nLevel + 1).toString());
                                    ResUtil.getIntance().loadGroups(stGroup);
                                }
                            });
                            return [2];
                    }
                });
            });
        };
        return LevelManager;
    }());

    var GameBufferLoading = (function (_super) {
        __extends(GameBufferLoading, _super);
        function GameBufferLoading() {
            var _this = _super.call(this) || this;
            _this.className_key = "GameBufferLoading";
            _this.bg_img_res = "game_panel_db_png";
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.init();
            return _this;
        }
        GameBufferLoading.prototype.init = function () {
            if (!this.bg_img) {
                this.bg_img = new Laya.Image(ResUtil.getIntance().getOriginUrlPath(ResUtil.getIntance().getResInfoByName(this.bg_img_res).url));
                this.bg_img.sizeGrid = "3,3,2,2";
                this.bg_img.width = this.width;
                this.bg_img.height = this.height;
                this.bg_img.alpha = 0.7;
                this.addChild(this.bg_img);
                this.mouseEnabled = true;
                this.bg_img.mouseEnabled = true;
                this.bg_img.mouseThrough = false;
            }
            if (!this.img_circle) {
                this.img_circle = new Laya.Image();
                this.img_circle.skin = "resource/assets/img/loading_circle.png";
                this.img_circle.anchorX = this.img_circle.anchorY = 0.5;
                this.img_circle.centerX = this.img_circle.centerY = 0;
                this.addChild(this.img_circle);
            }
        };
        GameBufferLoading.prototype.setLabelInfo = function (info) {
        };
        GameBufferLoading.prototype.onShow = function () {
            if (this.img_circle) {
                this.img_circle.rotation = 0;
                Laya.Tween.to(this.img_circle, { rotation: 360 }, 500, null, Laya.Handler.create(this, this.onShow));
            }
        };
        GameBufferLoading.prototype.onHidd = function () {
            if (this.img_circle) {
                Laya.Tween.clearAll(this.img_circle);
            }
        };
        return GameBufferLoading;
    }(Laya.Sprite));

    var ShouMoreGameItem = (function (_super) {
        __extends(ShouMoreGameItem, _super);
        function ShouMoreGameItem(data, nWith, nHeight) {
            var _this = _super.call(this) || this;
            _this.className_key = "ShouMoreGameItem";
            _this.skin = "game/uiView/wecat/ShowMoreGameInfoItem.json";
            _this.nIndex = data;
            _this.width = nWith;
            _this.height = nHeight;
            _this.pivotX = _this.width / 2;
            _this.pivotY = _this.height / 2;
            _this.bAni = true;
            return _this;
        }
        ShouMoreGameItem.prototype.onAddStage = function () {
            this.addEvent();
            this.initView();
        };
        ShouMoreGameItem.prototype.onRemoved = function () {
            this.removeEvent();
            Laya.Tween.clearAll(this);
        };
        ShouMoreGameItem.prototype.setData = function (data) {
            this.removeEvent();
            this.addEvent();
            this.nIndex = data;
            this.initView();
        };
        ShouMoreGameItem.prototype.setAni = function (b) {
            this.bAni = b;
        };
        ShouMoreGameItem.prototype.initView = function () {
            if (this.nIndex < 0 || this.nIndex >= GameData.getInstance().weCatMiniIconsInfo.length) {
                this.nIndex = GameData.getInstance().weCatMiniIconsInfo.length - 1;
                if (this.nIndex < 0)
                    return;
            }
            var stData = GameData.getInstance().weCatMiniIconsInfo;
            var stDataIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
            this.lable_name.text = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].name;
            this.image_icon.skin = GameData.getInstance().weCatMiniIconsInfo[this.nIndex].ad_img;
            this.stGameIndex = GameData.getInstance().weCatMiniIconsInfo[this.nIndex];
            this.startOperAni();
        };
        ShouMoreGameItem.prototype.addEvent = function () {
            this.on(Laya.Event.CLICK, this, this.gotoGame);
        };
        ShouMoreGameItem.prototype.removeEvent = function () {
            this.off(Laya.Event.CLICK, this, this.gotoGame);
        };
        ShouMoreGameItem.prototype.gotoGame = function () {
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(this.stGameIndex.ad_id);
            }
            var self = this;
            var data = {
                appId: this.stGameIndex.ad_appid,
                path: this.stGameIndex.url,
                success: function () {
                    console.log("navigateToMiniProgram success!");
                    if (BaseConst.infos.gameInfo.isDY) {
                        console.log("self.nIndex = ", self.nIndex);
                        PlatformDY.toGame(self.stGameIndex.ad_id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    if (DeviceUtil.isWXMiniGame()) {
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                    }
                }
            };
            platform.navigateToMiniProgram(data);
        };
        ShouMoreGameItem.prototype.startOperAni = function () {
            if (!this.bAni) {
                return;
            }
            this.operAni();
        };
        ShouMoreGameItem.prototype.operAni = function () {
            var _this = this;
            Laya.Tween.clearAll(this);
            Laya.Tween.to(this, { rotation: -5 }, 500, null, Laya.Handler.create(this, function (args) {
                Laya.Tween.to(_this, { rotation: 5 }, 500, null, Laya.Handler.create(_this, function (args) {
                    Laya.timer.once(0, _this, _this.operAni);
                }));
            }));
        };
        return ShouMoreGameItem;
    }(BaseUIScene));

    var ShouMoreGameInView = (function (_super) {
        __extends(ShouMoreGameInView, _super);
        function ShouMoreGameInView() {
            var _this = _super.call(this) || this;
            _this.className_key = "ShouMoreGameInView";
            _this.skin = "game/uiView/wecat/ShowMoreGameInfoInView.json";
            _this.image_hand = null;
            _this.bAni = true;
            _this.height = 860;
            _this.width = 800;
            return _this;
        }
        ShouMoreGameInView.prototype.onAddStage = function () {
            this.initView();
        };
        Object.defineProperty(ShouMoreGameInView.prototype, "ani", {
            set: function (b) {
                this.bAni = b;
            },
            enumerable: true,
            configurable: true
        });
        ShouMoreGameInView.prototype.initView = function () {
            this.refreshWeCatMoreGame();
        };
        ShouMoreGameInView.prototype.refreshWeCatMoreGame = function () {
            var nXAddTemp = 425;
            var nYAddTemp = 450;
            var aryInfo = [];
            var nCount = 2;
            aryInfo = this.getRandomIndex_num(4);
            var nLen = 4;
            var nRandomNum = Utils.random(0, nLen - 1);
            var nHandX = 0;
            var nHandY = 0;
            nLen = nLen >= aryInfo.length ? aryInfo.length : nLen;
            for (var i = 0; i < nLen; ++i) {
                var pWeCatMoreGameItemOne = this.box_wecat.getChildAt(i);
                if (pWeCatMoreGameItemOne) {
                    pWeCatMoreGameItemOne.setAni(this.bAni);
                    pWeCatMoreGameItemOne.setData(aryInfo[i]);
                }
                else {
                    pWeCatMoreGameItemOne = new ShouMoreGameItem(aryInfo[i], 375, 430);
                    pWeCatMoreGameItemOne.setAni(false);
                    var nAddX = Math.floor(i % nCount);
                    var nYAdd = Math.floor(i / nCount);
                    pWeCatMoreGameItemOne.x = pWeCatMoreGameItemOne.pivotX + nXAddTemp * nAddX;
                    pWeCatMoreGameItemOne.y = pWeCatMoreGameItemOne.pivotY + nYAddTemp * nYAdd;
                    this.box_wecat.addChild(pWeCatMoreGameItemOne);
                }
                if (nRandomNum == i) {
                    nHandX = pWeCatMoreGameItemOne.x;
                    nHandY = pWeCatMoreGameItemOne.y;
                }
            }
            if (BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame()) {
                PlatformDY.refreshGameList();
            }
            if (!this.image_hand) {
                this.image_hand = new Laya.Image("resource/assets/img/wecat/failed_icon_1.png");
                this.box_wecat.addChild(this.image_hand);
            }
            this.image_hand.visible = true;
            this.image_hand.x = nHandX;
            this.image_hand.y = nHandY;
        };
        ShouMoreGameInView.prototype.getRandomIndex_num = function (nNum) {
            if (GameData.getInstance().weCatMiniIconsInfo.length - 1 < 0) {
                return [];
            }
            var nRandom = Utils.random(0, GameData.getInstance().weCatMiniIconsInfo.length - 1);
            var nCount = nNum;
            var aryInfo = [];
            for (var i = 0; i < nCount; ++i) {
                aryInfo.push(nRandom);
                nRandom += 1;
                if (nRandom >= GameData.getInstance().weCatMiniIconsInfo.length) {
                    nRandom = 0;
                }
            }
            return aryInfo;
        };
        return ShouMoreGameInView;
    }(BaseSceneUISkin));

    var ViewChangeManager = (function () {
        function ViewChangeManager() {
            this.image_exit = null;
        }
        ViewChangeManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new ViewChangeManager();
            }
            return this.instance;
        };
        Object.defineProperty(ViewChangeManager.prototype, "CommonView", {
            get: function () {
                if (!this.pCommonView) {
                    this.pCommonView = new CommonView();
                    this.pCommonView.x = 0;
                    this.pCommonView.y = 0;
                }
                return this.pCommonView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewChangeManager.prototype, "CurLevelBase", {
            get: function () {
                return this.pCurLevelBase;
            },
            set: function (pCurLevelBase) {
                this.pCurLevelBase = pCurLevelBase;
            },
            enumerable: true,
            configurable: true
        });
        ViewChangeManager.prototype.showCommonView = function () {
            Laya.stage.addChild(this.CommonView);
        };
        ViewChangeManager.prototype.gotoLevel = function (nCurLevel) {
            PlayerDataManager.getInstance().setCurLevel(nCurLevel - 1);
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ChooseLevel;
            LevelManager.getInstance().createLevelScene(nCurLevel);
        };
        ViewChangeManager.prototype.goToNextLevel = function (bFlag) {
            MiniManeger.instance.StopVideo();
            this.pCurLevelBase.closeGameView();
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_Next;
            PlayerDataManager.getInstance().addLevel();
            var nLevel = PlayerDataManager.getInstance().getCurLevelToChallenge();
            LevelManager.getInstance().createLevelScene(nLevel);
        };
        ViewChangeManager.prototype.restartGame = function (bAll) {
            if (bAll === void 0) { bAll = true; }
            GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_ReStart;
            this.pCurLevelBase.restartGame(bAll);
        };
        ViewChangeManager.prototype.rigestBufferLoadingView = function () {
            BufferLoadingManger.getInstance().registerOneBuffer("gamebuffer", new GameBufferLoading());
        };
        ViewChangeManager.prototype.showBufferLoadingView = function () {
            BufferLoadingManger.getInstance().showBuffer("gamebuffer");
        };
        ViewChangeManager.prototype.hideBufferLoadingView = function () {
            BufferLoadingManger.getInstance().hiddBuffer("gamebuffer");
        };
        ViewChangeManager.prototype.startGame = function () {
            if (!BaseConst.infos.gameInfo.isDY) {
                return;
            }
            if (!DeviceUtil.isWXMiniGame() && !DeviceUtil.isQQMiniGame() && !DeviceUtil.isTTMiniGame())
                return;
            PlatformDY.startGame();
        };
        ViewChangeManager.prototype.endGame = function () {
            if (!BaseConst.infos.gameInfo.isDY) {
                return;
            }
            if (!DeviceUtil.isWXMiniGame() && !DeviceUtil.isQQMiniGame() && !DeviceUtil.isTTMiniGame())
                return;
            PlatformDY.endGame({ id: PlatformDY.nGameID, level: PlayerDataManager.getInstance().getCurLevelToChallenge() });
        };
        ViewChangeManager.prototype.showImageExit = function () {
            if (!DeviceUtil.isWXMiniGame()) {
                return;
            }
            if (PlayerDataManager.getInstance().stOperData0807.bSpecial == false && BaseConst.infos.gameInfo.bwrite == 1) {
                console.log("GameDataMgr.getInstance().enterGameInfo", GameData.getInstance().enterGameInfo);
                if (GameData.getInstance().enterGameInfo.enterGameInfo == {}) {
                    return;
                }
                if (!GameData.getInstance().enterGameInfo.referrerInfo.appId) {
                    return;
                }
                if ("wxcff7381e631cf54e" == GameData.getInstance().enterGameInfo.referrerInfo.appId) {
                    return;
                }
            }
            PlayerDataManager.getInstance().stOperData0807.bSpecial = true;
            if (this.image_exit) {
                return;
            }
            this.image_exit = new Laya.Image();
            this.image_exit.skin = "resource/assets/img/wecat/button.png";
            this.image_exit.right = 23;
            this.image_exit.top = 220;
            Laya.stage.addChild(this.image_exit);
            this.image_exit.on(Laya.Event.CLICK, this, this.onImageExit);
            PlayerDataManager.getInstance().SaveData();
        };
        ViewChangeManager.prototype.onImageExit = function () {
            if (PlayerDataManager.getInstance().checkIsSpecial() && BaseConst.infos.gameInfo.MoreGameView == 1) {
                ViewManager.getInstance().showView(MoreGameViewTemp);
            }
            else {
                MoreGameRandomGameBox713Temp.bSpecial = true;
                ViewManager.getInstance().showView(MoreGameRandomGameBox713Temp);
            }
        };
        ViewChangeManager.prototype.showImageExitTemp = function () {
            if (this.image_exit) {
                this.image_exit.visible = true;
            }
        };
        ViewChangeManager.prototype.hideImageExitTemp = function () {
            if (this.image_exit) {
                this.image_exit.visible = false;
            }
        };
        ViewChangeManager.prototype.restartEnterGameHome = function () {
            if (!DeviceUtil.isWXMiniGame()) {
                return;
            }
            if (PlayerDataManager.getInstance().bIsNewPlayer) {
                PlayerDataManager.bGlobEnterGame = false;
                return;
            }
            if (BaseConst.infos.gameInfo.openPsAward == 0) {
                PlayerDataManager.bGlobEnterGame = false;
                return;
            }
            PlayerDataManager.bGlobEnterGame = true;
            WeCatMoreGameView.nEnterCount = 0;
            ViewManager.getInstance().showView(MoreGameRandomGameBox713);
            this.pCommonView.visible = false;
        };
        ViewChangeManager.prototype.onPowerNotEnough = function () {
            TipsManager.getInstance().showDefaultTips("体力不足");
            ViewChangeManager.getInstance().showBufferLoadingView();
            ResUtil.getIntance().loadGroups(["adsp"], function () {
                ViewManager.getInstance().showView(AddPsView);
                ViewChangeManager.getInstance().hideBufferLoadingView();
            });
        };
        ViewChangeManager.prototype.showMoreGameinView = function (bAni) {
            if (bAni === void 0) { bAni = true; }
            if (!this.pShouMoreGameInView) {
                this.pShouMoreGameInView = new ShouMoreGameInView();
            }
            else {
                this.pShouMoreGameInView.refreshWeCatMoreGame();
            }
            this.pShouMoreGameInView.ani = bAni;
            return this.pShouMoreGameInView;
        };
        ViewChangeManager.bGameOpen = false;
        return ViewChangeManager;
    }());

    var PlatfprmAiQiYi = (function () {
        function PlatfprmAiQiYi() {
        }
        PlatfprmAiQiYi.shareAiQiYi = function (title, summary, icon) {
            var platformArry = [1];
            console.log("title = ", title, "summary = ", summary, "icon = ", icon, "version=", "3_0_5");
            window["share"](9002, title, summary, icon, PlatfprmAiQiYi.strUrl, platformArry);
        };
        PlatfprmAiQiYi.processAppMsg = function (event, json) {
            switch (event) {
                case "EVENT_QUIT":
                    break;
                case "EVENT_PAUSE":
                    console.log("onHide...");
                    SoundManager.getInstance().pauseBgm();
                    break;
                case "EVENT_RESUME":
                    console.log("onShow...");
                    SoundManager.getInstance().playBgMusic();
                    break;
                case "EVENT_NETWORK_UNAVAILABLE":
                    break;
                case "EVENT_NETWORK_WIFI_CONNECTED":
                    break;
                case "EVENT_NETWORK_WAN_CONNECTED":
                    break;
                case "1000":
                    console.log("1000 json = ", json);
                    break;
                case "1001":
                    console.log("1001 json = ", json);
                    break;
            }
        };
        PlatfprmAiQiYi.nBookID = 9002;
        PlatfprmAiQiYi.strUrl = "https://manhua.iqiyi.com/ulink/comic";
        PlatfprmAiQiYi.isOpen = false;
        return PlatfprmAiQiYi;
    }());

    var GuessLikeItem = (function (_super) {
        __extends(GuessLikeItem, _super);
        function GuessLikeItem(skin, itemData) {
            var _this = _super.call(this) || this;
            _this.className_key = "GuessLikeItem";
            _this.itemData_ = itemData;
            _this.skin = skin;
            return _this;
        }
        GuessLikeItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.on(Laya.Event.CLICK, this, this.click);
            this.dataChange(this.itemData_);
        };
        GuessLikeItem.prototype.onEnabled = function () {
        };
        GuessLikeItem.prototype.dataChange = function (data) {
            this.exposure();
            this.itemData_ = data;
            if (data.img)
                this.icon_.skin = data.img;
            else
                this.icon_.skin = data.ad_img;
            if (this.iconMask_) {
                this.icon_.mask = this.iconMask_;
                this.icon_.mask.visible = false;
            }
            if (this.name_txt) {
                if (data.title) {
                    this.name_txt.text = data.title;
                }
                if (data.name) {
                    this.name_txt.text = data.name;
                }
            }
        };
        GuessLikeItem.prototype.exposure = function () {
            if (DeviceUtil.isOPPOMiniGame()) {
                return;
            }
        };
        GuessLikeItem.prototype.click = function () {
            var itemData_ = this.itemData_;
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(itemData_.id);
            }
            var data = {
                appId: itemData_.appid,
                path: itemData_.url,
                success: function () {
                    console.log("navigateToMiniProgram success");
                    if (BaseConst.infos.gameInfo.isDY) {
                        PlatformDY.toGame(itemData_.id);
                    }
                },
                fail: function (e) {
                    console.log("navigateToMiniProgram fail e =", e);
                    if (DeviceUtil.isWXMiniGame()) {
                        ViewManager.getInstance().showView(MoreGameRandomGameBox713);
                    }
                }
            };
            platform.navigateToMiniProgram(data);
        };
        return GuessLikeItem;
    }(BaseSceneUISkin));

    var GuessLike = (function (_super) {
        __extends(GuessLike, _super);
        function GuessLike(skin, subItemSkin, listdata_, itemW) {
            var _this = _super.call(this) || this;
            _this.className_key = "GuessLike";
            _this.listdata = [];
            _this.isTouch = false;
            _this.index = 0;
            _this.len = 0;
            _this.nNum = 0;
            _this.subItemSkin = subItemSkin;
            listdata_ && (_this.listdata = listdata_);
            _this.itemW = itemW;
            _this.skin = skin;
            return _this;
        }
        GuessLike.prototype.childrenCreated = function () {
            this.width = 1026;
            this.height = 330;
            this.panelList.hScrollBarSkin = "";
            this.panelList.hScrollBar.touchScrollEnable = false;
            this.initList();
        };
        GuessLike.prototype.initList = function () {
            for (var i = 0, len = this.listdata.length; i < len; i++) {
                var item = new GuessLikeItem(this.subItemSkin, this.listdata[i]);
                this.boxView.addChild(item);
                item.x = this.itemW * (i - 1);
            }
            this.index = -1;
            this.len = this.listdata.length;
            this.boxView.x = 0;
            this.onEnable();
            this.panelList.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        };
        GuessLike.prototype.onEnable = function () {
            if (this.isCreate) {
                this.aniPerIndex();
            }
        };
        GuessLike.prototype.onEnabled = function () {
            this.btn_moreGame && this.btn_moreGame.on(Laya.Event.CLICK, this, this.onMoreGame);
        };
        GuessLike.prototype.onMoreGame = function () {
            this.onMoreGameCall && this.onMoreGameCall();
        };
        GuessLike.prototype.onDisable = function () {
            if (this.isCreate) {
                this.panelList.clearTimer(this, this.frameChange);
                this.panelList.clearTimer(this, this.aniLoop);
                this.btn_moreGame && this.btn_moreGame.off(Laya.Event.CLICK, this, this.onMoreGame);
            }
        };
        GuessLike.prototype.mouseDown = function (evt) {
            this.isTouch = true;
            this.clickX = evt.stageX;
            this.starX = this.boxView.x;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseOutUp);
        };
        GuessLike.prototype.frameChange = function () {
            var self = this;
            if (!self.isTouch) {
                self.boxView.x -= 1;
                this.nNum += 1;
                if (this.nNum == self.itemW) {
                    this.panelList.clearTimer(this, this.frameChange);
                    this.nNum = 0;
                }
            }
            var curX = self.boxView.x;
            if (curX > (self.index + 1) * self.itemW) {
                self.index++;
                var last = self.boxView.removeChildAt(self.boxView.numChildren - 1);
                var first = self.boxView.getChildAt(0);
                last.x = first.x - self.itemW;
                self.boxView.addChildAt(last, 0);
                last.exposure();
                return;
            }
            if (curX < (self.index - 1) * self.itemW) {
                self.index--;
                var last = self.boxView.getChildAt(self.boxView.numChildren - 1);
                var first = self.boxView.removeChildAt(0);
                first.x = last.x + self.itemW;
                self.boxView.addChild(first);
                first.exposure();
                return;
            }
        };
        GuessLike.prototype.mouseMove = function (evt) {
            this.boxView.x = this.starX + (evt.stageX - this.clickX);
        };
        GuessLike.prototype.mouseOutUp = function () {
            this.isTouch = false;
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseOutUp);
        };
        GuessLike.prototype.aniPerIndex = function () {
            this.panelList.frameLoop(400, this, this.aniLoop);
        };
        GuessLike.prototype.aniLoop = function () {
            this.panelList.clearTimer(this, this.frameChange);
            this.panelList.frameLoop(1, this, this.frameChange);
        };
        return GuessLike;
    }(BaseSceneUISkin));

    var MiniManeger = (function () {
        function MiniManeger() {
            this.hideTime = 0;
            this.showTime = 0;
            this.defaultMssage = {
                "title": "休闲解密游戏，开动你的小脑筋帮助公主逃离魔爪！",
                "imageUrl": "https://package.32yx.com/ecy_game_small/laya/girl_ks/Share/500x400-1.jpg?v=" + 1.0,
                "query": ""
            };
            this.shareInfo = [
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
            ];
            this.shareInfoTT = [
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
            ];
            this.shareInfoDouYin = [
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
            ];
            this.bFlagDouYin = false;
            this.sucTime = 0;
            this.canShowBanner = true;
            this.bFlagSpecialView = true;
            this.bTimerOpen = false;
            this.stPhoneInfo = null;
            this.nRecordTime = 60;
            this.nRecordTimeReal = 0;
            this.onShareVideoSuccess = false;
            this.pBlockAd = null;
            this.specialData = [
                {
                    "AppID": "wx3aaf3ba7dc737bec",
                    "path": "pages/read/read?chapterId=1653070&comicId=107477",
                    "extraData": {
                        "appName": "KingsDaughter"
                    }
                },
                {
                    "AppID": "1109631505",
                    "path": "pages/read/read?chapterId=1653070&comicId=107477",
                    "extraData": {
                        "appName": "KingsDaughter"
                    }
                },
                {
                    "AppID": "ttc63ab0875910457b",
                    "path": "pages/read/read?chapterId=1653070&comicId=107477",
                    "extraData": {
                        "appName": "KingsDaughter"
                    }
                }
            ];
            this.strApiUrl = "https://pv.sohu.com/cityjson?ie=utf-8";
            this.initVideoInfo();
        }
        Object.defineProperty(MiniManeger, "instance", {
            get: function () {
                if (this.ins == null) {
                    this.ins = new MiniManeger();
                }
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });
        MiniManeger.prototype.initMiniGame = function () {
            var _this = this;
            var launchObj = platform.getLaunchOptionsSync();
            if (launchObj) {
                console.log('launchObj>>>>>>>>>>>>>>', launchObj);
            }
            this.getUpdateManager();
            platform.setKeepScreenOn();
            platform.updateShareMenu();
            platform.showShareMenu();
            platform.onShareAppMessage(function () {
                return _this.defaultMssage;
            });
            this.systemInfo = platform.getSystemInfoSync();
            console.log("systemInfo >> ", this.systemInfo);
        };
        MiniManeger.prototype.getUpdateManager = function () {
        };
        MiniManeger.prototype.onAudioInterruptionBegin = function (call) {
        };
        MiniManeger.prototype.onAudioInterruptionEnd = function (call) {
        };
        MiniManeger.prototype.getUserInfo = function () {
            return new Promise(function (resolve) {
                resolve(null);
            });
        };
        MiniManeger.prototype.initUserTemp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var info, strOpenIdOther, strOpenIdOther;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getUserInfo()];
                        case 1:
                            info = _a.sent();
                            if (!(info == null)) return [3, 3];
                            return [4, this.userButtonSize(0, 1, 0)];
                        case 2:
                            info = _a.sent();
                            strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
                            console.log("strOpenIdOther = ", strOpenIdOther);
                            if (strOpenIdOther && strOpenIdOther != "") {
                                platform.createUserInfoButton(function (data) {
                                    GameData.getInstance().userInfo.nick = data.userInfo.nickName;
                                    GameData.getInstance().userInfo.avatarUrl = data.userInfo.avatarUrl;
                                    if (!BaseConst.infos.gameInfo.isDY) {
                                        InviteManager.getInstance().judgeInvite();
                                        console.log("createUserInfoButton 用户信息 : ", GameData.getInstance().userInfo);
                                    }
                                    info = data;
                                });
                            }
                            return [3, 4];
                        case 3:
                            GameData.getInstance().userInfo.nick = info.userInfo.nickName;
                            GameData.getInstance().userInfo.avatarUrl = info.userInfo.avatarUrl;
                            strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
                            console.log("strOpenIdOther = ", strOpenIdOther);
                            if (strOpenIdOther && strOpenIdOther != "") {
                                InviteManager.getInstance().judgeInvite();
                                console.log("createUserInfoButton 用户信息 judgeInvite: ", GameData.getInstance().userInfo);
                            }
                            _a.label = 4;
                        case 4:
                            MiniManeger.instance.defaultMssage.query = "openid=" + GameData.getInstance().userInfo.openId;
                            platform.onShareAppMessage(function () {
                                return MiniManeger.instance.defaultMssage;
                            });
                            return [2, info];
                    }
                });
            });
        };
        MiniManeger.prototype.userButtonSize = function (percentTop, pectendSize, percentLeft) {
            var resInfo = platform.getSystemInfoSync();
            var left = resInfo['windowWidth'] * percentLeft;
            var top = resInfo['windowHeight'] * percentTop;
            var wid = resInfo['windowWidth'] * pectendSize;
            var height = resInfo['windowHeight'] * pectendSize;
        };
        MiniManeger.prototype.onShow = function (callBack) {
            var _this = this;
            platform.onShow(function () {
                callBack && callBack();
                _this.showTime = new Date().getTime();
                if (!DeviceUtil.isTTMiniGame()) {
                    if (_this.showTime - _this.hideTime >= _this.sucTime) {
                        _this.shareSucful && _this.shareSucful.call(_this.thisObj);
                    }
                    else {
                        _this.shareFailful && _this.shareFailful.call(_this.thisObj);
                    }
                }
                PlayerDataManager.nTimeHidSec = _this.showTime - _this.hideTime;
                if (PlayerDataManager.nTimeHidSec == _this.showTime)
                    PlayerDataManager.nTimeHidSec = 0;
                _this.shareFailful = null;
                _this.shareSucful = null;
                _this.thisObj = null;
            });
        };
        MiniManeger.prototype.onHide = function (callBack) {
            var _this = this;
            platform.onHide(function () {
                callBack && callBack();
                _this.hideTime = new Date().getTime();
            });
        };
        MiniManeger.prototype.showMoreGame = function (data) {
            return new Promise(function (resolve) {
            });
        };
        MiniManeger.prototype.getShareInfo = function (query) {
            var shareInfo = this.shareInfo;
            if (DeviceUtil.isTTMiniGame()) {
                shareInfo = this.shareInfoTT;
            }
            var info = shareInfo[Math.floor(Math.random() * shareInfo.length)];
            if (query) {
                var openId = GameData.getInstance().userInfo.openId;
                query['openid'] = openId;
            }
            info.query = Utils.querStr(query);
            return info;
        };
        MiniManeger.prototype.testShareVideo = function () {
            var obj = {
                channel: "video",
                title: "测试分享视频",
                desc: "测试描述",
                imageUrl: "",
                templateId: "",
                query: "",
                extra: {
                    videoPath: "ttfile://temp/test.mp4",
                    videoTopics: ["话题11", "话题21"]
                },
                success: function () {
                    console.log("分享视频成功");
                },
                fail: function (e) {
                    console.log("分享视频失败");
                }
            };
            obj.extra.videoPath = this.strVideoPatch;
            platform.shareAppMessage(obj);
        };
        MiniManeger.prototype.getShareInfoDouYin = function (query) {
            var shareInfo = this.shareInfoDouYin;
            var info = shareInfo[Math.floor(Math.random() * shareInfo.length)];
            if (query) {
                var openId = GameData.getInstance().userInfo.openId;
                query['openid'] = openId;
            }
            info.query = Utils.querStr(query);
            info.extra.videoPath = this.strVideoPatch;
            return info;
        };
        MiniManeger.prototype.shareAppMessage = function (data) {
            if (data == null) {
                data = {};
            }
            if (!data.message) {
                data.message = this.getShareInfo({});
            }
            if (this.isAiQiYi()) {
                PlatfprmAiQiYi.shareAiQiYi(data.message.title, data.message.title, data.message.imageUrl);
                return;
            }
            if (DeviceUtil.isTTMiniGame()) {
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN' && this.bFlagDouYin) {
                    data.message = this.getShareInfoDouYin({});
                    console.log("data.message = ", data.message);
                }
                if (data.sucFun) {
                    data.sucFun && (data.message.success = data.sucFun);
                }
                else {
                    data.message.success = function () {
                        TipsManager.getInstance().showDefaultTips('分享成功!');
                    };
                }
                if (data.failFun) {
                    data.failFun && (data.message.fail = data.failFun);
                }
                else {
                    data.message.fail = function () {
                    };
                }
                platform.shareAppMessage(data.message);
                return;
            }
            this.shareSucful = data.sucFun;
            this.shareFailful = function () {
                data.failFun && data.failFun();
            };
            this.thisObj = data.thisObj;
            this.sucTime = data.time || 1500;
            if (DeviceUtil.isWXMiniGame() || DeviceUtil.isQQMiniGame()) {
                platform.shareAppMessage(data.message);
            }
        };
        MiniManeger.prototype.playViderAd = function (data) {
            if (DeviceUtil.isNative()) {
                NativeMgr.getInstance().showVideoAd(function () {
                    data.successFun && data.successFun();
                }, function () {
                    data.errorFun && data.errorFun();
                });
                return;
            }
            if (!DeviceUtil.isMiniGame()) {
                data.successFun && data.successFun();
                return;
            }
            var videoId = GameData.getInstance().videoId;
            if (data.isLongVideo) {
                videoId = GameData.getInstance().longVideoId;
            }
            if (videoId.length <= 0) {
                TipsManager.getInstance().showDefaultTips('开发中');
                data.errorFun && data.errorFun();
                return;
            }
            ViewChangeManager.getInstance().showBufferLoadingView();
            var adId = videoId[Math.floor(Math.random() * videoId.length)];
            platform.createRewardedVideoAd(adId, function (res) {
                if (res.isEnded) {
                    data.successFun && data.successFun();
                    if (!DeviceUtil.isTTMiniGame()) {
                        SoundManager.getInstance().playBgMusic();
                    }
                    console.log(" video normal！");
                }
                else {
                    data.failFun && data.failFun();
                    if (!DeviceUtil.isTTMiniGame()) {
                        SoundManager.getInstance().playBgMusic();
                    }
                    console.log(" video not finish！");
                }
                ViewChangeManager.getInstance().hideBufferLoadingView();
            }, function () {
                ViewChangeManager.getInstance().hideBufferLoadingView();
                TipsManager.getInstance().showDefaultTips('网络错误');
                data.errorFun && data.errorFun();
                if (!DeviceUtil.isTTMiniGame()) {
                    SoundManager.getInstance().playBgMusic();
                }
            });
        };
        MiniManeger.prototype.showBannerAd = function (offset) {
            if (!DeviceUtil.isMiniGame()) {
                return;
            }
            if ((DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame()) && !this.bFlagSpecialView) {
                return;
            }
            console.log("showBannerAd");
            if (DeviceUtil.isTTMiniGame()) {
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN') {
                    return;
                }
            }
            this.canShowBanner = true;
            var bannerId = GameData.getInstance().bannerId;
            if (bannerId.length <= 0) {
                console.log("bannerId.length <= 0");
                return;
            }
            var adId = bannerId[Math.floor(Math.random() * bannerId.length)];
            console.log("adId = ", adId);
            if (this.bannerAd == null) {
                var bannerAd = platform.createBannerAd(adId);
                this.bannerAd = bannerAd;
                if (bannerAd == null)
                    return;
                bannerAd.show();
            }
            this.bannerAd.show();
            if (!this.canShowBanner) {
                this.bannerAd.hide();
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
        };
        MiniManeger.prototype.refreshBinnerReadl = function () {
            if (!this.bFlagSpecialView) {
                return;
            }
            if (DeviceUtil.isQQMiniGame()) {
                var bannerId = GameData.getInstance().bannerId;
                if (bannerId.length <= 0) {
                    console.log("bannerId.length <= 0");
                    return;
                }
                var adId = bannerId[Math.floor(Math.random() * bannerId.length)];
                platform.binnerDestroy();
                this.hideBanner();
                this.bannerAd = null;
                this.bannerAd = platform.createBannerAd(adId);
                this.showBannerAd();
            }
        };
        MiniManeger.prototype.refreshBinner = function () {
            if (this.bTimerOpen) {
                return;
            }
            this.bTimerOpen = true;
            Laya.timer.clear(this, this.refreshBinnerReadl);
            Laya.timer.loop(BaseConst.infos.gameInfo.binnertime, this, this.refreshBinnerReadl);
        };
        MiniManeger.prototype.hideBanner = function () {
            if (DeviceUtil.isTTMiniGame()) {
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN') {
                    return;
                }
            }
            if (this.bannerAd != null) {
                this.bannerAd.hide();
            }
            this.canShowBanner = false;
            console.log("hideBanner");
        };
        MiniManeger.prototype.resetBinnerOper = function () {
            if (!this.stPhoneInfo) {
                this.stPhoneInfo = platform.getSystemInfoSync();
            }
            if (this.bannerAd) {
                this.bannerAd.style.left = this.stPhoneInfo.screenWidth / 2 - this.bannerAd.style.realWidth / 2 + 0.1;
                this.bannerAd.style.top = this.stPhoneInfo.screenHeight - this.bannerAd.style.realHeight + 0.1;
            }
        };
        MiniManeger.prototype.adaptImgToClientRect = function (collec_img, stage) {
            if (DeviceUtil.isWXMiniGame()) {
                var systemInfo = platform.getSystemInfoSync();
                var screenHeight = systemInfo['screenHeight'];
                var screenWidth = systemInfo['screenWidth'];
                var rect = platform.getMenuButtonBoundingClientRect();
                collec_img.top = stage.height * (rect['top'] / screenHeight);
                collec_img.right = stage.width * (1 - rect['right'] / screenWidth) + collec_img.width;
            }
        };
        MiniManeger.prototype.sendDataToWxOpen = function (data) {
            Laya.MiniAdpter.window.wx.postMessage(data);
        };
        MiniManeger.prototype.removeOpenData = function (data) {
            var wxOpenData = data.parent.getChildByName('wxOpenData');
            this.sendDataToWxOpen({ cmd: 'close', data: null });
            if (wxOpenData) {
                wxOpenData.removeSelf();
                wxOpenData.destroy();
                wxOpenData = null;
            }
        };
        MiniManeger.prototype.addOpenWxData = function (data) {
            var shareData = MiniManeger.instance.getShareInfo({ id: GameData.getInstance().userInfo.openId });
            this.sendDataToWxOpen({ cmd: 'share', data: JSON.stringify(shareData) });
            var wxOpenData = data.parent.getChildByName('wxOpenData');
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
            }
            else {
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
        };
        MiniManeger.prototype.initBlockAd = function () {
            if (!DeviceUtil.isQQMiniGame()) {
                return;
            }
            this.blockAd = platform.createBlockAD();
        };
        MiniManeger.prototype.showBlockAd = function () {
            if (!DeviceUtil.isQQMiniGame()) {
                return;
            }
            if (!this.blockAd) {
                return;
            }
            console.log("显示积木广告--");
            this.blockAd.show().then(function () {
                console.log("积木广告显示成功！");
            })["catch"](function (err) {
                console.log("积木广告显示失败！ ", err);
            });
        };
        MiniManeger.prototype.hideBlockAd = function () {
            if (!DeviceUtil.isQQMiniGame()) {
                return;
            }
            if (!this.blockAd) {
                return;
            }
            this.blockAd.hide();
        };
        MiniManeger.prototype.initBoxAd = function () {
            var self = this;
            if (!self.tempBoxAD) {
                self.tempBoxAD = platform.createAppBox(GameData.getInstance().boxId[0]);
                self.tempBoxAD.load().then(function (res) {
                    console.log("boxAd load");
                })["catch"](function (err) {
                    console.log("boxAd load err");
                    console.log(err);
                });
                self.tempBoxAD.onClose(function () {
                    self._imgRect && self._imgRect.removeSelf();
                    self.onCloseBoxAD && self.onCloseBoxAD();
                });
            }
        };
        MiniManeger.prototype.showBoxAd = function (onCloseCall) {
            return __awaiter(this, void 0, void 0, function () {
                var self, bxoAD;
                return __generator(this, function (_a) {
                    self = this;
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
                                bxoAD = self.tempBoxAD.load();
                                if (bxoAD) {
                                    bxoAD.then(function () {
                                        var boxAdShow = self.tempBoxAD.show();
                                        if (boxAdShow) {
                                            boxAdShow.then(function (res) {
                                                console.log("boxAd show");
                                                console.log(res);
                                                Laya.stage.addChild(self._imgRect);
                                            })["catch"](function (err) {
                                                console.log("boxAd show err");
                                                console.log(err);
                                                self.onCloseBoxAD && self.onCloseBoxAD();
                                            });
                                        }
                                        else {
                                            self.onCloseBoxAD && self.onCloseBoxAD();
                                        }
                                    });
                                }
                                else {
                                    self.onCloseBoxAD && self.onCloseBoxAD();
                                }
                            }
                            else {
                                self.onCloseBoxAD && self.onCloseBoxAD();
                            }
                        }
                        catch (err) {
                            console.log("err<>>>>>", err);
                            self.onCloseBoxAD && self.onCloseBoxAD();
                        }
                    }
                    else {
                        self.onCloseBoxAD && self.onCloseBoxAD();
                    }
                    return [2];
                });
            });
        };
        MiniManeger.prototype.initVideoInfo = function () {
            var _this = this;
            if (!DeviceUtil.isTTMiniGame()) {
                return;
            }
            this.recorder = platform.getGameRecorderManager();
            this.recorder.onStart(function (res) {
                console.log("onStart -> ", res);
            });
            this.recorder.onStop(function (res) {
                _this.strVideoPatch = res.videoPath;
                if (_this.nRecordTimeReal < 3000)
                    _this.strVideoPatch = null;
                console.log("onStop ->", _this.strVideoPatch);
                MiniManeger.instance.saveCallF && MiniManeger.instance.saveCallF();
            });
            this.recorder.onPause(function (res) {
                console.log("录制视频暂停 ");
            });
            this.recorder.onResume(function (res) {
                console.log("录制视频继续 ");
            });
        };
        MiniManeger.prototype.StartRecorderVideo = function () {
            var _this = this;
            if (!DeviceUtil.isTTMiniGame()) {
                return;
            }
            this.nRecordTimeReal = 0;
            this.strVideoPatch = "";
            Laya.timer.once(100, this, function () {
                platform.getGameRecorderManager().start({ duration: _this.nRecordTime });
            });
            Laya.timer.loop(1000, this, this.timeStopVideo);
            console.log("开始录制视频");
        };
        MiniManeger.prototype.timeStopVideo = function () {
            this.nRecordTimeReal += 1000;
            if (this.nRecordTimeReal >= this.nRecordTime * 1000) {
                this.StopVideo();
            }
        };
        MiniManeger.prototype.StopVideo = function () {
            if (!DeviceUtil.isTTMiniGame()) {
                return;
            }
            EventMgr.getInstance().sendEvent(GameEvent.CHANGE_VIDEO_IMAGE);
            platform.getGameRecorderManager().stop();
            Laya.timer.clear(this, this.timeStopVideo);
            console.log("停止录制视频  this.nRecordTimeReal=", this.nRecordTimeReal);
        };
        MiniManeger.prototype.resumeVideo = function () {
            platform.getGameRecorderManager().resume();
            console.log("继续录制视频 ");
        };
        MiniManeger.prototype.pauseVideo = function () {
            platform.getGameRecorderManager().resume();
            console.log("暂停录制视频 ");
        };
        MiniManeger.prototype.shareGameVideo = function (data) {
            if (!this.strVideoPatch || this.strVideoPatch.length == 0) {
                TipsManager.getInstance().showDefaultTips("暂未录制视频哦!");
                return;
            }
            if (this.nRecordTimeReal <= 3000) {
                TipsManager.getInstance().showDefaultTips("录制视频失败");
                data.failFun && data.failFun();
                return;
            }
            if (!DeviceUtil.isTTMiniGame()) {
                return;
            }
            console.log("分享游戏视频--");
            var obj = {};
            obj.title = "阿罗斯营救";
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
        };
        MiniManeger.prototype.onShareVideo = function (data) {
            this.shareGameVideo(data);
        };
        MiniManeger.prototype.showInterstitialAd = function () {
            if (DeviceUtil.isTTMiniGame()) {
                var info = platform.getSystemInfoSync();
                if (info.appName.toUpperCase() == 'DOUYIN') {
                    return;
                }
                var strID = BaseConst.infos.gameInfo.InterstitialAd;
                if (!strID && strID == "") {
                    return;
                }
                platform.createInterstitialAd({ adUnitId: strID });
                console.log("to show createInterstitialAd!strID = ", strID);
            }
        };
        MiniManeger.prototype.showMoreGamesModal = function () {
            var appLaunchOptions = [];
            for (var i = 0, len = GameData.getInstance().weCatMiniIconsInfo.length; i < len; i++) {
                appLaunchOptions.push({
                    appId: GameData.getInstance().weCatMiniIconsInfo[i].ad_appid,
                    query: "",
                    extraData: {}
                });
            }
            platform.showMoreGamesModal({
                appLaunchOptions: appLaunchOptions,
                success: function (res) {
                    console.log("success", res.errMsg);
                },
                fail: function (res) {
                    console.log("fail", res.errMsg);
                },
                complete: function (res) {
                    console.log("complete", res.errMsg);
                }
            });
        };
        MiniManeger.prototype.createGuessLike = function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            var data, nCount, nIndex, i, guessLike;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        data = PlatformDY.gameListInfos;
                                        if (!(data == null)) return [3, 2];
                                        return [4, PlatformDY.getGameList()];
                                    case 1:
                                        data = _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (data == null) {
                                            resolve(null);
                                            return [2];
                                        }
                                        if (data.length <= 0) {
                                            return [2];
                                        }
                                        if (data.length < 10) {
                                            nCount = 10 - data.length;
                                            nIndex = 0;
                                            for (i = 0; i < nCount; ++i) {
                                                if (nIndex >= data.length) {
                                                    nIndex = 0;
                                                }
                                                data.push(data[nIndex]);
                                                nIndex += 1;
                                            }
                                        }
                                        console.log("data(GuessLike) ->", data);
                                        guessLike = parent.getChildByName('GuessLike');
                                        if (guessLike == null) {
                                            guessLike = new GuessLike("game/uiView/GuessLike.json", "game/uiView/GuessLikeItem.json", data, 220);
                                            parent.addChild(guessLike);
                                        }
                                        guessLike.name = 'GuessLike';
                                        guessLike.mouseThrough = true;
                                        guessLike.x = (Laya.stage.width - guessLike.width) / 2;
                                        guessLike.y = Laya.stage.height - guessLike.height;
                                        resolve(guessLike);
                                        return [2];
                                }
                            });
                        }); })];
                });
            });
        };
        MiniManeger.prototype.getAppInfo = function () {
            var nIndex = 0;
            if (DeviceUtil.isWXMiniGame()) {
                nIndex = 0;
            }
            else if (DeviceUtil.isQQMiniGame()) {
                nIndex = 1;
            }
            else if (DeviceUtil.isTTMiniGame()) {
                nIndex = 2;
            }
            else {
                return null;
            }
            return this.specialData[nIndex];
        };
        MiniManeger.prototype.toGameSpecial = function () {
            var nIndex = 0;
            if (DeviceUtil.isWXMiniGame()) {
                nIndex = 0;
            }
            else if (DeviceUtil.isQQMiniGame()) {
                nIndex = 1;
            }
            else if (DeviceUtil.isTTMiniGame()) {
                nIndex = 2;
            }
            else {
                return;
            }
            var stDataTemp = this.specialData[nIndex];
            if (BaseConst.infos.gameInfo.isDY) {
                PlatformDY.clickGame(stDataTemp.AppID);
            }
            var data = {
                appId: stDataTemp.AppID,
                path: stDataTemp.path,
                extraData: stDataTemp.extraData,
                success: function () {
                    console.log("toGameSpecial success!");
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
        };
        MiniManeger.prototype.checkCityInfo = function () {
            if (!BaseConst.infos.gameInfo.region) {
                return;
            }
            HttpMgr$1.getInstance().sendHttpTemp(this.strApiUrl, null, function (data) {
                console.log("regioninfo = ", data);
                var strRegion = data;
                var nLen = BaseConst.infos.gameInfo.region.length;
                var strDataTemp = "";
                for (var i = 0; i < nLen; ++i) {
                    strDataTemp = BaseConst.infos.gameInfo.region[i];
                    if (strRegion.indexOf(strDataTemp) != -1) {
                        BaseConst.infos.gameInfo.succShowBox = 0;
                        BaseConst.infos.gameInfo.siginC = 0;
                        BaseConst.infos.gameInfo.boxWDJ = 0;
                        break;
                    }
                }
            }, function () {
            });
        };
        MiniManeger.prototype.isAiQiYi = function () {
            return PlatfprmAiQiYi.isOpen;
        };
        MiniManeger.prototype.compareVersion = function (v1, v2) {
            var v1Arr = v1.split(".");
            var v2Arr = v2.split(".");
            var len = Math.max(v1Arr.length, v2Arr.length);
            while (v1Arr.length < len) {
                v1Arr.push("0");
            }
            while (v2Arr.length < len) {
                v2Arr.push("0");
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1Arr[i]);
                var num2 = parseInt(v2Arr[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        };
        MiniManeger.prototype.addColorSign = function (data) {
            if (DeviceUtil.isQQMiniGame()) {
                if (this.compareVersion(this.systemInfo.SDKVersion, "1.10.0") >= 0) {
                    platform.addColorSign(data);
                }
            }
        };
        MiniManeger.prototype.isColorSignExistSync = function () {
            if (this.compareVersion(this.systemInfo.SDKVersion, "1.16.0") >= 0) {
                return platform.isColorSignExistSync();
            }
            else {
                return this.compareVersion(this.systemInfo.SDKVersion, "1.10.0") >= 0;
            }
        };
        return MiniManeger;
    }());

    var GamePreLoadingView = (function (_super) {
        __extends(GamePreLoadingView, _super);
        function GamePreLoadingView() {
            var _this = _super.call(this) || this;
            _this.className_key = "GamePreLoadingView";
            _this.img_bg = new Laya.Image();
            _this.img_bg.skin = "resource/assets/preloading/loading_bg.jpg";
            _this.img_bg.width = Laya.stage.width;
            _this.img_bg.height = Laya.stage.height;
            _this.img_bg.x = 0;
            _this.img_bg.y = 0;
            _this.addChild(_this.img_bg);
            _this.img_head = new Laya.Image();
            if (DeviceUtil.isWXMiniGame()) {
                _this.img_head.skin = "resource/assets/preloading/loading_logo_3.png";
            }
            else if (DeviceUtil.isTTMiniGame()) {
                _this.img_head.skin = "resource/assets/preloading/loading_logo_4.png";
            }
            else {
                if (MiniManeger.instance.isAiQiYi()) {
                    _this.img_head.skin = "resource/assets/preloading/loading_logo_x.png";
                }
                else {
                    _this.img_head.skin = "resource/assets/preloading/loading_logo.png";
                }
            }
            _this.img_head.top = 300;
            _this.img_head.centerX = 0;
            _this.addChild(_this.img_head);
            _this.img_jdt_db = new Laya.Image();
            _this.img_jdt_db.skin = "resource/assets/preloading/loading_baseboard_1.png";
            _this.img_jdt_db.sizeGrid = "10,10,10,10";
            _this.img_jdt_db.width = 706;
            _this.img_jdt_db.height = 50;
            _this.img_jdt_db.bottom = 400;
            _this.img_jdt_db.centerX = 0;
            _this.addChild(_this.img_jdt_db);
            _this.img_jdt = new Laya.Image();
            _this.img_jdt.skin = "resource/assets/preloading/loading_baseboard_2.png";
            _this.img_jdt.sizeGrid = "10,10,10,10";
            _this.img_jdt.width = 691;
            _this.img_jdt.height = 36;
            _this.img_jdt.x = 8;
            _this.img_jdt.centerY = 0;
            _this.img_jdt_db.addChild(_this.img_jdt);
            _this.img_load = new Laya.Image();
            _this.img_load.skin = "resource/assets/preloading/loading_word.png";
            _this.img_load.bottom = 300;
            _this.img_load.centerX = 0;
            _this.addChild(_this.img_load);
            _this.aniBox = new Laya.Box();
            _this.aniBox.width = 500;
            _this.aniBox.height = 700;
            _this.aniBox.x = Laya.stage.width / 2;
            _this.aniBox.y = Laya.stage.height / 2;
            _this.addChild(_this.aniBox);
            _this.createSkeleton("resource/assets/preloading/loading.sk").then(function (skeAni) {
                _this.loadingAni = skeAni;
            });
            _this.progress(1, 100);
            return _this;
        }
        GamePreLoadingView.prototype.childrenCreated = function () {
        };
        GamePreLoadingView.prototype.createSkeleton = function (url) {
            var _this = this;
            return new Promise(function (resolve) {
                AnimationManager.instance.showSkeletonAnimation(url, function (skeAni) {
                    skeAni.player.playbackRate = 1;
                    skeAni.autoSize = true;
                    skeAni.scale(1, 1);
                    skeAni.play(0, true);
                    _this.aniBox.y = Laya.stage.height / 2 + skeAni.height / 2 + 25;
                    _this.aniBox.addChild(skeAni);
                    resolve(skeAni);
                }, 1);
            });
        };
        GamePreLoadingView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        GamePreLoadingView.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            this.img_bg.scaleX = this.img_bg.scaleY = DeviceUtil.getScalePix();
        };
        GamePreLoadingView.prototype.progress = function (index, len) {
            if (this.img_jdt) {
                this.img_jdt.width = 691 * (index / len);
            }
        };
        GamePreLoadingView.prototype.remove = function () {
            Laya.timer.clearAll(this);
        };
        return GamePreLoadingView;
    }(BaseSceneUISkin));

    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this, { width: 1080, height: 1920, exportSceneToJson: true }) || this;
            _this.isFlage = false;
            GameConfig.init();
            if (DeviceUtil.isNative()) {
                SoundConst.perfix = "resource/assets/sounds/ogg/";
                SoundConst.sufix = ".ogg";
            }
            var onShow = function (obj) {
                if (MiniManeger.instance.isAiQiYi()) {
                    return;
                }
                console.log("onShow...", obj);
                SoundManager.getInstance().playBgMusic();
                if (ViewChangeManager.bGameOpen) {
                    if (ViewChangeManager.getInstance().CurLevelBase) {
                        ViewChangeManager.getInstance().CurLevelBase.levelOnShow();
                    }
                }
            };
            var onHide = function () {
                if (MiniManeger.instance.isAiQiYi()) {
                    return;
                }
                console.log("onHide...");
                SoundManager.getInstance().pauseBgm();
                if (ViewChangeManager.getInstance().CurLevelBase) {
                    ViewChangeManager.getInstance().CurLevelBase.levelOnHide();
                }
            };
            var onAudioInterruptionBegin = function (res) {
                console.log("onAudioInterruptionBegin");
            };
            var onAudioInterruptionEnd = function (res) {
                console.log("onAudioInterruptionEnd");
            };
            if (DeviceUtil.isMiniGame()) {
                GameData.getInstance().enterGameInfo = platform.getLaunchOptionsSync();
                MiniManeger.instance.onShow(onShow);
                MiniManeger.instance.onHide(onHide);
                MiniManeger.instance.onAudioInterruptionBegin(onAudioInterruptionBegin);
                MiniManeger.instance.onAudioInterruptionEnd(onAudioInterruptionEnd);
                MiniManeger.instance.initMiniGame();
            }
            else {
                Laya.stage.on(Laya.Event.FOCUS, _this, function () {
                    console.log("获取焦点");
                    onShow(null);
                });
                Laya.stage.on(Laya.Event.BLUR, _this, function () {
                    console.log("失去焦点");
                    onHide();
                });
            }
            return _this;
        }
        Main.prototype.checkPlatform = function () {
            this.loadingView = new GamePreLoadingView();
            SceneManager.getInstance().openSceneInstance(this.loadingView);
            console.log("检验平台---");
            var self = this;
            if (window["loadingH5"]) {
                window["loadingH5"](100);
            }
            if (window["loadingView"]) {
                window["NativeBrige"] = NativeBrige.getInstance();
                window["loadingView"].loading(100);
            }
            window["onEventNotify"] = PlatfprmAiQiYi.processAppMsg;
            var resUrl = "./";
            if (DeviceUtil.isQQMiniGame()) {
                GameData.getInstance().gameId = "1050";
                Laya.timer.loop(10000, window, function () {
                    console.log("qq加速回收---");
                    platform.triggerGC();
                });
                resUrl = GameData.getInstance().qqMiniGameResUrl;
                self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
            }
            else if (DeviceUtil.isWXMiniGame()) {
                GameData.getInstance().gameId = "1054";
                Laya.timer.loop(10000, window, function () {
                    console.log("wx加速回收---");
                    platform.triggerGC();
                });
                resUrl = GameData.getInstance().wxMiniGameResUrl;
                self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
            }
            else if (DeviceUtil.isTTMiniGame()) {
                GameData.getInstance().gameId = "1049";
                Laya.timer.loop(10000, window, function () {
                    console.log("tt加速回收---");
                    platform.triggerGC();
                });
                resUrl = GameData.getInstance().ttMiniGameResUrl;
                self.loadPreLoadRes(resUrl + "configs/infos.json?v=" + Math.random());
            }
            else if (DeviceUtil.isNative()) {
                resUrl = "";
                GameData.getInstance().gameId = "1049";
                self.loadPreLoadRes(resUrl + "configs/infos.json");
                Laya.timer.once(5000, window, function () {
                    NativeMgr.getInstance().showAdView();
                });
            }
            else {
                GameData.getInstance().gameId = "1049";
                self.initDebug();
                self.loadPreLoadRes(resUrl + "configs/infos.json");
            }
            if (DeviceUtil.isMiniGame()) {
                ResUtil.getIntance().defaultOriginUrl = resUrl;
                ResUtil.getIntance().addVersionPrefix(resUrl);
            }
        };
        Main.prototype.loadPreLoadRes = function (resUrl) {
            this.initInfos(resUrl);
            Laya.timer.once(5000, this, this.loadPreLoadRes, [resUrl]);
        };
        Main.prototype.enableFileConfig = function () {
            Laya.timer.clearAll(this);
            this.loadFileConfig("fileconfig.json");
            if (this.isFlage) {
                return;
            }
            this.isFlage = true;
            console.log(BaseConst.infos);
            GameData.getInstance().initConfig(BaseConst.infos);
            if (DeviceUtil.isWXMiniGame()) {
                PlatformDY.url = BaseConst.infos.gameInfo.url;
            }
            MiniManeger.instance.showBannerAd();
            MiniManeger.instance.checkCityInfo();
        };
        Main.prototype.platformLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res_1, enter, res_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(DeviceUtil.isQQMiniGame() || DeviceUtil.isWXMiniGame() || DeviceUtil.isTTMiniGame())) return [3, 8];
                            console.log("开始登录");
                            if (DeviceUtil.isQQMiniGame()) {
                                MiniManeger.instance.initBoxAd();
                                MiniManeger.instance.initBlockAd();
                            }
                            enter = function () { return __awaiter(_this, void 0, void 0, function () {
                                var isAuthorize, userinfo, obj, scene, userInfo;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(DeviceUtil.isWXMiniGame() || DeviceUtil.isQQMiniGame() || DeviceUtil.isTTMiniGame())) return [3, 9];
                                            if (!(BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame())) return [3, 4];
                                            return [4, platform.checkIsAuthorize()];
                                        case 1:
                                            isAuthorize = _a.sent();
                                            userinfo = null;
                                            if (!isAuthorize) return [3, 3];
                                            return [4, MiniManeger.instance.initUserTemp()];
                                        case 2:
                                            userinfo = _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            if (userinfo == null) {
                                                userinfo = { nickName: '', avatarUrl: '', gender: '' };
                                            }
                                            obj = GameData.getInstance().enterGameInfo;
                                            scene = obj.query.scene == undefined ? null : obj.query.scene;
                                            PlatformDY.getOpenidAndAuthorzia({
                                                code: res_1, nickName: userinfo.nickName, avatarUrl: userinfo.avatarUrl, gender: userinfo.gender, scene: decodeURIComponent(scene)
                                            }).then(function (dyUser) {
                                                GameData.getInstance().userInfo.openId = dyUser.openid;
                                                var strOpenIdOther = GameData.getInstance().enterGameInfo.query["openid"];
                                                console.log("strOpenIdOther = ", strOpenIdOther);
                                                if (strOpenIdOther && strOpenIdOther != "") {
                                                    InviteManager.getInstance().judgeInvite();
                                                    console.log("createUserInfoButton 用户信息 : ", GameData.getInstance().userInfo);
                                                }
                                                if (BaseConst.infos.gameInfo.isDY) {
                                                    PlatformDY.getGameList().then(function () {
                                                        GameData.getInstance().weCatMiniIconsInfo = [];
                                                        var nLen = PlatformDY.gameListInfos.length;
                                                        for (var i = 0; i < nLen; ++i) {
                                                            var stData = new MoreGameIndex();
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
                                                PlayerDataManager.getInstance().GetData();
                                            });
                                            return [3, 9];
                                        case 4:
                                            console.log("登陆信息:", res_1);
                                            GameData.getInstance().userInfo.openId = res_1.openid;
                                            GameData.getInstance().userInfo.sessionKey = res_1.session_key;
                                            console.log("用户信息 : ", GameData.getInstance().userInfo);
                                            if (!DeviceUtil.isTTMiniGame()) return [3, 6];
                                            return [4, platform.getUserInfo()];
                                        case 5:
                                            userInfo = _a.sent();
                                            console.log("getUserInfo:", userInfo);
                                            GameData.getInstance().userInfo.nick = userInfo.nickName;
                                            GameData.getInstance().userInfo.avatarUrl = userInfo.avatarUrl;
                                            console.log("授权用户信息 : ", GameData.getInstance().userInfo);
                                            return [3, 8];
                                        case 6: return [4, MiniManeger.instance.initUserTemp()];
                                        case 7:
                                            _a.sent();
                                            _a.label = 8;
                                        case 8:
                                            PlayerDataManager.getInstance().GetData();
                                            _a.label = 9;
                                        case 9: return [2];
                                    }
                                });
                            }); };
                            if (!DeviceUtil.isTTMiniGame()) return [3, 2];
                            return [4, platform.login()];
                        case 1:
                            res_2 = _a.sent();
                            if (res_2) {
                                res_2 = JSON.parse(res_2);
                                console.log("登陆信息:", res_2);
                                GameData.getInstance().userInfo.openId = res_2.openid;
                                GameData.getInstance().userInfo.sessionKey = res_2.session_key;
                                console.log("用户信息 : ", GameData.getInstance().userInfo);
                            }
                            PlayerDataManager.getInstance().GetData();
                            return [3, 7];
                        case 2:
                            if (!(BaseConst.infos.gameInfo.isDY && DeviceUtil.isWXMiniGame())) return [3, 4];
                            return [4, platform.DYlogin()];
                        case 3:
                            res_1 = _a.sent();
                            return [3, 6];
                        case 4: return [4, platform.login()];
                        case 5:
                            res_1 = _a.sent();
                            res_1 = JSON.parse(res_1);
                            _a.label = 6;
                        case 6:
                            enter();
                            _a.label = 7;
                        case 7: return [3, 9];
                        case 8:
                            GameData.getInstance().userInfo.openId = GameData.getInstance().userInfo.sessionKey = DeviceUtil.getDeviceNo();
                            PlayerDataManager.getInstance().GetData();
                            _a.label = 9;
                        case 9: return [2];
                    }
                });
            });
        };
        Main.prototype.loadRes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resUrl, loadresUrl, group, nLevelGroup, self;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.platformLogin()];
                        case 1:
                            _a.sent();
                            console.log("loadRes---");
                            console.log("加载预加载资源--");
                            resUrl = "";
                            if (DeviceUtil.isQQMiniGame()) {
                                Laya.loader.create("configs/gameQQInfo.json" + GameData.getInstance().randomTime, Laya.Handler.create(this, function (infos) {
                                    GameData.getInstance().gameQQInfo = infos;
                                }), null);
                            }
                            if (!DeviceUtil.isNative()) return [3, 4];
                            return [4, ResUtil.getIntance().loadThms(resUrl + "resource/default.thm.json")];
                        case 2:
                            _a.sent();
                            return [4, ResUtil.getIntance().loadRESConfig(resUrl + "resource/default.res.json")];
                        case 3:
                            _a.sent();
                            return [3, 7];
                        case 4:
                            loadresUrl = resUrl;
                            return [4, ResUtil.getIntance().loadThms(loadresUrl + "resource/default.thm.json?v=" + Math.random())];
                        case 5:
                            _a.sent();
                            return [4, ResUtil.getIntance().loadRESConfig(loadresUrl + "resource/default.res.json?v=" + Math.random())];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            if (DeviceUtil.isWXMiniGame() && !BaseConst.infos.gameInfo.isDY) {
                                Laya.loader.load(resUrl + "configs/wxmoregame.json?v=" + Math.random(), Laya.Handler.create(this, function (res) {
                                    if (typeof (res) == "string") {
                                        res = JSON.parse(res);
                                    }
                                    for (var i = 0, len = res.iconList.length; i < len; i++) {
                                        res.iconList[i].ad_img = "https://package.32yx.com/ecy_game_small/laya/girl/wx_res/moregame/" + res.iconList[i].ad_img;
                                    }
                                    GameData.getInstance().weCatMiniIconsInfo = res.iconList;
                                }));
                            }
                            else if (DeviceUtil.isTTMiniGame()) {
                                Laya.loader.load(resUrl + "configs/ttmoregame.json?v=" + Math.random(), Laya.Handler.create(this, function (res) {
                                    if (typeof (res) == "string") {
                                        res = JSON.parse(res);
                                    }
                                    for (var i = 0, len = res.iconList.length; i < len; i++) {
                                        res.iconList[i].ad_img = "https://package.32yx.com/ecy_game_small/laya/girl/tt/moregame/" + res.iconList[i].ad_img;
                                    }
                                    GameData.getInstance().weCatMiniIconsInfo = res.iconList;
                                }));
                            }
                            group = ["gamehome"];
                            nLevelGroup = PlayerDataManager.getInstance().getCurLevelToChallenge();
                            if (DeviceUtil.isTTMiniGame() && BaseConst.infos.gameInfo.openPsAward == 0) {
                                nLevelGroup = nLevelGroup + 1;
                            }
                            ViewChangeManager.getInstance().rigestBufferLoadingView();
                            if (nLevelGroup == 3)
                                nLevelGroup = 2;
                            group.push(nLevelGroup.toString());
                            self = this;
                            ResUtil.getIntance().fastLoadGroups(group, function () {
                                ViewChangeManager.getInstance().showBufferLoadingView();
                                ConfigManager.getInstance().initConfigInfo().then(function () {
                                    if (PlayerDataManager.getInstance().bPlayerLoadFinish || !BaseConst.infos.gameInfo.isDY) {
                                        _this.funcAfterLodRed();
                                    }
                                    else {
                                        PlayerDataManager.getInstance().bResLoadFinish = true;
                                        EventMgr.getInstance().addEvent(GameEvent.HAS_GET_PLAYER_DATA, _this, _this.funcAfterLodRed);
                                    }
                                });
                                SoundManager.getInstance().isEnterView = true;
                                self.onPlayMusic();
                            }, function (cur, total) {
                                self.loadingView.progress(cur, total);
                            });
                            return [2];
                    }
                });
            });
        };
        Main.prototype.onPlayMusic = function () {
            SoundManager.getInstance().bgm = 'bg';
        };
        Main.prototype.funcAfterLodRed = function () {
            console.log("配置加载完成---");
            PlayerDataManager.getInstance().initGoods();
            PlayerDataManager.getInstance().refreshOffLinePS();
            if (!PlayerDataManager.getInstance().bIsNewPlayer) {
                GameStateManager.getInstance().levelState = EnterGameType.enum_EnterGameType_GameHome;
            }
            else {
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
        };
        return Main;
    }(BaseContent));
    new Main();

}());
