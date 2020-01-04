import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WordService {
    private words : string[];

    constructor(
        private httpClient: HttpClient
    ) { 
        this.init();
    }

    private init(){
        this.httpClient.get<string[]>('/assets/words.json')
            .subscribe((data : string[]) => this.words = data);
    }

    private randomIntFromInterval(min, max) { // min included, max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }

    randomWord(){
        let i = this.randomIntFromInterval(0, this.words.length);
        return this.words[i];
    }
}