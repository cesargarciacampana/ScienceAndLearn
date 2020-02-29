import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  seconds: number;
  private started = false;
  private backwards: boolean;

  @Output() tick = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  start(backwards: boolean = false){
    this.backwards = backwards;
    this.started = true;
    this.step();
  }

  step(){
    if (!this.started)
      return;

    const that = this;
    setTimeout(function(){
      {
        that.seconds += that.backwards ? -1 : 1;
        that.tick.emit(that.seconds);
        if (!that.backwards || that.seconds > 0)
          that.step();
      }
    }, 1000);
  }

  stop(){
    this.started = false;
  }

  reset(seconds: number = 0){
    this.seconds = seconds;
  }

  addTime(seconds: number){
    this.seconds += seconds;
  }
}
