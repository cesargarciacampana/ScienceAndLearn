import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  groupCode: string | null = null;

  constructor() { }

  login(groupCode: string){
	this.groupCode = groupCode;
  }

  logout(){
	this.groupCode = null;
  }
}
