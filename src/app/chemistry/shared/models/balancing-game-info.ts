import { GameInfo } from '@shared/models/game-info';
import { Ecuation } from './ecuation';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';

export class BalancingGameInfo extends GameInfo{

    ecuation: Ecuation;
    ecuationList: string[] = [];
    textOnly = false;

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