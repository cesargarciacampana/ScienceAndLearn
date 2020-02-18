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
  result: number;

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
    this.result = FormulaHelper.parse(this.formula);
  }
}
