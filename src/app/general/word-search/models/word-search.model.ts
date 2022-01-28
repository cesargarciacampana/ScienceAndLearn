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

export class WordSearchModel{
	rows: number;
	cols: number;
	grid: string[];

    constructor(rows: number, cols: number){
		this.rows = rows;
		this.cols = cols;

		let size = rows * cols;
		this.grid = new Array(size);
    }
}