import { Component, OnInit } from '@angular/core';
import { UserFactory } from '../../../models/userFactory';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { delay, share } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userFactory: UserFactory;
  user: User;
  attributes: any;
  token: any;
  filtersLoaded: Promise<boolean>;
  searchCriteria: string;
  searchForm: FormGroup;
  searchtxt: string;

  constructor(private _userService: UserService, private _adminService: AdminService, private _formBuilder: FormBuilder, private _router: Router) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);

    this.userFactory = new UserFactory();


    //create admin object
    this._userService.getUser(user_details.email).subscribe(res => {
      // set the values for attribute variables;
      this.user = this.userFactory.getuser('Admin', res);
      this.user.setToken(user_details.token);
      this.filtersLoaded = Promise.resolve(true);
    });
    this.searchCriteria = "Questions";
    this.searchtxt = "";

    this.searchForm = this._formBuilder.group({
      'searchtxt': [null, Validators.required],
    });

  }

  ngOnInit() {
  }

  selectCriteria() {
    if (this.searchCriteria == "Questions") {
      this.searchCriteria = "Users";
    }
    else {
      this.searchCriteria = "Questions";
    }
  }

  setCriteria(post) {
    console.log("from set criteria");
    this._adminService.setCollection(this.searchCriteria);
    this._adminService.setSearchingCriteria(post.searchtxt);
    //console.log("from set criteria",this._adminService.getSearchingCriteria());
    this._router.navigate(['/admin/search']);
    
  }




}
