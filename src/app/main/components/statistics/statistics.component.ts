import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stats = {};
  spellColumns = ['index', 'name', 'points', 'time', 'clues'];
  calculationColumns = ['index', 'name', 'points', 'level', 'success', 'fails'];
  pairsColumns = ['index', 'name', 'moves', 'time'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
  }

  loadStatistics(name: string){
    if (this.stats[name])
      return;

    this.stats[name] = this.statisticsService.load(name);
  }
}
