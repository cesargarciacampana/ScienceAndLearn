import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementsDTO } from '@chem-shared/dtos/elements.dto';
import { ElementService } from '@chem-shared/services/element.service';
import { ElementDTO } from '@chem-shared/dtos/element.dto';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements OnInit {

  cellWidth = 50;
  cellHeight = 70;
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
	0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,  69,  70,  71,
	0, 0, 0, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103
  ];

  constructor(
	  private elementService: ElementService
	) { }

  ngOnInit() {
	  this.elementsObservable = this.elementService.elementsObservable;
  }

  getElement(elements: ElementsDTO, index: number){
	return index > 0 ? elements.elements[index-1] : null
  }
}
