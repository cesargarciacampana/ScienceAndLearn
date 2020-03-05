import { Component, OnInit, Inject } from '@angular/core';
import { Difficulty } from '@chem-shared/models/pair-game-info';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
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
  ];

  card1 = this.infoList[0].value;
  card2 = this.infoList[1].value;

  exampleElement: ElementDTO;
  example1: string;
  example2: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PairGameOptionsComponent>,
    private elementService : ElementService,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
  ) { }

  ngOnInit() {
    let elements = this.elementService.elements;
    let random = RandomHelper.randomIntFromInterval(0, elements.length);
    this.exampleElement = elements[random];
    this.updateExamples();
  }

  updateExamples(){
    this.example1 = this.exampleElement[this.card1];
    this.example2 = this.exampleElement[this.card2];
  }

  choose(level: Difficulty){
    this.data.level = level;
    this.data.card1 = this.card1;
    this.data.card2 = this.card2;
    this.bottomSheetRef.dismiss();
  }
}
