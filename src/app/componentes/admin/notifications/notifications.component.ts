import { Component, OnInit } from '@angular/core';
import { Request } from '../../../models/request';
import { AdminService } from '../../../services/admin.service';
import $ from 'jquery';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userRequests: [Request];
  selectedRequest: Request;
  token: string;
  requestloaded: Promise<boolean>;
  requestselected:Promise<boolean>;

  constructor(private _adminService: AdminService) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);

    //set token
    this.token = user_details.token
    this._adminService.getUserRequests(this.token).subscribe(res => {
      console.log(res);
      this.userRequests = res;
      if (res.length != 0) {
        this.selectedRequest = new Request(res[0]);
        this.requestselected = Promise.resolve(true);
        console.log(this.userRequests[0]);
      }
      this.requestloaded = Promise.resolve(true);
    });


  }

  ngOnInit() {

  }

  select() {
    $(document).ready(function () {

      $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'All') {
          $('.table tr').css('display', 'none');
          $('.table tr[class="' + $target + '"]').fadeIn('fast');
        } else {
          $('.table tr').css('display', 'none').fadeIn('fast');
        }
      });

    });
  }

  view(request: Request) {
    this.selectedRequest = new Request(request);
    console.log(this.selectedRequest.getFirstName());
    if (this.selectedRequest.getViewStatus() == false) {
      //update the viewstate to true
      this._adminService.updateViewStatus(this.token, this.selectedRequest.getId()).subscribe(res => {
        console.log(res);
      });
      this._adminService.getUserRequests(this.token).subscribe(res => {
        this.userRequests = res;
      });
    }
    document.getElementById('new-requests').style.display = 'none';
    document.getElementById('selected-request').style.display = 'block';
  }

  back(request: Request) {
    document.getElementById('new-requests').style.display = 'block';
    document.getElementById('selected-request').style.display = 'none';

  }

  accept(request: Request) {
    if (this.selectedRequest.getId() != request._id) {
      this.selectedRequest = new Request(request);
    }
    //update the notification status
    this._adminService.updateNotificationStatus(this.token, this.selectedRequest.getId()).subscribe(res => {
      //if status of user request is updated by accept button, then user should be added to the system.
      if (res == true) {
        var password = this._adminService.getrandomPassword(10);
        console.log(password);
        this._adminService.addUser(this.selectedRequest.getUserType(), this.selectedRequest, password).subscribe(res => {
          if (res.success) {
            //After user added to the system, send an email to the user
            var text = 'Use your email as username and login to the system using password,"' + password + '".';
            console.log(text);
            this._adminService.sendMail(this.token, this.selectedRequest.getEmail(), "Registered to the QSolver- Q&A Forum", text).subscribe(res => {
              console.log(res);
            });
            console.log("User has been successfully added to the system.");
          }
        })
      }
    });

    this._adminService.getUserRequests(this.token).subscribe(res => {
      this.userRequests = res;
    });

  }

  reject(request: Request) {
    if (this.selectedRequest.getId() != request._id) {
      this.selectedRequest = new Request(request);
    }
    this._adminService.updateNotificationStatus(this.token, this.selectedRequest.getId()).subscribe(res => {
      console.log(res);
    });

    this._adminService.getUserRequests(this.token).subscribe(res => {
      this.userRequests = res;
    });
  }



}
