import { Component, OnInit } from '@angular/core';
import {SignupService} from '../../../services/signup.service';
import {SigninService} from '../../../services/signin.service';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {

  signupForm: FormGroup ;
  firstname: string;
  lastname: string;
  username: string;
  usertype: string='Student';
  email: string;
  index:string;
  password: string;
  confirmpassword: string;
  readytoSubmit: boolean=false;
  err:string;


  constructor(private _signupService: SignupService, private _signinService: SigninService ,private _formBuilder: FormBuilder,  private _router: Router ) {
    this.firstname = '';
    this.lastname = '';
    this.username = '' ;
    this.index='';
    this.email = '' ;
    this.password = '' ;
    this.confirmpassword = '';
    this.signupForm = _formBuilder .group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'username' : [null, Validators.required],
      'index' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirmpassword' : [null, Validators.required]
    });

  }

  ngOnInit() {
  }
  signup(post) {
    if(this.validateEmail(post.email) && this.validatePassword(post.password,post.confirmpassword)){
      this._signupService.signup( post.firstname , post.lastname , post.username, this.usertype, post.email, post.password, null, post.index, null, null).subscribe(
        res => {
          console.log(res);
          var userObject = { 'token': res.token, 'email': post.email };
  
          // Set localStorage item
          localStorage.setItem('userObject', JSON.stringify(userObject));
  
          if (res.success) {this._router.navigate(['/user/profile']); }
        },
        error=>{
          console.log("signup is failed.");
        }
      );

    }
    
  }

  validateEmail(email){
      let res=email.split('@');
      if(res[1]=='cse.mrt.ac.lk'){
        return true;

      }
      else{
        this.err='Use your CSE Email';
        return false;
      }
  }
  validatePassword(password,confirmpassword){
    if (password==confirmpassword && password.length>=6){
      return true;
    }
    else{
      this.err='Use Valid password to sign into your account'
      return false;
    }

  }



}
