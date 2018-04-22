import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../../services/signup.service';
import { SigninService } from '../../../services/signin.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {

  
  signupForm: FormGroup;
  firstname: String;
  lastname: String;
  username: String;
  usertype: String = 'Alumni';
  email: String;
  position: String;
  working_place:String;
  err: String;
  msg: String;

  constructor(private _signupService: SignupService, private _signinService: SigninService, private _formBuilder: FormBuilder) {
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.email = '';
    this.position = '';
    this.working_place = '';
    this.signupForm = _formBuilder.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'position': [null, Validators.required],
      'working_place': [null, Validators.required]
    });

  }

  ngOnInit() {
  }
  signupRequest(post) {
    if (this.validateEmail(post.email)) {
      this._signupService.signupRequest(post.firstname, post.lastname, post.username, this.usertype, post.email, null, null, post.position, post.working_place).subscribe(
        res => {
          console.log(res);

          if (res.success) { this.msg = 'Your resonse is recorded as SignUp request.'; }
        },
        error => {
          this.msg = 'SignUp request Failed.';
          console.log("signup is failed.");
        }
      );

    }

  }

  validateEmail(email) {
    let res = email.split('@');
    if (res[1] == 'cse.mrt.ac.lk') {
      return true;

    }
    else {
      this.err = 'Use your CSE Email';
      return false;
    }
  }
  


}
