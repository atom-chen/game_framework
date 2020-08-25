//import TipsManager from "../../manager/TipsManager";
//import Utils from "../utils/Utils";

/**
 * http 管理网络工具
 */
export class HttpMgr {
    private static instance_: HttpMgr;
    public static getInstance(): HttpMgr {
        if (!HttpMgr.instance_) {
            HttpMgr.instance_ = new HttpMgr();
        }
        return HttpMgr.instance_;
    }
    constructor() {
    }

    /**
     * 是否打印日志
     */
    public printLog: boolean = true;

    /**
     * 默认超时限制
     */
    public defaultTimeOut: number = 5000;

    /**
     * 发送消息 JSON 字符串通讯
     * 
     * @param url 请求链接 url
     * @param data 请求数据 默认空
     * @param secces 成功返回 回调
     * @param fail 失败返回 回调
     * @param type 请求类型 默认post
     * @param responseType 返回值类型 默认 text
     */
    public sendHttpTemp(url: string, data: any = null,
        secces: Function = null, fail: Function = null,
        type: string = "post", responseType: string = "text"): void {
        console.log("url ->", url);
        let jsonStr: string = data ? JSON.stringify(data) : "null";
        if (this.printLog) {
            let date: Date = new Date();
            console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
        }

        let httpRequest: Laya.HttpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);//对象池处理
        httpRequest.http.timeout = this.defaultTimeOut;
        httpRequest.http.ontimeout = function () {
            console.log('ontimeout');
            ///////////////处理超时的情况  注意移除相关监听
            if (fail) {
                fail(null);
                TipsManager.getInstance().showDefaultTips("网络请求超时！");
            }
            httpRequest.http.ontimeout = null;
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        }
        httpRequest.once(Laya.Event.COMPLETE, this, (rev: any) => {
            // if (this.printLog) {
            //     let date: Date = new Date();
            //     console.log("HTTP Rev :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    rev data: " + rev);
            // }
            if (secces) {
                // rev = rev >> 1;
                //secces(JSON.parse(rev));
                secces(rev);
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });

        httpRequest.once(Laya.Event.ERROR, this, (e: any) => {
            if (this.printLog) {
                let date: Date = new Date();
                console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
            }
            if (fail) {
                fail(e);
                //TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });
        httpRequest.send(url, data ? jsonStr : null, type, "text");
    }

    /**
     * 发送消息 JSON 字符串通讯
     * 
     * @param url 请求链接 url
     * @param data 请求数据 默认空
     * @param secces 成功返回 回调
     * @param fail 失败返回 回调
     * @param type 请求类型 默认post
     * @param responseType 返回值类型 默认 text
     */
    public sendHttpDY(url: string, data: any = null,
        secces: Function = null, fail: Function = null,
        type: "post" | "get" = "post", responseType: string = "text"): void {
        if (type == "get" && data) {
            url += Utils.querStr(data);
        }
        console.log("url ->", url);
        let jsonStr: string = data ? JSON.stringify(data) : "null";
        if (this.printLog) {
            let date: Date = new Date();
            console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
        }

        let httpRequest: Laya.HttpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);//对象池处理
        httpRequest.http.timeout = this.defaultTimeOut;
        httpRequest.http.ontimeout = function () {
            console.log("ontimeout");
            ///////////////处理超时的情况  注意移除相关监听
            if (fail) {
                fail(null);
                TipsManager.getInstance().showDefaultTips("网络请求超时！");
            }
            httpRequest.http.ontimeout = null;
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        }
        httpRequest.once(Laya.Event.COMPLETE, this, (rev: any) => {
            // if (this.printLog) {
            //     let date: Date = new Date();
            //     console.log("HTTP Rev :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    rev data: " + rev);
            // }
            if (secces) {
                // rev = rev >> 1;
                secces(JSON.parse(rev));
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });

        httpRequest.once(Laya.Event.ERROR, this, (e: any) => {
            if (this.printLog) {
                let date: Date = new Date();
                console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
            }
            if (fail) {
                fail(e);
                TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });
        if (type == "get") {
            httpRequest.send(url);
            return
        }
        httpRequest.send(url, data ? jsonStr : null, "post", "text");
    }

    /**
     * 发送消息 JSON 字符串通讯
     * 
     * @param url 请求链接 url
     * @param data 请求数据 默认空
     * @param secces 成功返回 回调
     * @param fail 失败返回 回调
     * @param type 请求类型 默认post
     */
    public sendPostHttp(url: string, data: any = null,
        secces: Function = null, fail: Function = null,
        type: string = "post", showParse = true): void {
        console.log("url ->", url);
        let param;
        if (showParse) {
            param = this.getEncodeParam(data);
        }
        param = data;
        let httpRequest: Laya.HttpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);//对象池处理
        httpRequest.http.timeout = this.defaultTimeOut;
        httpRequest.http.ontimeout = function () {
            console.log('ontimeout');
            ///////////////处理超时的情况  注意移除相关监听
            if (fail) {
                fail(null);
                TipsManager.getInstance().showDefaultTips("网络请求超时！");
            }
            httpRequest.http.ontimeout = null;
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        }
        httpRequest.once(Laya.Event.COMPLETE, this, (rev: any) => {
            // if (this.printLog) {
            //     let date: Date = new Date();
            //     console.log("HTTP Rev :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    rev data: " + rev);
            // }
            if (secces) {
                // rev = rev >> 1;
                /*   if (rev instanceof String) {
                      rev = JSON.parse(rev);
                  } */
                secces(rev);
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });

        httpRequest.once(Laya.Event.ERROR, this, (e: any) => {
            if (this.printLog) {
                let date: Date = new Date();
                console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
            }
            if (fail) {
                fail(e);
                TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });
        httpRequest.send(url, param, type, "json");
    }


    public sendGetHttp(url: string, data: any = null,
        secces: Function = null, fail: Function = null,
        type: string = "get", responseType: string = "json"): void {
        console.log("url ->", url);
        let jsonStr: string = data ? JSON.stringify(data) : "null";
        let param = '';
        param = this.getEncodeParam(data);
        if (this.printLog) {
            let date: Date = new Date();
            console.log("HTTP Send :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    send data: " + jsonStr);
        }


        let httpRequest: Laya.HttpRequest = Laya.Pool.getItemByClass("HttpRequest", Laya.HttpRequest);//对象池处理
        httpRequest.http.timeout = this.defaultTimeOut;
        let httpRequests = httpRequest.http as XMLHttpRequest;
        // httpRequests.open(url + "?" + param, 'get')
        httpRequests.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.http.ontimeout = function () {
            console.log('ontimeout');
            ///////////////处理超时的情况  注意移除相关监听
            if (fail) {
                fail(null);
                TipsManager.getInstance().showDefaultTips("网络请求超时！");
            }
            httpRequest.http.ontimeout = null;
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        }
        httpRequest.once(Laya.Event.COMPLETE, this, (rev: any) => {
            // if (this.printLog) {
            //     let date: Date = new Date();
            //     console.log("HTTP Rev :[" + date.toTimeString() + " time:" + date.getTime() + "]  \n    rev data: " + rev);
            // }
            if (secces) {
                // rev = rev >> 1;
                secces(JSON.parse(rev));
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });

        httpRequest.once(Laya.Event.ERROR, this, (e: any) => {
            if (this.printLog) {
                let date: Date = new Date();
                console.log("HTTP Error :[" + date.toTimeString() + " time:" + date.getTime() + "]");
            }
            if (fail) {
                fail(e);
                TipsManager.getInstance().showDefaultTips("你的网络已断开，请检查设置。");
            }
            Laya.Pool.recover("HttpRequest", httpRequest);//对象池处理
        });
        httpRequest.send(url + param, param, type, "text");
    }

    public getEncodeParam(data): any {
        let param = ''
        if (data) {
            if (data instanceof String) {
                return data;
            }
            let arr = [];
            for (var obj in data) {
                arr.push(obj + '=' + data[obj]);
            }
            param = arr.join('&')
        }
        return param;
    }
}