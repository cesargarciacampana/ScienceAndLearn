import { Component, OnInit, Input } from '@angular/core';
import { ElementDTO } from '@chem-shared/dtos/element.dto';

@Component({
  selector: 'app-element-cell',
  templateUrl: './element-cell.component.html',
  styleUrls: ['./element-cell.component.css']
})
export class ElementCellComponent implements OnInit {

  @Input() element: ElementDTO;
  @Input() textProperty = '';

  @Input() width = 85;
  @Input() height = 100;

  fontNormal: number;
  fontBig: number;
  margin: number;

  constructor() { }

  ngOnInit() {
	  this.margin = 0.05 * this.height;
	  this.fontNormal = (13 * this.width / 85) + 1;
	  this.fontBig = (23 * this.height / 100) + 1;
  }

  show(name: string){
	if (this.element && (!this.textProperty || this.textProperty == name))
		return this.element[name];
	
	return '';
  }
}
