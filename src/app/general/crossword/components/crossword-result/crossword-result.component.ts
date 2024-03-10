import { Component, OnInit } from '@angular/core';
import { CrosswordConfig } from 'src/app/general/shared/models/crossword-config';
import { ActivatedRoute } from '@angular/router';
import { WordGridModel } from 'src/app/general/shared/models/word-grid.model';
import { WordGridHelper } from 'src/app/general/shared/helpers/word-grid.helper';

@Component({
  selector: 'app-crossword-result',
  templateUrl: './crossword-result.component.html',
  styleUrls: ['./crossword-result.component.css']
})
export class CrosswordResultComponent implements OnInit {

  crosswordConfig: CrosswordConfig;
  crosswordModel: WordGridModel;

  constructor(
    private wordGridHelper : WordGridHelper,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crosswordConfig = CrosswordConfig.getFromQueryString(this.actRoute);
    if (this.crosswordConfig && this.crosswordConfig.isValid()){
      this.Generar();
    }
  }

  private Generar(){
    this.crosswordModel = this.wordGridHelper.generate(
      this.crosswordConfig.rows,
      this.crosswordConfig.cols,
      this.crosswordConfig.words,
      2,
      false,
      true);
  }

  GenerarClick(){
    this.Generar();
  }
}
