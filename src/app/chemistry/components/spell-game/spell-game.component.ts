import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SpellGameWordComponent } from '../spell-game-word/spell-game-word.component';

@Component({
  selector: 'app-spellgame',
  templateUrl: './spell-game.component.html',
  styleUrls: ['./spell-game.component.css']
})
export class SpellGameComponent implements OnInit {

  started = false;
  points = 0;
  seconds = 0;

  constructor (
  ) { }

  @ViewChild(SpellGameWordComponent, { static: false }) gameWordComponent: SpellGameWordComponent;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  btnClick(gameWord: SpellGameWordComponent){
    const started = this.started;
    if (started && !gameWord.wordCompleted){
      gameWord.clue();
    }
    else{
      gameWord.newWord().subscribe(dummy => {
        if (dummy && !started)
          this.checkTime();
      });
      this.started = true;
    }
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
