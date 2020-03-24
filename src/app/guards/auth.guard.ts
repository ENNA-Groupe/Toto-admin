import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    let isAuth = this.dataService.getAuth();
    if (!isAuth) this.router.navigate(['']);
    return isAuth;
  }

}
