import { Injectable } from '@angular/core';
import { ElementService } from '../services/element.service';
import { PeriodicTableElement } from '../models/periodic.table.element';
import { StringHelper } from './string.helper';

@Injectable({providedIn: 'root'})
export class WordHelper {
    constructor(
        private elementService : ElementService,
    ) { }
    
    calculateElements(word: String) : PeriodicTableElement[][]{
        let list = [];
        this.auxCalculateElements(list, word, []);
        return list;
    }

    private auxCalculateElements(list : PeriodicTableElement[][], word : String, prefix : PeriodicTableElement[]){
        let calculated = prefix;
        for(let i = 0; i < word.length; i++) {
          let current = word[i];
          let next = null;
          if (i < word.length - 1)
            next = word[i + 1];
    
          let element = this.findElement(current);
          let element2 = null;
          if (next)
            element2 = this.findElement(current + next);
    
          if (!element){
            if (element2){
              let temp = Array.from(calculated);
              temp.push(element2);
              this.auxCalculateElements(list, word.substring(i + 2), temp);
              let element3 = this.findElement(next);
              if (!element3)
                return;
            }
            calculated.push(new PeriodicTableElement(current, ''));
          }
          else{
            if (element2){
              let temp = Array.from(calculated);
              temp.push(element2);
              this.auxCalculateElements(list, word.substring(i + 2), temp);
            }
    
            calculated.push(element);
          }
        }
        list.push(calculated);
      }
    
      private findElement(symbol : String){
        let elements = this.elementService.elements;
        let lower = symbol.toLowerCase();
        let normalized = StringHelper.removeAccents(lower);
        for(let i = 0; i < elements.length; i++){
          let current = elements[i];
          if (current.symbol.toLowerCase() == normalized)
            return current;
        }
        return null;
      }
}