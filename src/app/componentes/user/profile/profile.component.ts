import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../services/user.service';
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

  constructor(private _userService: UserService,  private _router: Router) {

    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user= JSON.parse(userObject);

    this.authToken=user.token;
    this.email = user.email;
   
    this._userService.getUser(this.email).subscribe(res=>{
        this.username= res.username;
        this.firstname= res.firstname;
        this.lastname= res.lastname;
        this.usertype= res.usertype;
        this._id= res._id;
        console.log(res.username);
        this._userService.setUsername(this.username);
        this._userService.setEmail(this.email);
    },
    error=>{
      console.log("Something went wrong");
    }
  );
  
  }

  ngOnInit() {
  }

  logout(){
    console.log('sign out called');
    window.localStorage.removeItem('userObject');
    console.log(localStorage.getItem('userObject'));
    
    this._router.navigate(['/']);
  }

  

}
