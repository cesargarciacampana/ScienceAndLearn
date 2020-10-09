import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { RandomHelper } from '@shared/helpers/random.helper';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent implements OnInit {

  rows = 10;
  cols = 20;
  rowArray = ArrayHelper.numberArray(this.rows);
  colArray = ArrayHelper.numberArray(this.cols);

  grid: string[];

  @Input() words: string[];

  constructor() { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.grid = [];
    for (let i = 0; i < this.rows * this.cols; i++){
      this.grid.push(chars[RandomHelper.randomIntFromInterval(0, chars.length)]);
    }
  }
}
