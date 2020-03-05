import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { RandomHelper } from '@shared/helpers/random.helper';
import { Card } from '@chem-shared/models/card';
import { PairGameInfo, Difficulty } from '@chem-shared/models/pair-game-info';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { TimerComponent } from '@main/timer/timer.component';
import { PairGameOptionsComponent } from '@chem/pair-game-options/pair-game-options.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-pair-game',
  templateUrl: './pair-game.component.html',
  styleUrls: ['./pair-game.component.css']
})
export class PairGameComponent implements OnInit {

  info = new PairGameInfo(0, 0);
  locked = false;

  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

  private easyElements = [ 'O', 'C', 'H', 'N', 'Ca', 'P', 'K', 'S', 'Na', 'Cl', 'Fe', 'Al', 'Au', 'Ag' ];
  private normalElements = this.easyElements.concat(['He', 'Li', 'F', 'Cu', 'Ar', 'I', 'Si', 'Hg', 'Zn', 'Cr']);

  constructor(
    private elementService: ElementService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.elementService.elementsObservable.subscribe((dummy) => {});
  }

  btnClick(){
    this.newGame();
  }

  newGame(){
    let data = { level: null, card1: null, card2: null };
    this.bottomSheet.open(PairGameOptionsComponent, { data: data} )
      .afterDismissed().subscribe(() => {
        if (data.level != null){
          let nRows, nCols, elements = null;
          switch(data.level){
            case Difficulty.Easy:
              nRows = 3;
              nCols = 4;
              elements = this.easyElements;
              break;
            case Difficulty.Normal:
              nRows = 3;
              nCols = 8;
              elements = this.normalElements;
              break;
            case Difficulty.Hard:
              nRows = 4;
              nCols = 10;
              break;
          }
          this.info = new PairGameInfo(nRows, nCols);
          this.info.level = data.level;
          this.info.card1 = data.card1;
          this.info.card2 = data.card2;
          this.elementService.elementsObservable.subscribe((elementsDTO) =>{
            this.randomizeCards(elementsDTO.elements, elements, data.card1, data.card2);
            this.info.started = true;
          });
        }
      });
  }

  randomizeCards(elements: ElementDTO[], allowedSymbols: string[], card1: string, card2: string){
    let list = [];
    let included = [];

    if (allowedSymbols){
      let temp = [];
      for(let i = 0; i < allowedSymbols.length; i++){
        temp.push(this.elementService.findElement(allowedSymbols[i]));
      }
      elements = temp;
    }

    for (let i = 0; i < this.info.nRows * this.info.nCols / 2; i++){
      let random = RandomHelper.randomIntFromInterval(0, elements.length);
      while (included.includes(random))
        random = RandomHelper.randomIntFromInterval(0, elements.length);
      
      included.push(random);
      list.push(new Card(elements[random], card1));
      list.push(new Card(elements[random], card2));
    }

    this.info.cards = [];
    for (let i = 0; i < this.info.nRows; i++){
      for (let j = 0; j < this.info.nCols; j++){
        let random =  RandomHelper.randomIntFromInterval(0, list.length);
        this.info.cards.push(list[random]);
        list.splice(random, 1);
      }
    }
  }

  isMatch(card1: Card, card2: Card){
    return card1.element.symbol == card2.element.symbol;
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
    for (let i = 0; i < this.info.cards.length ; i++){
      if (!this.info.cards[i].solved)
        return false;
    }
    return true;
  }

  endGame(){
    this.info.finished = true;
    this.info.points = 1000 - this.info.moves; //Fix order in stats page
    this.timer.stop();
  }
}
