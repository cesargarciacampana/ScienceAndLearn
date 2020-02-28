import { WordPart } from './word-part';

export class Word{
    original: string;
    parts : WordPart[] = [];

    constructor(original: string){
        this.original = original;
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
        let copy = new Word(this.original);
        copy.parts = Array.from(this.parts);
        return copy;
    }
}