import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index-item',
  templateUrl: './index-item.component.html',
  styleUrls: ['./index-item.component.css']
})
export class IndexItemComponent implements OnInit {

  @Input() caption;
  @Input() description;
  @Input() route;
  @Input() image;

  constructor(private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  showDescription(){
	this.snackBar.open(this.description, null,
		{ duration: 5000, verticalPosition: 'top' });
  }
}
