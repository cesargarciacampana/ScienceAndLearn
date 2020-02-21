import { Component, Input, OnInit } from '@angular/core';
import { Word } from '@chem-shared/models/word';
import { MatTooltip } from '@angular/material';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input()
  word: Word;

  constructor() { }

  ngOnInit() {
  }

  click(tooltip: MatTooltip){
    tooltip.show();
    return false;
  }
}
