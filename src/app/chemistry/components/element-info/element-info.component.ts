import { Component, OnInit, Input, InjectionToken, Inject } from '@angular/core';
import { ElementDTO } from '@chem-shared/dtos/element.dto';

export const ELEMENT_INFO_DATA = new InjectionToken<{}>('ELEMENT_INFO_DATA');

@Component({
  selector: 'app-element-info',
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.css']
})
export class ElementInfoComponent implements OnInit {

  constructor(
	@Inject(ELEMENT_INFO_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(){
	  this.data.closeDelegate();
  }

  enter(){
	  this.data.enterDelegate();
  }
}
