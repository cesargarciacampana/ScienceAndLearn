import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Statistics } from '@shared/models/statistics';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {

  @Input() stats: Observable<Statistics[]>;
  @Input() columns = [];

  statistics: Statistics[];
  error = false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
	this.stats.subscribe(
		(x) => this.statistics = x, 
		(error) => this.showError(error));
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

  showError(error){
	this.error = true;
	this.snackBar.open('No se ha podido cargar la clasificación'
		, null, { duration: 5000, verticalPosition: 'top' });
	console.log(error.message);
  }
}
