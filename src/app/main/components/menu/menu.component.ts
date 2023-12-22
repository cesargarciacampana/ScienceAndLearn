import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatSidenav) snav : MatSidenav;
  @ViewChild(MatInput) groupCode: MatInput;

  allowChangeGroupCode = true;

  constructor(
	protected authService: AuthService,
	private route: ActivatedRoute,
	private snackBar: MatSnackBar) {
		
  }

  ngOnInit() {
	this.route.queryParamMap.pipe(
		tap(x => {
			let codeParam = x.get('code');
			if (codeParam){
				this.authService.login(codeParam);
				this.allowChangeGroupCode = false;
			}
		})).subscribe();
  }

  closeNav(){
	if(this.snav.opened)
		this.snav.toggle();
  }

  toggleNav(){
	this.snav.toggle()
  }

  login(){
	if (this.groupCode.value){
		if (this.groupCode.value.length < 6){
			this.snackBar.open('Código incorrecto', null,{ duration: 3000 });
			return;
		}
		this.authService.login(this.groupCode.value);
	}
  }
  logout(){
	this.authService.logout();
  }
}
