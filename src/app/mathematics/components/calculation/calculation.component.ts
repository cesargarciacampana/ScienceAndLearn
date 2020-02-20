import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RandomHelper } from '@shared/helpers/random.helper';
import { FormulaHelper } from '@math-shared/helpers/formula.helper';
import { Result } from '@math-shared/models/result';
import { FormulaOptions } from '@math-shared/models/formula-options';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  formula: string;
  results: Result[];
  optionSelected = false;

  @Output() Selected = new EventEmitter<Result>()

  constructor() { }

  ngOnInit() {
    
  }

  private randomOperation(operations: string[]){
    return operations[RandomHelper.randomIntFromInterval(1, operations.length)];
  }

  newFormula(options: FormulaOptions){
    this.optionSelected = false;

    let formula = '';
    for(let i = 0; i < options.nElements; i++){
      formula += 
        RandomHelper.randomIntFromInterval(options.minNumber, options.maxNumber + 1);
      if (i < options.nElements - 1)
        formula += this.randomOperation(options.operations);
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

    this.Selected.emit(result);
  }
}
