
/**
 * 动画管理单列
 */
export default class AnimationManager {
    private constructor() {

    }

    private static ins: AnimationManager;
    public static get instance(): AnimationManager {
        if (AnimationManager.ins == null) {
            AnimationManager.ins = new AnimationManager();
        }
        return AnimationManager.ins;
    }


    /**
     * 获取图集动画对象
     * 
     * @param url 
     */
    public getAtlasAnimation(url: string, fex: string): Promise<Laya.Animation> {
        url = url + fex;
        return new Promise<Laya.Animation>((resolve) => {
            let roleAni = new Laya.Animation();
            // 加载动画图集，加载成功后执行回调方法
            roleAni.loadAtlas(url, Laya.Handler.create(null, () => {
                resolve(roleAni);
            }));
        });
    }

    /**
     * 缩放动画(主要用于正确图标的出现)
     * @param target 目标对象
     * @param caller 执行域(this)
     * @param duration ?花费的时间，单位毫秒
     * @param complete ?结束回调函数
     * @param props ?变化的属性列表
     * @param ease ?缓动类型，默认为匀速运动
     */
    public scaleTween(target: laya.ui.UIComponent, caller: any, duration: number = 500, complete?: Function, props?: any, ease?: Function) {
        target.visible = true;
        target.scale(0.8, 0.8);
        Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, ease, Laya.Handler.create(caller, () => {
            complete && complete();
        }));
    }
    /**
     * 缩放动画(主要用于正确图标的出现)
     * @param target 目标对象
     * @param caller 执行域(this)
     * @param duration ?花费的时间，单位毫秒
     * @param complete ?结束回调函数
     * @param props ?变化的属性列表
     * @param ease ?缓动类型，默认为匀速运动
     */
    public scaleBTween(target: laya.ui.UIComponent, caller: any, duration: number = 500, complete?: Function, props?: any, ease?: Function) {
        target.scale(1.1, 1.1);
        Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, duration, ease, Laya.Handler.create(caller, () => {
            complete && complete();
        }));
    }

    /**
     * 从上到下Tween
     * @param target 目标对象
     * @param props 变化的属性列表
     * @param duration 花费的时间，单位毫秒
     * @param caller 执行域(this)
     * @param ease 缓动类型，默认为匀速运动
     * @param complete 结束回调函数
     */
    public upToDownTween(target: laya.ui.UIComponent, props: any, duration: number, caller: any, ease?: Function, complete?: Function) {
        Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(caller, () => {
            complete && complete();
        }));
    }
    /**
     * 播放龙骨动画
     * @param url 
     * @param callBack 
     * @param aniMode
     * <table>
<tr><th>模式</th><th>描述</th></tr>
<tr>
<td>0</td> <td>使用模板缓冲的数据，模板缓冲的数据，不允许修改（内存开销小，计算开销小，不支持换装）</td>
</tr>
<tr>
<td>1</td> <td>使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存	（内存开销大，计算开销小，支持换装）</td>
</tr>
<tr>
<td>2</td> <td>使用动态方式，去实时去画（内存开销小，计算开销大，支持换装,不建议使用）</td>
</tr>
</table>
		
     */
    public showSkeletonAnimation(url: string, callBack?: Function, aniMode?: number): void {
        // let self = this;
        console.log(url);
        let boomAnimation = new Laya.Skeleton();
        boomAnimation.load(url, Laya.Handler.create(this, (): void => {
            if (boomAnimation.player == null) {
                callBack && callBack(null);
                return
            }
            boomAnimation.player.playbackRate = 1;
            callBack && callBack(boomAnimation);
        }), aniMode);
    }

    /**
         * 显示2d 骨骼动画
         * @param url	动画文件路径
         * @param dbBox	动画容器
         * @param index	动画索引
         * @param loop	是否循环播放
         * @param rate	播放速率
         */
    private show2dBoonAnimation(url: string, dbBox: Laya.Box, index: number, loop: boolean, rate: number, x: number, y: number, rotation: number) {
        return new Promise(resolve => {
            let self = this;
            dbBox.removeChildren();
            let boomAnimation = new Laya.Skeleton();
            boomAnimation.load(url, Laya.Handler.create(self, () => {
                if (!boomAnimation.player) {
                    resolve();
                    return;
                }
                boomAnimation.player.playbackRate = rate;
                //当skeleton.play(0,true) 第二个参数为true时，每播放完一遍龙骨动画，会自动触发Event.COMPLET事件
                //当skeleton.play(0,false) 第二个参数为false时，当前动画播放完成后，会自动触发Event.STOPED事件，而不是Event.COMPLETE事件
                boomAnimation.player.once(Laya.Event.STOPPED, self, () => {
                    // self.box_db.removeChild(boomAnimation);
                    resolve();
                });
                boomAnimation.scale(2, 2);
                dbBox.addChild(boomAnimation);
                boomAnimation.x = x; boomAnimation.y = y;
                boomAnimation.rotation = rotation;
                boomAnimation.play(index, loop);
            }));
        });
    }


    /**
     * 显示对象闪烁效果
     * @param target 目标对象
     * @param prefix 资源前缀
     * @param caller 执行域(this)
     */
    public displayTwinkle(target: Laya.Image | Laya.Button, prefix: string, caller: any) {
        let index = 1;
        Laya.timer.loop(500, caller, () => {
            target.skin = prefix + index + ".png";
            index = index == 1 ? 2 : 1;
        });
    }

    /**
     * 显示对象闪烁效果
     * @param target 目标对象
     * @param prefix 资源前缀
     * @param caller 执行域(this)
     */
    public frameAni(target: Laya.Image, prefix: string, caller: any, frameNum: number, time: number = 100) {
        let index = 1;
        Laya.timer.loop(time, caller, () => {
            target.skin = prefix + index + ".png";
            index++;
            if (index > frameNum) index = 1;
        });
    }

    /**按钮心跳动画 */
    public zoomTween(target: Laya.Sprite, caller: any) {
        let scaleDelta: number = 0;
        Laya.timer.loop(20, caller, () => {
            scaleDelta += 0.04;
            var scaleVaule: number = Math.sin(scaleDelta) * 0.1 + 1;
            target.scale(scaleVaule, scaleVaule)
        });
    }

    public zoomImgTween(target: Laya.Image, caller: any) {
        let scaleDelta: number = 0;
        Laya.timer.loop(20, caller, () => {
            scaleDelta += 0.04;
            var scaleVaule: number = Math.sin(scaleDelta) * 0.02 + 1;
            target.rotation += Math.sin(scaleDelta) * 0.02;
            target.scale(scaleVaule, scaleVaule)
        });
    }

    public titleImgTween(target: Laya.Image, caller: any) {
        let scaleDelta: number = 0;
        Laya.timer.loop(20, caller, () => {
            scaleDelta += 0.04;
            target.rotation += Math.sin(scaleDelta) * 0.2;
        });
    }

    /**横向移动 */
    public VTween(target: Laya.Image, caller: any, ds = 1) {
        let xDelta: number = 0;
        Laya.timer.loop(20, caller, () => {
            xDelta += 0.04;
            var xVaule: number = Math.sin(xDelta) * ds;
            target.x += xVaule;
        });
    }

    /**闪烁动画 */
    public flaTween(target: Laya.Image, caller: any) {
        let alp: number = 0;
        Laya.timer.loop(20, caller, () => {
            alp += 0.04;
            var alpVaule: number = Math.abs(Math.sin(alp) * 0.5) + 0.5;
            target.alpha = alpVaule;
        });
    }

    /**角色头部动画 */
    public swingHeadTween(target: Laya.Image, caller: any) {
        let scaleDelta: number = 0;
        let posY = target.y;
        Laya.timer.loop(20, caller, () => {
            scaleDelta += 0.04;
            var scaleVaule: number = Math.sin(scaleDelta) * 6;
            target.y = scaleVaule + posY;
        });
    }




    /**下落动画 */
    public fallAni(target: Laya.Image, caller: any, duration: number) {
        let disY = 1920 - target.y;
        let time = (duration / 20) + 1;
        let vX = Math.random() * 10 - 5;
        let vY = -Math.random() * 30;
        let aY = (disY - vY * time) * 2 / (time * time);
        let x = target.x;
        let y = target.y;
        let t = 0;
        let r = 360 / time;
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
    }

    /**上升动画 */
    public riseAni(target: Laya.Image, caller: any, duration: number) {
        let vY = -Math.random() * 2;
        let t = 0;
        let scaleDelta: number = 0;
        Laya.timer.loop(20, caller, function onLoop() {
            target.y += vY;
            t += 20;
            scaleDelta += 0.04;
            var scaleVaule: number = Math.sin(scaleDelta) * 0.5 + 0.1;
            target.scale(scaleVaule, scaleVaule)
            if (t > duration) {
                Laya.timer.clear(caller, onLoop);
                target.destroy();
            }
        });
    }

    /**飞金币的动画 */
    public flayGlod(xSrc: number, ySrc: number, xObj: number, yObj: number) {
        let iTeme = 30;
        let nCount = 10;
        let goldArr = [];
        //let stPoint = new Laya.Point();
        // stPoint.x = this.imageGoodsTypeUp.x;
        // stPoint.y = this.imageGoodsTypeUp.y;
        // let stBoxParent = this.imageGoodsTypeUp.parent as Laya.Box;
        // stPoint = stBoxParent.localToGlobal(stPoint);
        for (let i = 0; i < nCount; i++) {
            let goldImg = Laya.Pool.getItem("goods") as Laya.Image;
            if (!goldImg) goldImg = new Laya.Image();
            goldImg.skin = "resource/assets/img/common/maininterface_icon_6.png";
            Laya.stage.addChild(goldImg);
            goldImg.x = xSrc;
            goldImg.y = ySrc;
            goldArr.push(goldImg);
            // Laya.timer.once(iTeme, this, () => {
            //     Laya.Tween.to(goldImg, { x: 341, y: 32 }, 500, null, Laya.Handler.create(this, () => {
            //         Laya.stage.removeChild(goldImg);
            //         Laya.Pool.recover("goods", goldImg);
            //     }))
            // });
        }
        for (let i = 0; i < goldArr.length; i++) {
            Laya.timer.once(i * iTeme, this, () => {
                // SoundManager.instance.playSound(sound);
                Laya.Tween.to(goldArr[i], { x: xObj, y: yObj }, 200, null, Laya.Handler.create(this, () => {
                    Laya.stage.removeChild(goldArr[i]);
                    Laya.Pool.recover("goods", goldArr[i]);
                    // if (i == goldArr.length - 1) {
                    //     GameManager.instance.updateBaseData(temp, count);
                    // }
                }))
            });
        }
    }
}