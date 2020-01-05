import { Injectable } from '@angular/core';
import { ElementService } from '../services/element.service';

@Injectable({providedIn: 'root'})
export class WordHelper {
    constructor(
        private elementService : ElementService,
    ) { }
    
    calculateElements(word: String){
        let list = [];
        this.auxCalculateElements(list, word, '');
        return list;
    }

    private auxCalculateElements(list : String[], word : String, prefix : String){
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
              this.auxCalculateElements(list, word.substring(i + 2), calculated + '[' + element2.symbol + ']');
              let element3 = this.findElement(next);
              if (!element3)
                return;
            }
            calculated += current;
          }
          else{
            if (element2)
              this.auxCalculateElements(list, word.substring(i + 2), calculated + '[' + element2.symbol + ']');
    
            calculated += '[' + element.symbol + ']';
          }
        }
        list.push(calculated);
      }
    
      private findElement(symbol : String){
        let elements = this.elementService.elements;
        let lower = symbol.toLowerCase();
        for(let i = 0; i < elements.length; i++){
          let current = elements[i];
          if (current.symbol.toLowerCase() == lower)
            return current;
        }
        return null;
      }
}