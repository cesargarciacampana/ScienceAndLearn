import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {

  @Input() stats: Observable<any[]>;
  @Input() columns = [];

  constructor() { }

  ngOnInit() {
  }

  countClues(words: any[]){
    let count = 0;
    for (let i = 0; i < words.length; i++){
      let parts = words[i]['parts'];
      for (let j = 0; j < parts.length; j++){
        let part = parts[j];
        if(part['c'] == 1)
          count++;
      }
    }
    return count;
  }
}
