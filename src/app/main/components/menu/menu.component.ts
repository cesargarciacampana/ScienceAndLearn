import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatSidenav) snav : MatSidenav;
  constructor() {
  }

  ngOnInit() {
  }

  closeNav(){
	if(this.snav.opened)
		this.snav.toggle();
  }

  toggleNav(){
	this.snav.toggle()
  }
}
