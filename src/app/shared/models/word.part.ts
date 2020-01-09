import { ElementDTO } from '../dtos/element.dto';

export class WordPart{
    element : ElementDTO;
    plainSymbol : String;
    constructor(element? : ElementDTO, plainSymbol? : String){
        this.element = element;
        this.plainSymbol = plainSymbol;
    }

    
    get isElement() : boolean {
        return this.element != undefined;
    }

    get visualString() : String {
        if (this.isElement)
          return '[' + this.element.symbol + ']';
        else
          return this.plainSymbol;
    }
}