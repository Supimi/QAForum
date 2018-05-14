import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserFactory } from '../../../models/userFactory';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usertype: string;
  user: User;
  token: any;
  id: string;
  edit: boolean = true;
  active: boolean = true;
  userfactory: UserFactory;
  email: string;
  editForm: FormGroup;
  firstname: string;
  lastname; string;
  username: string;
  index: string;
  specializations: string;
  spec: any;
  non_spec: string;
  position: string;
  working_place: string;
  modules: string;

  constructor(private _userService: UserService, private _formBuilder: FormBuilder, private _router: Router) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var userobj = JSON.parse(userObject);
    
    this.usertype = userobj.usertype;
    this.email = userobj.email;
    this.username = userobj.username;
    this.token = userobj.token;
    this.id = userobj.id;
    this.userfactory = new UserFactory();
    this.getUser();
    this.getModules(this.token);
    this.editForm = this._formBuilder.group({
      'firstname': [this.firstname, Validators.required],
      'lastname': [this.lastname, Validators.required],
      'username': [this.username, Validators.required],
      'email': [this.email, Validators.required],
      'index': [this.index, Validators.required],
      'specializations': [this.specializations],
      'non_spec': [this.non_spec, Validators.required],
      'position': [this.position, Validators.required],
      'working_place': [this.working_place, Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.usertype);
  }

  isStudent() {
    if (this.usertype == 'Student') {
      return true;
    }
    return false;
  }

  isAcademic() {
    if (this.usertype == 'Academic Staff Member') {
      return true;
    }
    return false;
  }

  isAlumni() {
    if (this.usertype == 'Alumni') {
      return true;
    }
    return false;
  }

  isAcademicORAlumni() {
    if (this.usertype == 'Academic Staff Member' || this.usertype == 'Alumni') {
      return true;
    }
    return false;
  }

  activeEdit() {
    this.edit = false;
    this.active = false;
  }

  getUser() {
    this._userService.getUser(this.email).subscribe(res => {
      this.user = this.userfactory.getuser(this.usertype, res);
      console.log(this.user);
      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.username = this.username;
      if (this.usertype == "Student") {
        this.index = res.index;
      }
      else {
        this.index = "";
      }
      if (this.usertype == "Academic Staff Member") {
        this.spec = res.specialization;
        this.non_spec = res.non_aca_specialization;
      }
      else {
        this.spec = "";
        this.non_spec = "";
        this.specializations = "";
      }
      if (this.usertype == "Alumni") {
        if (typeof res.working_place != 'undefined') {
          this.working_place = res.working_place;
        }
        else {
          this.working_place = "";
        }
      }
      if (this.usertype == 'Academic Staff Member' || this.usertype == 'Alumni') {
        this.position = res.position;
      }
      else {
        this.position = "";
      }
      console.log(this.user);

    });
  }

  editDetails(post) {
    console.log(post, post.firstname);
    if (typeof post.firstname != "undefined") {
      this.firstname = post.firstname;
    }

    if (typeof post.lastname != "undefined") {
      this.lastname = post.lastname;
    }

    if (typeof post.username != "undefined") {
      this.username = post.username;
    }

    if (typeof post.specialization != "undefined") {
      this.specializations = post.specialization;
    }

    if (typeof post.position != "undefined") {
      this.position = post.position;
    }

    if (typeof post.working_place != "undefined") {
      this.working_place = post.working_place;
    }

    if (typeof post.non_spec != "undefined") {
      this.non_spec = post.non_spec;
    }

    if (typeof post.index != "undefined") {
      this.index = post.index;
    }

    this._userService.updateUser(this.id, this.email, this.token, this.firstname, this.lastname, this.specializations, this.position, this.working_place, this.non_spec,this.index).subscribe(res => {
      console.log("User updated");
    }, error => {
      console.log("updating process failed.");
    });
  }

  getModules(token) {
    this._userService.getSpecializations(token).subscribe(res => {
      this.modules = res;
      console.log(res);
    }, error => {
      console.log("Error in fetching specializations");
    });
  }

  close() {
    if (this.usertype == "Admin") {
      this._router.navigate(['/admin/home']);
    }
    else {
      this._router.navigate(['/user/recent']);
    }

  }


}
