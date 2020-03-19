import { Component, OnInit } from '@angular/core';
import { WordHelper } from '@chem-shared/helpers/word.helper';
import { Observable } from 'rxjs';
import { ElementsDTO } from '@chem-shared/dtos/elements.dto';
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
  ) { }

  ngOnInit() {

  }

  calculate(word: string){
    if (word)
      this.solvedWords = this.wordHelper.calculateElements(word);
  }
}
