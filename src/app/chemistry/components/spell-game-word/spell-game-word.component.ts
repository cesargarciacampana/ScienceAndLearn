import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WordPart } from '@chem-shared/models/word-part';
import { ElementCheckable } from '../../shared/models/element-checkable';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { Word } from '@chem-shared/models/word';
import { WordService } from '@chem-shared/services/word.service';
import { WordHelper } from '@chem-shared/helpers/word.helper';
import { ElementSelectorComponent } from '../element-selector/element-selector.component';
import { StringHelper } from '@shared/helpers/string.helper';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-spellgameword',
  templateUrl: './spell-game-word.component.html',
  styleUrls: ['./spell-game-word.component.css']
})
export class SpellGameWordComponent implements OnInit {

  word : string;
  private cleanWord : string;
  userWord : Word;
  wordCompleted: boolean;
  wordPoints : number;
  private possibleElements : string[];

  private readonly emptyPart = new WordPart(null, '_');
  private readonly missingPoints = -5;
  private readonly matchingPoints = 20;
  private readonly minPossibleElements = 3;

  started = false;

  @Output() pointsChanged = new EventEmitter<number>();
  @Output() completed = new EventEmitter<any>();

  @ViewChild(ElementSelectorComponent, { static: false }) elementsComponent: ElementSelectorComponent;

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  newWord() : Observable<boolean> {
    this.userWord = null;
    this.started = true;
    if (this.word && !this.wordCompleted)
    {
      let remaining = this.GetRemainingLetterCount();
      let substraction = this.missingPoints * remaining;

      if (!window.confirm(`Se te restarán puntos por las letras que faltan, ¿quieres ir a la siguiente palabra?`))
        return of(false);

      this.changePoints(null, substraction, false);
      this.snackBar.open(`Faltaban ${remaining} letras, se te restan ${-substraction} puntos`
        , null,{ duration: 3000 });
    }
    return this.generateWord();
  }

  clue(){
    let elements = this.elementsComponent.sortedElements;
    for(let i = 0; i < this.possibleElements.length; i++){
      for (let j = 0; j < elements.length; j++){
        if (elements[j].element.symbol.toLowerCase() == this.possibleElements[i]){
          if (!elements[j].checked && this.elementSelected(elements[j], true))
            return;
          else
            break;
        }
      }
    }
  }

  private generateWord() : Observable<boolean>{
    return this.wordService.randomWord().pipe(
      mergeMap(word => {
          this.wordCompleted = false;
          this.word = word;
          this.cleanWord = StringHelper.removeAccents(word);
          let possibleElements = this.calculatePossibleElements(this.cleanWord);

          if (possibleElements.length < this.minPossibleElements){
            return this.generateWord();
          }

          this.userWord = new Word();
          this.wordPoints = 0;
          this.possibleElements = possibleElements;
          this.calculateEmptyParts();
          if (this.elementsComponent)
            this.elementsComponent.reset();
          return of(true);
        }
      )
    );
  }

  private isElementPart(part: WordPart){
    return part && (part.isElement || part.plainSymbol === '');
  }

  private isDoubleLetter(element: ElementDTO){
    return element && element.symbol.length > 1;
  }

  elementSelected(event: ElementCheckable, isClue = false) : boolean{
    let element : ElementDTO = event.element;
    let checked : boolean = event.checked;

    if (!isClue && !checked){
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
      if (this.possibleElements.includes(lowerSymbol)){
        let parts = this.userWord.parts;
        for (let i=0; i < parts.length; i++){
          if (!this.isDoubleLetter(element)){
            if (!this.isElementPart(parts[i]) && this.cleanWord[i] == lowerSymbol){      
              parts[i] = new WordPart(element, null, isClue);
              this.changePoints(event, isClue ? this.missingPoints : this.matchingPoints, true);
              if (isClue){
                  event.checked = true;
                  event.isClue = true;
              }
            }
          }
          else if (parts.length > i + 1){
            if (!this.isElementPart(parts[i]) && !this.isElementPart(parts[i+1]) 
              && this.cleanWord[i] == lowerSymbol[0]
              && this.cleanWord[i + 1] == lowerSymbol[1]){
                parts[i+1] = new WordPart(null, '');
                parts[i] = new WordPart(element, null, isClue);
                this.changePoints(event, isClue ? this.missingPoints : this.matchingPoints, true);
                if (isClue){
                  event.checked = true;
                  event.isClue = true;
                }
            }
          }
        }
      }
      
      if (!event.valid && !isClue)
        this.changePoints(event, this.missingPoints, false);
    }
    
    if (!isClue || (isClue && event.valid))
      this.calculateEmptyParts();

    if (event.valid)
      this.checkIfCompleted();

    return event.valid;
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

      if (this.possibleElements.includes(single) || (canBeDouble && this.possibleElements.includes(double)))
        this.userWord.parts[i] = this.emptyPart;
      else if (!ignoreSingleLetter.includes(i))
        this.userWord.parts[i] = new WordPart(null, this.word[i]);

      if (canBeDouble && this.possibleElements.includes(double)){
        this.userWord.parts[i+1] = this.emptyPart;
        ignoreSingleLetter.push(i+1);
      }
    }
  }

  private calculatePossibleElements(word: string){
    let list = this.wordHelper.getPossibleElements(word);
    let possibleElements = [];
    for (let i = 0; i < list.length; i++)
      possibleElements.push(list[i].symbol.toLowerCase());
    return possibleElements;
  }

  private changePoints(event: ElementCheckable, points: number, valid: boolean){
    if (event){
      event.valid = valid;
      event.points += points;
    }
    this.wordPoints += points;
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
    this.completed.emit();
  }
}
