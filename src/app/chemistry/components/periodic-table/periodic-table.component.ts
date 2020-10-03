import { Component, OnInit, Injector, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementsDTO } from '@chem-shared/dtos/elements.dto';
import { ElementService } from '@chem-shared/services/element.service';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { OverlayRef, Overlay, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ElementInfoComponent, ELEMENT_INFO_DATA } from '@chem/element-info/element-info.component';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements OnInit {

  cellWidth = 50;
  cellHeight = 50;
  tableColumns = 18;
  elementsObservable: Observable<ElementsDTO>;
  table = [
	   1,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   2,
	   3,   4,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   6,   7,   8,   9,  10,
	  11,  12,  -1,   0,   0,   0,   0,   0,   0,   0,   0,   0,  13,  14,  15,  16,  17,  18,
	  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,
	  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,  52,  53,  54,
	  55,  56, 900,  72,  73,  74,  75,  76,  77,  78,  79,  80,  81,  82,  83,  84,  85,  86,
	  87,  88, 901, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118 
  ];

  table2 = [
	57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,  69,  70,  71,
	89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103
  ];

  private overlayRef: OverlayRef;
  private timer : any;

  constructor(
	  private elementService: ElementService,
	  private overlay: Overlay,
	  private injector: Injector
	) { }

  ngOnInit() {
	  this.elementsObservable = this.elementService.elementsObservable;
  }

  getElement(elements: ElementsDTO, index: number){
	return index > 0 ? elements.elements[index-1] : null
  }

  
  getOverlayPositions(): ConnectedPosition[]{
	return [{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
      }];
  }

  show(element: ElementDTO, elementRef: ElementRef){
	this.hide();

	if (!element)
		return;

	const positions = this.getOverlayPositions();
	const positionStrategy = this.overlay.position()
		.flexibleConnectedTo(elementRef)
		.withPositions(positions).withPush(true);

	this.overlayRef = this.overlay.create({
		positionStrategy: positionStrategy
	});

	const data = { 
		element:element, 
		closeDelegate: () => this.hide(),
		enterDelegate: () => this.clearTimer() };
	const elementPortal = new ComponentPortal(ElementInfoComponent, null, 
		this.createInjector(data));
	this.overlayRef.attach(elementPortal);
  }

  hide(){
	if (!this.overlayRef)
		return;
	
	this.clearTimer();
	this.overlayRef.dispose();
	this.overlayRef = null;

  }

  hideTimer(){
	  const that = this;
	  this.timer = setTimeout(() => that.hide(), 100);
  }

  clearTimer(){
	if (this.timer)
		clearTimeout(this.timer)
  }

  createInjector(dataToPass): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(ELEMENT_INFO_DATA, dataToPass);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
