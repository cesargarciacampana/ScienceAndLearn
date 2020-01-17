import { ElementDTO } from 'src/app/shared/dtos/element.dto';

export class ElementCheckable{

    element : ElementDTO;
    checked : boolean;

    constructor(element : ElementDTO, checked : boolean = false){
        this.element = element;
        this.checked = checked;
    }
}