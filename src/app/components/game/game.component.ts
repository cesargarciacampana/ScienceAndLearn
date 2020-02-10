import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GameWordComponent } from '../game.word/game-word.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  started = false;
  puntos = 0;

  constructor(
  ) { }

  @ViewChild(GameWordComponent, { static: false }) gameWordComponent: GameWordComponent;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  newWord(gameWord: GameWordComponent){
    this.started = true;
    gameWord.newWord();
  }

  cambiarPuntos(puntos: number){
    this.puntos += puntos;
  }
}
