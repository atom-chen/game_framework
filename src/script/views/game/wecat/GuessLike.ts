import GuessLikeItem from "./GuessLikeItem";
import GuessItemData from "../GuessItemData";

/**
 * 猜你喜欢
 * 
 * 主页面一行广告位是猜你喜欢，调用位置标识为 C
 */
export default class GuessLike extends BaseSceneUISkin {
    public className_key = "GuessLike";

    /**必备组件名称及其类型 panel */
    protected panelList: Laya.Panel;
    /**必备组件名称及其类型 box */
    protected boxView: Laya.Box;
    /**更多游戏按钮 */
    protected btn_moreGame: Laya.Sprite;
    /**
     * 点击更多游戏按钮回调
     */
    public onMoreGameCall: Function;

    /**
     * 数据源
     */
    public listdata: GuessItemData[] = [];
    private subItemSkin: string;

    constructor(skin: string, subItemSkin: string, listdata_: GuessItemData[], itemW: number) {
        super();
        this.subItemSkin = subItemSkin;
        listdata_ && (this.listdata = listdata_);
        this.itemW = itemW;
        this.skin = skin;
    }

    protected childrenCreated(): void {
        this.width = 1026;
        this.height = 330;
        this.panelList.hScrollBarSkin = "";
        this.panelList.hScrollBar.touchScrollEnable = false;
        //
        this.initList();
    }

    /**
     * 初始化显示列表
     */
    private initList(): void {
        //
        for (let i = 0, len = this.listdata.length; i < len; i++) {
            let item = new GuessLikeItem(this.subItemSkin, this.listdata[i]);
            this.boxView.addChild(item);
            item.x = this.itemW * (i - 1);
        }
        this.index = -1;
        this.len = this.listdata.length;
        this.boxView.x = 0;
        //
        this.onEnable();
        this.panelList.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
    }

    public onEnable(): void {
        if (this.isCreate) {
             //2020.7.13-3
            // this.panelList.frameLoop(1, this, this.frameChange);
            this.aniPerIndex();
        }
    }
    /**
     * 添加到父节点
     */
    public onEnabled(): void {
        // console.log("onEnabled");
        // this.width = Laya.stage.width;
        // this.height = Laya.stage.height;
        this.btn_moreGame && this.btn_moreGame.on(Laya.Event.CLICK, this, this.onMoreGame);
    }

    private onMoreGame(): void {
        this.onMoreGameCall && this.onMoreGameCall();
    }

    public onDisable(): void {
        if (this.isCreate) {
            this.panelList.clearTimer(this, this.frameChange);
            this.panelList.clearTimer(this, this.aniLoop);
            this.btn_moreGame && this.btn_moreGame.off(Laya.Event.CLICK, this, this.onMoreGame);
        }
    }

    //是否点击
    private isTouch: boolean = false;
    //点击的x值
    private clickX: number;
    //开始的位置
    private starX: number;
    //标识地址
    private index: number = 0;
    //显示个数
    private len: number = 0;
    //宽度
    /**
     * 间距
     */
    public itemW: number;

    /**
     * 按下时候
     * @param evt 
     */
    private mouseDown(evt: Laya.Event): void {
        this.isTouch = true;
        this.clickX = evt.stageX;
        this.starX = this.boxView.x;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseOutUp);
    }

    /**
     * 每帧 走一次移动
     */
    //2020.7.13-3
    private nNum: number = 0;
    private frameChange(): void {
        let self = this;
        if (!self.isTouch) {
            self.boxView.x -= 1;
            //2020.7.13-3
            this.nNum += 1;
            if (this.nNum == self.itemW) {
                this.panelList.clearTimer(this, this.frameChange);
                this.nNum = 0;
            }
        }
        let curX: number = self.boxView.x;
        // console.log(curX, "  ", this.index);
        // if (!self.isTouch) {
        //     if (curX < (self.index + 1) * self.itemW) {
        //         self.index--;
        //         let last = (self.boxView.getChildAt(self.boxView.numChildren - 1) as GuessLikeItem);
        //         let first = self.boxView.removeChildAt(0) as GuessLikeItem;
        //         first.x = last.x + self.itemW;
        //         self.boxView.addChild(first);
        //         first.exposure();
        //     }
        //     return
        // }

        //滑动暂时不算曝光
        if (curX > (self.index + 1) * self.itemW) {
            self.index++;
            let last = self.boxView.removeChildAt(self.boxView.numChildren - 1) as GuessLikeItem;
            let first = (self.boxView.getChildAt(0) as GuessLikeItem);
            last.x = first.x - self.itemW;
            self.boxView.addChildAt(last, 0);
            last.exposure();

            return
        }

        if (curX < (self.index - 1) * self.itemW) {
            self.index--;
            let last = (self.boxView.getChildAt(self.boxView.numChildren - 1) as GuessLikeItem);
            let first = self.boxView.removeChildAt(0) as GuessLikeItem;
            first.x = last.x + self.itemW;
            self.boxView.addChild(first);
            first.exposure();
            return
        }

    }

    /**
     * 移动时候
     * @param evt 
     */
    private mouseMove(evt: Laya.Event): void {
        this.boxView.x = this.starX + (evt.stageX - this.clickX);
    }

    /**
     * 弹起时候
     */
    private mouseOutUp(): void {
        this.isTouch = false;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseOutUp);
    }

    //2020.7.13-3
    private aniPerIndex() {
        this.panelList.frameLoop(400, this, this.aniLoop);
    }
    //2020.7.13-3
    private aniLoop() {
        this.panelList.clearTimer(this, this.frameChange);
        this.panelList.frameLoop(1, this, this.frameChange);
    }

}
