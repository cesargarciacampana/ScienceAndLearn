import { Component, OnInit } from '@angular/core';
import { WordService } from '../../shared/services/word.service';
import { WordHelper } from '../../shared/helpers/word.helper';
import { ElementService } from 'src/app/shared/services/element.service';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { MAT_HAMMER_OPTIONS } from '@angular/material/core';
import { Word } from 'src/app/shared/models/word';
import { WordPart } from 'src/app/shared/models/word.part';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  word : String;
  userWord : Word;
  private solvedWords : Word[];
  private solvedWordElements : String[];
  private _sortedElements : ElementDTO[];

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper,
    private elementService : ElementService,
  ) { }

  ngOnInit() {
  }

  get sortedElements() {
    if (!this._sortedElements && this.elementService.elements)
    {
        let temp = Array.from(this.elementService.elements);
        temp.sort(this.compare);
        this._sortedElements = temp;
    }
      
    return this._sortedElements;
  }

  private compare(e1: ElementDTO, e2 : ElementDTO){
    return e1.name.localeCompare(e2.name);
  }

  newGame() {
    this.word = this.wordService.randomWord();
    this.resetUserWord();
    this.solvedWords = this.wordHelper.calculateElements(this.word);
    this.solvedWordElements = [];
    this.calculateSolutionElements();
  }

  selectElement(element : ElementDTO){
    if (this.solvedWordElements.includes(element.symbol)){   
      let parts = this.userWord.parts;
      for (let i=0; i < parts.length; i++){
        if (element.symbol.length == 1){
          if (!parts[i].isElement && this.word[i] == element.symbol.toLowerCase()){      
            parts[i] = new WordPart(element);
          }
        }
        else if (parts.length > i + 1){
          if (!parts[i].isElement && !parts[i+1].isElement 
            && this.word[i] == element.symbol[0].toLowerCase()
            && this.word[i + 1] == element.symbol[1].toLowerCase()){
              parts[i+1] = new WordPart(null, '');
              parts[i] = new WordPart(element);
          }
        }
      }
    }
  }

  private resetUserWord(){
    this.userWord = new Word();
    for (let i=0; i < this.word.length; i++){
      this.userWord.parts.push(new WordPart(null, '_'));
    }
  }

  private calculateSolutionElements(){
    for(let i=0; i < this.solvedWords.length; i++){
      let word = this.solvedWords[i];
      for (let j=0; j < word.parts.length; j++){
        let part = word.parts[j];
        if (part.isElement && !this.solvedWordElements.includes(part.element.symbol))
          this.solvedWordElements.push(part.element.symbol);
      }
    }
  }
}
