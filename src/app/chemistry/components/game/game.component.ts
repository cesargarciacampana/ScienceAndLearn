import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GameWordComponent } from '../game.word/game-word.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  started = false;
  points = 0;
  seconds = 0;

  constructor (
  ) { }

  @ViewChild(GameWordComponent, { static: false }) gameWordComponent: GameWordComponent;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  newWord(gameWord: GameWordComponent){
    this.started = true;
    gameWord.newWord().subscribe(dummy => {
      this.checkTime();
    });
  }

  private checkTime(){
    const that = this;
    setTimeout(function(){
      {
        that.seconds += 1;
        that.checkTime();
      }
    }, 1000);
  }

  changePoints(points: number){
    this.points += points;
  }
}
