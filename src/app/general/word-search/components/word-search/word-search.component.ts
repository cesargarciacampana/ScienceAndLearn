import { Component, OnInit } from '@angular/core';
import { WordService } from '@chem-shared/services/word.service';
import { WordSearchHelper } from '../../helpers/word-search.helper';
import { WordSearchModel } from '../../models/word-search.model';
import { WordGridComponent } from '../word-grid/word-grid.component';

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

	rows = 10;
	cols = 15;
	nDirections = 2;
	nWords = 8;
	
	wsModel: WordSearchModel;
	words: string[];
	userWords: string[] = [''];

	Generate: any = Generate;
	generateWords: Generate = Generate.User;

  constructor(
    private wordService : WordService,
	private wordSearchHelper : WordSearchHelper
  ) { }

  ngOnInit(): void {
    
  }

  resetWords(){
	this.words = null;
	this.wsModel = null;
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

  btnClick(){
	this.resetWords();

	if (this.generateWords == Generate.Random){
		this.wordService.randomWords(this.nWords).subscribe(
			data => {
				this.words = data
				this.wsModel = this.wordSearchHelper.generate(this.rows, this.cols, this.words, this.nDirections);
			}
		  );
	}
	else{
		this.words = this.userWords;
		this.wsModel = this.wordSearchHelper.generate(this.rows, this.cols, this.words, this.nDirections);
	}
  }
}
