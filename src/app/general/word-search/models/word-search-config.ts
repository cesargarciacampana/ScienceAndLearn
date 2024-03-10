import { ActivatedRoute } from "@angular/router";
import { WordList } from "./word-list";

export class WordSearchConfig implements WordList{
	rows: number;
	cols: number;
	nDirections: number;
	words: string[]

	public static readonly paramKey = 'c';

	constructor(rows: number, cols: number, nDirections: number, words: string[]){
		this.rows = rows;
		this.cols = cols;
		this.nDirections = nDirections;
		this.words = words;
	}

	public isValid(){
		return this.rows > 0 && this.cols > 0 && this.nDirections > 0 && this.words && this.words.length > 0;
	}

	public static getFromQueryString(actRoute: ActivatedRoute){
		var wsConfigString = actRoute.snapshot.queryParamMap.get(this.paramKey);
		var wsConfig = this.Deserialize(wsConfigString);
		if (wsConfig && wsConfig.isValid())
			return wsConfig;
		else
			return null;
	}

	public Serialize() : string{
		var temp = this.words.join(',');
		return `${temp}-${this.rows}-${this.cols}-${this.nDirections}`;
	}

	private static Deserialize(from: string) : WordSearchConfig{
		if (!from)
			return null;

		var temp = from.split('-');
		if (temp.length < 4)
			return null;

		return new WordSearchConfig(Number(temp[1]), Number(temp[2]), Number(temp[3]), temp[0].split(','));
	}
}