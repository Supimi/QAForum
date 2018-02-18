import { Component, OnInit } from '@angular/core';
import { SigninService} from '../../../services/signin.service';
import { AddquestionComponent } from './../addquestion/addquestion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authToken: string;
  email:string;
  username: string;
  firstname: string;
  lastname: string;
  usertype: string; 
  _id: string;

  constructor(private _signinservice: SigninService,  private _router: Router) {
  this.authToken=this._signinservice.getauthToken() || localStorage.getItem('auth-token');
  this.email = this._signinservice.getEmail()|| localStorage.getItem('auth-token');

   
    this._signinservice.getUser(this.email).subscribe(res=>{
        this.email=res.email;
        this.username= res.username;
        this.firstname= res.firstname;
        this.lastname= res.lastname;
        this.usertype= res.usertype;
        this._id= res._id;
        console.log(res.username);
        this._signinservice.setId(this._id);
    },
    error=>{
      console.log("Something went wrong");
    }
  );
  
  }

  ngOnInit() {
  }

  

}
