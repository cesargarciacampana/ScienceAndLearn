import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { RandomHelper } from '@shared/helpers/random.helper';
import { StringHelper } from '@shared/helpers/string.helper';

const nDirections = 4;

enum WordDirection{
		HLeft,
		HRight,
		VDown,
		VUp
}

class WordPosition{
	word: string;
	directions: WordDirection[];
	positions: number[][];
}

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

	private wordPositions: WordPosition[];

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

	generateRandomPositionsList(direction: WordDirection, wordLength: number) : number[]{
		let list = [];
		let rowinit, rowend, colinit, colend;
		switch(direction){
			case WordDirection.HLeft:
				rowinit = 0;
				rowend = this.rows - 1;
				colinit = 0;
				colend = this.cols - wordLength;
				break;
			case WordDirection.HRight:
				rowinit = 0;
				rowend = this.rows - 1;
				colinit = wordLength - 1;
				colend = this.cols - 1;
				break;
			case WordDirection.VDown:
				rowinit = 0;
				rowend = this.rows - wordLength;
				colinit = 0;
				colend = this.cols - 1;
				break;
			case WordDirection.VUp:
				rowinit = wordLength - 1;
				rowend = this.rows - 1;
				colinit = 0;
				colend = this.cols - 1;
				break;
		}
		for (let i = rowinit; i <= rowend; i++){
			for (let j = colinit; j <= colend; j++){
				list.push(j + this.cols * i);
			}
		}
		list = ArrayHelper.shuffleArray(list);
		return list;
	}

	generateAllPossibleWordPositions(){
		this.wordPositions = new Array(this.words.length);

    for (let i = 0; i < this.words.length; i++){
			let word = this.words[i];
			let wordPosition = new WordPosition();
			wordPosition.word = word;			
			wordPosition.directions = ArrayHelper.shuffleArray(ArrayHelper.numberArray(4));
			wordPosition.positions = new Array(4);
			for(let j = 0; j < nDirections; j++)
				wordPosition.positions[j] = this.generateRandomPositionsList(wordPosition.directions[j], word.length);

				this.wordPositions[i] = wordPosition;
		}
		console.log(this.wordPositions);
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
		
		this.generateAllPossibleWordPositions();
    this.placeWords();

    for (let i = 0; i < size; i++){
      if (!this.grid[i])
        this.grid[i] = chars[RandomHelper.randomIntFromInterval(0, chars.length)];
    }
  }
}
