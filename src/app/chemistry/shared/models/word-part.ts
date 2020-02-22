import { ElementDTO } from '../dtos/element.dto';

export class WordPart{
    element : ElementDTO;
    plainSymbol : String;
    isFromClue : boolean;

    constructor(element? : ElementDTO, plainSymbol? : String, isFromClue = false){
        this.element = element;
        this.plainSymbol = plainSymbol;
        this.isFromClue = isFromClue;
    }

    
    get isElement() : boolean {
        return this.element != undefined && this.element != null;
    }

    get visualString() : String {
        if (this.isElement)
          return '[' + this.element.symbol + ']';
        else
          return this.plainSymbol;
    }
}