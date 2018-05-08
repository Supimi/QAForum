import { OnChanges, OnInit } from '@angular/core';
import { User } from './User';
import { Student } from './student';
import { Academic_Staff_Member } from './aca_staff_member';
import { Alumni } from './alumni';
import { Admin } from './admin';

export class UserFactory implements OnInit {
    ngOnInit() { }

    constructor() {
    }

    getuser(userType: string, attributes: any): User {
        if (userType == 'Student') {
            return new Student(attributes);
        }
        else if (userType == 'Academic Staff Member') {
            return new Academic_Staff_Member(attributes);
        }
        else if (userType == 'Alumni') {
            return new Alumni(attributes);
        }
        else if (userType == 'Admin') {
            // return new AdminInstance
            return Admin.createAdminInstance(attributes);
        }
        else {
            return null;
        }

    }
}