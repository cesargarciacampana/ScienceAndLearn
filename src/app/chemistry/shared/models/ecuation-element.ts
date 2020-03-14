import { ElementDTO } from '@chem-shared/dtos/element.dto';

export class EcuationElement{
    public element : ElementDTO;
    public index : number;

    constructor(element: ElementDTO, index = 1){
        this.element = element;
        this.index = index;
    }
}