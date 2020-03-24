import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(
    private api: ApiService,
    private data: DataService
  ) { }

  login(data){
    return this.api.post('auth:login',data).then(
      (res: any) =>{
        if(res.isAuth) {
          this.data.setAuth(res.isAuth);
          this.data.setUser(res.user);
          this.data.setControls(res.controls);
        }
        return res.isAuth;
      }
    );
  }

  changePassword(password){
    return this.api.post('auth:change-password',password).then(
      (res) =>{
        return res;
      }
    );
  }

  logout(){
    return this.api.post('auth:logout', null).then(
      (res: any) => {
        this.data.setAuth(!res);
        return res
      } 
    );
  }
}
