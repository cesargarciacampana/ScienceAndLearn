import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stats: Observable<any>;
  columnsToDisplay = [];

  @ViewChild(MatSelect, {static:false}) gameName: MatSelect;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  loadStatistics(){
    this.stats = this.firestore
      .collection(this.gameName.value + '-statistics', ref => ref.orderBy('points', 'desc'))
      .valueChanges().pipe(
        map((data) => {
          for(let i = 0; i < data.length; i++)
            data[i]['info'] = JSON.parse(data[i]['info']);
          return data;
        }
      ));

    switch(this.gameName.value){
      case 'spell0':
      case 'spell1':
        this.columnsToDisplay = ['index', 'name', 'points', 'time', 'clues'];
        break;
      case 'calculation':
        this.columnsToDisplay = ['index', 'name', 'points', 'level', 'success', 'fails'];
        break;
    }
  }

  countClues(words: any[]){
    let count = 0;
    for (let i = 0; i < words.length; i++){
      for (let j = 0; j < words[i]['parts'].length; j++){
        let part = words[i]['parts'][j];
        if(part['c'] == 1)
          count++;
      }
    }
    return count;
  }
}
