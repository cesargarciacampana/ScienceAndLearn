import { Component, OnInit } from '@angular/core';
import { WordHelper } from '../../shared/helpers/word.helper';
import { PeriodicTableElement } from 'src/app/shared/models/periodic.table.element';

@Component({
  selector: 'app-resolutor',
  templateUrl: './resolutor.component.html',
  styleUrls: ['./resolutor.component.css']
})
export class ResolutorComponent implements OnInit {

  solvedWords;
  constructor(
    private wordHelper : WordHelper,
  ) { }

  ngOnInit() {
  }

  calculate(word: String){
    if (word)
      this.solvedWords = this.wordHelper.calculateElements(word);
  }

  isRealElement(element : PeriodicTableElement){
    return  element.name != '';
  }

  elementToString (element : PeriodicTableElement){
    let isRealElement = this.isRealElement(element);
    if (isRealElement)
      return '[' + element.symbol + ']';
    else
      return element.symbol;
  }
}
