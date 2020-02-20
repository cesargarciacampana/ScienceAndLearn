import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from '@math-shared/models/result';
import { CalculationComponent } from '@math/calculation/calculation.component';

@Component({
  selector: 'app-calculation-game',
  templateUrl: './calculation-game.component.html',
  styleUrls: ['./calculation-game.component.css']
})
export class CalculationGameComponent implements OnInit {

  seconds: number;
  points: number;
  started = false;

  @ViewChild(CalculationComponent, {static:false}) calculation;

  constructor() { }

  ngOnInit() {
  }

  start(){
    this.seconds = 30;
    this.points = 0;
    this.started = true;
    if (this.calculation)
      this.calculation.newFormula();

    this.checkTime();
  }

  private checkTime(){
    const that = this;
    if (that.seconds <= 0){
      
    }
    else{
      setTimeout(function(){
        {
          that.seconds -= 1;
          that.checkTime();
        }
      }, 1000);
    }
  }

  selected(result: Result){
    if (result.correct){
      this.seconds += 5;
      this.points += 5;
    }
    else
      this.points -= 5;

    const that = this;
    setTimeout(function(){
      that.calculation.newFormula();
    }, 1000);
  }
}
