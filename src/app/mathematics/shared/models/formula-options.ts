export class FormulaOptions{

    nElements: number;
    minNumber: number;
    maxNumber: number;
    operations: string[];

    constructor(nElements: number, minNumber: number, maxNumber: number, operations: string[]){
        this.nElements = nElements;
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.operations = operations;
    }
}