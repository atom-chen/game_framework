import SoundManager from "./script/common/SoundManager";

export default class PlatfprmAiQiYi {

    //书籍ID
    public static nBookID: number = 9002; //王女bookID
    public static strUrl: string = "https://manhua.iqiyi.com/ulink/comic";
    public static isOpen: boolean = false;  //是否开启爱奇艺的包

    constructor() {

    }

    /**爱奇艺分享 */
    public static shareAiQiYi(title: string, summary: string, icon: string) {
        let platformArry = [1];
        console.log("title = ", title, "summary = ", summary, "icon = ", icon,"version=","3_0_5");
        window["share"](9002, title, summary, icon, PlatfprmAiQiYi.strUrl, platformArry);
    }

    /**处理消息 */
    public static processAppMsg(event: string, json: string) {
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
    }
}