export default class GameEvent {
    /**体力值变更了*/
    public static ON_PS_CHANGE: string = "ON_PS_CHANGE";

    /**金币值变更了 */
    public static ON_GLOD_CHANGE: string = "ON_GLOD_CHANGE";

    /**体力倒计时更新的事件 */
    public static ON_SP_UPDOWN_TIME = "ON_SP_UPDOWN_TIME";

    /** 刷新邀请奖励列表 */
    public static REFRESH_INVITE: string = "REFRESH_INVITE";
    
    /**飞金币的事件 */
    public static EVENT_FLAY_GLOD:string = "EVENT_FLAY_GLOD";

    /**切换录制的图片 */
    public static CHANGE_VIDEO_IMAGE:string = "CHANGE_VIDEO_IMAGE";

    /**数据变更事件 */
    public static HAS_GET_PLAYER_DATA:string = "HAS_GET_PLAYER_DATA";

    /**进入无限体力状态 */
    public  static PS_LIMITLESS:string = "PS_LIMITLISS";
}
window['GameEvent'] = GameEvent;