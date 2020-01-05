import { Component, OnInit } from '@angular/core';
import { WordService } from '../../shared/services/word.service';
import { WordHelper } from '../../shared/helpers/word.helper';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  word;
  solvedWords;

  constructor(
    private wordService : WordService,
    private wordHelper : WordHelper,
  ) { }

  ngOnInit() {
  }

  newGame() {
    this.word = this.wordService.randomWord();
    this.solvedWords = this.wordHelper.calculateElements(this.word);
  }
}
