import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { RandomHelper } from '@shared/helpers/random.helper';
import { Card } from '@chem-shared/models/card';
import { PairGameInfo } from '@chem-shared/models/pair-game-info';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { TimerComponent } from '@main/timer/timer.component';

@Component({
  selector: 'app-pair-game',
  templateUrl: './pair-game.component.html',
  styleUrls: ['./pair-game.component.css']
})
export class PairGameComponent implements OnInit {

  info = new PairGameInfo(0, 0);
  locked = false;

  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

  constructor(
    private elementService: ElementService
  ) { }

  ngOnInit() {
    this.elementService.elementsObservable.subscribe((dummy) => {});
  }

  btnClick(){
    this.newGame();
  }

  newGame(){
    this.info = new PairGameInfo(3, 4);
    this.elementService.elementsObservable.subscribe((elementsDTO) =>{
      this.randomizeCards(elementsDTO.elements);
      this.info.started = true;
    });
  }

  randomizeCards(elements: ElementDTO[]){
    let list = [];
    let included = [];
    for (let i = 0; i < this.info.nRows * this.info.nCols / 2; i++){
      let random = RandomHelper.randomIntFromInterval(0, elements.length);
      while (included.includes(random))
        random = RandomHelper.randomIntFromInterval(0, elements.length);
      
      included.push(random);
      list.push(elements[random].symbol);
      list.push(elements[random].name);
    }

    this.info.rows = [];
    for (let i = 0; i < this.info.nRows; i++){
      this.info.rows.push([]);
      for (let j = 0; j < this.info.nCols; j++){
        let random =  RandomHelper.randomIntFromInterval(0, list.length);
        while(!list[random]){
          random++;
          if (random >= list.length)
            random = 0;
        }
        this.info.rows[i].push(new Card(list[random]));
        list[random] = null;
      }
    }
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

    if (!this.timer.started)
    {
      this.timer.reset();
      this.timer.start();
    }
    this.locked = true;
    
    card.selected = true;
    if (!this.info.pending){
      this.info.pending = card;
      this.locked = false;
    }
    else{
      this.info.moves++;
      if (this.isMatch(card, this.info.pending))
      {
        card.solved = true;
        card.selected = false;
        this.info.pending.solved = true;
        this.info.pending.selected = false;
        this.info.pending = null;
        this.locked = false;
        if (this.isFinished())
          this.endGame();
      }
      else{
        const that = this;
        setTimeout(() => {
          card.selected = false;
          this.info.pending.selected = false;
          this.info.pending = null;
          this.locked = false;
        }, 500)
      }
    }
  }

  tick(seconds:number){
    this.info.seconds = seconds;
  }

  isFinished(){
    for (let i = 0; i < this.info.nRows; i++){
      for (let j = 0; j < this.info.nCols; j++){
        if (!this.info.rows[i][j].solved)
          return false;
      }
    }
    return true;
  }

  endGame(){
    this.info.finished = true;
    this.info.points = 1000 - this.info.moves; //Fix order in stats page
    this.timer.stop();
  }
}
