import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { GameInfo } from '@shared/models/game-info';
import { Statistics } from '@shared/models/statistics';
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

    let stats = new Statistics(this.gameName, this.name.value, this.gameInfo.points,
      this.gameInfo.seconds, this.gameInfo.toJson());

    this.statisticsService.save(stats)
    .subscribe(
		()=>
      {
        this.saved = true;
      },
	  (reason) => alert('No se ha podido guardar: ' + reason)
    );
  }
}
