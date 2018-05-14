import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../../services/signup.service';
import { SigninService } from '../../../services/signin.service';
import { UserService } from "../../../services/user.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup-other',
  templateUrl: './signup-other.component.html',
  styleUrls: ['./signup-other.component.css']
})
export class SignupOtherComponent implements OnInit {

  signupForm: FormGroup;
  firstname: String;
  lastname: String;
  username: String;
  usertype: String = 'Academic Staff Member';
  email: String;
  specialization: String;
  other_spec: String;
  position: String;
  err: String;
  msg: String = "";
  modules: any;
  token: string = "";
  constructor(private _signupService: SignupService, private _signinService: SigninService, private _formBuilder: FormBuilder, private _userService: UserService) {
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.specialization = '';
    this.other_spec = '';
    this.email = '';
    this.position = '';
    this.signupForm = _formBuilder.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'position': [null, Validators.required],
      'specialization': [null, Validators.required],
      'other_spec': [null, Validators.required]
    });

    this.getModules(this.token);

  }

  ngOnInit() {
  }
  signupRequest(post) {
    if (this.validateEmail(post.email)) {
      this.err = '';
      this._signupService.signupRequest(post.firstname, post.lastname, post.username, this.usertype, post.email, post.specialization, null, post.position, "CSE").subscribe(
        res => {
          this.signupForm.reset();
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

  getModules(token) {
    this._userService.getSpecializations(token).subscribe(res => {
      this.modules = res;
    }, error => {
      console.log("Error in fetching specializations");
    });
  }



}
