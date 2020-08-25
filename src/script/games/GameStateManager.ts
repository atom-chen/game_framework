import { EnterGameType } from "./CommonDefine";

export default class GameStateManager  {
    
    private static instance: GameStateManager;
    public static getInstance(): GameStateManager {
        if (!this.instance) {
            this.instance = new GameStateManager();
        }
        return this.instance;
    }

    constructor() { 
        this.nLevelState = EnterGameType.enum_EnterGameType_GameHome;
    }

    /**当前进入关卡的方式 */
    private  nLevelState:number;

    public  get levelState(){
        return this.nLevelState;
    }

    public set levelState(nState:EnterGameType){
        this.nLevelState = nState;
    }
}