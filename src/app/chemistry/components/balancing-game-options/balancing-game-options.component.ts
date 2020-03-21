import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Difficulty } from '@chem-shared/models/balancing-game-info';

@Component({
  selector: 'app-balancing-game-options',
  templateUrl: './balancing-game-options.component.html',
  styleUrls: ['./balancing-game-options.component.css']
})
export class BalancingGameOptionsComponent implements OnInit {

  Difficulty: any = Difficulty;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BalancingGameOptionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  choose(difficulty: Difficulty){
    this.data.difficulty = difficulty;
    this.bottomSheetRef.dismiss();
  }
}
