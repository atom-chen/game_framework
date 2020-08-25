import AnimationManager from "../manager/AnimationManager";
import { MiniManeger } from "../minigame/MiniManeger";

/**
 * GamePreLoadingView
 */
export default class GamePreLoadingView extends BaseSceneUISkin implements ILoadingView {
    public className_key = "GamePreLoadingView";
    /** 背景图 */
    private img_bg: Laya.Image;
    /** 进度条底板 */
    private img_jdt_db: Laya.Image;
    /** 进度条 */
    private img_jdt: Laya.Image;
    /** 标题 */
    private img_head: Laya.Image;
    /** Loading字样 */
    private img_load: Laya.Image;
    /**用于装动画的盒子*/
    private aniBox: Laya.Box;

    constructor() {
        super();
        //背景
        this.img_bg = new Laya.Image();
        this.img_bg.skin = "resource/assets/preloading/loading_bg.jpg";
        this.img_bg.width = Laya.stage.width;
        this.img_bg.height = Laya.stage.height;
        this.img_bg.x = 0;
        this.img_bg.y = 0;
        //DeviceUtil.adaptationBgImg(this.img_bg);
        this.addChild(this.img_bg);
        //标题
        this.img_head = new Laya.Image();
        if (DeviceUtil.isWXMiniGame()) {
            this.img_head.skin = "resource/assets/preloading/loading_logo_3.png";
        } else if (DeviceUtil.isTTMiniGame()) {
            this.img_head.skin = "resource/assets/preloading/loading_logo_4.png";
        } else {
            if(MiniManeger.instance.isAiQiYi()){
                this.img_head.skin = "resource/assets/preloading/loading_logo_x.png";
            }else{
                this.img_head.skin = "resource/assets/preloading/loading_logo.png";
            }
           
        }
        this.img_head.top = 300;
        this.img_head.centerX = 0;
        this.addChild(this.img_head);
        //进度条背景
        this.img_jdt_db = new Laya.Image();
        this.img_jdt_db.skin = "resource/assets/preloading/loading_baseboard_1.png";
        this.img_jdt_db.sizeGrid = "10,10,10,10";
        this.img_jdt_db.width = 706;
        this.img_jdt_db.height = 50;
        this.img_jdt_db.bottom = 400;
        this.img_jdt_db.centerX = 0;
        this.addChild(this.img_jdt_db);
        //进度条的值
        this.img_jdt = new Laya.Image();
        this.img_jdt.skin = "resource/assets/preloading/loading_baseboard_2.png";
        this.img_jdt.sizeGrid = "10,10,10,10";
        this.img_jdt.width = 691;
        this.img_jdt.height = 36;
        this.img_jdt.x = 8;
        this.img_jdt.centerY = 0;
        this.img_jdt_db.addChild(this.img_jdt);
        //下面的文字
        this.img_load = new Laya.Image();
        this.img_load.skin = "resource/assets/preloading/loading_word.png";
        this.img_load.bottom = 300;
        this.img_load.centerX = 0;
        this.addChild(this.img_load);

        //一个动画
        this.aniBox = new Laya.Box();
        this.aniBox.width = 500;
        this.aniBox.height = 700;
        this.aniBox.x = Laya.stage.width / 2;
        this.aniBox.y = Laya.stage.height / 2;
        this.addChild(this.aniBox);
        //创建动画
        this.createSkeleton("resource/assets/preloading/loading.sk").then((skeAni) => {
            this.loadingAni = skeAni;
        });
        this.progress(1, 100);
    }

    public childrenCreated(): void {

    }

    public createSkeleton(url: string): Promise<Laya.Skeleton> {
        return new Promise<Laya.Skeleton>((resolve) => {
            AnimationManager.instance.showSkeletonAnimation(url, (skeAni: Laya.Skeleton) => {
                skeAni.player.playbackRate = 1;
                skeAni.autoSize = true;
                skeAni.scale(1, 1);
                skeAni.play(0, true);
                this.aniBox.y = Laya.stage.height / 2 + skeAni.height / 2 + 25;
                this.aniBox.addChild(skeAni)
                resolve(skeAni);
            }, 1);
        });
    }

    createChildren(): void {
        super.createChildren();
    }

    public onAwake() {
        super.onAwake();
        this.img_bg.scaleX = this.img_bg.scaleY = DeviceUtil.getScalePix();
    }

    public progress(index: number, len: number): void {
        if (this.img_jdt) {
            this.img_jdt.width = 691 * (index / len);
        }
    }

    private loadingAni: Laya.Skeleton;

    // public onRemoved(): void {
    //     console.log("gamepreloadingview on removed");
    //     if (this.loadingAni) {
    //         this.loadingAni.destroy();
    //         this.loadingAni= null;
    //     }
    //     this.destroy(true);
    // }

    public remove() {
        Laya.timer.clearAll(this);
    }
}