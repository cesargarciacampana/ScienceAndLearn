import { Component, OnInit, ViewChild } from '@angular/core';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';
import { BalancingGameInfo } from '@chem-shared/models/balancing-game-info';
import { TimerComponent } from '@main/timer/timer.component';

@Component({
  selector: 'app-balancing-game',
  templateUrl: './balancing-game.component.html',
  styleUrls: ['./balancing-game.component.css']
})
export class BalancingGameComponent implements OnInit {

  info = new BalancingGameInfo();
  
  @ViewChild(TimerComponent, { static: false }) timer: TimerComponent;

  constructor(
    private ecuationHelper: EcuationHelper
  ) { }

  ngOnInit() {
  }


  next(){
    let starting = !this.info.started || this.info.finished;

    this.info.ecuationList.push(this.ecuationHelper.getRandomEcuation());
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
