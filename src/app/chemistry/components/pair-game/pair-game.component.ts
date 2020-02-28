import { Component, OnInit } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { RandomHelper } from '@shared/helpers/random.helper';
import { Card } from '@chem-shared/models/card';

@Component({
  selector: 'app-pair-game',
  templateUrl: './pair-game.component.html',
  styleUrls: ['./pair-game.component.css']
})
export class PairGameComponent implements OnInit {

  private nRows = 3;
  private nCols = 4;
  rows: Card[][];
  pending: Card = null;
  locked = false;

  constructor(
    private elementService: ElementService
  ) { }

  ngOnInit() {
    this.newGame();
  }

  newGame(){
    this.elementService.elementsObservable.subscribe((elementsDTO) =>{
      let elements = elementsDTO.elements;
      let list = [];
      let included = [];
      for (let i = 0; i < this.nRows * this.nCols / 2; i++){
        let random = RandomHelper.randomIntFromInterval(0, elements.length);
        while (included.includes(random))
          random = RandomHelper.randomIntFromInterval(0, elements.length);
        
        included.push(random);
        list.push(elements[i].symbol);
        list.push(elements[i].name);
      }

      this.rows = [];
      for (let i = 0; i < this.nRows; i++){
        this.rows.push([]);
        for (let j = 0; j < this.nCols; j++){
          let random =  RandomHelper.randomIntFromInterval(0, list.length);
          while(!list[random]){
            random++;
            if (random >= list.length)
              random = 0;
          }
          this.rows[i].push(new Card(list[random]));
          list[random] = null;
        }
      }
    });
  }

  isMatch(card1: Card, card2: Card){
    if ((card1.text.length > 2 && card2.text.length > 2)
      || (card1.text.length <= 2 && card2.text.length <= 2)){
      return false;
    }

    let symbol = card1.text.length <= 2 ? card1.text : card2.text;
    let element = this.elementService.findElement(symbol);
    return (card1.text == element.symbol || card1.text == element.name)
      && (card2.text == element.symbol || card2.text == element.name);
  }

  select(card: Card){
    if (this.locked || card.selected || card.solved)
      return;

    this.locked = true;
    
    card.selected = true;
    if (!this.pending){
      this.pending = card;
      this.locked = false;
    }
    else{
      if (this.isMatch(card, this.pending))
      {
        card.solved = true;
        card.selected = false;
        this.pending.solved = true;
        this.pending.selected = false;
        this.pending = null;
        this.locked = false;
      }
      else{
        const that = this;
        setTimeout(() => {
          card.selected = false;
          this.pending.selected = false;
          this.pending = null;
          this.locked = false;
        }, 500)
      }
    }
  }
}
