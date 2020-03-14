import { EcuationElement } from './ecuation-element';

export class EcuationCompound{
    public elements : EcuationElement[];
    public times: number;

    constructor(){
        this.elements = [];
        this.times = 1;
    }
}