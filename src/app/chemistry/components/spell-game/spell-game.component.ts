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
  current = 0;
  maxWords = 5;

  constructor (
  ) { }

  @ViewChild(SpellGameWordComponent, { static: true }) gameWordComponent: SpellGameWordComponent;

  ngOnInit() {
    this.info = new SpellGameInfo()
  }

  ngAfterViewInit() {
  }

  btnClick(){
    if (this.info.started && !this.gameWordComponent.wordCompleted){
      this.gameWordComponent.clue();
    }
    else{
      if (this.info.finished)
        this.info = new SpellGameInfo();

      const started = this.info.started;
      this.gameWordComponent.newWord().subscribe(dummy => {
      if (dummy && !started)
        this.checkTime();
      });
      if (!started){
        this.info.started = true;
        this.current = 0;
      }
      this.current++;
    }
  }

  private checkTime(){
    if (this.info.finished)
      return;

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

  wordCompleted(){
    this.info.words.push(this.gameWordComponent.userWord);

    if (this.current >= this.maxWords)
      this.info.finished = true;
  }
}
