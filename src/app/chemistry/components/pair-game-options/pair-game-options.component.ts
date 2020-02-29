import { Component, OnInit, Inject } from '@angular/core';
import { Difficulty } from '@chem-shared/models/pair-game-info';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-pair-game-options',
  templateUrl: './pair-game-options.component.html',
  styleUrls: ['./pair-game-options.component.css']
})
export class PairGameOptionsComponent implements OnInit {

  Difficulty: any = Difficulty;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PairGameOptionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
  ) { }

  ngOnInit() {
  }

  choose(level: Difficulty){
    this.data.level = level;
    this.bottomSheetRef.dismiss();
  }
}
