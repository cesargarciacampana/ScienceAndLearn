import { Component, OnInit, ViewChild } from '@angular/core';
import { Result } from '@math-shared/models/result';
import { CalculationComponent } from '@math/calculation/calculation.component';
import { FormulaHelper } from '@math-shared/helpers/formula.helper';
import { FormulaOptions } from '@math-shared/models/formula-options';
import { CalculationGameInfo } from '@math-shared/models/calculation-game-info';
import { TimerComponent } from '@main/timer/timer.component';

@Component({
  selector: 'app-calculation-game',
  templateUrl: './calculation-game.component.html',
  styleUrls: ['./calculation-game.component.css']
})
export class CalculationGameComponent implements OnInit {

  info : CalculationGameInfo;

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
  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;
  
  constructor() { }

  ngOnInit() {
    this.info = new CalculationGameInfo()
  }

  start(){
    this.info.level = 1;
    this.info.seconds = 30;
    this.info.points = 0;
    this.info.numSuccess = 0;
    this.info.numFails = 0;
    this.info.started = true;
    this.info.finished = false;

    //TODO
    const that = this;
    setTimeout(function()
    {
      that.newFormula();
      that.timer.reset(30);
      that.timer.start(true);
    }, 100);
  }

  tick(seconds: number){
    this.info.seconds = seconds;
    if (seconds <= 0){
      this.endGame();
    }
  }

  newFormula(){
    let options = this.levelOptions[this.info.level - 1];
    this.calculation.newFormula(options);
  }

  selected(result: Result){
    if (result.correct){
      this.timer.addTime(5);
      this.info.points += 10;
      this.info.numSuccess++;
    }
    else{
      this.info.points -= 5;
      this.info.numFails++;
    }
    this.info.formula.push(`${this.calculation.formula}=${result.value}(${result.correct ? 1 : 0})`);

    if ((this.info.numSuccess + this.info.numFails) % 5 == 0 && this.info.level < this.levelOptions.length)
      this.info.level++;

    const that = this;
    setTimeout(function(){
      that.newFormula();
    }, 500);
  }

  private endGame(){
    this.timer.stop();
    this.info.started = false;
    this.info.finished = true;
  }
}
