import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementDTO } from '../dtos/element.dto';
import { ElementsDTO } from '../dtos/elements.dto';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ElementService {
    elements : ElementDTO[];
    elementsObservable : Observable<ElementsDTO>;

    private language = 'es';

    constructor(
        private httpClient: HttpClient
    ) { 
        this.init();
    }

    private init(){
        this.elementsObservable = this.httpClient.get<ElementsDTO>(`/assets/elements-${this.language}.json`);
        this.elementsObservable.subscribe((data : ElementsDTO) => this.elements = data.elements);
    }
}