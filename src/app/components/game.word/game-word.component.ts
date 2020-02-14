import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WordPart } from 'src/app/shared/models/word.part';
import { ElementCheckable } from '../elements/element.checkable';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { Word } from 'src/app/shared/models/word';
import { WordService } from 'src/app/shared/services/word.service';
import { WordHelper } from 'src/app/shared/helpers/word.helper';
import { ElementsComponent } from '../elements/elements.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-gameword',
  templateUrl: './game-word.component.html',
  styleUrls: ['./game-word.component.css']
})
export class GameWordComponent implements OnInit {

  word : String;
  userWord : Word;
  wordCompleted: boolean;
  private solvedWords : Word[];
  private solvedWordElements : String[];
  private emptyParts : WordPart[];

  private readonly emptyPart = new WordPart(null, '_');
  private readonly missingPoints = -5;
  private readonly matchingPoints = 20;

  @Output() pointsChanged = new EventEmitter<number>();

  @ViewChild(ElementsComponent, { static: false }) elementsComponent: ElementsComponent;

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  newWord() {
    if (this.word && !this.wordCompleted)
    {
      let remaining = this.GetRemainingLetterCount();
      let substraction = this.missingPoints * remaining;

      if (!window.confirm(`Se te restarán puntos por las letras que faltan, ¿quieres ir a la siguiente palabra?`))
        return;

      this.changePoints(null, substraction, false);
      this.snackBar.open(`Faltaban ${remaining} letras, se te restan ${-substraction} puntos`
        , null,{ duration: 3000 });
    }
    this.generateWord();
  }

  private generateWord(){
    this.wordService.randomWord().subscribe(word => {
      this.wordCompleted = false;
      this.word = word;
      this.solvedWords = this.wordHelper.calculateElements(this.word);
      this.calculateEmptyParts();
      this.resetUserWord();
      this.calculateSolutionElements();
      if (this.elementsComponent)
        this.elementsComponent.reset();
    });
  }

  private isElementPart(part: WordPart){
    return part.isElement || part.plainSymbol === '';
  }

  private isDoubleLetter(element: ElementDTO){
    return element.symbol.length > 1;
  }

  elementSelected(event: ElementCheckable){
    let element : ElementDTO = event.element;
    let checked : boolean = event.checked;

    if (!checked){
      if (!event.valid)
        event.points = 0;
      else{
        let parts = this.userWord.parts;
        for (let i=0; i < parts.length; i++){
          if (parts[i].isElement && parts[i].element.symbol == element.symbol){
            parts[i] = this.emptyParts[i];
            if (this.isDoubleLetter(element))
              parts[i+1] = this.emptyParts[i];
            this.changePoints(event, -1 * this.matchingPoints, false);
          }
        }
      }
    }
    else{
      if (this.solvedWordElements.includes(element.symbol)){
        let parts = this.userWord.parts;
        let normalized = StringHelper.removeAccents(this.word);
        for (let i=0; i < parts.length; i++){
          if (element.symbol.length == 1){
            if (!this.isElementPart(parts[i]) && normalized[i] == element.symbol.toLowerCase()){      
              parts[i] = new WordPart(element);
              this.changePoints(event, this.matchingPoints, true);
            }
          }
          else if (parts.length > i + 1){
            if (!this.isElementPart(parts[i]) && !this.isElementPart(parts[i+1]) 
              && normalized[i] == element.symbol[0].toLowerCase()
              && normalized[i + 1] == element.symbol[1].toLowerCase()){
                parts[i+1] = new WordPart(null, '');
                parts[i] = new WordPart(element);
                this.changePoints(event, this.matchingPoints, true);
            }
          }
        }
      }
      
      if (!event.valid)
        this.changePoints(event, this.missingPoints, false);

      this.checkIfCompleted();
    }
  }

  private resetUserWord(){
    this.userWord = new Word();
    for (let i=0; i < this.word.length; i++){
      this.userWord.parts.push(this.emptyParts[i]);
    }
  }

  private calculateEmptyParts(){
    this.emptyParts = new Array<WordPart>(this.word.length);
    for (let i=0; i < this.solvedWords.length; i++){
      let parts = this.solvedWords[i].parts;
      let index = 0;
      for (let j=0; j < parts.length; j++){
        if (!this.emptyParts[index] && parts[j].isElement){
          this.emptyParts[index] = this.emptyPart;
          if (this.isDoubleLetter(parts[j].element))
            this.emptyParts[++index] = this.emptyPart;
        }
        index++;
      }
    }
    for (let i=0; i < this.word.length; i++){
      if (!this.emptyParts[i])
        this.emptyParts[i] = new WordPart(null, this.word[i]);
    }
  }

  private calculateSolutionElements(){
    this.solvedWordElements = [];
    for(let i=0; i < this.solvedWords.length; i++){
      let word = this.solvedWords[i];
      for (let j=0; j < word.parts.length; j++){
        let part = word.parts[j];
        if (part.isElement && !this.solvedWordElements.includes(part.element.symbol))
          this.solvedWordElements.push(part.element.symbol);
      }
    }
  }

  private changePoints(event: ElementCheckable, points: number, valid: boolean){
    if (event){
      event.valid = valid;
      event.points += points;
    }
    this.pointsChanged.emit(points);
  }

  private GetRemainingLetterCount(){
    let count = 0;
    for (let i = 0; i < this.userWord.parts.length; i++)
      if (this.userWord.parts[i] == this.emptyPart)
        count++;
    return count;
  }

  private checkIfCompleted(){
    if (this.GetRemainingLetterCount() > 0)
      return;

    this.wordCompleted = true;
  }
}
