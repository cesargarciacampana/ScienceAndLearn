import { WordPart } from './word-part';

export class Word{
    parts : WordPart[] = [];

    constructor(){
    }

    get isCompleteSolution(){
        if (this.parts.length == 0)
            return false;

        for(let i=0; i < this.parts.length; i++)
            if (!this.parts[i].isElement && this.parts[i].plainSymbol != ' ')
                return false;

        return true;
    }

    clone() : Word {
        let copy = new Word();
        copy.parts = Array.from(this.parts);
        return copy;
    }
}