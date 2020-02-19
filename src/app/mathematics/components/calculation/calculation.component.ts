import { Component, OnInit } from '@angular/core';
import { RandomHelper } from '@shared/helpers/random.helper';
import { FormulaHelper } from '@math-shared/helpers/formula.helper';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  formula: string;
  results: number[];

  constructor() { }

  ngOnInit() {
    this.newFormula();
  }

  private randomOperation(){
    return FormulaHelper.operations[RandomHelper.randomIntFromInterval(1, FormulaHelper.operations.length)];
  }

  newFormula(){
    let nElements = 5;
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
    let results = [];
    let rightPos = RandomHelper.randomIntFromInterval(0, nResults);
    let rightValue = FormulaHelper.parse(this.formula);
    while(results.length < nResults){
      let value;
      if (results.length == rightPos)
        value = rightValue;
      else
        value = rightValue + RandomHelper.randomIntFromInterval(-15, 15);

      if (!results.includes(value))
        results.push(value);
    }
    this.results = results;
  }
}
