import { GameInfo } from '@shared/models/game-info';
import { Ecuation } from './ecuation';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';

export enum Difficulty{
    Easy = 0,
    Normal = 1,
    Hard = 2
}

export class BalancingGameInfo extends GameInfo{

    ecuation: Ecuation;
    ecuationList: string[] = [];
    textOnly = false;
    difficulty = Difficulty.Easy;

    constructor(){
        super();
    }

    calculateLastEcuation(ecuationHelper: EcuationHelper){
        if (this.ecuationList.length > 0)
            this.ecuation = ecuationHelper.parseEcuation(this.ecuationList[this.ecuationList.length - 1]);
    }

    toJson(){
        let temp = {};

        return JSON.stringify(temp);
    }
}