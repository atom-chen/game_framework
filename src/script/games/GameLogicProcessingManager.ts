export default class GameLogicProcessingManager  {
   //单例
   private static instance: GameLogicProcessingManager;
   public static getInstance(): GameLogicProcessingManager {
       if (!this.instance) {
           this.instance = new GameLogicProcessingManager();
       }
       return this.instance;
   }

   //是否开启了体力回复倒计时
   private bPSRecoveryOpen:boolean;
    
    constructor() { 

    }
     //获取当前时间
     public static GetCurTime(): number {
        return Laya.Browser.now();
    }

    public get PSRecoveryOpen(){
        return this.bPSRecoveryOpen;
    }

    public set PSRecoveryOpen(b:boolean){
        this.bPSRecoveryOpen = b;
    }
   
}