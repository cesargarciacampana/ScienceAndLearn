import { Injectable } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';
import { EcuationElement } from '@chem-shared/models/ecuation-element';
import { ArrayHelper } from '@shared/helpers/array.helper';

@Injectable({providedIn: 'root'})
export class EcuationHelper {
    
    constructor(
        private elementService : ElementService,
    ) { }

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
}