export enum WordDirection{
	HRight,
	VDown,
	HLeft,
	VUp
}

export class WordPosition{
  word: string;
  directions: WordDirection[];
  positions: number[][];
}

export class PlacedWord{
  word: string;
  direction: WordDirection;
}

export class Letter{
	letter: string;
	isWord: boolean;
  words: PlacedWord[] = [];

	constructor(letter: string, isWord: boolean = false){
		this.letter = letter;
		this.isWord = isWord;
	}
}

export class WordGridModel{
	rows: number;
	cols: number;
	grid: Letter[];

    constructor(rows: number, cols: number){
      this.rows = rows;
      this.cols = cols;

      let size = rows * cols;
      this.grid = new Array(size);
    }
}