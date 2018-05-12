import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service'
import { Specialization } from '../../../models/specilization';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {
  addspecializationForm: FormGroup;
  specializations: [Specialization];
  newSpecilization: Specialization;
  module_code: string;
  module_name: string;
  semester: number;
  stream: string;
  tag: string;
  token: string;
  limit: number;
  message: string = "";
  p: number = 1;


  constructor(private _adminService: AdminService, private _formBuilder: FormBuilder) {
    this.module_code = '';
    this.module_name = '';
    this.stream = '';
    this.tag = '';

    this.addspecializationForm = _formBuilder.group({
      'module_code': [null, Validators.required],
      'module_name': [null, Validators.required],
      'semester': [null, Validators.required],
      'stream': [null, Validators.required],
      "tag": [null, Validators.required]
    });
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);

    //set token
    this.token = user_details.token

    this.getSpecilizations();
    this.limit = 10;
  }

  ngOnInit() {
  }

  getSpecilizations() {

    this._adminService.getSpecializations(this.token).subscribe(res => {
      this.specializations = res;
    });

  }

  addSpecialization(post) {
    //console.log('Adding new specilization', post);
    this.newSpecilization = new Specialization(post.module_code, post.module_name, post.semester, post.stream, post.tag);
    //console.log( this.newSpecilization);
    this._adminService.addSpecilization(this.token, this.newSpecilization).subscribe(res => {
      console.log(res);
      if (res.success) {
        console.log("Successfully added");
        this.addspecializationForm.reset();
        this.message = "Specilization successfully added.";
        this.getSpecilizations();
        document.getElementById('message').style.color = "green";

      }
      if (res.errors) {
        console.log("Error");
        this.message = "Unable to add Specilization.";
        document.getElementById('message').style.color = "red";

      }
    });
  }

  close() {
    this.message = '';
  }

}
