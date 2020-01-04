import { Component, OnInit } from '@angular/core';
import { WordService } from '../../services/word.service';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  word;
  solvedWords;

  constructor(
    private wordService : WordService,
    private elementService : ElementService,
  ) { }

  ngOnInit() {
  }

  newGame() {
    this.word = this.wordService.randomWord();
    let list = [];
    this.calculateElements(list, this.word, '')
    this.solvedWords = list;
  }

  private calculateElements(list : String[], word : String, prefix : String){
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
          this.calculateElements(list, word.substring(i + 2), calculated + '[' + element2.symbol + ']');
          let element3 = this.findElement(next);
          if (!element3)
            return;
        }
        calculated += current;
      }
      else{
        if (element2)
          this.calculateElements(list, word.substring(i + 2), calculated + '[' + element2.symbol + ']');

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
