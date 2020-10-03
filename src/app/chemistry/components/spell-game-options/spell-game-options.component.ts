import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Difficulty } from '@chem-shared/models/spell-game-info';

@Component({
  selector: 'app-spell-game-options',
  templateUrl: './spell-game-options.component.html',
  styleUrls: ['./spell-game-options.component.css']
})
export class SpellGameOptionsComponent implements OnInit {

  Difficulty: any = Difficulty;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SpellGameOptionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    ) { }

  ngOnInit() {
  }

  choose(level: Difficulty){
    this.data.level = level;
    this.bottomSheetRef.dismiss();
  }
}
