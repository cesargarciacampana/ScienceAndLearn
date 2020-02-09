import { ElementDTO } from 'src/app/shared/dtos/element.dto';

export class ElementCheckable{

    element : ElementDTO;
    checked : boolean;
    valid: boolean;

    constructor(element : ElementDTO, checked = false, valid = false){
        this.element = element;
        this.checked = checked;
        this.valid = valid;
    }
}