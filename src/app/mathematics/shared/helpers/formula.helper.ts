export class FormulaHelper {

    //static operations = [ '+', '-', 'x', '/' ];
    static operations = [ '+', '-', 'x' ];

    private static isNumber(c: string){
        return c >= '0' && c <= '9';
    }

    private static split(word:string, c: string){
        let value = word.split(c);
        if (!value)
            value = [word];
        return value;
    }

    static parse(formula: string) : number{
        formula = formula.replace(new RegExp('-', 'g'), '+-');

        let result = 0;
        let adds = FormulaHelper.split(formula, '+');
        for(let i = 0; i < adds.length; i++){
            let temp = 1;
            let divisor = 1;
            let multiplications = FormulaHelper.split(adds[i], 'x');
            for(let j = 0; j < multiplications.length; j++){
                let divisions = FormulaHelper.split(multiplications[j], '/');
                temp *= parseInt(divisions[0]);
                for(let k = 1; k < divisions.length; k++)
                    divisor *= parseInt(divisions[k]);
            }
            temp /= divisor;
            result += temp;
        }
        return result;

        /*let elementsToAdd: number[] = [];

        let digits = '';
        let negate = false;
        let multiplicationBlock = 1;
        let division = false;
        for(let i = 0; i < formula.length; i++){
            if (FormulaHelper.isNumber(formula[i])){
                digits += formula[i];
            }
            else{
                if (formula[i] == '+' || formula[i] == '-'){
                    if (digits != ''){
                        elementsToAdd.push((negate ? -1 : 1) * parseInt(digits));
                        digits = '';
                    }
                    negate = formula[i] == '-';
                }
                else{
                    negate = formula[i] == '/';
                }
            }
        }

        if (digits != '')
            elementsToAdd.push((negate ? -1 : 1) * parseInt(digits));

        let result = 0;
        for(let i = 0; i < elementsToAdd.length; i++)
            result += elementsToAdd[i];
        return result;*/
    }
}