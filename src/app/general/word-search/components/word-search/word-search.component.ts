import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordService } from '@chem-shared/services/word.service';
import { WordSearchConfig } from '../../models/word-search-config';
import { WordSearchResultComponent } from '../word-search-result/word-search-result.component';

export enum Generate{
    Random = 0,
    User = 1
}

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})

export class WordSearchComponent implements OnInit {

	allowRandomGenerate = false;
	wsConfig: WordSearchConfig;
	nWords = 5;

	words: string[];
	userWords: string[] = new Array(this.nWords);

	Generate: any = Generate;
	generateWords: Generate = Generate.User;

  constructor(
    private wordService : WordService,
	private router: Router,
	private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
	this.wsConfig = new WordSearchConfig(10, 15, 2, []);
  }

  resetWords(){
	this.words = null;
  }

  onGenerateChanged(){
	this.resetWords();
  }

  customTrackBy(index: number, obj: any): any {
	return index;
}

  newWord(){
	this.userWords.push('');
  }

  deleteWord(){
	if(this.userWords.length > 0)
		this.userWords.splice(this.userWords.length - 1, 1);
  }

  generate(){
	this.wsConfig.words = this.words;
	this.router.navigateByUrl(`/word-search-result?${WordSearchResultComponent.wsConfigParamName}=${this.wsConfig.Serialize()}`);
  }

  btnClick(){
	this.resetWords();

	if (this.generateWords == Generate.Random){
		this.wordService.randomWords(this.nWords).subscribe(
			data => {
				this.words = data
				this.generate();
			}
		  );
	}
	else{
		var temp = [];
		for(var word of this.userWords)
		{
			if (word)	
			temp.push(word);
		}
		if (temp.length > 0){
			this.words = temp;
			this.generate();
		}
		else{
			this.snackBar.open("Debes introducir al menos una palabra", null, 
				{ 
					duration: 1500, 
					verticalPosition: 'top'
				});
		}
	}
  }
}
