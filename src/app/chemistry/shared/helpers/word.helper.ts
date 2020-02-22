import { Injectable } from '@angular/core';
import { ElementService } from '../services/element.service';
import { ElementDTO } from '../dtos/element.dto';
import { StringHelper } from '@shared/helpers/string.helper';
import { WordPart } from '../models/word-part';
import { Word } from '../models/word';

@Injectable({providedIn: 'root'})
export class WordHelper {

    static readonly MAX_SYMBOL_LENGTH = 2;

    constructor(
        private elementService : ElementService,
    ) { }
    
    calculateElements(word: String) : Word[]{
        let list = [];
        this.auxCalculateElements(list, StringHelper.removeAccents(word), new Word());
        return list;
    }

    private auxCalculateElements(list : Word[], word : String, prefix : Word){
        for(let i = 0; i < word.length; i++) {
          let current = word[i];
          let next = null;
          if (i < word.length - 1)
            next = word[i + 1];
    
          let element = this.findElement(current);
          let element2 = null;
          if (next)
            element2 = this.findElement(current + next);
    
          if (element2){
            let temp = prefix.clone();
            temp.parts.push(new WordPart(element2));
            this.auxCalculateElements(list, word.substring(i + 2), temp);
          }

          if (!element){
            if (element2 && !this.findElement(next)){
              if (i >= word.length - 2 || !this.findElement(next + word[i + 2]))
                return;
            }
            prefix.parts.push(new WordPart(null, current));
          }
          else{    
            prefix.parts.push(new WordPart(element));
          }
        }
        list.push(prefix);
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

      getPosibleElements(word: string) : ElementDTO[]{
        let list : ElementDTO[] = [];
        for(let i = 0; i < word.length; i++) {
          let symbol = '';
          for (let j = 0; j <= WordHelper.MAX_SYMBOL_LENGTH; j++){
            symbol += word[i+j];
            let element = this.findElement(symbol);
            if (element && !list.includes(element))
              list.push(element);
          }
        }

        return list;
      }
}