import { Component, OnInit, InjectionToken, Inject } from '@angular/core';

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
