import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-word-search-options',
  templateUrl: './word-search-options.component.html',
  styleUrls: ['./word-search-options.component.css']
})
export class WordSearchOptionsComponent implements OnInit {

  static readonly defaultRows = 10;
  static readonly defaultCols = 15;
  static readonly defaultNDirections = 2;

  readonly minRows = 5;
  readonly maxRows = 30;
  readonly minCols = 10;
  readonly maxCols = 50;

  rows: number;
  cols: number;

  constructor(
	private dialogRef: MatDialogRef<WordSearchOptionsComponent>,
	@Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
	var wsConfig = this.data.wsConfig;
	this.rows = wsConfig.rows;
	this.cols = wsConfig.cols;

	console.log(wsConfig);
  }

  ok(){
	this.dialogRef.close({ rows: this.rows, cols: this.cols });
  }
}
