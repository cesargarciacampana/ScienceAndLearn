import { GameInfo } from '@shared/models/game-info';

export class CalculationGameInfo extends GameInfo{
    level: number;
  
    numSuccess: number;
    numFails: number;
    formula: string[] = [];

    constructor(){
        super();
    }

    toJson(){
        let temp = { 
            points: this.points,
            level: this.level,
            numSuccess: this.numSuccess,
            numFails: this.numFails,
            formula: this.formula
        };
        return JSON.stringify(temp);
    }
}