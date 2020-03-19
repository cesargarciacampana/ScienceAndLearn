import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SpellGameWordComponent } from '../spell-game-word/spell-game-word.component';
import { SpellGameInfo, Difficulty } from '../../shared/models/spell-game-info';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { SpellGameOptionsComponent } from '@chem/spell-game-options/spell-game-options.component';
import { TimerComponent } from '@main/timer/timer.component';

@Component({
  selector: 'app-spellgame',
  templateUrl: './spell-game.component.html',
  styleUrls: ['./spell-game.component.css']
})
export class SpellGameComponent implements OnInit {

  info: SpellGameInfo;
  current = 0;
  maxWords = 5;

  Difficulty: any = Difficulty;

  private easyElements = [ 'O', 'C', 'H', 'N', 'Ca', 'P', 'K', 'S', 'Na', 'Cl', 'Fe', 'Al', 'Au', 'Ag' ];
  private normalElements = this.easyElements.concat(['He', 'Li', 'F', 'Cu', 'Ar', 'I', 'Si', 'Hg', 'Zn', 'Cr', 'U']);

  private availableElementsByLevel = [
    this.easyElements,
    this.normalElements,
    null //Hard (all elements)
  ]

  constructor (
    private bottomSheet: MatBottomSheet
  ) { }

  @ViewChild(SpellGameWordComponent, { static: true }) gameWordComponent: SpellGameWordComponent;
  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

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
      if (!this.info.started || this.info.finished)
        this.newGame();
      else{
        this.newWord(false);
        this.current++;
      }   
    }
  }

  private newGame(){
    let data = { level: null };
    this.bottomSheet.open(SpellGameOptionsComponent, { data: data} )
    .afterDismissed().subscribe(() => {
      if (data.level != null){
        if (this.info.finished)
          this.info = new SpellGameInfo();

        this.info.difficulty = data.level;
        this.newWord(true);
        this.info.started = true;
        this.current = 1;
        }
    });
  }

  private newWord(newGame: boolean){
    return this.gameWordComponent.newWord(
        this.availableElementsByLevel[this.info.difficulty]
      ).subscribe(dummy => {
      if (dummy && newGame){
        this.timer.reset();
        this.timer.start();
      }
    });
  }

  tick(seconds: number){
    if (this.info.finished)
      return;

    this.info.seconds = seconds;
    let substractPointsAfterSeconds = this.info.difficulty == Difficulty.Easy ? 5 : 2;
    if (seconds > 0 && seconds % substractPointsAfterSeconds == 0)
      this.info.points -= 1;
  }

  changePoints(points: number){
    this.info.points += points;
  }

  wordCompleted(){
    this.info.words.push(this.gameWordComponent.userWord);

    if (this.current >= this.maxWords){
      this.info.finished = true;
      this.timer.stop();
    }
  }

  difficultyText(difficulty: Difficulty){
    switch(difficulty){
      case Difficulty.Hard:
        return 'Difícil';
      case Difficulty.Normal:
        return 'Normal';
      case Difficulty.Easy:
        return 'Fácil';
    }
  }
}
