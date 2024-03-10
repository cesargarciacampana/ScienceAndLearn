import { ActivatedRoute } from "@angular/router";
import { WordList } from "./word-list";

export class CrosswordConfig implements WordList{
	rows: number;
	cols: number;
	words: string[]

	public static readonly paramKey = 'c';

	constructor(rows: number, cols: number, words: string[]){
		this.rows = rows;
		this.cols = cols;
		this.words = words;
	}

	public isValid(){
		return this.rows > 0 && this.cols > 0 && this.words && this.words.length > 0;
	}

	public static getFromQueryString(actRoute: ActivatedRoute){
		var crosswordConfigString = actRoute.snapshot.queryParamMap.get(this.paramKey);
		var croswordConfig = this.Deserialize(crosswordConfigString);
		if (croswordConfig && croswordConfig.isValid())
			return croswordConfig;
		else
			return null;
	}

	public Serialize() : string{
		var temp = this.words.join(',');
		return `${temp}-${this.rows}-${this.cols}`;
	}

	private static Deserialize(from: string) : CrosswordConfig{
		if (!from)
			return null;

		var temp = from.split('-');
		if (temp.length < 3)
			return null;

		return new CrosswordConfig(Number(temp[1]), Number(temp[2]), temp[0].split(','));
	}
}