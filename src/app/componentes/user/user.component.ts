import { Component, OnInit } from '@angular/core';
import { SigninService} from '../../services/signin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  authToken: string;
  p:string;

  constructor(private _signinservice: SigninService,  private _router: Router) {
   this.authToken=window.localStorage.getItem('auth-token');
   this.p= 'supimi';
  // console.log(this.authToken);
   console.log(this._signinservice.getauthToken());
  }

  ngOnInit() {
  }

}
