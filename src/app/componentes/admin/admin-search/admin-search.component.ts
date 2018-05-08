import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {
  searchtxt: string;
  collection: string;
  token: string;
  searchresults: any;
  resultsLoaded: Promise<boolean>;

  constructor(private _adminService: AdminService, private _questionService: QuestionService) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);
    this.token = user_details.token;
  }

  ngOnInit() {
    this._adminService.updated.subscribe(res => {
      this.searchtxt = res;
      this.collection = this._adminService.getCollection();
      this.searchText();
    });
    console.log(this.searchresults);
  }

  searchText() {
    if (this.collection == "Questions") {
      this._questionService.qSearch(this.searchtxt, this.token).subscribe(res => {
        this.searchresults = res;
        console.log(this.searchresults);
        this.resultsLoaded = Promise.resolve(true);
      });
    } else {
      this._adminService.searchUser(this.token, this.searchtxt).subscribe(res => {
        this.searchresults = res;
        console.log(this.searchresults);
        this.resultsLoaded = Promise.resolve(true);
      })
    }

  }

  getClass(type) {
    if (type == "Academic Subject") {
      return "blackcoloured";
    } else if (type = "Event Organization") {
      return "redcoloured";
    } else if (type == "Industry and Internship") {
      return "greencoloured";
    } else if (type == "Postgraduate Studies") {
      return "purplecoloured";
    } else if (type == "Researches") {
      return "yellowcoloured";
    } else {
      return "bluecoloured";
    }
  }

}
