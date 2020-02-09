import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementDTO } from '../dtos/element.dto';
import { ElementsDTO } from '../dtos/elements.dto';

@Injectable({providedIn: 'root'})
export class ElementService {
    elements : ElementDTO[];

    private language = 'es';

    constructor(
        private httpClient: HttpClient
    ) { 
        this.init();
    }

    private init(){
        this.httpClient.get<ElementsDTO>(`/assets/elements-${this.language}.json`)
            .subscribe((data : ElementsDTO) => this.elements = data.elements);
    }
}