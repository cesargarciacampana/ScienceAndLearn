import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { GameInfo } from '@shared/models/game-info';
import { StatisticsService } from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  saved = false;

  @Input() gameInfo: GameInfo;
  @Input() gameName: string;
  @ViewChild(MatInput) name: MatInput;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
  }

  login(){
    if (!this.name.value)
      return;

    let stats = {
      user: this.name.value, points: this.gameInfo.points,
      seconds: this.gameInfo.seconds, info: this.gameInfo.toJson()
    };
    this.statisticsService.save(this.gameName, stats)
    .then(()=>
      {
        this.saved = true;
      }
    ).catch((reason) => alert('No se ha podido guardar: ' + reason));
  }
}
