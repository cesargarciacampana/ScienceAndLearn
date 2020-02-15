import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WordPart } from '@chem-shared/models/word.part';
import { ElementCheckable } from '../elements/element.checkable';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { Word } from '@chem-shared/models/word';
import { WordService } from '@chem-shared/services/word.service';
import { WordHelper } from '@chem-shared/helpers/word.helper';
import { ElementsComponent } from '../elements/elements.component';
import { StringHelper } from '@shared/helpers/string.helper';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-gameword',
  templateUrl: './game-word.component.html',
  styleUrls: ['./game-word.component.css']
})
export class GameWordComponent implements OnInit {

  word : string;
  private cleanWord : string;
  userWord : Word;
  wordCompleted: boolean;
  private posibleElements : string[];

  private readonly emptyPart = new WordPart(null, '_');
  private readonly missingPoints = -5;
  private readonly matchingPoints = 20;

  started = false;

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
    this.started = true;
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
      this.cleanWord = StringHelper.removeAccents(word);
      this.userWord = new Word();
      this.calculatePosibleElements();
      this.calculateEmptyParts();
      if (this.elementsComponent)
        this.elementsComponent.reset();
    });
  }

  private isElementPart(part: WordPart){
    return part && (part.isElement || part.plainSymbol === '');
  }

  private isDoubleLetter(element: ElementDTO){
    return element && element.symbol.length > 1;
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
            parts[i] = this.emptyPart;
            if (this.isDoubleLetter(element))
              parts[i+1] = this.emptyPart;
            this.changePoints(event, -1 * this.matchingPoints, false);
          }
        }
      }
    }
    else{
      let lowerSymbol = element.symbol.toLowerCase();
      if (this.posibleElements.includes(lowerSymbol)){
        let parts = this.userWord.parts;
        for (let i=0; i < parts.length; i++){
          if (!this.isDoubleLetter(element)){
            if (!this.isElementPart(parts[i]) && this.cleanWord[i] == lowerSymbol){      
              parts[i] = new WordPart(element);
              this.changePoints(event, this.matchingPoints, true);
            }
          }
          else if (parts.length > i + 1){
            if (!this.isElementPart(parts[i]) && !this.isElementPart(parts[i+1]) 
              && this.cleanWord[i] == lowerSymbol[0]
              && this.cleanWord[i + 1] == lowerSymbol[1]){
                parts[i+1] = new WordPart(null, '');
                parts[i] = new WordPart(element);
                this.changePoints(event, this.matchingPoints, true);
            }
          }
        }
      }
      
      if (!event.valid)
        this.changePoints(event, this.missingPoints, false);
    }
    
    this.calculateEmptyParts();

    if (event.valid)
      this.checkIfCompleted();
  }

  private calculateEmptyParts(){
    let i = -1;
    let ignoreSingleLetter = [];
    while(++i < this.word.length){
      if (this.isElementPart(this.userWord.parts[i]))
        continue;

      let single = this.cleanWord[i];
      let canBeDouble = i < this.word.length - 1 && !this.isElementPart(this.userWord.parts[i+1]);
      let double = canBeDouble ? this.cleanWord[i] + this.cleanWord[i+1] : null;

      if (this.posibleElements.includes(single) || (canBeDouble && this.posibleElements.includes(double)))
        this.userWord.parts[i] = this.emptyPart;
      else if (!ignoreSingleLetter.includes(i))
        this.userWord.parts[i] = new WordPart(null, this.word[i]);

      if (canBeDouble && this.posibleElements.includes(double)){
        this.userWord.parts[i+1] = this.emptyPart;
        ignoreSingleLetter.push(i+1);
      }
    }
  }

  private calculatePosibleElements(){
    let list = this.wordHelper.getPosibleElements(this.word);
    this.posibleElements = [];
    for (let i = 0; i < list.length; i++)
      this.posibleElements.push(list[i].symbol.toLowerCase());
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
