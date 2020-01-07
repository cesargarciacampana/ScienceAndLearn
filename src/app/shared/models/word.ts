import { WordPart } from './word.part';

export class Word{
    parts : WordPart[] = [];

    constructor(){
    }

    clone() : Word {
        let copy = new Word();
        copy.parts = Array.from(this.parts);
        return copy;
    }
}