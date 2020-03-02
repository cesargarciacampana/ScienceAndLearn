import { GameInfo } from '@shared/models/game-info';
import { Card } from './card';

export enum Difficulty{
    Easy = 0,
    Normal = 1,
    Hard = 2
}

export class PairGameInfo extends GameInfo{

    level: Difficulty;
    nRows: number;
    nCols: number;
    moves = 0;

    rows: Card[][];
    pending: Card = null;

    constructor(nRows: number, nCols: number){
        super();
        this.nRows = nRows;
        this.nCols = nCols;
    }

    toJson(){
        let temp = {nRows: this.nRows, nCols: this.nCols, moves: this.moves};

        return JSON.stringify(temp);
    }
}