import { Injectable } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';
import { EcuationElement } from '@chem-shared/models/ecuation-element';
import { RandomHelper } from '@shared/helpers/random.helper';

@Injectable({providedIn: 'root'})
export class EcuationHelper {
    
    constructor(
        private elementService : ElementService
    ) { }

    getRandomEcuation() : string{
        return RandomHelper.fromArray(this.ecuationStrings);
    }

    parseEcuation(formula: string){
        const endChar = '|';
        let ecuation = new Ecuation();
        let currentPart = ecuation.left;
        let acumulated = '';

        formula += endChar;
        for(let i=0; i < formula.length; i++){
            let char = formula[i];
            if (char == '='){
                if (currentPart == ecuation.right)
                    throw new Error('Syntax error: Two equal symbols not allowed');
                if (acumulated == '')
                    throw new Error('Syntax error: An equal symbol has to be after a compound');
                currentPart.push(this.parseCompound(acumulated));
                acumulated = '';
                currentPart = ecuation.right;
            }
            else if(char == '+' ||char == endChar){
                if (acumulated == '')
                    throw new Error('Syntax error: A plus symbol has to be after a compound');
                currentPart.push(this.parseCompound(acumulated));
                acumulated = '';
            }
            else if (char != ' ')
                acumulated += char;
        }
        if (ecuation.left.length == 0 || ecuation.right.length == 0)
            throw new Error('Syntax error: Both sides of the equality need to have compounds');
        
        return ecuation;
    }

    private isCharNumber(c){
        return c >= '0' && c <= '9';
    }
    private isCharUpper(c){
        return c >= 'A' && c <= 'Z';
    }
    private isCharLower(c){
        return c >= 'a' && c <= 'z';
    }

    parseCompound(text: string) : EcuationCompound{
        const endChar = '|';
        let compound = new EcuationCompound();
        let symbol = '';
        let number = '';
        text += endChar;
        for(let i=0; i < text.length; i++){
            let char = text[i];
            if (this.isCharNumber(char)){
                number += char;
            }
            else if (this.isCharLower(char)){
                if (symbol == '')
                    throw new Error('Syntax error: Invalid element');
                symbol += char;
            }
            else if (this.isCharUpper(char) || char == endChar){
                if (symbol == ''){
                    if (number != '')
                        compound.times = parseInt(number);
                }
                else{
                    let element = this.elementService.findElement(symbol);
                    if (!element)
                        throw new Error('Syntax error: Invalid element ' + symbol);
                    if (number == '')
                        number = '1';
                    compound.elements.push(new EcuationElement(element, parseInt(number)));
                }
                number = '';
                symbol = char;
            }
            else if (char != ' ')
                throw new Error('Syntax error: Invalid character ' + char);
        }
        if (compound.elements.length == 0)
            throw new Error('Syntax error: A compound needs to have elements');

        return compound;
    }

    isBalanced(ecuation: Ecuation) : number{
        let left = this.getElementWeight(ecuation.left);
        let right = this.getElementWeight(ecuation.right);

        if (left < right) return 1;
        else if (left > right) return -1;
        else return 0;
    }

    private auxBalance(ecuation: Ecuation, index: number, max: number) : boolean{
        let compound = null;
        if (index > ecuation.left.length + ecuation.right.length - 1)
            return this.isBalanced(ecuation) == 0;

        if (index < ecuation.left.length){
            compound = ecuation.left[index];
        }
        else{
            let rindex = index - ecuation.left.length;
            compound = ecuation.right[rindex]
        }

        for (let i = 1; i <= max; i++){
            compound.times = i;
            this.auxBalance(ecuation, index + 1, max);
            if (this.isBalanced(ecuation) == 0)
                return true;
        }
        return false;
    }

    getBalancedBruteForce(secuation: string) : Ecuation{
        let ecuation = this.parseEcuation(secuation);
        const max = 10;

        if (this.auxBalance(ecuation, 0, max))
            return ecuation;

        console.log('Solución no encontrada');
        return null;
    }

    private getElementWeight(compounds: EcuationCompound[]): number{
        let weight = 0;
        for(let i = 0; i < compounds.length; i++){
            let compound = compounds[i];
            for(let j = 0; j < compound.elements.length; j++){
                let element = compound.elements[j];
                weight += compound.times * element.index * element.element.atomic_mass;
            }
        }
        return Math.floor(weight * 1000) / 1000;
    }

/*     
    'NaOH + HCl = NaCl + H2O',
    'S + O2 = SO2',
    'ZnS + O2 = ZnO + SO2',
    'HBr + NaOH = NaBr + H2O',
    'NaNO3 + KCl = NaCl + KNO3',
*/

  private ecuationStrings = [
    'CH4 + O2 = CO2 + H2O',
    'Fe + Cl2 = FeCl3',
    'Mg + HCl = MgCl2 + H2',
    //'Fe2O3 + H2O = Fe(OH)3',
    //'HCl + Ca(OH)2 = CaCl2 + H2O',
    //'Al2O3 + H2SO4 = Al2(SO4)3 + H2O',
    'Cu + H2SO4 = CuSO4 + SO2 + H2O',
    'N2 + O2 = N2O3',
    'Hg + H2SO4 = HgSO4 + H2O + SO2',
    'P + Cl2 = PCl5',
    //'Cu + HNO3 = Cu(NO3)2 + H2O + NO',

    'H2 + O2 = H2O',
    'N2 + H2 = NH3',
    'H2O + Na = NaOH + H2',
    'KClO3 = KCl + O2',
    'BaO2 + HCl = BaCl2 + H2O2',
    'H2SO4 + NaCl = Na2SO4 + HCl',
    'FeS2 = Fe3S4 + S2',
    'H2SO4 + C = H2O + SO2 + CO2',
    'SO2 + O2 = SO3',
    'HCl + MnO2 = MnCl2 + H2O + Cl2',
    'K2CO3 + C = CO + K',
    'Ag2SO4 + NaCl = Na2SO4 + AgCl',
    'Fe2O3 + CO = CO2 + Fe',
    'Na2CO3 + H2O + CO2 = NaHCO3',
    'Cr2O3 + Al = Al2O3 + Cr',
    'Ag + HNO3 = NO2 + H2O + AgNO3',
    'CuFeS2 + O2 = SO2 + CuO + FeO',
    'C2H6 + O2 = CO2 + H2O',
    'FeS2 + O2 = Fe2O3 + SO2',
    'Zn + HCl = ZnCl2 + H2',
    'Al + HCl = AlCl3 + H2',
    //'CaC2 + H2O = C2H2 + Ca(OH)2',
    //'HCl + Al(OH)3 = AlCl3 + H2O',
    'Fe + O2 = Fe2O3',
    'C6H12O6 + O2 = CO2 + H2O',
  ];
}