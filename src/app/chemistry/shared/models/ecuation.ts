import { EcuationCompound } from './ecuation-compound';

export class Ecuation{
    public left : EcuationCompound[];
    public right : EcuationCompound[];

    constructor(){
        this.left = [];
        this.right = [];
    }

    toString(){
        let text = '';
        let parts = [ this.left, this.right ];
        for(let i = 0; i < parts.length; i++){
            for(let j = 0; j < parts[i].length; j++){
                let compound = parts[i][j];
                if (compound.times > 1)
                    text += compound.times;
                for(let k = 0; k < compound.elements.length; k++)
                {
                    let element = compound.elements[k];
                    text += element.element.symbol;
                    if (element.index > 1)
                        text += element.index;
                }
                if (j < parts[i].length - 1)
                    text += ' + ';
            }
            if (i == 0)
                text += ' = ';
        }
        return text;
    }
}