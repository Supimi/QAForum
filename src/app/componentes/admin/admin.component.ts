import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  authToken: string;
  email:string;
  username: string;
  firstname: string;
  lastname: string;
  usertype: string= "Admin"; 
  _id: string;

  constructor( private _userService: UserService) { 
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
        this._id= res._id;
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

}
