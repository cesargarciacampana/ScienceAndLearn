import { Component, OnInit, Input, Output } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';

@Component({
  selector: 'app-ecuation',
  templateUrl: './ecuation.component.html',
  styleUrls: ['./ecuation.component.css']
})
export class EcuationComponent implements OnInit {

  @Input() ecuation: Ecuation;
  @Input() allowBalancing = false;

  constructor() { }

  ngOnInit() {
  }

  emptyIfZero(value: number){
    if (value <= 0)
      return '';
    else
      return value;
  }
}
