import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { RandomHelper } from '@shared/helpers/random.helper';
import { ElementService } from './element.service';

@Injectable({providedIn: 'root'})
export class WordService {
    private words : Observable<string[]>;

    constructor(
        private httpClient: HttpClient,
        private elementService: ElementService
    ) { 
        this.init();
    }

    private init(){
        this.words = this.httpClient.get<string[]>('/assets/words.txt')
            .pipe(map((data) => data[0].split(',')));
    }

    randomWord() : Observable<string>{
        return this.elementService.elementsObservable.pipe(
            mergeMap(dummy => {
                return this.words.pipe(
                    map(data =>{
                        let i = RandomHelper.randomIntFromInterval(0, data.length);
                        return data[i];
                    })
                )})
        );
    }

    randomWords(count: number) : Observable<string[]>{
        return this.words.pipe(
            map(data =>{
                var list = [];
                for (let i=0; i < count; i++){
                    let rnd = RandomHelper.randomIntFromInterval(0, data.length);
                    list.push(data[rnd]);
                }
                return list;
            })
        );
    }
}