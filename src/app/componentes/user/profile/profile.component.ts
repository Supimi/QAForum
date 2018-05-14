import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AddquestionComponent } from './../addquestion/addquestion.component';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {QuestionsupportService} from '../../../services/questionsupport.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authToken: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  usertype: string;
  _id: string;
  notifications: any;
  no_notifications: number;

  constructor(private _userService: UserService, private _router: Router,private _questionsupportService:QuestionsupportService) {

    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');
    if (userObject == null) {
      this._router.navigate(['/signin'])
    }

    // console.log retrieved item
    var user = JSON.parse(userObject);


    this.authToken = user.token;
    this.email = user.email;


    this._userService.getUser(this.email).subscribe(res => {
      this.username = res.username;
      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.usertype = res.usertype;
      this._id = res._id;
      console.log(res.username);
      this._userService.setUsername(this.username);
      this._userService.setEmail(this.email);
    },
      error => {
        console.log("Something went wrong");
      }
    );

    //Observable.interval(20000).takeWhile(() => true).subscribe(() => this.getNotfications(this.email, this.authToken));

    this.getNotfications(this.email, this.authToken);

  }

  ngOnInit() {
    document.getElementById("home").focus();
  }

  logout() {
    console.log('sign out called');
    localStorage.removeItem('userObject');
    console.log(localStorage.getItem('userObject'));
    localStorage.clear();

    this._router.navigate(['/']);
  }

  getNotfications(email, token) {
    console.log("From get notifications");
    this._userService.getNotifications(email, token).subscribe(res => {
      this.notifications = res;
      this.no_notifications = res.length;
    }, err => {
      console.log('Error in Retriving Notifications');
      this.no_notifications = 0;
      this.notifications = [];
      console.log(err);
    });
    
  }

  caltimePeriod(d) {
    let n = Math.round(Math.abs(new Date().getTime() - new Date(d).getTime()) / (3600 * 1000 * 24));
    if (n == 0) {
      return Math.round(Math.abs(new Date().getTime() - new Date(d).getTime()) / (3600 * 1000)) + ' hours'
    }
    else {
      return n + ' days';
    }

  }

  

  directTo(q_id: string) {
    var oldobj = JSON.parse(localStorage.getItem('userObject'));
    var newObject = { 'token': oldobj.token, 'email': oldobj.email, 'id': oldobj.id, 'usertype':oldobj.usertype,'username':oldobj.username, 'q_id': q_id }

      localStorage.setItem('userObject', JSON.stringify(newObject));
      this._questionsupportService.setQid(q_id);
      console.log(q_id);
     // this._router.navigateByUrl("/question");
  }
}
