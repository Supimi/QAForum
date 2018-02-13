import { Component, OnInit } from '@angular/core';
import { SigninService} from '../../../services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authToken: string;
  p:string;

  constructor(private _signinservice: SigninService,  private _router: Router) {
   this.authToken=window.localStorage.getItem('auth-token');
   this.p= 'supimi';
   console.log(this.authToken);
  }

  ngOnInit() {
  }
  
}
