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

  constructor() { }

  ngOnInit() {
  }

  show(name: string){
	if (!this.textProperty || this.textProperty == name)
		return this.element[name];
	
		return '';
  }
}
