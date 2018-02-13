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
  username: string = '';
  password: string = '';
  message: string = '';


  constructor(private _signinservice: SigninService,  private _formBuilder: FormBuilder,  private _router: Router ) {
    this.username = '' ;
    this.password = '' ;
    this.signinForm = _formBuilder .group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  ngOnInit() {
  }
  signin(post){
    this.username = post.username;
    this.password = post.password;
    console.log('from user sign in');
    this._signinservice.signin( this.username, this.password ).subscribe(
      res => {
        console.log(res);
        if(res.success){
          this._signinservice.setAuthToken(res.token);
          this.message= 'Login Successful' ;
          console.log(this.message);
          window.localStorage.setItem('auth-token',this._signinservice.getauthToken());
          if(this._signinservice.authToken != ''){
            this._router.navigate(['/user/profile']);
          }
        }
        else{
          this.message= 'Invalied Username or password' ;
          console.log(this.message);
        }
      },
      error=>{

        this.message='Your Credentials Do not Match';
        console.log(this.message);
      }
    );

  }
}
