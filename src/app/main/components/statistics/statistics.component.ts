import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stats: Observable<any>;

  @ViewChild(MatSelect, {static:false}) gameName: MatSelect;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  loadStatistics(){
    this.stats = this.firestore.collection(this.gameName.value + '-statistics').valueChanges();
  }
}
