import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
	if (!this.auth.groupCode){
		return next.handle(req);
	}

    const authReq = req.clone({
      headers: req.headers.set('code', this.auth.groupCode)
    });

    return next.handle(authReq);
  }
}