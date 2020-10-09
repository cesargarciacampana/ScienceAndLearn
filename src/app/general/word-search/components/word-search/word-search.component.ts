import { Component, OnInit } from '@angular/core';
import { WordService } from '@chem-shared/services/word.service';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})
export class WordSearchComponent implements OnInit {

  words: string[];

  constructor(
    private wordService : WordService
  ) { }

  ngOnInit(): void {
    this.wordService.randomWords(5).subscribe(
      data => this.words = data
    );
  }

}
