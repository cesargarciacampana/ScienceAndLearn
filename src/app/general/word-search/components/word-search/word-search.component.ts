import { Component, OnInit } from '@angular/core';
import { WordService } from '@chem-shared/services/word.service';

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
	
  words: string[];

  constructor(
    private wordService : WordService
  ) { }

  ngOnInit(): void {
    this.wordService.randomWords(this.nWords).subscribe(
      data => this.words = data
    );
  }

}
