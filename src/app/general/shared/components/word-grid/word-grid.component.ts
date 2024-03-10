import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { WordGridModel } from '../../models/word-grid.model';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent implements OnInit {

  @Input() wordGridModel: WordGridModel;
  @Input() solve: boolean;
  rowArray: number[];
  colArray: number[];

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.rowArray = ArrayHelper.numberArray(this.wordGridModel.rows);
    this.colArray = ArrayHelper.numberArray(this.wordGridModel.cols);
  }

  getLetter(i: number, j: number){
    return this.wordGridModel.grid[j + this.wordGridModel.cols * i];;
  }
}
