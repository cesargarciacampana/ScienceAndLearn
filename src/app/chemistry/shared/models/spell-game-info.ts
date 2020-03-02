import { Word } from './word';
import { GameInfo } from '@shared/models/game-info';

export enum Difficulty{
    Easy = 0,
    Normal = 1
}

export class SpellGameInfo extends GameInfo{

    difficulty = Difficulty.Easy;
    words: Word[] = [];

    constructor(){
        super();
    }

    statistics(clue: boolean) : number{
        let result = 0;
        for(let i = 0; i < this.words.length; i++){
            let word = this.words[i];
            for(let j = 0; j < word.parts.length; j++){
                let part = word.parts[j];
                if (part.element && part.isFromClue == clue)
                    result++;
            }
        }
        return result;
    }

    toJson(){
        let temp = {points: this.points, difficulty: this.difficulty, words: []};

        for (let i = 0; i < this.words.length; i++){
            let temp2 = [];
            for (let j = 0; j < this.words[i].parts.length;  j++){
                let part = this.words[i].parts[j];
                temp2.push({
                    s: part.isElement ? part.element.symbol : part.plainSymbol, 
                    e: part.isElement ? 1 : 0, 
                    c: part.isFromClue ? 1 : 0
                });
            }
            temp.words.push({
                word: this.words[i].original,
                parts: temp2
            });
        }

        return JSON.stringify(temp);
    }
}