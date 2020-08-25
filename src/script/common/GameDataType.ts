export module localData {

    export class InviteData {
        id: number;
        head: string;
        /** 奖励 */
        reward: number;
        /**是否已领取 */
        lingqued: boolean;
        /**能否领取 */
        canLingqu: boolean;
    }
}

export module netData {

    /**
     * 用户信息结构体
     */
    export class UserInfos {
        openId: string = "";
        /** 昵称 */
        nick: string = "";
        /** 头像地址 */
        avatarUrl: string = "";
        /** 性别 */
        sex: number = 0;
        sessionKey: string = "";
        accessToken: string = "";
    }

    /**
     * 玩家数据
     */
    export class PlayerData {
        /** 上次登录时间 */
        public lastTime: number = null;
        /** 金币 默认2000 */
        public gold: number = 2000;
        /** 零食 默认0 */
        public snacks: number = 0;
        /**
         * 转盘相关数据
         * 小鱼 默认0
         * 看视频获得小鱼次数 每日5次
         * 每日赠送5次机会
         */
        public lottery: { fish: number, fishVideo: number } = { fish: 0, fishVideo: 1 };
        /** 当前最大合成等级 默认1 */
        public curMaxCompLv: number = 1;
    }

    /** 邀请奖励相关 */
    export class Invite {
        /** 已经领取过邀请奖励的id数组 */
        public inviteId: number[] = [];
        // /** 当前已领取邀请奖励轮次 */
        // public count: number = 0;
        // /** 是否领取过一轮邀请完成大奖 */
        // public lingqued: boolean = false;
    }

    /**
	 * 邀请人信息
	 */
    export class Inviter {
        public nick: string;
        public openId: string;
    }
}