import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';

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

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  loadStatistics(name: string){
    if (this.stats[name])
      return;

    this.stats[name] = this.firestore
      .collection(name + '-statistics', 
        ref => ref.orderBy('points', 'desc').orderBy('seconds', 'asc').limit(10))
      .valueChanges().pipe(
        map((data) => {
          for(let i = 0; i < data.length; i++)
            data[i]['info'] = JSON.parse(data[i]['info']);
          return data;
        }
      ));
  }
}
