import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { UserFactory } from '../../../models/userFactory';
import { User } from '../../../models/User';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  token: any;
  count: any;
  studentCount: number = 0;
  staffmemberCount: number = 0;
  alumniCount: number = 0;
  addUserForm: FormGroup;
  firstname: string;
  lastname: string;
  username: string;
  usertype: string;
  email: string;
  userFactory: UserFactory;
  newUser: User
  password: string;

  constructor(private _adminService: AdminService, private _formBuilder: FormBuilder) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);

    //set token
    this.token = user_details.token

    this.getUserCount(this.token);

    //  console.log(this.count);
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.email = '';
    this.usertype = '';
    this.userFactory = new UserFactory();

    this.addUserForm = this._formBuilder.group({
      'firstname': [null, Validators.required],
      "lastname": [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'usertype': [null, Validators.required]
    });





  }

  ngOnInit() { }

  getUserCount(token) {
    this._adminService.getUserCount(token).subscribe(res => {
      console.log(res);
      this.count = res;
      console.log(this.count);
      for (var i = 0; i < this.count.length; i++) {
        if (this.count[i]._id == "Student") {
          this.studentCount = this.count[i].count;
        }
        if (this.count[i]._id == "Academic Staff Member") {
          this.staffmemberCount = this.count[i].count;
        }
        if (this.count[i]._id == "Alumni") {
          this.alumniCount = this.count[i].count;
        }
      }
    });

  }

  addUser(post) {
    console.log(post.usertype, post.email);
    this.newUser = this.userFactory.getuser(post.usertype, post);
    console.log(this.newUser);
    this.password = this._adminService.getrandomPassword(10);
    this._adminService.addUser(post.usertype, this.newUser, this.password).subscribe(res => {
      console.log(res);
      if (res.success) {
        console.log("Successfuly added the user to the system");
        this.addUserForm.reset();
        this.sendEmail(this.token, post.email, this.password);
        this.getUserCount(this.token)
      }
    },
      error => {
        console.log("Error occured when user adding to the system");
      }
    );
  }


  sendEmail(token, email, message) {
    var text = 'Use your email as username and login to the system using password,"' + message + '".';
    this._adminService.sendMail(token, email, "Registered to the QSolver- Q&A Forum", text).subscribe(res => {
      console.log(res);
    });
  }


}
