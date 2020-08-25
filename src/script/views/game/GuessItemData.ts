/**
 * 猜你喜欢数据体item
 */
export default class GuessItemData {
    /**  广告id */
    ad_id: number;
    /**  广告名称 */
    ad_name: string;
    /** 广告图片 */
    ad_img: string;
    /** 小程序路径 */
    ad_path: string;
    /** 小程序APPID */
    ad_appid: string;
    /** 游戏人数 */
    ad_count: number;
    /** 广告二维码，如果appid不在10个白名单内，或者ad_path为空则显示二维码 */
    ad_qrimg: string;
    /** 对应展示的设备 {0全部设备，1Android设备，2iOS设备} */
    ad_device: number;
    /** 小红点 {1为显示小红点,0不显示} */
    ad_dot: number;
}