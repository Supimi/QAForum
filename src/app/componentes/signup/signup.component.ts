import { Component, OnInit } from '@angular/core';
import {SignupService} from '../../services/signup.service';
import {SigninService} from '../../services/signin.service';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup ;
  firstname: string;
  lastname: string;
  username: string;
  usertype: string;
  email: string;
  password: string;
  confirmpassword: string;

  constructor(private _signupService: SignupService, private _signinService: SigninService ,private _formBuilder: FormBuilder,  private _router: Router ) {
    this.firstname = '';
    this.lastname = '';
    this.username = '' ;
    this.usertype = '' ;
    this.email = '' ;
    this.password = '123' ;
    this.confirmpassword = '';
    this.signupForm = _formBuilder .group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'username' : [null, Validators.required],
      'usertype' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirmpassword' : [null, Validators.required]
    });

  }

  ngOnInit() {
  }
  signup(post) {
    this._signupService.signup( post.firstname , post.lastname , post.username, post.usertype,post.email, post.password).subscribe(
      res => {
        console.log(res);
        this._signinService.setAuthToken(res.token);
        this._signinService.setEmail(post.email);
        window.localStorage.setItem('auth-token',this._signinService.getauthToken());
        window.localStorage.setItem('auth-token2',this._signinService.getEmail());
        if (res.success) {this._router.navigate(['/user/profile']); }
      },
      error=>{
        console.log("signup is failed.");
      }
    );
  }
}
