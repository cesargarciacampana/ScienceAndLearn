import { ElementDTO } from '@chem-shared/dtos/element.dto';

export class Card{
    element: ElementDTO;
    textProperty: string;
    selected: boolean;
    solved: boolean;

    constructor(element: ElementDTO, textProperty: string){
        this.element = element;
        this.textProperty = textProperty;
        this.selected = false;
        this.solved = false;
    }
}