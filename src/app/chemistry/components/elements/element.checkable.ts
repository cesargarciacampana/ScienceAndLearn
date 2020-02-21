import { ElementDTO } from '@chem-shared/dtos/element.dto';

export class ElementCheckable{

    element : ElementDTO;
    checked : boolean;
    valid: boolean;
    points: number;
    isClue: boolean;

    constructor(element : ElementDTO, checked = false, valid = false, points = 0, isClue = false){
        this.element = element;
        this.checked = checked;
        this.valid = valid;
        this.points = points;
        this.isClue = isClue;
    }
}