import { ElementDTO } from '@chem-shared/dtos/element.dto';

export class ElementCheckable{

    element : ElementDTO;
    checked : boolean;
    valid: boolean;
    points: number;

    constructor(element : ElementDTO, checked = false, valid = false, points = 0){
        this.element = element;
        this.checked = checked;
        this.valid = valid;
        this.points = points;
    }
}