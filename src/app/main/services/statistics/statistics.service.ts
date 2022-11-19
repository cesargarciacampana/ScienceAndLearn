import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private firestore: AngularFirestore) { }

  load(name: string){
	return this.firestore
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

  save(name: string, stats: object){
	return this.firestore.collection(name + '-statistics').add(stats);
  }
}
