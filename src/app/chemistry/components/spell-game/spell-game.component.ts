import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SpellGameWordComponent } from '../spell-game-word/spell-game-word.component';
import { SpellGameInfo } from '../../shared/models/spell-game-info';
import { Observable } from 'rxjs';

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

      if (!this.info.started)
        this.newGame();
      else{
        this.newWord(false);
        this.current++;
      }   
    }
  }

  private newGame(){
    this.newWord(true);
    this.info.started = true;
    this.current = 1;
  }

  private newWord(newGame: boolean){
    return this.gameWordComponent.newWord().subscribe(dummy => {
      if (dummy && newGame)
        this.checkTime();
    });
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
