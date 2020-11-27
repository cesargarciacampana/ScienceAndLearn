import { Component, Input, OnInit } from '@angular/core';
import { ArrayHelper } from '@shared/helpers/array.helper';
import { RandomHelper } from '@shared/helpers/random.helper';
import { StringHelper } from '@shared/helpers/string.helper';

const nDirections = 4;

enum WordDirection{
		HRight,
		HLeft,
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

  isPositionValid(index: number, direction: WordDirection , word: string){
    return true;
  }

	generateRandomPositionsList(direction: WordDirection, wordLength: number) : number[]{
		let list = [];
		let rowinit, rowend, colinit, colend;
		switch(direction){
			case WordDirection.HRight:
				rowinit = 0;
				rowend = this.rows - 1;
				colinit = 0;
				colend = this.cols - wordLength;
				break;
			case WordDirection.HLeft:
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
		this.wordPositions = new Array<WordPosition>(this.words.length);

    for (let i = 0; i < this.words.length; i++){
			let word = this.words[i];
			let wordPosition = new WordPosition();
			wordPosition.word = word;			
			wordPosition.directions = ArrayHelper.shuffleArray(ArrayHelper.numberArray(4));
			wordPosition.positions = new Array<number[]>(4);
			for(let j = 0; j < nDirections; j++)
				wordPosition.positions[j] = this.generateRandomPositionsList(wordPosition.directions[j], word.length);

				this.wordPositions[i] = wordPosition;
		}
		console.log(this.wordPositions);
	}

	calculateIndex(basePosition: number, direction: WordDirection, index: number){
		switch(direction){
			case WordDirection.HRight:
				return basePosition + index;
			case WordDirection.HLeft:
				return basePosition - index;
			case WordDirection.VDown:
				return basePosition + this.cols * index;
			case WordDirection.VUp:
				return basePosition - this.cols * index;
		}
	}

	placeWord(position: number, direction: WordDirection, word: string){
		for (let j = 0; j < word.length; j++){
			let index = this.calculateIndex(position, direction, j);
			this.grid[index] = StringHelper.removeAccents(word[j]).toUpperCase();
		}
	}

	placeWords(){
		let size = this.words.length;
		let placed = new Array<boolean>();

		let wordIndex = 0;
		while (wordIndex < size){
			let word = this.words[wordIndex];
			let wordPosition = this.wordPositions[wordIndex];
			let directionIndex = 0;
			while(!placed[wordIndex] && directionIndex < nDirections)
			{
				let positionIndex = 0;		
				let positions = wordPosition.positions[directionIndex];
				
				while(positions.length > 0 && !placed[wordIndex] && positionIndex < nDirections){
					let position = positions[positionIndex];
					let direction = wordPosition.directions[directionIndex];
					if (this.isPositionValid(position, direction, word)){
						this.placeWord(position, direction, word);
						placed[wordIndex] = true;
					}
					positionIndex++;
				}
				directionIndex++;
			}
			wordIndex++;
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
