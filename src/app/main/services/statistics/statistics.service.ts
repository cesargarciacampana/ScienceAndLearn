import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statistics } from '@shared/models/statistics';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  private getUrl(){
	return environment.api + 'statistics';
  }

  load(game: string) {
	return this.http.get<any[]>(this.getUrl() + '/' + game)
		.pipe(
			map(list => list.map(x => Object.assign(new Statistics(), x)))
		);
  }

  save(stats: Statistics){
	return this.http.post(this.getUrl(), stats);
  }
}
