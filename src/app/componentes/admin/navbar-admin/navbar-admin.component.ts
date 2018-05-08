import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  @Input('username') username: string;
  @Input('email') email: string;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('sign out called');
    localStorage.removeItem('userObject');
    console.log(localStorage.getItem('userObject'));
    localStorage.clear();

    this._router.navigate(['/']);
  }

}
