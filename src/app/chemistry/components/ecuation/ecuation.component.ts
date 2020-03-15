import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';

@Component({
  selector: 'app-ecuation',
  templateUrl: './ecuation.component.html',
  styleUrls: ['./ecuation.component.css']
})
export class EcuationComponent implements OnInit {

  @Input() ecuation: Ecuation;
  @Input() allowBalancing = false;

  @Output() changed = new EventEmitter<any>()

  options = [1, 2, 3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
  }

  onChanged(){
    this.changed.emit();
  }
}
