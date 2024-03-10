import { Component, Input, OnInit } from '@angular/core';
import { WordList } from '../models/word-list';

@Component({
  selector: 'app-word-list-input',
  templateUrl: './word-list-input.component.html',
  styleUrls: ['./word-list-input.component.css']
})
export class WordListInputComponent implements OnInit {

  @Input()
  wordList: WordList;

  @Input()
  showSettings: () => void;

  constructor() { }

  ngOnInit(): void {
  }

  
  newWord(){
	  this.wordList.words.push('');
  }

  deleteWord(){
    if(this.wordList.words.length > 0)
      this.wordList.words.splice(this.wordList.words.length - 1, 1);
  }

  ShowSettingsClick(){
	  this.showSettings();
  }

  customTrackBy(index: number, obj: any): any {
	  return index;
  }
}
