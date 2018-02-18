import { Component, OnInit } from '@angular/core';
import { SigninService } from '../../services/signin.service';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup ;
  email: string = '';
  password: string = '';
  message: string = '';


  constructor(private _signinservice: SigninService,  private _formBuilder: FormBuilder,  private _router: Router ) {
    this.email = '' ;
    this.password = '' ;
    this.signinForm = _formBuilder .group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }
  signin(post){
    this.email = post.email;
    this.password = post.password;
    console.log('from user sign in');
    this._signinservice.signin( this.email, this.password ).subscribe(
      res => {
        console.log(res);
        if(res.success){
          this._signinservice.setAuthToken(res.token);
          this._signinservice.setEmail(post.email);
          this.message= 'Login Successful' ;
          window.localStorage.setItem('auth-token',this._signinservice.getauthToken());
          window.localStorage.setItem('auth-token2',this._signinservice.getEmail());
          if(this._signinservice.authToken != ''){
            this._router.navigate(['/user/profile']);
          }
        }
        else{
          this.message= 'Invalied Username or password' ;
        }
        console.log(this.message);
      },
      error=>{

        this.message='Your Credentials Do not Match';
        console.log(this.message);
      }
    );

  }
}
