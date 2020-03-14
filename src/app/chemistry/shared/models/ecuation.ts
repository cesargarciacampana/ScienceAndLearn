import { EcuationCompound } from './ecuation-compound';

export class Ecuation{
    public left : EcuationCompound[];
    public right : EcuationCompound[];

    constructor(){
        this.left = [];
        this.right = [];
    }
}