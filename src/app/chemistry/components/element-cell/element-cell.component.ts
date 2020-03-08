import { Component, OnInit, Input, ElementRef, Injector } from '@angular/core';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { Overlay, OverlayRef, FlexibleConnectedPositionStrategyOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ElementInfoComponent, ELEMENT_INFO_DATA } from '@chem/element-info/element-info.component';

@Component({
  selector: 'app-element-cell',
  templateUrl: './element-cell.component.html',
  styleUrls: ['./element-cell.component.css']
})
export class ElementCellComponent implements OnInit {

  @Input() element: ElementDTO;
  @Input() textProperty = '';

  @Input() width = 50;
  @Input() height = 50;

  fontNormal: number;
  fontBig: number;
  margin: number;

  constructor() { }

  ngOnInit() {
	  this.margin = 0.05 * this.height;
	  this.fontNormal = (13 * this.width / 85) + 1;
	  this.fontBig = (37 * this.height / 100) + 1;
  }

  show(name: string){
	if (this.element && (!this.textProperty || this.textProperty == name))
		return this.element[name];
	
	return '';
  }
}
