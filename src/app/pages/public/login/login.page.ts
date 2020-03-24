import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  passwordType = 'password';
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      identifiant: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]) 
    });
  }

  get identifiant() { return this.form.get('identifiant'); };
  get password() { return this.form.get('password'); };

  onSeePassword() {
    if (this.passwordType === 'password') this.passwordType = 'text';
    else this.passwordType = 'password';
  }

  onSubmit(){
    console.log( this.form.value);
   this.authService.login(this.form.value).then(
     (isAuth: any) => {
       if(isAuth) {
         if(this.form.value.password==='password')this.router.navigate(['public/change-password']);
         else this.router.navigate(['private']);
       }
      }
   );
  }

}
