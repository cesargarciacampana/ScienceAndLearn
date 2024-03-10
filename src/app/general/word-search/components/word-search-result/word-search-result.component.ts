import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordGridHelper } from '../../../shared/helpers/word-grid.helper';
import { WordSearchConfig } from '../../../shared/models/word-search-config';
import { WordGridModel } from '../../../shared/models/word-grid.model';

@Component({
  selector: 'app-word-search-result',
  templateUrl: './word-search-result.component.html',
  styleUrls: ['./word-search-result.component.css']
})
export class WordSearchResultComponent implements OnInit {
  wsConfig: WordSearchConfig;
  wsModel: WordGridModel;

  constructor(
    private wordGridHelper : WordGridHelper,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.wsConfig = WordSearchConfig.getFromQueryString(this.actRoute);
    if (this.wsConfig && this.wsConfig.isValid())
      this.Generar();
  }

  private Generar(){
    this.wsModel = this.wordGridHelper.generate(this.wsConfig.rows, this.wsConfig.cols, this.wsConfig.words, this.wsConfig.nDirections);
  }

  GenerarClick(){
    this.Generar();
  }
}
