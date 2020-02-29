import { GameInfo } from '@shared/models/game-info';
import { Card } from './card';

export class PairGameInfo extends GameInfo{
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
        let temp = {nRows: this.nRows, nCols: this.nCols, seconds: this.seconds, moves: this.moves};

        return JSON.stringify(temp);
    }
}