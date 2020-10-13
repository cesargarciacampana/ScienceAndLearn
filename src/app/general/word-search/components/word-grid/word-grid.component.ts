import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { RandomHelper } from '@shared/helpers/random.helper';
import { StringHelper } from '@shared/helpers/string.helper';

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

  isPositionValid(index: number, length: number){
    return (index + length) % this.cols > index % this.cols;
  }

  isPositionUsed(used: Array<number>, start: number, length: number){
    for(let i = start; i < start + length; i++)
    {
      if (used.indexOf(i) >= 0)
        return true;
    }
    return false;
  }

  placeWords(){
    let indexes = [];
    let size = this.rows * this.cols;

    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let index = RandomHelper.randomIntFromInterval(0, size);
      while (!this.isPositionValid(index, word.length)
        || this.isPositionUsed(indexes, index, word.length)){
        index = RandomHelper.randomIntFromInterval(0, size);
      }

      for (let j = 0; j < word.length; j++){
        this.grid[index + j] = StringHelper.removeAccents(word[j]).toUpperCase();
        indexes.push(index + j);
      }
    }
  }

  inicializar(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let size = this.rows * this.cols;
    this.grid = new Array(size);
    
    this.placeWords();

    for (let i = 0; i < size; i++){
      if (!this.grid[i])
        this.grid[i] = chars[RandomHelper.randomIntFromInterval(0, chars.length)];
    }
  }
}
