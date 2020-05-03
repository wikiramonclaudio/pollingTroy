import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from './../../services/user.service';

declare var $;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  registerEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  registerPasswordFormControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.passwordFormControl.valid && this.emailFormControl.valid) {
      const newUser = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      this.userService.createUser(newUser)
        .then((ok) => {
          console.log('USUARIO REGISTRADO CORRECTAMENTE', ok);
        }).catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log('ERRORAKO', errorMessage);
        });
    }
  }

  loginByEmail(){
    if (this.passwordFormControl.valid && this.emailFormControl.valid) {
      const newUser = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      this.userService.loginByEmal(newUser);
    }
  }

  loginByGoogle(){
    this.userService.loginByGoogle();
  }

}
