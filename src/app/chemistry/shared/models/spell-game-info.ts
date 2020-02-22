import { Word } from './word';

export class SpellGameInfo{

    started = false;
    finished = false;
    points = 0;
    seconds = 0;
    words: Word[] = [];

    constructor(){}

    statistics(clue: boolean) : number{
        let result = 0;
        for(let i = 0; i < this.words.length; i++){
            for(let j = 0; j < this.words.length; j++){
                let part = this.words[i].parts[j];
                if (part.element && part.isFromClue == clue)
                    result++;
            }
        }
        return result;
    }
}