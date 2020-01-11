import { Component, Input, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

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

}