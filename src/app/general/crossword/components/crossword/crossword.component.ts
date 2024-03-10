import { Component, Input, OnInit } from '@angular/core';
import { CrosswordConfig } from '../../../models/crossword-config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})
export class CrosswordComponent implements OnInit {

  @Input()
  crosswordConfig: CrosswordConfig;

  nWords = 5;

  words: string[];

  constructor(private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.crosswordConfig = CrosswordConfig.getFromQueryString(this.actRouter);
    if (!this.crosswordConfig || !this.crosswordConfig.isValid()){
      this.crosswordConfig = new CrosswordConfig(20, 20, new Array(this.nWords));
    }
  }

}
