import { Component, OnInit } from '@angular/core';
import { WordHelper } from '@chem-shared/helpers/word.helper';
import { Observable } from 'rxjs';
import { ElementsDTO } from '@chem-shared/dtos/elements.dto';
import { ElementService } from '@chem-shared/services/element.service';

@Component({
  selector: 'app-resolutor',
  templateUrl: './resolutor.component.html',
  styleUrls: ['./resolutor.component.css']
})
export class ResolutorComponent implements OnInit {

  elements: Observable<ElementsDTO>;
  solvedWords;
  constructor(
    private wordHelper : WordHelper,
    private elementService : ElementService
  ) { }

  ngOnInit() {
    this.elements = this.elementService.elementsObservable;
  }

  calculate(word: string){
    if (word)
      this.solvedWords = this.wordHelper.calculateElements(word);
  }
}
