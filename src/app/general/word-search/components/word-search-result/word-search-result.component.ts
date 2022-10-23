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

  static readonly wsConfigParamName = 'c';

  wsConfig: WordSearchConfig;
  wsModel: WordSearchModel;

  constructor(
	private wordSearchHelper : WordSearchHelper,
	private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
	var wsConfigString = this.router.snapshot.queryParamMap.get(WordSearchResultComponent.wsConfigParamName);
	this.wsConfig = WordSearchConfig.Deserialize(wsConfigString);
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
