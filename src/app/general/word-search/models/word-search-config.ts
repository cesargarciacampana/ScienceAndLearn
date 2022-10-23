export class WordSearchConfig{
	rows: number;
	cols: number;
	nDirections: number;
	words: string[]

	constructor(rows: number, cols: number, nDirections: number, words: string[]){
		this.rows = rows;
		this.cols = cols;
		this.nDirections = nDirections;
		this.words = words;
	}

	public isValid(){
		return this.rows > 0 && this.cols > 0 && this.nDirections > 0 && this.words && this.words.length > 0;
	}

	public Serialize() : string{
		var temp = this.words.join(',');
		return `${temp}-${this.rows}-${this.cols}-${this.nDirections}`;
	}

	public static Deserialize(from: string) : WordSearchConfig{
		if (!from)
			return null;

		var temp = from.split('-');
		if (temp.length < 4)
			return null;

		return new WordSearchConfig(Number(temp[1]), Number(temp[2]), Number(temp[3]), temp[0].split(','));
	}
}