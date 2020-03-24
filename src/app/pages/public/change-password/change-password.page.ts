import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  form: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      verifPassword: new FormControl('', [Validators.required, Validators.minLength(8)]) 
    });
  }

  onSubmit(){
    console.log( this.form.value);
   this.authService.changePassword(this.form.value.password).then(
     (isAuth: any) => {
       if(isAuth) this.router.navigate(['private']);
      }
   );
  }

}
