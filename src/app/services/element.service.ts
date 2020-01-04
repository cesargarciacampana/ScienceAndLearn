import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element } from '../models/element';
import { ElementsDTO } from '../DTO/ElementsDTO';

@Injectable({providedIn: 'root'})
export class ElementService {
    elements : Element[];

    constructor(
        private httpClient: HttpClient
    ) { 
        this.init();
    }

    private init(){
        this.httpClient.get<ElementsDTO>('/assets/elements.json')
            .subscribe((data : ElementsDTO) => this.elements = data.elements);
    }
}