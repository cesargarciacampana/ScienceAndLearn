import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SpellGameWordComponent } from '../spell-game-word/spell-game-word.component';
import { SpellGameInfo } from '../../shared/models/spell-game-info';

@Component({
  selector: 'app-spellgame',
  templateUrl: './spell-game.component.html',
  styleUrls: ['./spell-game.component.css']
})
export class SpellGameComponent implements OnInit {

  info: SpellGameInfo;

  constructor (
  ) { }

  @ViewChild(SpellGameWordComponent, { static: false }) gameWordComponent: SpellGameWordComponent;

  ngOnInit() {
    this.info = new SpellGameInfo()
  }

  ngAfterViewInit() {
  }

  btnClick(gameWord: SpellGameWordComponent){
    const started = this.info.started;
    if (started && !gameWord.wordCompleted){
      gameWord.clue();
    }
    else{
      this.info = new SpellGameInfo();
      gameWord.newWord().subscribe(dummy => {
        if (dummy && !started)
          this.checkTime();
      });
      this.info.started = true;
    }
  }

  private checkTime(){
    const that = this;
    setTimeout(function(){
      {
        that.info.seconds += 1;
        that.checkTime();
      }
    }, 1000);
  }

  changePoints(points: number){
    this.info.points += points;
  }
}
