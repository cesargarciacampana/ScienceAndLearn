import { Component, OnInit, Input } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';

@Component({
  selector: 'app-ecuation',
  templateUrl: './ecuation.component.html',
  styleUrls: ['./ecuation.component.css']
})
export class EcuationComponent implements OnInit {

  @Input() ecuation: Ecuation;

  constructor() { }

  ngOnInit() {
  }

}
