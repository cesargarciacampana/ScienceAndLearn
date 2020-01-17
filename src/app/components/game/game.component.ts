import { Component, OnInit, ViewChild } from '@angular/core';
import { WordService } from '../../shared/services/word.service';
import { WordHelper } from '../../shared/helpers/word.helper';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { Word } from 'src/app/shared/models/word';
import { WordPart } from 'src/app/shared/models/word.part';
import { ElementsComponent } from '../elements/elements.component'
import { ElementCheckable } from '../elements/element.checkable';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  word : String;
  userWord : Word;
  puntos: number;
  private solvedWords : Word[];
  private solvedWordElements : String[];
  private emptyPart : WordPart = new WordPart(null, '_');

  @ViewChild(ElementsComponent, { static: false }) elementsComponent: ElementsComponent;

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper,
  ) { }

  ngOnInit() {
  }

  newGame() {
    this.word = this.wordService.randomWord();
    this.resetUserWord();
    this.solvedWords = this.wordHelper.calculateElements(this.word);
    this.solvedWordElements = [];
    this.calculateSolutionElements();
    if (this.elementsComponent)
      this.elementsComponent.reset();
    this.puntos = 0;
  }

  elementSelected(event: ElementCheckable){
    let element : ElementDTO = event.element;
    let checked : boolean = event.checked;

    if (!checked){
      let parts = this.userWord.parts;
      for (let i=0; i < parts.length; i++){
        if (parts[i].isElement && parts[i].element.name == element.name){
          parts[i] = this.emptyPart;
          if (element.name.length > 1)
            parts[i+1] = this.emptyPart;
          this.puntos -= 20;
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
            if (!parts[i].isElement && this.word[i] == element.symbol.toLowerCase()){      
              parts[i] = new WordPart(element);
              this.puntos += 20;
            }
          }
          else if (parts.length > i + 1){
            if (!parts[i].isElement && !parts[i+1].isElement 
              && this.word[i] == element.symbol[0].toLowerCase()
              && this.word[i + 1] == element.symbol[1].toLowerCase()){
                parts[i+1] = new WordPart(null, '');
                parts[i] = new WordPart(element);
                this.puntos += 20;
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
