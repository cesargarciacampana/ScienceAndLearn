import { Component, OnInit, Inject } from '@angular/core';
import { Difficulty } from '@chem-shared/models/pair-game-info';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ElementService } from '@chem-shared/services/element.service';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { RandomHelper } from '@shared/helpers/random.helper';

@Component({
  selector: 'app-pair-game-options',
  templateUrl: './pair-game-options.component.html',
  styleUrls: ['./pair-game-options.component.css']
})
export class PairGameOptionsComponent implements OnInit {

  Difficulty: any = Difficulty;

  infoList = [
    {text: 'Nombre', value: 'name'},
    {text: 'Símbolo', value: 'symbol'},
	{text: 'Número atómico', value: 'number'},
	{text: 'Todo', value: ''}
  ];

  card1: string;
  card2: string;
  level: number;

  exampleElement: ElementDTO;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PairGameOptionsComponent>,
    private elementService : ElementService,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
  ) { }

  ngOnInit() {
	this.level = this.data.level;
	this.card1 = this.data.card1;
	this.card2 = this.data.card2;

    let elements = this.elementService.elements;
    let random = RandomHelper.randomIntFromInterval(0, elements.length);
    this.exampleElement = elements[random];
  }

  ok(){
	this.data.level = this.level;
    this.data.card1 = this.card1;
    this.data.card2 = this.card2;
	this.bottomSheetRef.dismiss();
  }

  cancel(){
	this.bottomSheetRef.dismiss();
  }
}
