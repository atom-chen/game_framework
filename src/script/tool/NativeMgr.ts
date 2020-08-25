import NativeBrige, { NativeMsg } from "./NativeBrige";
import ViewChangeManager from "../games/ViewChangeManager";

export default class NativeMgr {
    static instance: NativeMgr;

    constructor() { }

    static getInstance(): NativeMgr {
        if (!NativeMgr.instance) {
            NativeMgr.instance = new NativeMgr();
        }
        return NativeMgr.instance;
    }

    /**
     * 显示广告
     */
    public showAdView(): void {
        let msgJSon = {
            msg: NativeMsg.ShowAdView,
            data: "show"
        };
        NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
    }

    /**
     * 插屏广告关闭回调
     */
    public interstitialAdCloseCall: Function;

    /**
     * 插屏广告关闭回调
     */
    public interstitialAdCloseCallFunc(): void {
        this.interstitialAdCloseCall && this.interstitialAdCloseCall();
        this.interstitialAdCloseCall = null;
        ViewChangeManager.getInstance().hideBufferLoadingView();
        console.log("插屏广告关闭回调--");
    }

    /**
     * create插屏广告
     */
    public createInterstitialAd(): void {
        ViewChangeManager.getInstance().showBufferLoadingView();
        let msgJSon = {
            msg: NativeMsg.ShowInterstitialAd,
            data: "create"
        };
        NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
    }

    /**
     * 显示插屏广告
     */
    public showInterstitialAd(closeCall: Function = null): void {
        ViewChangeManager.getInstance().showBufferLoadingView();
        let msgJSon = {
            msg: NativeMsg.ShowInterstitialAd,
            data: "show"
        };
        NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
        //
        this.interstitialAdCloseCall = closeCall;
    }

    /**
     * 视频广告关闭回调
     */
    private videoAdCloseCall: Function;

    /**
     * 视频广告关闭回调
     */
    public videoAdCloseCallFunc(): void {
        this.videoAdCloseCall && this.videoAdCloseCall();
        this.videoAdCloseCall = null;
        ViewChangeManager.getInstance().hideBufferLoadingView();
        console.log("视频广告关闭回调--");
    }

    /**
     * 视频广告加载错误回调
     */
    private videoAdErrorCall: Function;

    /**
     * 视频广告加载错误回调
     */
    public videoAdErrorCallFunc(): void {
        this.videoAdErrorCall && this.videoAdErrorCall();
        this.videoAdErrorCall = null;
        ViewChangeManager.getInstance().hideBufferLoadingView();
        console.log("视频广告加载错误回调--");
    }

    /**
     * 显示视频广告
     */
    public showVideoAd(closeCall: Function = null, errorCall: Function = null): void {
        ViewChangeManager.getInstance().showBufferLoadingView();
        let msgJSon = {
            msg: NativeMsg.ShowAdVideo,
            data: "show"
        };
        NativeBrige.getInstance().sendToNative(JSON.stringify(msgJSon));
        //
        this.videoAdCloseCall = closeCall;
        this.videoAdErrorCall = errorCall;
    }
}