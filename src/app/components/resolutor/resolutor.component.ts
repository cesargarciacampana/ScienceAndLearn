import { Component, OnInit } from '@angular/core';
import { WordHelper } from '../../shared/helpers/word.helper';

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
}
