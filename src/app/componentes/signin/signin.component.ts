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
  username: string;
  password: string;


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
  signin(){

  }
}
