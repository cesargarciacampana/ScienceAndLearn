import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WordPart } from 'src/app/shared/models/word.part';
import { ElementCheckable } from '../elements/element.checkable';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { Word } from 'src/app/shared/models/word';
import { WordService } from 'src/app/shared/services/word.service';
import { WordHelper } from 'src/app/shared/helpers/word.helper';
import { ElementsComponent } from '../elements/elements.component';

@Component({
  selector: 'app-gameword',
  templateUrl: './game-word.component.html',
  styleUrls: ['./game-word.component.css']
})
export class GameWordComponent implements OnInit {

  word : String;
  private userWord : Word;
  puntos: number = 0;
  private solvedWords : Word[];
  private solvedWordElements : String[];
  private emptyPart : WordPart = new WordPart(null, '_');

  @ViewChild(ElementsComponent, { static: false }) elementsComponent: ElementsComponent;

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper
  ) { }

  ngOnInit() {
  }

  newWord() {
    this.wordService.randomWord().subscribe(word => {
      this.word = word;
      this.resetUserWord();
      this.solvedWords = this.wordHelper.calculateElements(this.word);
      this.solvedWordElements = [];
      this.calculateSolutionElements();
      if (this.elementsComponent)
        this.elementsComponent.reset();
      this.puntos = 0;
    });
  }

  private isElementPart(part: WordPart){
    return part.isElement || part.plainSymbol === '';
  }

  elementSelected(event: ElementCheckable){
    let element : ElementDTO = event.element;
    let checked : boolean = event.checked;

    if (!checked){
      let parts = this.userWord.parts;
      for (let i=0; i < parts.length; i++){
        if (parts[i].isElement && parts[i].element.symbol == element.symbol){
          parts[i] = this.emptyPart;
          if (element.symbol.length > 1)
            parts[i+1] = this.emptyPart;
          this.puntos -= 20;
          event.valid = false;
        }
      }
    }
    else{
      if (!this.solvedWordElements.includes(element.symbol)) 
          this.puntos -= 5;
      else{ 
        let parts = this.userWord.parts;
        for (let i=0; i < parts.length; i++){
          if (element.symbol.length == 1){
            if (!this.isElementPart(parts[i]) && this.word[i] == element.symbol.toLowerCase()){      
              parts[i] = new WordPart(element);
              this.puntos += 20;
              event.valid = true;
            }
          }
          else if (parts.length > i + 1){
            if (!this.isElementPart(parts[i]) && !this.isElementPart(parts[i+1]) 
              && this.word[i] == element.symbol[0].toLowerCase()
              && this.word[i + 1] == element.symbol[1].toLowerCase()){
                parts[i+1] = new WordPart(null, '');
                parts[i] = new WordPart(element);
                this.puntos += 20;
                event.valid = true;
            }
          }
        }
      }
    }
  }

  private resetUserWord(){
    this.userWord = new Word();
    for (let i=0; i < this.word.length; i++){
      this.userWord.parts.push(this.emptyPart);
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
