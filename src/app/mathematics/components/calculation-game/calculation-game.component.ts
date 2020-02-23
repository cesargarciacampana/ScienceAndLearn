import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from '@math-shared/models/result';
import { CalculationComponent } from '@math/calculation/calculation.component';
import { FormulaHelper } from '@math-shared/helpers/formula.helper';
import { FormulaOptions } from '@math-shared/models/formula-options';

@Component({
  selector: 'app-calculation-game',
  templateUrl: './calculation-game.component.html',
  styleUrls: ['./calculation-game.component.css']
})
export class CalculationGameComponent implements OnInit {

  level: number;
  seconds: number;
  points: number;
  started: boolean;
  finished: boolean;

  numSuccess: number;
  numFails: number;

  private defaultOperations = FormulaHelper.operations;
  private levelOptions = [
    new FormulaOptions(2, 1, 9, [ '+', '-' ]),
    new FormulaOptions(2, 1, 6, this.defaultOperations),
    new FormulaOptions(2, 2, 9, this.defaultOperations),
    new FormulaOptions(3, 1, 6, this.defaultOperations),
    new FormulaOptions(3, 2, 9, this.defaultOperations),
    new FormulaOptions(4, 1, 6, this.defaultOperations),
    new FormulaOptions(3, 4, 11, this.defaultOperations),
    new FormulaOptions(3, 6, 13, this.defaultOperations),
    new FormulaOptions(3, 8, 15, this.defaultOperations),
    new FormulaOptions(3, 11, 19, this.defaultOperations),
    new FormulaOptions(4, 8, 15, this.defaultOperations),
    new FormulaOptions(4, 11, 19, this.defaultOperations),
    new FormulaOptions(5, 8, 15, this.defaultOperations),
    new FormulaOptions(5, 11, 19, this.defaultOperations),
    new FormulaOptions(6, 8, 15, this.defaultOperations),
    new FormulaOptions(6, 11, 19, this.defaultOperations),
    new FormulaOptions(7, 8, 15, this.defaultOperations),
    new FormulaOptions(7, 11, 19, this.defaultOperations),
    new FormulaOptions(8, 8, 15, this.defaultOperations),
    new FormulaOptions(8, 11, 19, this.defaultOperations),
    new FormulaOptions(9, 8, 15, this.defaultOperations),
    new FormulaOptions(9, 11, 19, this.defaultOperations),
    new FormulaOptions(10, 8, 15, this.defaultOperations),
    new FormulaOptions(10, 11, 19, this.defaultOperations)
  ];

  @ViewChild(CalculationComponent, {static:false}) calculation : CalculationComponent;

  constructor() { }

  ngOnInit() {
  }

  start(){
    this.level = 1;
    this.seconds = 30;
    this.points = 0;
    this.numSuccess = 0;
    this.numFails = 0;
    this.started = true;
    this.finished = false;

    //TODO
    const that = this;
    setTimeout(function()
    {
      that.newFormula();
      that.checkTime();
    }, 100);
  }

  private checkTime(){
    const that = this;
    if (that.seconds <= 0){
      this.endGame();
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

  newFormula(){
    let options = this.levelOptions[this.level - 1];
    this.calculation.newFormula(options);
  }

  selected(result: Result){
    if (result.correct){
      this.seconds += 5;
      this.points += 10;
      this.numSuccess++;
    }
    else{
      this.points -= 5;
      this.numFails++;
    }

    if (this.numSuccess % 5 == 0 && this.level < this.levelOptions.length)
      this.level++;

    const that = this;
    setTimeout(function(){
      that.newFormula();
    }, 500);
  }

  private endGame(){
    this.started = false;
    this.finished = true;
  }
}
