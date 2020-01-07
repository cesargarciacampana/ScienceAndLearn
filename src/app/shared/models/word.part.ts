import { ElementDTO } from '../dtos/element.dto';

export class WordPart{
    element;
    constructor(element : ElementDTO){
        this.element = element;
    }

    
    get isRealElement() : boolean {
        return this.element.name != '';
    }

    get visualString() : String {
        if (this.isRealElement)
          return '[' + this.element.symbol + ']';
        else
          return this.element.symbol;
    }
}