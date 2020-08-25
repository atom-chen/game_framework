import { PopBaseScene } from "./PopBaseScene";
import { PopManager } from "./PopManager";

/**
 * 连续弹窗界面
 */
export class PopLastScene extends PopBaseScene {
    className_key = "PopScene";
    public removeSelf() {
        let node = super.removeSelf();
        PopManager.instance.isPoping = false;
        PopManager.instance.showPopView();
        return node;
    }
}