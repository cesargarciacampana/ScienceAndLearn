import { Component, OnInit, Input } from '@angular/core';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {

  @Input() compound : EcuationCompound;

  constructor() { }

  ngOnInit() {
  }

}
