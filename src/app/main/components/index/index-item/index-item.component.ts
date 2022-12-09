import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-item',
  templateUrl: './index-item.component.html',
  styleUrls: ['./index-item.component.css']
})
export class IndexItemComponent implements OnInit {

  @Input() title;
  @Input() description;
  @Input() route;
  @Input() image;

  constructor() { }

  ngOnInit(): void {
  }

}
