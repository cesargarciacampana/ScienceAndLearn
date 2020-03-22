import { Injectable } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';
import { EcuationElement } from '@chem-shared/models/ecuation-element';
import { RandomHelper } from '@shared/helpers/random.helper';
import { Difficulty } from '@chem-shared/models/balancing-game-info';

@Injectable({providedIn: 'root'})
export class EcuationHelper {
    
    constructor(
        private elementService : ElementService
    ) { }

    getRandomEcuation(difficulty: Difficulty) : string{
        let ecuations = null;
        switch(difficulty){
            case Difficulty.Normal:
                ecuations = this.ecuationsNormal;
                break;
            case Difficulty.Hard:
                ecuations = this.ecuationsHard;
                break;
            default:
                ecuations = this.ecuationsEasy;
                break;
        }
        return RandomHelper.fromArray(ecuations);
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
        const max = 11;

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

  private ecuationsEasy = [
    'Cl2 + H2 = HCl',
    'H2 + N2 = NH3',
    'H2 + Br2 = HBr',
    'H2 + Li = LiH',
    'H2 + CO = CH3OH',
    'H2 + Na = NaH',
    'H2 + C = CH4',
    'H2 + P = HP',
    'H2 + I2 = HI',
    'H2 + F2 = HF',
    'H2 + K = KH',
    'H2 + C = HC2',
    'H2 + P = PH3',
    'H2 + N2 = NH2',
    'H2 + C2H4 = C2H6',
    'H2 + Cu = HCu2',
    'H2 + K = KH4',
    'H2 + Mg = MgH',
    'H2 + N2 = NH',
    'H2 + C2H2 = C6H12',
    'H2 + P4 = PH3',
    'H2 + Mg = Mg2H',
    'H2 + Al = AlH3',
    'H2 + C2H2 = C2H4',
    'H2 + Si = SiH4',
    'H2 + C6H6 = C6H12',
    'H2 + Mg = Mg2H2',
    'H2 + C2H2 = C2H6',
    'H2 + N2 = HN3',
    'H2 + P = PH',
    'H2 + C = C2H2',
    'H2 + O3 = H2O',
    'H2 + N2 = H3N',
    'H2 + N2 = N2H3',
    'H2 + C = CH',
    'Cl2 + H2 = HCl2',
    'O2 + Mg = MgO',
    'O2 + Fe = Fe2O3',
    'O2 + Ca = CaO',
    'O2 + P = P2O5',
    'O2 + SO2 = SO3',
    'O2 + H2 = H2O',
    'O2 + Zn = ZnO',
    'O2 + Al = Al2O3',
    'O2 + Cu = CuO',
    'O2 + N2 = NO',
    'O2 + CO = CO2',
    'O2 + Na = Na2O',
    'O2 + NO = NO2',
    'O2 + Na = Na2O2',
    'O2 + Ba = BaO',
    'O2 + Li = Li2O',
    'O2 + Fe = Fe3O4',
    'O2 + C = CO',
    'O2 + Hg = HgO',
    'O2 + S8 = SO2',
    'O2 + K = K2O',
    'O2 + S = SO3',
    'O2 + PH3 = H3PO4',
    'O2 + P = P2O3',
    'O2 + N2 = N2O5',
    'O2 + Fe = FeO',
    'O2 + N2 = NO2',
    'O2 + Cr = CrO3',
    'O2 + Si = SiO4',
    'O2 + P4 = P2O5',
    'O2 + Cr = Cr2O3',
    'O2 + FeO = Fe2O3',
    'O2 + Cu = Cu2O',
    'O2 + K = K2O2',
    'O2 + P4 = P4O10',
    'N2 + O2 = N2O3',
    'P + Cl2 = PCl5',
    'KClO3 = KCl + O2',
    'Cl2 + Na = NaCl'
  ];

  private ecuationsNormal = [
    'H2 + Fe2O3 = H2O + Fe',
    'H2 + WO3 = H2O + W',
    'H2 + Fe3O4 = H2O + Fe',
    'H2 + MnO2 = H2O + Mn',
    'H2 + SiO2 = H2O + Si',
    'H2 + SnO2 = H2O + Sn',
    'H2 + NO = H2O + N2',
    'H2 + Al2O3 = H2O + Al',
    'H2 + Pb3O4 = H2O + Pb',
    'H2 + HNO3 = H2O + NH2OH',
    'H2 + Cr2O3 = H2O + Cr',
    'H2 + CO2 = H2O + CH4',
    'H2 + CO = H2O + CH4',
    'H2 + Fe2O3 = H2O + FeO',
    //'H2 + Al + C2H2 = (C2H5)3Al',
    'H2 + Re2S7 = H2S + Re',
    'H2 + Au2S3 = H2S + Au',
    'H2 + Cu2O = H2O + Cu',
    'H2 + MoO3 = H2O + Mo',
    'H2 + V2O5 = H2O + V',
    'H2 + NO2 = H2O + NH3',
    'H2 + FeCl3 = HCl + FeCl2',
    'H2 + Fe3O4 = H2O + FeO',
    'H2 + SO2 = H2O + S',
    'H2 + SO2 = H2O + H2S',
    'H2 + CuCl2 = HCl + Cu',
    'H2 + CrO3 = H2O + Cr',
    'H2 + CO = H2O + C8H18',
    'H2 + NaCl = HCl + Na',
    'H2 + PbO2 = H2O + Pb',
    //'H2 + Cu3(PO4)2 = Cu + H2PO4',
    'O2 + NH3 = H2O + NO',
    'O2 + H2S = H2O + SO2',
    'O2 + FeS2 = SO2 + Fe2O3',
    'O2 + CH4 = H2O + CO2',
    'O2 + NH3 = H2O + N2',
    'O2 + CuS = SO2 + CuO',
    'O2 + ZnS = SO2 + ZnO',
    'O2 + C3H8 = H2O + CO2',
    'O2 + H2S = H2O + S',
    'O2 + C2H6 = H2O + CO2',
    'O2 + PbS = SO2 + PbO',
    'O2 + C2H2 = H2O + CO2',
    'O2 + C4H10 = H2O + CO2',
    'O2 + C5H12 = H2O + CO2',
    'H2O + O2 + NO2 = HNO3',
    //'H2O + O2 + Fe = Fe(OH)3',
    'O2 + Cu2S = SO2 + Cu2O',
    'O2 + CH3CH2OH = H2O + CO2',
    //'H2O + O2 + Fe(OH)2 = Fe(OH)3',
    'O2 + H2S + Ag = H2O + Ag2S',
    'O2 + C2H5OH = H2O + CO2',
    'O2 + CH3OH = H2O + CO2',
    'O2 + FeS = SO2 + Fe2O3',
    'O2 + Sb2S3 = SO2 + Sb2O3',
    'O2 + PH3 = H2O + P2O5',
    'O2 + C6H6 = H2O + CO2',
    'O2 + C4H8 = H2O + CO2',
    'O2 + C2H4 = H2O + CO2',
    'O2 + HCl = H2O + Cl2',
    'O2 + C8H18 = H2O + CO2',
    'O2 + C6H12O6 = H2O + CO2',
    'O2 + CS2 = CO2 + SO2',
    'O2 + NH3 = H2O + NO2',
    //'O2 + Mn(OH)2 = H2O + Mn2O3',
    'O2 + C2H2 = H2O + CO2 + C',
    'O2 + C3H6 = H2O + CO2',
    'O2 + CH3CH3 = H2O + CO2',
    'O2 + SnS = SO2 + SnO',
    'O2 + Fe2S3 = SO2 + Fe2O3',
    'O2 + Cu2S = SO2 + CuO',
    'O2 + SiH4 = H2O + SiO2',
    'O2 + HI = H2O + I2',
    'O2 + C5H10 = H2O + CO2',
    'O2 + MoS2 = SO2 + MoO3',
    'Fe + Cl2 = FeCl3',
    'Mg + HCl = MgCl2 + H2',
    //'Fe2O3 + H2O = Fe(OH)3',
    'H2O + Na = NaOH + H2',
    'K2CO3 + C = CO + K',
    'FeS2 = Fe3S4 + S2'
  ];

  private ecuationsHard = [
    'H2 + SO2 + NO = H2SO4 + N2O',
    'H2 + KIO3 + S2O4 = H2O + I2 + K + S4O6',
    'O2 + KOH + MnO2 = H2O + K2MnO4',
    //'H2O + O2 + Ag + KCN = KOH + K[Ag(CN)2]',
    'O2 + KOH + MnO2 = H2O + KMnO4',
    'H2O + O2 + Na2S = NaOH + Na2S2O3',
    'H2SO4 + O2 + C12H22O11 = H2O + CO2 + SO2 + C',
    'O2 + MnO2 + K2CO3 = CO2 + K2MnO4',
    'O2 + FeAsS = SO2 + Fe2O3 + As4O6',
    'O2 + KOH + Fe = H2O + K2FeO4',
    'O2 + CH5N = H2O + CO2 + N2',
    'O2 + CuFeS2 = SO2 + FeO + Cu2S',
    //'HCl + Ca(OH)2 = CaCl2 + H2O',
    //'Al2O3 + H2SO4 = Al2(SO4)3 + H2O',
    'Cu + H2SO4 = CuSO4 + SO2 + H2O',
    'Hg + H2SO4 = HgSO4 + H2O + SO2',
    //'Cu + HNO3 = Cu(NO3)2 + H2O + NO',
    'BaO2 + HCl = BaCl2 + H2O2',
    'H2SO4 + NaCl = Na2SO4 + HCl',
    'H2SO4 + C = H2O + SO2 + CO2',
    'HCl + MnO2 = MnCl2 + H2O + Cl2',
    'Ag2SO4 + NaCl = Na2SO4 + AgCl',
    'Na2CO3 + H2O + CO2 = NaHCO3',
    'Ag + HNO3 = NO2 + H2O + AgNO3',
    'CuFeS2 + O2 = SO2 + CuO + FeO',
    //'CaC2 + H2O = C2H2 + Ca(OH)2',
    //'HCl + Al(OH)3 = AlCl3 + H2O'
  ];
}