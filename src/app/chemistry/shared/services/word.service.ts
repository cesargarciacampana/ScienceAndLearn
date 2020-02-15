import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class WordService {
    private words : Observable<string[]>;

    constructor(
        private httpClient: HttpClient
    ) { 
        this.init();
    }

    private init(){
        this.words = this.httpClient.get<string[]>('/assets/words.txt')
            .pipe(map((data) => data[0].split(',')));
    }

    private randomIntFromInterval(min, max) { // min included, max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }

    randomWord() : Observable<string>{
        return this.words.pipe(
            map(data =>{
                let i = this.randomIntFromInterval(0, data.length);
                return data[i];
            })
        );
    }
}