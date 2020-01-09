import { ElementDTO } from '../dtos/element.dto';

export class WordPart{
    element;
    constructor(element : ElementDTO){
        this.element = element;
    }

    
    get isElement() : boolean {
        return this.element.name != '';
    }

    get visualString() : String {
        if (this.isElement)
          return '[' + this.element.symbol + ']';
        else
          return this.element.symbol;
    }
}