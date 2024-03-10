import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordSearchHelper } from '../../helpers/word-search.helper';
import { WordSearchConfig } from '../../models/word-search-config';
import { WordSearchModel } from '../../models/word-search.model';

@Component({
  selector: 'app-word-search-result',
  templateUrl: './word-search-result.component.html',
  styleUrls: ['./word-search-result.component.css']
})
export class WordSearchResultComponent implements OnInit {
  wsConfig: WordSearchConfig;
  wsModel: WordSearchModel;

  constructor(
    private wordSearchHelper : WordSearchHelper,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.wsConfig = WordSearchConfig.getFromQueryString(this.actRoute);
    if (this.wsConfig && this.wsConfig.isValid())
      this.Generar();
  }

  private Generar(){
    this.wsModel = this.wordSearchHelper.generate(this.wsConfig.rows, this.wsConfig.cols, this.wsConfig.words, this.wsConfig.nDirections);
  }

  GenerarClick(){
    this.Generar();
  }
}
