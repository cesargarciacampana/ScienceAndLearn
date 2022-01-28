import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { WordSearchModel } from '../../models/word-search.model';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent implements OnInit {

	@Input() wsModel: WordSearchModel;
  rowArray: number[];
  colArray: number[];

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
	this.rowArray = ArrayHelper.numberArray(this.wsModel.rows);
	this.colArray = ArrayHelper.numberArray(this.wsModel.cols);
  }

  getLetter(i: number, j: number){
	  return this.wsModel.grid[j + this.wsModel.cols * i];;
  }
}
