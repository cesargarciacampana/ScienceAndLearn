import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  word;

  constructor(
    private wordService : WordService
  ) { }

  ngOnInit() {
  }

  newGame() {
    this.word = this.wordService.randomWord();
  }
}
