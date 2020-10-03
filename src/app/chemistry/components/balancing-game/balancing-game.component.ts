import { Component, OnInit, ViewChild } from '@angular/core';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';
import { BalancingGameInfo } from '@chem-shared/models/balancing-game-info';
import { TimerComponent } from '@main/timer/timer.component';
import { BalancingGameOptionsComponent } from '@chem/balancing-game-options/balancing-game-options.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-balancing-game',
  templateUrl: './balancing-game.component.html',
  styleUrls: ['./balancing-game.component.css']
})
export class BalancingGameComponent implements OnInit {

  info = new BalancingGameInfo();
  
  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(
    private ecuationHelper: EcuationHelper,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
  }

  newGame(){
    let data = { difficulty: null, textOnly: false };
    this.bottomSheet.open(BalancingGameOptionsComponent, { data: data} )
    .afterDismissed().subscribe(() => {
      if (data.difficulty == null)
        return;

      this.info.textOnly = data.textOnly;
      this.info.difficulty = data.difficulty;

      this.next();
    });
  }

  next(){
    let starting = !this.info.started || this.info.finished;

    this.info.ecuationList.push(this.ecuationHelper.getRandomEcuation(this.info.difficulty));
    this.info.calculateLastEcuation(this.ecuationHelper);
    this.info.started = true;

    if (starting){
      const that = this;
      setTimeout(function()
      {
        that.timer.reset(0);
        that.timer.start();
      }, 100);
    }
  }

  tick(seconds:number){
    this.info.seconds = seconds;
  }
}
