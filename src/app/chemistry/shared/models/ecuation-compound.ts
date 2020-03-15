import { EcuationElement } from './ecuation-element';

export class EcuationCompound{
    public elements : EcuationElement[];
    public times: number;

    constructor(){
        this.elements = [];
        this.times = 1;
    }

    isSame(compound: EcuationCompound){
        if (!compound || this.elements.length != compound.elements.length)
            return false;

        for (let i = 0; i < compound.elements.length; i++){
            if (this.elements[i].element.symbol != compound.elements[i].element.symbol)
                return false;
        }
        return true;
    }
}