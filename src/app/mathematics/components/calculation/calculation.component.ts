import { Component, OnInit } from '@angular/core';
import { RandomHelper } from '@shared/helpers/random.helper';
import { FormulaHelper } from '@math-shared/helpers/formula.helper';
import { Result } from '@math-shared/models/result';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  formula: string;
  results: Result[];
  optionSelected = false;

  constructor() { }

  ngOnInit() {
    this.newFormula();
  }

  private randomOperation(){
    return FormulaHelper.operations[RandomHelper.randomIntFromInterval(1, FormulaHelper.operations.length)];
  }

  newFormula(){
    this.optionSelected = false;

    let nElements = 3;
    let minNumber = 1;
    let maxNumber = 9;

    let formula = '';
    for(let i = 0; i < nElements; i++){
      formula += 
        RandomHelper.randomIntFromInterval(minNumber, maxNumber + 1);
      if (i < nElements - 1)
        formula += this.randomOperation();
    }
    this.formula = formula;

    this.generateResults();
  }

  private generateResults(){
    let nResults = 4;
    let values = [];
    let results = [];
    let rightPos = RandomHelper.randomIntFromInterval(0, nResults);
    let rightValue = FormulaHelper.parse(this.formula);
    while(results.length < nResults){
      let value;
      if (results.length == rightPos && !values.includes(rightValue))
        value = rightValue;
      else
        value = rightValue + RandomHelper.randomIntFromInterval(-15, 15);

      if (!values.includes(value)){
        values.push(value);
        let result = new Result();
        result.value = value;
        result.correct = value === rightValue;
        result.selected = false;
        results.push(result);
      }
    }
    this.results = results;
  }

  selectResult(result: Result){
    if (this.optionSelected)
      return;

    result.selected = true;
    this.optionSelected = true;

    const that = this;
    setTimeout(function(){
      that.newFormula();
    }, 1000);
  }
}
