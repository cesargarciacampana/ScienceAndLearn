import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent implements OnInit {

  @Input() words: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
